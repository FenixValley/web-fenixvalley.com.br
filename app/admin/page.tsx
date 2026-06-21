"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, ShieldAlert } from "lucide-react";
import { ADMIN_EMAIL } from "@/lib/firebase";

export default function AdminLoginPage() {
  const { signIn, user, signOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (email !== ADMIN_EMAIL) {
      setError("Acesso restrito a administradores.");
      setLoading(false);
      return;
    }

    try {
      await signIn(email, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Erro ao autenticar.";
      if (msg.includes("invalid-credential") || msg.includes("wrong-password") || msg.includes("user-not-found")) {
        setError("E-mail ou senha incorretos.");
      } else {
        setError("Ocorreu um erro. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogoutWrongUser = async () => {
    await signOut();
    window.location.reload();
  };

  if (user && user.email !== ADMIN_EMAIL) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <div className="surface-panel w-full max-w-md rounded-2xl p-8 text-center space-y-5">
          <ShieldAlert className="mx-auto h-12 w-12 text-red-500" />
          <h2 className="text-xl font-bold text-white">Acesso Negado</h2>
          <p className="text-slate-400">
            Você está logado como <strong className="text-white">{user.email}</strong>, mas este usuário não tem privilégios de administrador.
          </p>
          <button
            onClick={handleLogoutWrongUser}
            className="w-full rounded-xl bg-red-500/20 py-3 text-sm font-bold text-red-400 transition-colors hover:bg-red-500/30"
          >
            Sair e tentar novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
      <div className="surface-panel w-full max-w-md rounded-2xl p-8 space-y-6">
        <div className="text-center space-y-2">
          <ShieldAlert className="mx-auto h-10 w-10 text-orange-500" />
          <h1 className="font-[var(--font-space)] text-2xl font-black text-white">
            Painel Admin
          </h1>
          <p className="text-sm text-slate-400">Acesso restrito a organizadores.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              E-mail Administrativo
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              placeholder={ADMIN_EMAIL}
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              placeholder="••••••••"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3.5 text-sm font-bold text-white transition-all hover:bg-orange-600 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Entrar no Painel"}
          </button>
        </form>
      </div>
    </div>
  );
}
