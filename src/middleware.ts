import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;
  const role = (req.auth?.user as { role?: string } | undefined)?.role;

  // Skip login pages — they must be publicly accessible
  if (pathname === "/admin/login" || pathname === "/login") {
    return NextResponse.next();
  }

  // Protect /portal routes - require advogado login
  if (pathname.startsWith("/portal")) {
    if (!isLoggedIn || role !== "advogado") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  // Protect /admin routes - require admin login
  if (pathname.startsWith("/admin")) {
    if (!isLoggedIn || !["MASTER", "OPERADOR", "AUDITOR"].includes(role || "")) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/portal/:path*", "/admin/:path*"],
};
