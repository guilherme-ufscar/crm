import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    { error: "Pagamento online desativado. Finalize sua compra pelo WhatsApp." },
    { status: 410 }
  );
}
