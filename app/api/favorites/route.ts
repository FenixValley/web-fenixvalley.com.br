import { NextResponse } from "next/server";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { userFavorites, users } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

const favoriteSchema = z.object({
  itemType: z.enum(["opportunity", "event", "challenge", "content", "actor"]),
  itemId: z.string().min(1),
  title: z.string().min(1),
  subtitle: z.string().optional(),
  link: z.string().min(1)
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Não autenticado." }, { status: 401 });
  }

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email)
  });

  if (!user) {
    return NextResponse.json({ ok: false, error: "Usuário não encontrado." }, { status: 404 });
  }

  const favorites = await db
    .select()
    .from(userFavorites)
    .where(eq(userFavorites.userId, user.id));

  return NextResponse.json({ ok: true, favorites });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Não autenticado." }, { status: 401 });
  }

  const payload = await request.json().catch(() => null);
  const parsed = favoriteSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: "Dados inválidos." }, { status: 400 });
  }

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email)
  });

  if (!user) {
    return NextResponse.json({ ok: false, error: "Usuário não encontrado." }, { status: 404 });
  }

  const { itemType, itemId, title, subtitle, link } = parsed.data;

  // Toggle: se já existe, remove; se não existe, insere
  const existing = await db.query.userFavorites.findFirst({
    where: and(
      eq(userFavorites.userId, user.id),
      eq(userFavorites.itemType, itemType),
      eq(userFavorites.itemId, itemId)
    )
  });

  if (existing) {
    await db
      .delete(userFavorites)
      .where(eq(userFavorites.id, existing.id));
    return NextResponse.json({ ok: true, favorited: false, message: "Item removido dos favoritos." });
  }

  await db.insert(userFavorites).values({
    userId: user.id,
    itemType,
    itemId,
    title,
    subtitle: subtitle ?? null,
    link
  });

  return NextResponse.json({ ok: true, favorited: true, message: "Item salvo nos favoritos!" });
}

export async function DELETE(request: Request) {
  const session = await auth();
  if (!session?.user?.email) {
    return NextResponse.json({ ok: false, error: "Não autenticado." }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const idParam = searchParams.get("id");
  if (!idParam) {
    return NextResponse.json({ ok: false, error: "ID obrigatório." }, { status: 400 });
  }

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email)
  });

  if (!user) {
    return NextResponse.json({ ok: false, error: "Usuário não encontrado." }, { status: 404 });
  }

  await db
    .delete(userFavorites)
    .where(and(eq(userFavorites.id, Number(idParam)), eq(userFavorites.userId, user.id)));

  return NextResponse.json({ ok: true, message: "Removido com sucesso." });
}
