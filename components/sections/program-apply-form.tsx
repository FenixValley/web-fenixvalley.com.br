"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ProgramApplicationInput, programApplicationSchema } from "@/lib/schemas";

export function ProgramApplyForm({ programSlug }: { programSlug: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ProgramApplicationInput>({
    resolver: zodResolver(programApplicationSchema),
    defaultValues: { programSlug, name: "", email: "", organization: "", motivation: "" }
  });

  function onSubmit(values: ProgramApplicationInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/program-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Inscrição recebida!");
        reset();
        return;
      }
      setMessage(payload.message ?? "Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" {...register("programSlug")} />
      <div className="grid gap-4 md:grid-cols-2">
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
        Organização ou instituição (opcional)
        <Input placeholder="Startup, empresa, universidade..." {...register("organization")} />
      </label>
      <label className="space-y-2 text-sm font-semibold">
        Por que você quer participar?
        <Textarea
          placeholder="Conte sobre seu projeto, momento atual e expectativa com o programa"
          {...register("motivation")}
        />
        {errors.motivation ? (
          <span className="block text-xs text-destructive">{errors.motivation.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo o uso dos meus dados para contato sobre este programa.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar inscrição"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
