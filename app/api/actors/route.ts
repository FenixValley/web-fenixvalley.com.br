import { and, eq, like, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { actorSchema } from "@/lib/schemas";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const q = url.searchParams.get("q");

  const conditions = [eq(actors.status, "approved")];
  if (type) conditions.push(eq(actors.type, type));
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(like(actors.name, pattern), like(actors.neighborhood, pattern))!);
  }

  const rows = await getDb()
    .select()
    .from(actors)
    .where(and(...conditions));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = actorSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  await getDb().insert(actors).values({
    ...data,
    site: data.site || null,
    lat: data.lat ?? BETIM_CENTER.lat,
    lng: data.lng ?? BETIM_CENTER.lng,
    status: "pending"
  });

  return NextResponse.json({
    ok: true,
    message: "Cadastro recebido! Ele aparece no mapa assim que for aprovado pela curadoria."
  });
}
