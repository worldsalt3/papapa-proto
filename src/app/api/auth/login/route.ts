import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createToken, authCookieOptions } from "@/lib/auth";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { identifier, email: emailField, password } = body;

    const login = (identifier || emailField || "").trim().toLowerCase();

    if (!login || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: login }, { username: login }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 },
      );
    }

    const token = await createToken({
      id: user.id,
      email: user.email,
      username: user.username,
      role: user.role,
    });

    const cookieOpts = authCookieOptions();
    const res = NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    });

    res.cookies.set(cookieOpts.name, token, cookieOpts);
    return res;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
