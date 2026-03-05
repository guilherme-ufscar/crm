import { z } from "zod";

// ==================== LEAD FORM VALIDATION ====================

export const leadStep1Schema = z.object({
  areaDireito: z.enum([
    "TRABALHISTA", "PREVIDENCIARIO", "CONSUMIDOR", "FAMILIA",
    "CRIMINAL", "IMOVEIS", "EMPRESARIAL", "OUTROS",
  ], { message: "Selecione uma �rea do direito" }),
  cidade: z.string().min(2, "Informe a cidade").max(100),
  uf: z.string().length(2, "Selecione o estado"),
  urgencia: z.enum(["URGENTE", "ALTA", "MEDIA", "BAIXA"], {
    message: "Selecione a urg�ncia",
  }),
});

export const leadStep2Schema = z.object({
  nome: z.string().min(3, "Informe seu nome completo").max(200),
  whatsapp: z
    .string()
    .min(14, "Informe um WhatsApp v�lido")
    .max(16)
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Formato inv�lido. Use: (11) 99999-9999"),
  email: z.string().email("E-mail inv�lido").optional().or(z.literal("")),
  melhorHorario: z.enum(["MANHA", "TARDE", "NOITE", "QUALQUER"]).optional(),
});

export const leadStep3Schema = z.object({
  descricao: z
    .string()
    .min(50, "Descreva seu caso com pelo menos 50 caracteres")
    .max(5000, "M�ximo de 5000 caracteres"),
  temDocumentos: z.boolean().optional(),
});

export const leadStep4Schema = z.object({
  possuiAdvogado: z.boolean(),
  processoEmAndamento: z.boolean(),
  consentimentoLGPD: z.boolean().refine((v) => v === true, {
    message: "Voc� precisa concordar com o tratamento de dados",
  }),
  consentimentoWhatsApp: z.boolean().optional(),
});

export const leadFormSchema = leadStep1Schema
  .merge(leadStep2Schema)
  .merge(leadStep3Schema)
  .merge(leadStep4Schema);

export type LeadFormData = z.infer<typeof leadFormSchema>;

// ==================== ADVOGADO REGISTRATION ====================

export const advogadoCadastroSchema = z.object({
  nome: z.string().min(3, "Informe seu nome completo").max(200),
  email: z.string().email("E-mail inv�lido"),
  telefone: z
    .string()
    .min(14, "Informe um WhatsApp v�lido")
    .max(16)
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Formato inv�lido"),
  oabNumero: z.string().min(3, "Informe o n�mero da OAB").max(20),
  oabUf: z.string().length(2, "Selecione o estado da OAB"),
  areasAtuacao: z
    .array(z.enum([
      "TRABALHISTA", "PREVIDENCIARIO", "CONSUMIDOR", "FAMILIA",
      "CRIMINAL", "IMOVEIS", "EMPRESARIAL", "OUTROS",
    ]))
    .min(1, "Selecione ao menos uma �rea"),
  estado: z.string().length(2, "Selecione o estado"),
  cidade: z.string().min(2, "Informe a cidade").max(100),
  senha: z.string().min(8, "M�nimo de 8 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas n�o coincidem",
  path: ["confirmarSenha"],
});

export type AdvogadoCadastroData = z.infer<typeof advogadoCadastroSchema>;

// ==================== ADVOGADO LOGIN ====================

export const loginSchema = z.object({
  email: z.string().email("E-mail inv�lido"),
  senha: z.string().min(1, "Informe sua senha"),
});

export type LoginData = z.infer<typeof loginSchema>;

// ==================== ADMIN LEAD CLASSIFICATION ====================

export const leadClassificacaoSchema = z.object({
  status: z.enum(["RETIDO", "A_VENDA", "BLOQUEADO"]),
  qualidade: z.enum(["QUENTE", "MORNO", "FRIO"]).optional(),
  observacoesAdmin: z.string().optional(),
});

export type LeadClassificacaoData = z.infer<typeof leadClassificacaoSchema>;

// ==================== ADMIN PACOTE ====================

export const pacoteSchema = z.object({
  nome: z.string().min(2, "Nome obrigat�rio"),
  creditos: z.number().int().min(1),
  precoCentavos: z.number().int().min(100, "Pre�o m�nimo R$ 1,00"),
  descricao: z.string().optional(),
  ativo: z.boolean(),
});

export type PacoteData = z.infer<typeof pacoteSchema>;

// ==================== CONTATO ====================

export const contatoSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inv�lido"),
  assunto: z.string().min(3, "Informe o assunto"),
  mensagem: z.string().min(10, "Mensagem muito curta").max(2000),
});

export type ContatoData = z.infer<typeof contatoSchema>;
