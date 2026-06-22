"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { editorialThemeStyle } from "@/components/editorial/theme";
import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <main className="flex min-h-screen items-center justify-center px-4 font-body text-foreground" style={editorialThemeStyle}>
      <div
        className="w-full max-w-sm space-y-6 rounded-lg border p-6 shadow-crisp"
        style={{ background: "var(--fx-paper)", borderColor: "var(--fx-line)" }}
      >
        <div className="space-y-2">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.18em] text-primary">Área dos gestores</p>
          <h1 className="font-display text-2xl font-black text-foreground">Fênix Valley Admin</h1>
        </div>
        <form action={formAction} className="space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            E-mail
            <Input name="email" type="email" required placeholder="gestor@fenixvalley.com.br" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-foreground">
            Senha
            <Input name="password" type="password" required placeholder="••••••••" />
          </label>
          {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            <LogIn className="h-4 w-4" />
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
