# JuriLead — Plataforma de Leads Jurídicos

Plataforma web de captação, qualificação e distribuição/venda de leads jurídicos com três frentes: site público, painel administrativo e portal do advogado.

## Stack Tecnológica

- **Frontend/Backend**: Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **ORM**: Prisma 7 + PostgreSQL
- **Autenticação**: NextAuth.js v5 (JWT, dual Credentials providers)
- **Pagamentos**: Stripe (Checkout Sessions + Webhooks)
- **UI**: shadcn/ui pattern (Radix UI + CVA)
- **Deploy**: Docker + Nginx (VPS Contabo com aaPanel)

## Estrutura do Projeto

```
src/
├── app/
│   ├── (public)/           # Site público (home, áreas, blog, contato, etc.)
│   ├── admin/              # Painel administrativo
│   ├── portal/             # Portal do advogado
│   ├── login/              # Login do advogado
│   ├── cadastro/           # Cadastro do advogado
│   └── api/                # API routes
│       ├── admin/          # CRUD admin (leads, advogados, pacotes, logs)
│       ├── portal/         # Portal APIs (leads, créditos, meus-leads)
│       ├── auth/           # NextAuth + cadastro
│       ├── stripe/         # Checkout + Webhook
│       ├── leads/          # Criação de leads
│       └── contato/        # Formulário de contato
├── components/
│   ├── ui/                 # Componentes base (button, card, input, etc.)
│   ├── layout/             # Header, Footer, WhatsApp float
│   └── forms/              # Formulário multi-step de leads
├── lib/                    # Utilitários (prisma, auth, validations, stripe, etc.)
└── types/                  # Type augmentations
```

## Pré-requisitos

- Node.js 20+
- PostgreSQL 16+
- Conta Stripe (para pagamentos)

## Instalação

```bash
# Clonar o repositório
cd crm

# Instalar dependências
npm install

# Copiar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Gerar Prisma Client
npx prisma generate

# Criar tabelas no banco
npx prisma db push

# Seed inicial (admin + pacotes)
npm run db:seed

# Iniciar em desenvolvimento
npm run dev
```

## Variáveis de Ambiente

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://user:pass@localhost:5432/crm_leads` |
| `NEXTAUTH_SECRET` | Secret para JWT (mínimo 32 chars) | Gerar com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base da aplicação | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Chave pública Stripe | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe | `whsec_...` |
| `WHATSAPP_NUMBER` | Número WhatsApp da plataforma (com DDI) | `5511999999999` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | `G-XXXXXXXXXX` |

## Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento (Turbopack)
npm run build        # Build de produção
npm run start        # Iniciar produção
npm run lint         # Linting

npm run db:push      # Sync schema → banco (sem migration)
npm run db:migrate   # Criar e aplicar migrations
npm run db:seed      # Seed (admin + pacotes)
npm run db:studio    # Prisma Studio (GUI)
```

## Credenciais Padrão (Seed)

**Admin:**
- Email: `admin@jurilead.com.br`
- Senha: `admin123456`

**Pacotes criados:**
- Starter: 10 créditos — R$ 500
- Profissional: 25 créditos — R$ 1.100
- Premium: 50 créditos — R$ 2.000

## Deploy com Docker

```bash
# Build e iniciar
docker compose up -d --build

# Rodar migrations
docker compose exec app npx prisma db push

# Seed
docker compose exec app npm run db:seed
```

## Funcionalidades Principais

### Site Público
- Landing page com formulário multi-step de 4 etapas
- Redirecionamento para WhatsApp após envio
- Páginas por área do direito (8 áreas)
- Blog com artigos estáticos (SEO)
- Páginas institucionais (Quem Somos, Como Funciona, Contato)
- Páginas legais (Termos de Uso, Política de Privacidade — LGPD)
- Página de captação para advogados parceiros

### Painel Admin (`/admin`)
- Dashboard com estatísticas em tempo real
- Inbox de leads com filtros (status, área, qualidade, busca)
- Triagem de leads (Reter / Colocar à Venda / Bloquear)
- Classificação de qualidade (Quente / Morno / Frio)
- Gestão de advogados cadastrados
- CRUD de pacotes de créditos
- Logs de auditoria

### Portal do Advogado (`/portal`)
- Dashboard com saldo de créditos e leads disponíveis
- Marketplace de leads (dados mascarados)
- Aquisição de leads com créditos (1 crédito/lead)
- Contato com cliente via WhatsApp após compra
- Histórico de leads adquiridos
- Compra de pacotes de créditos via Stripe
- Histórico de transações de créditos

### Segurança
- Rate limiting em todas as rotas públicas
- Proteção de rotas via middleware NextAuth
- Roles de admin (MASTER, OPERADOR, AUDITOR)
- Hash de senhas com bcrypt (12 rounds)
- Consentimento LGPD obrigatório
- Headers de segurança (CSP, HSTS, etc.)

## Licença

Projeto proprietário. Todos os direitos reservados.
