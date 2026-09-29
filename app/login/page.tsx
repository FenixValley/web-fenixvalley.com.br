"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { LogIn, UserPlus } from "lucide-react";
import { useActionState, Suspense } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <div className="surface-panel w-full max-w-md space-y-6 rounded-2xl p-8 sm:p-10">
      <div className="space-y-2 text-center">
        <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">Comunidade</p>
        <h1 className="font-[var(--font-space)] text-2xl font-black text-foreground">
          Entrar na Área do Membro
        </h1>
        <p className="text-sm text-muted-foreground">
          Acesse suas oportunidades salvas, acompanhe inscrições e gerencie seu perfil.
        </p>
      </div>

      {registered ? (
        <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/10 p-3.5 text-center text-xs text-emerald-400 font-medium">
          Conta criada com sucesso! Faça login com seu e-mail e senha.
        </div>
      ) : null}

      <form action={formAction} className="space-y-4">
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <label className="block space-y-2 text-sm font-semibold text-foreground">
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

        <label className="block space-y-2 text-sm font-semibold text-foreground">
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
          <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-xs font-medium text-destructive">
            {state.error}
          </p>
        ) : null}

        <Button type="submit" className="w-full gap-2" disabled={isPending}>
          <LogIn className="h-4 w-4" />
          {isPending ? "Entrando..." : "Entrar"}
        </Button>
      </form>

      <div className="border-t border-border pt-5 text-center text-xs text-muted-foreground space-y-2">
        <p>Ainda não tem conta no Fênix Valley?</p>
        <Button asChild variant="outline" size="sm" className="w-full gap-2 border-border">
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
    <>
      <SiteHeader />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-[calc(100vh-140px)] items-center justify-center px-4 py-16 outline-none"
      >
        <Suspense fallback={<div className="text-muted-foreground">Carregando...</div>}>
          <LoginForm />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
