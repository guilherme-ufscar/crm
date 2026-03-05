const rawWhatsApp = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "";

export const PUBLIC_WHATSAPP_NUMBER = rawWhatsApp.replace(/\D/g, "");
export const PUBLIC_APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const PUBLIC_GA_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const PUBLIC_TURNSTILE_SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || "";

export function buildWhatsAppUrl(message?: string): string {
  if (!PUBLIC_WHATSAPP_NUMBER) return "https://wa.me/";
  if (!message) return `https://wa.me/${PUBLIC_WHATSAPP_NUMBER}`;
  return `https://wa.me/${PUBLIC_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
