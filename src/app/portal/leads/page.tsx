"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Clock, FileText, ShoppingCart, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Lead {
  id: string;
  areaDireito: string;
  cidade: string;
  uf: string;
  urgencia: string;
  descricao: string;
  qualidade: string | null;
  temDocumentos: boolean;
  criadoEm: string;
}

const urgenciaColors: Record<string, string> = {
  URGENTE: "destructive", ALTA: "default", MEDIA: "secondary", BAIXA: "outline",
};

export default function PortalLeadsPage() {
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);
  const [areaFilter, setAreaFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: page.toString() });
    if (areaFilter) params.set("area", areaFilter);

    try {
      const res = await fetch(`/api/portal/leads?${params}`);
      const data = await res.json();
      setLeads(data.leads);
      setTotalPages(data.pagination.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [page, areaFilter]);

  useEffect(() => { fetchLeads(); }, [fetchLeads]);

  async function handleBuy(leadId: string) {
    setBuying(leadId);
    try {
      const res = await fetch(`/api/portal/leads/${leadId}/adquirir`, { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402) {
          alert("Créditos insuficientes. Adquira um pacote.");
          router.push("/portal/pacotes");
          return;
        }
        alert(data.error || "Erro ao adquirir lead");
        return;
      }

      // Open WhatsApp
      if (data.whatsappUrl) {
        window.open(data.whatsappUrl, "_blank");
      }

      router.push("/portal/meus-leads");
    } catch {
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setBuying(null);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Leads Disponíveis</h1>
        <p className="text-muted-foreground">Leads qualificados prontos para aquisição</p>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <select
          value={areaFilter}
          onChange={(e) => { setAreaFilter(e.target.value); setPage(1); }}
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">Todas as áreas</option>
          <option value="TRABALHISTA">Trabalhista</option>
          <option value="PREVIDENCIARIO">Previdenciário</option>
          <option value="CONSUMIDOR">Consumidor</option>
          <option value="FAMILIA">Família</option>
          <option value="CRIMINAL">Criminal</option>
          <option value="IMOVEIS">Imóveis</option>
          <option value="EMPRESARIAL">Empresarial</option>
          <option value="OUTROS">Outros</option>
        </select>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : leads.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <AlertCircle className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Nenhum lead disponível no momento</p>
            <p className="text-sm text-muted-foreground">Novos leads são adicionados diariamente</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => (
            <Card key={lead.id} className="flex flex-col">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <Badge>{lead.areaDireito.replace(/_/g, " ")}</Badge>
                  <Badge variant={urgenciaColors[lead.urgencia] as "destructive" | "default" | "secondary" | "outline"}>
                    {lead.urgencia}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5" />
                  {lead.cidade}/{lead.uf}
                </div>
                <p className="mt-2 flex-1 text-sm">{lead.descricao}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {lead.temDocumentos && (
                    <Badge variant="outline" className="text-xs">
                      <FileText className="mr-1 h-3 w-3" />
                      Documentos
                    </Badge>
                  )}
                  {lead.qualidade && (
                    <Badge variant="outline" className="text-xs">
                      {lead.qualidade}
                    </Badge>
                  )}
                  <Badge variant="outline" className="text-xs">
                    <Clock className="mr-1 h-3 w-3" />
                    {new Date(lead.criadoEm).toLocaleDateString("pt-BR")}
                  </Badge>
                </div>
                <Button
                  className="mt-4 w-full"
                  disabled={buying === lead.id}
                  onClick={() => handleBuy(lead.id)}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  {buying === lead.id ? "Processando..." : "Adquirir (1 crédito)"}
                </Button>
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
