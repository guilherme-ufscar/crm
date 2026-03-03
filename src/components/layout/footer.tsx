import Link from "next/link";
import { Scale } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-slate-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-white">J</span>
              </div>
              <span className="text-lg font-bold">JuriLead</span>
            </div>
            <p className="mt-3 text-sm text-muted-foreground">
              Plataforma tecnológica que organiza informações e direciona demandas jurídicas para advogados parceiros em todo o Brasil.
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-sm font-semibold">Plataforma</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/quem-somos" className="text-sm text-muted-foreground hover:text-foreground">Quem Somos</Link></li>
              <li><Link href="/como-funciona" className="text-sm text-muted-foreground hover:text-foreground">Como Funciona</Link></li>
              <li><Link href="/areas" className="text-sm text-muted-foreground hover:text-foreground">Áreas de Atuação</Link></li>
              <li><Link href="/blog" className="text-sm text-muted-foreground hover:text-foreground">Blog</Link></li>
            </ul>
          </div>

          {/* Para Advogados */}
          <div>
            <h3 className="text-sm font-semibold">Para Advogados</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/advogado-parceiro" className="text-sm text-muted-foreground hover:text-foreground">Seja Parceiro</Link></li>
              <li><Link href="/login" className="text-sm text-muted-foreground hover:text-foreground">Acessar Portal</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold">Legal</h3>
            <ul className="mt-3 space-y-2">
              <li><Link href="/termos" className="text-sm text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
              <li><Link href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground">Política de Privacidade</Link></li>
              <li><Link href="/contato" className="text-sm text-muted-foreground hover:text-foreground">Contato</Link></li>
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-10 border-t pt-8">
          <div className="flex items-start gap-3 rounded-lg bg-amber-50 border border-amber-200 p-4">
            <Scale className="h-5 w-5 text-amber-600 mt-0.5 shrink-0" />
            <p className="text-xs text-amber-800">
              <strong>Aviso Importante:</strong> A plataforma JuriLead atua como intermediadora tecnológica e não presta diretamente serviços advocatícios. A responsabilidade técnica é do advogado contratado. Nenhum resultado é garantido. Não atendemos casos com advogado constituído ou processo em curso.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} JuriLead. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
