"use client";

import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { MaterialIcon } from "@/components/ui/material-icon";
import type { LeadFormData } from "@/lib/validations";

export function LeadFormStep4() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<LeadFormData>();

  const possuiAdvogado = watch("possuiAdvogado");
  const processoEmAndamento = watch("processoEmAndamento");
  const consentLgpd = watch("consentimentoLGPD");
  const consentWhatsapp = watch("consentimentoWhatsApp");

  const showWarning = possuiAdvogado || processoEmAndamento;

  return (
    <div className="space-y-5">
      <h2 className="text-lg font-semibold">Confirmação</h2>

      {/* Possui advogado */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Checkbox
            id="possuiAdvogado"
            checked={possuiAdvogado}
            onCheckedChange={(checked) => setValue("possuiAdvogado", checked === true, { shouldValidate: true })}
          />
          <Label htmlFor="possuiAdvogado" className="cursor-pointer">
            Já possuo advogado para este caso
          </Label>
        </div>

        {/* Processo em andamento */}
        <div className="flex items-center gap-3">
          <Checkbox
            id="processoEmAndamento"
            checked={processoEmAndamento}
            onCheckedChange={(checked) => setValue("processoEmAndamento", checked === true, { shouldValidate: true })}
          />
          <Label htmlFor="processoEmAndamento" className="cursor-pointer">
            Existe processo judicial em andamento sobre este caso
          </Label>
        </div>
      </div>

      {/* Warning */}
      {showWarning && (
        <div className="rounded-lg border border-secondary/25 bg-secondary/10 p-4">
          <div className="flex items-start gap-3">
            <MaterialIcon name="warning" size={20} className="text-secondary mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-secondary">Atenção</p>
              <p className="mt-1 text-sm text-secondary">
                Nossa plataforma não atende casos com advogado constituído ou processo em andamento. Se continuar, seu caso será registrado, mas não será encaminhado para atendimento através da plataforma.
              </p>
              <p className="mt-2 text-sm text-secondary">
                Recomendamos entrar em contato diretamente com seu advogado ou procurar a Defensoria Pública.
              </p>
            </div>
          </div>
        </div>
      )}

      <hr className="my-4" />

      {/* LGPD Consent */}
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <Checkbox
            id="consentLgpd"
            checked={!!consentLgpd}
            onCheckedChange={(checked) => setValue("consentimentoLGPD", checked === true, { shouldValidate: true })}
            className="mt-0.5"
          />
          <div>
            <Label htmlFor="consentLgpd" className="cursor-pointer">
              Concordo com o tratamento dos meus dados pessoais *
            </Label>
            <p className="mt-1 text-xs text-muted-foreground">
              Seus dados serão usados exclusivamente para triagem, classificação e contato sobre seu caso jurídico, conforme nossa{" "}
              <a href="/privacidade" target="_blank" className="text-primary underline">
                Política de Privacidade
              </a>{" "}
              e em conformidade com a LGPD (Lei 13.709/2018).
            </p>
          </div>
        </div>
        {errors.consentimentoLGPD && (
          <p className="text-sm text-destructive ml-8">{errors.consentimentoLGPD.message}</p>
        )}

        {/* WhatsApp consent */}
        <div className="flex items-start gap-3">
          <Checkbox
            id="consentWhatsapp"
            checked={consentWhatsapp || false}
            onCheckedChange={(checked) => setValue("consentimentoWhatsApp", checked === true)}
            className="mt-0.5"
          />
          <Label htmlFor="consentWhatsapp" className="cursor-pointer text-sm">
            Aceito receber contato por WhatsApp sobre este caso e conteúdos informativos
          </Label>
        </div>
      </div>
    </div>
  );
}

