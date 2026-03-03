import Link from "next/link";
import {
  MessageCircle,
  Send,
  Shield,
  Users,
  CheckCircle,
  ArrowRight,
  Briefcase,
  Home,
  Building,
  ShoppingBag,
  Scale,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const areas = [
  { slug: "trabalhista", label: "Trabalhista", icon: Briefcase, desc: "Demissão, rescisão, horas extras, assédio e direitos do trabalhador" },
  { slug: "previdenciario", label: "Previdenciário (INSS)", icon: Shield, desc: "Aposentadoria, auxílio-doença, BPC/LOAS e benefícios negados" },
  { slug: "consumidor", label: "Consumidor", icon: ShoppingBag, desc: "Cobranças indevidas, produtos com defeito, propaganda enganosa" },
  { slug: "familia", label: "Direito de Família", icon: Users, desc: "Divórcio, pensão alimentícia, guarda de filhos" },
  { slug: "criminal", label: "Direito Criminal", icon: Scale, desc: "Defesa criminal, processos penais, habeas corpus" },
  { slug: "imoveis", label: "Direito Imobiliário", icon: Home, desc: "Compra e venda, locação, usucapião, inventário de imóveis" },
  { slug: "empresarial", label: "Direito Empresarial", icon: Building, desc: "Abertura de empresa, contratos, recuperação judicial" },
  { slug: "outros", label: "Outras Áreas", icon: MoreHorizontal, desc: "Outras questões jurídicas que não se encaixam nas categorias acima" },
];

const steps = [
  { num: 1, title: "Envie seu caso", desc: "Preencha um formulário rápido com os detalhes da sua situação jurídica." },
  { num: 2, title: "Organizamos as informações", desc: "Estruturamos e classificamos seu caso para direcioná-lo corretamente." },
  { num: 3, title: "Direcionamos para advogado parceiro", desc: "Seu caso é encaminhado a um profissional especializado na área." },
  { num: 4, title: "O profissional entra em contato", desc: "Receba atendimento personalizado diretamente pelo WhatsApp." },
];

const faqs = [
  {
    q: "A plataforma é um escritório de advocacia?",
    a: "Não. A JuriLead é uma plataforma tecnológica de intermediação. Os serviços advocatícios são prestados por advogados parceiros devidamente inscritos na OAB.",
  },
  {
    q: "O atendimento é gratuito?",
    a: "O envio do seu caso pela plataforma é gratuito. Os honorários pelo serviço jurídico são definidos diretamente entre você e o advogado parceiro.",
  },
  {
    q: "Vocês garantem ganho de causa?",
    a: "Não. Nenhuma plataforma ou advogado pode garantir resultados em processos jurídicos. O que garantimos é o direcionamento para profissionais qualificados.",
  },
  {
    q: "Quem será responsável pelo meu caso?",
    a: "O advogado parceiro que aceitar seu caso será o responsável técnico. Todos os profissionais são verificados e possuem registro na OAB.",
  },
  {
    q: "Posso usar a plataforma se já tenho advogado?",
    a: "Se você já possui advogado constituído ou processo em andamento, recomendamos que entre em contato diretamente com seu profissional. Nossa plataforma não atende esses casos.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-blue-50">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
              Teve seu direito negado?{" "}
              <span className="text-primary">Organize seu caso</span> e receba orientação especializada
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              Plataforma tecnológica que organiza informações e direciona demandas jurídicas para advogados parceiros em todo o Brasil. Rápido, seguro e sem compromisso.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="xl" asChild>
                <Link href="/enviar-caso">
                  <Send className="h-5 w-5" />
                  Enviar meu caso
                </Link>
              </Button>
              <Button variant="whatsapp" size="xl" asChild>
                <a
                  href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-5 w-5" />
                  Falar agora no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-blue-500/5 blur-3xl" />
      </section>

      {/* ==================== COMO FUNCIONA ==================== */}
      <section className="py-16 sm:py-24" id="como-funciona">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Como Funciona</h2>
            <p className="mt-3 text-muted-foreground">Em 4 passos simples, seu caso chega ao profissional certo</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <Card key={step.num} className="relative overflow-hidden text-center hover:shadow-md transition-shadow">
                <CardContent className="pt-8 pb-6">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                    {step.num}
                  </div>
                  <h3 className="mt-4 font-semibold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{step.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== ÁREAS ==================== */}
      <section className="bg-slate-50 py-16 sm:py-24" id="areas">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Áreas de Atuação</h2>
            <p className="mt-3 text-muted-foreground">Selecione a área do seu caso para receber orientação especializada</p>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <Link key={area.slug} href={`/areas/${area.slug}`}>
                  <Card className="group h-full hover:shadow-md hover:border-primary/30 transition-all cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="mt-3 font-semibold text-foreground">{area.label}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{area.desc}</p>
                      <div className="mt-3 flex items-center text-sm font-medium text-primary">
                        Saiba mais
                        <ArrowRight className="ml-1 h-3.5 w-3.5" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ==================== PROVA SOCIAL / CONFIANÇA ==================== */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                <CheckCircle className="h-7 w-7 text-green-600" />
              </div>
              <h3 className="mt-4 font-semibold">Atendimento em todo o Brasil</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Rede de advogados parceiros em todos os estados brasileiros.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-100">
                <Shield className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="mt-4 font-semibold">Privacidade e LGPD</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Seus dados são protegidos e tratados conforme a Lei Geral de Proteção de Dados.
              </p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-100">
                <Users className="h-7 w-7 text-indigo-600" />
              </div>
              <h3 className="mt-4 font-semibold">Advogados parceiros OAB</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Todos os profissionais são verificados e possuem registro ativo na OAB.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== FAQ ==================== */}
      <section className="bg-slate-50 py-16 sm:py-24" id="faq">
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

      {/* ==================== TERMOS / AVISOS ==================== */}
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-6">
            <div className="flex items-start gap-3">
              <Scale className="h-6 w-6 text-amber-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900">Aviso Importante</h3>
                <p className="mt-1 text-sm text-amber-800">
                  A plataforma JuriLead atua como <strong>intermediadora tecnológica</strong> e não presta diretamente serviços advocatícios. A responsabilidade técnica é do advogado contratado. <strong>Nenhum resultado é garantido.</strong> Não atendemos casos com advogado constituído ou processo em curso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CTA FINAL ==================== */}
      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pronto para resolver sua situação jurídica?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Envie seu caso agora e receba atendimento de um profissional especializado.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/enviar-caso">
                <Send className="h-5 w-5" />
                Enviar meu caso
              </Link>
            </Button>
            <Button size="xl" variant="whatsapp" asChild>
              <a
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
