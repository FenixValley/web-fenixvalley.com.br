import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { audienceJourneys } from "@/data/ecosystem";
import { Stagger, StaggerItem } from "@/components/ui/motion";

export function AudienceSection() {
  return (
    <section className="relative border-y border-white/10 bg-slate-950/50 py-16 sm:py-20">
      <div className="section-shell space-y-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Jornadas</p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
              Entre no ecossistema pelo seu papel e avance para conexões reais.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-slate-300">
            Inspirado nos melhores hubs de inovação, o portal organiza caminhos práticos para
            quem empreende, contrata, pesquisa, investe ou apoia a nova economia.
          </p>
        </div>

        <Stagger className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {audienceJourneys.map((journey) => {
            const Icon = journey.icon;
            return (
              <StaggerItem key={journey.title} className="h-full">
                <article className="surface-panel group h-full rounded-lg p-5 transition-transform hover:-translate-y-1">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-white/10 text-orange-300">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-[var(--font-space)] text-xl font-bold text-white">{journey.title}</h3>
                  <p className="mt-3 min-h-24 text-sm leading-6 text-slate-300">{journey.description}</p>
                  <Link
                    href={journey.href}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                  >
                    {journey.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
