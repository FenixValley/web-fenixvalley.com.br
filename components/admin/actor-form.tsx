"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import { actorTypeLabels, actorTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type ActorFormValues = {
  name: string;
  type: string;
  segment: string;
  neighborhood: string;
  description: string;
  site: string | null;
  email: string | null;
  lat: number;
  lng: number;
};

export function ActorForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: ActorFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Nome
        <Input name="name" required defaultValue={initialValues?.name} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo
          <select name="type" required defaultValue={initialValues?.type ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {actorTypes.map((type) => (
              <option key={type} value={type}>
                {actorTypeLabels[type]}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Segmento
          <Input name="segment" required defaultValue={initialValues?.segment} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Bairro/Região
          <Input name="neighborhood" required defaultValue={initialValues?.neighborhood} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Latitude
          <Input name="lat" type="number" step="any" defaultValue={initialValues?.lat} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Longitude
          <Input name="lng" type="number" step="any" defaultValue={initialValues?.lng} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Site (opcional)
          <Input name="site" type="url" placeholder="https://" defaultValue={initialValues?.site ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          E-mail de contato (opcional)
          <Input name="email" type="email" placeholder="contato@organizacao.com.br" defaultValue={initialValues?.email ?? ""} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar ator"}
      </Button>
    </form>
  );
}
