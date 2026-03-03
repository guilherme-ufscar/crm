import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  // Dashboard stats
  const [
    totalLeads,
    leadsNovos,
    leadsRetidos,
    leadsAVenda,
    leadsVendidos,
    leadsBloqueados,
    totalAdvogados,
    advogadosAtivos,
    receitaTotal,
    leadsHoje,
  ] = await Promise.all([
    prisma.lead.count(),
    prisma.lead.count({ where: { status: "NOVO" } }),
    prisma.lead.count({ where: { status: "RETIDO" } }),
    prisma.lead.count({ where: { status: "A_VENDA" } }),
    prisma.lead.count({ where: { status: "VENDIDO" } }),
    prisma.lead.count({ where: { status: "BLOQUEADO" } }),
    prisma.advogado.count(),
    prisma.advogado.count({ where: { ativo: true } }),
    prisma.order.aggregate({
      _sum: { valorCentavos: true },
      where: { status: "PAGO" },
    }),
    prisma.lead.count({
      where: {
        criadoEm: { gte: new Date(new Date().setHours(0, 0, 0, 0)) },
      },
    }),
  ]);

  // Leads by area
  const leadsPorArea = await prisma.lead.groupBy({
    by: ["areaDireito"],
    _count: { id: true },
  });

  // Recent leads
  const recentLeads = await prisma.lead.findMany({
    orderBy: { criadoEm: "desc" },
    take: 10,
    select: {
      id: true,
      nome: true,
      areaDireito: true,
      cidade: true,
      uf: true,
      status: true,
      qualidade: true,
      criadoEm: true,
    },
  });

  return NextResponse.json({
    stats: {
      totalLeads,
      leadsNovos,
      leadsRetidos,
      leadsAVenda,
      leadsVendidos,
      leadsBloqueados,
      totalAdvogados,
      advogadosAtivos,
      receitaTotal: receitaTotal._sum.valorCentavos || 0,
      leadsHoje,
    },
    leadsPorArea: leadsPorArea.map((l) => ({
      area: l.areaDireito,
      count: l._count.id,
    })),
    recentLeads,
  });
}
