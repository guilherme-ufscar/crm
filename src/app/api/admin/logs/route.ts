import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session || !["MASTER", "AUDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const logs = await prisma.auditLog.findMany({
    orderBy: { criadoEm: "desc" },
    take: 100,
    include: {
      admin: {
        select: { id: true, nome: true, email: true },
      },
    },
  });

  return NextResponse.json(logs);
}

