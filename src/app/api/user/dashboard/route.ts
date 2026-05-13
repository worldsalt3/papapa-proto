import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUser } from "@/lib/auth";

export async function GET() {
  try {
    const authUser = await getUser();
    if (!authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: authUser.id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        email: true,
        balance: true,
        escrowBalance: true,
        reputationScore: true,
        totalWagers: true,
        wagersWon: true,
        wagersLost: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const recentWagers = await prisma.wager.findMany({
      where: {
        OR: [
          { creatorId: authUser.id },
          { participants: { some: { userId: authUser.id } } },
        ],
      },
      select: {
        id: true,
        title: true,
        amount: true,
        status: true,
        type: true,
        createdAt: true,
      },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    const notifications = await prisma.notification.findMany({
      where: { userId: authUser.id },
      orderBy: { createdAt: "desc" },
      take: 10,
    });

    return NextResponse.json({
      user,
      recentWagers,
      notifications,
    });
  } catch (error) {
    console.error("Dashboard error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
