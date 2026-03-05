import Link from "next/link";
import { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = {
  title: "Blog — Artigos e Informações Jurídicas",
  description: "Artigos e conteúdo informativo sobre direito trabalhista, previdenciário, do consumidor e mais.",
};

// Static blog posts for MVP (in production, these come from DB)
const posts = [
  {
    slug: "como-funciona-processo-trabalhista",
    title: "Como funciona um processo trabalhista?",
    resumo: "Entenda as etapas de uma reclamação trabalhista, prazos e documentos necessários para defender seus direitos como trabalhador.",
    area: "Trabalhista",
    date: "2026-02-15",
  },
  {
    slug: "beneficio-inss-negado-o-que-fazer",
    title: "Benefício do INSS negado: o que fazer?",
    resumo: "Saiba quais são os próximos passos quando o INSS nega seu pedido de aposentadoria, auxílio-doença ou BPC/LOAS.",
    area: "Previdenciário",
    date: "2026-02-10",
  },
  {
    slug: "direitos-consumidor-compra-online",
    title: "Seus direitos nas compras online",
    resumo: "Conheça seus direitos ao comprar pela internet: arrependimento, troca, devolução e o que fazer em caso de problemas.",
    area: "Consumidor",
    date: "2026-02-05",
  },
  {
    slug: "plano-saude-negou-cirurgia",
    title: "Plano de saúde negou sua cirurgia? Conheça seus direitos",
    resumo: "Entenda quando a negativa do plano de saúde é abusiva e como agir judicialmente para garantir seu tratamento.",
    area: "Saúde",
    date: "2026-01-28",
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Blog</h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Artigos e informações para você conhecer seus direitos
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="h-full hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="pt-6">
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary">{post.area}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {new Date(post.date).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                    <h2 className="mt-3 font-semibold text-lg line-clamp-2">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{post.resumo}</p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

