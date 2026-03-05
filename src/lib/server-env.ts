function asInt(value: string | undefined, fallback: number): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function asBool(value: string | undefined, fallback = false): boolean {
  if (value == null) return fallback;
  return ["1", "true", "yes", "on"].includes(value.toLowerCase());
}

export const SERVER_ENV = {
  databaseUrl: process.env.DATABASE_URL || "",
  nextAuthSecret: process.env.NEXTAUTH_SECRET || "",
  nextAuthUrl: process.env.NEXTAUTH_URL || "http://localhost:3000",
  appPort: asInt(process.env.APP_PORT || process.env.PORT, 3000),
  appHost: process.env.APP_HOST || "0.0.0.0",
  whatsappNumber: process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "",
  turnstileSecretKey: process.env.TURNSTILE_SECRET_KEY || "",
  smtpHost: process.env.SMTP_HOST || "",
  smtpPort: asInt(process.env.SMTP_PORT, 587),
  smtpSecure: asBool(process.env.SMTP_SECURE, false),
  smtpUser: process.env.SMTP_USER || "",
  smtpPass: process.env.SMTP_PASS || "",
  smtpFromName: process.env.SMTP_FROM_NAME || "Conecta Juris",
  smtpFromEmail: process.env.SMTP_FROM_EMAIL || "",
};
