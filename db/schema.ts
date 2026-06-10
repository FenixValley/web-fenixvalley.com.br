import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
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
  name: text("name").notNull(),
  type: text("type").notNull(),
  segment: text("segment").notNull(),
  neighborhood: text("neighborhood").notNull(),
  description: text("description").notNull(),
  site: text("site"),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  status: text("status").notNull().default("pending"),
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
  status: text("status").notNull().default("published"),
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

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profile: text("profile").notNull(),
  objective: text("objective").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});
