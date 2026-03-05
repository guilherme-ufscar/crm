"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  areaDireito: string;
  cidade: string;
  uf: string;
  urgencia: string;
  status: string;
  qualidade: string | null;
  criadoEm: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

const statusLabels: Record<string, string> = {
  NOVO: "Novo", RETIDO: "Retido", A_VENDA: "� venda",
  VENDIDO: "Vendido", BLOQUEADO: "Bloqueado",
};

const statusColors: Record<string, string> = {
  NOVO: "default", RETIDO: "secondary", A_VENDA: "success",
  VENDIDO: "outline", BLOQUEADO: "destructive",
};

const urgenciaLabels: Record<string, string> = {
  URGENTE: "Urgente", ALTA: "Alta", MEDIA: "M�dia", BAIXA: "Baixa",
};

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [areaFilter, setAreaFilter] = useState("");

  const fetchLeads = useCallback(async (page = 1) => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), limit: "20" });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (areaFilter) params.set("area", areaFilter);

    try {
      const res = await fetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads);
      setPagination(data.pagination);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, areaFilter]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Badge variant="secondary">{pagination.total} total</Badge>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-wrap items-center gap-3 py-4">
          <div className="relative flex-1 min-w-[200px]">
            <MaterialIcon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, e-mail, telefone..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Todos os status</option>
            <option value="NOVO">Novo</option>
            <option value="RETIDO">Retido</option>
            <option value="A_VENDA">� venda</option>
            <option value="VENDIDO">Vendido</option>
            <option value="BLOQUEADO">Bloqueado</option>
          </select>
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            className="h-10 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">Todas as �reas</option>
            <option value="TRABALHISTA">Trabalhista</option>
            <option value="PREVIDENCIARIO">Previdenci�rio</option>
            <option value="CONSUMIDOR">Consumidor</option>
            <option value="FAMILIA">Fam�lia</option>
            <option value="CRIMINAL">Criminal</option>
            <option value="IMOVEIS">Im�veis</option>
            <option value="EMPRESARIAL">Empresarial</option>
            <option value="OUTROS">Outros</option>
          </select>
          <Button variant="outline" size="sm" onClick={() => fetchLeads()}>
            <MaterialIcon name="filter_alt" size={16} className="mr-1" />
            Filtrar
          </Button>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : leads.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Nenhum lead encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Nome</th>
                    <th className="px-4 py-3 font-medium">WhatsApp</th>
                    <th className="px-4 py-3 font-medium">�rea</th>
                    <th className="px-4 py-3 font-medium">Local</th>
                    <th className="px-4 py-3 font-medium">Urg�ncia</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Data</th>
                    <th className="px-4 py-3 font-medium">A��o</th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 font-medium">{lead.nome}</td>
                      <td className="px-4 py-3">{lead.whatsapp}</td>
                      <td className="px-4 py-3">{lead.areaDireito.replace(/_/g, " ")}</td>
                      <td className="px-4 py-3">{lead.cidade}/{lead.uf}</td>
                      <td className="px-4 py-3">
                        <Badge variant={lead.urgencia === "URGENTE" ? "destructive" : "outline"}>
                          {urgenciaLabels[lead.urgencia] || lead.urgencia}
                        </Badge>
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant={statusColors[lead.status] as "default" | "secondary" | "destructive" | "outline" | "success"}>
                          {statusLabels[lead.status] || lead.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(lead.criadoEm).toLocaleDateString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/leads/${lead.id}`}>Detalhar</Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page <= 1}
            onClick={() => fetchLeads(pagination.page - 1)}
          >
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">
            P�gina {pagination.page} de {pagination.totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={pagination.page >= pagination.totalPages}
            onClick={() => fetchLeads(pagination.page + 1)}
          >
            Pr�xima
          </Button>
        </div>
      )}
    </div>
  );
}
