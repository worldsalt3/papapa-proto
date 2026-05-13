import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get("sort") || "reputation";
    const limit = Math.min(parseInt(searchParams.get("limit") || "50"), 100);

    const orderBy: Record<string, string> = {};
    switch (sort) {
      case "winRate":
        orderBy.wagersWon = "desc";
        break;
      case "totalWagers":
        orderBy.totalWagers = "desc";
        break;
      case "profit":
        orderBy.wagersWon = "desc";
        break;
      default:
        orderBy.reputationScore = "desc";
    }

    const users = await prisma.user.findMany({
      where: { totalWagers: { gt: 0 } },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        totalWagers: true,
        wagersWon: true,
        wagersLost: true,
        reputationScore: true,
      },
      orderBy,
      take: limit,
    });

    const leaderboard = users.map((u, i) => ({
      rank: i + 1,
      id: u.id,
      username: u.username,
      name: `${u.firstName} ${u.lastName[0]}.`,
      initials: `${u.firstName[0]}${u.lastName[0]}`,
      totalWagers: u.totalWagers,
      wagersWon: u.wagersWon,
      wagersLost: u.wagersLost,
      winRate:
        u.totalWagers > 0 ? Math.round((u.wagersWon / u.totalWagers) * 100) : 0,
      reputationScore: u.reputationScore,
    }));

    // Re-sort by win rate if needed (computed field)
    if (sort === "winRate") {
      leaderboard.sort((a, b) => b.winRate - a.winRate);
      leaderboard.forEach((u, i) => (u.rank = i + 1));
    }

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error("Leaderboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
