"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { EventInput, eventCategories, eventModes, eventSchema } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

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
      <label className="block space-y-2 text-sm font-semibold">
        Nome do evento
        <Input placeholder="Ex.: Meetup Betim Tech" {...register("title")} />
        {errors.title ? <span className="block text-xs text-destructive">{errors.title.message}</span> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Categoria
          <select className={selectClassName} {...register("category")}>
            <option value="">Selecione</option>
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <span className="block text-xs text-destructive">{errors.category.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Modalidade
          <select className={selectClassName} {...register("mode")}>
            <option value="">Selecione</option>
            {eventModes.map((mode) => (
              <option key={mode} value={mode}>
                {mode}
              </option>
            ))}
          </select>
          {errors.mode ? <span className="block text-xs text-destructive">{errors.mode.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Data
          <Input type="date" {...register("date")} />
          {errors.date ? <span className="block text-xs text-destructive">{errors.date.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Horário
          <Input type="time" {...register("time")} />
          {errors.time ? <span className="block text-xs text-destructive">{errors.time.message}</span> : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Local (ou link da transmissão)
        <Input placeholder="Endereço em Betim ou plataforma online" {...register("location")} />
        {errors.location ? (
          <span className="block text-xs text-destructive">{errors.location.message}</span>
        ) : null}
      </label>
      <label className="block space-y-2 text-sm font-semibold">
        Descrição
        <Textarea placeholder="O que acontece no evento e por que participar" {...register("description")} />
        {errors.description ? (
          <span className="block text-xs text-destructive">{errors.description.message}</span>
        ) : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Link de inscrição (opcional)
          <Input placeholder="https://" {...register("link")} />
          {errors.link ? <span className="block text-xs text-destructive">{errors.link.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Público (opcional)
          <Input placeholder="Ex.: estudantes, fundadores, geral" {...register("audience")} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Programação (opcional)
        <Textarea placeholder="Agenda resumida do evento" {...register("schedule")} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Organizador(a)
          <Input placeholder="Nome da organização ou pessoa" {...register("organizer")} />
          {errors.organizer ? (
            <span className="block text-xs text-destructive">{errors.organizer.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          E-mail do organizador
          <Input type="email" placeholder="voce@email.com" {...register("organizerEmail")} />
          {errors.organizerEmail ? (
            <span className="block text-xs text-destructive">{errors.organizerEmail.message}</span>
          ) : null}
        </label>
      </div>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo a publicação destes dados na agenda pública após aprovação da curadoria.
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
