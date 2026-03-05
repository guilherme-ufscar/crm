# JuriLead â€” Plataforma de Leads JurÃ­dicos

Plataforma web de captaÃ§Ã£o, qualificaÃ§Ã£o e distribuiÃ§Ã£o/venda de leads jurÃ­dicos com trÃªs frentes: site pÃºblico, painel administrativo e portal do advogado.

## Stack TecnolÃ³gica

- **Frontend/Backend**: Next.js 16 (App Router, TypeScript, Tailwind CSS v4)
- **ORM**: Prisma 7 + PostgreSQL
- **AutenticaÃ§Ã£o**: NextAuth.js v5 (JWT, dual Credentials providers)
- **Pagamentos**: Stripe (Checkout Sessions + Webhooks)
- **UI**: shadcn/ui pattern (Radix UI + CVA)
- **Deploy**: Docker + Nginx (VPS Contabo com aaPanel)

## Estrutura do Projeto

```
src/
â”œâ”€â”€ app/
â”‚   â”œâ”€â”€ (public)/           # Site pÃºblico (home, Ã¡reas, blog, contato, etc.)
â”‚   â”œâ”€â”€ admin/              # Painel administrativo
â”‚   â”œâ”€â”€ portal/             # Portal do advogado
â”‚   â”œâ”€â”€ login/              # Login do advogado
â”‚   â”œâ”€â”€ cadastro/           # Cadastro do advogado
â”‚   â””â”€â”€ api/                # API routes
â”‚       â”œâ”€â”€ admin/          # CRUD admin (leads, advogados, pacotes, logs)
â”‚       â”œâ”€â”€ portal/         # Portal APIs (leads, crÃ©ditos, meus-leads)
â”‚       â”œâ”€â”€ auth/           # NextAuth + cadastro
â”‚       â”œâ”€â”€ stripe/         # Checkout + Webhook
â”‚       â”œâ”€â”€ leads/          # CriaÃ§Ã£o de leads
â”‚       â””â”€â”€ contato/        # FormulÃ¡rio de contato
â”œâ”€â”€ components/
â”‚   â”œâ”€â”€ ui/                 # Componentes base (button, card, input, etc.)
â”‚   â”œâ”€â”€ layout/             # Header, Footer, WhatsApp float
â”‚   â””â”€â”€ forms/              # FormulÃ¡rio multi-step de leads
â”œâ”€â”€ lib/                    # UtilitÃ¡rios (prisma, auth, validations, stripe, etc.)
â””â”€â”€ types/                  # Type augmentations
```

## PrÃ©-requisitos

- Node.js 20+
- PostgreSQL 16+
- Conta Stripe (para pagamentos)

## InstalaÃ§Ã£o

```bash
# Clonar o repositÃ³rio
cd crm

# Instalar dependÃªncias
npm install

# Copiar variÃ¡veis de ambiente
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

## VariÃ¡veis de Ambiente

| VariÃ¡vel | DescriÃ§Ã£o | Exemplo |
|----------|-----------|---------|
| `APP_PORT` | Porta externa da aplicação no Docker (host) | `3000` |
| `APP_INTERNAL_PORT` | Porta interna da aplicação no container | `3000` |
| `POSTGRES_PORT` | Porta externa do PostgreSQL no Docker (host) | `5432` |
| `POSTGRES_INTERNAL_PORT` | Porta interna do PostgreSQL no container | `5432` |
| `DATABASE_URL` | Connection string PostgreSQL | `postgresql://user:pass@localhost:5432/crm_leads` |
| `NEXTAUTH_SECRET` | Secret para JWT (mÃ­nimo 32 chars) | Gerar com `openssl rand -base64 32` |
| `NEXTAUTH_URL` | URL base da aplicaÃ§Ã£o | `http://localhost:3000` |
| `STRIPE_SECRET_KEY` | Chave secreta Stripe | `sk_test_...` |
| `STRIPE_PUBLISHABLE_KEY` | Chave pÃºblica Stripe | `pk_test_...` |
| `STRIPE_WEBHOOK_SECRET` | Secret do webhook Stripe | `whsec_...` |
| `WHATSAPP_NUMBER` | NÃºmero WhatsApp da plataforma (com DDI) | `5511999999999` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 ID | `G-XXXXXXXXXX` |

## Scripts DisponÃ­veis

```bash
npm run dev          # Desenvolvimento (Turbopack)
npm run build        # Build de produÃ§Ã£o
npm run start        # Iniciar produÃ§Ã£o
npm run lint         # Linting

npm run db:push      # Sync schema â†’ banco (sem migration)
npm run db:migrate   # Criar e aplicar migrations
npm run db:seed      # Seed (admin + pacotes)
npm run db:studio    # Prisma Studio (GUI)
```

## Credenciais PadrÃ£o (Seed)

**Admin:**
- Email: `admin@jurilead.com.br`
- Senha: `admin123456`

**Pacotes criados:**
- Starter: 10 crÃ©ditos â€” R$ 500
- Profissional: 25 crÃ©ditos â€” R$ 1.100
- Premium: 50 crÃ©ditos â€” R$ 2.000

## Deploy com Docker

```bash
# Build e iniciar
docker compose up -d --build

# Rodar migrations
docker compose exec app npm run db:push

# Seed
docker compose exec app npm run db:seed
```

## Funcionalidades Principais

### Site PÃºblico
- Landing page com formulÃ¡rio multi-step de 4 etapas
- Redirecionamento para WhatsApp apÃ³s envio
- PÃ¡ginas por Ã¡rea do direito (8 Ã¡reas)
- Blog com artigos estÃ¡ticos (SEO)
- PÃ¡ginas institucionais (Quem Somos, Como Funciona, Contato)
- PÃ¡ginas legais (Termos de Uso, PolÃ­tica de Privacidade â€” LGPD)
- PÃ¡gina de captaÃ§Ã£o para advogados parceiros

### Painel Admin (`/admin`)
- Dashboard com estatÃ­sticas em tempo real
- Inbox de leads com filtros (status, Ã¡rea, qualidade, busca)
- Triagem de leads (Reter / Colocar Ã  Venda / Bloquear)
- ClassificaÃ§Ã£o de qualidade (Quente / Morno / Frio)
- GestÃ£o de advogados cadastrados
- CRUD de pacotes de crÃ©ditos
- Logs de auditoria

### Portal do Advogado (`/portal`)
- Dashboard com saldo de crÃ©ditos e leads disponÃ­veis
- Marketplace de leads (dados mascarados)
- AquisiÃ§Ã£o de leads com crÃ©ditos (1 crÃ©dito/lead)
- Contato com cliente via WhatsApp apÃ³s compra
- HistÃ³rico de leads adquiridos
- Compra de pacotes de crÃ©ditos via Stripe
- HistÃ³rico de transaÃ§Ãµes de crÃ©ditos

### SeguranÃ§a
- Rate limiting em todas as rotas pÃºblicas
- ProteÃ§Ã£o de rotas via middleware NextAuth
- Roles de admin (MASTER, OPERADOR, AUDITOR)
- Hash de senhas com bcrypt (12 rounds)
- Consentimento LGPD obrigatÃ³rio
- Headers de seguranÃ§a (CSP, HSTS, etc.)

## LicenÃ§a

Projeto proprietÃ¡rio. Todos os direitos reservados.



