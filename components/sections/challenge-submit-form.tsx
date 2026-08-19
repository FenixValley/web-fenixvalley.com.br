"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChallengeInput, challengeCategories, challengeSchema, challengeTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function ChallengeSubmitForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChallengeInput>({
    resolver: zodResolver(challengeSchema),
    defaultValues: {
      title: "",
      description: "",
      expectedOutcome: "",
      deadline: "",
      company: "",
      companySegment: "",
      companyEmail: "",
      companySite: ""
    }
  });

  function onSubmit(values: ChallengeInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Desafio recebido!");
        reset();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block space-y-2 text-sm font-semibold">
        Título do desafio
        <Input placeholder="Ex.: Reduzir perdas na linha de montagem com visão computacional" {...register("title")} />
        {errors.title ? <span className="block text-xs text-destructive">{errors.title.message}</span> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Tipo de chamada
          <select className={selectClassName} {...register("type")}>
            <option value="">Selecione</option>
            {challengeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {errors.type ? <span className="block text-xs text-destructive">{errors.type.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Categoria
          <select className={selectClassName} {...register("category")}>
            <option value="">Selecione</option>
            {challengeCategories.map((category) => (
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
      <label className="block space-y-2 text-sm font-semibold">
        Descrição do desafio
        <Textarea
          rows={5}
          placeholder="Contexto, dor atual, restrições e por que isso importa para a operação"
          {...register("description")}
        />
        {errors.description ? (
          <span className="block text-xs text-destructive">{errors.description.message}</span>
        ) : null}
      </label>
      <label className="block space-y-2 text-sm font-semibold">
        Resultado esperado (opcional)
        <Textarea
          placeholder="O que caracteriza uma solução bem-sucedida: métrica, piloto, prazo de validação"
          {...register("expectedOutcome")}
        />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Prazo para receber propostas (opcional)
          <Input type="date" {...register("deadline")} />
          {errors.deadline ? (
            <span className="block text-xs text-destructive">{errors.deadline.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Segmento da empresa (opcional)
          <Input placeholder="Ex.: Metalurgia, logística, saúde" {...register("companySegment")} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Empresa
          <Input placeholder="Razão social ou nome fantasia" {...register("company")} />
          {errors.company ? <span className="block text-xs text-destructive">{errors.company.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          E-mail de contato
          <Input type="email" placeholder="voce@empresa.com.br" {...register("companyEmail")} />
          {errors.companyEmail ? (
            <span className="block text-xs text-destructive">{errors.companyEmail.message}</span>
          ) : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Site da empresa (opcional)
        <Input placeholder="https://" {...register("companySite")} />
        {errors.companySite ? (
          <span className="block text-xs text-destructive">{errors.companySite.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo a publicação deste desafio no portal após aprovação da curadoria. O e-mail de contato não é
        publicado — as propostas chegam pelo formulário do Fênix Valley.
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
