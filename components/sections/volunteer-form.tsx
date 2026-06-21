"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import {
  VolunteerInput,
  volunteerAreas,
  volunteerAvailabilities,
  volunteerSchema
} from "@/lib/schemas";

const fieldClassName =
  "flex h-11 w-full rounded-md border bg-[var(--fx-paper)] px-3 py-2 text-sm text-[var(--fx-ink)] outline-none transition-colors placeholder:text-[var(--fx-muted)] focus-visible:border-[var(--fx-accent)] focus-visible:ring-2 focus-visible:ring-[var(--fx-accent)]";

const textareaClassName =
  "flex min-h-[110px] w-full rounded-md border bg-[var(--fx-paper)] px-3 py-2 text-sm text-[var(--fx-ink)] outline-none transition-colors placeholder:text-[var(--fx-muted)] focus-visible:border-[var(--fx-accent)] focus-visible:ring-2 focus-visible:ring-[var(--fx-accent)]";

const labelClassName = "space-y-2 text-sm font-semibold text-[var(--fx-ink)]";

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
        <label className={labelClassName}>
          Nome
          <input
            className={fieldClassName}
            style={{ borderColor: "var(--fx-line)" }}
            placeholder="Seu nome"
            {...register("name")}
          />
          {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
        </label>
        <label className={labelClassName}>
          E-mail
          <input
            className={fieldClassName}
            style={{ borderColor: "var(--fx-line)" }}
            placeholder="voce@email.com"
            type="email"
            {...register("email")}
          />
          {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className={labelClassName}>
          Telefone (opcional)
          <input
            className={fieldClassName}
            style={{ borderColor: "var(--fx-line)" }}
            placeholder="(31) 9 0000-0000"
            type="tel"
            {...register("phone")}
          />
        </label>
        <label className={labelClassName}>
          Área de atuação
          <select className={fieldClassName} style={{ borderColor: "var(--fx-line)" }} {...register("area")}>
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
      <label className={labelClassName}>
        Disponibilidade
        <select className={fieldClassName} style={{ borderColor: "var(--fx-line)" }} {...register("availability")}>
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
      <label className={labelClassName}>
        Por que você quer ser voluntário(a)?
        <textarea
          className={textareaClassName}
          style={{ borderColor: "var(--fx-line)" }}
          placeholder="Quero organizar eventos, mentorar, produzir conteúdo, apoiar a operação..."
          {...register("motivation")}
        />
        {errors.motivation ? (
          <span className="block text-xs text-destructive">{errors.motivation.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6" style={{ color: "var(--fx-muted)" }}>
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-[var(--fx-accent)]"
          {...register("consent")}
        />
        Autorizo o uso dos meus dados para contato sobre o voluntariado no Fênix Valley.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[var(--fx-accent)] px-5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--fx-accent)] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <HeartHandshake className="h-4 w-4" />
          {isPending ? "Enviando..." : "Quero ser voluntário(a)"}
        </button>
        {message ? (
          <p className="text-sm font-medium" style={{ color: "var(--fx-accent)" }}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
