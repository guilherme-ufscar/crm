import { Suspense } from "react";
import { Metadata } from "next";
import { LeadForm } from "@/components/forms/lead-form";

export const metadata: Metadata = {
  title: "Enviar Caso — Receba Orientação Jurídica",
  description:
    "Preencha o formulário com os detalhes do seu caso e receba orientação de um advogado especializado diretamente pelo WhatsApp.",
};

export default function EnviarCasoPage() {
  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Main Form */}
          <div className="lg:col-span-2">
            <h1 className="text-2xl font-bold sm:text-3xl">Enviar seu Caso</h1>
            <p className="mt-2 text-muted-foreground">
              Preencha as informações abaixo para que possamos direcionar seu caso ao advogado mais adequado.
            </p>
            <div className="mt-8">
              <Suspense fallback={<div className="animate-pulse space-y-4"><div className="h-10 bg-muted rounded" /><div className="h-10 bg-muted rounded" /><div className="h-10 bg-muted rounded" /></div>}>
                <LeadForm />
              </Suspense>
            </div>
          </div>

          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-6">
              <div className="rounded-xl border bg-primary/5 p-6">
                <h3 className="font-semibold">Como funciona</h3>
                <ol className="mt-4 space-y-3 text-sm text-muted-foreground">
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">1</span>
                    Preencha o formulário com os dados do caso
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">2</span>
                    Você será direcionado ao WhatsApp
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">3</span>
                    Nossa equipe organiza e classifica seu caso
                  </li>
                  <li className="flex gap-2">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">4</span>
                    Advogado especialista entra em contato
                  </li>
                </ol>
              </div>

              <div className="rounded-xl border bg-primary/5 border-primary/20 p-6">
                <h3 className="font-semibold text-secondary">Você está em boas mãos</h3>
                <ul className="mt-3 space-y-2 text-sm text-secondary">
                  <li>✓ Dados protegidos (LGPD)</li>
                  <li>✓ Advogados verificados OAB</li>
                  <li>✓ Atendimento rápido</li>
                  <li>✓ Sem compromisso</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

