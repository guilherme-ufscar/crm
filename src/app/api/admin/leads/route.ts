import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "N�o autorizado" }, { status: 401 });
  }

  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const area = url.searchParams.get("area");
  const qualidade = url.searchParams.get("qualidade");
  const search = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};
  if (status) where.status = status;
  if (area) where.areaDireito = area;
  if (qualidade) where.qualidade = qualidade;
  if (search) {
    where.OR = [
      { nome: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { whatsapp: { contains: search } },
      { cidade: { contains: search, mode: "insensitive" } },
    ];
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { criadoEm: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      include: {
        advogado: {
          select: { id: true, nome: true, email: true },
        },
      },
    }),
    prisma.lead.count({ where }),
  ]);

  return NextResponse.json({
    leads,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
}
