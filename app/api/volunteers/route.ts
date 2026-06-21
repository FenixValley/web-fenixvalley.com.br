import { NextResponse } from "next/server";
import { volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";
import { volunteerSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = volunteerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { consent: _consent, ...data } = parsed.data;
  await getDb().insert(volunteers).values({
    ...data,
    phone: data.phone || null
  });

  return NextResponse.json({
    ok: true,
    message: "Inscrição recebida! A coordenação do Fênix Valley entra em contato pelo e-mail informado."
  });
}
