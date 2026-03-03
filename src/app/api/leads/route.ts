import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { leadFormSchema } from "@/lib/validations";
import { generateWhatsAppUrl } from "@/lib/whatsapp";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const limiter = rateLimit({ interval: 60 * 1000, uniqueTokenPerInterval: 500 });

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = getClientIp(req);
  try {
    await limiter.check(10, ip); // 10 per minute
  } catch {
    return NextResponse.json(
      { error: "Muitas requisições. Tente novamente em instantes." },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const parsed = leadFormSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Dados inválidos", details: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const data = parsed.data;

    // Check blocking flags
    const possuiAdvogado = data.possuiAdvogado === true;
    const processoEmAndamento = data.processoEmAndamento === true;

    // Create lead
    const lead = await prisma.lead.create({
      data: {
        nome: data.nome,
        whatsapp: data.whatsapp,
        email: data.email || null,
        cidade: data.cidade,
        uf: data.uf,
        areaDireito: data.areaDireito,
        urgencia: data.urgencia,
        descricao: data.descricao,
        temDocumentos: data.temDocumentos || false,
        possuiAdvogado,
        processoEmAndamento,
        melhorHorario: data.melhorHorario || null,
        consentimentoLGPD: !!data.consentimentoLGPD,
        consentimentoWhatsApp: !!data.consentimentoWhatsApp,
        canalOrigem: "SITE",
        // UTM parameters (from raw body, not validated schema)
        utmSource: (body.utmSource as string) || null,
        utmMedium: (body.utmMedium as string) || null,
        utmCampaign: (body.utmCampaign as string) || null,
        utmTerm: (body.utmTerm as string) || null,
        utmContent: (body.utmContent as string) || null,
        // Auto-block if has lawyer or ongoing process
        status: possuiAdvogado || processoEmAndamento ? "BLOQUEADO" : "NOVO",
      },
    });

    // Generate WhatsApp URL
    const whatsappUrl = generateWhatsAppUrl({
      leadId: lead.id,
      area: data.areaDireito,
      nome: data.nome,
      cidade: data.cidade,
      uf: data.uf,
      urgencia: data.urgencia,
      resumo: data.descricao.substring(0, 100),
    });

    return NextResponse.json(
      {
        success: true,
        leadId: lead.id,
        whatsappUrl,
        blocked: lead.status === "BLOQUEADO",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating lead:", error);
    return NextResponse.json(
      { error: "Erro interno ao processar sua solicitação." },
      { status: 500 }
    );
  }
}
