"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
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
  descricao: string;
  temDocumentos: boolean;
  qualidade: string | null;
  statusAdvogado: string | null;
  vendidoEm: string;
  criadoEm: string;
}

export default function PortalLeadDetailPage() {
  const params = useParams();
  const [lead, setLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch from meus-leads and find the specific one
    fetch(`/api/portal/meus-leads?limit=100`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.leads.find((l: Lead) => l.id === params.id);
        setLead(found || null);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!lead) return <p>Lead n�o encontrado</p>;

  const whatsappClean = lead.whatsapp.replace(/\D/g, "");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/portal/meus-leads">
          <Button variant="ghost" size="icon"><MaterialIcon name="arrow_back" size={20} /></Button>
        </Link>
        <h1 className="text-2xl font-bold">{lead.nome}</h1>
        <Badge>{lead.areaDireito.replace(/_/g, " ")}</Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Main */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados de Contato</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <MaterialIcon name="person" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Nome</p>
                  <p className="font-medium">{lead.nome}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MaterialIcon name="phone" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="font-medium">{lead.whatsapp}</p>
                </div>
              </div>
              {lead.email && (
                <div className="flex items-center gap-3">
                  <MaterialIcon name="mail" size={16} className="text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">E-mail</p>
                    <p className="font-medium">{lead.email}</p>
                  </div>
                </div>
              )}
              <div className="flex items-center gap-3">
                <MaterialIcon name="location_on" size={16} className="text-muted-foreground" />
                <div>
                  <p className="text-xs text-muted-foreground">Localiza��o</p>
                  <p className="font-medium">{lead.cidade}/{lead.uf}</p>
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
                <Badge variant="outline">
                  <MaterialIcon name="schedule" size={12} className="mr-1" />
                  Urg�ncia: {lead.urgencia}
                </Badge>
                {lead.temDocumentos && (
                  <Badge variant="outline">
                    <MaterialIcon name="description" size={12} className="mr-1" />
                    Possui documentos
                  </Badge>
                )}
                {lead.qualidade && <Badge variant="outline">Qualidade: {lead.qualidade}</Badge>}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Actions */}
        <div className="space-y-4">
          <Card>
            <CardContent className="pt-6 space-y-3">
              <Button variant="whatsapp" className="w-full" size="lg" asChild>
                <a href={`https://wa.me/${whatsappClean}`} target="_blank" rel="noopener noreferrer">
                  <MaterialIcon name="chat" size={20} className="mr-2" />
                  Abrir WhatsApp
                </a>
              </Button>
              {lead.email && (
                <Button variant="outline" className="w-full" asChild>
                  <a href={`mailto:${lead.email}`}>
                    <MaterialIcon name="mail" size={16} className="mr-2" />
                    Enviar E-mail
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6 text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Adquirido em</span>
                <span>{new Date(lead.vendidoEm).toLocaleDateString("pt-BR")}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Lead criado em</span>
                <span>{new Date(lead.criadoEm).toLocaleDateString("pt-BR")}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
