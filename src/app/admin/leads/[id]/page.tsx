"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Lead {
  id: string;
  nome: string;
  whatsapp: string;
  email: string | null;
  cidade: string;
  uf: string;
  areaDireito: string;
  urgencia: string;
  descricao: string;
  temDocumentos: boolean;
  possuiAdvogado: boolean;
  processoEmAndamento: boolean;
  melhorHorario: string | null;
  status: string;
  qualidade: string | null;
  observacoesAdmin: string | null;
  consentimentoLGPD: boolean;
  consentimentoWhatsApp: boolean;
  canalOrigem: string;
  utmSource: string | null;
  utmMedium: string | null;
  utmCampaign: string | null;
  criadoEm: string;
  advogado: {
    id: string;
    nome: string;
    email: string;
    oabNumero: string;
    oabUf: string;
  } | null;
}

const statusActions = [
  { status: "RETIDO", label: "Reter (uso interno)", variant: "secondary" as const },
  { status: "A_VENDA", label: "Colocar � venda", variant: "default" as const },
  { status: "BLOQUEADO", label: "Bloquear", variant: "destructive" as const },
];

export default function AdminLeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);
  const [qualidade, setQualidade] = useState("");
  const [observacoes, setObservacoes] = useState("");

  useEffect(() => {
    fetch(`/api/admin/leads/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
        setLead(data);
        setQualidade(data.qualidade || "");
        setObservacoes(data.observacoesAdmin || "");
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  async function handleStatusChange(newStatus: string) {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/admin/leads/${params.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status: newStatus,
          qualidade: qualidade || undefined,
          observacoesAdmin: observacoes || undefined,
        }),
      });
      if (res.ok) {
        const updated = await res.json();
        setLead((prev) => (prev ? { ...prev, ...updated } : null));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setActionLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!lead) return <p>Lead n�o encontrado</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <MaterialIcon name="arrow_back" size={20} />
        </Button>
        <h1 className="text-2xl font-bold">Lead: {lead.nome}</h1>
        <Badge variant={lead.status === "BLOQUEADO" ? "destructive" : lead.status === "A_VENDA" ? "success" : "secondary"}>
          {lead.status.replace(/_/g, " ")}
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados do Lead</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-2">
                <MaterialIcon name="person" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="font-medium">{lead.nome}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="phone" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{lead.whatsapp}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="mail" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">E-mail</p>
                  <p className="font-medium">{lead.email || "�"}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="location_on" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Localiza��o</p>
                  <p className="font-medium">{lead.cidade}/{lead.uf}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="description" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">�rea</p>
                  <p className="font-medium">{lead.areaDireito.replace(/_/g, " ")}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MaterialIcon name="schedule" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Urg�ncia</p>
                  <p className="font-medium">{lead.urgencia}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Descri��o do Caso</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="whitespace-pre-wrap text-sm">{lead.descricao}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {lead.temDocumentos && <Badge variant="outline">Possui documentos</Badge>}
                {lead.possuiAdvogado && <Badge variant="destructive">J� possui advogado</Badge>}
                {lead.processoEmAndamento && <Badge variant="destructive">Processo em andamento</Badge>}
                {lead.melhorHorario && <Badge variant="outline">Hor�rio: {lead.melhorHorario}</Badge>}
              </div>
            </CardContent>
          </Card>

          {/* UTM / Origin */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Origem / Rastreamento</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
              <div><p className="text-xs text-muted-foreground">Canal</p><p>{lead.canalOrigem}</p></div>
              <div><p className="text-xs text-muted-foreground">UTM Source</p><p>{lead.utmSource || "�"}</p></div>
              <div><p className="text-xs text-muted-foreground">UTM Medium</p><p>{lead.utmMedium || "�"}</p></div>
              <div><p className="text-xs text-muted-foreground">UTM Campaign</p><p>{lead.utmCampaign || "�"}</p></div>
              <div><p className="text-xs text-muted-foreground">Criado em</p><p>{new Date(lead.criadoEm).toLocaleString("pt-BR")}</p></div>
              <div><p className="text-xs text-muted-foreground">LGPD</p><p>{lead.consentimentoLGPD ? "Sim" : "N�o"}</p></div>
            </CardContent>
          </Card>
        </div>

        {/* Actions sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <MaterialIcon name="shield" size={16} />
                A��es de Triagem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1.5">
                <Label>Qualidade</Label>
                <select
                  value={qualidade}
                  onChange={(e) => setQualidade(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">N�o classificado</option>
                  <option value="QUENTE">Quente</option>
                  <option value="MORNO">Morno</option>
                  <option value="FRIO">Frio</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <Label>Observa��es internas</Label>
                <Textarea
                  value={observacoes}
                  onChange={(e) => setObservacoes(e.target.value)}
                  rows={3}
                  placeholder="Notas internas..."
                />
              </div>

              <div className="space-y-2">
                {statusActions.map((action) => (
                  <Button
                    key={action.status}
                    variant={action.variant}
                    className="w-full"
                    disabled={actionLoading || lead.status === action.status}
                    onClick={() => handleStatusChange(action.status)}
                  >
                    {action.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* WhatsApp button */}
          <Card>
            <CardContent className="pt-6">
              <Button variant="whatsapp" className="w-full" asChild>
                <a
                  href={`https://wa.me/${lead.whatsapp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MaterialIcon name="chat" size={16} className="mr-2" />
                  Abrir WhatsApp
                </a>
              </Button>
            </CardContent>
          </Card>

          {/* Buyer info */}
          {lead.advogado && (
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Comprador</CardTitle>
              </CardHeader>
              <CardContent className="text-sm">
                <p className="font-medium">{lead.advogado.nome}</p>
                <p className="text-muted-foreground">{lead.advogado.email}</p>
                <p className="text-muted-foreground">OAB {lead.advogado.oabNumero}/{lead.advogado.oabUf}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
