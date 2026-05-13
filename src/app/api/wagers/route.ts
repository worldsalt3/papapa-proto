import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

// GET /api/wagers - List public wagers
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q") || "";
    const category = searchParams.get("category");
    const type = searchParams.get("type");
    const page = parseInt(searchParams.get("page") || "1");
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    const where: Record<string, unknown> = {
      visibility: "PUBLIC",
      status: { in: ["PENDING", "ACTIVE"] },
    };

    if (q) {
      where.title = { contains: q, mode: "insensitive" };
    }
    if (category) {
      where.category = category;
    }
    if (type) {
      where.type = type;
    }

    const [wagers, total] = await Promise.all([
      prisma.wager.findMany({
        where,
        include: {
          creator: {
            select: { username: true },
          },
          _count: {
            select: { participants: true },
          },
        },
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.wager.count({ where }),
    ]);

    return NextResponse.json({
      wagers: wagers.map((w) => ({
        id: w.id,
        title: w.title,
        category: w.category,
        amount: w.amount,
        type: w.type,
        status: w.status,
        creatorUsername: w.creator.username,
        participantCount: w._count.participants,
        createdAt: w.createdAt.toISOString(),
        expiresAt: w.expiresAt?.toISOString(),
      })),
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (error) {
    console.error("List wagers error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// POST /api/wagers - Create a wager
export async function POST(req: NextRequest) {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const {
      type,
      title,
      description,
      category,
      amount,
      odds,
      opponentUsername,
      eventDate,
      expiresAt,
      visibility,
    } = body;

    if (!title || !description || !category || !amount || !type) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (amount < 100) {
      return NextResponse.json(
        { error: "Minimum wager amount is ₦100" },
        { status: 400 },
      );
    }

    // Check user balance
    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
    });

    if (!user || user.balance < amount) {
      return NextResponse.json(
        { error: "Insufficient balance" },
        { status: 400 },
      );
    }

    // Create wager and deduct balance in a transaction
    const wager = await prisma.$transaction(async (tx) => {
      // Deduct from balance
      await tx.user.update({
        where: { id: authUser.id },
        data: {
          balance: { decrement: amount },
          escrowBalance: { increment: amount },
        },
      });

      // Create wager
      const w = await tx.wager.create({
        data: {
          type: type as
            | "DIRECT_CHALLENGE"
            | "GROUP_POOL"
            | "COMMUNITY_MARKET"
            | "PREDICTION_CONTEST",
          title,
          description,
          category,
          amount,
          odds: odds || "1:1",
          visibility: visibility || "PUBLIC",
          eventDate: eventDate ? new Date(eventDate) : null,
          expiresAt: expiresAt ? new Date(expiresAt) : null,
          creatorId: authUser.id,
        },
      });

      // Create creator as participant
      await tx.wagerParticipant.create({
        data: {
          wagerId: w.id,
          userId: authUser.id,
          side: "for",
          amount,
          status: "ACCEPTED",
        },
      });

      // Create escrow hold
      await tx.escrowHold.create({
        data: {
          amount,
          wagerId: w.id,
        },
      });

      // Record transaction
      await tx.transaction.create({
        data: {
          userId: authUser.id,
          type: "WAGER_STAKE",
          amount,
          description: `Stake for wager: ${title}`,
          status: "SUCCESS",
        },
      });

      // If direct challenge with opponent, send notification
      if (type === "DIRECT_CHALLENGE" && opponentUsername) {
        const opponent = await tx.user.findUnique({
          where: { username: opponentUsername.toLowerCase().replace("@", "") },
        });

        if (opponent) {
          await tx.notification.create({
            data: {
              userId: opponent.id,
              type: "WAGER_CHALLENGE",
              title: "New Challenge!",
              message: `@${authUser.username} challenged you: ${title}`,
              link: `/wager/${w.id}`,
            },
          });
        }
      }

      return w;
    });

    return NextResponse.json({
      id: wager.id,
      message: "Wager created successfully",
    });
  } catch (error) {
    console.error("Create wager error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
