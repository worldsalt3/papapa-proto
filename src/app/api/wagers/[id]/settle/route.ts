import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";
import { PLATFORM_COMMISSION_RATE } from "@/lib/utils";

// POST /api/wagers/[id]/settle - Settle a wager (admin/moderator only)
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const authUser = await getUser();
    if (
      !authUser ||
      (authUser.role !== "ADMIN" && authUser.role !== "MODERATOR")
    ) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { outcome, winningSide, settlementNote } = body;

    if (!outcome || !winningSide) {
      return NextResponse.json(
        { error: "Outcome and winning side are required" },
        { status: 400 },
      );
    }

    const wager = await prisma.wager.findUnique({
      where: { id },
      include: {
        participants: true,
        escrowHolds: { where: { status: "HELD" } },
      },
    });

    if (!wager) {
      return NextResponse.json({ error: "Wager not found" }, { status: 404 });
    }

    if (wager.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "Wager is not active" },
        { status: 400 },
      );
    }

    const winners = wager.participants.filter((p) => p.side === winningSide);
    const losers = wager.participants.filter((p) => p.side !== winningSide);

    const totalPool = wager.participants.reduce((sum, p) => sum + p.amount, 0);
    const winnerPool = winners.reduce((sum, p) => sum + p.amount, 0);

    await prisma.$transaction(async (tx) => {
      // Settle each winner
      for (const winner of winners) {
        const proportion = winner.amount / winnerPool;
        const grossPayout = totalPool * proportion;
        const profit = grossPayout - winner.amount;
        const commission = profit * PLATFORM_COMMISSION_RATE;
        const netPayout = grossPayout - commission;

        // Update participant
        await tx.wagerParticipant.update({
          where: { id: winner.id },
          data: { payout: netPayout, status: "SETTLED" },
        });

        // Credit winner
        await tx.user.update({
          where: { id: winner.userId },
          data: {
            balance: { increment: netPayout },
            escrowBalance: { decrement: winner.amount },
            wagersWon: { increment: 1 },
            totalWagers: { increment: 1 },
            reputationScore: { increment: 2 },
          },
        });

        // Record payout transaction
        await tx.transaction.create({
          data: {
            userId: winner.userId,
            type: "WAGER_PAYOUT",
            amount: netPayout,
            description: `Won wager: ${wager.title}`,
            status: "SUCCESS",
          },
        });

        // Record commission
        if (commission > 0) {
          await tx.transaction.create({
            data: {
              userId: winner.userId,
              type: "COMMISSION",
              amount: commission,
              description: `Platform commission (10%) on wager: ${wager.title}`,
              status: "SUCCESS",
            },
          });
        }

        // Notify winner
        await tx.notification.create({
          data: {
            userId: winner.userId,
            type: "WAGER_WON",
            title: "You Won! 🎉",
            message: `You won ₦${netPayout.toLocaleString()} on: ${wager.title}`,
            link: `/wager/${id}`,
          },
        });
      }

      // Update losers
      for (const loser of losers) {
        await tx.wagerParticipant.update({
          where: { id: loser.id },
          data: { payout: 0, status: "SETTLED" },
        });

        await tx.user.update({
          where: { id: loser.userId },
          data: {
            escrowBalance: { decrement: loser.amount },
            wagersLost: { increment: 1 },
            totalWagers: { increment: 1 },
            reputationScore: { decrement: 1 },
          },
        });

        await tx.notification.create({
          data: {
            userId: loser.userId,
            type: "WAGER_LOST",
            title: "Better luck next time",
            message: `You lost ₦${loser.amount.toLocaleString()} on: ${wager.title}`,
            link: `/wager/${id}`,
          },
        });
      }

      // Release escrow
      for (const hold of wager.escrowHolds) {
        await tx.escrowHold.update({
          where: { id: hold.id },
          data: { status: "RELEASED", releasedAt: new Date() },
        });
      }

      // Update wager
      await tx.wager.update({
        where: { id },
        data: {
          status: "SETTLED",
          outcome,
          settlementNote,
          resolvedAt: new Date(),
        },
      });
    });

    return NextResponse.json({ message: "Wager settled successfully" });
  } catch (error) {
    console.error("Settle wager error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
