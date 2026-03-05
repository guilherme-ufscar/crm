"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AdminRelatoriosPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Relat�rios</h1>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Leads por Per�odo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Relat�rio de leads criados por per�odo. Integra��o com gr�ficos ser� implementada em fase futura.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gr�fico de leads por per�odo
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Receita por Per�odo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Relat�rio de receita obtida com a venda de pacotes.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gr�fico de receita
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Convers�o de Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Taxa de convers�o por �rea e por canal de origem.
            </p>
            <div className="mt-4 rounded-lg border-2 border-dashed border-muted p-8 text-center text-muted-foreground">
              Gr�fico de convers�o
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
              Gr�fico UTM / canais
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
