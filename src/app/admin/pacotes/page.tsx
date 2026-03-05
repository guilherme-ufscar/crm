"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/utils";

interface Pacote {
  id: string;
  nome: string;
  descricao: string | null;
  creditos: number;
  precoCentavos: number;
  ativo: boolean;
}

export default function AdminPacotesPage() {
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ nome: "", descricao: "", creditos: "", preco: "" });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/admin/pacotes")
      .then((res) => res.json())
      .then(setPacotes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    setSaving(true);
    try {
      const res = await fetch("/api/admin/pacotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: form.nome,
          descricao: form.descricao || undefined,
          creditos: parseInt(form.creditos),
          precoCentavos: Math.round(parseFloat(form.preco) * 100),
        }),
      });
      if (res.ok) {
        const created = await res.json();
        setPacotes((prev) => [...prev, created]);
        setShowForm(false);
        setForm({ nome: "", descricao: "", creditos: "", preco: "" });
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Pacotes</h1>
        <Button onClick={() => setShowForm(!showForm)}>
          <MaterialIcon name="add" size={16} className="mr-1" />
          Novo pacote
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Criar pacote</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Nome</Label>
                <Input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} placeholder="Starter" />
              </div>
              <div className="space-y-1.5">
                <Label>Cr�ditos</Label>
                <Input type="number" value={form.creditos} onChange={(e) => setForm({ ...form, creditos: e.target.value })} placeholder="10" />
              </div>
            </div>
            <div className="space-y-1.5">
              <Label>Pre�o (R$)</Label>
              <Input type="number" step="0.01" value={form.preco} onChange={(e) => setForm({ ...form, preco: e.target.value })} placeholder="500.00" />
            </div>
            <div className="space-y-1.5">
              <Label>Descri��o (opcional)</Label>
              <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} />
            </div>
            <Button onClick={handleCreate} disabled={saving}>
              {saving ? "Salvando..." : "Criar"}
            </Button>
          </CardContent>
        </Card>
      )}

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {pacotes.map((p) => (
            <Card key={p.id}>
              <CardContent className="pt-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-bold">{p.nome}</h3>
                  <Badge variant={p.ativo ? "success" : "secondary"}>
                    {p.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </div>
                <p className="mt-1 text-2xl font-extrabold">{formatCurrency(p.precoCentavos)}</p>
                <p className="text-sm text-muted-foreground">
                  {p.creditos} cr�ditos � {formatCurrency(Math.round(p.precoCentavos / p.creditos))}/lead
                </p>
                {p.descricao && <p className="mt-2 text-sm text-muted-foreground">{p.descricao}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
