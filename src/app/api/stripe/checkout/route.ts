import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

// POST /api/stripe/checkout — create Stripe checkout session
export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { pacoteId } = body;

    if (!pacoteId) {
      return NextResponse.json({ error: "Pacote não informado" }, { status: 400 });
    }

    const pacote = await prisma.pacote.findUnique({ where: { id: pacoteId } });
    if (!pacote || !pacote.ativo) {
      return NextResponse.json({ error: "Pacote não encontrado ou inativo" }, { status: 404 });
    }

    const advogado = await prisma.advogado.findUnique({
      where: { id: session.user.id },
    });
    if (!advogado) {
      return NextResponse.json({ error: "Advogado não encontrado" }, { status: 404 });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        advogadoId: advogado.id,
        pacoteId: pacote.id,
        valorCentavos: pacote.precoCentavos,
        creditosComprados: pacote.creditos,
        status: "PENDENTE",
      },
    });

    // Create Stripe checkout session
    const checkoutSession = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "boleto"],
      mode: "payment",
      customer_email: advogado.email,
      client_reference_id: order.id,
      metadata: {
        orderId: order.id,
        advogadoId: advogado.id,
        pacoteId: pacote.id,
        creditos: pacote.creditos.toString(),
      },
      line_items: [
        {
          price_data: {
            currency: "brl",
            unit_amount: pacote.precoCentavos,
            product_data: {
              name: `Pacote ${pacote.nome}`,
              description: `${pacote.creditos} créditos para leads jurídicos`,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/pacotes/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/portal/pacotes`,
    });

    // Update order with Stripe session ID
    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: checkoutSession.id },
    });

    return NextResponse.json({ url: checkoutSession.url });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    return NextResponse.json({ error: "Erro ao criar sessão de pagamento" }, { status: 500 });
  }
}
