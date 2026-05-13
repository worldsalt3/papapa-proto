import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/wagers/[id] - Fetch a single wager
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;

    const wager = await prisma.wager.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, username: true, firstName: true, lastName: true },
        },
        participants: {
          include: {
            user: {
              select: { id: true, username: true },
            },
          },
        },
        _count: {
          select: { participants: true },
        },
      },
    });

    if (!wager) {
      return NextResponse.json({ error: "Wager not found" }, { status: 404 });
    }

    return NextResponse.json({
      wager: {
        id: wager.id,
        title: wager.title,
        description: wager.description,
        category: wager.category,
        amount: wager.amount,
        odds: wager.odds,
        type: wager.type,
        status: wager.status,
        visibility: wager.visibility,
        creatorId: wager.creatorId,
        creatorUsername: wager.creator.username,
        creatorName:
          [wager.creator.firstName, wager.creator.lastName]
            .filter(Boolean)
            .join(" ") || wager.creator.username,
        participantCount: wager._count.participants,
        participants: wager.participants.map((p) => ({
          id: p.id,
          userId: p.userId,
          username: p.user.username,
          side: p.side,
          createdAt: p.createdAt.toISOString(),
        })),
        eventDate: wager.eventDate?.toISOString(),
        expiresAt: wager.expiresAt?.toISOString(),
        createdAt: wager.createdAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("GET /api/wagers/[id] error", err);
    return NextResponse.json(
      { error: "Failed to load wager" },
      { status: 500 },
    );
  }
}
