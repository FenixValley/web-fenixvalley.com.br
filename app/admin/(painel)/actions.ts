"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actors, opportunities, volunteers } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { actorSchema, opportunitySchema } from "@/lib/schemas";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado.");
}

export async function setVolunteerStatus(id: number, status: "approved" | "rejected") {
  await requireAdmin();
  await getDb().update(volunteers).set({ status }).where(eq(volunteers.id, id));
  revalidatePath("/admin/voluntarios");
  revalidatePath("/admin");
}

export async function setActorStatus(id: number, status: "approved" | "rejected") {
  await requireAdmin();
  await getDb().update(actors).set({ status }).where(eq(actors.id, id));
  revalidatePath("/admin/atores");
  revalidatePath("/admin");
}

export async function setOpportunityStatus(id: number, status: "published" | "archived") {
  await requireAdmin();
  await getDb().update(opportunities).set({ status }).where(eq(opportunities.id, id));
  revalidatePath("/admin/oportunidades");
  revalidatePath("/admin");
}

export type FormState = { error?: string };

export async function upsertActor(id: number | null, _previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
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
    await db.insert(actors).values({ ...data, status: "approved" });
  } else {
    await db.update(actors).set(data).where(eq(actors.id, id));
  }
  revalidatePath("/admin/atores");
  redirect("/admin/atores");
}

export async function upsertOpportunity(
  id: number | null,
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();
  const parsed = opportunitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const db = getDb();
  if (id === null) {
    await db.insert(opportunities).values({ ...parsed.data, status: "published" });
  } else {
    await db.update(opportunities).set(parsed.data).where(eq(opportunities.id, id));
  }
  revalidatePath("/admin/oportunidades");
  redirect("/admin/oportunidades");
}
