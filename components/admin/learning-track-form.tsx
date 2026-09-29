"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import { eventCategories, learningTrackIcons, opportunityTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type LearningTrackFormValues = {
  title: string;
  description: string;
  icon: string;
  order: number;
  relatedEventCategory?: string | null;
  relatedOpportunityType?: string | null;
};

export function LearningTrackForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: LearningTrackFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Título
        <Input name="title" required defaultValue={initialValues?.title} />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Ícone
          <select name="icon" required defaultValue={initialValues?.icon ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {learningTrackIcons.map((icon) => (
              <option key={icon} value={icon}>
                {icon}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Ordem de exibição
          <Input name="order" type="number" min={0} defaultValue={initialValues?.order ?? 0} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Categoria de eventos relacionada (opcional)
          <select
            name="relatedEventCategory"
            defaultValue={initialValues?.relatedEventCategory ?? ""}
            className={selectClassName}
          >
            <option value="">Nenhuma</option>
            {eventCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo de oportunidade relacionado (opcional)
          <select
            name="relatedOpportunityType"
            defaultValue={initialValues?.relatedOpportunityType ?? ""}
            className={selectClassName}
          >
            <option value="">Nenhum</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar trilha"}
      </Button>
    </form>
  );
}
