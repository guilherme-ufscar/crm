import Image from "next/image";
import Link from "next/link";
import {

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
  Landmark,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/public-env";
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
  { slug: "bancario", label: "Direito Bancário", icon: Landmark, desc: "Execução bancária, excesso de cobrança, prescrição da dívida e defesa contra penhora" },
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
    a: "Não. A Conect Juris é uma plataforma tecnológica de intermediação. Os serviços advocatícios são prestados por advogados parceiros devidamente inscritos na OAB.",
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
      <section className="relative overflow-hidden bg-gradient-to-br from-[#eef4ff] via-white to-[#e8efff]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8 lg:py-24">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
                Bem-vindo à <span className="text-primary">Conecta Juris</span>, a Plataforma Digital de Advocacia do Brasil
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground lg:mx-0">
                Fale agora com advogados cadastrados e busque a solução para o seu caso sem sair de casa!
              </p>
              <p className="mt-4 text-base font-semibold text-foreground">
                Precisando de um Advogado Online?
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Button size="xl" asChild>
                  <Link href="/enviar-caso">
                    <Send className="h-5 w-5" />
                    Enviar meu caso
                  </Link>
                </Button>
                <Button variant="whatsapp" size="xl" asChild>
                  <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                    <WhatsAppIcon className="h-5 w-5" />
                    Falar agora no WhatsApp
                  </a>
                </Button>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image src="/imagens/Law firm-amico.webp" alt="Ilustração jurídica" width={520} height={520} className="h-auto w-full max-w-sm" priority />
            </div>
          </div>
        </div>
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />
      </section>

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

      <section className="bg-primary/5 py-16 sm:py-24" id="areas">
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
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
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

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="text-2xl font-bold sm:text-3xl">Por que enviar o seu caso?</h2>
            <p className="mt-3 text-muted-foreground">
              Com a Conecta Juris, você pode buscar a solução para o seu problema jurídico de forma rápida, segura e totalmente online, sem precisar sair de casa.
            </p>
          </div>
          <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Atendimento jurídico online</h3>
              <p className="mt-2 text-sm text-muted-foreground">Conecte-se com advogados quando e onde precisar, com praticidade e segurança.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Shield className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Rede de advogados especializados</h3>
              <p className="mt-2 text-sm text-muted-foreground">Tenha acesso a advogados parceiros qualificados e experientes em diversas áreas do Direito, prontos para analisar seu caso.</p>
            </div>
            <div className="flex flex-col items-center text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Users className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-semibold">Mais acesso à orientação jurídica</h3>
              <p className="mt-2 text-sm text-muted-foreground">A Conecta Juris aproxima pessoas e advogados, facilitando o acesso à orientação jurídica e permitindo que você apresente seu caso mesmo que não possa pagar honorários antecipadamente.</p>
            </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image src="/imagens/Law firm-bro.webp" alt="Equipe jurídica" width={520} height={520} className="h-auto w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 py-16 sm:py-24" id="faq">
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

      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl border border-secondary/25 bg-secondary/10 p-6">
            <div className="flex items-start gap-3">
              <Scale className="h-6 w-6 text-secondary mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-secondary">Aviso Importante</h3>
                <p className="mt-1 text-sm text-secondary">
                  A plataforma Conect Juris atua como <strong>intermediadora tecnológica</strong> e não presta diretamente serviços advocatícios. A responsabilidade técnica é do advogado contratado. <strong>Nenhum resultado é garantido.</strong> Não atendemos casos com advogado constituído ou processo em curso.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl">Pronto para resolver sua situação jurídica?</h2>
          <p className="mt-4 text-lg text-primary-foreground/80">Envie seu caso agora e receba atendimento de um profissional especializado.</p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/enviar-caso">
                <Send className="h-5 w-5" />
                Enviar meu caso
              </Link>
            </Button>
            <Button size="xl" variant="whatsapp" asChild>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-5 w-5" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

