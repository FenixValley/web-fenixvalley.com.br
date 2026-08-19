import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { challenges } from "@/db/schema";
import { uniqueChallengeSlug } from "@/lib/challenge-slug";
import { openChallengesWhere } from "@/lib/challenges";
import { todayInBusinessTimeZone } from "@/lib/date";
import { getDb } from "@/lib/db";
import { challengeSchema } from "@/lib/schemas";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const category = url.searchParams.get("categoria");
  const type = url.searchParams.get("tipo");

  const conditions = [openChallengesWhere(todayInBusinessTimeZone())];
  if (category) conditions.push(eq(challenges.category, category));
  if (type) conditions.push(eq(challenges.type, type));

  // Seleção explícita: o e-mail de contato da empresa fica restrito ao admin —
  // as propostas chegam pelo formulário do portal, não por contato direto.
  const rows = await getDb()
    .select({
      id: challenges.id,
      slug: challenges.slug,
      title: challenges.title,
      type: challenges.type,
      category: challenges.category,
      description: challenges.description,
      expectedOutcome: challenges.expectedOutcome,
      deadline: challenges.deadline,
      company: challenges.company,
      companySegment: challenges.companySegment,
      companySite: challenges.companySite,
      createdAt: challenges.createdAt
    })
    .from(challenges)
    .where(and(...conditions))
    .orderBy(challenges.deadline, challenges.title);

  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = challengeSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { consent: _consent, ...data } = parsed.data;
  const db = getDb();
  await db.insert(challenges).values({
    ...data,
    slug: await uniqueChallengeSlug(db, data.title),
    expectedOutcome: data.expectedOutcome || null,
    deadline: data.deadline || null,
    companySegment: data.companySegment || null,
    companySite: data.companySite || null,
    status: "pending"
  });

  return NextResponse.json({
    ok: true,
    message: "Desafio recebido! Ele é publicado assim que passar pela curadoria do Fênix Valley."
  });
}
