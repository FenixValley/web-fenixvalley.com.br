"use client";

import { CheckCircle2, Send } from "lucide-react";
import { useMemo, useState, useTransition, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GOOGLE_FORM_ACTION,
  MAPA_FORM_SECTIONS,
  ROLE_FIELD,
  type MapaField,
  type MapaSection,
} from "@/data/mapa-form";

type FieldValue = string | string[];
type FormState = Record<string, FieldValue>;

function emptyValue(field: MapaField): FieldValue {
  return field.type === "checkbox" ? [] : "";
}

function isEmpty(value: FieldValue | undefined): boolean {
  return Array.isArray(value) ? value.length === 0 : !value?.toString().trim();
}

export function ActorRegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [values, setValues] = useState<FormState>(() => {
    const initial: FormState = {};
    for (const section of MAPA_FORM_SECTIONS) {
      for (const field of section.fields) initial[field.entry] = emptyValue(field);
    }
    return initial;
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);
  const [isPending, startTransition] = useTransition();

  const role = (values[ROLE_FIELD] as string) ?? "";

  const visibleSections = useMemo(
    () =>
      MAPA_FORM_SECTIONS.filter(
        (section) => section.showWhenRole === null || section.showWhenRole === role
      ),
    [role]
  );

  function clearError(entry: string) {
    setErrors((prev) => {
      if (!prev[entry]) return prev;
      const next = { ...prev };
      delete next[entry];
      return next;
    });
  }

  function setValue(entry: string, value: FieldValue) {
    setValues((prev) => ({ ...prev, [entry]: value }));
    clearError(entry);
  }

  function toggleCheckbox(entry: string, option: string, checked: boolean) {
    setValues((prev) => {
      const current = Array.isArray(prev[entry]) ? (prev[entry] as string[]) : [];
      const next = checked ? [...current, option] : current.filter((item) => item !== option);
      return { ...prev, [entry]: next };
    });
    clearError(entry);
  }

  function validate(): boolean {
    const nextErrors: Record<string, string> = {};
    for (const section of visibleSections) {
      for (const field of section.fields) {
        if (field.required && isEmpty(values[field.entry])) {
          nextErrors[field.entry] = "Campo obrigatório";
        }
      }
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!validate()) return;

    startTransition(async () => {
      const body = new URLSearchParams();
      for (const section of visibleSections) {
        for (const field of section.fields) {
          const value = values[field.entry];
          if (Array.isArray(value)) {
            value.forEach((option) => body.append(field.entry, option));
          } else if (value?.toString().trim()) {
            body.append(field.entry, value.toString());
          }
        }
      }

      try {
        // Google Forms não envia cabeçalhos CORS: usamos no-cors (resposta opaca).
        // O envio é aceito mesmo sem conseguirmos ler o status da resposta.
        await fetch(GOOGLE_FORM_ACTION, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        });
      } catch {
        // rede/opaco — seguimos com confirmação otimista
      }

      setDone(true);
      onSuccess?.();
    });
  }

  function resetForm() {
    const initial: FormState = {};
    for (const section of MAPA_FORM_SECTIONS) {
      for (const field of section.fields) initial[field.entry] = emptyValue(field);
    }
    setValues(initial);
    setErrors({});
    setDone(false);
  }

  if (done) {
    return (
      <div className="space-y-4 py-4 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-secondary" />
        <div className="space-y-1">
          <p className="text-base font-semibold text-foreground">Cadastro enviado!</p>
          <p className="text-sm text-muted-foreground">
            Recebemos as informações da sua organização no mapeamento do ecossistema Fênix Valley.
          </p>
        </div>
        <Button type="button" variant="outline" onClick={resetForm}>
          Enviar outro cadastro
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6" noValidate>
      {visibleSections.map((section) => (
        <FormSection
          key={section.title}
          section={section}
          values={values}
          errors={errors}
          onText={setValue}
          onToggle={toggleCheckbox}
        />
      ))}

      <div className="flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar cadastro"}
        </Button>
        <p className="text-xs text-muted-foreground">
          As informações vão para o mapeamento oficial do Fênix Valley.
        </p>
      </div>
    </form>
  );
}

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

function FormSection({
  section,
  values,
  errors,
  onText,
  onToggle,
}: {
  section: MapaSection;
  values: FormState;
  errors: Record<string, string>;
  onText: (entry: string, value: FieldValue) => void;
  onToggle: (entry: string, option: string, checked: boolean) => void;
}) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-sm font-bold uppercase tracking-[0.14em] text-secondary">
        {section.title}
      </legend>
      {section.fields.map((field) => {
        const error = errors[field.entry];
        return (
          <div key={field.entry} className="space-y-2">
            <p className="text-sm font-semibold text-foreground">
              {field.label}
              {field.required ? <span className="ml-1 text-destructive">*</span> : null}
            </p>

            {field.type === "short" ? (
              <Input
                value={(values[field.entry] as string) ?? ""}
                onChange={(event) => onText(field.entry, event.target.value)}
              />
            ) : null}

            {field.type === "paragraph" ? (
              <Textarea
                value={(values[field.entry] as string) ?? ""}
                onChange={(event) => onText(field.entry, event.target.value)}
              />
            ) : null}

            {field.type === "radio" ? (
              field.options.length > 6 ? (
                <select
                  className={selectClassName}
                  value={(values[field.entry] as string) ?? ""}
                  onChange={(event) => onText(field.entry, event.target.value)}
                >
                  <option value="">Selecione</option>
                  {field.options.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              ) : (
                <div className="space-y-2">
                  {field.options.map((option) => (
                    <label
                      key={option}
                      className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <input
                        type="radio"
                        name={field.entry}
                        value={option}
                        checked={values[field.entry] === option}
                        onChange={() => onText(field.entry, option)}
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )
            ) : null}

            {field.type === "checkbox" ? (
              <div className="space-y-2">
                {field.options.map((option) => {
                  const selected = Array.isArray(values[field.entry])
                    ? (values[field.entry] as string[]).includes(option)
                    : false;
                  return (
                    <label
                      key={option}
                      className="flex items-start gap-3 text-sm leading-6 text-muted-foreground"
                    >
                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={(event) => onToggle(field.entry, option, event.target.checked)}
                        className="mt-1 h-4 w-4 shrink-0"
                      />
                      {option}
                    </label>
                  );
                })}
              </div>
            ) : null}

            {error ? <span className="block text-xs text-destructive">{error}</span> : null}
          </div>
        );
      })}
    </fieldset>
  );
}
