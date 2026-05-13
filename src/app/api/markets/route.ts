import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const sort = searchParams.get("sort") || "newest";
    const limit = Math.min(parseInt(searchParams.get("limit") || "20"), 50);

    const where: Record<string, unknown> = {};
    if (category) {
      where.category = category;
    }

    let orderBy: Record<string, string> = {};
    switch (sort) {
      case "volume":
        orderBy = { totalYesAmount: "desc" };
        break;
      case "closing":
        orderBy = { expiresAt: "asc" };
        break;
      default:
        orderBy = { createdAt: "desc" };
    }

    const markets = await prisma.market.findMany({
      where,
      include: {
        _count: { select: { positions: true } },
      },
      orderBy,
      take: limit,
    });

    return NextResponse.json({
      markets: markets.map((m) => ({
        id: m.id,
        title: m.title,
        description: m.description,
        category: m.category,
        status: m.status,
        totalYesAmount: m.totalYesAmount,
        totalNoAmount: m.totalNoAmount,
        volume: m.totalYesAmount + m.totalNoAmount,
        yesPercentage:
          m.totalYesAmount + m.totalNoAmount > 0
            ? Math.round(
                (m.totalYesAmount / (m.totalYesAmount + m.totalNoAmount)) * 100,
              )
            : 50,
        positionCount: m._count.positions,
        expiresAt: m.expiresAt.toISOString(),
        createdAt: m.createdAt.toISOString(),
      })),
    });
  } catch (error) {
    console.error("Markets error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
