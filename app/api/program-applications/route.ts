import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getProgram } from "@/data/programs";
import { programApplications, programSettings } from "@/db/schema";
import { getDb } from "@/lib/db";
import { programApplicationSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = programApplicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { consent: _consent, ...data } = parsed.data;

  if (!getProgram(data.programSlug)) {
    return NextResponse.json({ ok: false, message: "Programa não encontrado." }, { status: 404 });
  }

  const db = getDb();
  const settings = await db.query.programSettings.findFirst({
    where: eq(programSettings.slug, data.programSlug)
  });
  if (!settings?.inscriptionsOpen) {
    return NextResponse.json(
      { ok: false, message: "As inscrições deste programa não estão abertas no momento." },
      { status: 409 }
    );
  }

  await db.insert(programApplications).values({
    ...data,
    organization: data.organization || null
  });

  return NextResponse.json({
    ok: true,
    message: "Inscrição recebida! A coordenação do programa entra em contato pelo e-mail informado."
  });
}
