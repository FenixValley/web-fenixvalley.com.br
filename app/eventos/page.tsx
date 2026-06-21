import type { Metadata } from "next";
import Link from "next/link";
import { and, eq, gte } from "drizzle-orm";
import { ArrowUpRight, CalendarDays, Clock, MapPin, Plus } from "lucide-react";
import { events } from "@/db/schema";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventSubmitForm } from "@/components/sections/event-submit-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { getDb } from "@/lib/db";
import { eventCategories, eventModes } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Eventos | Fênix Valley",
  description:
    "Agenda de meetups, palestras, workshops, hackathons e demo days do ecossistema de inovação de Betim."
};

function formatMonth(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { month: "long", year: "numeric", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`)
  );
}

function formatDay(date: string) {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", timeZone: "UTC" }).format(
    new Date(`${date}T12:00:00Z`)
  );
}

function filterHref(category: string | null, mode: string | null) {
  const params = new URLSearchParams();
  if (category) params.set("categoria", category);
  if (mode) params.set("modalidade", mode);
  const query = params.toString();
  return query ? `/eventos?${query}` : "/eventos";
}

export default async function EventsPage({
  searchParams
}: {
  searchParams: Promise<{ categoria?: string; modalidade?: string }>;
}) {
  const { categoria, modalidade } = await searchParams;
  const category = eventCategories.find((c) => c === categoria) ?? null;
  const mode = eventModes.find((m) => m === modalidade) ?? null;

  const today = new Date().toISOString().slice(0, 10);
  const conditions = [eq(events.status, "approved"), gte(events.date, today)];
  if (category) conditions.push(eq(events.category, category));
  if (mode) conditions.push(eq(events.mode, mode));

  const rows = await getDb()
    .select()
    .from(events)
    .where(and(...conditions))
    .orderBy(events.date, events.time);

  const byMonth = new Map<string, typeof rows>();
  for (const event of rows) {
    const month = formatMonth(event.date);
    byMonth.set(month, [...(byMonth.get(month) ?? []), event]);
  }

  return (
    <EditorialShell active="/eventos">
      <PageHeader
        kicker="Agenda"
        title="Eventos que movem o ecossistema de Betim."
        accent="movem"
        lede="Meetups, palestras, workshops, hackathons e demo days de Betim e região, reunidos em uma agenda viva e curada pela comunidade."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-18">
        <EditorialReveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.28em]"
              style={{ color: "var(--fx-muted)" }}
            >
              Organiza algo alinhado ao movimento?
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <button
                  type="button"
                  className="group inline-flex shrink-0 items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={{ background: "var(--fx-accent)", color: "#ffffff" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    Divulgar evento
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </DialogTrigger>
              <DialogContent
                className="max-h-[85vh] overflow-y-auto p-6"
                style={{ background: "var(--fx-paper)", borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}
              >
                <DialogTitle className="font-display text-2xl">Divulgue seu evento</DialogTitle>
                <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
                  Eventos alinhados ao propósito do movimento entram na agenda após curadoria.
                </p>
                <EventSubmitForm />
              </DialogContent>
            </Dialog>
          </div>
        </EditorialReveal>

        <EditorialReveal delay={0.1}>
          <div className="mt-10 space-y-3">
            <div className="flex flex-wrap items-center gap-2" aria-label="Filtrar por categoria">
              <Link
                href={filterHref(null, mode)}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
                )}
                style={
                  category === null
                    ? { borderColor: "var(--fx-accent)", background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }
                    : { borderColor: "var(--fx-line)", background: "var(--fx-paper)", color: "var(--fx-muted)" }
                }
              >
                Todas as categorias
              </Link>
              {eventCategories.map((item) => (
                <Link
                  key={item}
                  href={filterHref(category === item ? null : item, mode)}
                  className="rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
                  style={
                    category === item
                      ? { borderColor: "var(--fx-accent)", background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }
                      : { borderColor: "var(--fx-line)", background: "var(--fx-paper)", color: "var(--fx-muted)" }
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-2" aria-label="Filtrar por modalidade">
              {eventModes.map((item) => (
                <Link
                  key={item}
                  href={filterHref(category, mode === item ? null : item)}
                  className="rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors"
                  style={
                    mode === item
                      ? { borderColor: "var(--fx-accent)", background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }
                      : { borderColor: "var(--fx-line)", background: "var(--fx-paper)", color: "var(--fx-muted)" }
                  }
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        </EditorialReveal>

        {rows.length === 0 ? (
          <EditorialReveal delay={0.2}>
            <div
              className="mt-12 max-w-2xl rounded-2xl border p-8"
              style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
            >
              <h2 className="font-display text-2xl" style={{ color: "var(--fx-ink)" }}>
                Nenhum evento aprovado na agenda{category || mode ? " com esses filtros" : " por enquanto"}.
              </h2>
              <p className="mt-3 font-body text-[15px] leading-[1.7]" style={{ color: "var(--fx-muted)" }}>
                Os encontros são divulgados aqui e na comunidade do WhatsApp assim que confirmados.
                Organiza algo alinhado ao movimento? Use o botão “Divulgar evento”.
              </p>
            </div>
          </EditorialReveal>
        ) : (
          <div className="mt-12 space-y-12">
            {[...byMonth.entries()].map(([month, monthEvents], monthIndex) => (
              <div key={month} className="space-y-5">
                <EditorialReveal delay={0.05 * monthIndex}>
                  <h2
                    className="font-mono text-[12px] uppercase capitalize tracking-[0.28em]"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    {month}
                  </h2>
                </EditorialReveal>
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {monthEvents.map((event, eventIndex) => (
                    <EditorialReveal key={event.id} delay={0.06 * eventIndex}>
                      <Link
                        href={`/eventos/${event.slug}`}
                        className="group flex h-full flex-col rounded-2xl border p-5 transition-all hover:-translate-y-1"
                        style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
                      >
                        <div className="mb-3 flex items-center justify-between gap-2">
                          <span
                            className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                            style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                          >
                            {event.category}
                          </span>
                          <span
                            className="font-mono text-[11px] uppercase tracking-[0.14em]"
                            style={{ color: "var(--fx-muted)" }}
                          >
                            {event.mode}
                          </span>
                        </div>
                        <h3 className="font-display text-xl leading-tight" style={{ color: "var(--fx-ink)" }}>
                          {event.title}
                        </h3>
                        <p
                          className="mt-2 flex-1 font-body text-[14px] leading-[1.6] line-clamp-3"
                          style={{ color: "var(--fx-muted)" }}
                        >
                          {event.description}
                        </p>
                        <div className="mt-4 space-y-1.5 font-mono text-[11px] uppercase tracking-[0.08em]" style={{ color: "var(--fx-muted)" }}>
                          <p className="flex items-center gap-1.5">
                            <CalendarDays className="h-3.5 w-3.5" style={{ color: "var(--fx-accent)" }} />
                            {formatDay(event.date)}
                            <Clock className="ml-2 h-3.5 w-3.5" style={{ color: "var(--fx-accent)" }} />
                            {event.time}
                          </p>
                          <p className="flex items-center gap-1.5">
                            <MapPin className="h-3.5 w-3.5" style={{ color: "var(--fx-accent)" }} />
                            <span className="truncate normal-case tracking-normal">{event.location}</span>
                          </p>
                        </div>
                        <span
                          className="mt-5 inline-flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.16em] transition-colors"
                          style={{ color: "var(--fx-accent)" }}
                        >
                          Ver evento
                          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Link>
                    </EditorialReveal>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </EditorialShell>
  );
}
