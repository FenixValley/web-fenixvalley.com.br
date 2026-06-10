import { Opportunity } from "@/data/opportunities";
import { FadeIn } from "@/components/ui/motion";
import { OpportunitiesTable } from "./opportunities-table";

export function OpportunitiesSection({ opportunities }: { opportunities: Opportunity[] }) {
  return (
    <section id="oportunidades" className="relative overflow-hidden py-16 sm:py-20">
      <div className="brand-grid absolute inset-x-0 top-0 h-96 opacity-50" aria-hidden="true" />
      <div className="section-shell space-y-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <FadeIn className="max-w-3xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300">Agenda viva</p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
              Uma mesa aberta para projetos, conexões e próximos passos.
            </h2>
            <p className="text-lg leading-8 text-slate-300">
              Encontros, mentorias e iniciativas para aproximar quem quer criar tecnologia de quem
              pode abrir portas, testar soluções e acelerar negócios.
            </p>
          </FadeIn>
        </div>
        <OpportunitiesTable initialData={opportunities} />
      </div>
    </section>
  );
}
