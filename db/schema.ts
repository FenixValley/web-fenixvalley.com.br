import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  // Default não-administrativo de propósito: quem precisa de acesso ao painel recebe
  // "admin" explicitamente (ver scripts/seed-admin.mjs). Um insert que esqueça o campo
  // não deve criar gestor por omissão — middleware e requireAdmin() exigem role === "admin".
  role: text("role").notNull().default("member"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const volunteers = sqliteTable("volunteers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  area: text("area").notNull(),
  availability: text("availability").notNull(),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const actors = sqliteTable("actors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").unique(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  segment: text("segment").notNull(),
  neighborhood: text("neighborhood").notNull(),
  description: text("description").notNull(),
  site: text("site"),
  email: text("email"),
  whatsapp: text("whatsapp"),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  status: text("status").notNull().default("pending"),
  featured: integer("featured").notNull().default(0),
  highlightLabel: text("highlight_label"),
  details: text("details"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const opportunities = sqliteTable("opportunities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  stage: text("stage").notNull(),
  audience: text("audience").notNull(),
  date: text("date").notNull(),
  owner: text("owner").notNull(),
  link: text("link"),
  featured: integer("featured").notNull().default(0),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const events = sqliteTable("events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").unique(),
  title: text("title").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  date: text("date").notNull(),
  time: text("time").notNull(),
  mode: text("mode").notNull(),
  location: text("location").notNull(),
  link: text("link"),
  audience: text("audience"),
  schedule: text("schedule"),
  organizer: text("organizer").notNull(),
  organizerEmail: text("organizer_email").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const programSettings = sqliteTable("program_settings", {
  slug: text("slug").primaryKey(),
  inscriptionsOpen: integer("inscriptions_open").notNull().default(0)
});

export const programApplications = sqliteTable("program_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  programSlug: text("program_slug").notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const auditLogs = sqliteTable("audit_logs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actorEmail: text("actor_email").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: integer("entity_id"),
  detail: text("detail"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const learningTracks = sqliteTable("learning_tracks", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  order: integer("order").notNull().default(0),
  status: text("status").notNull().default("published"),
  relatedEventCategory: text("related_event_category"),
  relatedOpportunityType: text("related_opportunity_type"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profile: text("profile").notNull(),
  objective: text("objective").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

// --- Issue #6: empresas e inovação corporativa -------------------------------

/** Desafios de inovação aberta publicados por empresas (entram como `pending`). */
export const challenges = sqliteTable("challenges", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  type: text("type").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  expectedOutcome: text("expected_outcome"),
  deadline: text("deadline"),
  company: text("company").notNull(),
  companySegment: text("company_segment"),
  // Contato da empresa: nunca exposto nas rotas públicas, só no admin.
  companyEmail: text("company_email").notNull(),
  companySite: text("company_site"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

/** Soluções e demonstrações de interesse enviadas por startups, pesquisadores e talentos. */
export const challengeProposals = sqliteTable("challenge_proposals", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  challengeId: integer("challenge_id")
    .notNull()
    .references(() => challenges.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  organization: text("organization"),
  profile: text("profile").notNull(),
  solution: text("solution").notNull(),
  link: text("link"),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

// --- Issue #14: parceiros, impacto e governança ------------------------------

/** Parceiros e patrocinadores curados pela coordenação (CRUD só no admin). */
export const partners = sqliteTable("partners", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  name: text("name").notNull(),
  category: text("category").notNull(),
  description: text("description").notNull(),
  contribution: text("contribution").notNull(),
  site: text("site"),
  logoUrl: text("logo_url"),
  since: text("since"),
  founding: integer("founding").notNull().default(0),
  order: integer("order").notNull().default(0),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

/** Candidaturas do formulário "Seja um parceiro" (entram como `pending`). */
export const partnerApplications = sqliteTable("partner_applications", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  organization: text("organization").notNull(),
  contactName: text("contact_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  category: text("category").notNull(),
  supportTypes: text("support_types").notNull(),
  message: text("message").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

/**
 * Indicadores de impacto. `verified` marca o dado conferido pela coordenação —
 * a página pública só exibe indicadores verificados (critério de aceite da issue #14).
 */
export const impactIndicators = sqliteTable("impact_indicators", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  label: text("label").notNull(),
  value: text("value").notNull(),
  period: text("period").notNull(),
  source: text("source").notNull(),
  note: text("note"),
  verified: integer("verified").notNull().default(0),
  order: integer("order").notNull().default(0),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

/** Cases, depoimentos e relatórios de prestação de contas da página de impacto. */
export const impactStories = sqliteTable("impact_stories", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  type: text("type").notNull(),
  title: text("title").notNull(),
  summary: text("summary").notNull(),
  authorName: text("author_name"),
  authorRole: text("author_role"),
  organization: text("organization"),
  link: text("link"),
  order: integer("order").notNull().default(0),
  status: text("status").notNull().default("draft"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});
