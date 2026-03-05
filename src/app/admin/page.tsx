"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/utils";

interface DashboardData {
  stats: {
    totalLeads: number;
    leadsNovos: number;
    leadsRetidos: number;
    leadsAVenda: number;
    leadsVendidos: number;
    leadsBloqueados: number;
    totalAdvogados: number;
    advogadosAtivos: number;
    receitaTotal: number;
    leadsHoje: number;
  };
  leadsPorArea: { area: string; count: number }[];
  recentLeads: {
    id: string;
    nome: string;
    areaDireito: string;
    cidade: string;
    uf: string;
    status: string;
    qualidade: string | null;
    criadoEm: string;
  }[];
}

const statusLabels: Record<string, string> = {
  NOVO: "Novo",
  RETIDO: "Retido",
  A_VENDA: "À venda",
  VENDIDO: "Vendido",
  BLOQUEADO: "Bloqueado",
};

const statusColors: Record<string, string> = {
  NOVO: "default",
  RETIDO: "secondary",
  A_VENDA: "success",
  VENDIDO: "default",
  BLOQUEADO: "destructive",
};

export default function AdminDashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
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

  if (!data) return <p>Erro ao carregar dados</p>;

  const statCards = [
    { label: "Leads hoje", value: data.stats.leadsHoje, icon: "schedule", color: "text-primary" },
    { label: "Novos (triagem)", value: data.stats.leadsNovos, icon: "inbox", color: "text-orange-600" },
    { label: "À venda", value: data.stats.leadsAVenda, icon: "shopping_cart", color: "text-primary" },
    { label: "Vendidos", value: data.stats.leadsVendidos, icon: "trending_up", color: "text-secondary" },
    { label: "Bloqueados", value: data.stats.leadsBloqueados, icon: "block", color: "text-secondary" },
    { label: "Advogados ativos", value: data.stats.advogadosAtivos, icon: "group", color: "text-secondary" },
    { label: "Receita total", value: formatCurrency(data.stats.receitaTotal), icon: "attach_money", color: "text-primary" },
    { label: "Total de leads", value: data.stats.totalLeads, icon: "info", color: "text-secondary" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {statCards.map((card) => (
          <Card key={card.label}>
            <CardContent className="flex items-center gap-3 py-4">
              <div className={`rounded-lg bg-muted p-2 ${card.color}`}>
                <MaterialIcon name={card.icon} size={20} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{card.label}</p>
                <p className="text-lg font-bold">{card.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Leads by area */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Leads por Área</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {data.leadsPorArea.map((item) => (
              <div key={item.area} className="rounded-lg border p-3 text-center">
                <p className="text-xs text-muted-foreground">{item.area.replace(/_/g, " ")}</p>
                <p className="text-xl font-bold">{item.count}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent leads */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Leads Recentes</CardTitle>
          <Link href="/admin/leads" className="text-sm font-medium text-primary hover:underline">
            Ver todos →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 font-medium">Nome</th>
                  <th className="pb-2 font-medium">Área</th>
                  <th className="pb-2 font-medium">Local</th>
                  <th className="pb-2 font-medium">Status</th>
                  <th className="pb-2 font-medium">Data</th>
                </tr>
              </thead>
              <tbody>
                {data.recentLeads.map((lead) => (
                  <tr key={lead.id} className="border-b last:border-0">
                    <td className="py-2">
                      <Link href={`/admin/leads/${lead.id}`} className="font-medium hover:text-primary">
                        {lead.nome}
                      </Link>
                    </td>
                    <td className="py-2">{lead.areaDireito.replace(/_/g, " ")}</td>
                    <td className="py-2">{lead.cidade}/{lead.uf}</td>
                    <td className="py-2">
                      <Badge variant={statusColors[lead.status] as "default" | "secondary" | "destructive" | "outline" | "success"}>
                        {statusLabels[lead.status] || lead.status}
                      </Badge>
                    </td>
                    <td className="py-2 text-muted-foreground">
                      {new Date(lead.criadoEm).toLocaleDateString("pt-BR")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

