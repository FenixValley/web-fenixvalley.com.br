import { NextResponse } from "next/server";
import { z } from "zod";
import { getDb } from "@/lib/db";
import { leads } from "@/db/schema";

const newsletterSchema = z.object({
  email: z.string().email("Informe um e-mail válido.")
});

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = newsletterSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "E-mail inválido." },
      { status: 400 }
    );
  }

  // Salva como lead com perfil genérico de newsletter
  await getDb().insert(leads).values({
    email: parsed.data.email,
    name: "Newsletter",
    profile: "newsletter",
    objective: "Inscrito via formulário do rodapé do site."
  });

  return NextResponse.json({
    ok: true,
    message: "Inscrição confirmada! Em breve você receberá novidades do Fênix Valley."
  });
}
