import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/ui/material-icon";
import { WhatsAppIcon } from "@/components/ui/whatsapp-icon";
import { buildWhatsAppUrl } from "@/lib/public-env";

// Static blog posts for MVP
const posts: Record<string, { title: string; area: string; date: string; content: string }> = {
  "como-funciona-processo-trabalhista": {
    title: "Como funciona um processo trabalhista?",
    area: "Trabalhista",
    date: "2026-02-15",
    content: `
## O que � uma reclama��o trabalhista?

A reclama��o trabalhista � a a��o judicial movida pelo trabalhador (ou ex-trabalhador) contra o empregador para reivindicar direitos previstos na CLT e na Constitui��o Federal.

## Quando posso entrar com uma a��o?

Voc� tem at� **2 anos** ap�s a sa�da do emprego para ajuizar a reclama��o, podendo reclamar direitos dos �ltimos **5 anos** de trabalho.

## Quais documentos s�o necess�rios?

- Carteira de Trabalho (CTPS)
- Contracheques / holerites
- Contrato de trabalho
- Termo de rescis�o (TRCT)
- Comprovantes de dep�sito de FGTS
- Qualquer documento que comprove irregularidades

## Etapas do processo

1. **Peti��o inicial**: o advogado prepara e protocola a reclama��o
2. **Audi�ncia de concilia��o**: tentativa de acordo entre as partes
3. **Audi�ncia de instru��o**: oitiva de testemunhas e an�lise de provas
4. **Senten�a**: o juiz decide sobre cada pedido
5. **Recursos**: possibilidade de recurso para inst�ncias superiores
6. **Execu��o**: cobran�a dos valores devidos

## Preciso de advogado?

Embora n�o seja obrigat�rio no primeiro grau da Justi�a do Trabalho, � **altamente recomendado** ter um advogado especializado para garantir que todos os seus direitos sejam corretamente pleiteados.
    `,
  },
  "beneficio-inss-negado-o-que-fazer": {
    title: "Benef�cio do INSS negado: o que fazer?",
    area: "Previdenci�rio",
    date: "2026-02-10",
    content: `
## Meu benef�cio foi negado. E agora?

� muito comum que o INSS negue benef�cios como aposentadoria, aux�lio-doen�a e BPC/LOAS. Mas isso n�o significa que voc� n�o tem direito.

## Principais motivos de negativa

- Falta de tempo de contribui��o
- Car�ncia n�o cumprida
- Laudo m�dico insuficiente (no caso de aux�lio-doen�a)
- Renda familiar acima do limite (BPC/LOAS)

## O que fazer ap�s a negativa?

### 1. Recurso Administrativo
Voc� pode recorrer ao **Conselho de Recursos da Previd�ncia Social (CRPS)** em at� 30 dias ap�s a negativa.

### 2. A��o Judicial
Se o recurso administrativo for negado, � poss�vel entrar com a��o judicial. Em muitos casos, a Justi�a reconhece o direito mesmo quando o INSS nega.

### 3. Novo requerimento
Se surgirem novos documentos ou se sua situa��o mudar, voc� pode fazer um novo pedido.

## Documentos importantes

- Carta de indeferimento do INSS
- CNIS (Cadastro Nacional de Informa��es Sociais)
- Laudos m�dicos recentes
- Carteira de trabalho
- Comprovantes de contribui��o
    `,
  },
  "direitos-consumidor-compra-online": {
    title: "Seus direitos nas compras online",
    area: "Consumidor",
    date: "2026-02-05",
    content: `
## Direito de arrependimento

Nas compras realizadas fora do estabelecimento comercial (internet, telefone, cat�logo), o consumidor tem **7 dias corridos** para desistir da compra, sem precisar justificar.

## Produto com defeito

Se o produto apresentar defeito, o fornecedor tem **30 dias** (para produtos n�o dur�veis) ou **90 dias** (para dur�veis) para resolver o problema.

## O que fazer em caso de problemas?

1. **Registre tudo**: prints de tela, e-mails, protocolos
2. **Entre em contato com a empresa**: tente resolver diretamente
3. **Registre reclama��o no Procon ou consumidor.gov.br**
4. **Procure um advogado especializado** se n�o resolver

## Seus direitos incluem

- Troca do produto
- Devolu��o do valor pago
- Abatimento proporcional do pre�o
- Indeniza��o por danos morais (quando cab�vel)
    `,
  },
  "plano-saude-negou-cirurgia": {
    title: "Plano de sa�de negou sua cirurgia? Conhe�a seus direitos",
    area: "Sa�de",
    date: "2026-01-28",
    content: `
## A negativa � abusiva?

Em muitos casos, sim. A Justi�a brasileira tem entendimento consolidado de que o plano de sa�de **n�o pode negar** procedimentos prescritos pelo m�dico assistente quando h� cobertura contratual para a doen�a.

## Situa��es comuns de negativa abusiva

- Cirurgia prescrita pelo m�dico negada pelo plano
- Interna��o em UTI negada
- Medicamentos de quimioterapia n�o cobertos
- Tratamentos considerados "experimentais" pelo plano

## O que fazer?

1. **Solicite a negativa por escrito** (protocolo)
2. **Pe�a o CID** (C�digo Internacional de Doen�as) ao seu m�dico
3. **Re�na laudos e exames** que justifiquem o procedimento
4. **Procure um advogado especializado** para a��o judicial com pedido de urg�ncia

## Tutela de urg�ncia

Em casos emergenciais, � poss�vel obter uma **decis�o liminar** (em poucas horas ou dias) obrigando o plano a autorizar o procedimento.
    `,
  },
};

export function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const post = posts[slug];
    if (!post) return { title: "Post n�o encontrado" };
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
          <MaterialIcon name="arrow_back" size={16} />
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
          <h3 className="text-xl font-bold text-white">Precisa de orienta��o sobre {post.area}?</h3>
          <p className="mt-2 text-white/80">Envie seu caso ou fale diretamente no WhatsApp</p>
          <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button variant="secondary" asChild>
              <Link href="/enviar-caso">
                <MaterialIcon name="send" size={16} />
                Enviar meu caso
              </Link>
            </Button>
            <Button variant="whatsapp" asChild>
              <a href={buildWhatsAppUrl()} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="h-4 w-4" />
                Falar no WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
