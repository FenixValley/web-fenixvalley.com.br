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
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
              Faça Parte
            </p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl text-foreground">
              Cadastre seu interesse e conecte sua proposta ao movimento.
            </h2>
            <p className="text-lg leading-8 text-muted-foreground">
              A curadoria avalia sua contribuição para manter o ecossistema focado
              em tecnologia, empreendedorismo e impacto local em Betim.
            </p>
          </div>

          <div className="relative grid gap-4 sm:grid-cols-2 text-left max-w-2xl mx-auto">
            <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
              <div>
                <p className="text-sm font-semibold text-foreground">Curadoria ativa</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Entradas passam por validação para preservar qualidade e alinhamento.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-white/10 bg-white/5 p-4">
              <Zap className="mt-1 h-5 w-5 shrink-0 text-secondary" />
              <div>
                <p className="text-sm font-semibold text-foreground">Pronto para agir</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  Assim que validado, sua proposta entra na agenda do ecossistema.
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex justify-center">
            <Button asChild variant="secondary" className="w-full sm:w-auto">
              <Link href="#oportunidades">Ver oportunidades</Link>
            </Button>
          </div>

        </div>
      </div>
    </section>
  );
}
