import Link from "next/link";
import { ArrowUpRight, Building2, GraduationCap, Lightbulb, type LucideIcon } from "lucide-react";
import { programs } from "@/data/ecosystem";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { MotionCard } from "@/components/editorial/motion-card";
import { SectionHeading } from "@/components/editorial/section-heading";

const iconByTag: Record<string, LucideIcon> = {
  Ideação: Lightbulb,
  Empresas: Building2,
  Talentos: GraduationCap
};

export function EditorialPrograms() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <SectionHeading
        kicker="Programas"
        title="Uma esteira da ideia ao negócio com impacto."
        accent="impacto"
        meta="trilhas"
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {programs.map((program, index) => {
          const Icon = iconByTag[program.tag] ?? Lightbulb;
          return (
          <MotionCard
            key={program.title}
            delay={index * 0.08}
            className="group flex h-full flex-col gap-5 rounded-2xl border p-7"
            style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
          >
            <div className="flex items-center justify-between">
              <AnimatedIcon>
                <Icon className="h-5 w-5" strokeWidth={1.6} />
              </AnimatedIcon>
              <span
                className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                {program.tag}
              </span>
            </div>
            <div className="flex-1">
              <h3 className="font-display text-[21px] font-semibold">{program.title}</h3>
              <p className="mt-2 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                {program.description}
              </p>
            </div>
            <Link
              href={program.href}
              className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em]"
              style={{ color: "var(--fx-accent)" }}
            >
              Conhecer programa
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MotionCard>
          );
        })}
      </div>
    </section>
  );
}
