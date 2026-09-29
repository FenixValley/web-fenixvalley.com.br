import { NextResponse } from "next/server";
import { partnerApplications } from "@/db/schema";
import { getDb } from "@/lib/db";
import { partnerApplicationSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = partnerApplicationSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, errors: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const { consent: _consent, supportTypes, ...data } = parsed.data;
  await getDb()
    .insert(partnerApplications)
    .values({
      ...data,
      phone: data.phone || null,
      supportTypes: JSON.stringify(supportTypes),
      status: "pending"
    });

  return NextResponse.json({
    ok: true,
    message: "Proposta de parceria recebida! A coordenação retorna com os próximos passos."
  });
}
