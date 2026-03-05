"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  leadFormSchema,
  type LeadFormData,
} from "@/lib/validations";
import { trackEvent, getStoredUtmParams } from "@/lib/analytics";
import { PUBLIC_TURNSTILE_SITE_KEY } from "@/lib/public-env";
import { LeadFormStep1 } from "./lead-form-step1";
import { LeadFormStep2 } from "./lead-form-step2";
import { LeadFormStep3 } from "./lead-form-step3";
import { LeadFormStep4 } from "./lead-form-step4";
import { TurnstileField } from "./turnstile-field";

const STEPS = [
  { label: "Área e Contexto", num: 1 },
  { label: "Dados de Contato", num: 2 },
  { label: "Detalhes do Caso", num: 3 },
  { label: "Confirmação", num: 4 },
];

export function LeadForm() {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");

  const methods = useForm<LeadFormData>({
    resolver: zodResolver(leadFormSchema),
    mode: "onChange",
    defaultValues: {
      areaDireito: (searchParams.get("area") as LeadFormData["areaDireito"]) || undefined,
      cidade: "",
      uf: "",
      urgencia: "MEDIA",
      nome: "",
      whatsapp: "",
      email: "",
      melhorHorario: "QUALQUER",
      descricao: "",
      temDocumentos: false,
      possuiAdvogado: false,
      processoEmAndamento: false,
      consentimentoLGPD: false,
      consentimentoWhatsApp: false,
    },
  });

  useEffect(() => {
    trackEvent("form_start", { area: searchParams.get("area") || "none" });
  }, [searchParams]);

  const validateCurrentStep = async (): Promise<boolean> => {
    const fieldsPerStep: Record<number, (keyof LeadFormData)[]> = {
      1: ["areaDireito", "cidade", "uf", "urgencia"],
      2: ["nome", "whatsapp"],
      3: ["descricao"],
      4: ["possuiAdvogado", "processoEmAndamento", "consentimentoLGPD"],
    };

    const fields = fieldsPerStep[currentStep];
    const result = await methods.trigger(fields);
    return result;
  };

  const handleNext = async () => {
    const valid = await validateCurrentStep();
    if (!valid) return;

    trackEvent("form_step_complete", { step: currentStep });

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true);
    setError(null);

    if (PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Confirme o captcha antes de enviar.");
      setIsSubmitting(false);
      return;
    }

    // Check if blocked
    if (data.possuiAdvogado || data.processoEmAndamento) {
      setIsBlocked(true);
      trackEvent("form_submit_blocked", {
        possuiAdvogado: data.possuiAdvogado,
        processoEmAndamento: data.processoEmAndamento,
      });
    }

    try {
      const utms = getStoredUtmParams();

      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          utmSource: utms.utm_source,
          utmMedium: utms.utm_medium,
          utmCampaign: utms.utm_campaign,
          utmTerm: utms.utm_term,
          utmContent: utms.utm_content,
          referer: utms.referer || document.referrer,
          turnstileToken,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || "Erro ao enviar caso");
      }

      const result = await response.json();

      trackEvent("form_submit_success", { lead_id: result.leadId });

      // If blocked, show message but don't redirect
      if (data.possuiAdvogado || data.processoEmAndamento) {
        setIsBlocked(true);
        setIsSubmitting(false);
        return;
      }

      // Redirect to WhatsApp
      trackEvent("redirect_whatsapp_success", { lead_id: result.leadId });
      window.location.href = result.whatsappUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao enviar. Tente novamente.");
      setIsSubmitting(false);
    }
  };

  if (isBlocked) {
    return (
      <Card className="border-secondary/25 bg-secondary/10">
        <CardContent className="pt-6">
          <div className="flex items-start gap-3">
            <MaterialIcon name="warning" size={24} className="text-secondary mt-0.5 shrink-0" />
            <div>
              <h3 className="font-semibold text-secondary text-lg">Atenção</h3>
              <p className="mt-2 text-secondary">
                Verificamos que você já possui advogado constituído ou tem processo em andamento.
              </p>
              <p className="mt-3 text-sm text-secondary">
                Nesse caso, recomendamos que entre em contato diretamente com seu advogado atual ou procure a Defensoria Pública da sua região. Nossa plataforma não atende casos nessas condições.
              </p>
              <p className="mt-3 text-sm text-secondary">
                Se acredita que preencheu incorretamente, você pode tentar novamente.
              </p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => {
                  setIsBlocked(false);
                  setCurrentStep(4);
                }}
              >
                Voltar ao formulário
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between">
            {STEPS.map((step) => (
              <div
                key={step.num}
                className={`flex flex-col items-center ${step.num <= currentStep ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${step.num < currentStep
                      ? "bg-primary text-primary-foreground"
                      : step.num === currentStep
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                >
                  {step.num}
                </div>
                <span className="mt-1 hidden text-xs sm:block">{step.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
            />
          </div>
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="pt-6">
            {currentStep === 1 && <LeadFormStep1 />}
            {currentStep === 2 && <LeadFormStep2 />}
            {currentStep === 3 && <LeadFormStep3 />}
            {currentStep === 4 && <LeadFormStep4 />}

            {currentStep === 4 && (
              <div className="mt-6">
                <TurnstileField onTokenChange={setTurnstileToken} />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Error */}
        {error && (
          <div className="mt-4 rounded-lg border border-secondary/25 bg-secondary/10 p-3 text-sm text-secondary">
            {error}
          </div>
        )}

        {/* Buttons */}
        <div className="mt-6 flex justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={handlePrev}
            disabled={currentStep === 1}
          >
            Voltar
          </Button>

          {currentStep < 4 ? (
            <Button type="button" onClick={handleNext}>
              Próximo
            </Button>
          ) : (
            <Button type="submit" variant="whatsapp" size="lg" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <MaterialIcon name="progress_activity" size={16} className="animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <MaterialIcon name="send" size={16} />
                  Enviar e falar no WhatsApp
                </>
              )}
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );
}

