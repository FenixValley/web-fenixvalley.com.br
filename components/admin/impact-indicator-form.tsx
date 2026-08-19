"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";

type ImpactIndicatorFormValues = {
  label: string;
  value: string;
  period: string;
  source: string;
  note?: string | null;
  verified: number;
  order: number;
};

export function ImpactIndicatorForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: ImpactIndicatorFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Indicador
        <Input name="label" required placeholder="Ex.: Startups apoiadas" defaultValue={initialValues?.label} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Valor apurado
          <Input name="value" required placeholder="Ex.: 18 ou R$ 1,2 mi" defaultValue={initialValues?.value} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Período
          <Input name="period" required placeholder="Ex.: 2026" defaultValue={initialValues?.period} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Fonte do dado
        <Input
          name="source"
          required
          placeholder="Ex.: Registros do portal, relatório do programa, pesquisa com participantes"
          defaultValue={initialValues?.source}
        />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Observação (opcional)
        <Textarea name="note" defaultValue={initialValues?.note ?? ""} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Ordem de exibição
          <Input name="order" type="number" min={0} defaultValue={initialValues?.order ?? 0} />
        </label>
        <label className="flex items-center gap-3 pt-8 text-sm font-semibold text-slate-200">
          <input
            type="checkbox"
            name="verified"
            className="h-4 w-4"
            defaultChecked={Boolean(initialValues?.verified)}
          />
          Dado conferido — publicar em /impacto
        </label>
      </div>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar indicador"}
      </Button>
    </form>
  );
}
