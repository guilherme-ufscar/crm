"use client";

import { useEffect, useState, useCallback } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface Advogado {
  id: string;
  nome: string;
  email: string;
  telefone: string;
  oabNumero: string;
  oabUf: string;
  areasAtuacao: string[];
  estado: string;
  cidade: string;
  ativo: boolean;
  saldoCreditos: number;
  criadoEm: string;
  _count: { leadsAdquiridos: number };
}

export default function AdminAdvogadosPage() {
  const [advogados, setAdvogados] = useState<Advogado[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchAdvogados = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString(), limit: "20" });
    if (search) params.set("search", search);

    try {
      const res = await fetch(`/api/admin/advogados?${params}`);
      const data = await res.json();
      setAdvogados(data.advogados);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchAdvogados();
  }, [fetchAdvogados]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Advogados Parceiros</h1>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome, e-mail ou OAB..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="pl-9"
        />
      </div>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : advogados.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Nenhum advogado encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Nome</th>
                    <th className="px-4 py-3 font-medium">OAB</th>
                    <th className="px-4 py-3 font-medium">Local</th>
                    <th className="px-4 py-3 font-medium">Créditos</th>
                    <th className="px-4 py-3 font-medium">Leads</th>
                    <th className="px-4 py-3 font-medium">Status</th>
                    <th className="px-4 py-3 font-medium">Cadastro</th>
                  </tr>
                </thead>
                <tbody>
                  {advogados.map((adv) => (
                    <tr key={adv.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3">
                        <p className="font-medium">{adv.nome}</p>
                        <p className="text-xs text-muted-foreground">{adv.email}</p>
                      </td>
                      <td className="px-4 py-3">{adv.oabNumero}/{adv.oabUf}</td>
                      <td className="px-4 py-3">{adv.cidade}/{adv.estado}</td>
                      <td className="px-4 py-3 font-medium">{adv.saldoCreditos}</td>
                      <td className="px-4 py-3">{adv._count.leadsAdquiridos}</td>
                      <td className="px-4 py-3">
                        <Badge variant={adv.ativo ? "success" : "destructive"}>
                          {adv.ativo ? "Ativo" : "Inativo"}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {new Date(adv.criadoEm).toLocaleDateString("pt-BR")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>
            Anterior
          </Button>
          <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
            Próxima
          </Button>
        </div>
      )}
    </div>
  );
}
