"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actors, auditLogs, opportunities, volunteers } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { actorSchema, opportunitySchema } from "@/lib/schemas";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email) throw new Error("Não autorizado.");
  return session.user.email;
}

async function logAudit(actorEmail: string, action: string, entity: string, entityId: number | null, detail?: string) {
  await getDb().insert(auditLogs).values({ actorEmail, action, entity, entityId, detail });
}

export async function setVolunteerStatus(id: number, status: "approved" | "rejected") {
  const adminEmail = await requireAdmin();
  await getDb().update(volunteers).set({ status }).where(eq(volunteers.id, id));
  await logAudit(adminEmail, status, "volunteer", id);
  revalidatePath("/admin/voluntarios");
  revalidatePath("/admin");
}

export async function setActorStatus(id: number, status: "approved" | "rejected") {
  const adminEmail = await requireAdmin();
  await getDb().update(actors).set({ status }).where(eq(actors.id, id));
  await logAudit(adminEmail, status, "actor", id);
  revalidatePath("/admin/atores");
  revalidatePath("/admin");
}

export async function setOpportunityStatus(id: number, status: "published" | "archived") {
  const adminEmail = await requireAdmin();
  await getDb().update(opportunities).set({ status }).where(eq(opportunities.id, id));
  await logAudit(adminEmail, status, "opportunity", id);
  revalidatePath("/admin/oportunidades");
  revalidatePath("/admin");
}

export type FormState = { error?: string };

export async function upsertActor(id: number | null, _previous: FormState, formData: FormData): Promise<FormState> {
  const adminEmail = await requireAdmin();
  const parsed = actorSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const data = {
    ...parsed.data,
    site: parsed.data.site || null,
    lat: parsed.data.lat ?? BETIM_CENTER.lat,
    lng: parsed.data.lng ?? BETIM_CENTER.lng
  };
  const db = getDb();
  if (id === null) {
    const [created] = await db.insert(actors).values({ ...data, status: "approved" }).returning({ id: actors.id });
    await logAudit(adminEmail, "create", "actor", created?.id ?? null, data.name);
  } else {
    await db.update(actors).set(data).where(eq(actors.id, id));
    await logAudit(adminEmail, "update", "actor", id, data.name);
  }
  revalidatePath("/admin/atores");
  redirect("/admin/atores");
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
  const db = getDb();
  if (id === null) {
    const [created] = await db
      .insert(opportunities)
      .values({ ...parsed.data, status: "published" })
      .returning({ id: opportunities.id });
    await logAudit(adminEmail, "create", "opportunity", created?.id ?? null, parsed.data.title);
  } else {
    await db.update(opportunities).set(parsed.data).where(eq(opportunities.id, id));
    await logAudit(adminEmail, "update", "opportunity", id, parsed.data.title);
  }
  revalidatePath("/admin/oportunidades");
  redirect("/admin/oportunidades");
}
