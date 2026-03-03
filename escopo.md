# Escopo do Projeto — Plataforma Web de Captação, Qualificação e Distribuição/Venda de Leads Jurídicos

> **Resumo em 1 frase:** construir uma plataforma web (responsiva, segura e orientada a conversão) com **duas frentes** — **Cliente (captação/triagem)** e **Advogado (compra/gestão de leads)** — integrando o fluxo de atendimento via **WhatsApp** (onde uma **IA faz o primeiro atendimento e qualificação** e encaminha ao comercial), além de um **painel interno (Admin)** para classificar leads (reter para o escritório ou disponibilizar para venda).

---

## 1) Objetivos do Produto

### 1.1 Objetivo principal (negócio)
- **Gerar leads jurídicos qualificados** com alta taxa de conversão via formulário + CTA de WhatsApp.
- **Reter leads “bons”** para o escritório (time interno/comercial).
- **Monetizar leads “não interessantes”** (para o escritório) através de **venda em pacotes** para advogados parceiros.

### 1.2 Objetivos principais (usuário)
**Cliente**
- Enviar sua dúvida/caso de forma rápida, clara e “sem fricção”.
- Ser direcionado imediatamente para o WhatsApp com mensagem pré-preenchida e identificação do lead.
- Ter a percepção de atendimento rápido, seguro e confiável.

**Advogado**
- Comprar e receber leads compatíveis com sua área de atuação e preferências.
- Gerenciar créditos/pacotes, visualizar histórico e status dos leads adquiridos.
- Ter um processo simples (estilo marketplace de leads + pacotes).

### 1.3 Métricas de sucesso (KPIs)
- Taxa de conversão landing → WhatsApp (clique no CTA / envio do caso).
- Taxa de conclusão do formulário (drop-off por etapa).
- % leads válidos (contato real, telefone WhatsApp válido, sem spam).
- Tempo médio até 1º contato no WhatsApp (quanto menor melhor).
- % leads retidos pelo escritório vs % disponibilizados para venda.
- Receita mensal com venda de leads.
- Taxa de recompra de pacotes por advogados.

---

## 2) Visão Geral do Sistema (Macro Arquitetura)

### 2.1 Módulos
1. **Site Público — Cliente (Captação)**
   - Home / Quem Somos / Como Funciona / Áreas / Enviar Caso / Blog / Advogado Parceiro / Contato
   - Formulário de envio do caso (multi-step opcional)
   - CTAs para WhatsApp e captura de dados

2. **Landing/Área Pública — Advogado (Aquisição de Pacotes)**
   - Página de vendas (“Adquira pacotes de leads”)
   - Planos/pacotes + benefícios + FAQ
   - Login/Cadastro advogado

3. **Portal do Advogado (Logado)**
   - Dashboard (créditos, leads adquiridos, filtros)
   - Marketplace/lista de leads “à venda”
   - Compra (pacotes/avulsos) + pagamentos
   - Gestão de conta (OAB, áreas, preferências, faturamento)

4. **Painel Admin (Escritório/Operação)**
   - Inbox de leads (todos os leads gerados)
   - Classificação (reter vs vender) + motivo + tags
   - Regras de distribuição para WhatsApp/IA e comercial
   - Gestão de pacotes, preços, estoque de leads à venda
   - Auditoria e relatórios

5. **Integrações**
   - **WhatsApp** (link direto com mensagem pré-preenchida; opção de API via provedor)
   - **IA de atendimento** (já existe — a plataforma apenas encaminha corretamente)
   - CRM / pipeline comercial (opcional mas recomendado)
   - Pagamentos (Mercado Pago / Stripe / Asaas etc.)
   - Analytics (GA4, Pixel, eventos)

---

## 3) Públicos, Papéis e Permissões

### 3.1 Papéis
- **Visitante/Cliente (não logado)**
- **Advogado (logado)**
- **Admin/Operador do Escritório**
- **Admin Master (configurações e integrações)**

### 3.2 Permissões (alto nível)
**Cliente**
- Criar lead
- Receber redirecionamento WhatsApp
- Acessar páginas públicas e blog

**Advogado**
- Criar/editar perfil
- Definir áreas de atuação e preferências (filtro)
- Comprar pacote
- Visualizar leads comprados
- Visualizar leads disponíveis (com dados mascarados antes da compra, opcional)
- Baixar nota/recibo (se aplicável)

**Admin**
- Visualizar todos os leads
- Classificar lead (reter / vender)
- Publicar lead para venda, atribuir preço/categoria/qualidade
- Gerir pacotes, preços e promoções
- Gerir advogados (aprovação, bloqueio, verificação OAB)
- Relatórios e auditoria

---

## 4) Jornada e Fluxos (User Stories + Fluxos Principais)

### 4.1 Fluxo Cliente (Captação → WhatsApp → IA)
**Fluxo padrão**
1. Cliente acessa **Home** e escolhe **Área** (ou clica em “Enviar Caso”)
2. Preenche formulário (dados + descrição do caso + consentimento LGPD)
3. Ao enviar, sistema:
   - cria o **Lead** com ID único
   - gera mensagem pré-preenchida para WhatsApp (inclui ID do lead e resumo)
   - redireciona para WhatsApp (ou mostra botão “Continuar no WhatsApp”)
4. IA faz primeiro atendimento (fora do escopo do site) e qualifica
5. Comercial assume (fora do escopo do site)

**Variações**
- Cliente inicia por página de área (“Saiba mais”) → CTA “Enviar caso sobre [Área]”
- Cliente clica no CTA “Falar agora” sem preencher tudo → coletar ao menos WhatsApp + área (fallback)
- Cliente cai em regra de bloqueio (ex.: já tem processo/advogado) → mensagem de orientação + não gerar lead vendável

### 4.2 Fluxo Interno (Lead entra → reter ou vender)
1. Lead entra na caixa “Novos leads” (Admin)
2. Operador classifica:
   - **Interessante (reter)**: envia para pipeline interno (comercial) e marca “não vendável”
   - **Não interessante (vender)**: marca como “vendável” e publica no marketplace
3. Lead vendável entra no “estoque” visível para advogados conforme filtros (área/região etc.)

### 4.3 Fluxo Advogado (Comprar pacote → acessar leads)
1. Advogado acessa landing “Advogado Parceiro” → CTA “Começar / Comprar pacote”
2. Cadastro (nome, e-mail, WhatsApp, OAB/UF, áreas de atuação, senha)
3. (Opcional) verificação (documento/OAB) e aprovação
4. Compra de pacote (ex.: 10 leads / R$ 500) → créditos adicionados
5. Advogado entra no portal:
   - escolhe filtro de área
   - vê lista de leads disponíveis (estoque)
   - “adquire” lead usando 1 crédito (ou compra avulsa)
   - acessa dados completos e botão “Abrir no WhatsApp”

### 4.4 Fluxo de Créditos (modelo estilo “Workana”)
- Advogado compra um pacote que gera **X créditos**.
- Cada lead adquirido consome **1 crédito** (ou custo variável por qualidade).
- Um “crédito” pode equivaler a “poder contatar 1 lead”.
- Saldo de créditos e histórico ficam no dashboard.

---

## 5) Regras de Negócio (Essenciais)

### 5.1 Classificação e “Propriedade” do lead
- Todo lead nasce com status: **NOVO**.
- Admin define o destino:
  - **RETIDO (escritório)**: não aparece para venda.
  - **À VENDA**: aparece no portal do advogado.
- Uma vez **vendido/adquirido**, o lead fica “reservado” ao advogado comprador (evita duplicidade).

### 5.2 Critérios de “não atendimento”
- O site deve exibir e reforçar termos como:
  - plataforma é **intermediadora tecnológica**
  - **não garante resultados**
  - **não atende** quem já possui advogado ou processo em curso
- Regra operacional:
  - no formulário, perguntar “Você já possui advogado?” e “Existe processo em andamento?”
  - se “SIM”, apresentar aviso (ex.: “orientamos buscar seu advogado/defensoria”) e **não seguir para geração de lead vendável** (pode registrar apenas para estatística).

### 5.3 Estoque e qualidade de leads
- Leads vendáveis devem ter:
  - área definida
  - WhatsApp válido
  - descrição mínima (tamanho mínimo de caracteres)
  - consentimento LGPD
- Admin pode definir **qualidade** (A/B/C) e preço/consumo de crédito (opcional).

### 5.4 Precificação e pacotes
- Pacotes pré-definidos (exemplos — configuráveis no Admin):
  - 10 leads = R$ 500
  - 25 leads = R$ 1.100
  - 50 leads = R$ 2.000
- Possibilidade de lead avulso (opcional).

### 5.5 Rate limit e anti-spam
- Bloquear múltiplos envios em curto período por IP/device.
- CAPTCHA invisível (recomendado).
- Blacklist de números e e-mails suspeitos.

---

## 6) Requisitos Funcionais (Detalhados)

## 6.1 Site Cliente (Público)

### 6.1.1 Home (Landing principal)
**Objetivo:** conversão rápida para “Enviar Caso” e/ou “Falar no WhatsApp”.

**Seções**
1. **Header fixo**
   - Logo
   - Menu: Quem Somos | Como Funciona | Áreas | Enviar Caso | Blog | Advogado Parceiro | Contato
   - CTA primário: “Falar no WhatsApp” (botão)

2. **Hero**
   - Headline (ex.: “Teve seu direito negado? Organize seu caso e receba orientação especializada…”)
   - Subheadline (plataforma tecnológica, direcionamento para advogados parceiros)
   - 2 CTAs:
     - Primário: “Enviar meu caso”
     - Secundário: “Falar agora no WhatsApp” (com tracking)

3. **Como Funciona (4 passos)**
   - Cards numerados:
     1. Você envia seu caso
     2. Organizamos as informações
     3. Direcionamos para advogado parceiro
     4. O profissional entra em contato
   - Mini copy reforçando privacidade e rapidez

4. **Áreas atendidas**
   - Grid de cards com ícone + nome + botão “Saiba mais”
   - Áreas mínimas:
     - Trabalhista
     - Previdenciário (INSS)
     - Consumidor
     - Direito de Saúde
     - Direito Militar
     - Direito Bancário (Defesa do Executado)
     - Direito de Família
     - Direito Cível

5. **Prova social / confiança**
   - Itens: “Atendimento em todo Brasil”, “Privacidade e LGPD”, “Advogados parceiros OAB”
   - (Opcional) depoimentos e números

6. **FAQ**
   - “A plataforma é escritório?”
   - “O atendimento é gratuito?”
   - “Vocês garantem ganho de causa?”
   - “Quem será responsável?”
   - “Vocês verificam andamento de processos?”

7. **Termos e avisos**
   - Bloco visível com os “não fazemos” (intermediação, sem garantias, sem processos em curso)

8. **Footer**
   - Links: Termos, Privacidade, Contato, Blog
   - CNPJ/razão social (se houver)
   - Aviso de responsabilidade do advogado

**Eventos de rastreio**
- clique_whatsapp_home
- clique_enviar_caso_home
- clique_area_card

---

### 6.1.2 Páginas “Saiba mais” por Área
**Objetivo:** SEO + conversão por intenção específica.
- URL amigável: `/areas/trabalhista`, etc.
- Conteúdo:
  - o que cobre (exemplos de casos)
  - perguntas rápidas (checklist)
  - CTA “Enviar meu caso sobre [Área]”
- FAQ específico (opcional)

---

### 6.1.3 Página “Enviar Caso” (Formulário)
**Objetivo:** coletar dados mínimos para qualificação e enviar para WhatsApp/IA.

#### Estrutura recomendada (multi-step)
**Etapa 1 — Área e contexto**
- Área do direito (select)
- Cidade/UF (ou CEP)
- Urgência (Hoje / Esta semana / Sem pressa)

**Etapa 2 — Dados de contato**
- Nome completo
- WhatsApp (obrigatório, com máscara)
- E-mail (opcional)
- Melhor horário para contato (manhã/tarde/noite)

**Etapa 3 — Detalhes do caso**
- Campo texto (mínimo 200 caracteres recomendado)
- Checklist opcional: “Tenho documentos” (sim/não)
- Upload opcional (PDF/JPG/PNG) (se necessário)

**Etapa 4 — Validações e consentimentos**
- “Você já possui advogado?” (sim/não)
- “Existe processo em andamento?” (sim/não)
- Checkbox LGPD (obrigatório): “Concordo com o tratamento de dados para fins de contato e triagem.”
- Checkbox opcional: “Aceito receber contato por WhatsApp.”

#### Regras
- Se “já possui advogado” ou “processo em andamento” = SIM:
  - exibir aviso e orientar canal adequado
  - não criar lead vendável (ou criar lead com flag “bloqueado”)

#### Ação ao enviar
- Criar Lead com:
  - ID
  - timestamps
  - origem (UTM, campanha, referer)
  - área e localização
  - texto do caso
  - contatos
  - flags (bloqueado/retido/vendável)
- Redirecionar para WhatsApp com mensagem pré-preenchida:
  - incluir ID do lead
  - incluir área
  - resumo (primeiras 200–300 chars)
  - incluir campos estruturados (cidade/UF, urgência)

**Eventos**
- form_start
- form_step_complete (por etapa)
- form_submit_success
- redirect_whatsapp_success

---

### 6.1.4 Quem Somos
- Explicar claramente: “meio tecnológico de organização e direcionamento”
- Reforçar: serviços advocatícios prestados por advogados parceiros OAB
- Selos/compromissos: privacidade, ética, transparência

---

### 6.1.5 Como Funciona (página dedicada)
- Expandir os 4 passos com explicações e exemplos
- CTA ao final: “Enviar caso”

---

### 6.1.6 Blog
- Estrutura SEO:
  - lista de posts
  - categorias por área
  - página do post com schema (FAQ/Article)
- Captura de leads dentro do post:
  - banner CTA “fale no WhatsApp”
  - widget “Enviar caso rápido” (mini-form)

---

### 6.1.7 Contato
- Opções:
  - Botão WhatsApp
  - Formulário contato (nome, e-mail, assunto, mensagem)
  - (Opcional) e-mail e telefone

---

## 6.2 Landing “Advogado Parceiro” (Público)
**Objetivo:** converter advogado em cadastro + compra de pacote.

**Seções**
1. Hero
   - Headline: “Receba oportunidades reais de novos contratos”
   - Subheadline: “Leads com intenção, filtrados por área e região”
   - CTA: “Criar conta” / “Ver pacotes”

2. Benefícios (cards)
   - fluxo contínuo
   - economia de tempo de prospecção
   - segmentação por área
   - controle por créditos

3. Como funciona (para advogado)
   1) cria conta e define áreas
   2) compra pacote
   3) escolhe leads disponíveis
   4) contata via WhatsApp

4. Pacotes e preços
   - cards com: quantidade, preço, preço por lead, CTA “Comprar”
   - política de validade dos créditos (se houver)

5. FAQ do advogado
   - “Os leads são exclusivos?”
   - “Como funciona o crédito?”
   - “Como recebo os dados?”
   - “Como funciona reembolso em lead inválido?” (se existir)

6. Depoimentos/Provas sociais (opcional)

7. CTA final + rodapé com termos

---

## 6.3 Portal do Advogado (Logado)

### 6.3.1 Autenticação
- Cadastro com e-mail + WhatsApp + senha
- Recuperação de senha
- (Opcional) login via Google

### 6.3.2 Verificação (recomendado)
- Campo OAB + UF
- Upload opcional de comprovação
- Status do cadastro: PENDENTE / APROVADO / REPROVADO
- Até aprovação: advogado pode ver landing, mas não compra (configurável)

### 6.3.3 Dashboard
- Saldo de créditos
- Últimos leads adquiridos
- Atalhos:
  - Comprar pacote
  - Buscar leads
  - Ajustar preferências

### 6.3.4 Preferências / Filtros
- Áreas de atuação (multi-select)
- Região: UF, cidade, raio (opcional)
- Tipos de caso (tags) (opcional)
- Horário de preferência de recebimento (opcional)

### 6.3.5 Leads disponíveis (Marketplace)
- Lista com:
  - Área
  - Localização aproximada (cidade/UF)
  - Data/hora
  - “Resumo do caso” (parcial)
  - Qualidade (A/B/C) (opcional)
  - Custo em créditos (padrão 1)
- Antes de comprar: dados sensíveis mascarados (nome, telefone)
- Ação: “Adquirir” (consome crédito) → confirma → libera dados completos

### 6.3.6 Lead adquirido (Detalhe)
- Dados completos: nome, WhatsApp, e-mail (se tiver), descrição completa, anexos (se tiver)
- Botão: “Abrir conversa no WhatsApp” (com mensagem inicial sugerida)
- Campo de status do advogado (para gestão pessoal):
  - NOVO / CONTATADO / EM NEGOCIAÇÃO / FECHADO / PERDIDO
- Notas internas do advogado (opcional)

### 6.3.7 Comprar Pacotes / Financeiro
- Lista de pacotes
- Checkout
- Histórico de pagamentos
- Nota/recibo (se aplicável)
- Política de estorno/chargeback (definida em termos)

### 6.3.8 Conta
- Perfil (nome, e-mail, WhatsApp, OAB/UF, áreas)
- Preferências e notificações (e-mail/WhatsApp) (opcional)
- Excluir conta / LGPD (recomendado)

---

## 6.4 Painel Admin (Escritório/Operação)

### 6.4.1 Autenticação e níveis
- Admin Master
- Operador
- Auditor (somente leitura)

### 6.4.2 Inbox de Leads
- Lista com filtros:
  - status (NOVO / RETIDO / À VENDA / VENDIDO / BLOQUEADO)
  - área
  - origem (campanha UTM)
  - data
- Colunas:
  - ID
  - área
  - cidade/UF
  - contato
  - data/hora
  - score/qualidade (opcional)

### 6.4.3 Detalhe do Lead
- Visualizar tudo que o cliente enviou
- Ações:
  - Marcar como RETIDO (escritório)
  - Marcar como À VENDA (publicar)
  - BLOQUEAR (ex.: duplicado/spam/processo em curso)
  - Editar tags e qualidade
  - Definir preço/custo em crédito (opcional)
  - Registrar motivo da decisão (campo obrigatório)

### 6.4.4 Estoque e publicação
- Lista de leads publicados
- Prioridade/ordenação (mais recentes primeiro; ou por qualidade)
- Regras de expiração (opcional): ex.: lead expira em 7 dias
- Regras de “exclusividade” (opcional): 1 lead só pode ser vendido 1 vez

### 6.4.5 Gestão de Advogados
- Aprovar/reprovar
- Bloquear
- Ver histórico de compras e leads adquiridos
- Definir limites (ex.: máximo por dia) (opcional)

### 6.4.6 Gestão de Pacotes e Preços
- CRUD de pacotes
- Promoções/cupom (opcional)
- Controle de impostos/faturamento (opcional)

### 6.4.7 Relatórios
- Leads por área
- Conversão por campanha UTM
- Receita por mês
- Taxa de leads inválidos
- Tempo até aquisição por advogados
- Retidos vs vendidos

### 6.4.8 Auditoria e Logs
- Log de alterações (quem publicou, quem bloqueou, etc.)
- Log de compra/consumo de créditos

---

## 7) Integrações (Detalhamento)

### 7.1 WhatsApp (essencial)
**MVP (sem API):**
- Link `wa.me` com texto pré-preenchido contendo:
  - ID do lead
  - área
  - nome
  - cidade/UF
  - resumo do caso
- Capturar o evento “clicou no WhatsApp” + timestamp.

**Opção avançada (com API / provedor):**
- Disparar conversa com template (dependente do provedor)
- Registrar “mensagem enviada” como evento
- Possível criação automática de ticket no CRM

### 7.2 IA de atendimento (já existente)
- A plataforma deve fornecer payload estruturado para a IA/comercial, por exemplo:
  - lead_id, area, location, urgency, contact, summary, full_text, utm
- Formato recomendado: webhook HTTP (POST JSON) para seu sistema atual
- Estratégia de fallback: se webhook falhar, registrar em fila e alertar admin

### 7.3 Pagamentos
- Integração com gateway (escolher um)
- Webhooks de confirmação (pago, recusado, estornado)
- Controle de créditos pós-pagamento

### 7.4 CRM (opcional, mas recomendado)
- Enviar leads retidos automaticamente
- Enviar eventos de status (contatado/fechado) se necessário

---

## 8) Modelo de Dados (Entidades)

### 8.1 Lead
- id (uuid / curto)
- created_at, updated_at
- origem: utm_source, utm_medium, utm_campaign, utm_term, utm_content, referer
- canal: web_form / whatsapp_direct / blog_cta
- area (enum)
- cidade, uf, cep (opcional)
- urgencia (enum)
- nome
- whatsapp
- email (opcional)
- descricao_caso
- anexos (0..n)
- flags:
  - possui_advogado (bool)
  - processo_em_andamento (bool)
  - consent_lgpd (bool)
- status:
  - NOVO / RETIDO / À_VENDA / VENDIDO / BLOQUEADO
- venda:
  - publicado_em
  - adquirido_em
  - advogado_id (se vendido)
  - custo_creditos (default 1)
  - qualidade (A/B/C) (opcional)
- motivo_classificacao (texto)

### 8.2 Advogado
- id
- nome
- email
- whatsapp
- oab_numero
- oab_uf
- status_verificacao (PENDENTE/APROVADO/REPROVADO)
- areas_atuacao (array)
- regiao (ufs/cidades) (opcional)
- saldo_creditos
- created_at, last_login

### 8.3 Pacote
- id
- nome (ex.: “Pacote 10”)
- quantidade_creditos
- preco
- ativo (bool)
- descricao
- validade_dias (opcional)

### 8.4 Compra (Order)
- id
- advogado_id
- pacote_id
- valor
- status (PENDENTE/PAGO/CANCELADO/ESTORNADO)
- gateway_ref
- created_at, paid_at

### 8.5 Admin / Logs
- admin_id, ação, entidade, antes/depois, timestamp, ip

---

## 9) Requisitos Não Funcionais (Qualidade)

### 9.1 Responsividade
- Mobile-first (principal origem de tráfego costuma ser celular)
- Breakpoints: 360px, 768px, 1024px, 1440px

### 9.2 Performance e SEO
- Core Web Vitals (LCP < 2.5s em mobile como meta)
- SSR/SSG para páginas públicas e blog
- Schema.org (FAQ, Article) quando aplicável
- URLs limpas por área

### 9.3 Segurança
- HTTPS obrigatório
- Proteção CSRF/XSS
- Rate limiting e captcha no formulário
- Armazenamento seguro de anexos (bucket privado + URLs temporárias)
- Segredos em vault/env
- Logs de auditoria

### 9.4 LGPD (mínimo)
- Consentimento explícito
- Política de privacidade e termos
- Minimização de dados (coletar apenas o necessário)
- Rotina de exclusão/anonimização mediante solicitação
- Acesso restrito aos dados: advogado só vê dados completos após compra

### 9.5 Disponibilidade
- Meta: 99.5%+
- Monitoramento de erros e uptime

---

## 10) Layout e Diretrizes de UI/UX (Detalhado)

### 10.1 Estilo visual (recomendado)
- **Estética:** moderna, confiável, simples, “legal-tech” (menos cara de escritório tradicional, mais plataforma).
- **Paleta (sugestão):**
  - Base neutra (cinza muito claro / branco)
  - Primária: azul/índigo (credibilidade)
  - Ação/CTA WhatsApp: verde (usado apenas para botões de WhatsApp)
  - Alertas: amarelo/laranja suave, erros em vermelho
- **Tipografia:** sans-serif moderna
  - Títulos: Inter / Manrope / Sora
  - Texto: Inter / Roboto
- **Componentes:** cards com sombra leve, bordas 12–16px, espaçamento generoso.
- **Iconografia:** linear (Feather/Lucide)

### 10.2 Grid e hierarquia
- Container máximo: 1200px
- Grid de 12 colunas no desktop, 4 colunas no mobile
- Botões CTA sempre visíveis acima da dobra no mobile

### 10.3 Padrões de conversão (CRO)
- CTA “WhatsApp” fixo no mobile (botão flutuante + sticky bar)
- Formulário com passos curtos e barra de progresso
- Mensagens de confiança perto dos campos:
  - “Seus dados são protegidos (LGPD) e usados apenas para contato”
- Minimizar campos obrigatórios no MVP

### 10.4 Wireframe textual por página (macro)
**Home**
- Header
- Hero (headline + subheadline + 2 botões)
- Como funciona (4 cards)
- Áreas (grid 2x4 no desktop; carrossel/2 colunas no mobile)
- Bloco confiança (3 itens)
- FAQ (accordion)
- Rodapé

**Enviar Caso**
- Card central com formulário multi-step
- Sidebar (desktop) com “Como funciona” + “Você está em boas mãos”
- Mobile: tudo em coluna, botões grandes

**Advogado Parceiro (landing)**
- Hero + CTA
- Benefícios
- Como funciona
- Pacotes
- FAQ
- CTA final

**Portal Advogado**
- Layout app:
  - Sidebar (desktop) / bottom nav (mobile)
  - Dashboard
  - Leads disponíveis
  - Meus leads
  - Comprar créditos
  - Conta

**Admin**
- Layout app:
  - Sidebar
  - Inbox leads (tabela + filtros)
  - Página detalhe do lead com ações (reter/vender/bloquear)

---

## 11) Conteúdo e Textos (copy base)
- Headline: “Teve seu direito negado? Organize seu caso e receba orientação especializada com o profissional adequado.”
- Subheadline: “Plataforma tecnológica que organiza informações e direciona demandas jurídicas para advogados parceiros em todo o Brasil.”
- Aviso importante (visível): “A plataforma atua como intermediadora e não presta diretamente serviços advocatícios. A responsabilidade técnica é do advogado contratado. Nenhum resultado é garantido. Não atendemos casos com advogado ou processo em curso.”

---

## 12) Checklist de Entregáveis

### 12.1 MVP (recomendado para urgência)
- Site público completo com páginas e formulário “Enviar Caso”
- Redirecionamento WhatsApp com mensagem pré-preenchida
- Armazenamento dos leads + painel Admin básico (classificar/filtrar/publicar)
- Landing Advogado Parceiro + cadastro/login advogado
- Portal advogado com:
  - saldo de créditos (mock/manual no MVP ou via pagamentos)
  - visualizar leads à venda e adquirir (consumir crédito)
- Integração de pagamento (mínimo: compra de pacote)
- Termos + Privacidade (templates revisáveis)
- Analytics (eventos)

### 12.2 Versão 2 (pós-MVP)
- Verificação OAB + aprovação manual
- Qualidade do lead (A/B/C) e preço dinâmico
- Expiração de leads
- Reembolso/lead inválido (fluxo de disputa)
- Notificações (email/WhatsApp) para novos leads
- Integração CRM completa
- Dashboard de BI

---

## 13) Critérios de Aceite (Exemplos)

**Cliente**
- [ ] Consegue enviar caso e ser direcionado ao WhatsApp em < 1 minuto em mobile.
- [ ] Lead é criado com ID e registra UTMs.
- [ ] Formulário bloqueia/alerta adequadamente “processo em curso / já tem advogado”.

**Admin**
- [ ] Vê lista de leads com filtros e detalhamento.
- [ ] Consegue marcar lead como RETIDO ou À VENDA.
- [ ] Lead À VENDA aparece imediatamente no portal do advogado.

**Advogado**
- [ ] Consegue criar conta e comprar pacote.
- [ ] Após pagamento, créditos são adicionados.
- [ ] Ao adquirir lead, dados completos são liberados e botão WhatsApp funciona.

**Segurança/LGPD**
- [ ] Consentimento LGPD é obrigatório no envio de caso.
- [ ] Dados do lead não são exibidos a advogados não compradores.
- [ ] Logs básicos de alteração (admin) existem.

---

## 14) Observações Importantes (para o agente de IA/dev)
- O foco do projeto é **captação e roteamento para WhatsApp** (onde a IA já faz o primeiro atendimento).
- O **painel admin** é essencial para aplicar a regra de negócio “reter bons leads / vender o restante”.
- Páginas públicas devem ser **SEO-first** e **mobile-first**.
- Este escopo assume um MVP pronto para operar e escalar com evoluções posteriores.

