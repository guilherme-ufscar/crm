"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import type { LeadFormData } from "@/lib/validations";

export function LeadFormStep3() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const descricao = watch("descricao") || "";
  const temDocumentos = watch("temDocumentos");

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Detalhes do Caso</h2>

      {/* Descrição */}
      <div className="space-y-2">
        <Label>Descreva seu caso *</Label>
        <Textarea
          placeholder="Conte o que aconteceu, quando aconteceu, quem são as partes envolvidas e o que você busca..."
          rows={6}
          {...register("descricao")}
        />
        <div className="flex justify-between">
          {errors.descricao ? (
            <p className="text-sm text-destructive">{errors.descricao.message}</p>
          ) : (
            <p className="text-xs text-muted-foreground">
              Mínimo de 50 caracteres para que possamos entender seu caso
            </p>
          )}
          <span
            className={`text-xs ${
              descricao.length < 50 ? "text-secondary" : "text-primary"
            }`}
          >
            {descricao.length}/50+
          </span>
        </div>
      </div>

      {/* Tem documentos */}
      <div className="flex items-center gap-3">
        <Checkbox
          id="temDocumentos"
          checked={temDocumentos || false}
          onCheckedChange={(checked) => setValue("temDocumentos", checked === true)}
        />
        <Label htmlFor="temDocumentos" className="cursor-pointer">
          Tenho documentos relacionados ao caso
        </Label>
      </div>
      {temDocumentos && (
        <p className="text-xs text-muted-foreground ml-8">
          Você poderá enviar documentos diretamente pelo WhatsApp após o redirecionamento.
        </p>
      )}
    </div>
  );
}

