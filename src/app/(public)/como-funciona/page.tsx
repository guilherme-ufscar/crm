import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { Send, MessageCircle, Search, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Como Funciona",
  description: "Entenda como a Conect Juris funciona: envie seu caso, organizamos e direcionamos para o advogado certo.",
};

const steps = [
  {
    icon: Send,
    title: "1. Envie seu caso",
    desc: "Preencha nosso formulario simples com a area do direito, seus dados e uma descricao do que aconteceu. Leva poucos minutos e e gratuito.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: Search,
    title: "2. Organizamos as informacoes",
    desc: "Nossa equipe recebe seu caso, organiza as informacoes e classifica de acordo com a area e a complexidade.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: UserCheck,
    title: "3. Direcionamos para advogado parceiro",
    desc: "Com base na area e na regiao, seu caso e direcionado a um advogado parceiro especializado e inscrito na OAB.",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: MessageCircle,
    title: "4. O profissional entra em contato",
    desc: "Voce recebe o contato do advogado parceiro diretamente pelo WhatsApp para avancar com seu atendimento.",
    color: "bg-primary/10 text-primary",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#eef4ff] via-white to-[#e8efff] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold sm:text-4xl">Como Funciona</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Em 4 passos simples, conectamos voce ao advogado certo para o seu caso
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image src="/imagens/Lawyer-rafiki.webp" alt="Fluxo de atendimento" width={520} height={520} className="h-auto w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {steps.map((step) => {
              const Icon = step.icon;
              return (
                <Card key={step.title} className="overflow-hidden">
                  <CardContent className="flex items-start gap-6 pt-6">
                    <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${step.color}`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">{step.title}</h3>
                      <p className="mt-2 text-muted-foreground">{step.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-primary-foreground">Pronto para enviar seu caso?</h2>
          <p className="mt-3 text-primary-foreground/80">E rapido, gratuito e sem compromisso</p>
          <Button size="xl" variant="secondary" className="mt-8" asChild>
            <Link href="/enviar-caso">
              Enviar meu caso
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

