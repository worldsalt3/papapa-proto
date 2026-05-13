import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

// POST /api/wagers/[id]/accept - Accept a wager challenge
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { side } = body;

    const wager = await prisma.wager.findUnique({
      where: { id },
      include: {
        participants: true,
      },
    });

    if (!wager) {
      return NextResponse.json({ error: "Wager not found" }, { status: 404 });
    }

    if (wager.status !== "PENDING") {
      return NextResponse.json(
        { error: "Wager is no longer accepting participants" },
        { status: 400 },
      );
    }

    if (wager.creatorId === authUser.id) {
      return NextResponse.json(
        { error: "Cannot accept your own wager" },
        { status: 400 },
      );
    }

    const alreadyJoined = wager.participants.find(
      (p) => p.userId === authUser.id,
    );
    if (alreadyJoined) {
      return NextResponse.json(
        { error: "Already participating in this wager" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!user || user.balance < wager.amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 },
      );
    }

    await prisma.$transaction(async (tx) => {
      // Deduct balance
      await tx.user.update({
        where: { id: authUser.id },
        data: {
          balance: { decrement: wager.amount },
          escrowBalance: { increment: wager.amount },
        },
      });

      // Add participant
      await tx.wagerParticipant.create({
        data: {
          wagerId: id,
          userId: authUser.id,
          side: side || "against",
          amount: wager.amount,
          status: "ACCEPTED",
        },
      });

      // Create escrow hold
      await tx.escrowHold.create({
        data: {
          amount: wager.amount,
          wagerId: id,
        },
      });

      // Activate the wager
      await tx.wager.update({
        where: { id },
        data: { status: "ACTIVE" },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          userId: authUser.id,
          type: "WAGER_STAKE",
          amount: wager.amount,
          description: `Accepted wager: ${wager.title}`,
          status: "SUCCESS",
        },
      });

      // Notify creator
      await tx.notification.create({
        data: {
          userId: wager.creatorId,
          type: "WAGER_ACCEPTED",
          title: "Challenge Accepted!",
          message: `@${authUser.username} accepted your wager: ${wager.title}`,
          link: `/wager/${id}`,
        },
      });
    });

    return NextResponse.json({ message: "Wager accepted" });
  } catch (error) {
    console.error("Accept wager error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
