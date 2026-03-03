import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, MessageCircle, Send } from "lucide-react";

// Static blog posts for MVP
const posts: Record<string, { title: string; area: string; date: string; content: string }> = {
  "como-funciona-processo-trabalhista": {
    title: "Como funciona um processo trabalhista?",
    area: "Trabalhista",
    date: "2026-02-15",
    content: `
## O que é uma reclamação trabalhista?

A reclamação trabalhista é a ação judicial movida pelo trabalhador (ou ex-trabalhador) contra o empregador para reivindicar direitos previstos na CLT e na Constituição Federal.

## Quando posso entrar com uma ação?

Você tem até **2 anos** após a saída do emprego para ajuizar a reclamação, podendo reclamar direitos dos últimos **5 anos** de trabalho.

## Quais documentos são necessários?

- Carteira de Trabalho (CTPS)
- Contracheques / holerites
- Contrato de trabalho
- Termo de rescisão (TRCT)
- Comprovantes de depósito de FGTS
- Qualquer documento que comprove irregularidades

## Etapas do processo

1. **Petição inicial**: o advogado prepara e protocola a reclamação
2. **Audiência de conciliação**: tentativa de acordo entre as partes
3. **Audiência de instrução**: oitiva de testemunhas e análise de provas
4. **Sentença**: o juiz decide sobre cada pedido
5. **Recursos**: possibilidade de recurso para instâncias superiores
6. **Execução**: cobrança dos valores devidos

## Preciso de advogado?

Embora não seja obrigatório no primeiro grau da Justiça do Trabalho, é **altamente recomendado** ter um advogado especializado para garantir que todos os seus direitos sejam corretamente pleiteados.
    `,
  },
  "beneficio-inss-negado-o-que-fazer": {
    title: "Benefício do INSS negado: o que fazer?",
    area: "Previdenciário",
    date: "2026-02-10",
    content: `
## Meu benefício foi negado. E agora?

É muito comum que o INSS negue benefícios como aposentadoria, auxílio-doença e BPC/LOAS. Mas isso não significa que você não tem direito.

## Principais motivos de negativa

- Falta de tempo de contribuição
- Carência não cumprida
- Laudo médico insuficiente (no caso de auxílio-doença)
- Renda familiar acima do limite (BPC/LOAS)

## O que fazer após a negativa?

### 1. Recurso Administrativo
Você pode recorrer ao **Conselho de Recursos da Previdência Social (CRPS)** em até 30 dias após a negativa.

### 2. Ação Judicial
Se o recurso administrativo for negado, é possível entrar com ação judicial. Em muitos casos, a Justiça reconhece o direito mesmo quando o INSS nega.

### 3. Novo requerimento
Se surgirem novos documentos ou se sua situação mudar, você pode fazer um novo pedido.

## Documentos importantes

- Carta de indeferimento do INSS
- CNIS (Cadastro Nacional de Informações Sociais)
- Laudos médicos recentes
- Carteira de trabalho
- Comprovantes de contribuição
    `,
  },
  "direitos-consumidor-compra-online": {
    title: "Seus direitos nas compras online",
    area: "Consumidor",
    date: "2026-02-05",
    content: `
## Direito de arrependimento

Nas compras realizadas fora do estabelecimento comercial (internet, telefone, catálogo), o consumidor tem **7 dias corridos** para desistir da compra, sem precisar justificar.

## Produto com defeito

Se o produto apresentar defeito, o fornecedor tem **30 dias** (para produtos não duráveis) ou **90 dias** (para duráveis) para resolver o problema.

## O que fazer em caso de problemas?

1. **Registre tudo**: prints de tela, e-mails, protocolos
2. **Entre em contato com a empresa**: tente resolver diretamente
3. **Registre reclamação no Procon ou consumidor.gov.br**
4. **Procure um advogado especializado** se não resolver

## Seus direitos incluem

- Troca do produto
- Devolução do valor pago
- Abatimento proporcional do preço
- Indenização por danos morais (quando cabível)
    `,
  },
  "plano-saude-negou-cirurgia": {
    title: "Plano de saúde negou sua cirurgia? Conheça seus direitos",
    area: "Saúde",
    date: "2026-01-28",
    content: `
## A negativa é abusiva?

Em muitos casos, sim. A Justiça brasileira tem entendimento consolidado de que o plano de saúde **não pode negar** procedimentos prescritos pelo médico assistente quando há cobertura contratual para a doença.

## Situações comuns de negativa abusiva

- Cirurgia prescrita pelo médico negada pelo plano
- Internação em UTI negada
- Medicamentos de quimioterapia não cobertos
- Tratamentos considerados "experimentais" pelo plano

## O que fazer?

1. **Solicite a negativa por escrito** (protocolo)
2. **Peça o CID** (Código Internacional de Doenças) ao seu médico
3. **Reúna laudos e exames** que justifiquem o procedimento
4. **Procure um advogado especializado** para ação judicial com pedido de urgência

## Tutela de urgência

Em casos emergenciais, é possível obter uma **decisão liminar** (em poucas horas ou dias) obrigando o plano a autorizar o procedimento.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts[slug];
    if (!post) return { title: "Post não encontrado" };
    return { title: post.title, description: post.content.slice(0, 160) };
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <section className="py-12 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Voltar ao Blog
        </Link>

        <div className="flex items-center gap-2 mb-4">
          <Badge variant="secondary">{post.area}</Badge>
          <span className="text-sm text-muted-foreground">
            {new Date(post.date).toLocaleDateString("pt-BR")}
          </span>
        </div>

        <h1 className="text-3xl font-extrabold sm:text-4xl">{post.title}</h1>

        <div className="mt-8 prose prose-lg max-w-none" dangerouslySetInnerHTML={{
          __html: post.content
            .replace(/^## (.*$)/gm, '<h2 class="text-xl font-bold mt-8 mb-3">$1</h2>')
            .replace(/^### (.*$)/gm, '<h3 class="text-lg font-semibold mt-6 mb-2">$1</h3>')
            .replace(/^\- (.*$)/gm, '<li class="ml-4 list-disc text-muted-foreground">$1</li>')
            .replace(/^\d+\. \*\*(.*?)\*\*: (.*$)/gm, '<li class="ml-4 list-decimal"><strong>$1:</strong> $2</li>')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\n\n/g, '<br/><br/>')
        }} />

        {/* CTA Banner */}
        <div className="mt-12 rounded-xl bg-primary p-8 text-center">
          <h3 className="text-xl font-bold text-white">Precisa de orientação sobre {post.area}?</h3>
          <p className="mt-2 text-indigo-100">Envie seu caso ou fale diretamente no WhatsApp</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="secondary" asChild>
              <Link href="/enviar-caso">
                <Send className="h-4 w-4" />
                Enviar meu caso
              </Link>
            </Button>
            <Button variant="whatsapp" asChild>
              <a href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
