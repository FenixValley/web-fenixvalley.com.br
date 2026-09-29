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
  "flex h-11 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

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
  // `initialValues.details` foi parseado com o tipo persistido, então só vale para ele.
  // Sem esse recorte, trocar o tipo no formulário faria o novo fieldset herdar valores de
  // chaves homônimas de outro schema (`stage` existe em startup e investidor; `linkedin`,
  // em três deles) e o submit persistiria esse dado alheio.
  const savedType = initialValues?.type;
  const detailsIf = (types: string[]) =>
    savedType && types.includes(savedType) ? initialValues?.details : undefined;

  const startupDetails = detailsIf(["startup"]) as StartupDetails | undefined;
  const institutionDetails = detailsIf(INSTITUTION_TYPES) as InstitutionDetails | undefined;
  const mentorDetails = detailsIf(["mentor"]) as MentorDetails | undefined;
  const investorDetails = detailsIf(INVESTOR_TYPES) as InvestorDetails | undefined;
  const spaceDetails = detailsIf(SPACE_TYPES) as SpaceDetails | undefined;

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Nome
        <Input name="name" required defaultValue={initialValues?.name} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-foreground">
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
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Segmento
          <Input name="segment" required defaultValue={initialValues?.segment} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Bairro/Região
          <Input name="neighborhood" required defaultValue={initialValues?.neighborhood} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Latitude
          <Input name="lat" type="number" step="any" defaultValue={initialValues?.lat} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Longitude
          <Input name="lng" type="number" step="any" defaultValue={initialValues?.lng} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          Site (opcional)
          <Input name="site" type="url" placeholder="https://" defaultValue={initialValues?.site ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          E-mail de contato (opcional)
          <Input name="email" type="email" placeholder="contato@organizacao.com.br" defaultValue={initialValues?.email ?? ""} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-foreground">
          WhatsApp (opcional)
          <Input name="whatsapp" type="tel" placeholder="(31) 91234-5678" defaultValue={initialValues?.whatsapp ?? ""} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>

      <label className="block space-y-2 text-sm font-semibold text-foreground">
        Rótulo de destaque (opcional)
        <Input
          name="highlightLabel"
          placeholder='Ex.: "Startup do mês", "Aberta para investimento", "Case de sucesso"'
          defaultValue={initialValues?.highlightLabel ?? ""}
        />
        <span className="block text-xs font-normal text-muted-foreground">
          Aparece no lugar do rótulo genérico &quot;Destaque&quot; quando o ator estiver marcado como destaque.
        </span>
      </label>

      {type === "startup" ? (
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-accent">
            Detalhes de startup
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Ano de fundação
              <Input name="foundedYear" defaultValue={startupDetails?.foundedYear ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Estágio
              <select name="stage" defaultValue={startupDetails?.stage ?? ""} className={selectClassName}>
                <option value="">Não informado</option>
                {startupStages.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Modelo de negócio
            <select name="businessModel" defaultValue={startupDetails?.businessModel ?? ""} className={selectClassName}>
              <option value="">Não informado</option>
              {startupBusinessModels.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>
          <CheckboxGroup label="Foco tecnológico" name="techFocus" options={startupTechFocus} defaultValues={startupDetails?.techFocus} />
          <CheckboxGroup label="Principais necessidades" name="needs" options={startupNeeds} defaultValues={startupDetails?.needs} />
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Fundadores
            <Textarea name="founders" placeholder="Um por linha" defaultValue={startupDetails?.founders ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Vídeo do pitch (opcional)
              <Input name="pitchVideoUrl" type="url" placeholder="https://" defaultValue={startupDetails?.pitchVideoUrl ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              LinkedIn (opcional)
              <Input name="linkedin" type="url" placeholder="https://" defaultValue={startupDetails?.linkedin ?? ""} />
            </label>
          </div>
        </fieldset>
      ) : null}

      {INSTITUTION_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-accent">
            Detalhes da instituição
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Cursos
            <Textarea name="courses" placeholder="Um por linha" defaultValue={institutionDetails?.courses ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Laboratórios
            <Textarea name="labs" placeholder="Um por linha" defaultValue={institutionDetails?.labs ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Linhas de pesquisa
            <Textarea
              name="researchLines"
              placeholder="Um por linha"
              defaultValue={institutionDetails?.researchLines ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Programas de extensão
            <Textarea
              name="extensionPrograms"
              placeholder="Um por linha"
              defaultValue={institutionDetails?.extensionPrograms ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
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
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-accent">
            Detalhes do mentor
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Especialidades / temas
            <Textarea name="specialties" placeholder="Um por linha" defaultValue={mentorDetails?.specialties ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Experiência
            <Textarea name="experience" defaultValue={mentorDetails?.experience ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-foreground">
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
            <label className="block space-y-2 text-sm font-semibold text-foreground">
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
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Projetos apoiados
            <Textarea
              name="supportedProjects"
              placeholder="Um por linha"
              defaultValue={mentorDetails?.supportedProjects ?? ""}
            />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            LinkedIn (opcional)
            <Input name="linkedin" type="url" placeholder="https://" defaultValue={mentorDetails?.linkedin ?? ""} />
          </label>
        </fieldset>
      ) : null}

      {INVESTOR_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-accent">
            Detalhes do investidor
          </legend>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Tese de investimento
            <Textarea name="thesis" defaultValue={investorDetails?.thesis ?? ""} />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-foreground">
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
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Região de atuação
              <Input name="region" defaultValue={investorDetails?.region ?? ""} />
            </label>
          </div>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Segmentos de interesse
            <Textarea name="segments" placeholder="Um por linha" defaultValue={investorDetails?.segments ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Requisitos para aplicar
            <Textarea name="requirements" defaultValue={investorDetails?.requirements ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            LinkedIn (opcional)
            <Input name="linkedin" type="url" placeholder="https://" defaultValue={investorDetails?.linkedin ?? ""} />
          </label>
        </fieldset>
      ) : null}

      {SPACE_TYPES.includes(type) ? (
        <fieldset className="space-y-4 rounded-lg border border-border p-4">
          <legend className="px-1 text-sm font-bold uppercase tracking-[0.1em] text-accent">
            Detalhes do espaço
          </legend>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block space-y-2 text-sm font-semibold text-foreground">
              Capacidade
              <Input name="capacity" placeholder="Ex.: até 40 pessoas" defaultValue={spaceDetails?.capacity ?? ""} />
            </label>
            <label className="block space-y-2 text-sm font-semibold text-foreground">
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
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Horário de funcionamento
            <Input name="hours" placeholder="Ex.: seg. a sex., 8h-18h" defaultValue={spaceDetails?.hours ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Estrutura disponível
            <Textarea name="amenities" placeholder="Um por linha" defaultValue={spaceDetails?.amenities ?? ""} />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
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
      <p className="text-sm font-semibold text-foreground">{label}</p>
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-2 text-sm leading-6 text-muted-foreground">
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
