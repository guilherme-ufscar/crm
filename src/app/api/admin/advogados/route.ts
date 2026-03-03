import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const url = new URL(req.url);
  const search = url.searchParams.get("search");
  const ativo = url.searchParams.get("ativo");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "20");

  const where: Record<string, unknown> = {};
  if (ativo !== null && ativo !== "") where.ativo = ativo === "true";
  if (search) {
    where.OR = [
      { nome: { contains: search, mode: "insensitive" } },
      { email: { contains: search, mode: "insensitive" } },
      { oabNumero: { contains: search } },
    ];
  }

  const [advogados, total] = await Promise.all([
    prisma.advogado.findMany({
      where,
      orderBy: { criadoEm: "desc" },
      skip: (page - 1) * limit,
      take: limit,
      select: {
        id: true,
        nome: true,
        email: true,
        telefone: true,
        oabNumero: true,
        oabUf: true,
        areasAtuacao: true,
        estado: true,
        cidade: true,
        ativo: true,
        saldoCreditos: true,
        criadoEm: true,
        _count: { select: { leadsAdquiridos: true } },
      },
    }),
    prisma.advogado.count({ where }),
  ]);

  return NextResponse.json({
    advogados,
    pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
  });
}
