"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PartnerApplicationInput,
  partnerApplicationSchema,
  partnerCategories,
  partnerSupportTypes
} from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function PartnerApplicationForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PartnerApplicationInput>({
    resolver: zodResolver(partnerApplicationSchema),
    defaultValues: {
      organization: "",
      contactName: "",
      email: "",
      phone: "",
      supportTypes: [],
      message: ""
    }
  });

  function onSubmit(values: PartnerApplicationInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/partner-applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Proposta recebida!");
        reset();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Organização
          <Input placeholder="Nome da empresa, instituição ou coletivo" {...register("organization")} />
          {errors.organization ? (
            <span className="block text-xs text-destructive">{errors.organization.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Categoria de apoio
          <select className={selectClassName} {...register("category")}>
            <option value="">Selecione</option>
            {partnerCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          {errors.category ? (
            <span className="block text-xs text-destructive">{errors.category.message}</span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Quem fala pela organização
          <Input placeholder="Nome completo" {...register("contactName")} />
          {errors.contactName ? (
            <span className="block text-xs text-destructive">{errors.contactName.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          E-mail
          <Input type="email" placeholder="voce@organizacao.com.br" {...register("email")} />
          {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Telefone ou WhatsApp (opcional)
        <Input placeholder="(31) 91234-5678" {...register("phone")} />
      </label>
      <fieldset className="space-y-2">
        <legend className="text-sm font-semibold">Como sua organização pode apoiar</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {partnerSupportTypes.map((type) => (
            <label key={type} className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
              <input type="checkbox" className="mt-1 h-4 w-4" value={type} {...register("supportTypes")} />
              {type}
            </label>
          ))}
        </div>
        {errors.supportTypes ? (
          <span className="block text-xs text-destructive">{errors.supportTypes.message}</span>
        ) : null}
      </fieldset>
      <label className="block space-y-2 text-sm font-semibold">
        Como quer contribuir
        <Textarea
          rows={4}
          placeholder="Conte o que sua organização pode oferecer e o que espera da parceria"
          {...register("message")}
        />
        {errors.message ? <span className="block text-xs text-destructive">{errors.message.message}</span> : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo a coordenação do Fênix Valley a usar estes dados para retornar sobre a parceria.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar proposta de parceria"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
