"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface AuditLog {
  id: string;
  acao: string;
  entidade: string;
  entidadeId: string;
  detalhes: string | null;
  criadoEm: string;
  admin: {
    id: string;
    nome: string;
    email: string;
  };
}

export default function AdminLogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/logs")
      .then((res) => res.json())
      .then(setLogs)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2">
        <MaterialIcon name="history" size={24} />
        Logs de Auditoria
      </h1>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : logs.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">Nenhum log encontrado</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50 text-left">
                    <th className="px-4 py-3 font-medium">Data</th>
                    <th className="px-4 py-3 font-medium">Admin</th>
                    <th className="px-4 py-3 font-medium">Ação</th>
                    <th className="px-4 py-3 font-medium">Entidade</th>
                    <th className="px-4 py-3 font-medium">Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id} className="border-b last:border-0 hover:bg-muted/30">
                      <td className="px-4 py-3 whitespace-nowrap text-muted-foreground">
                        {new Date(log.criadoEm).toLocaleString("pt-BR")}
                      </td>
                      <td className="px-4 py-3">
                        <p className="font-medium">{log.admin.nome}</p>
                      </td>
                      <td className="px-4 py-3">{log.acao}</td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {log.entidade} ({log.entidadeId.substring(0, 8)}...)
                      </td>
                      <td className="px-4 py-3 max-w-xs truncate text-muted-foreground">
                        {log.detalhes || "-"}
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

