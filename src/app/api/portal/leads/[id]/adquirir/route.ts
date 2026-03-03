import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateLawyerWhatsAppUrl } from "@/lib/whatsapp";

// POST /api/portal/leads/[id]/adquirir — purchase a lead with credits
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const { id } = await params;
  const CREDIT_COST = 1; // 1 credit per lead

  try {
    // Use transaction for atomicity
    const result = await prisma.$transaction(async (tx) => {
      // Get lead
      const lead = await tx.lead.findUnique({ where: { id } });
      if (!lead) throw new Error("Lead não encontrado");
      if (lead.status !== "A_VENDA") throw new Error("Lead não está disponível para compra");

      // Get lawyer
      const advogado = await tx.advogado.findUnique({
        where: { id: session.user.id },
      });
      if (!advogado) throw new Error("Advogado não encontrado");
      if (!advogado.ativo) throw new Error("Conta desativada");
      if (advogado.saldoCreditos < CREDIT_COST) {
        throw new Error("Créditos insuficientes");
      }

      // Deduct credits
      await tx.advogado.update({
        where: { id: advogado.id },
        data: { saldoCreditos: { decrement: CREDIT_COST } },
      });

      // Update lead
      const updatedLead = await tx.lead.update({
        where: { id },
        data: {
          status: "VENDIDO",
          advogadoId: advogado.id,
          vendidoEm: new Date(),
        },
      });

      // Credit transaction log
      await tx.creditTransaction.create({
        data: {
          advogadoId: advogado.id,
          tipo: "USO",
          quantidade: -CREDIT_COST,
          descricao: `Aquisição do lead #${lead.id.substring(0, 8)}`,
          leadId: lead.id,
        },
      });

      return updatedLead;
    });

    // Generate lawyer → client WhatsApp URL
    const whatsappUrl = generateLawyerWhatsAppUrl({
      clienteWhatsapp: result.whatsapp,
      nomeCliente: result.nome,
      area: result.areaDireito,
    });

    return NextResponse.json({
      success: true,
      lead: {
        id: result.id,
        nome: result.nome,
        whatsapp: result.whatsapp,
        email: result.email,
        cidade: result.cidade,
        uf: result.uf,
        areaDireito: result.areaDireito,
        descricao: result.descricao,
        urgencia: result.urgencia,
        temDocumentos: result.temDocumentos,
      },
      whatsappUrl,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Erro interno";
    const status =
      message === "Lead não encontrado" ? 404 :
      message === "Lead não está disponível para compra" ? 409 :
      message === "Créditos insuficientes" ? 402 :
      message === "Conta desativada" ? 403 : 500;

    return NextResponse.json({ error: message }, { status });
  }
}
