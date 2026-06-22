"use client";

import { ArrowUpRight, CheckCircle2, Loader2, XCircle } from "lucide-react";
import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!email.trim()) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await res.json();

      if (res.ok && data.ok) {
        setStatus("success");
        setMessage(data.message);
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error ?? "Algo deu errado. Tente novamente.");
      }
    } catch {
      setStatus("error");
      setMessage("Falha de conexão. Tente novamente.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-md border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 lg:self-end">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
        <p className="text-sm text-emerald-200">{message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-3 sm:grid-cols-[1fr_auto] lg:self-end">
      <label className="sr-only" htmlFor="footer-email">
        E-mail para newsletter
      </label>
      <div className="flex flex-col gap-1.5">
        <input
          id="footer-email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="seu@email.com"
          required
          disabled={status === "loading"}
          className="h-11 rounded-md border border-white/10 bg-slate-900 px-3 text-sm text-white outline-none placeholder:text-slate-500 focus:ring-2 focus:ring-orange-400 disabled:opacity-50"
        />
        {status === "error" && (
          <p className="flex items-center gap-1.5 text-xs text-red-400">
            <XCircle className="h-3.5 w-3.5 shrink-0" />
            {message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={status === "loading"}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-colors hover:bg-orange-600 disabled:opacity-60"
      >
        {status === "loading" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Enviando…
          </>
        ) : (
          <>
            Inscrever
            <ArrowUpRight className="h-4 w-4" />
          </>
        )}
      </button>
    </form>
  );
}
