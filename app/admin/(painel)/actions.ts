"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import {
  actors,
  auditLogs,
  events,
  learningTracks,
  opportunities,
  programApplications,
  programSettings,
  volunteers
} from "@/db/schema";
import { uniqueActorSlug } from "@/lib/actor-slug";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import {
  actorSchema,
  institutionDetailsSchema,
  investorDetailsSchema,
  learningTrackSchema,
  mentorDetailsSchema,
  opportunitySchema,
  spaceDetailsSchema,
  startupDetailsSchema
} from "@/lib/schemas";
import { slugify } from "@/lib/slug";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email || session.user.role !== "admin") throw new Error("Não autorizado.");
  return session.user.email;
}

async function logAudit(actorEmail: string, action: string, entity: string, entityId: number | null, detail?: string) {
  await getDb().insert(auditLogs).values({ actorEmail, action, entity, entityId, detail });
}

/**
 * Monta o insert de auditoria sem executá-lo, para ser combinado com a escrita
 * principal em um único db.batch() atômico (D1 não suporta BEGIN/COMMIT).
 */
function auditEntry(
  db: ReturnType<typeof getDb>,
  actorEmail: string,
  action: string,
  entity: string,
  entityId: number | null,
  detail?: string
) {
  return db.insert(auditLogs).values({ actorEmail, action, entity, entityId, detail });
}

export async function setVolunteerStatus(id: number, status: "approved" | "rejected") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(volunteers).set({ status }).where(eq(volunteers.id, id)),
    auditEntry(db, adminEmail, status, "volunteer", id)
  ]);
  revalidatePath("/admin/voluntarios");
  revalidatePath("/admin");
}

export async function setActorStatus(id: number, status: "approved" | "rejected") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(actors).set({ status }).where(eq(actors.id, id)),
    auditEntry(db, adminEmail, status, "actor", id)
  ]);
  revalidatePath("/admin/atores");
  revalidatePath("/admin");
}

export async function setActorFeatured(id: number, featured: boolean) {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db
      .update(actors)
      .set({ featured: featured ? 1 : 0 })
      .where(eq(actors.id, id)),
    auditEntry(db, adminEmail, featured ? "feature" : "unfeature", "actor", id)
  ]);
  revalidatePath("/admin/atores");
}

export async function setOpportunityFeatured(id: number, featured: boolean) {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db
      .update(opportunities)
      .set({ featured: featured ? 1 : 0 })
      .where(eq(opportunities.id, id)),
    auditEntry(db, adminEmail, featured ? "feature" : "unfeature", "opportunity", id)
  ]);
  revalidatePath("/admin/oportunidades");
}

export async function setOpportunityStatus(id: number, status: "published" | "archived") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(opportunities).set({ status }).where(eq(opportunities.id, id)),
    auditEntry(db, adminEmail, status, "opportunity", id)
  ]);
  revalidatePath("/admin/oportunidades");
  revalidatePath("/admin");
}

export async function setEventStatus(id: number, status: "approved" | "rejected" | "archived") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(events).set({ status }).where(eq(events.id, id)),
    auditEntry(db, adminEmail, status, "event", id)
  ]);
  revalidatePath("/admin/eventos");
  revalidatePath("/admin");
  revalidatePath("/eventos");
}

export async function setProgramInscriptions(slug: string, open: boolean) {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db
      .insert(programSettings)
      .values({ slug, inscriptionsOpen: open ? 1 : 0 })
      .onConflictDoUpdate({
        target: programSettings.slug,
        set: { inscriptionsOpen: open ? 1 : 0 }
      }),
    auditEntry(db, adminEmail, open ? "open-inscriptions" : "close-inscriptions", "program", null, slug)
  ]);
  revalidatePath("/admin/programas");
}

export async function setProgramApplicationStatus(id: number, status: "approved" | "rejected") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(programApplications).set({ status }).where(eq(programApplications.id, id)),
    auditEntry(db, adminEmail, status, "program-application", id)
  ]);
  revalidatePath("/admin/programas");
}

export type FormState = { error?: string };

function serializeActorDetails(type: string, formData: FormData): { error: string } | { details: string | null } {
  if (type === "startup") {
    const parsed = startupDetailsSchema.safeParse({
      foundedYear: formData.get("foundedYear"),
      stage: formData.get("stage"),
      businessModel: formData.get("businessModel"),
      techFocus: formData.getAll("techFocus"),
      founders: formData.get("founders"),
      pitchVideoUrl: formData.get("pitchVideoUrl"),
      linkedin: formData.get("linkedin"),
      needs: formData.getAll("needs")
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return { error: first ?? "Revise os campos de detalhes da startup." };
    }
    return { details: serializeCleaned(parsed.data) };
  }

  if (type === "universidade" || type === "escola-tecnica") {
    const parsed = institutionDetailsSchema.safeParse({
      courses: formData.get("courses"),
      labs: formData.get("labs"),
      researchLines: formData.get("researchLines"),
      extensionPrograms: formData.get("extensionPrograms"),
      partnerships: formData.get("partnerships")
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return { error: first ?? "Revise os campos de detalhes da instituição." };
    }
    return { details: serializeCleaned(parsed.data) };
  }

  if (type === "mentor") {
    const parsed = mentorDetailsSchema.safeParse({
      specialties: formData.get("specialties"),
      experience: formData.get("experience"),
      format: formData.get("format"),
      availability: formData.get("availability"),
      linkedin: formData.get("linkedin"),
      supportedProjects: formData.get("supportedProjects")
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return { error: first ?? "Revise os campos de detalhes do mentor." };
    }
    return { details: serializeCleaned(parsed.data) };
  }

  if (type === "investidor" || type === "aceleradora") {
    const parsed = investorDetailsSchema.safeParse({
      thesis: formData.get("thesis"),
      stage: formData.get("stage"),
      segments: formData.get("segments"),
      region: formData.get("region"),
      requirements: formData.get("requirements"),
      linkedin: formData.get("linkedin")
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return { error: first ?? "Revise os campos de detalhes do investidor." };
    }
    return { details: serializeCleaned(parsed.data) };
  }

  if (type === "coworking" || type === "laboratorio" || type === "hub") {
    const parsed = spaceDetailsSchema.safeParse({
      capacity: formData.get("capacity"),
      amenities: formData.get("amenities"),
      usageType: formData.get("usageType"),
      hours: formData.get("hours"),
      rules: formData.get("rules")
    });
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
      return { error: first ?? "Revise os campos de detalhes do espaço." };
    }
    return { details: serializeCleaned(parsed.data) };
  }

  return { details: null };
}

function serializeCleaned(data: Record<string, unknown>): string | null {
  const cleaned = Object.fromEntries(
    Object.entries(data).filter(([, value]) => (Array.isArray(value) ? value.length > 0 : Boolean(value)))
  );
  return Object.keys(cleaned).length > 0 ? JSON.stringify(cleaned) : null;
}

export async function upsertActor(id: number | null, _previous: FormState, formData: FormData): Promise<FormState> {
  const adminEmail = await requireAdmin();
  const parsed = actorSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }

  const detailsResult = serializeActorDetails(parsed.data.type, formData);
  if ("error" in detailsResult) return { error: detailsResult.error };

  const highlightLabel = formData.get("highlightLabel")?.toString().trim() || null;

  const data = {
    ...parsed.data,
    site: parsed.data.site || null,
    email: parsed.data.email || null,
    whatsapp: parsed.data.whatsapp || null,
    lat: parsed.data.lat ?? BETIM_CENTER.lat,
    lng: parsed.data.lng ?? BETIM_CENTER.lng,
    highlightLabel,
    details: detailsResult.details
  };
  const db = getDb();
  if (id === null) {
    const [created] = await db
      .insert(actors)
      .values({ ...data, slug: await uniqueActorSlug(db, data.name), status: "approved" })
      .returning({ id: actors.id });
    await logAudit(adminEmail, "create", "actor", created?.id ?? null, data.name);
  } else {
    await db.update(actors).set(data).where(eq(actors.id, id));
    await logAudit(adminEmail, "update", "actor", id, data.name);
  }
  revalidatePath("/admin/atores");
  redirect("/admin/atores");
}

async function uniqueLearningTrackSlug(db: ReturnType<typeof getDb>, title: string, excludeId?: number): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  for (;;) {
    const existing = await db.query.learningTracks.findFirst({
      where: eq(learningTracks.slug, slug),
      columns: { id: true }
    });
    if (!existing || existing.id === excludeId) return slug;
    slug = `${base}-${suffix++}`;
  }
}

export async function upsertLearningTrack(
  id: number | null,
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const adminEmail = await requireAdmin();
  const parsed = learningTrackSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const data = {
    ...parsed.data,
    relatedEventCategory: parsed.data.relatedEventCategory || null,
    relatedOpportunityType: parsed.data.relatedOpportunityType || null
  };
  const db = getDb();
  if (id === null) {
    const slug = await uniqueLearningTrackSlug(db, data.title);
    const [created] = await db
      .insert(learningTracks)
      .values({ ...data, slug, status: "published" })
      .returning({ id: learningTracks.id });
    await logAudit(adminEmail, "create", "learning-track", created?.id ?? null, data.title);
  } else {
    await db.batch([
      db.update(learningTracks).set(data).where(eq(learningTracks.id, id)),
      auditEntry(db, adminEmail, "update", "learning-track", id, data.title)
    ]);
  }
  revalidatePath("/admin/trilhas");
  revalidatePath("/universidades");
  redirect("/admin/trilhas");
}

export async function setLearningTrackStatus(id: number, status: "published" | "draft") {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.update(learningTracks).set({ status }).where(eq(learningTracks.id, id)),
    auditEntry(db, adminEmail, status, "learning-track", id)
  ]);
  revalidatePath("/admin/trilhas");
  revalidatePath("/universidades");
}

export async function deleteLearningTrack(id: number) {
  const adminEmail = await requireAdmin();
  const db = getDb();
  await db.batch([
    db.delete(learningTracks).where(eq(learningTracks.id, id)),
    auditEntry(db, adminEmail, "delete", "learning-track", id)
  ]);
  revalidatePath("/admin/trilhas");
  revalidatePath("/universidades");
}

export async function upsertOpportunity(
  id: number | null,
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  const adminEmail = await requireAdmin();
  const parsed = opportunitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const data = { ...parsed.data, link: parsed.data.link || null };
  const db = getDb();
  if (id === null) {
    const [created] = await db
      .insert(opportunities)
      .values({ ...data, status: "published" })
      .returning({ id: opportunities.id });
    await logAudit(adminEmail, "create", "opportunity", created?.id ?? null, data.title);
  } else {
    await db.update(opportunities).set(data).where(eq(opportunities.id, id));
    await logAudit(adminEmail, "update", "opportunity", id, data.title);
  }
  revalidatePath("/admin/oportunidades");
  redirect("/admin/oportunidades");
}
