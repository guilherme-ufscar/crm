import type { NextAuthConfig } from "next-auth";
import { SERVER_ENV } from "@/lib/server-env";

/**
 * Edge-compatible auth configuration.
 * Does NOT import bcrypt, prisma, or any Node.js-only modules.
 * Used by middleware.ts (which runs in the Edge Runtime).
 */
export const authConfig = {
  // Required behind reverse proxies (Nginx/Cloudflare) to avoid UntrustedHost in production.
  trustHost: true,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.role = (user as unknown as { role: string }).role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        (session.user as unknown as Record<string, unknown>).id = token.id as string;
        (session.user as unknown as Record<string, unknown>).role = token.role as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt" as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: SERVER_ENV.nextAuthSecret,
  providers: [], // Providers added in auth.ts (Node.js only)
} satisfies NextAuthConfig;
