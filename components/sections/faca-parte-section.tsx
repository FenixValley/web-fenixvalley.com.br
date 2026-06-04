import Link from "next/link";
import { ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FacaParteSection() {
  return (
    <section id="faca-parte" className="border-y bg-white py-16 sm:py-20">
      <div className="section-shell max-w-3xl text-center mx-auto space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Faça Parte</p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
            Cadastre seu interesse e conecte sua proposta ao movimento.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            A curadoria avalia sua contribuição para manter o ecossistema focado
            em tecnologia, empreendedorismo e impacto local em Betim.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-left">
          <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <div>
              <p className="text-sm font-semibold">Curadoria ativa</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Entradas passam por validação para preservar qualidade e alinhamento.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
            <Zap className="mt-1 h-5 w-5 shrink-0 text-secondary" />
            <div>
              <p className="text-sm font-semibold">Pronto para agir</p>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Assim que validado, sua proposta entra na agenda do ecossistema.
              </p>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button asChild variant="secondary" className="w-full sm:w-auto">
            <Link href="#oportunidades">Ver oportunidades</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
