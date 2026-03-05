import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/portal/dashboard � lawyer's dashboard data
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  const advogadoId = session.user.id;

  const [advogado, totalLeads, leadsDisp, recentLeads] = await Promise.all([
    prisma.advogado.findUnique({
      where: { id: advogadoId },
      select: {
        nome: true,
        saldoCreditos: true,
        areasAtuacao: true,
      },
    }),
    prisma.lead.count({
      where: { advogadoId, status: "VENDIDO" },
    }),
    prisma.lead.count({
      where: {
        status: "A_VENDA",
        areaDireito: { in: (await prisma.advogado.findUnique({ where: { id: advogadoId }, select: { areasAtuacao: true } }))?.areasAtuacao || [] },
      },
    }),
    prisma.lead.findMany({
      where: { advogadoId, status: "VENDIDO" },
      orderBy: { vendidoEm: "desc" },
      take: 5,
      select: {
        id: true,
        nome: true,
        areaDireito: true,
        cidade: true,
        uf: true,
        vendidoEm: true,
        statusAdvogado: true,
      },
    }),
  ]);

  return NextResponse.json({
    advogado,
    stats: {
      totalLeadsAdquiridos: totalLeads,
      leadsDisponiveis: leadsDisp,
      saldoCreditos: advogado?.saldoCreditos || 0,
    },
    recentLeads,
  });
}
