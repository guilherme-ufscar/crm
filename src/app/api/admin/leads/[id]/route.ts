import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { leadClassificacaoSchema } from "@/lib/validations";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  const lead = await prisma.lead.findUnique({
    where: { id },
    include: {
      anexos: true,
      advogado: {
        select: { id: true, nome: true, email: true, oabNumero: true, oabUf: true },
      },
    },
  });

  if (!lead) {
    return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
  }

  return NextResponse.json(lead);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const body = await req.json();
    const parsed = leadClassificacaoSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const lead = await prisma.lead.findUnique({ where: { id } });
    if (!lead) {
      return NextResponse.json({ error: "Lead não encontrado" }, { status: 404 });
    }

    const updated = await prisma.lead.update({
      where: { id },
      data: {
        status: parsed.data.status,
        qualidade: parsed.data.qualidade || lead.qualidade,
        observacoesAdmin: parsed.data.observacoesAdmin || lead.observacoesAdmin,
      },
    });

    // Audit log
    await prisma.auditLog.create({
      data: {
        acao: `Lead ${id} alterado para ${parsed.data.status}`,
        entidade: "Lead",
        entidadeId: id,
        adminId: session.user.id,
        detalhes: JSON.stringify({
          statusAnterior: lead.status,
          statusNovo: parsed.data.status,
          qualidade: parsed.data.qualidade,
        }),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating lead:", error);
    return NextResponse.json({ error: "Erro interno" }, { status: 500 });
  }
}
