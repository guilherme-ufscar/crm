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
    description: "Se você foi demitido injustamente, não recebeu suas verbas rescisórias corretamente, sofre assédio no trabalho ou tem qualquer problema na relação de emprego, podemos direcionar seu caso para um advogado especialista.",
    examples: [
      "Demissão sem justa causa e verbas rescisórias",
      "Horas extras não pagas",
      "Assédio moral ou sexual no trabalho",
      "Acidente de trabalho",
      "Desvio ou acúmulo de função",
      "Reconhecimento de vínculo empregatício",
      "FGTS não depositado",
    ],
    checklist: [
      "Você trabalhou com carteira assinada?",
      "Recebeu todas as verbas na rescisão?",
      "Tem contracheques ou comprovantes?",
      "Há testemunhas da situação?",
    ],
    faqs: [
      { q: "Qual o prazo para entrar com ação trabalhista?", a: "Você tem até 2 anos após a saída do emprego para ajuizar a ação, podendo reclamar direitos dos últimos 5 anos de trabalho." },
      { q: "Preciso de advogado para reclamação trabalhista?", a: "Embora não seja obrigatório no primeiro grau, é altamente recomendado ter um advogado especializado para garantir seus direitos." },
    ],
  },
  {
    slug: "previdenciario", value: "PREVIDENCIARIO", label: "Previdenciário (INSS)", icon: "Shield",
    headline: "Direito Previdenciário - Garanta seus benefícios do INSS",
    description: "Se seu benefício foi negado pelo INSS, se você precisa de aposentadoria, auxílio-doença, BPC/LOAS ou qualquer outro benefício previdenciário, temos advogados parceiros especializados prontos para ajudar.",
    examples: [
      "Aposentadoria por idade ou tempo de contribuição",
      "Auxílio-doença negado",
      "BPC/LOAS (Benefício de Prestação Continuada)",
      "Aposentadoria especial",
      "Pensão por morte",
      "Revisão de benefício",
      "Auxílio-acidente",
    ],
    checklist: [
      "Você já deu entrada no INSS?",
      "Recebeu carta de indeferimento?",
      "Tem laudos médicos recentes?",
      "Possui CNIS ou carteira de trabalho?",
    ],
    faqs: [
      { q: "O INSS negou meu benefício, o que fazer?", a: "Você pode recorrer administrativamente ou judicialmente. Um advogado previdenciarista pode analisar seu caso e indicar o melhor caminho." },
      { q: "Quanto tempo demora um processo contra o INSS?", a: "Depende do caso, mas ações judiciais costumam levar de 6 meses a 2 anos em média." },
    ],
  },
  {
    slug: "consumidor", value: "CONSUMIDOR", label: "Consumidor", icon: "ShoppingBag",
    headline: "Direito do Consumidor - Defenda-se contra abusos",
    description: "Cobranças indevidas, produtos com defeito, propaganda enganosa, negativação indevida ou qualquer violação dos seus direitos como consumidor. Conectamos você ao advogado certo.",
    examples: [
      "Cobrança indevida ou abusiva",
      "Produto com defeito ou vício",
      "Propaganda enganosa",
      "Negativação indevida (SPC/Serasa)",
      "Cancelamento de contrato abusivo",
      "Falha na prestação de serviço",
    ],
    checklist: [
      "Você tem o comprovante de compra/contrato?",
      "Já tentou resolver diretamente com a empresa?",
      "Tem prints ou registros de atendimento?",
      "Foi negativado indevidamente?",
    ],
    faqs: [
      { q: "Posso processar uma empresa por cobrança indevida?", a: "Sim. O Código de Defesa do Consumidor prevê a devolução em dobro do valor cobrado indevidamente, além de indenização por danos morais quando aplicável." },
    ],
  },
  {
    slug: "familia", value: "FAMILIA", label: "Direito de Família", icon: "Users",
    headline: "Direito de Família - Resolva questões familiares",
    description: "Divórcio, pensão alimentícia, guarda de filhos, inventário, união estável. Questões familiares requerem sensibilidade e conhecimento especializado.",
    examples: [
      "Divórcio consensual ou litigioso",
      "Pensão alimentícia (fixação ou revisão)",
      "Guarda de filhos",
      "Regulamentação de visitas",
      "Inventário e partilha de bens",
      "Reconhecimento de união estável",
    ],
    checklist: [
      "Há acordo entre as partes?",
      "Existem filhos menores?",
      "Há bens a serem partilhados?",
      "Conhece a renda do(a) ex-cônjuge?",
    ],
    faqs: [
      { q: "Quanto tempo demora um divórcio?", a: "O divórcio consensual pode ser feito em cartório em poucos dias. O litigioso depende da complexidade, podendo levar meses." },
    ],
  },
  {
    slug: "criminal", value: "CRIMINAL", label: "Direito Criminal", icon: "Scale",
    headline: "Direito Criminal - Defesa penal especializada",
    description: "Defesa criminal em processos penais, inquéritos policiais, habeas corpus, revisão criminal. Advogados criminalistas prontos para garantir seus direitos constitucionais.",
    examples: [
      "Defesa em processos criminais",
      "Habeas corpus",
      "Inquérito policial",
      "Liberdade provisória / fiança",
      "Revisão criminal",
      "Execução penal e progressão de regime",
    ],
    checklist: [
      "Há boletim de ocorrência registrado?",
      "Existe inquerito ou processo em andamento?",
      "Você foi citado ou intimado?",
      "Há testemunhas ou provas a seu favor?",
    ],
    faqs: [
      { q: "Preciso de advogado para depor na delegacia?", a: "Sim. Todo cidadão tem direito de ser acompanhado por advogado em depoimentos e interrogatórios. É altamente recomendado." },
    ],
  },
  {
    slug: "imóveis", value: "IMOVEIS", label: "Direito Imobiliário", icon: "Home",
    headline: "Direito Imobiliário - Protejá seu patrimônio",
    description: "Compra e venda de imóveis, problemas com construtoras, locação, usucapião, regularização de imóveis. Advogados especializados em questoes imobiliarias.",
    examples: [
      "Compra e venda de imóvel e problemas no contrato",
      "Atraso na entrega do imóvel (construtora)",
      "Usucapiao",
      "Despejo e cobranca de aluguéis",
      "Regularização de imóvel",
      "Vícios construtivos",
    ],
    checklist: [
      "Você tem o contrato de compra/venda ou locação?",
      "Há registro do imóvel em cartório?",
      "Existem documentos que comprovem posse?",
      "Houve vistoria ou laudo técnico?",
    ],
    faqs: [
      { q: "A construtora atrasou meu imóvel, tenho direito a indenização?", a: "Sim. O atraso na entrega pode gerar indenização por danos matériais e morais, além do pagamento de aluguéis pelo periodo de atraso." },
    ],
  },
  {
    slug: "empresarial", value: "EMPRESARIAL", label: "Direito Empresarial", icon: "Building",
    headline: "Direito Empresarial - Soluções para o seu negócio",
    description: "Abertura e fechamento de empresas, contratos empresariais, recuperação judicial, disputas societárias. Suporte jurídico para empreendedores e empresas.",
    examples: [
      "Abertura e registro de empresa",
      "Contrato social e alterações societárias",
      "Recuperacao judicial e falência",
      "Disputas entre sócios",
      "Contratos comerciais e de prestação de serviços",
      "Propriedade intelectual e marcas e paténtes",
    ],
    checklist: [
      "Você tem contrato social da empresa?",
      "Há disputa entre sócios?",
      "A empresa está endívidada?",
      "Existem contratos em litígio?",
    ],
    faqs: [
      { q: "Posso ser responsabilizado pessoalmente pelas dívidas da empresa?", a: "Depende do tipo societário e das circunstâncias. Em empresas limitadas, a responsabilidade e geralmente restrita ao capital social, salvo em casos de fraude ou confusão patrimonial." },
    ],
  },
  {
    slug: "bancario", value: "BANCARIO", label: "Direito Bancário", icon: "Scale",
    headline: "Direito Bancário - Possibilidades de defesa no processo de execução bancária",
    description: "Existem várias formas de defesa no processo de execução bancária, como excesso de execução, prescrição da dívida, nulidade do título e medidas para desbloqueio de contas e proteção de bens essenciais.",
    examples: [
      "Excesso de execução",
      "Prescrição da dívida",
      "Inexistência ou nulidade do título",
      "Desbloqueio de contas bancárias",
      "Impenhorabilidade de bens essenciais",
      "Restrição de penhora sobre salário, aposentadoria ou pensão",
    ],
    checklist: [
      "O valor cobrado está maior do que o realmente devido?",
      "A dívida pode estar prescrita pelo tempo de cobranca?",
      "O contrato ou título possui cláusulas abusivas?",
      "Houve bloqueio de conta, salário, aposentadoria ou pensão?",
    ],
    faqs: [
      {
        q: "Excesso de execução pode reduzir a dívida?",
        a: "Sim. Se houver cobranca acima do valor realmente devido, por erros de juros, correção monetaria ou encargos indevidos, o juiz pode reconhecer o excesso e reduzir a dívida.",
      },
      {
        q: "Prescrição da dívida impede a cobrança judicial?",
        a: "Dependendo da natureza do crédito e do prazo legal aplicável, a dívida pode estar prescrita. Nesses casos, o banco pode perder o direito de cobrar judicialmente.",
      },
      {
        q: "Posso questionar o contrato usado na execução?",
        a: "Sim. Se o título ou contrato tiver nulidades ou cláusulas abusivas, é possível discutir a validade da base da execução.",
      },
      {
        q: "Como funciona a proteção contra penhora de bens e contas?",
        a: "Em muitos casos, é possível pedir o desbloqueio de contas e proteger bens essenciais à subsistência. Também há limites para penhora sobre salário, aposentadoria e pensão de valor mínimo.",
      },
    ],
  },
  {
    slug: "outros", value: "OUTROS", label: "Outras Áreas", icon: "MoreHorizontal",
    headline: "Outras Áreas do Direito - Encontre orientação",
    description: "Sua questão jurídica não se encaixa nas catégorias principais? Sem problema. Envie seu caso e direcionaremos para o profissional mais adequado.",
    examples: [
      "Direito administrativo",
      "Direito tributário",
      "Direito ambiental",
      "Direito digital e internet",
      "Direito de saúde e planos e SUS",
      "Direito militar",
      "Direito bancário",
    ],
    checklist: [
      "Descreva seu caso com o máximo de detalhes",
      "Informe a área que mais se aproxima",
      "Reúna documentos relacionados",
    ],
    faqs: [
      { q: "Como saber qual área do direito meu caso se encaixa?", a: "Não se preocupe. Ao descrever seu caso, nossa equipe direcionará para o profissional mais adequado, mesmo que você não saiba a área específica." },
    ],
  },
];

export function generatéStaticParams() {
  return areasData.map((area) => ({ slug: area.slug }));
}

export function generatéMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const area = areasData.find((a) => a.slug === slug);
    if (!area) return { title: "Área não encontrada" };
    return {
      title: `${area.label} - Orientação Jurídica Especializada`,
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
          <h2 className="text-2xl font-bold">Exemplos de casos que aténdemos</h2>
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
          <h2 className="text-2xl font-bold">Perguntas rápidas para avaliar seu caso</h2>
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
            Envie agora e receba orientação de um advogado especialista
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


