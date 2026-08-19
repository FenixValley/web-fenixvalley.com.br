"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ChallengeProposalInput, challengeProposalSchema, proposalProfiles } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function ChallengeProposalForm({ challengeId }: { challengeId: number }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChallengeProposalInput>({
    resolver: zodResolver(challengeProposalSchema),
    defaultValues: {
      challengeId,
      name: "",
      email: "",
      organization: "",
      solution: "",
      link: ""
    }
  });

  function onSubmit(values: ChallengeProposalInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/challenge-proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Proposta enviada!");
        reset({ challengeId, name: "", email: "", organization: "", solution: "", link: "" });
        return;
      }
      setMessage(payload.message ?? "Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input type="hidden" value={challengeId} {...register("challengeId")} />
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Nome completo
          <Input placeholder="Como quer ser chamado(a)" {...register("name")} />
          {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          E-mail
          <Input type="email" placeholder="voce@email.com" {...register("email")} />
          {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Perfil
          <select className={selectClassName} {...register("profile")}>
            <option value="">Selecione</option>
            {proposalProfiles.map((profile) => (
              <option key={profile} value={profile}>
                {profile}
              </option>
            ))}
          </select>
          {errors.profile ? <span className="block text-xs text-destructive">{errors.profile.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Organização (opcional)
          <Input placeholder="Startup, laboratório, universidade" {...register("organization")} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Solução ou interesse
        <Textarea
          rows={5}
          placeholder="Como você resolveria o desafio, o que já construiu e o que precisaria da empresa"
          {...register("solution")}
        />
        {errors.solution ? <span className="block text-xs text-destructive">{errors.solution.message}</span> : null}
      </label>
      <label className="block space-y-2 text-sm font-semibold">
        Link de apoio (opcional)
        <Input placeholder="https:// — site, deck, repositório ou portfólio" {...register("link")} />
        {errors.link ? <span className="block text-xs text-destructive">{errors.link.message}</span> : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-muted-foreground">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo o Fênix Valley a compartilhar esta proposta com a empresa responsável pelo desafio.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar proposta"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
