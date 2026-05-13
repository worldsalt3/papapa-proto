import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

// POST /api/disputes - Create a dispute
export async function POST(req: NextRequest) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { wagerId, poolId, marketId, reason, evidence } = body;

    if (!reason) {
      return NextResponse.json(
        { error: "Reason is required" },
        { status: 400 },
      );
    }

    if (!wagerId && !poolId && !marketId) {
      return NextResponse.json(
        { error: "Must reference a wager, pool, or market" },
        { status: 400 },
      );
    }

    const dispute = await prisma.dispute.create({
      data: {
        creatorId: authUser.id,
        wagerId: wagerId || null,
        poolId: poolId || null,
        marketId: marketId || null,
        reason,
        evidence: evidence || null,
      },
    });

    // If it's a wager dispute, mark the wager as disputed
    if (wagerId) {
      await prisma.wager.update({
        where: { id: wagerId },
        data: { status: "DISPUTED" },
      });
    }

    // Update user dispute count
    await prisma.user.update({
      where: { id: authUser.id },
      data: { disputesRaised: { increment: 1 } },
    });

    return NextResponse.json({
      id: dispute.id,
      message: "Dispute created",
    });
  } catch (error) {
    console.error("Create dispute error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
