import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { initializePayment, verifyPayment } from "@/lib/paystack";
import { generateReference } from "@/lib/utils";

// POST /api/payments/deposit - Initialize a deposit via Paystack
export async function POST(req: NextRequest) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { amount } = body;

    if (!amount || amount < 100) {
      return NextResponse.json(
        { error: "Minimum deposit is ₦100" },
        { status: 400 },
      );
    }

    const reference = generateReference("DEP");

    // Record pending transaction
    await prisma.transaction.create({
      data: {
        userId: authUser.id,
        type: "DEPOSIT",
        amount,
        reference,
        description: `Wallet deposit of ₦${amount.toLocaleString()}`,
        status: "PENDING",
      },
    });

    // Initialize Paystack payment (amount in kobo)
    const paystackRes = await initializePayment(
      authUser.email,
      amount * 100,
      reference,
      { userId: authUser.id },
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/deposit/verify?reference=${reference}`,
    );

    if (!paystackRes.status) {
      return NextResponse.json(
        { error: "Payment initialization failed" },
        { status: 500 },
      );
    }

    return NextResponse.json({
      authorization_url: paystackRes.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Deposit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET /api/payments/deposit?reference=xxx - Verify deposit
export async function GET(req: NextRequest) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const reference = new URL(req.url).searchParams.get("reference");
    if (!reference) {
      return NextResponse.json(
        { error: "Reference required" },
        { status: 400 },
      );
    }

    const transaction = await prisma.transaction.findUnique({
      where: { reference },
    });

    if (!transaction || transaction.userId !== authUser.id) {
      return NextResponse.json(
        { error: "Transaction not found" },
        { status: 404 },
      );
    }

    if (transaction.status === "SUCCESS") {
      return NextResponse.json({
        message: "Already verified",
        status: "SUCCESS",
      });
    }

    const verification = await verifyPayment(reference);

    if (verification.data.status === "success") {
      await prisma.$transaction(async (tx) => {
        await tx.transaction.update({
          where: { reference },
          data: { status: "SUCCESS" },
        });

        await tx.user.update({
          where: { id: authUser.id },
          data: {
            balance: { increment: transaction.amount },
          },
        });
      });

      return NextResponse.json({
        message: "Deposit successful",
        status: "SUCCESS",
      });
    }

    return NextResponse.json({
      message: "Payment not yet verified",
      status: verification.data.status,
    });
  } catch (error) {
    console.error("Verify deposit error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
