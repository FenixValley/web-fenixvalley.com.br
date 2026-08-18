import {
  institutionDetailsSchema,
  investorDetailsSchema,
  mentorDetailsSchema,
  spaceDetailsSchema,
  startupDetailsSchema,
  type InstitutionDetails,
  type InvestorDetails,
  type MentorDetails,
  type SpaceDetails,
  type StartupDetails
} from "@/lib/schemas";

export type ActorDetails = StartupDetails | InstitutionDetails | MentorDetails | InvestorDetails | SpaceDetails;

/**
 * `actors.details` guarda um JSON cujo shape depende de `actors.type`.
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

  if (type === "mentor") {
    const parsed = mentorDetailsSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  if (type === "investidor" || type === "aceleradora") {
    const parsed = investorDetailsSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  if (type === "coworking" || type === "laboratorio" || type === "hub") {
    const parsed = spaceDetailsSchema.safeParse(json);
    return parsed.success ? parsed.data : null;
  }

  return null;
}
