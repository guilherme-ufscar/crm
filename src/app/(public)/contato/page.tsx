"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { contatoSchema, type ContatoData } from "@/lib/validations";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

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
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
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
      <section className="bg-gradient-to-br from-indigo-50 via-white to-blue-50 py-16">
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
                    <MessageCircle className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold">WhatsApp</h3>
                    <p className="text-sm text-muted-foreground">Atendimento rápido</p>
                    <a
                      href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || ""}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block text-sm font-medium text-green-600 hover:underline"
                    >
                      Enviar mensagem
                    </a>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="flex items-start gap-4 pt-6">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Mail className="h-5 w-5" />
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
                    <MapPin className="h-5 w-5" />
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
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100 text-green-600">
                      <Send className="h-7 w-7" />
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
                            <p className="text-sm text-red-500">{errors.nome.message}</p>
                          )}
                        </div>
                        <div className="space-y-1.5">
                          <Label htmlFor="email">E-mail *</Label>
                          <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
                          {errors.email && (
                            <p className="text-sm text-red-500">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <Label htmlFor="assunto">Assunto *</Label>
                        <Input id="assunto" {...register("assunto")} placeholder="Qual o assunto?" />
                        {errors.assunto && (
                          <p className="text-sm text-red-500">{errors.assunto.message}</p>
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
                          <p className="text-sm text-red-500">{errors.mensagem.message}</p>
                        )}
                      </div>

                      {error && (
                        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">{error}</div>
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
