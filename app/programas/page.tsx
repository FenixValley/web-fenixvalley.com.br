import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { programsCatalog } from "@/data/programs";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export const metadata: Metadata = {
  title: "Programas | Fênix Valley",
  description:
    "Pré-aceleração, aceleração, incubação, inovação aberta, residência tecnológica e programas para estudantes do ecossistema de Betim."
};

export default function ProgramsPage() {
  return (
    <EditorialShell active="/programas">
      <PageHeader
        kicker="Programas"
        title="Uma esteira que transforma intenção em negócio."
        accent="negócio"
        lede="Cada programa atende um momento da jornada — da primeira ideia à conexão com mercado, capital e talentos."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {programsCatalog.map((program, index) => (
            <EditorialReveal key={program.slug} delay={index * 0.06}>
              <Link
                href={`/programas/${program.slug}`}
                className="group flex h-full flex-col p-6 transition-transform hover:-translate-y-1"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <span
                  className="w-fit px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em]"
                  style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                >
                  {program.tag}
                </span>
                <h2 className="mt-5 font-display text-[22px] font-semibold leading-[1.1]" style={{ color: "var(--fx-ink)" }}>
                  {program.title}
                </h2>
                <p className="mt-3 flex-1 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                  {program.summary}
                </p>
                <span
                  className="mt-6 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em]"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Conhecer programa
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            </EditorialReveal>
          ))}
        </div>
      </section>
    </EditorialShell>
  );
}
