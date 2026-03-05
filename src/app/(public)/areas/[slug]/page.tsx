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
    headline: "Direito Trabalhista � Proteja seus direitos como trabalhador",
    description: "Se voc� foi demitido injustamente, n�o recebeu suas verbas rescis�rias corretamente, sofre ass�dio no trabalho ou tem qualquer problema na rela��o de emprego, podemos direcionar seu caso para um advogado especialista.",
    examples: [
      "Demiss�o sem justa causa � verbas rescis�rias",
      "Horas extras n�o pagas",
      "Ass�dio moral ou sexual no trabalho",
      "Acidente de trabalho",
      "Desvio ou ac�mulo de fun��o",
      "Reconhecimento de v�nculo empregat�cio",
      "FGTS n�o depositado",
    ],
    checklist: [
      "Voc� trabalhou com carteira assinada?",
      "Recebeu todas as verbas na rescis�o?",
      "Tem contracheques ou comprovantes?",
      "H� testemunhas da situa��o?",
    ],
    faqs: [
      { q: "Qual o prazo para entrar com a��o trabalhista?", a: "Voc� tem at� 2 anos ap�s a sa�da do emprego para ajuizar a a��o, podendo reclamar direitos dos �ltimos 5 anos de trabalho." },
      { q: "Preciso de advogado para reclama��o trabalhista?", a: "Embora n�o seja obrigat�rio no primeiro grau, � altamente recomendado ter um advogado especializado para garantir seus direitos." },
    ],
  },
  {
    slug: "previdenciario", value: "PREVIDENCIARIO", label: "Previdenci�rio (INSS)", icon: "Shield",
    headline: "Direito Previdenci�rio � Garanta seus benef�cios do INSS",
    description: "Se seu benef�cio foi negado pelo INSS, se voc� precisa de aposentadoria, aux�lio-doen�a, BPC/LOAS ou qualquer outro benef�cio previdenci�rio, temos advogados parceiros especializados prontos para ajudar.",
    examples: [
      "Aposentadoria por idade ou tempo de contribui��o",
      "Aux�lio-doen�a negado",
      "BPC/LOAS (Benef�cio de Presta��o Continuada)",
      "Aposentadoria especial",
      "Pens�o por morte",
      "Revis�o de benef�cio",
      "Aux�lio-acidente",
    ],
    checklist: [
      "Voc� j� deu entrada no INSS?",
      "Recebeu carta de indeferimento?",
      "Tem laudos m�dicos recentes?",
      "Possui CNIS ou carteira de trabalho?",
    ],
    faqs: [
      { q: "O INSS negou meu benef�cio, o que fazer?", a: "Voc� pode recorrer administrativamente ou judicialmente. Um advogado previdenciarista pode analisar seu caso e indicar o melhor caminho." },
      { q: "Quanto tempo demora um processo contra o INSS?", a: "Depende do caso, mas a��es judiciais costumam levar de 6 meses a 2 anos em m�dia." },
    ],
  },
  {
    slug: "consumidor", value: "CONSUMIDOR", label: "Consumidor", icon: "ShoppingBag",
    headline: "Direito do Consumidor � Defenda-se contra abusos",
    description: "Cobran�as indevidas, produtos com defeito, propaganda enganosa, negativa��o indevida ou qualquer viola��o dos seus direitos como consumidor. Conectamos voc� ao advogado certo.",
    examples: [
      "Cobran�a indevida ou abusiva",
      "Produto com defeito ou v�cio",
      "Propaganda enganosa",
      "Negativa��o indevida (SPC/Serasa)",
      "Cancelamento de contrato abusivo",
      "Falha na presta��o de servi�o",
    ],
    checklist: [
      "Voc� tem o comprovante de compra/contrato?",
      "J� tentou resolver diretamente com a empresa?",
      "Tem prints ou registros de atendimento?",
      "Foi negativado indevidamente?",
    ],
    faqs: [
      { q: "Posso processar uma empresa por cobran�a indevida?", a: "Sim. O C�digo de Defesa do Consumidor prev� a devolu��o em dobro do valor cobrado indevidamente, al�m de indeniza��o por danos morais quando aplic�vel." },
    ],
  },
  {
    slug: "familia", value: "FAMILIA", label: "Direito de Fam�lia", icon: "Users",
    headline: "Direito de Fam�lia � Resolva quest�es familiares",
    description: "Div�rcio, pens�o aliment�cia, guarda de filhos, invent�rio, uni�o est�vel. Quest�es familiares requerem sensibilidade e conhecimento especializado.",
    examples: [
      "Div�rcio consensual ou litigioso",
      "Pens�o aliment�cia (fixa��o ou revis�o)",
      "Guarda de filhos",
      "Regulamenta��o de visitas",
      "Invent�rio e partilha de bens",
      "Reconhecimento de uni�o est�vel",
    ],
    checklist: [
      "H� acordo entre as partes?",
      "Existem filhos menores?",
      "H� bens a serem partilhados?",
      "Conhece a renda do(a) ex-c�njuge?",
    ],
    faqs: [
      { q: "Quanto tempo demora um div�rcio?", a: "O div�rcio consensual pode ser feito em cart�rio em poucos dias. O litigioso depende da complexidade, podendo levar meses." },
    ],
  },
  {
    slug: "criminal", value: "CRIMINAL", label: "Direito Criminal", icon: "Scale",
    headline: "Direito Criminal � Defesa penal especializada",
    description: "Defesa criminal em processos penais, inqu�ritos policiais, habeas corpus, revis�o criminal. Advogados criminalistas prontos para garantir seus direitos constitucionais.",
    examples: [
      "Defesa em processos criminais",
      "Habeas corpus",
      "Inqu�rito policial",
      "Liberdade provis�ria / fian�a",
      "Revis�o criminal",
      "Execu��o penal e progress�o de regime",
    ],
    checklist: [
      "H� boletim de ocorr�ncia registrado?",
      "Existe inqu�rito ou processo em andamento?",
      "Voc� foi citado ou intimado?",
      "H� testemunhas ou provas a seu favor?",
    ],
    faqs: [
      { q: "Preciso de advogado para depor na delegacia?", a: "Sim. Todo cidad�o tem direito de ser acompanhado por advogado em depoimentos e interrogat�rios. � altamente recomendado." },
    ],
  },
  {
    slug: "imoveis", value: "IMOVEIS", label: "Direito Imobili�rio", icon: "Home",
    headline: "Direito Imobili�rio � Proteja seu patrim�nio",
    description: "Compra e venda de im�veis, problemas com construtoras, loca��o, usucapi�o, regulariza��o de im�veis. Advogados especializados em quest�es imobili�rias.",
    examples: [
      "Compra e venda de im�vel � problemas no contrato",
      "Atraso na entrega do im�vel (construtora)",
      "Usucapi�o",
      "Despejo e cobran�a de alugu�is",
      "Regulariza��o de im�vel",
      "V�cios construtivos",
    ],
    checklist: [
      "Voc� tem o contrato de compra/venda ou loca��o?",
      "H� registro do im�vel em cart�rio?",
      "Existem documentos que comprovem posse?",
      "Houve vistoria ou laudo t�cnico?",
    ],
    faqs: [
      { q: "A construtora atrasou meu im�vel, tenho direito a indeniza��o?", a: "Sim. O atraso na entrega pode gerar indeniza��o por danos materiais e morais, al�m do pagamento de alugu�is pelo per�odo de atraso." },
    ],
  },
  {
    slug: "empresarial", value: "EMPRESARIAL", label: "Direito Empresarial", icon: "Building",
    headline: "Direito Empresarial � Solu��es para o seu neg�cio",
    description: "Abertura e fechamento de empresas, contratos empresariais, recupera��o judicial, disputas societ�rias. Suporte jur�dico para empreendedores e empresas.",
    examples: [
      "Abertura e registro de empresa",
      "Contrato social e altera��es societ�rias",
      "Recupera��o judicial e fal�ncia",
      "Disputas entre s�cios",
      "Contratos comerciais e de presta��o de servi�os",
      "Propriedade intelectual � marcas e patentes",
    ],
    checklist: [
      "Voc� tem contrato social da empresa?",
      "H� disputa entre s�cios?",
      "A empresa est� endividada?",
      "Existem contratos em lit�gio?",
    ],
    faqs: [
      { q: "Posso ser responsabilizado pessoalmente pelas d�vidas da empresa?", a: "Depende do tipo societ�rio e das circunst�ncias. Em empresas limitadas, a responsabilidade � geralmente restrita ao capital social, salvo em casos de fraude ou confus�o patrimonial." },
    ],
  },
  {
    slug: "bancario", value: "BANCARIO", label: "Direito Bancário", icon: "Scale",
    headline: "Direito Bancário - Possibilidades de defesa no processo de execução bancária",
    description: "Existem várias formas de se defender contra uma execução bancária. Um advogado especializado pode avaliar o caso e definir a melhor estratégia para reduzir impactos e proteger seus direitos.",
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
      "A dívida pode estar prescrita pelo tempo de cobrança?",
      "O contrato ou título possui cláusulas abusivas?",
      "Houve bloqueio de conta, salário, aposentadoria ou pensão?",
    ],
    faqs: [
      {
        q: "Excesso de execução pode reduzir a dívida?",
        a: "Sim. Se houver cobrança acima do valor realmente devido, por erros de juros, correção monetária ou encargos indevidos, o juiz pode reconhecer o excesso e reduzir a dívida.",
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
        a: "É possível pedir desbloqueio e proteger bens essenciais à subsistência, além de discutir limites de penhora sobre salário, aposentadoria e pensão de valor mínimo.",
      },
    ],
  },
  {
    slug: "outros", value: "OUTROS", label: "Outras �reas", icon: "MoreHorizontal",
    headline: "Outras �reas do Direito � Encontre orienta��o",
    description: "Sua quest�o jur�dica n�o se encaixa nas categorias principais? Sem problema. Envie seu caso e direcionaremos para o profissional mais adequado.",
    examples: [
      "Direito administrativo",
      "Direito tribut�rio",
      "Direito ambiental",
      "Direito digital e internet",
      "Direito de sa�de � planos e SUS",
      "Direito militar",
      "Direito banc�rio",
    ],
    checklist: [
      "Descreva seu caso com o m�ximo de detalhes",
      "Informe a �rea que mais se aproxima",
      "Re�na documentos relacionados",
    ],
    faqs: [
      { q: "Como saber qual �rea do direito meu caso se encaixa?", a: "N�o se preocupe. Ao descrever seu caso, nossa equipe direcionar� para o profissional mais adequado, mesmo que voc� n�o saiba a �rea espec�fica." },
    ],
  },
];

export function generateStaticParams() {
  return areasData.map((area) => ({ slug: area.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const area = areasData.find((a) => a.slug === slug);
    if (!area) return { title: "�rea n�o encontrada" };
    return {
      title: `${area.label} � Orienta��o Jur�dica Especializada`,
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
          <h2 className="text-2xl font-bold">Perguntas r�pidas para avaliar seu caso</h2>
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
            <h2 className="text-2xl font-bold text-center">Perguntas Frequentes � {area.label}</h2>
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
