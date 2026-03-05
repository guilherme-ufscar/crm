"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface DashboardData {
  advogado: { nome: string; saldoCreditos: number; areasAtuacao: string[] } | null;
  stats: {
    totalLeadsAdquiridos: number;
    leadsDisponiveis: number;
    saldoCreditos: number;
  };
  recentLeads: {
    id: string;
    nome: string;
    areaDireito: string;
    cidade: string;
    uf: string;
    vendidoEm: string;
    statusAdvogado: string | null;
  }[];
}

export default function PortalDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/dashboard")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!data) return <p>Erro ao carregar</p>;

  const stats = [
    { label: "Créditos disponíveis", value: data.stats.saldoCreditos, icon: "credit_card", color: "text-primary", href: "/portal/creditos" },
    { label: "Leads disponíveis", value: data.stats.leadsDisponiveis, icon: "search", color: "text-primary", href: "/portal/leads" },
    { label: "Leads adquiridos", value: data.stats.totalLeadsAdquiridos, icon: "work", color: "text-secondary", href: "/portal/meus-leads" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Olá, {data.advogado?.nome?.split(" ")[0] || "Advogado"}!</h1>
        <p className="text-muted-foreground">Resumo da sua conta</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}>
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="flex items-center gap-4 py-5">
                <div className={`rounded-lg bg-muted p-3 ${s.color}`}>
                  <MaterialIcon name={s.icon} size={24} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {data.stats.saldoCreditos === 0 && (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="flex items-center justify-between py-4">
            <div>
              <p className="font-medium text-orange-800">Você não tem créditos</p>
              <p className="text-sm text-orange-600">Adquira um pacote para começar a receber leads</p>
            </div>
            <Button asChild>
              <Link href="/portal/pacotes">Ver pacotes</Link>
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Recent leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Últimos Leads Adquiridos</CardTitle>
          <Link href="/portal/meus-leads" className="text-sm text-primary hover:underline">Ver todos →</Link>
        </CardHeader>
        <CardContent>
          {data.recentLeads.length === 0 ? (
            <p className="py-4 text-center text-sm text-muted-foreground">
              Nenhum lead adquirido ainda.{" "}
              <Link href="/portal/leads" className="text-primary hover:underline">Ver leads disponíveis →</Link>
            </p>
          ) : (
            <div className="space-y-3">
              {data.recentLeads.map((lead) => (
                <Link
                  key={lead.id}
                  href={`/portal/meus-leads/${lead.id}`}
                  className="flex items-center justify-between rounded-lg border p-3 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <p className="font-medium">{lead.nome}</p>
                    <p className="text-xs text-muted-foreground">
                      {lead.areaDireito.replace(/_/g, " ")} • {lead.cidade}/{lead.uf}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">
                      {new Date(lead.vendidoEm).toLocaleDateString("pt-BR")}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

