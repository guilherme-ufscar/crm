"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { MessageCircle, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  areaDireito: string;
  cidade: string;
  uf: string;
  urgencia: string;
  descricao: string;
  temDocumentos: boolean;
  qualidade: string | null;
  statusAdvogado: string | null;
  vendidoEm: string;
}

export default function PortalMeusLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/portal/meus-leads?page=${page}`);
      const data = await res.json();
      setLeads(data.leads);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Meus Leads</h1>
        <p className="text-muted-foreground">Leads que você adquiriu</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : leads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">Você ainda não adquiriu nenhum lead</p>
            <Button className="mt-4" asChild>
              <Link href="/portal/leads">Ver leads disponíveis</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {leads.map((lead) => (
            <Card key={lead.id} className="hover:shadow-sm transition-shadow">
              <CardContent className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{lead.nome}</h3>
                    <Badge>{lead.areaDireito.replace(/_/g, " ")}</Badge>
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {lead.cidade}/{lead.uf}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {new Date(lead.vendidoEm).toLocaleDateString("pt-BR")}
                    </span>
                  </div>
                  <p className="mt-2 text-sm line-clamp-2">{lead.descricao}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="whatsapp" size="sm" asChild>
                    <a
                      href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="mr-1 h-4 w-4" />
                      WhatsApp
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/portal/meus-leads/${lead.id}`}>Detalhes</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button variant="outline" size="sm" disabled={page <= 1} onClick={() => setPage(page - 1)}>Anterior</Button>
          <span className="text-sm text-muted-foreground">Página {page} de {totalPages}</span>
          <Button variant="outline" size="sm" disabled={page >= totalPages} onClick={() => setPage(page + 1)}>Próxima</Button>
        </div>
      )}
    </div>
  );
}
