import {
  institutionDetailsSchema,
  startupDetailsSchema,
  type InstitutionDetails,
  type StartupDetails
} from "@/lib/schemas";

export type ActorDetails = StartupDetails | InstitutionDetails;

/**
 * `actors.details` guarda um JSON cujo shape depende de `actors.type`. Tipos sem schema
 * definido ainda (mentor, investidor, espaço — issue #13) retornam null.
 */
export function parseActorDetails(type: string, raw: string | null): ActorDetails | null {
  if (!raw) return null;

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }

  if (type === "startup") {
    const parsed = startupDetailsSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  if (type === "universidade" || type === "escola-tecnica") {
    const parsed = institutionDetailsSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  return null;
}
