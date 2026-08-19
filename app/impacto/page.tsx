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
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
  const [approvedActors] = await db.select({ value: count() }).from(actors).where(eq(actors.status, "approved"));
  const [approvedVolunteers] = await db
    .select({ value: count() })
    .from(volunteers)
    .where(eq(volunteers.status, "approved"));
  const [approvedEvents] = await db.select({ value: count() }).from(events).where(eq(events.status, "approved"));
  const [publishedOpportunities] = await db
    .select({ value: count() })
    .from(opportunities)
    .where(eq(opportunities.status, "published"));
  const [publishedChallenges] = await db
    .select({ value: count() })
    .from(challenges)
    .where(eq(challenges.status, "published"));
  const [publishedPartners] = await db
    .select({ value: count() })
    .from(partners)
    .where(eq(partners.status, "published"));

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

  // Só indicadores verificados pela coordenação vão ao ar — critério de aceite da issue #14.
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Transparência</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Impacto do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Não publicamos métrica de vaidade. Os números abaixo vêm dos registros do próprio portal ou de
                indicadores conferidos pela coordenação, sempre com fonte e período declarados. O que ainda não
                foi apurado simplesmente não aparece aqui.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
                  Dados do portal, em tempo real
                </h2>
              </div>
              <p className="max-w-3xl text-sm leading-6 text-slate-400">
                Contagens lidas diretamente do banco do portal no momento da visita. Só entram registros
                aprovados pela curadoria — cadastros pendentes ou rejeitados não são contados.
              </p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {counters.map((counter) => (
                  <div key={counter.label} className="surface-panel rounded-lg p-5">
                    <p className="font-[var(--font-space)] text-3xl font-black text-orange-300">{counter.value}</p>
                    <p className="mt-1 text-sm font-semibold text-white">{counter.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
              <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Indicadores verificados</h2>
            </div>
            {indicators.length === 0 ? (
              <p className="surface-panel max-w-2xl rounded-lg p-6 text-sm leading-7 text-slate-300">
                Nenhum indicador foi apurado e verificado até agora. Assim que a coordenação fechar o primeiro
                ciclo de medição, os números aparecem aqui com fonte e período.
              </p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {indicators.map((indicator) => (
                  <div key={indicator.id} className="surface-panel flex flex-col rounded-lg p-5">
                    <p className="font-[var(--font-space)] text-3xl font-black text-orange-300">
                      {indicator.value}
                    </p>
                    <p className="mt-1 text-sm font-semibold text-white">{indicator.label}</p>
                    {indicator.note ? (
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{indicator.note}</p>
                    ) : null}
                    <p className="mt-4 text-xs text-slate-400">
                      {indicator.period} · Fonte: {indicator.source}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {cases.length > 0 ? (
          <section className="relative overflow-hidden py-14 sm:py-18">
            <div className="section-shell relative space-y-6">
              <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Cases do ecossistema</h2>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {cases.map((story) => (
                  <article key={story.id} className="surface-panel flex flex-col rounded-lg p-5">
                    <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{story.title}</h3>
                    {story.organization ? (
                      <p className="mt-1 text-xs text-slate-400">{story.organization}</p>
                    ) : null}
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{story.summary}</p>
                    {story.link ? (
                      <Link
                        href={story.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                      >
                        Ler o case
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            </div>
          </section>
        ) : null}

        {testimonials.length > 0 ? (
          <section className="relative overflow-hidden py-14 sm:py-18">
            <div className="section-shell relative space-y-6">
              <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Depoimentos</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {testimonials.map((story) => (
                  <figure key={story.id} className="surface-panel flex flex-col rounded-lg p-6">
                    <Quote className="h-6 w-6 text-orange-300" aria-hidden="true" />
                    <blockquote className="mt-3 flex-1 text-sm leading-7 text-slate-300">{story.summary}</blockquote>
                    <figcaption className="mt-4 text-sm">
                      <span className="font-bold text-white">{story.authorName ?? story.title}</span>
                      {story.authorRole || story.organization ? (
                        <span className="block text-xs text-slate-400">
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

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-sky-300" aria-hidden="true" />
              <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
                Relatórios e prestação de contas
              </h2>
            </div>
            {reports.length === 0 ? (
              <p className="surface-panel max-w-2xl rounded-lg p-6 text-sm leading-7 text-slate-300">
                Os relatórios periódicos de impacto são publicados aqui conforme cada ciclo é fechado. As regras
                de governança e prestação de contas estão em{" "}
                <Link href="/governanca" className="font-bold text-orange-300 hover:text-orange-200">
                  /governanca
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2">
                {reports.map((story) => (
                  <article key={story.id} className="surface-panel flex flex-col rounded-lg p-5">
                    <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                      {impactStoryTypeLabels[story.type as keyof typeof impactStoryTypeLabels] ?? story.type}
                    </p>
                    <h3 className="mt-2 font-[var(--font-space)] text-lg font-bold text-white">{story.title}</h3>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-300">{story.summary}</p>
                    {story.link ? (
                      <Link
                        href={story.link}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                      >
                        Abrir relatório
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    ) : null}
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
