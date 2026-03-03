import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { advogadoCadastroSchema } from "@/lib/validations";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import bcrypt from "bcryptjs";

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
    const parsed = advogadoCadastroSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check duplicate email
    const existingEmail = await prisma.advogado.findUnique({
      where: { email: data.email },
    });
    if (existingEmail) {
      return NextResponse.json(
        { error: "E-mail já cadastrado" },
        { status: 409 }
      );
    }

    // Check duplicate OAB
    const existingOab = await prisma.advogado.findFirst({
      where: { oabNumero: data.oabNumero, oabUf: data.oabUf },
    });
    if (existingOab) {
      return NextResponse.json(
        { error: "OAB já cadastrada" },
        { status: 409 }
      );
    }

    // Hash password
    const senhaHash = await bcrypt.hash(data.senha, 12);

    const advogado = await prisma.advogado.create({
      data: {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        oabNumero: data.oabNumero,
        oabUf: data.oabUf,
        areasAtuacao: data.areasAtuacao,
        estado: data.estado,
        cidade: data.cidade,
        senhaHash,
        ativo: true,
        saldoCreditos: 0,
      },
    });

    return NextResponse.json(
      {
        success: true,
        advogado: {
          id: advogado.id,
          nome: advogado.nome,
          email: advogado.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating advogado:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar cadastro." },
      { status: 500 }
    );
  }
}
