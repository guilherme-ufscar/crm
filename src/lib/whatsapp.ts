import { cleanPhoneNumber, truncateText, getAreaByValue } from "./utils";

interface WhatsAppMessageData {
  leadId: string;
  area: string;
  nome: string;
  cidade?: string | null;
  uf?: string | null;
  urgencia: string;
  resumo: string;
}

/**
 * Generates a wa.me URL with pre-filled message for client redirect
 */
export function generateWhatsAppUrl(data: WhatsAppMessageData): string {
  const phoneNumber = cleanPhoneNumber(process.env.WHATSAPP_NUMBER || "");
  const areaLabel = getAreaByValue(data.area)?.label || data.area;
  const location = [data.cidade, data.uf].filter(Boolean).join("/");
  const resumo = truncateText(data.resumo, 250);

  const urgenciaMap: Record<string, string> = {
    URGENTE: "Urgente",
    ALTA: "Alta prioridade",
    MEDIA: "Média prioridade",
    BAIXA: "Sem pressa",
  };

  const lines = [
    `🔷 *Lead #${data.leadId}*`,
    ``,
    `📋 *Área:* ${areaLabel}`,
    `👤 *Nome:* ${data.nome}`,
    location ? `📍 *Local:* ${location}` : null,
    `⏱ *Urgência:* ${urgenciaMap[data.urgencia] || data.urgencia}`,
    ``,
    `📝 *Resumo do caso:*`,
    resumo,
  ].filter(Boolean);

  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${phoneNumber}?text=${message}`;
}

/**
 * Generates a wa.me URL for lawyer → client contact
 */
export function generateLawyerWhatsAppUrl(params: {
  clienteWhatsapp: string;
  nomeCliente: string;
  area: string;
}): string {
  const phone = cleanPhoneNumber(params.clienteWhatsapp);
  const areaLabel = getAreaByValue(params.area)?.label || params.area;

  const message = encodeURIComponent(
    `Olá ${params.nomeCliente}, sou advogado(a) especialista em ${areaLabel}. ` +
    `Recebi seu caso pela plataforma e gostaria de conversar sobre como posso ajudá-lo(a). ` +
    `Podemos falar agora?`
  );

  return `https://wa.me/${phone}?text=${message}`;
}
