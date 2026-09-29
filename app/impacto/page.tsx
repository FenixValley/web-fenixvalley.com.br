import type { Metadata } from "next";
import Link from "next/link";
import { asc, count, eq } from "drizzle-orm";
import { BadgeCheck, ExternalLink, FileText, Quote, ShieldCheck } from "lucide-react";
import {
  actors,
  challenges,
  events,
  impactIndicators,
  impactStories,
  opportunities,
  partners,
  volunteers
} from "@/db/schema";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
import { SpotlightCard } from "@/components/editorial/spotlight-card";
import { getDb } from "@/lib/db";
import { impactStoryTypeLabels } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Impacto | Fênix Valley",
  description:
    "Indicadores verificados, cases, depoimentos e relatórios do Fênix Valley. Publicamos apenas dados apurados, com fonte e período declarados.",
  openGraph: {
    title: "Impacto | Fênix Valley",
    description: "Transparência sobre os resultados do ecossistema de inovação de Betim.",
    images: ["/logo-simbolo.png"]
  }
};

async function getLiveCounters() {
  const db = getDb();
  const [
    [approvedActors],
    [approvedVolunteers],
    [approvedEvents],
    [publishedOpportunities],
    [publishedChallenges],
    [publishedPartners]
  ] = await Promise.all([
    db.select({ value: count() }).from(actors).where(eq(actors.status, "approved")),
    db.select({ value: count() }).from(volunteers).where(eq(volunteers.status, "approved")),
    db.select({ value: count() }).from(events).where(eq(events.status, "approved")),
    db.select({ value: count() }).from(opportunities).where(eq(opportunities.status, "published")),
    db.select({ value: count() }).from(challenges).where(eq(challenges.status, "published")),
    db.select({ value: count() }).from(partners).where(eq(partners.status, "published"))
  ]);

  return [
    { label: "Organizações no mapa", value: approvedActors.value },
    { label: "Voluntários ativos", value: approvedVolunteers.value },
    { label: "Eventos na agenda", value: approvedEvents.value },
    { label: "Oportunidades publicadas", value: publishedOpportunities.value },
    { label: "Desafios de inovação abertos", value: publishedChallenges.value },
    { label: "Parceiros formalizados", value: publishedPartners.value }
  ];
}

export default async function ImpactoPage() {
  const db = getDb();
  const counters = await getLiveCounters();

  const indicators = await db
    .select()
    .from(impactIndicators)
    .where(eq(impactIndicators.verified, 1))
    .orderBy(asc(impactIndicators.order), asc(impactIndicators.label));

  const stories = await db
    .select()
    .from(impactStories)
    .where(eq(impactStories.status, "published"))
    .orderBy(asc(impactStories.order), asc(impactStories.title));

  const cases = stories.filter((story) => story.type === "case");
  const testimonials = stories.filter((story) => story.type === "depoimento");
  const reports = stories.filter((story) => story.type === "relatorio");

  return (
    <EditorialShell active="/impacto">
      <PageHeader
        kicker="Transparência"
        title="Impacto e dados apurados do ecossistema."
        accent="Impacto"
        lede="Não publicamos métrica de vaidade. Os números abaixo vêm dos registros do próprio portal ou de indicadores apurados pela curadoria, sempre com fonte e período declarados."
      />

      {/* Dados do portal em tempo real */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                Dados do portal, em tempo real
              </h2>
            </div>
            <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Contagens lidas diretamente da base do ecossistema. Apenas registros aprovados pela curadoria entram na soma.
            </p>
          </div>
        </EditorialReveal>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {counters.map((counter, index) => (
            <SpotlightCard
              key={counter.label}
              delay={index * 0.06}
              className="flex flex-col rounded-xl p-6"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              spotlightColor="rgba(27, 59, 255, 0.10)"
            >
              <span className="font-display text-4xl font-black leading-none" style={{ color: "var(--fx-accent)" }}>
                {counter.value}
              </span>
              <p className="mt-3 font-display text-base font-semibold" style={{ color: "var(--fx-ink)" }}>
                {counter.label}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Indicadores verificados */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                  Indicadores verificados
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Métricas históricas e apurações metodológicas com fonte e período de medição.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-10">
            {indicators.length === 0 ? (
              <div
                className="max-w-2xl rounded-xl p-6 font-body text-sm leading-relaxed"
                style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)", color: "var(--fx-muted)" }}
              >
                Nenhum indicador foi apurado e verificado até agora. Assim que a coordenação fechar o primeiro
                ciclo de medição, os números aparecem aqui com fonte e período.
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {indicators.map((indicator, index) => (
                  <MotionCard
                    key={indicator.id}
                    delay={index * 0.06}
                    className="flex flex-col rounded-xl p-6"
                    style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
                  >
                    <span className="font-display text-3xl font-black" style={{ color: "var(--fx-accent)" }}>
                      {indicator.value}
                    </span>
                    <p className="mt-2 font-display text-base font-semibold" style={{ color: "var(--fx-ink)" }}>
                      {indicator.label}
                    </p>
                    {indicator.note ? (
                      <p className="mt-2 flex-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                        {indicator.note}
                      </p>
                    ) : null}
                    <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--fx-muted)" }}>
                      {indicator.period} · Fonte: {indicator.source}
                    </p>
                  </MotionCard>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Cases do ecossistema */}
      {cases.length > 0 ? (
        <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                Cases do ecossistema
              </h2>
            </div>
          </EditorialReveal>

          <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {cases.map((story) => (
              <article
                key={story.id}
                className="flex flex-col rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                  {story.title}
                </h3>
                {story.organization ? (
                  <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--fx-muted)" }}>
                    {story.organization}
                  </p>
                ) : null}
                <p className="mt-3 flex-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  {story.summary}
                </p>
                {story.link ? (
                  <Link
                    href={story.link}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Ler o case
                    <ExternalLink className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      {/* Depoimentos */}
      {testimonials.length > 0 ? (
        <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
          <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
            <EditorialReveal>
              <div className="max-w-2xl space-y-3">
                <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                  Depoimentos
                </h2>
              </div>
            </EditorialReveal>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {testimonials.map((story) => (
                <figure
                  key={story.id}
                  className="flex flex-col rounded-xl p-6"
                  style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
                >
                  <Quote className="h-6 w-6" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                  <blockquote className="mt-3 flex-1 font-body text-sm leading-relaxed italic" style={{ color: "var(--fx-ink)" }}>
                    &ldquo;{story.summary}&rdquo;
                  </blockquote>
                  <figcaption className="mt-4 border-t pt-4" style={{ borderColor: "var(--fx-line)" }}>
                    <span className="font-display text-sm font-bold" style={{ color: "var(--fx-ink)" }}>
                      {story.authorName ?? story.title}
                    </span>
                    {story.authorRole || story.organization ? (
                      <span className="block font-body text-xs" style={{ color: "var(--fx-muted)" }}>
                        {[story.authorRole, story.organization].filter(Boolean).join(" · ")}
                      </span>
                    ) : null}
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Relatórios e prestação de contas */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
              <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                Relatórios e prestação de contas
              </h2>
            </div>
          </div>
        </EditorialReveal>

        <div className="mt-8">
          {reports.length === 0 ? (
            <div
              className="max-w-2xl rounded-xl p-6 font-body text-sm leading-relaxed"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)", color: "var(--fx-muted)" }}
            >
              Os relatórios periódicos de impacto são publicados aqui conforme cada ciclo é fechado. As regras
              de governança e prestação de contas estão em{" "}
              <Link href="/governanca" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                /governanca
              </Link>
              .
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {reports.map((story) => (
                <article
                  key={story.id}
                  className="flex flex-col rounded-xl p-6"
                  style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--fx-accent)" }}>
                    {impactStoryTypeLabels[story.type as keyof typeof impactStoryTypeLabels] ?? story.type}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                    {story.title}
                  </h3>
                  <p className="mt-2 flex-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                    {story.summary}
                  </p>
                  {story.link ? (
                    <Link
                      href={story.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                      style={{ color: "var(--fx-accent)" }}
                    >
                      Abrir relatório
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </EditorialShell>
  );
}
