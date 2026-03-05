"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Transaction {
  id: string;
  tipo: string;
  quantidade: number;
  descricao: string;
  criadoEm: string;
}

export default function PortalCreditosPage() {
  const [saldo, setSaldo] = useState(0);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/portal/creditos")
      .then((res) => res.json())
      .then((data) => {
        setSaldo(data.saldoCreditos);
        setTransactions(data.transactions);
      })
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

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Créditos</h1>

      <Card className="bg-gradient-to-r from-secondary to-primary text-primary-foreground">
        <CardContent className="flex items-center justify-between py-6">
          <div>
            <p className="text-sm text-primary-foreground/80">Saldo atual</p>
            <p className="text-4xl font-extrabold">{saldo}</p>
            <p className="text-sm text-primary-foreground/80">créditos disponíveis</p>
          </div>
          <MaterialIcon name="credit_card" size={48} className="text-primary-foreground/70" />
        </CardContent>
      </Card>

      <Button asChild>
        <Link href="/portal/pacotes">Comprar mais créditos</Link>
      </Button>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Histórico de Transações</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {transactions.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">Nenhuma transação ainda</p>
          ) : (
            <div className="divide-y">
              {transactions.map((tx) => (
                <div key={tx.id} className="flex items-center justify-between px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-lg p-2 ${tx.quantidade > 0 ? "bg-primary/10 text-primary" : "bg-secondary/10 text-secondary"}`}>
                      {tx.quantidade > 0 ? <MaterialIcon name="south_east" size={16} /> : <MaterialIcon name="north_east" size={16} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{tx.descricao}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.criadoEm).toLocaleString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Badge variant={tx.quantidade > 0 ? "success" : "destructive"}>
                    {tx.quantidade > 0 ? "+" : ""}{tx.quantidade}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

