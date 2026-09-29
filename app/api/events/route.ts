import { and, eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { events } from "@/db/schema";
import { getDb } from "@/lib/db";
import { uniqueEventSlug } from "@/lib/event-slug";
import { eventSchema } from "@/lib/schemas";
import { insertWithUniqueSlug } from "@/lib/unique-slug";

export async function GET() {
  const today = new Date().toISOString().slice(0, 10);
  const rows = await getDb()
    .select()
    .from(events)
    .where(and(eq(events.status, "approved"), gte(events.date, today)))
    .orderBy(events.date, events.time);
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = eventSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { consent: _consent, ...data } = parsed.data;
  const db = getDb();
  await insertWithUniqueSlug(
    "events",
    () => uniqueEventSlug(db, data.title),
    (slug) =>
      db.insert(events).values({
        ...data,
        slug,
        link: data.link || null,
        audience: data.audience || null,
        schedule: data.schedule || null,
        status: "pending"
      })
  );

  return NextResponse.json({
    ok: true,
    message: "Evento recebido! Ele entra na agenda assim que for aprovado pela curadoria."
  });
}
