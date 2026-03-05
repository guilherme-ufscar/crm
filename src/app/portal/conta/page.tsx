"use client";

import { useSession } from "next-auth/react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PortalContaPage() {
  const { data: session } = useSession();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Minha Conta</h1>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Dados do Perfil</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <MaterialIcon name="person" size={24} />
            </div>
            <div>
              <p className="font-semibold">{session?.user?.name || "Advogado"}</p>
              <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mt-4">
            <div className="flex items-center gap-2 text-sm">
              <MaterialIcon name="mail" size={16} className="text-muted-foreground" />
              <span>{session?.user?.email || "�"}</span>
            </div>
          </div>

          <div className="rounded-lg border-2 border-dashed border-muted p-6 text-center text-sm text-muted-foreground mt-6">
            <p>Edi��o de perfil ser� disponibilizada em breve.</p>
            <p className="mt-1">Para altera��es, entre em contato pelo WhatsApp.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
