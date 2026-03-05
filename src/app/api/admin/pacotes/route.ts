import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { pacoteSchema } from "@/lib/validations";

export async function GET() {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  const pacotes = await prisma.pacote.findMany({
    orderBy: { creditos: "asc" },
  });

  return NextResponse.json(pacotes);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "MASTER") {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const parsed = pacoteSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inv�lidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const pacote = await prisma.pacote.create({
      data: {
        nome: parsed.data.nome,
        descricao: parsed.data.descricao || null,
        creditos: parsed.data.creditos,
        precoCentavos: parsed.data.precoCentavos,
        ativo: true,
      },
    });

    return NextResponse.json(pacote, { status: 201 });
  } catch (error) {
    console.error("Error creating pacote:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
