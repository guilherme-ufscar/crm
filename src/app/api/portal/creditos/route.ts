import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/portal/creditos — lawyer's credit info and transaction history
export async function GET() {
  const session = await auth();
  if (!session || session.user.role !== "advogado") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const [advogado, transactions] = await Promise.all([
    prisma.advogado.findUnique({
      where: { id: session.user.id },
      select: { saldoCreditos: true },
    }),
    prisma.creditTransaction.findMany({
      where: { advogadoId: session.user.id },
      orderBy: { criadoEm: "desc" },
      take: 50,
    }),
  ]);

  return NextResponse.json({
    saldoCreditos: advogado?.saldoCreditos || 0,
    transactions,
  });
}
