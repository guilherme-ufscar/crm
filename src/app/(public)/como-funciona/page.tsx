import Link from "next/link";
import { Metadata } from "next";
import { Send, MessageCircle, Search, UserCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "Como Funciona",
  description: "Entenda como a JuriLead funciona: envie seu caso, organizamos e direcionamos para o advogado certo.",
};

const steps = [
  {
    icon: Send,
    title: "1. Envie seu caso",
    desc: "Preencha nosso formulário simples com a área do direito, seus dados de contato e uma descrição do que aconteceu. Leva apenas alguns minutos e é totalmente gratuito.",
    color: "bg-blue-100 text-blue-600",
  },
  {
    icon: Search,
    title: "2. Organizamos as informações",
    desc: "Nossa equipe recebe seu caso, organiza as informações e classifica de acordo com a área e a complexidade. Isso garante que seu caso chegue ao profissional mais adequado.",
    color: "bg-indigo-100 text-indigo-600",
  },
  {
    icon: UserCheck,
    title: "3. Direcionamos para advogado parceiro",
    desc: "Com base na área e na região, seu caso é direcionado a um advogado parceiro especializado. Todos os profissionais são inscritos na OAB e verificados.",
    color: "bg-purple-100 text-purple-600",
  },
  {
    icon: MessageCircle,
    title: "4. O profissional entra em contato",
    desc: "Você recebe o contato do advogado parceiro diretamente pelo WhatsApp. O profissional avalia seu caso e, se houver contratação, os honorários são acordados entre vocês.",
    color: "bg-green-100 text-green-600",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Como Funciona</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Em 4 passos simples, conectamos você ao advogado certo para o seu caso
          </p>
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
          <h2 className="text-2xl font-bold text-white">Pronto para enviar seu caso?</h2>
          <p className="mt-3 text-indigo-100">É rápido, gratuito e sem compromisso</p>
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
