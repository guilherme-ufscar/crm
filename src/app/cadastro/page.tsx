"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { advogadoCadastroSchema, type AdvogadoCadastroData } from "@/lib/validations";
import { AREAS_DIREITO, UFS_BRASIL } from "@/lib/utils";

export default function CadastroPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<AdvogadoCadastroData>({
    resolver: zodResolver(advogadoCadastroSchema),
    defaultValues: { areasAtuacao: [] },
  });

  const selectedAreas = watch("areasAtuacao") || [];

  type AreaDireito = AdvogadoCadastroData["areasAtuacao"][number];

  function toggleArea(area: AreaDireito) {
    const current = selectedAreas;
    const updated = current.includes(area)
      ? current.filter((a) => a !== area)
      : [...current, area];
    setValue("areasAtuacao", updated as AreaDireito[], { shouldValidate: true });
  }

  async function onSubmit(data: AdvogadoCadastroData) {
    setError("");
    try {
      const res = await fetch("/api/auth/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (!res.ok) {
        setError(json.error || "Erro ao cadastrar");
        return;
      }

      setSuccess(true);
    } catch {
      setError("Erro ao processar cadastro. Tente novamente.");
    }
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-primary/5 px-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="py-12">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
              <CheckCircle className="h-7 w-7" />
            </div>
            <h2 className="mt-4 text-xl font-bold">Cadastro realizado!</h2>
            <p className="mt-2 text-muted-foreground">
              Sua conta foi criada com sucesso. Faça login para acessar o portal.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/login">Fazer login</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/5 px-4 py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <Link href="/" className="mx-auto flex items-center gap-2 text-primary">
            <Image src="/imagens/logo.svg" alt="Conect Juris" width={180} height={46} className="h-10 w-auto" priority />
          </Link>
          <CardTitle className="mt-4 text-xl">Cadastro de Advogado</CardTitle>
          <p className="text-sm text-muted-foreground">
            Crie sua conta para acessar leads qualificados
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Nome */}
            <div className="space-y-1.5">
              <Label htmlFor="nome">Nome completo *</Label>
              <Input id="nome" {...register("nome")} placeholder="Dr(a). Nome Completo" />
              {errors.nome && <p className="text-sm text-secondary">{errors.nome.message}</p>}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <Label htmlFor="email">E-mail *</Label>
              <Input id="email" type="email" {...register("email")} placeholder="seu@email.com" />
              {errors.email && <p className="text-sm text-secondary">{errors.email.message}</p>}
            </div>

            {/* Telefone */}
            <div className="space-y-1.5">
              <Label htmlFor="telefone">Telefone/WhatsApp *</Label>
              <Input id="telefone" {...register("telefone")} placeholder="(11) 99999-9999" />
              {errors.telefone && <p className="text-sm text-secondary">{errors.telefone.message}</p>}
            </div>

            {/* OAB */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="oabNumero">Nº OAB *</Label>
                <Input id="oabNumero" {...register("oabNumero")} placeholder="123456" />
                {errors.oabNumero && <p className="text-sm text-secondary">{errors.oabNumero.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="oabUf">UF OAB *</Label>
                <select
                  id="oabUf"
                  {...register("oabUf")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione</option>
                  {UFS_BRASIL.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                {errors.oabUf && <p className="text-sm text-secondary">{errors.oabUf.message}</p>}
              </div>
            </div>

            {/* Estado / Cidade */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label htmlFor="estado">Estado *</Label>
                <select
                  id="estado"
                  {...register("estado")}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="">Selecione</option>
                  {UFS_BRASIL.map((uf) => (
                    <option key={uf} value={uf}>{uf}</option>
                  ))}
                </select>
                {errors.estado && <p className="text-sm text-secondary">{errors.estado.message}</p>}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="cidade">Cidade *</Label>
                <Input id="cidade" {...register("cidade")} placeholder="São Paulo" />
                {errors.cidade && <p className="text-sm text-secondary">{errors.cidade.message}</p>}
              </div>
            </div>

            {/* Áreas de atuação */}
            <div className="space-y-2">
              <Label>Áreas de atuação *</Label>
              <div className="grid grid-cols-2 gap-2">
                {AREAS_DIREITO.map((area) => (
                  <label
                    key={area.value}
                    className={`flex cursor-pointer items-center gap-2 rounded-md border p-2 text-sm transition-colors ${
                      selectedAreas.includes(area.value)
                        ? "border-primary bg-primary/5"
                        : "border-input hover:bg-muted/50"
                    }`}
                  >
                    <Checkbox
                      checked={selectedAreas.includes(area.value)}
                      onCheckedChange={() => toggleArea(area.value)}
                    />
                    <span>{area.icon} {area.label}</span>
                  </label>
                ))}
              </div>
              {errors.areasAtuacao && (
                <p className="text-sm text-secondary">{errors.areasAtuacao.message}</p>
              )}
            </div>

            {/* Senha */}
            <div className="space-y-1.5">
              <Label htmlFor="senha">Senha *</Label>
              <div className="relative">
                <Input
                  id="senha"
                  type={showPassword ? "text" : "password"}
                  {...register("senha")}
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.senha && <p className="text-sm text-secondary">{errors.senha.message}</p>}
            </div>

            {/* Confirmar Senha */}
            <div className="space-y-1.5">
              <Label htmlFor="confirmarSenha">Confirmar Senha *</Label>
              <Input
                id="confirmarSenha"
                type={showPassword ? "text" : "password"}
                {...register("confirmarSenha")}
                placeholder="Repita a senha"
              />
              {errors.confirmarSenha && (
                <p className="text-sm text-secondary">{errors.confirmarSenha.message}</p>
              )}
            </div>

            {error && (
              <div className="rounded-lg bg-secondary/10 p-3 text-sm text-secondary">{error}</div>
            )}

            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? "Cadastrando..." : "Criar conta"}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <p className="text-muted-foreground">
              Já tem conta?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Faça login
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


