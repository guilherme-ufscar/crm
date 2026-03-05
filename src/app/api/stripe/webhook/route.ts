import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Webhook Stripe desativado. Pagamentos são processados offline." },
    { status: 410 }
  );
}
