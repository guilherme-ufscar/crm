import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
    const session = await auth();
    if (!session || !["MASTER", "OPERADOR"].includes(session.user.role)) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { advogadoId, quantidadeLeads, valorUnitarioCentavos } = body;

        if (!advogadoId || !quantidadeLeads || quantidadeLeads < 1) {
            return NextResponse.json(
                { error: "Dados inválidos. Informe o advogado e a quantidade de leads." },
                { status: 400 }
            );
        }

        // Verify the advogado exists
        const advogado = await prisma.advogado.findUnique({
            where: { id: advogadoId },
        });

        if (!advogado) {
            return NextResponse.json(
                { error: "Advogado não encontrado." },
                { status: 404 }
            );
        }

        const valorTotal = (valorUnitarioCentavos || 0) * quantidadeLeads;

        // Find or create a generic offline package
        let pacoteOffline = await prisma.pacote.findFirst({
            where: { nome: "Venda Offline" },
        });

        if (!pacoteOffline) {
            pacoteOffline = await prisma.pacote.create({
                data: {
                    nome: "Venda Offline",
                    descricao: "Pacote gerado automaticamente para vendas offline",
                    creditos: quantidadeLeads,
                    precoCentavos: valorTotal,
                    ativo: false, // Hidden from public listing
                },
            });
        }

        // Create order (already paid)
        const order = await prisma.order.create({
            data: {
                advogadoId,
                pacoteId: pacoteOffline.id,
                valorCentavos: valorTotal,
                creditosComprados: quantidadeLeads,
                status: "PAGO",
                pagoEm: new Date(),
            },
        });

        // Add credits to the lawyer
        await prisma.advogado.update({
            where: { id: advogadoId },
            data: {
                saldoCreditos: { increment: quantidadeLeads },
            },
        });

        // Create credit transaction record
        await prisma.creditTransaction.create({
            data: {
                advogadoId,
                tipo: "COMPRA",
                quantidade: quantidadeLeads,
                descricao: `Venda offline - ${quantidadeLeads} leads`,
                orderId: order.id,
            },
        });

        // Create audit log
        await prisma.auditLog.create({
            data: {
                adminId: session.user.id,
                acao: "VENDA_OFFLINE",
                entidade: "Order",
                entidadeId: order.id,
                detalhes: JSON.stringify({
                    advogadoId,
                    advogadoNome: advogado.nome,
                    quantidadeLeads,
                    valorTotalCentavos: valorTotal,
                }),
            },
        });

        return NextResponse.json(
            {
                success: true,
                orderId: order.id,
                advogadoNome: advogado.nome,
                creditosAdicionados: quantidadeLeads,
                novoSaldo: advogado.saldoCreditos + quantidadeLeads,
                valorTotal,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Error creating offline sale:", error);
        return NextResponse.json(
            { error: "Erro interno ao processar a venda." },
            { status: 500 }
        );
    }
}

export async function GET(req: NextRequest) {
    const session = await auth();
    if (!session || !["MASTER", "OPERADOR", "AUDITOR"].includes(session.user.role)) {
        return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
    }

    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "20");

    const [vendas, total] = await Promise.all([
        prisma.order.findMany({
            where: {
                stripeSessionId: null, // Offline orders don't have stripe session
                stripePaymentId: null,
            },
            orderBy: { criadoEm: "desc" },
            skip: (page - 1) * limit,
            take: limit,
            include: {
                advogado: {
                    select: { id: true, nome: true, email: true },
                },
            },
        }),
        prisma.order.count({
            where: {
                stripeSessionId: null,
                stripePaymentId: null,
            },
        }),
    ]);

    return NextResponse.json({
        vendas,
        pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    });
}

