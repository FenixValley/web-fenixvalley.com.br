"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import { impactStoryTypeLabels, impactStoryTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type ImpactStoryFormValues = {
  type: string;
  title: string;
  summary: string;
  authorName?: string | null;
  authorRole?: string | null;
  organization?: string | null;
  link?: string | null;
  order: number;
};

export function ImpactStoryForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: ImpactStoryFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo
          <select name="type" required defaultValue={initialValues?.type ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {impactStoryTypes.map((type) => (
              <option key={type} value={type}>
                {impactStoryTypeLabels[type]}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Ordem de exibição
          <Input name="order" type="number" min={0} defaultValue={initialValues?.order ?? 0} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Título
        <Input name="title" required defaultValue={initialValues?.title} />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Resumo (no depoimento, é a fala citada)
        <Textarea name="summary" required rows={4} defaultValue={initialValues?.summary} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Autor(a) (opcional)
          <Input name="authorName" defaultValue={initialValues?.authorName ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Cargo ou papel (opcional)
          <Input name="authorRole" defaultValue={initialValues?.authorRole ?? ""} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Organização (opcional)
          <Input name="organization" defaultValue={initialValues?.organization ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Link (opcional)
          <Input name="link" placeholder="https://" defaultValue={initialValues?.link ?? ""} />
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar conteúdo"}
      </Button>
    </form>
  );
}
