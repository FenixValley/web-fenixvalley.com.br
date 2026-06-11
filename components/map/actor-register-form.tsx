"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActorRegisterInput, actorRegisterSchema, actorTypeLabels, actorTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function ActorRegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ActorRegisterInput>({
    resolver: zodResolver(actorRegisterSchema),
    defaultValues: { name: "", segment: "", neighborhood: "", description: "", site: "", email: "" }
  });

  function onSubmit(values: ActorRegisterInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/actors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Cadastro recebido!");
        reset();
        onSuccess?.();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block space-y-2 text-sm font-semibold">
        Nome da organização
        <Input placeholder="Nome" {...register("name")} />
        {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Tipo
          <select className={selectClassName} {...register("type")}>
            <option value="">Selecione</option>
            {actorTypes.map((type) => (
              <option key={type} value={type}>
                {actorTypeLabels[type]}
              </option>
            ))}
          </select>
          {errors.type ? <span className="block text-xs text-destructive">{errors.type.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Segmento
          <Input placeholder="Ex.: educação, logística, SaaS" {...register("segment")} />
          {errors.segment ? (
            <span className="block text-xs text-destructive">{errors.segment.message}</span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Bairro/Região
          <Input placeholder="Ex.: Centro, Angola, PTB" {...register("neighborhood")} />
          {errors.neighborhood ? (
            <span className="block text-xs text-destructive">{errors.neighborhood.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Site (opcional)
          <Input placeholder="https://" {...register("site")} />
          {errors.site ? <span className="block text-xs text-destructive">{errors.site.message}</span> : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        E-mail de contato (opcional)
        <Input placeholder="contato@organizacao.com.br" type="email" {...register("email")} />
        {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
      </label>
      <label className="block space-y-2 text-sm font-semibold">
        Descrição
        <Textarea
          placeholder="O que a organização faz e como participa do ecossistema"
          {...register("description")}
        />
        {errors.description ? (
          <span className="block text-xs text-destructive">{errors.description.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo a publicação destes dados no mapa público após aprovação da curadoria.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar para curadoria"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
