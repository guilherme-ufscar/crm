import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/portal/leads � available leads for purchase (masked data)
export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  const url = new URL(req.url);
  const area = url.searchParams.get("area");
  const uf = url.searchParams.get("uf");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  // Get lawyer's areas
  const advogado = await prisma.advogado.findUnique({
    where: { id: session.user.id },
    select: { areasAtuacao: true },
  });

  if (!advogado) {
    return NextResponse.json({ error: "Advogado n�o encontrado" }, { status: 404 });
  }

  const where: Record<string, unknown> = {
    status: "A_VENDA",
  };

  // Filter by lawyer's areas or specific area
  if (area) {
    where.areaDireito = area;
  } else if (advogado.areasAtuacao.length > 0) {
    where.areaDireito = { in: advogado.areasAtuacao };
  }

  if (uf) where.uf = uf;

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { criadoEm: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        // Masked data � no name, no whatsapp, no email
        id: true,
        areaDireito: true,
        cidade: true,
        uf: true,
        urgencia: true,
        descricao: true, // Will be truncated on frontend
        qualidade: true,
        temDocumentos: true,
        criadoEm: true,
      },
    }),
    prisma.lead.count({ where }),
  ]);

  // Mask description (first 80 chars)
  const maskedLeads = leads.map((lead) => ({
    ...lead,
    descricao: lead.descricao ? lead.descricao.substring(0, 80) + "..." : "",
  }));

  return NextResponse.json({
    leads: maskedLeads,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
