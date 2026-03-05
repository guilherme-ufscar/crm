"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

const navItems = [
  { href: "/portal", label: "Dashboard", icon: "dashboard" },
  { href: "/portal/leads", label: "Leads Disponíveis", icon: "search" },
  { href: "/portal/meus-leads", label: "Meus Leads", icon: "work" },
  { href: "/portal/pacotes", label: "Pacotes", icon: "inventory_2" },
  { href: "/portal/creditos", label: "Créditos", icon: "credit_card" },
  { href: "/portal/conta", label: "Minha Conta", icon: "person" },
];

export default function PortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-primary/5">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-white border-r transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-16 items-center justify-between border-b px-4">
          <Link href="/portal" className="flex items-center gap-2 text-primary">
            <Image src="/imagens/logo.svg" alt="Conect Juris" width={132} height={36} className="h-8 w-auto" />
            <span className="text-lg font-bold">Portal</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <MaterialIcon name="close" size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = item.href === "/portal" ? pathname === "/portal" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                <MaterialIcon name={item.icon} size={18} />
                {item.label}
                {isActive && <MaterialIcon name="chevron_right" size={18} className="ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-0 right-0 px-3">
          <div className="mb-3 rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">Logado como</p>
            <p className="text-sm font-medium truncate">{session?.user?.name || "Advogado"}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <MaterialIcon name="logout" size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center border-b bg-white px-4 lg:px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
            <MaterialIcon name="menu" size={20} />
          </Button>
          <div className="ml-auto">
            <Link href="/portal/pacotes">
              <Button size="sm" variant="default">
                <MaterialIcon name="inventory_2" size={16} className="mr-1" />
                Comprar créditos
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

