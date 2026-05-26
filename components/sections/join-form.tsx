"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { LeadInput, leadSchema } from "@/lib/schemas";

const profiles = [
  "Empreendedor(a)",
  "Startup",
  "Profissional de tecnologia",
  "Estudante",
  "Investidor(a)",
  "Empresa",
  "Universidade ou entidade"
];

export function JoinForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<LeadInput>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      profile: "",
      objective: ""
    }
  });

  function onSubmit(values: LeadInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };

      if (payload.ok) {
        setMessage(payload.message ?? "Cadastro recebido.");
        reset();
        return;
      }

      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          Nome
          <Input placeholder="Seu nome" {...register("name")} />
          {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
        </label>
        <label className="space-y-2 text-sm font-semibold">
          E-mail
          <Input placeholder="voce@email.com" type="email" {...register("email")} />
          {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
        </label>
      </div>
      <label className="space-y-2 text-sm font-semibold">
        Perfil
        <select
          className="flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring"
          {...register("profile")}
        >
          <option value="">Selecione</option>
          {profiles.map((profile) => (
            <option key={profile} value={profile}>
              {profile}
            </option>
          ))}
        </select>
        {errors.profile ? <span className="block text-xs text-destructive">{errors.profile.message}</span> : null}
      </label>
      <label className="space-y-2 text-sm font-semibold">
        Como você quer contribuir?
        <Textarea
          placeholder="Tenho uma startup, quero mentorar, busco parceiros, quero contratar talentos..."
          {...register("objective")}
        />
        {errors.objective ? (
          <span className="block text-xs text-destructive">{errors.objective.message}</span>
        ) : null}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar interesse"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
