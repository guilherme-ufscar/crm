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
import type { LeadFormData } from "@/lib/validations";

export function LeadFormStep2() {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const melhorHorario = watch("melhorHorario");

  // Simple phone mask handler
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 11) value = value.slice(0, 11);

    if (value.length > 7) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    } else if (value.length > 0) {
      value = `(${value}`;
    }

    setValue("whatsapp", value, { shouldValidate: true });
  };

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Dados de Contato</h2>

      {/* Nome */}
      <div className="space-y-2">
        <Label>Nome completo *</Label>
        <Input placeholder="Seu nome completo" {...register("nome")} />
        {errors.nome && <p className="text-sm text-destructive">{errors.nome.message}</p>}
      </div>

      {/* WhatsApp */}
      <div className="space-y-2">
        <Label>WhatsApp *</Label>
        <Input
          placeholder="(11) 99999-9999"
          value={watch("whatsapp")}
          onChange={handlePhoneChange}
        />
        {errors.whatsapp && <p className="text-sm text-destructive">{errors.whatsapp.message}</p>}
        <p className="text-xs text-muted-foreground">
          Seus dados s�o protegidos (LGPD) e usados apenas para contato sobre seu caso.
        </p>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label>E-mail (opcional)</Label>
        <Input type="email" placeholder="seu@email.com" {...register("email")} />
        {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
      </div>

      {/* Melhor hor�rio */}
      <div className="space-y-2">
        <Label>Melhor hor�rio para contato</Label>
        <Select
          value={melhorHorario || "QUALQUER"}
          onValueChange={(value) => setValue("melhorHorario", value as LeadFormData["melhorHorario"])}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="MANHA">Manh� (8h-12h)</SelectItem>
            <SelectItem value="TARDE">Tarde (12h-18h)</SelectItem>
            <SelectItem value="NOITE">Noite (18h-21h)</SelectItem>
            <SelectItem value="QUALQUER">Qualquer hor�rio</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
