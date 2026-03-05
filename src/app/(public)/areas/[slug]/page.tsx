import Link from "next/link";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { Card, CardContent } from "@/components/ui/card";
import { buildWhatsAppUrl } from "@/lib/public-env";

const iconMap: Record<string, string> = {
  Briefcase: "work", Shield: "shield", ShoppingBag: "shopping_bag", Home: "home",
  Building: "domain", Users: "family_restroom", Scale: "balance", MoreHorizontal: "more_horiz",
};

interface AreaData {
  slug: string;
  value: string;
  label: string;
  icon: string;
  headline: string;
  description: string;
  examples: string[];
  checklist: string[];
  faqs: { q: string; a: string }[];
}

const areasData: AreaData[] = [
  {
    slug: "trabalhista", value: "TRABALHISTA", label: "Trabalhista", icon: "Briefcase",
    headline: "Direito Trabalhista - Proteja seus direitos como trabalhador",
    description: "Se voce foi demitido injustamente, nao recebeu suas verbas rescisorias corretamente, sofre assedio no trabalho ou tem qualquer problema na relacao de emprego, podemos direcionar seu caso para um advogado especialista.",
    examples: [
      "Demissao sem justa causa e verbas rescisorias",
      "Horas extras nao pagas",
      "Assedio moral ou sexual no trabalho",
      "Acidente de trabalho",
      "Desvio ou acumulo de funcao",
      "Reconhecimento de vinculo empregaticio",
      "FGTS nao depositado",
    ],
    checklist: [
      "Voce trabalhou com carteira assinada?",
      "Recebeu todas as verbas na rescisao?",
      "Tem contracheques ou comprovantes?",
      "Ha testemunhas da situacao?",
    ],
    faqs: [
      { q: "Qual o prazo para entrar com acao trabalhista?", a: "Voce tem ate 2 anos apos a saida do emprego para ajuizar a acao, podendo reclamar direitos dos ultimos 5 anos de trabalho." },
      { q: "Preciso de advogado para reclamacao trabalhista?", a: "Embora nao seja obrigatorio no primeiro grau, e altamente recomendado ter um advogado especializado para garantir seus direitos." },
    ],
  },
  {
    slug: "previdenciario", value: "PREVIDENCIARIO", label: "Previdenciario (INSS)", icon: "Shield",
    headline: "Direito Previdenciario - Garanta seus beneficios do INSS",
    description: "Se seu beneficio foi negado pelo INSS, se voce precisa de aposentadoria, auxilio-doenca, BPC/LOAS ou qualquer outro beneficio previdenciario, temos advogados parceiros especializados prontos para ajudar.",
    examples: [
      "Aposentadoria por idade ou tempo de contribuicao",
      "Auxilio-doenca negado",
      "BPC/LOAS (Beneficio de Prestacao Continuada)",
      "Aposentadoria especial",
      "Pensao por morte",
      "Revisao de beneficio",
      "Auxilio-acidente",
    ],
    checklist: [
      "Voce ja deu entrada no INSS?",
      "Recebeu carta de indeferimento?",
      "Tem laudos medicos recentes?",
      "Possui CNIS ou carteira de trabalho?",
    ],
    faqs: [
      { q: "O INSS negou meu beneficio, o que fazer?", a: "Voce pode recorrer administrativamente ou judicialmente. Um advogado previdenciarista pode analisar seu caso e indicar o melhor caminho." },
      { q: "Quanto tempo demora um processo contra o INSS?", a: "Depende do caso, mas acoes judiciais costumam levar de 6 meses a 2 anos em media." },
    ],
  },
  {
    slug: "consumidor", value: "CONSUMIDOR", label: "Consumidor", icon: "ShoppingBag",
    headline: "Direito do Consumidor - Defenda-se contra abusos",
    description: "Cobrancas indevidas, produtos com defeito, propaganda enganosa, negativacao indevida ou qualquer violacao dos seus direitos como consumidor. Conectamos voce ao advogado certo.",
    examples: [
      "Cobranca indevida ou abusiva",
      "Produto com defeito ou vicio",
      "Propaganda enganosa",
      "Negativacao indevida (SPC/Serasa)",
      "Cancelamento de contrato abusivo",
      "Falha na prestacao de servico",
    ],
    checklist: [
      "Voce tem o comprovante de compra/contrato?",
      "Ja tentou resolver diretamente com a empresa?",
      "Tem prints ou registros de atendimento?",
      "Foi negativado indevidamente?",
    ],
    faqs: [
      { q: "Posso processar uma empresa por cobranca indevida?", a: "Sim. O Codigo de Defesa do Consumidor preve a devolucao em dobro do valor cobrado indevidamente, alem de indenizacao por danos morais quando aplicavel." },
    ],
  },
  {
    slug: "familia", value: "FAMILIA", label: "Direito de Familia", icon: "Users",
    headline: "Direito de Familia - Resolva questoes familiares",
    description: "Divorcio, pensao alimenticia, guarda de filhos, inventario, uniao estavel. Questoes familiares requerem sensibilidade e conhecimento especializado.",
    examples: [
      "Divorcio consensual ou litigioso",
      "Pensao alimenticia (fixacao ou revisao)",
      "Guarda de filhos",
      "Regulamentacao de visitas",
      "Inventario e partilha de bens",
      "Reconhecimento de uniao estavel",
    ],
    checklist: [
      "Ha acordo entre as partes?",
      "Existem filhos menores?",
      "Ha bens a serem partilhados?",
      "Conhece a renda do(a) ex-conjuge?",
    ],
    faqs: [
      { q: "Quanto tempo demora um divorcio?", a: "O divorcio consensual pode ser feito em cartorio em poucos dias. O litigioso depende da complexidade, podendo levar meses." },
    ],
  },
  {
    slug: "criminal", value: "CRIMINAL", label: "Direito Criminal", icon: "Scale",
    headline: "Direito Criminal - Defesa penal especializada",
    description: "Defesa criminal em processos penais, inqueritos policiais, habeas corpus, revisao criminal. Advogados criminalistas prontos para garantir seus direitos constitucionais.",
    examples: [
      "Defesa em processos criminais",
      "Habeas corpus",
      "Inquerito policial",
      "Liberdade provisoria / fianca",
      "Revisao criminal",
      "Execucao penal e progressao de regime",
    ],
    checklist: [
      "Ha boletim de ocorrencia registrado?",
      "Existe inquerito ou processo em andamento?",
      "Voce foi citado ou intimado?",
      "Ha testemunhas ou provas a seu favor?",
    ],
    faqs: [
      { q: "Preciso de advogado para depor na delegacia?", a: "Sim. Todo cidadao tem direito de ser acompanhado por advogado em depoimentos e interrogatorios. E altamente recomendado." },
    ],
  },
  {
    slug: "imoveis", value: "IMOVEIS", label: "Direito Imobiliario", icon: "Home",
    headline: "Direito Imobiliario - Proteja seu patrimonio",
    description: "Compra e venda de imoveis, problemas com construtoras, locacao, usucapiao, regularizacao de imoveis. Advogados especializados em questoes imobiliarias.",
    examples: [
      "Compra e venda de imovel e problemas no contrato",
      "Atraso na entrega do imovel (construtora)",
      "Usucapiao",
      "Despejo e cobranca de alugueis",
      "Regularizacao de imovel",
      "Vicios construtivos",
    ],
    checklist: [
      "Voce tem o contrato de compra/venda ou locacao?",
      "Ha registro do imovel em cartorio?",
      "Existem documentos que comprovem posse?",
      "Houve vistoria ou laudo tecnico?",
    ],
    faqs: [
      { q: "A construtora atrasou meu imovel, tenho direito a indenizacao?", a: "Sim. O atraso na entrega pode gerar indenizacao por danos materiais e morais, alem do pagamento de alugueis pelo periodo de atraso." },
    ],
  },
  {
    slug: "empresarial", value: "EMPRESARIAL", label: "Direito Empresarial", icon: "Building",
    headline: "Direito Empresarial - Solucoes para o seu negocio",
    description: "Abertura e fechamento de empresas, contratos empresariais, recuperacao judicial, disputas societarias. Suporte juridico para empreendedores e empresas.",
    examples: [
      "Abertura e registro de empresa",
      "Contrato social e alteracoes societarias",
      "Recuperacao judicial e falencia",
      "Disputas entre socios",
      "Contratos comerciais e de prestacao de servicos",
      "Propriedade intelectual e marcas e patentes",
    ],
    checklist: [
      "Voce tem contrato social da empresa?",
      "Ha disputa entre socios?",
      "A empresa esta endividada?",
      "Existem contratos em litigio?",
    ],
    faqs: [
      { q: "Posso ser responsabilizado pessoalmente pelas dividas da empresa?", a: "Depende do tipo societario e das circunstancias. Em empresas limitadas, a responsabilidade e geralmente restrita ao capital social, salvo em casos de fraude ou confusao patrimonial." },
    ],
  },
  {
    slug: "bancario", value: "BANCARIO", label: "Direito Bancario", icon: "Scale",
    headline: "Direito Bancario - Possibilidades de defesa no processo de execucao bancaria",
    description: "Existem varias formas de defesa no processo de execucao bancaria, como excesso de execucao, prescricao da divida, nulidade do titulo e medidas para desbloqueio de contas e protecao de bens essenciais.",
    examples: [
      "Excesso de execucao",
      "Prescricao da divida",
      "Inexistencia ou nulidade do titulo",
      "Desbloqueio de contas bancarias",
      "Impenhorabilidade de bens essenciais",
      "Restricao de penhora sobre salario, aposentadoria ou pensao",
    ],
    checklist: [
      "O valor cobrado esta maior do que o realmente devido?",
      "A divida pode estar prescrita pelo tempo de cobranca?",
      "O contrato ou titulo possui clausulas abusivas?",
      "Houve bloqueio de conta, salario, aposentadoria ou pensao?",
    ],
    faqs: [
      {
        q: "Excesso de execucao pode reduzir a divida?",
        a: "Sim. Se houver cobranca acima do valor realmente devido, por erros de juros, correcao monetaria ou encargos indevidos, o juiz pode reconhecer o excesso e reduzir a divida.",
      },
      {
        q: "Prescricao da divida impede a cobranca judicial?",
        a: "Dependendo da natureza do credito e do prazo legal aplicavel, a divida pode estar prescrita. Nesses casos, o banco pode perder o direito de cobrar judicialmente.",
      },
      {
        q: "Posso questionar o contrato usado na execucao?",
        a: "Sim. Se o titulo ou contrato tiver nulidades ou clausulas abusivas, e possivel discutir a validade da base da execucao.",
      },
      {
        q: "Como funciona a protecao contra penhora de bens e contas?",
        a: "Em muitos casos, e possivel pedir o desbloqueio de contas e proteger bens essenciais a subsistencia. Tambem ha limites para penhora sobre salario, aposentadoria e pensao de valor minimo.",
      },
    ],
  },
  {
    slug: "outros", value: "OUTROS", label: "Outras Areas", icon: "MoreHorizontal",
    headline: "Outras Areas do Direito - Encontre orientacao",
    description: "Sua questao juridica nao se encaixa nas categorias principais? Sem problema. Envie seu caso e direcionaremos para o profissional mais adequado.",
    examples: [
      "Direito administrativo",
      "Direito tributario",
      "Direito ambiental",
      "Direito digital e internet",
      "Direito de saude e planos e SUS",
      "Direito militar",
      "Direito bancario",
    ],
    checklist: [
      "Descreva seu caso com o maximo de detalhes",
      "Informe a area que mais se aproxima",
      "Reuna documentos relacionados",
    ],
    faqs: [
      { q: "Como saber qual area do direito meu caso se encaixa?", a: "Nao se preocupe. Ao descrever seu caso, nossa equipe direcionara para o profissional mais adequado, mesmo que voce nao saiba a area especifica." },
    ],
  },
];

export function generateStaticParams() {
  return areasData.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const area = areasData.find((a) => a.slug === slug);
    if (!area) return { title: "Area nao encontrada" };
    return {
      title: `${area.label} - Orientacao Juridica Especializada`,
      description: area.description,
    };
  });
}

export default async function AreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const area = areasData.find((a) => a.slug === slug);
  if (!area) notFound();

  const areaIconName = iconMap[area.icon] || "balance";

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-6">
            <MaterialIcon name={areaIconName} size={32} />
          </div>
          <h1 className="text-3xl font-extrabold sm:text-4xl">{area.headline}</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{area.description}</p>
          <div className="mt-8">
            <Button size="xl" asChild>
              <Link href={`/enviar-caso?area=${area.value}`}>
                Enviar meu caso sobre {area.label}
                <MaterialIcon name="arrow_forward" size={20} className="ml-2" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Exemplos de casos */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Exemplos de casos que atendemos</h2>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {area.examples.map((ex, i) => (
              <div key={i} className="flex items-start gap-3 rounded-lg border p-4">
                <MaterialIcon name="check_circle" size={20} className="text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{ex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="bg-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Perguntas rapidas para avaliar seu caso</h2>
          <div className="mt-6 space-y-3">
            {area.checklist.map((item, i) => (
              <Card key={i}>
                <CardContent className="flex items-center gap-3 py-4">
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-bold">
                    {i + 1}
                  </div>
                  <span className="text-sm">{item}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {area.faqs.length > 0 && (
        <section className="py-16">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-center">Perguntas Frequentes - {area.label}</h2>
            <div className="mt-8 space-y-4">
              {area.faqs.map((faq, i) => (
                <Card key={i}>
                  <CardContent className="pt-6">
                    <h3 className="font-semibold">{faq.q}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Final */}
      <section className="bg-primary py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-white">
            Tem um caso de {area.label}?
          </h2>
          <p className="mt-3 text-white/80">
            Envie agora e receba orientacao de um advogado especialista
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="xl" variant="secondary" asChild>
              <Link href={`/enviar-caso?area=${area.value}`}>
                Enviar meu caso
                <MaterialIcon name="arrow_forward" size={20} className="ml-2" />
              </Link>
            </Button>
            <Button size="xl" variant="whatsapp" asChild>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
              >
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
