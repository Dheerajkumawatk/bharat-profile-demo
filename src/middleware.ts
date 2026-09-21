import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("auth_token")?.value;
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  // Protect /admin routes (except /admin/login)
  if (request.nextUrl.pathname.startsWith("/admin") && !isLoginPage) {
    if (token !== process.env.ADMIN_SESSION_TOKEN) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Protect /api/sarpanch routes
  if (request.nextUrl.pathname.startsWith("/api/sarpanch")) {
    if (token !== process.env.ADMIN_SESSION_TOKEN) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // If trying to access login page while already authenticated, redirect to dashboard
  if (isLoginPage && token === process.env.ADMIN_SESSION_TOKEN) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/sarpanch/:path*"],
};
