import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const orderId = session.metadata?.orderId;
    const advogadoId = session.metadata?.advogadoId;
    const creditos = parseInt(session.metadata?.creditos || "0");

    if (!orderId || !advogadoId || !creditos) {
      console.error("Missing metadata in Stripe session:", session.id);
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      await prisma.$transaction(async (tx) => {
        // Update order
        await tx.order.update({
          where: { id: orderId },
          data: {
            status: "PAGO",
            stripePaymentId: session.payment_intent as string,
            pagoEm: new Date(),
          },
        });

        // Add credits to lawyer
        await tx.advogado.update({
          where: { id: advogadoId },
          data: {
            saldoCreditos: { increment: creditos },
          },
        });

        // Credit transaction log
        await tx.creditTransaction.create({
          data: {
            advogadoId,
            tipo: "COMPRA",
            quantidade: creditos,
            descricao: `Compra de ${creditos} créditos (pedido #${orderId.substring(0, 8)})`,
            orderId,
          },
        });
      });

      console.log(`✓ Payment processed: Order ${orderId}, ${creditos} credits added to ${advogadoId}`);
    } catch (error) {
      console.error("Error processing payment:", error);
      return NextResponse.json({ error: "Error processing payment" }, { status: 500 });
    }
  }

  if (event.type === "checkout.session.expired") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "CANCELADO" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
