import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";
import { programs } from "@/data/ecosystem";

const programSteps = ["Mapear", "Validar", "Conectar", "Acelerar"];

export function ProgramsSection() {
  return (
    <section id="programas" className="warm-band py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
        <FadeIn className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Programas</p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Uma esteira para transformar intenção em projeto, projeto em negócio e negócio em impacto.
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            Os programas dão ritmo ao ecossistema: desafios corporativos, formação de talentos,
            pré-aceleração e conexões com mercado, capital e instituições.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {programSteps.map((step) => (
              <div key={step} className="rounded-lg border border-slate-200 bg-white p-4 text-center shadow-sm">
                <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-accent" />
                <p className="text-sm font-bold text-slate-950">{step}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <Stagger className="grid gap-4">
          {programs.map((program) => (
            <StaggerItem key={program.title}>
              <article className="rounded-lg border border-slate-200 bg-white p-6 shadow-crisp">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <Badge variant="outline" className="border-orange-200 bg-orange-50 text-orange-700">
                    {program.tag}
                  </Badge>
                  <Link href={program.href} className="rounded-md p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-950" aria-label={`Conhecer ${program.title}`}>
                    <ArrowUpRight className="h-5 w-5" />
                  </Link>
                </div>
                <h3 className="font-[var(--font-space)] text-2xl font-black text-slate-950">{program.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{program.description}</p>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
