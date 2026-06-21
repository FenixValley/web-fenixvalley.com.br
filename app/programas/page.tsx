import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { programsCatalog } from "@/data/programs";
import { Badge } from "@/components/ui/badge";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Programas | Fênix Valley",
  description:
    "Pré-aceleração, aceleração, incubação, inovação aberta, residência tecnológica e programas para estudantes do ecossistema de Betim."
};

export default function ProgramsPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-10">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Programas</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Uma esteira para transformar intenção em projeto, projeto em negócio e negócio em impacto.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Cada programa atende um momento da jornada — da primeira ideia à conexão com mercado,
                capital e talentos.
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {programsCatalog.map((program) => (
                <Link
                  key={program.slug}
                  href={`/programas/${program.slug}`}
                  className="surface-panel group flex flex-col rounded-lg p-6 transition-transform hover:-translate-y-1"
                >
                  <Badge variant="outline" className="mb-4 w-fit border-orange-300/40 bg-orange-500/10 text-orange-300">
                    {program.tag}
                  </Badge>
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-white">{program.title}</h2>
                  <p className="mt-3 flex-1 text-sm leading-6 text-slate-300">{program.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                    Conhecer programa
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
