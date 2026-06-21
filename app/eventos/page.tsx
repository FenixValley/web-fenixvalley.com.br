import type { Metadata } from "next";
import Link from "next/link";
import { and, eq, gte } from "drizzle-orm";
import { ArrowRight, CalendarDays, Clock, MapPin, Plus } from "lucide-react";
import { events } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EventSubmitForm } from "@/components/sections/event-submit-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Agenda</p>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                  Eventos do ecossistema
                </h1>
                <p className="text-lg leading-8 text-slate-300">
                  Meetups, palestras, workshops, hackathons e demo days de Betim e região.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="shrink-0">
                    <Plus className="h-4 w-4" />
                    Divulgar evento
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto p-6">
                  <DialogTitle>Divulgue seu evento</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Eventos alinhados ao propósito do movimento entram na agenda após curadoria.
                  </p>
                  <EventSubmitForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2" aria-label="Filtrar por categoria">
                <Link
                  href={filterHref(null, mode)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    category === null
                      ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                      : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  )}
                >
                  Todas as categorias
                </Link>
                {eventCategories.map((item) => (
                  <Link
                    key={item}
                    href={filterHref(category === item ? null : item, mode)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      category === item
                        ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    )}
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
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      mode === item
                        ? "border-sky-400/60 bg-sky-500/15 text-sky-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    )}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="surface-panel max-w-2xl rounded-lg p-8">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
                  Nenhum evento aprovado na agenda{category || mode ? " com esses filtros" : " por enquanto"}.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Os encontros são divulgados aqui e na comunidade do WhatsApp assim que confirmados.
                  Organiza algo alinhado ao movimento? Use o botão “Divulgar evento”.
                </p>
              </div>
            ) : (
              <div className="space-y-10">
                {[...byMonth.entries()].map(([month, monthEvents]) => (
                  <div key={month} className="space-y-4">
                    <h2 className="font-[var(--font-space)] text-xl font-bold capitalize text-white">{month}</h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {monthEvents.map((event) => (
                        <Link
                          key={event.id}
                          href={`/eventos/${event.slug}`}
                          className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
                        >
                          <div className="mb-3 flex items-center justify-between gap-2">
                            <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                              {event.category}
                            </Badge>
                            <span className="text-xs font-semibold text-sky-300">{event.mode}</span>
                          </div>
                          <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{event.title}</h3>
                          <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                            {event.description}
                          </p>
                          <div className="mt-4 space-y-1 text-xs text-slate-400">
                            <p className="flex items-center gap-1.5">
                              <CalendarDays className="h-3.5 w-3.5 text-orange-300" />
                              {formatDay(event.date)}
                              <Clock className="ml-2 h-3.5 w-3.5 text-sky-300" />
                              {event.time}
                            </p>
                            <p className="flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-emerald-300" />
                              <span className="truncate">{event.location}</span>
                            </p>
                          </div>
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                            Ver evento
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
