import Link from "next/link";
import { Metadata } from "next";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatCurrency } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/public-env";

export const metadata: Metadata = {
  title: "Advogado Parceiro — Receba Leads Jurídicos Qualificados",
  description: "Adquira pacotes de leads jurídicos qualificados, segmentados por área e região. Cresça sua carteira de clientes.",
};

const benefits = [
  { icon: "trending_up", title: "Fluxo contínuo de oportunidades", desc: "Receba leads novos todos os dias, filtrados pela sua área de atuação." },
  { icon: "schedule", title: "Economia de tempo", desc: "Pare de prospectar. Clientes com intenção real chegam até você." },
  { icon: "filter_alt", title: "Segmentação por área", desc: "Defina suas áreas de atuação e receba apenas leads compatíveis." },
  { icon: "credit_card", title: "Controle por créditos", desc: "Compre pacotes e use créditos conforme sua necessidade." },
];

const pacotes = [
  { nome: "Starter", creditos: 10, precoCentavos: 50000, destaque: false },
  { nome: "Profissional", creditos: 25, precoCentavos: 110000, destaque: true },
  { nome: "Premium", creditos: 50, precoCentavos: 200000, destaque: false },
];

const steps = [
  { num: 1, title: "Crie sua conta", desc: "Cadastre-se com seus dados e número da OAB" },
  { num: 2, title: "Compre um pacote", desc: "Escolha o pacote ideal e receba créditos" },
  { num: 3, title: "Escolha seus leads", desc: "Veja leads disponíveis na sua área e adquira" },
  { num: 4, title: "Contate pelo WhatsApp", desc: "Acesse os dados e inicie a conversa" },
];

const faqs = [
  { q: "Os leads são exclusivos?", a: "Sim. Cada lead adquirido é exclusivo para o advogado comprador. Um lead não é vendido para mais de um profissional." },
  { q: "Como funciona o crédito?", a: "Ao comprar um pacote, você recebe créditos. Cada lead adquirido consome 1 crédito (ou mais, dependendo da qualidade). Você escolhe quais leads quer e quando." },
  { q: "Como recebo os dados do lead?", a: "Ao adquirir um lead, você acessa os dados completos (nome, WhatsApp, descrição do caso) no seu portal, com botão direto para enviar mensagem no WhatsApp." },
  { q: "E se o lead for inválido?", a: "Temos um processo de triagem para garantir a qualidade. Casos de leads claramente inválidos (dados falsos, spam) podem ser reportados para análise." },
  { q: "Os créditos expiram?", a: "Depende do pacote. Consulte os termos de cada plano para informações sobre validade." },
];

export default function AdvogadoParceiroPage() {
  const advogadoWhatsAppMessage = "Olá! Sou advogado(a) e quero falar com a equipe comercial sobre pacotes de leads.";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl lg:text-5xl">
            Receba <span className="text-primary">oportunidades reais</span> de novos contratos
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Leads com intenção real, filtrados por área e região. Cresça sua carteira de clientes sem prospecção.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" asChild>
              <Link href="/cadastro">
                Criar conta
                <MaterialIcon name="arrow_forward" size={20} className="ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <a href="#pacotes">Ver pacotes</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Por que ser parceiro?</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <Card key={b.title} className="text-center">
                <CardContent className="pt-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <MaterialIcon name={b.icon} size={24} />
                  </div>
                  <h3 className="mt-4 font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{b.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Como funciona */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Como funciona</h2>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.num} className="text-center">
                <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                  {s.num}
                </div>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pacotes */}
      <section className="py-16" id="pacotes">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Pacotes e Preços</h2>
          <p className="mt-3 text-center text-muted-foreground">Escolha o pacote ideal para suas necessidades</p>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {pacotes.map((p) => (
              <Card
                key={p.nome}
                className={`relative ${p.destaque ? "border-primary shadow-lg ring-2 ring-primary/20" : ""}`}
              >
                {p.destaque && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                      Mais popular
                    </span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{p.nome}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-extrabold">{formatCurrency(p.precoCentavos)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {p.creditos} leads • {formatCurrency(Math.round(p.precoCentavos / p.creditos))}/lead
                  </p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <MaterialIcon name="check_circle" size={16} className="text-primary" />
                      {p.creditos} créditos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <MaterialIcon name="check_circle" size={16} className="text-primary" />
                      Leads exclusivos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <MaterialIcon name="check_circle" size={16} className="text-primary" />
                      Filtro por área
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <MaterialIcon name="check_circle" size={16} className="text-primary" />
                      Acesso ao WhatsApp do lead
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" variant={p.destaque ? "default" : "outline"} asChild>
                    <Link href="/cadastro">Comprar</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-2xl font-bold sm:text-3xl">Perguntas Frequentes</h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger>{faq.q}</AccordionTrigger>
                <AccordionContent>{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-foreground">Comece a receber leads hoje</h2>
          <p className="mt-3 text-primary-foreground/80">Crie sua conta em menos de 2 minutos</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/cadastro">Criar conta agora</Link>
            </Button>
            <Button size="xl" variant="whatsapp" asChild>
              <a href={buildWhatsAppUrl(advogadoWhatsAppMessage)} target="_blank" rel="noopener noreferrer">
                <MaterialIcon name="chat" size={20} />
                Falar com nossa equipe
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
