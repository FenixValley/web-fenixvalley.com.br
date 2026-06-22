import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { audienceJourneys } from "@/data/ecosystem";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { MotionCard } from "@/components/editorial/motion-card";
import { SectionHeading } from "@/components/editorial/section-heading";

export function EditorialAudience() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <SectionHeading kicker="Por onde você entra" title="Quatro jeitos de fazer parte do movimento." accent="parte" meta="escolha o seu" />

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {audienceJourneys.map((journey, index) => (
          <MotionCard
            key={journey.title}
            delay={index * 0.07}
            className="group flex h-full flex-col gap-4 rounded-2xl border p-7 transition-colors"
            style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
          >
            <AnimatedIcon>
              <journey.icon className="h-5 w-5" strokeWidth={1.6} />
            </AnimatedIcon>
            <div className="flex-1">
              <h3 className="font-display text-[22px] font-semibold">{journey.title}</h3>
              <p className="mt-2 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                {journey.description}
              </p>
            </div>
            <Link
              href={journey.href}
              className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em]"
              style={{ color: "var(--fx-accent)" }}
            >
              {journey.cta}
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
