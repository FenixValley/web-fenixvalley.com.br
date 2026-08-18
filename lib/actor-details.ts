import { startupDetailsSchema, type StartupDetails } from "@/lib/schemas";

/**
 * `actors.details` guarda um JSON cujo shape depende de `actors.type`. Tipos sem schema
 * definido ainda (universidade, mentor, investidor, espaço — issues #11/#13) retornam null.
 */
export function parseActorDetails(type: string, raw: string | null): StartupDetails | null {
  if (!raw) return null;
  if (type !== "startup") return null;

  let json: unknown;
  try {
    json = JSON.parse(raw);
  } catch {
    return null;
  }

  const parsed = startupDetailsSchema.safeParse(json);
  return parsed.success ? parsed.data : null;
}
