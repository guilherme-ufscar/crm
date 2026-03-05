import Image from "next/image";
import { Metadata } from "next";
import { Shield, Users, CheckCircle, Scale } from "lucide-react";

export const metadata: Metadata = {
  title: "Quem Somos",
  description: "Conheça a Conect Juris - plataforma tecnológica de organização e direcionamento de demandas jurídicas.",
};

export default function QuemSomosPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-[#eef4ff] via-white to-[#e8efff] py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <h1 className="text-3xl font-extrabold sm:text-4xl">Quem Somos</h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                A Conect Juris é uma plataforma tecnológica que atua como meio de organização e direcionamento de demandas jurídicas para advogados parceiros em todo o Brasil.
              </p>
            </div>
            <div className="flex justify-center lg:justify-end">
              <Image src="/imagens/Lawyer-cuate.webp" alt="Equipe Conect Juris" width={520} height={520} className="h-auto w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg max-w-none">
            <p>
              Nossa missão é conectar pessoas que precisam de orientação jurídica com profissionais qualificados, de forma rápida, segura e acessível.
            </p>
            <p>
              Atuamos como <strong>intermediadora tecnológica</strong> - não prestamos serviços advocatícios diretamente. Os serviços jurídicos são prestados por advogados parceiros devidamente inscritos na OAB, que assumem a responsabilidade técnica por cada caso.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-4 rounded-xl border p-6">
              <Shield className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold">Privacidade e LGPD</h3>
                <p className="mt-1 text-sm text-muted-foreground">Seus dados são protegidos e tratados com responsabilidade, em conformidade com a LGPD.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border p-6">
              <Users className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold">Advogados verificados</h3>
                <p className="mt-1 text-sm text-muted-foreground">Todos os profissionais parceiros possuem registro ativo na OAB e são verificados pela nossa equipe.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border p-6">
              <CheckCircle className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold">Ética e transparência</h3>
                <p className="mt-1 text-sm text-muted-foreground">Atuamos com transparência em todas as etapas, sem garantias de resultados e com respeito ao Estatuto da OAB.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border p-6">
              <Scale className="h-8 w-8 text-primary shrink-0" />
              <div>
                <h3 className="font-semibold">Compromisso com a Justiça</h3>
                <p className="mt-1 text-sm text-muted-foreground">Facilitamos o acesso à orientação jurídica para que mais pessoas conheçam e exerçam seus direitos.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
