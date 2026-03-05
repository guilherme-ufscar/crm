"use client";

import { useEffect, useState, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { MaterialIcon } from "@/components/ui/material-icon";
import { formatCurrency } from "@/lib/utils";

interface Advogado {
    id: string;
    nome: string;
    email: string;
    saldoCreditos: number;
}

interface Venda {
    id: string;
    criadoEm: string;
    valorCentavos: number;
    creditosComprados: number;
    status: string;
    advogado: { id: string; nome: string; email: string };
}

export default function AdminVendasPage() {
    const [advogados, setAdvogados] = useState<Advogado[]>([]);
    const [vendas, setVendas] = useState<Venda[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [saving, setSaving] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [selectedAdvogado, setSelectedAdvogado] = useState("");
    const [quantidadeLeads, setQuantidadeLeads] = useState("");
    const [valorUnitario, setValorUnitario] = useState("");
    const [searchAdvogado, setSearchAdvogado] = useState("");

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const [advRes, vendasRes] = await Promise.all([
                fetch("/api/admin/advogados?limit=200"),
                fetch("/api/admin/vendas"),
            ]);
            const advData = await advRes.json();
            const vendasData = await vendasRes.json();
            setAdvogados(advData.advogados || []);
            setVendas(vendasData.vendas || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredAdvogados = advogados.filter(
        (a) =>
            a.nome.toLowerCase().includes(searchAdvogado.toLowerCase()) ||
            a.email.toLowerCase().includes(searchAdvogado.toLowerCase())
    );

    const selectedAdvogadoData = advogados.find((a) => a.id === selectedAdvogado);

    const qtd = parseInt(quantidadeLeads) || 0;
    const valorUnit = Math.round(parseFloat(valorUnitario || "0") * 100);
    const valorTotal = qtd * valorUnit;

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (!selectedAdvogado || qtd < 1) {
            setError("Selecione um advogado e informe a quantidade de leads.");
            return;
        }

        setSaving(true);
        setError(null);
        setSuccess(null);

        try {
            const res = await fetch("/api/admin/vendas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    advogadoId: selectedAdvogado,
                    quantidadeLeads: qtd,
                    valorUnitarioCentavos: valorUnit,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error || "Erro ao registrar venda");
            }

            setSuccess(
                `Venda registrada com sucesso! ${data.creditosAdicionados} leads adicionados para ${data.advogadoNome}. Novo saldo: ${data.novoSaldo} créditos.`
            );

            // Reset form
            setSelectedAdvogado("");
            setQuantidadeLeads("");
            setValorUnitario("");
            setSearchAdvogado("");

            // Refresh data
            fetchData();
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao registrar venda");
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Vendas Offline</h1>
                <Button onClick={() => { setShowForm(!showForm); setSuccess(null); setError(null); }}>
                    <MaterialIcon name="add" size={18} className="mr-1" />
                    Nova Venda
                </Button>
            </div>

            {/* Success message */}
            {success && (
                <div className="rounded-lg border border-primary/20 bg-primary/5 p-4 text-sm text-secondary flex items-start gap-3">
                    <MaterialIcon name="check_circle" size={20} className="text-primary mt-0.5 shrink-0" />
                    {success}
                </div>
            )}

            {/* Error message */}
            {error && (
                <div className="rounded-lg border border-secondary/25 bg-secondary/10 p-4 text-sm text-secondary flex items-start gap-3">
                    <MaterialIcon name="error" size={20} className="text-secondary mt-0.5 shrink-0" />
                    {error}
                </div>
            )}

            {/* New sale form */}
            {showForm && (
                <Card>
                    <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                            <MaterialIcon name="point_of_sale" size={20} />
                            Registrar Nova Venda
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Select advogado */}
                            <div className="space-y-2">
                                <Label>Advogado (comprador) *</Label>
                                <div className="relative">
                                    <MaterialIcon
                                        name="search"
                                        size={18}
                                        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <Input
                                        placeholder="Buscar advogado por nome ou email..."
                                        value={searchAdvogado}
                                        onChange={(e) => {
                                            setSearchAdvogado(e.target.value);
                                            if (selectedAdvogado) setSelectedAdvogado("");
                                        }}
                                        className="pl-10"
                                    />
                                </div>

                                {searchAdvogado && !selectedAdvogado && (
                                    <div className="max-h-48 overflow-y-auto rounded-lg border bg-white shadow-md">
                                        {filteredAdvogados.length === 0 ? (
                                            <p className="px-4 py-3 text-sm text-muted-foreground">Nenhum advogado encontrado</p>
                                        ) : (
                                            filteredAdvogados.slice(0, 10).map((adv) => (
                                                <button
                                                    key={adv.id}
                                                    type="button"
                                                    className="flex w-full items-center justify-between px-4 py-2.5 text-sm hover:bg-accent text-left transition-colors"
                                                    onClick={() => {
                                                        setSelectedAdvogado(adv.id);
                                                        setSearchAdvogado(adv.nome);
                                                    }}
                                                >
                                                    <div>
                                                        <p className="font-medium">{adv.nome}</p>
                                                        <p className="text-xs text-muted-foreground">{adv.email}</p>
                                                    </div>
                                                    <Badge variant="outline">{adv.saldoCreditos} créditos</Badge>
                                                </button>
                                            ))
                                        )}
                                    </div>
                                )}

                                {selectedAdvogadoData && (
                                    <div className="flex items-center gap-3 rounded-lg border bg-primary/5 border-primary/20 p-3">
                                        <MaterialIcon name="person" size={20} className="text-primary" />
                                        <div className="flex-1">
                                            <p className="text-sm font-medium text-secondary">{selectedAdvogadoData.nome}</p>
                                            <p className="text-xs text-primary">{selectedAdvogadoData.email} • Saldo atual: {selectedAdvogadoData.saldoCreditos} créditos</p>
                                        </div>
                                        <button
                                            type="button"
                                            className="text-primary hover:text-primary"
                                            onClick={() => { setSelectedAdvogado(""); setSearchAdvogado(""); }}
                                        >
                                            <MaterialIcon name="close" size={18} />
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Quantity and price */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-1.5">
                                    <Label>Quantidade de Leads *</Label>
                                    <Input
                                        type="number"
                                        min="1"
                                        value={quantidadeLeads}
                                        onChange={(e) => setQuantidadeLeads(e.target.value)}
                                        placeholder="Ex: 10"
                                    />
                                </div>
                                <div className="space-y-1.5">
                                    <Label>Valor por lead (R$)</Label>
                                    <Input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        value={valorUnitario}
                                        onChange={(e) => setValorUnitario(e.target.value)}
                                        placeholder="Ex: 50.00"
                                    />
                                </div>
                            </div>

                            {/* Summary */}
                            {qtd > 0 && (
                                <div className="rounded-lg bg-primary/5 p-4 space-y-2">
                                    <h4 className="text-sm font-semibold flex items-center gap-2">
                                        <MaterialIcon name="receipt_long" size={18} />
                                        Resumo da Venda
                                    </h4>
                                    <div className="grid grid-cols-3 gap-4 text-sm">
                                        <div>
                                            <span className="text-muted-foreground">Leads</span>
                                            <p className="font-bold text-lg">{qtd}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Valor/lead</span>
                                            <p className="font-bold text-lg">{formatCurrency(valorUnit)}</p>
                                        </div>
                                        <div>
                                            <span className="text-muted-foreground">Total</span>
                                            <p className="font-bold text-lg text-primary">{formatCurrency(valorTotal)}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex gap-3">
                                <Button type="submit" disabled={saving || !selectedAdvogado || qtd < 1}>
                                    {saving ? (
                                        <>
                                            <MaterialIcon name="progress_activity" size={18} className="animate-spin mr-1" />
                                            Registrando...
                                        </>
                                    ) : (
                                        <>
                                            <MaterialIcon name="check" size={18} className="mr-1" />
                                            Registrar Venda
                                        </>
                                    )}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => setShowForm(false)}>
                                    Cancelar
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {/* Sales list */}
            <Card>
                <CardHeader>
                    <CardTitle className="text-base flex items-center gap-2">
                        <MaterialIcon name="history" size={20} />
                        Histórico de Vendas
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                        </div>
                    ) : vendas.length === 0 ? (
                        <div className="py-12 text-center">
                            <MaterialIcon name="receipt" size={40} className="mx-auto text-muted-foreground/50" />
                            <p className="mt-3 text-muted-foreground">Nenhuma venda registrada ainda</p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b bg-muted/50 text-left">
                                        <th className="px-4 py-3 font-medium">Data</th>
                                        <th className="px-4 py-3 font-medium">Advogado</th>
                                        <th className="px-4 py-3 font-medium">Leads</th>
                                        <th className="px-4 py-3 font-medium">Valor</th>
                                        <th className="px-4 py-3 font-medium">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {vendas.map((venda) => (
                                        <tr key={venda.id} className="border-b last:border-0 hover:bg-muted/30">
                                            <td className="px-4 py-3 text-muted-foreground">
                                                {new Date(venda.criadoEm).toLocaleDateString("pt-BR", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </td>
                                            <td className="px-4 py-3">
                                                <p className="font-medium">{venda.advogado.nome}</p>
                                                <p className="text-xs text-muted-foreground">{venda.advogado.email}</p>
                                            </td>
                                            <td className="px-4 py-3 font-medium">{venda.creditosComprados}</td>
                                            <td className="px-4 py-3 font-medium">{formatCurrency(venda.valorCentavos)}</td>
                                            <td className="px-4 py-3">
                                                <Badge variant={venda.status === "PAGO" ? "success" : "secondary"}>
                                                    {venda.status === "PAGO" ? "Pago" : venda.status}
                                                </Badge>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

