"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";

interface Pacote {
  id: string;
  nome: string;
  descricao: string | null;
  creditos: number;
  precoCentavos: number;
  ativo: boolean;
}

export default function PortalPacotesPage() {
  const router = useRouter();
  const [pacotes, setPacotes] = useState<Pacote[]>([]);
  const [loading, setLoading] = useState(true);
  const [buying, setBuying] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/pacotes")
      .then((res) => res.json())
      .then((data: Pacote[]) => setPacotes(data.filter((p) => p.ativo)))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleBuy(pacoteId: string) {
    setBuying(pacoteId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pacoteId }),
      });
      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Erro ao criar sessão de pagamento");
      }
    } catch {
      alert("Erro ao processar. Tente novamente.");
    } finally {
      setBuying(null);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Pacotes de Créditos</h1>
        <p className="text-muted-foreground">Escolha o pacote ideal para suas necessidades</p>
      </div>

      {pacotes.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-muted-foreground">Nenhum pacote disponível no momento</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pacotes.map((pacote, idx) => {
            const isPopular = idx === 1;
            return (
              <Card key={pacote.id} className={`relative flex flex-col ${isPopular ? "border-primary shadow-lg ring-2 ring-primary/20" : ""}`}>
                {isPopular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-white">Mais popular</Badge>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle>{pacote.nome}</CardTitle>
                  <div className="mt-2">
                    <span className="text-3xl font-extrabold">{formatCurrency(pacote.precoCentavos)}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {pacote.creditos} leads • {formatCurrency(Math.round(pacote.precoCentavos / pacote.creditos))}/lead
                  </p>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      {pacote.creditos} créditos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Leads exclusivos
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Acesso ao WhatsApp
                    </li>
                  </ul>
                  {pacote.descricao && (
                    <p className="mt-3 text-sm text-muted-foreground">{pacote.descricao}</p>
                  )}
                </CardContent>
                <CardFooter>
                  <Button
                    className="w-full"
                    variant={isPopular ? "default" : "outline"}
                    disabled={buying === pacote.id}
                    onClick={() => handleBuy(pacote.id)}
                  >
                    {buying === pacote.id ? "Processando..." : "Comprar"}
                  </Button>
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
