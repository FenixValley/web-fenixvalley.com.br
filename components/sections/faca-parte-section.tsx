import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";

export function FacaParteSection() {
  return (
    <section id="faca-parte" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <div
        className="relative overflow-hidden rounded-2xl p-8 sm:p-14 text-center space-y-8"
        style={{
          background: "var(--fx-surface)",
          border: "1px solid var(--fx-line)"
        }}
      >
        {/* Glow decorativo sutil em azul elétrico editorial */}
        <div
          className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-3xl opacity-40"
          style={{ background: "rgba(27, 59, 255, 0.15)" }}
          aria-hidden="true"
        />

        <div className="relative space-y-4 max-w-2xl mx-auto">
          <p
            className="font-mono text-[11px] uppercase tracking-[0.24em]"
            style={{ color: "var(--fx-accent)" }}
          >
            Faça Parte
          </p>
          <h2
            className="font-display text-3xl font-bold leading-tight sm:text-4xl"
            style={{ color: "var(--fx-ink)" }}
          >
            Sua iniciativa também pode fazer parte da nossa agenda.
          </h2>
          <p
            className="font-body text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--fx-muted)" }}
          >
            Quer organizar um encontro, sediar um hackathon ou propor um projeto em parceria?
            Cadastre sua ideia e nossa curadoria avaliará como integrá-la ao ecossistema de Betim.
          </p>
        </div>

        <div className="relative grid gap-4 sm:grid-cols-2 text-left max-w-2xl mx-auto">
          <div
            className="flex items-start gap-3 rounded-xl p-5 transition-shadow"
            style={{
              background: "var(--fx-paper)",
              border: "1px solid var(--fx-line)"
            }}
          >
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
            >
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                Curadoria ativa
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Entradas passam por validação para preservar qualidade e alinhamento com a tecnologia.
              </p>
            </div>
          </div>

          <div
            className="flex items-start gap-3 rounded-xl p-5 transition-shadow"
            style={{
              background: "var(--fx-paper)",
              border: "1px solid var(--fx-line)"
            }}
          >
            <div
              className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
              style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
            >
              <Zap className="h-5 w-5" />
            </div>
            <div>
              <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                Pronto para agir
              </p>
              <p className="mt-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Assim que validado, sua proposta entra oficialmente na agenda do Fênix Valley.
              </p>
            </div>
          </div>
        </div>

        <div className="relative flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/faca-parte"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
            style={{ background: "var(--fx-accent)" }}
          >
            Cadastrar minha ideia
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/eventos"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:bg-slate-100"
            style={{
              border: "1px solid var(--fx-line)",
              background: "var(--fx-paper)",
              color: "var(--fx-ink)"
            }}
          >
            Ver eventos ativos
          </Link>
        </div>
      </div>
    </section>
  );
}
