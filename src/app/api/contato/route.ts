import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contatoSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  try {
    await limiter.check(5, ip);
  } catch {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = contatoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    await prisma.contatoMensagem.create({
      data: {
        nome: data.nome,
        email: data.email,
        assunto: data.assunto,
        mensagem: data.mensagem,
      },
    });

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error("Error creating contato:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar sua mensagem." },
      { status: 500 }
    );
  }
}
