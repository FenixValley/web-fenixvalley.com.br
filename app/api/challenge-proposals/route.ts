import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { challengeProposals, challenges } from "@/db/schema";
import { getDb } from "@/lib/db";
import { challengeProposalSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = challengeProposalSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { consent: _consent, challengeId, ...data } = parsed.data;
  const db = getDb();

  // Só aceita proposta para desafio realmente publicado — evita gravar propostas
  // em desafios pendentes, rejeitados ou arquivados via id chutado.
  const challenge = await db.query.challenges.findFirst({
    where: and(eq(challenges.id, challengeId), eq(challenges.status, "published")),
    columns: { id: true }
  });
  if (!challenge) {
    return NextResponse.json({ ok: false, message: "Desafio não encontrado ou encerrado." }, { status: 404 });
  }

  await db.insert(challengeProposals).values({
    ...data,
    challengeId,
    organization: data.organization || null,
    link: data.link || null,
    status: "pending"
  });

  return NextResponse.json({
    ok: true,
    message: "Proposta enviada! A curadoria valida o envio e conecta você com a empresa."
  });
}
