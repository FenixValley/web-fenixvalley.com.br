import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FacaParteSection() {
  return (
    <section id="faca-parte" className="py-16 sm:py-24">
      <div className="section-shell">
        <div className="surface-panel rounded-2xl px-8 py-14 sm:px-14 text-center space-y-8 relative overflow-hidden">

          {/* glow decorativo */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute -bottom-24 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-sky-500/10 blur-3xl" aria-hidden="true" />

          <div className="relative space-y-4 max-w-2xl mx-auto">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">
              Faça Parte
            </p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl text-white">
              Sua iniciativa também pode fazer parte da nossa agenda.
            </h2>
            <p className="text-lg leading-8 text-slate-400">
              Quer organizar um encontro, sediar um hackathon ou propor um projeto em parceria?
              Cadastre sua ideia e nossa curadoria avaliará como integrá-la ao ecossistema de Betim.
            </p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-orange-400" />
              <div>
                <p className="text-sm font-semibold text-white">Curadoria ativa</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Entradas passam por validação para preservar qualidade e alinhamento com a tecnologia.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
              <Zap className="mt-1 h-5 w-5 shrink-0 text-sky-400" />
              <div>
                <p className="text-sm font-semibold text-white">Pronto para agir</p>
                <p className="mt-1 text-sm leading-6 text-slate-400">
                  Assim que validado, sua proposta entra oficialmente na agenda do Fênix Valley.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col sm:flex-row justify-center gap-3">
            <Button asChild className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white shadow-lg shadow-orange-500/25">
              <Link href="/faca-parte">Cadastrar minha ideia</Link>
            </Button>
            <Button asChild variant="secondary" className="w-full sm:w-auto border border-white/10 bg-white/5 text-white hover:bg-white/10">
              <Link href="/eventos">Ver eventos ativos</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
