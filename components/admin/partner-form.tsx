"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import { partnerCategories } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type PartnerFormValues = {
  name: string;
  category: string;
  description: string;
  contribution: string;
  site?: string | null;
  logoUrl?: string | null;
  since?: string | null;
  founding: number;
  order: number;
};

export function PartnerForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: PartnerFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Nome do parceiro
        <Input name="name" required defaultValue={initialValues?.name} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Categoria de apoio
          <select name="category" required defaultValue={initialValues?.category ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {partnerCategories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Parceiro desde (opcional)
          <Input name="since" placeholder="Ex.: 2026" defaultValue={initialValues?.since ?? ""} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Como apoia o movimento
        <Textarea name="contribution" required rows={4} defaultValue={initialValues?.contribution} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Site (opcional)
          <Input name="site" placeholder="https://" defaultValue={initialValues?.site ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          URL do logo (opcional)
          <Input name="logoUrl" placeholder="https://" defaultValue={initialValues?.logoUrl ?? ""} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Ordem de exibição
          <Input name="order" type="number" min={0} defaultValue={initialValues?.order ?? 0} />
        </label>
        <label className="flex items-center gap-3 pt-8 text-sm font-semibold text-slate-200">
          <input
            type="checkbox"
            name="founding"
            className="h-4 w-4"
            defaultChecked={Boolean(initialValues?.founding)}
          />
          Parceiro fundador
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar parceiro"}
      </Button>
    </form>
  );
}
