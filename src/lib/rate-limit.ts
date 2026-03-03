/**
 * Simple in-memory rate limiter for MVP
 * In production, replace with Redis-based solution
 */

import { NextRequest } from "next/server";

const tokenCache = new Map<string, number[]>();

interface RateLimitOptions {
  interval: number;
  uniqueTokenPerInterval?: number;
}

export function rateLimit(options: RateLimitOptions) {
  const { interval, uniqueTokenPerInterval = 500 } = options;

  return {
    check: (limit: number, token: string): Promise<void> => {
      const now = Date.now();
      const tokenKey = token;

      // Clean up old entries
      if (tokenCache.size > uniqueTokenPerInterval) {
        const oldestAllowed = now - interval;
        for (const [key, timestamps] of tokenCache.entries()) {
          const valid = timestamps.filter((t) => t > oldestAllowed);
          if (valid.length === 0) {
            tokenCache.delete(key);
          } else {
            tokenCache.set(key, valid);
          }
        }
      }

      const timestamps = tokenCache.get(tokenKey) || [];
      const windowStart = now - interval;
      const recentTimestamps = timestamps.filter((t) => t > windowStart);

      if (recentTimestamps.length >= limit) {
        return Promise.reject(new Error("Rate limit exceeded"));
      }

      recentTimestamps.push(now);
      tokenCache.set(tokenKey, recentTimestamps);
      return Promise.resolve();
    },
  };
}

export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}
