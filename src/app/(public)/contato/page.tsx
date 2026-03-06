"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MaterialIcon } from "@/components/ui/material-icon";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { contatoSchema, type ContatoData } from "@/lib/validations";
import { buildWhatsAppUrl } from "@/lib/public-env";
import { PUBLIC_TURNSTILE_SITE_KEY } from "@/lib/public-env";
import { TurnstileField } from "@/components/forms/turnstile-field";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const contatoWhatsAppMessage = "Olá! Vim pela página de contato e gostaria de falar com a equipe da Conect Juris.";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContatoData>({
    resolver: zodResolver(contatoSchema),
  });

  async function onSubmit(data: ContatoData) {
    setError("");
    if (PUBLIC_TURNSTILE_SITE_KEY && !turnstileToken) {
      setError("Confirme o captcha antes de enviar.");
      return;
    }
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, turnstileToken }),
      });
      if (!res.ok) throw new Error("Erro ao enviar mensagem");
      setSubmitted(true);
      reset();
    } catch {
      setError("Erro ao enviar mensagem. Tente novamente.");
    }
  }

  return (
    <>
      <section className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Entre em Contato</h1>
          <p className="mt-3 text-lg text-muted-foreground">
            Dúvidas, sugestões ou parcerias? Fale conosco.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-5">
            {/* Info sidebar */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MaterialIcon name="chat" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Atendimento rápido</p>
                    <a
                      href={buildWhatsAppUrl(contatoWhatsAppMessage)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-primary hover:underline"
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MaterialIcon name="mail" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">E-mail</h3>
                    <p className="text-sm text-muted-foreground">contato@jurilead.com.br</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <MaterialIcon name="location_on" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold">Localização</h3>
                    <p className="text-sm text-muted-foreground">Atendimento 100% digital em todo o Brasil</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Form */}
            <div className="lg:col-span-3">
              {submitted ? (
                <Card>
                  <CardContent className="py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <MaterialIcon name="send" size={28} />
                    </div>
                    <h2 className="mt-4 text-xl font-bold">Mensagem enviada!</h2>
                    <p className="mt-2 text-muted-foreground">
                      Agradecemos seu contato. Responderemos o mais breve possível.
                    </p>
                    <Button className="mt-6" onClick={() => setSubmitted(false)}>
                      Enviar outra mensagem
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                          <Label htmlFor="nome">Nome *</Label>
                          <Input id="nome" {...register("nome")} placeholder="Seu nome" />
                          {errors.nome && (
                            <p className="text-sm text-secondary">{errors.nome.message}</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">E-mail *</Label>
                          <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
                          {errors.email && (
                            <p className="text-sm text-secondary">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="assunto">Assunto *</Label>
                        <Input id="assunto" {...register("assunto")} placeholder="Qual o assunto?" />
                        {errors.assunto && (
                          <p className="text-sm text-secondary">{errors.assunto.message}</p>
                        )}
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="mensagem">Mensagem *</Label>
                        <Textarea
                          id="mensagem"
                          rows={5}
                          {...register("mensagem")}
                          placeholder="Escreva sua mensagem..."
                        />
                        {errors.mensagem && (
                          <p className="text-sm text-secondary">{errors.mensagem.message}</p>
                        )}
                      </div>

                      <TurnstileField onTokenChange={setTurnstileToken} />

                      {error && (
                        <div className="rounded-lg bg-secondary/10 p-3 text-sm text-secondary">{error}</div>
                      )}

                      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
                        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
