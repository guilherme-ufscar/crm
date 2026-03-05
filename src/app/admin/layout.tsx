"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { MaterialIcon } from "@/components/ui/material-icon";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/leads", label: "Leads", icon: "inbox" },
  { href: "/admin/advogados", label: "Advogados", icon: "group" },
  { href: "/admin/vendas", label: "Vendas", icon: "point_of_sale" },
  { href: "/admin/pacotes", label: "Pacotes", icon: "inventory_2" },
  { href: "/admin/relatorios", label: "Relatórios", icon: "bar_chart" },
  { href: "/admin/logs", label: "Logs de Auditoria", icon: "history" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Skip layout for admin login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-primary/5">
      {/* Sidebar overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform bg-secondary text-primary-foreground transition-transform lg:static lg:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/admin" className="flex items-center gap-2">
            <MaterialIcon name="shield" size={24} className="text-primary" />
            <span className="text-lg font-bold">Admin</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <MaterialIcon name="close" size={20} />
          </button>
        </div>

        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-primary-foreground/80 hover:bg-secondary/80 hover:text-primary-foreground"
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
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-primary-foreground/70 hover:bg-secondary/80 hover:text-primary-foreground"
          >
            <MaterialIcon name="logout" size={18} />
            Sair
          </button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center border-b bg-white px-4 lg:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <MaterialIcon name="menu" size={20} />
          </Button>
          <div className="ml-auto text-sm text-muted-foreground">
            Painel Administrativo
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}

