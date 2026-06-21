import { NextResponse } from "next/server";
import { leads } from "@/db/schema";
import { getDb } from "@/lib/db";
import { leadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        errors: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  await getDb().insert(leads).values(parsed.data);

  return NextResponse.json({
    ok: true,
    message: "Cadastro recebido. A comunidade Fênix Valley entra em contato pelo e-mail informado."
  });
}
