"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  VolunteerInput,
  volunteerAreas,
  volunteerAvailabilities,
  volunteerSchema
} from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function VolunteerForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: "", email: "", phone: "", motivation: "" }
  });

  function onSubmit(values: VolunteerInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/volunteers", {
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
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          Telefone (opcional)
          <Input placeholder="(31) 9 0000-0000" type="tel" {...register("phone")} />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Área de atuação
          <select className={selectClassName} {...register("area")}>
            <option value="">Selecione</option>
            {volunteerAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.area ? <span className="block text-xs text-destructive">{errors.area.message}</span> : null}
        </label>
      </div>
      <label className="space-y-2 text-sm font-semibold">
        Disponibilidade
        <select className={selectClassName} {...register("availability")}>
          <option value="">Selecione</option>
          {volunteerAvailabilities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.availability ? (
          <span className="block text-xs text-destructive">{errors.availability.message}</span>
        ) : null}
      </label>
      <label className="space-y-2 text-sm font-semibold">
        Por que você quer ser voluntário(a)?
        <Textarea
          placeholder="Quero organizar eventos, mentorar, produzir conteúdo, apoiar a operação..."
          {...register("motivation")}
        />
        {errors.motivation ? (
          <span className="block text-xs text-destructive">{errors.motivation.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo o uso dos meus dados para contato sobre o voluntariado no Fênix Valley.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <HeartHandshake className="h-4 w-4" />
          {isPending ? "Enviando..." : "Quero ser voluntário(a)"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
