"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { useActionState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { memberLoginAction, type MemberLoginState } from "./actions";

function LoginForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/membro";
  const registered = searchParams.get("registered");
  const [state, formAction, isPending] = useActionState<MemberLoginState, FormData>(
    memberLoginAction,
    {}
  );

  return (
    <div
      className="w-full max-w-md space-y-6 rounded-2xl p-8 sm:p-10"
      style={{
        background: "var(--fx-paper)",
        border: "1px solid var(--fx-line)",
        boxShadow: "0 10px 40px rgba(10, 16, 32, 0.06)"
      }}
    >
      <div className="space-y-2 text-center">
        <p className="font-mono text-xs font-bold uppercase tracking-[0.18em]" style={{ color: "var(--fx-accent)" }}>
          Comunidade
        </p>
        <h1 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
          Entrar na Área do Membro
        </h1>
        <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
          Acesse suas oportunidades salvas, acompanhe inscrições e gerencie seu perfil.
        </p>
      </div>

      {registered ? (
        <div
          className="rounded-lg border p-3.5 text-center font-body text-xs font-medium"
          style={{ borderColor: "rgba(16, 185, 129, 0.3)", background: "rgba(16, 185, 129, 0.08)", color: "rgb(5, 150, 105)" }}
        >
          Conta criada com sucesso! Faça login com seu e-mail e senha.
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
          E-mail
          <Input
            name="email"
            type="email"
            required
            placeholder="seu@email.com"
            autoComplete="email"
            className="mt-1"
          />
        </label>

        <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
          Senha
          <Input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            autoComplete="current-password"
            className="mt-1"
          />
        </label>

        {state.error ? (
          <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 font-body text-xs font-medium text-destructive">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]" disabled={isPending}>
          <LogIn className="h-4 w-4" />
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="border-t pt-5 text-center font-body text-xs space-y-3" style={{ borderColor: "var(--fx-line)", color: "var(--fx-muted)" }}>
        <p>Ainda não tem conta no Fênix Valley?</p>
        <Button asChild variant="outline" size="sm" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
          <Link href="/cadastro">
            <UserPlus className="h-4 w-4" />
            Criar conta de membro gratuitamente
          </Link>
        </Button>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <EditorialShell active="/login">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 outline-none"
      >
        <Suspense fallback={<div className="font-body text-sm text-muted-foreground">Carregando...</div>}>
          <LoginForm />
        </Suspense>
      </main>
    </EditorialShell>
  );
}
