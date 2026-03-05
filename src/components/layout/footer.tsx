import Image from "next/image";
import Link from "next/link";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-primary/5">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <Image src="/imagens/logo.svg" alt="Conect Juris" width={160} height={40} className="h-9 w-auto" />
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Plataforma tecnológica que organiza informações e direciona demandas jurídicas para advogados parceiros em todo o Brasil.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Plataforma</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/quem-somos" className="text-sm text-muted-foreground hover:text-foreground">Quem Somos</Link></li>
              <li><Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-foreground">Como Funciona</Link></li>
              <li><Link href="/areas" className="text-sm text-muted-foreground hover:text-foreground">Áreas de Atuação</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Para Advogados</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/advogado-parceiro" className="text-sm text-muted-foreground hover:text-foreground">Seja Parceiro</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Acessar Portal</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
              <li><Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t pt-8">
          <div className="flex items-start gap-3 rounded-lg bg-secondary/10 border border-secondary/25 p-4">
            <Scale className="h-5 w-5 text-secondary mt-0.5 shrink-0" />
            <p className="text-xs text-secondary">
              <strong>Aviso Importante:</strong> A plataforma Conect Juris atua como intermediadora tecnológica e não presta diretamente serviços advocatícios. A responsabilidade técnica é do advogado contratado. Nenhum resultado é garantido. Não atendemos casos com advogado constituído ou processo em curso.
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Conect Juris. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

