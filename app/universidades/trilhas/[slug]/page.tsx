import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, gte, isNotNull } from "drizzle-orm";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { events, learningTracks, opportunities } from "@/db/schema";
import { todayInBusinessTimeZone } from "@/lib/date";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getPublishedTrack(slug: string) {
  return getDb().query.learningTracks.findFirst({
    where: and(eq(learningTracks.slug, slug), eq(learningTracks.status, "published"))
  });
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const track = await getPublishedTrack(slug);
  if (!track) return { title: "Trilha não encontrada | Fênix Valley" };
  return {
    title: `${track.title} | Trilhas Fênix Valley`,
    description: track.description,
    openGraph: {
      title: `${track.title} | Fênix Valley`,
      description: track.description,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function LearningTrackPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const track = await getPublishedTrack(slug);
  if (!track) notFound();

  const db = getDb();
  const today = todayInBusinessTimeZone();

  const relatedEvents = track.relatedEventCategory
    ? await db
        .select()
        .from(events)
        .where(
          and(
            eq(events.status, "approved"),
            eq(events.category, track.relatedEventCategory),
            gte(events.date, today),
            isNotNull(events.slug)
          )
        )
        .orderBy(events.date)
        .limit(3)
    : [];

  const relatedOpportunities = track.relatedOpportunityType
    ? await db
        .select()
        .from(opportunities)
        .where(
          and(
            eq(opportunities.status, "published"),
            eq(opportunities.type, track.relatedOpportunityType),
            gte(opportunities.date, today)
          )
        )
        .orderBy(opportunities.date)
        .limit(3)
    : [];

  return (
    <EditorialShell active="/universidades">
      <PageHeader kicker="Trilha de capacitação" title={track.title} lede={track.description} />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-3xl space-y-10">
          <EditorialReveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--fx-muted)" }}
            >
              <Link href="/" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/universidades" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Universidades
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span style={{ color: "var(--fx-ink)" }}>{track.title}</span>
            </nav>
          </EditorialReveal>

          {relatedEvents.length > 0 ? (
            <EditorialReveal delay={0.1}>
              <div
                className="space-y-4 rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                    Próximos eventos
                  </h2>
                  <Link
                    href={`/eventos?categoria=${encodeURIComponent(track.relatedEventCategory ?? "")}`}
                    className="font-mono text-xs uppercase tracking-[0.16em] hover:underline"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Ver todos
                  </Link>
                </div>
                <ul className="space-y-3">
                  {relatedEvents.map((event) => (
                    <li key={event.id}>
                      <Link
                        href={`/eventos/${event.slug}`}
                        className="flex items-center justify-between gap-3 font-body text-sm transition-colors hover:underline"
                        style={{ color: "var(--fx-ink)" }}
                      >
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                          {event.title}
                        </span>
                        <ArrowRight className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </EditorialReveal>
          ) : null}

          {relatedOpportunities.length > 0 ? (
            <EditorialReveal delay={0.15}>
              <div
                className="space-y-4 rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                    Oportunidades relacionadas
                  </h2>
                  <Link
                    href={`/oportunidades?tipo=${encodeURIComponent(track.relatedOpportunityType ?? "")}`}
                    className="font-mono text-xs uppercase tracking-[0.16em] hover:underline"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Ver todas
                  </Link>
                </div>
                <ul className="space-y-3">
                  {relatedOpportunities.map((opportunity) => (
                    <li key={opportunity.id} className="flex items-center justify-between gap-3 font-body text-sm" style={{ color: "var(--fx-ink)" }}>
                      <span>{opportunity.title}</span>
                      <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                        {opportunity.type}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            </EditorialReveal>
          ) : null}

          {relatedEvents.length === 0 && relatedOpportunities.length === 0 ? (
            <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Nenhum evento ou oportunidade vinculada no momento. Acompanhe a{" "}
              <Link href="/eventos" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                agenda de eventos
              </Link>{" "}
              e as{" "}
              <Link href="/oportunidades" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                oportunidades abertas
              </Link>{" "}
              do ecossistema.
            </p>
          ) : null}

          <div className="pt-2">
            <Button asChild variant="ghost" className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground">
              <Link href="/universidades">
                <ArrowLeft className="h-4 w-4" />
                Ver todas as trilhas
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
