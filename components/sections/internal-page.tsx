import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { SitePage } from "@/data/site-pages";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { MotionCard } from "@/components/editorial/motion-card";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export function InternalPage({ page }: { page: SitePage }) {
  return (
    <EditorialShell active={page.slug}>
      <PageHeader kicker={page.kicker} title={page.title} lede={page.description} />

      <section className="relative mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ color: "var(--fx-muted)" }}
          >
            <Link href="/" className="transition-colors hover:text-[var(--fx-accent)]">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span style={{ color: "var(--fx-ink)" }}>{page.title}</span>
          </nav>
        </EditorialReveal>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {page.sections.map((section, index) => (
            <MotionCard
              key={section.title}
              delay={0.12 + index * 0.08}
              className="h-full rounded-lg p-6"
              style={{
                background: "var(--fx-surface)",
                border: "1px solid var(--fx-line)"
              }}
            >
              <h2 className="font-display text-xl font-semibold" style={{ color: "var(--fx-ink)" }}>
                {section.title}
              </h2>
              <p className="mt-3 font-body text-[15px] leading-[1.7]" style={{ color: "var(--fx-muted)" }}>
                {section.body}
              </p>
            </MotionCard>
          ))}
        </div>

        <EditorialReveal delay={0.2}>
          <div className="mt-12 flex flex-wrap gap-3">
            {page.ctas.map((cta, index) => (
              <Link
                key={cta.label}
                href={cta.href}
                {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={
                  index === 0
                    ? { background: "var(--fx-accent)", color: "#ffffff" }
                    : { border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }
                }
              >
                {cta.label}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
