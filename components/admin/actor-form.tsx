"use client";

import { useState } from "react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import type { ActorDetails } from "@/lib/actor-details";
import {
  actorTypeLabels,
  actorTypes,
  eventModes,
  spaceUsageTypes,
  startupBusinessModels,
  startupNeeds,
  startupStages,
  startupTechFocus,
  volunteerAvailabilities,
  type InstitutionDetails,
  type InvestorDetails,
  type MentorDetails,
  type SpaceDetails,
  type StartupDetails
} from "@/lib/schemas";

const INSTITUTION_TYPES = ["universidade", "escola-tecnica"];
const INVESTOR_TYPES = ["investidor", "aceleradora"];
const SPACE_TYPES = ["coworking", "laboratorio", "hub"];

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
  whatsapp: string | null;
  lat: number;
  lng: number;
  highlightLabel?: string | null;
  details?: ActorDetails | null;
};

export function ActorForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: ActorFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});
  const [type, setType] = useState(initialValues?.type ?? "");
  const details = initialValues?.details as StartupDetails | undefined;
  const institutionDetails = initialValues?.details as InstitutionDetails | undefined;
  const mentorDetails = initialValues?.details as MentorDetails | undefined;
  const investorDetails = initialValues?.details as InvestorDetails | undefined;
  const spaceDetails = initialValues?.details as SpaceDetails | undefined;

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Nome
        <Input name="name" required defaultValue={initialValues?.name} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo
          <select
            name="type"
            required
            value={type}
            onChange={(event) => setType(event.target.value)}
            className={selectClassName}
          >
            <option value="">Selecione</option>
            {actorTypes.map((option) => (
              <option key={option} value={option}>
                {actorTypeLabels[option]}
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
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Site (opcional)
          <Input name="site" type="url" placeholder="https://" defaultValue={initialValues?.site ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          E-mail de contato (opcional)
          <Input name="email" type="email" placeholder="contato@organizacao.com.br" defaultValue={initialValues?.email ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          WhatsApp (opcional)
          <Input name="whatsapp" type="tel" placeholder="(31) 91234-5678" defaultValue={initialValues?.whatsapp ?? ""} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>

      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Rótulo de destaque (opcional)
        <Input
          name="highlightLabel"
          placeholder='Ex.: "Startup do mês", "Aberta para investimento", "Case de sucesso"'
          defaultValue={initialValues?.highlightLabel ?? ""}
        />
        <span className="block text-xs font-normal text-slate-400">
          Aparece no lugar do rótulo genérico &quot;Destaque&quot; quando o ator estiver marcado como destaque.
        </span>
      </label>

      {type === "startup" ? (
        <fieldset className="space-y-4 rounded-lg border border-white/10 p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-orange-300">
            Detalhes de startup
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Ano de fundação
              <Input name="foundedYear" defaultValue={details?.foundedYear ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Estágio
              <select name="stage" defaultValue={details?.stage ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {startupStages.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Modelo de negócio
            <select name="businessModel" defaultValue={details?.businessModel ?? ""} className={selectClassName}>
              <option value="">Não informado</option>
              {startupBusinessModels.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <CheckboxGroup label="Foco tecnológico" name="techFocus" options={startupTechFocus} defaultValues={details?.techFocus} />
          <CheckboxGroup label="Principais necessidades" name="needs" options={startupNeeds} defaultValues={details?.needs} />
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Fundadores
            <Textarea name="founders" placeholder="Um por linha" defaultValue={details?.founders ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Vídeo do pitch (opcional)
              <Input name="pitchVideoUrl" type="url" placeholder="https://" defaultValue={details?.pitchVideoUrl ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              LinkedIn (opcional)
              <Input name="linkedin" type="url" placeholder="https://" defaultValue={details?.linkedin ?? ""} />
            </label>
          </div>
        </fieldset>
      ) : null}

      {INSTITUTION_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-white/10 p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-orange-300">
            Detalhes da instituição
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Cursos
            <Textarea name="courses" placeholder="Um por linha" defaultValue={institutionDetails?.courses ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Laboratórios
            <Textarea name="labs" placeholder="Um por linha" defaultValue={institutionDetails?.labs ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Linhas de pesquisa
            <Textarea
              name="researchLines"
              placeholder="Um por linha"
              defaultValue={institutionDetails?.researchLines ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Programas de extensão
            <Textarea
              name="extensionPrograms"
              placeholder="Um por linha"
              defaultValue={institutionDetails?.extensionPrograms ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Parcerias
            <Textarea
              name="partnerships"
              placeholder="Um por linha"
              defaultValue={institutionDetails?.partnerships ?? ""}
            />
          </label>
        </fieldset>
      ) : null}

      {type === "mentor" ? (
        <fieldset className="space-y-4 rounded-lg border border-white/10 p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-orange-300">
            Detalhes do mentor
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Especialidades / temas
            <Textarea name="specialties" placeholder="Um por linha" defaultValue={mentorDetails?.specialties ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Experiência
            <Textarea name="experience" defaultValue={mentorDetails?.experience ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Formato
              <select name="format" defaultValue={mentorDetails?.format ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {eventModes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Disponibilidade
              <select name="availability" defaultValue={mentorDetails?.availability ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {volunteerAvailabilities.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Projetos apoiados
            <Textarea
              name="supportedProjects"
              placeholder="Um por linha"
              defaultValue={mentorDetails?.supportedProjects ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            LinkedIn (opcional)
            <Input name="linkedin" type="url" placeholder="https://" defaultValue={mentorDetails?.linkedin ?? ""} />
          </label>
        </fieldset>
      ) : null}

      {INVESTOR_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-white/10 p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-orange-300">
            Detalhes do investidor
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Tese de investimento
            <Textarea name="thesis" defaultValue={investorDetails?.thesis ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Estágio de interesse
              <select name="stage" defaultValue={investorDetails?.stage ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {startupStages.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Região de atuação
              <Input name="region" defaultValue={investorDetails?.region ?? ""} />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Segmentos de interesse
            <Textarea name="segments" placeholder="Um por linha" defaultValue={investorDetails?.segments ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Requisitos para aplicar
            <Textarea name="requirements" defaultValue={investorDetails?.requirements ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            LinkedIn (opcional)
            <Input name="linkedin" type="url" placeholder="https://" defaultValue={investorDetails?.linkedin ?? ""} />
          </label>
        </fieldset>
      ) : null}

      {SPACE_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-white/10 p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-orange-300">
            Detalhes do espaço
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Capacidade
              <Input name="capacity" placeholder="Ex.: até 40 pessoas" defaultValue={spaceDetails?.capacity ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-slate-200">
              Tipo de uso
              <select name="usageType" defaultValue={spaceDetails?.usageType ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {spaceUsageTypes.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Horário de funcionamento
            <Input name="hours" placeholder="Ex.: seg. a sex., 8h-18h" defaultValue={spaceDetails?.hours ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Estrutura disponível
            <Textarea name="amenities" placeholder="Um por linha" defaultValue={spaceDetails?.amenities ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Regras de uso
            <Textarea name="rules" defaultValue={spaceDetails?.rules ?? ""} />
          </label>
        </fieldset>
      ) : null}

      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar ator"}
      </Button>
    </form>
  );
}

function CheckboxGroup({
  label,
  name,
  options,
  defaultValues
}: {
  label: string;
  name: string;
  options: readonly string[];
  defaultValues?: string[];
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-slate-200">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
            <input
              type="checkbox"
              name={name}
              value={option}
              defaultChecked={defaultValues?.includes(option)}
              className="mt-1 h-4 w-4 shrink-0"
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );
}
