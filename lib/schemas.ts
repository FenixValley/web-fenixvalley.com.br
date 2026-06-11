import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  profile: z.string().min(2, "Escolha seu perfil."),
  objective: z.string().min(10, "Conte em uma frase como quer participar.")
});

export type LeadInput = z.infer<typeof leadSchema>;

// z.literal(true, { message }) não aplica a mensagem customizada (invalid_literal);
// o refine garante o aviso em pt-BR nos formulários.
const consentField = (message: string) =>
  z.boolean({ message }).refine((value) => value === true, { message });

export const volunteerAreas = [
  "Tecnologia e produto",
  "Design e conteúdo",
  "Eventos e comunidade",
  "Educação e mentorias",
  "Captação e parcerias",
  "Gestão e operações"
] as const;

export const volunteerAvailabilities = [
  "Algumas horas por mês",
  "Algumas horas por semana",
  "Pontual em eventos"
] as const;

export const volunteerSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().optional().or(z.literal("")),
  area: z.enum(volunteerAreas, { message: "Escolha uma área de atuação." }),
  availability: z.enum(volunteerAvailabilities, { message: "Escolha sua disponibilidade." }),
  motivation: z.string().min(10, "Conte em uma frase por que quer ser voluntário(a)."),
  consent: consentField("É preciso autorizar o uso dos dados.")
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const actorTypes = [
  "startup",
  "empresa",
  "universidade",
  "escola-tecnica",
  "coworking",
  "laboratorio",
  "hub",
  "investidor",
  "aceleradora",
  "incubadora",
  "poder-publico",
  "comunidade"
] as const;

export const actorTypeLabels: Record<(typeof actorTypes)[number], string> = {
  startup: "Startup",
  empresa: "Empresa",
  universidade: "Universidade",
  "escola-tecnica": "Escola técnica",
  coworking: "Coworking",
  laboratorio: "Laboratório",
  hub: "Hub de inovação",
  investidor: "Investidor",
  aceleradora: "Aceleradora",
  incubadora: "Incubadora",
  "poder-publico": "Poder público",
  comunidade: "Comunidade"
};

export const actorSchema = z.object({
  name: z.string().min(2, "Informe o nome da organização."),
  type: z.enum(actorTypes, { message: "Escolha o tipo de organização." }),
  segment: z.string().min(2, "Informe o segmento ou área."),
  neighborhood: z.string().min(2, "Informe o bairro ou região."),
  description: z.string().min(10, "Descreva a organização em uma frase."),
  email: z.string().email("Informe um e-mail válido.").optional().or(z.literal("")),
  site: z
    .string()
    .url("Informe uma URL válida.")
    .refine(
      (value) => {
        try {
          const protocol = new URL(value).protocol;
          return protocol === "https:" || protocol === "http:";
        } catch {
          return false;
        }
      },
      { message: "Use uma URL http(s)." }
    )
    .optional()
    .or(z.literal("")),
  lat: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().min(-90).max(90).optional()
  ),
  lng: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().min(-180).max(180).optional()
  )
});

export type ActorInput = z.infer<typeof actorSchema>;

export const actorRegisterSchema = actorSchema.extend({
  consent: consentField("É preciso autorizar a publicação dos dados.")
});

export type ActorRegisterInput = z.infer<typeof actorRegisterSchema>;

export const opportunityTypes = ["Meetup", "Programa", "Mentoria", "Comunidade", "Capital"] as const;
export const opportunityStages = ["Aberto", "Curadoria", "Em breve"] as const;

export const opportunitySchema = z.object({
  title: z.string().min(3, "Informe o título."),
  type: z.enum(opportunityTypes, { message: "Escolha o tipo." }),
  stage: z.enum(opportunityStages, { message: "Escolha o estágio." }),
  audience: z.string().min(3, "Informe o público."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."),
  owner: z.string().min(2, "Informe o responsável.")
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;

export const programApplicationSchema = z.object({
  programSlug: z.string().min(2),
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  organization: z.string().optional().or(z.literal("")),
  motivation: z.string().min(10, "Conte em uma frase por que quer participar."),
  consent: consentField("É preciso autorizar o uso dos dados.")
});

export type ProgramApplicationInput = z.infer<typeof programApplicationSchema>;
