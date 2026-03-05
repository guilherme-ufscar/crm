import { z } from "zod";

// ==================== LEAD FORM VALIDATION ====================

export const leadStep1Schema = z.object({
  areaDireito: z.enum([
    "TRABALHISTA", "PREVIDENCIARIO", "CONSUMIDOR", "FAMILIA",
    "CRIMINAL", "IMOVEIS", "EMPRESARIAL", "OUTROS", "BANCARIO",
  ], { message: "Selecione uma Área do direito" }),
  cidade: z.string().min(2, "Informe a cidade").max(100),
  uf: z.string().length(2, "Selecione o estado"),
  urgencia: z.enum(["URGENTE", "ALTA", "MEDIA", "BAIXA"], {
    message: "Selecione a urgência",
  }),
});

export const leadStep2Schema = z.object({
  nome: z.string().min(3, "Informe seu nome completo").max(200),
  whatsapp: z
    .string()
    .min(14, "Informe um WhatsApp válido")
    .max(16)
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Formato inválido. Use: (11) 99999-9999"),
  email: z.string().email("E-mail inválido").optional().or(z.literal("")),
  melhorHorario: z.enum(["MANHA", "TARDE", "NOITE", "QUALQUER"]).optional(),
});

export const leadStep3Schema = z.object({
  descricao: z
    .string()
    .min(50, "Descreva seu caso com pelo menos 50 caracteres")
    .max(5000, "Máximo de 5000 caracteres"),
  temDocumentos: z.boolean().optional(),
});

export const leadStep4Schema = z.object({
  possuiAdvogado: z.boolean(),
  processoEmAndamento: z.boolean(),
  consentimentoLGPD: z.boolean().refine((v) => v === true, {
    message: "Você precisa concordar com o tratamento de dados",
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
  email: z.string().email("E-mail inválido"),
  telefone: z
    .string()
    .min(14, "Informe um WhatsApp válido")
    .max(16)
    .regex(/^\(\d{2}\)\s?\d{4,5}-\d{4}$/, "Formato inválido"),
  oabNumero: z.string().min(3, "Informe o número da OAB").max(20),
  oabUf: z.string().length(2, "Selecione o estado da OAB"),
  areasAtuacao: z
    .array(z.enum([
      "TRABALHISTA", "PREVIDENCIARIO", "CONSUMIDOR", "FAMILIA",
      "CRIMINAL", "IMOVEIS", "EMPRESARIAL", "OUTROS", "BANCARIO",
    ]))
    .min(1, "Selecione ao menos uma Área"),
  estado: z.string().length(2, "Selecione o estado"),
  cidade: z.string().min(2, "Informe a cidade").max(100),
  senha: z.string().min(8, "Mínimo de 8 caracteres"),
  confirmarSenha: z.string(),
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

export type AdvogadoCadastroData = z.infer<typeof advogadoCadastroSchema>;

// ==================== ADVOGADO LOGIN ====================

export const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
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
  nome: z.string().min(2, "Nome obrigatório"),
  creditos: z.number().int().min(1),
  precoCentavos: z.number().int().min(100, "Preço mínimo R$ 1,00"),
  descricao: z.string().optional(),
  ativo: z.boolean(),
});

export type PacoteData = z.infer<typeof pacoteSchema>;

// ==================== CONTATO ====================

export const contatoSchema = z.object({
  nome: z.string().min(2, "Informe seu nome"),
  email: z.string().email("E-mail inválido"),
  assunto: z.string().min(3, "Informe o assunto"),
  mensagem: z.string().min(10, "Mensagem muito curta").max(2000),
});

export type ContatoData = z.infer<typeof contatoSchema>;

