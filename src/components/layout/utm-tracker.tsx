"use client";

import { useEffect } from "react";
import { persistUtmParams } from "@/lib/analytics";

export function UtmTracker() {
  useEffect(() => {
    persistUtmParams();
  }, []);
  return null;
}
