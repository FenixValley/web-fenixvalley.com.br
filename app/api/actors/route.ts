import { and, eq, like, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { actors } from "@/db/schema";
import { uniqueActorSlug } from "@/lib/actor-slug";
import { getDb } from "@/lib/db";
import { actorFiltersSchema, actorRegisterSchema } from "@/lib/schemas";
import { insertWithUniqueSlug } from "@/lib/unique-slug";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const filters = actorFiltersSchema.safeParse({
    type: url.searchParams.get("type") ?? undefined,
    q: url.searchParams.get("q") ?? undefined
  });
  if (!filters.success) {
    return NextResponse.json({ ok: false, errors: filters.error.flatten().fieldErrors }, { status: 400 });
  }
  const { type, q } = filters.data;

  const conditions = [eq(actors.status, "approved")];
  if (type) conditions.push(eq(actors.type, type));
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(like(actors.name, pattern), like(actors.neighborhood, pattern))!);
  }

  // Seleção explícita: este endpoint é público e alimenta o mapa e as vitrines.
  // Canais de contato (email/whatsapp) só aparecem na ficha individual do ator,
  // para não expor a lista inteira de contatos em um único JSON coletável.
  const rows = await getDb()
    .select({
      id: actors.id,
      slug: actors.slug,
      name: actors.name,
      type: actors.type,
      segment: actors.segment,
      neighborhood: actors.neighborhood,
      description: actors.description,
      site: actors.site,
      lat: actors.lat,
      lng: actors.lng,
      featured: actors.featured,
      highlightLabel: actors.highlightLabel,
      details: actors.details
    })
    .from(actors)
    .where(and(...conditions));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = actorRegisterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { consent: _consent, ...data } = parsed.data;
  const db = getDb();
  await insertWithUniqueSlug(
    "actors",
    () => uniqueActorSlug(db, data.name),
    (slug) =>
      db.insert(actors).values({
        ...data,
        slug,
        site: data.site || null,
        email: data.email || null,
        lat: data.lat ?? BETIM_CENTER.lat,
        lng: data.lng ?? BETIM_CENTER.lng,
        status: "pending"
      })
  );

  return NextResponse.json({
    ok: true,
    message: "Cadastro recebido! Ele aparece no mapa assim que for aprovado pela curadoria."
  });
}
