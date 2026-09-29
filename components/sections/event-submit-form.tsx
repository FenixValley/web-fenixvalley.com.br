"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventInput, eventCategories, eventModes, eventSchema } from "@/lib/schemas";

const fieldClassName =
  "flex h-11 w-full rounded-md border bg-[var(--fx-paper)] px-3 py-2 font-body text-sm text-[var(--fx-ink)] outline-none transition-colors focus-visible:border-[var(--fx-accent)] focus-visible:ring-2 focus-visible:ring-[var(--fx-accent)]/30";

const labelClassName =
  "block space-y-2 font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fx-muted)]";

export function EventSubmitForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<EventInput>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      link: "",
      audience: "",
      schedule: "",
      organizer: "",
      organizerEmail: ""
    }
  });

  function onSubmit(values: EventInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Evento recebido!");
        reset();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className={labelClassName}>
        Nome do evento
        <Input className={fieldClassName} placeholder="Ex.: Meetup Betim Tech" {...register("title")} />
        {errors.title ? <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.title.message}</span> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Categoria
          <select className={fieldClassName} {...register("category")}>
            <option value="">Selecione</option>
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.category.message}</span>
          ) : null}
        </label>
        <label className={labelClassName}>
          Modalidade
          <select className={fieldClassName} {...register("mode")}>
            <option value="">Selecione</option>
            {eventModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {errors.mode ? <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.mode.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Data
          <Input className={fieldClassName} type="date" {...register("date")} />
          {errors.date ? <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.date.message}</span> : null}
        </label>
        <label className={labelClassName}>
          Horário
          <Input className={fieldClassName} type="time" {...register("time")} />
          {errors.time ? <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.time.message}</span> : null}
        </label>
      </div>
      <label className={labelClassName}>
        Local (ou link da transmissão)
        <Input className={fieldClassName} placeholder="Endereço em Betim ou plataforma online" {...register("location")} />
        {errors.location ? (
          <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.location.message}</span>
        ) : null}
      </label>
      <label className={labelClassName}>
        Descrição
        <Textarea className={fieldClassName.replace("h-11 ", "")} placeholder="O que acontece no evento e por que participar" {...register("description")} />
        {errors.description ? (
          <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.description.message}</span>
        ) : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Link de inscrição (opcional)
          <Input className={fieldClassName} placeholder="https://" {...register("link")} />
          {errors.link ? <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.link.message}</span> : null}
        </label>
        <label className={labelClassName}>
          Público (opcional)
          <Input className={fieldClassName} placeholder="Ex.: estudantes, fundadores, geral" {...register("audience")} />
        </label>
      </div>
      <label className={labelClassName}>
        Programação (opcional)
        <Textarea className={fieldClassName.replace("h-11 ", "")} placeholder="Agenda resumida do evento" {...register("schedule")} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className={labelClassName}>
          Organizador(a)
          <Input className={fieldClassName} placeholder="Nome da organização ou pessoa" {...register("organizer")} />
          {errors.organizer ? (
            <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.organizer.message}</span>
          ) : null}
        </label>
        <label className={labelClassName}>
          E-mail do organizador
          <Input className={fieldClassName} type="email" placeholder="voce@email.com" {...register("organizerEmail")} />
          {errors.organizerEmail ? (
            <span className="block font-body text-xs normal-case tracking-normal text-destructive">{errors.organizerEmail.message}</span>
          ) : null}
        </label>
      </div>
      <label className="flex items-start gap-3 font-body text-sm leading-6" style={{ color: "var(--fx-muted)" }}>
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[var(--fx-accent)]" {...register("consent")} />
        Autorizo a publicação destes dados na agenda pública após aprovação da curadoria.
      </label>
      {errors.consent ? <span className="block font-body text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          disabled={isPending}
          className="font-mono text-[13px] uppercase tracking-[0.18em]"
          style={{ background: "var(--fx-accent)", color: "#ffffff" }}
        >
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar para curadoria"}
        </Button>
        {message ? (
          <p className="font-body text-sm font-medium" style={{ color: "var(--fx-accent)" }}>
            {message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
