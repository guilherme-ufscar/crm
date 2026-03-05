import Link from "next/link";
import type { Metadata } from "next";
import {
  Briefcase,
  Shield,
  ShoppingBag,
  Users,
  Scale,
  Home,
  Building,
  Landmark,
  MoreHorizontal,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Áreas do Direito",
  description:
    "Conheça todas as áreas do direito em que atuamos: trabalhista, previdenciário, consumidor, família, criminal, imobiliário, empresarial e mais.",
};

const areas = [
  {
    slug: "trabalhista",
    label: "Trabalhista",
    icon: Briefcase,
    desc: "Demissão, rescisão, horas extras, assédio e direitos do trabalhador",
  },
  {
    slug: "previdenciario",
    label: "Previdenciário (INSS)",
    icon: Shield,
    desc: "Aposentadoria, auxílio-doença, BPC/LOAS e benefícios negados",
  },
  {
    slug: "consumidor",
    label: "Consumidor",
    icon: ShoppingBag,
    desc: "Cobranças indevidas, produtos com defeito, propaganda enganosa",
  },
  {
    slug: "familia",
    label: "Direito de Família",
    icon: Users,
    desc: "Divórcio, pensão alimentícia, guarda de filhos",
  },
  {
    slug: "criminal",
    label: "Direito Criminal",
    icon: Scale,
    desc: "Defesa criminal, processos penais, habeas corpus",
  },
  {
    slug: "imoveis",
    label: "Direito Imobiliário",
    icon: Home,
    desc: "Compra e venda, locação, usucapião, problemas com construtoras",
  },
  {
    slug: "empresarial",
    label: "Direito Empresarial",
    icon: Building,
    desc: "Abertura de empresas, contratos, recuperação judicial, disputas societárias",
  },
  {
    slug: "bancario",
    label: "Direito Bancário",
    icon: Landmark,
    desc: "Execução bancária, excesso de cobrança, prescrição da dívida e defesa contra penhora",
  },
  {
    slug: "outros",
    label: "Outras Áreas",
    icon: MoreHorizontal,
    desc: "Tributário, administrativo, ambiental, digital e outras áreas",
  },
];

export default function AreasPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            Áreas do Direito
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Selecione a área do seu caso para receber orientação de um advogado
            especialista. Se não souber a área, não se preocupe — estamos aqui
            para ajudar.
          </p>
        </div>
      </section>

      {/* Grid de Áreas */}
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areas.map((area) => {
              const Icon = area.icon;
              return (
                <Link key={area.slug} href={`/areas/${area.slug}`}>
                  <Card className="group h-full transition-all hover:shadow-lg hover:border-primary/30">
                    <CardContent className="flex flex-col items-start gap-4 p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        <Icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h2 className="text-lg font-bold">{area.label}</h2>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {area.desc}
                        </p>
                      </div>
                      <span className="mt-auto inline-flex items-center text-sm font-medium text-primary group-hover:underline">
                        Saiba mais
                        <ArrowRight className="ml-1 h-4 w-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground">
            Não sabe qual área se encaixa?
          </h2>
          <p className="mt-3 text-primary-foreground/80">
            Envie seu caso e nossa equipe direcionará para o especialista certo.
          </p>
          <div className="mt-8">
            <Button size="xl" variant="secondary" asChild>
              <Link href="/enviar-caso">
                Enviar meu caso
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

