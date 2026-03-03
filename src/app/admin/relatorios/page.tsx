"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminRelatoriosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Relatórios</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Relatório de leads criados por período. Integração com gráficos será implementada em fase futura.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gráfico de leads por período
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receita por Período</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Relatório de receita obtida com a venda de pacotes.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gráfico de receita
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Conversão de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Taxa de conversão por área e por canal de origem.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gráfico de conversão
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">UTM / Canais</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Desempenho de leads por fonte UTM e canal de origem.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gráfico UTM / canais
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
