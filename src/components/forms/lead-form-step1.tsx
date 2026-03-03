"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AREAS_DIREITO, UFS_BRASIL } from "@/lib/utils";
import type { LeadFormData } from "@/lib/validations";

export function LeadFormStep1() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const area = watch("areaDireito");
  const uf = watch("uf");
  const urgencia = watch("urgencia");

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Área e Contexto</h2>

      {/* Área do Direito */}
      <div className="space-y-2">
        <Label>Área do Direito *</Label>
        <Select
          value={area}
          onValueChange={(value) => setValue("areaDireito", value as LeadFormData["areaDireito"], { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione a área" />
          </SelectTrigger>
          <SelectContent>
            {AREAS_DIREITO.map((a) => (
              <SelectItem key={a.value} value={a.value}>
                {a.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.areaDireito && <p className="text-sm text-destructive">{errors.areaDireito.message}</p>}
      </div>

      {/* Cidade */}
      <div className="space-y-2">
        <Label>Cidade *</Label>
        <Input placeholder="Sua cidade" {...register("cidade")} />
        {errors.cidade && <p className="text-sm text-destructive">{errors.cidade.message}</p>}
      </div>

      {/* UF */}
      <div className="space-y-2">
        <Label>Estado (UF) *</Label>
        <Select
          value={uf}
          onValueChange={(value) => setValue("uf", value, { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue placeholder="Selecione o estado" />
          </SelectTrigger>
          <SelectContent>
            {UFS_BRASIL.map((estado) => (
              <SelectItem key={estado} value={estado}>
                {estado}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.uf && <p className="text-sm text-destructive">{errors.uf.message}</p>}
      </div>

      {/* Urgência */}
      <div className="space-y-2">
        <Label>Nível de urgência</Label>
        <Select
          value={urgencia}
          onValueChange={(value) => setValue("urgencia", value as LeadFormData["urgencia"], { shouldValidate: true })}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="URGENTE">Urgente</SelectItem>
            <SelectItem value="ALTA">Alta prioridade</SelectItem>
            <SelectItem value="MEDIA">Média prioridade</SelectItem>
            <SelectItem value="BAIXA">Sem pressa</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
