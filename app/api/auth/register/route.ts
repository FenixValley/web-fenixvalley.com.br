import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "@/db/schema";
import { getDb } from "@/lib/db";
import { hashPassword } from "@/lib/password";

const registerSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres."),
  email: z.string().email("Informe um e-mail válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres.")
});

export async function POST(request: Request) {
  try {
    const payload = await request.json().catch(() => null);
    const parsed = registerSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;
    const db = getDb();

    const existing = await db.query.users.findFirst({
      where: eq(users.email, email.toLowerCase().trim())
    });

    if (existing) {
      return NextResponse.json(
        { ok: false, error: "Este e-mail já está cadastrado. Faça login para continuar." },
        { status: 409 }
      );
    }

    const passwordHash = await hashPassword(password);

    await db.insert(users).values({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role: "member"
    });

    return NextResponse.json({
      ok: true,
      message: "Cadastro realizado com sucesso! Você já pode fazer login."
    });
  } catch (error) {
    console.error("Erro no cadastro de membro:", error);
    return NextResponse.json(
      { ok: false, error: "Erro interno no servidor ao processar o cadastro." },
      { status: 500 }
    );
  }
}
