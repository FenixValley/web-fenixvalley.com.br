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

const httpUrlField = (message: string) =>
  z
    .string()
    .url(message)
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
    );

const whatsappField = z
  .string()
  .refine((value) => /^\+?\d{10,15}$/.test(value.replace(/[\s()-]/g, "")), {
    message: "Informe um WhatsApp válido, com DDD (ex.: (31) 91234-5678)."
  });

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
  "mentor",
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
  mentor: "Mentor(a)",
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
  site: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  whatsapp: whatsappField.optional().or(z.literal("")),
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

export const startupStages = [
  "Ideação",
  "Validação / MVP",
  "Tração",
  "Escala"
] as const;

export const startupBusinessModels = ["B2B", "B2C", "B2B2C", "B2G / GovTech", "Marketplace"] as const;

export const startupTechFocus = [
  "Inteligência Artificial",
  "IoT / Hardware",
  "Blockchain / Web3",
  "Cloud / SaaS",
  "Big Data / Analytics",
  "Web / Mobile",
  "No-code / Low-code"
] as const;

export const startupNeeds = [
  "Investimento",
  "Clientes",
  "Parceiros",
  "Programas de aceleração",
  "Talentos"
] as const;

export const startupDetailsSchema = z.object({
  foundedYear: z.string().optional().or(z.literal("")),
  stage: z.enum(startupStages).optional().or(z.literal("")),
  businessModel: z.enum(startupBusinessModels).optional().or(z.literal("")),
  techFocus: z.array(z.enum(startupTechFocus)).optional(),
  founders: z.string().optional().or(z.literal("")),
  pitchVideoUrl: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  linkedin: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  needs: z.array(z.enum(startupNeeds)).optional()
});

export type StartupDetails = z.infer<typeof startupDetailsSchema>;

export const institutionDetailsSchema = z.object({
  courses: z.string().optional().or(z.literal("")),
  labs: z.string().optional().or(z.literal("")),
  researchLines: z.string().optional().or(z.literal("")),
  extensionPrograms: z.string().optional().or(z.literal("")),
  partnerships: z.string().optional().or(z.literal(""))
});

export type InstitutionDetails = z.infer<typeof institutionDetailsSchema>;

export const opportunityTypes = [
  "Meetup",
  "Programa",
  "Mentoria",
  "Comunidade",
  "Capital",
  "Edital",
  "Bolsa",
  "Vaga",
  "Estágio",
  "Desafio",
  "Evento",
  "Parceria",
  "Premiação"
] as const;
export const opportunityStages = ["Aberto", "Curadoria", "Em breve"] as const;

export const opportunitySchema = z.object({
  title: z.string().min(3, "Informe o título."),
  type: z.enum(opportunityTypes, { message: "Escolha o tipo." }),
  stage: z.enum(opportunityStages, { message: "Escolha o estágio." }),
  audience: z.string().min(3, "Informe o público."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."),
  owner: z.string().min(2, "Informe o responsável."),
  link: httpUrlField("Informe uma URL válida.").optional().or(z.literal(""))
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;

export const eventCategories = [
  "Meetup",
  "Palestra",
  "Workshop",
  "Hackathon",
  "Conferência",
  "Demo Day",
  "Curso",
  "Networking",
  "Acadêmico"
] as const;

export const eventModes = ["Presencial", "Online", "Híbrido"] as const;

export const eventSchema = z.object({
  title: z.string().min(3, "Informe o nome do evento."),
  category: z.enum(eventCategories, { message: "Escolha a categoria." }),
  description: z.string().min(10, "Descreva o evento em uma frase."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."),
  time: z.string().regex(/^\d{2}:\d{2}$/, "Use o formato HH:MM."),
  mode: z.enum(eventModes, { message: "Escolha a modalidade." }),
  location: z.string().min(3, "Informe o local ou o link da transmissão."),
  link: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  audience: z.string().optional().or(z.literal("")),
  schedule: z.string().optional().or(z.literal("")),
  organizer: z.string().min(2, "Informe quem organiza."),
  organizerEmail: z.string().email("Informe um e-mail válido."),
  consent: consentField("É preciso autorizar a publicação dos dados.")
});

export type EventInput = z.infer<typeof eventSchema>;

export const programApplicationSchema = z.object({
  programSlug: z.string().min(2),
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  organization: z.string().optional().or(z.literal("")),
  motivation: z.string().min(10, "Conte em uma frase por que quer participar."),
  consent: consentField("É preciso autorizar o uso dos dados.")
});

export type ProgramApplicationInput = z.infer<typeof programApplicationSchema>;

export const mentorDetailsSchema = z.object({
  specialties: z.string().optional().or(z.literal("")),
  experience: z.string().optional().or(z.literal("")),
  format: z.enum(eventModes).optional().or(z.literal("")),
  availability: z.enum(volunteerAvailabilities).optional().or(z.literal("")),
  linkedin: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  supportedProjects: z.string().optional().or(z.literal(""))
});

export type MentorDetails = z.infer<typeof mentorDetailsSchema>;

export const investorDetailsSchema = z.object({
  thesis: z.string().optional().or(z.literal("")),
  stage: z.enum(startupStages).optional().or(z.literal("")),
  segments: z.string().optional().or(z.literal("")),
  region: z.string().optional().or(z.literal("")),
  requirements: z.string().optional().or(z.literal("")),
  linkedin: httpUrlField("Informe uma URL válida.").optional().or(z.literal(""))
});

export type InvestorDetails = z.infer<typeof investorDetailsSchema>;

export const spaceUsageTypes = ["Coworking", "Sala de reunião", "Auditório / Evento", "Laboratório"] as const;

export const spaceDetailsSchema = z.object({
  capacity: z.string().optional().or(z.literal("")),
  amenities: z.string().optional().or(z.literal("")),
  usageType: z.enum(spaceUsageTypes).optional().or(z.literal("")),
  hours: z.string().optional().or(z.literal("")),
  rules: z.string().optional().or(z.literal(""))
});

export type SpaceDetails = z.infer<typeof spaceDetailsSchema>;

export const learningTrackIcons = [
  "Lightbulb",
  "Presentation",
  "Megaphone",
  "Cpu",
  "Sparkles",
  "Wallet",
  "Rocket",
  "TrendingUp",
  "Banknote",
  "Landmark",
  "Factory",
  "ShieldCheck"
] as const;

export const learningTrackSchema = z.object({
  title: z.string().min(3, "Informe o título da trilha."),
  description: z.string().min(10, "Descreva a trilha em uma frase."),
  icon: z.enum(learningTrackIcons, { message: "Escolha um ícone." }),
  order: z.preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().int().min(0)).default(0),
  relatedEventCategory: z.enum(eventCategories).optional().or(z.literal("")),
  relatedOpportunityType: z.enum(opportunityTypes).optional().or(z.literal(""))
});

export type LearningTrackInput = z.infer<typeof learningTrackSchema>;

// --- Issue #6: desafios de inovação aberta -----------------------------------

/** Checkbox de FormData: vem como "on" quando marcado e ausente quando não. */
const checkboxField = z.preprocess((value) => value === "on" || value === "true" || value === true, z.boolean());

/**
 * Data AAAA-MM-DD que também precisa existir no calendário: só a regex aceitaria
 * 2026-02-31, que o Date normaliza silenciosamente para 03/03 ao ser formatada.
 */
const calendarDateField = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD.")
  .refine(
    (value) => {
      const [year, month, day] = value.split("-").map(Number);
      const date = new Date(Date.UTC(year, month - 1, day));
      return date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day;
    },
    { message: "Informe uma data que exista no calendário." }
  );

export const challengeTypes = [
  "Desafio de inovação",
  "Prova de conceito",
  "Parceria estratégica",
  "Vaga e talentos"
] as const;

export const challengeCategories = [
  "Automação",
  "Eficiência energética",
  "Logística",
  "Mobilidade",
  "ESG",
  "Resíduos",
  "Inteligência artificial",
  "IoT",
  "Indústria 4.0",
  "Segurança",
  "Transformação digital"
] as const;

export const challengeSchema = z.object({
  title: z.string().min(5, "Informe o título do desafio."),
  type: z.enum(challengeTypes, { message: "Escolha o tipo de chamada." }),
  category: z.enum(challengeCategories, { message: "Escolha a categoria do desafio." }),
  description: z.string().min(30, "Descreva o desafio em pelo menos duas frases."),
  expectedOutcome: z.string().optional().or(z.literal("")),
  deadline: calendarDateField.optional().or(z.literal("")),
  company: z.string().min(2, "Informe o nome da empresa."),
  companySegment: z.string().optional().or(z.literal("")),
  companyEmail: z.string().email("Informe um e-mail válido."),
  companySite: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  consent: consentField("É preciso autorizar a publicação do desafio.")
});

export type ChallengeInput = z.infer<typeof challengeSchema>;

export const proposalProfiles = [
  "Startup",
  "Pesquisador(a) ou grupo de pesquisa",
  "Profissional ou talento",
  "Empresa",
  "Estudante"
] as const;

export const challengeProposalSchema = z.object({
  challengeId: z.coerce.number().int().positive(),
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  organization: z.string().optional().or(z.literal("")),
  profile: z.enum(proposalProfiles, { message: "Escolha seu perfil." }),
  solution: z.string().min(30, "Descreva a solução ou o interesse em pelo menos duas frases."),
  link: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  consent: consentField("É preciso autorizar o envio dos dados à empresa.")
});

export type ChallengeProposalInput = z.infer<typeof challengeProposalSchema>;

// --- Issue #14: parceiros, impacto e governança ------------------------------

export const partnerCategories = [
  "Institucional",
  "Acadêmico",
  "Empresarial",
  "Tecnológico",
  "Financeiro e patrocínio",
  "Mídia e comunicação"
] as const;

export const partnerSchema = z.object({
  name: z.string().min(2, "Informe o nome do parceiro."),
  category: z.enum(partnerCategories, { message: "Escolha a categoria de apoio." }),
  description: z.string().min(10, "Descreva o parceiro em uma frase."),
  contribution: z.string().min(10, "Descreva como o parceiro apoia o movimento."),
  site: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  logoUrl: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  since: z.string().optional().or(z.literal("")),
  founding: checkboxField.default(false),
  order: z
    .preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().int().min(0))
    .default(0)
});

export type PartnerInput = z.infer<typeof partnerSchema>;

export const partnerSupportTypes = [
  "Espaços para encontros e turmas",
  "Mentoria e especialistas",
  "Desafios de inovação aberta",
  "Patrocínio de eventos e programas",
  "Tecnologia e ferramentas",
  "Bolsas e financiamento",
  "Divulgação e mídia"
] as const;

export const partnerApplicationSchema = z.object({
  organization: z.string().min(2, "Informe o nome da organização."),
  contactName: z.string().min(3, "Informe o nome de quem fala pela organização."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().optional().or(z.literal("")),
  category: z.enum(partnerCategories, { message: "Escolha a categoria de apoio." }),
  supportTypes: z.array(z.enum(partnerSupportTypes)).min(1, "Escolha ao menos uma forma de apoio."),
  message: z.string().min(20, "Conte como sua organização quer contribuir."),
  consent: consentField("É preciso autorizar o contato da coordenação.")
});

export type PartnerApplicationInput = z.infer<typeof partnerApplicationSchema>;

export const impactIndicatorSchema = z.object({
  label: z.string().min(3, "Informe o nome do indicador."),
  value: z.string().min(1, "Informe o valor apurado."),
  period: z.string().min(4, "Informe o período de apuração (ex.: 2026 ou 1º semestre de 2026)."),
  source: z.string().min(3, "Informe a fonte do dado — indicadores sem origem não são publicados."),
  note: z.string().optional().or(z.literal("")),
  verified: checkboxField.default(false),
  order: z
    .preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().int().min(0))
    .default(0)
});

export type ImpactIndicatorInput = z.infer<typeof impactIndicatorSchema>;

export const impactStoryTypes = ["case", "depoimento", "relatorio"] as const;

export const impactStoryTypeLabels: Record<(typeof impactStoryTypes)[number], string> = {
  case: "Case",
  depoimento: "Depoimento",
  relatorio: "Relatório"
};

export const impactStorySchema = z.object({
  type: z.enum(impactStoryTypes, { message: "Escolha o tipo de conteúdo." }),
  title: z.string().min(3, "Informe o título."),
  summary: z.string().min(20, "Escreva um resumo com pelo menos duas frases."),
  authorName: z.string().optional().or(z.literal("")),
  authorRole: z.string().optional().or(z.literal("")),
  organization: z.string().optional().or(z.literal("")),
  link: httpUrlField("Informe uma URL válida.").optional().or(z.literal("")),
  order: z
    .preprocess((value) => (value === "" || value === null ? undefined : value), z.coerce.number().int().min(0))
    .default(0)
});

export type ImpactStoryInput = z.infer<typeof impactStorySchema>;
