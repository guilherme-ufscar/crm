"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function SucessoContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="flex items-center justify-center py-20">
      <Card className="w-full max-w-md text-center">
        <CardContent className="py-12">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <MaterialIcon name="check_circle" size={32} />
          </div>
          <h1 className="mt-4 text-2xl font-bold">Pagamento confirmado!</h1>
          <p className="mt-2 text-muted-foreground">
            Seus créditos foram adicionados à sua conta. Agora você pode adquirir leads qualificados.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild>
              <Link href="/portal/leads">Ver leads disponíveis</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/portal">Ir para o dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function PacoteSucessoPage() {
  return (
    <Suspense fallback={null}>
      <SucessoContent />
    </Suspense>
  );
}

