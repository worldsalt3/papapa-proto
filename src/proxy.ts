import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "papapa-secret-key-change-in-production",
);

const protectedPaths = [
  "/dashboard",
  "/api/user",
  "/api/wagers",
  "/api/payments",
  "/api/disputes",
];
const authPaths = ["/login", "/register"];

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Check if path needs auth
  const isProtected = protectedPaths.some((p) => pathname.startsWith(p));
  const isAuthPage = authPaths.some((p) => pathname.startsWith(p));

  const token = req.cookies.get("papapa-auth-token")?.value;

  let user = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET);
      user = payload;
    } catch {
      // Invalid token
    }
  }

  // Redirect to login if accessing protected route without auth
  if (isProtected && !user) {
    // Allow public GET on /api/wagers
    if (pathname === "/api/wagers" && req.method === "GET") {
      return NextResponse.next();
    }
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Redirect to dashboard if accessing auth pages while logged in
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/register",
    "/api/user/:path*",
    "/api/wagers/:path*",
    "/api/payments/:path*",
    "/api/disputes/:path*",
  ],
};
