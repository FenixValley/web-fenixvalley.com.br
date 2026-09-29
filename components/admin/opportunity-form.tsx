"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/app/admin/(painel)/actions";
import { opportunityStages, opportunityTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type OpportunityFormValues = {
  title: string;
  type: string;
  stage: string;
  audience: string;
  date: string;
  owner: string;
  link: string | null;
};

export function OpportunityForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: OpportunityFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Título
        <Input name="title" required defaultValue={initialValues?.title} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Tipo
          <select name="type" required defaultValue={initialValues?.type ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Estágio
          <select name="stage" required defaultValue={initialValues?.stage ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {opportunityStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Data
          <Input name="date" type="date" required defaultValue={initialValues?.date} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Responsável
          <Input name="owner" required defaultValue={initialValues?.owner} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Público
        <Input name="audience" required defaultValue={initialValues?.audience} />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Link de inscrição externa (opcional)
        <Input name="link" type="url" placeholder="https://" defaultValue={initialValues?.link ?? ""} />
      </label>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar oportunidade"}
      </Button>
    </form>
  );
}
