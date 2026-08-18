import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq, gte } from "drizzle-orm";
import { ArrowLeft, ArrowRight, CalendarDays, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { events, learningTracks, opportunities } from "@/db/schema";
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
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Sao_Paulo" }).format(new Date());

  const relatedEvents = track.relatedEventCategory
    ? await db
        .select()
        .from(events)
        .where(
          and(
            eq(events.status, "approved"),
            eq(events.category, track.relatedEventCategory),
            gte(events.date, today)
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-3xl space-y-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/universidades" className="hover:text-orange-200">
                Universidades e educação
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{track.title}</span>
            </nav>

            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Trilha de capacitação</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {track.title}
              </h1>
              <p className="text-lg leading-8 text-slate-300">{track.description}</p>
            </div>

            {relatedEvents.length > 0 ? (
              <div className="surface-panel space-y-4 rounded-lg p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Próximos eventos</h2>
                  <Link
                    href={`/eventos?categoria=${encodeURIComponent(track.relatedEventCategory ?? "")}`}
                    className="text-sm font-bold text-orange-300 hover:text-orange-200"
                  >
                    Ver todos
                  </Link>
                </div>
                <ul className="space-y-3">
                  {relatedEvents.map((event) => (
                    <li key={event.id}>
                      <Link
                        href={`/eventos/${event.slug}`}
                        className="flex items-center justify-between gap-3 text-sm text-slate-300 hover:text-white"
                      >
                        <span className="flex items-center gap-2">
                          <CalendarDays className="h-4 w-4 text-orange-300" />
                          {event.title}
                        </span>
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedOpportunities.length > 0 ? (
              <div className="surface-panel space-y-4 rounded-lg p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Oportunidades relacionadas</h2>
                  <Link
                    href={`/oportunidades?tipo=${encodeURIComponent(track.relatedOpportunityType ?? "")}`}
                    className="text-sm font-bold text-orange-300 hover:text-orange-200"
                  >
                    Ver todas
                  </Link>
                </div>
                <ul className="space-y-3">
                  {relatedOpportunities.map((opportunity) => (
                    <li key={opportunity.id} className="flex items-center justify-between gap-3 text-sm text-slate-300">
                      <span>{opportunity.title}</span>
                      <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                        {opportunity.type}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {relatedEvents.length === 0 && relatedOpportunities.length === 0 ? (
              <p className="text-sm leading-6 text-slate-400">
                Nenhum evento ou oportunidade vinculada no momento. Acompanhe a{" "}
                <Link href="/eventos" className="text-orange-300 hover:text-orange-200">
                  agenda de eventos
                </Link>{" "}
                e as{" "}
                <Link href="/oportunidades" className="text-orange-300 hover:text-orange-200">
                  oportunidades abertas
                </Link>{" "}
                do ecossistema.
              </p>
            ) : null}

            <Button asChild variant="ghost">
              <Link href="/universidades">
                <ArrowLeft className="h-4 w-4" />
                Ver todas as trilhas
              </Link>
            </Button>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
