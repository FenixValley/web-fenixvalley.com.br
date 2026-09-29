"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { LogIn, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { EditorialShell } from "@/components/editorial/editorial-shell";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (password !== confirmPassword) {
      setError("As senhas informadas não conferem.");
      return;
    }

    setIsPending(true);
    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setError(data.error ?? "Não foi possível criar a conta.");
        setIsPending(false);
        return;
      }

      router.push("/login?registered=1");
    } catch {
      setError("Erro ao conectar com o servidor. Tente novamente.");
      setIsPending(false);
    }
  };

  return (
    <EditorialShell active="/cadastro">
      <main
        id="main-content"
        tabIndex={-1}
        className="flex min-h-[calc(100vh-160px)] items-center justify-center px-4 py-16 outline-none"
      >
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
              Novo Membro
            </p>
            <h1 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
              Cadastre-se no Fênix Valley
            </h1>
            <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
              Faça parte da rede de empreendedores, estudantes, mentores e empresas de Betim.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
              Nome completo
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Seu nome"
                className="mt-1"
              />
            </label>

            <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
              E-mail
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                required
                placeholder="seu@email.com"
                className="mt-1"
              />
            </label>

            <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
              Senha (mínimo 6 caracteres)
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="mt-1"
              />
            </label>

            <label className="block space-y-1.5 font-body text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
              Confirmar senha
              <Input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                required
                placeholder="••••••••"
                className="mt-1"
              />
            </label>

            {error ? (
              <p className="rounded-md border border-destructive/30 bg-destructive/10 p-3 font-body text-xs font-medium text-destructive">
                {error}
              </p>
            ) : null}

            <Button type="submit" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]" disabled={isPending}>
              <UserPlus className="h-4 w-4" />
              {isPending ? "Criando conta..." : "Criar conta gratuita"}
            </Button>
          </form>

          <div className="border-t pt-5 text-center font-body text-xs space-y-3" style={{ borderColor: "var(--fx-line)", color: "var(--fx-muted)" }}>
            <p>Já possui cadastro?</p>
            <Button asChild variant="outline" size="sm" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
              <Link href="/login">
                <LogIn className="h-4 w-4" />
                Fazer login
              </Link>
            </Button>
          </div>
        </div>
      </main>
    </EditorialShell>
  );
}
