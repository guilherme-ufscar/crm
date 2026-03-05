import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/portal/meus-leads � lawyer's purchased leads
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  const url = new URL(req.url);
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where: {
        advogadoId: session.user.id,
        status: "VENDIDO",
      },
      orderBy: { vendidoEm: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        nome: true,
        whatsapp: true,
        email: true,
        areaDireito: true,
        cidade: true,
        uf: true,
        urgencia: true,
        descricao: true,
        temDocumentos: true,
        qualidade: true,
        statusAdvogado: true,
        vendidoEm: true,
        criadoEm: true,
      },
    }),
    prisma.lead.count({
      where: { advogadoId: session.user.id, status: "VENDIDO" },
    }),
  ]);

  return NextResponse.json({
    leads,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
