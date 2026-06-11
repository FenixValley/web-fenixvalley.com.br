import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import {
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Users
} from "lucide-react";
import { events } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getApprovedEvent(slug: string) {
  return getDb().query.events.findFirst({
    where: and(eq(events.slug, slug), eq(events.status, "approved"))
  });
}

function formatFullDate(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));
}

function isHttpUrl(value: string): boolean {
  try {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = await getApprovedEvent(slug);
  if (!event) return { title: "Evento não encontrado | Fênix Valley" };
  return {
    title: `${event.title} | Eventos Fênix Valley`,
    description: event.description
  };
}

export default async function EventPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = await getApprovedEvent(slug);
  if (!event) notFound();

  const shareText = `${event.title} — ${formatFullDate(event.date)}, ${event.time}. Pelo Fênix Valley: https://fenixvalley.com.br/eventos/${event.slug}`;
  const whatsappShareUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

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
              <Link href="/eventos" className="hover:text-orange-200">
                Eventos
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{event.title}</span>
            </nav>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {event.category}
                </Badge>
                <Badge variant="outline" className="border-sky-300/40 bg-sky-500/10 text-sky-300">
                  {event.mode}
                </Badge>
              </div>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {event.title}
              </h1>
              <p className="text-lg leading-8 text-slate-300">{event.description}</p>
            </div>

            <div className="surface-panel space-y-3 rounded-lg p-5 text-sm text-slate-300">
              <p className="flex items-center gap-2">
                <CalendarDays className="h-4 w-4 shrink-0 text-orange-300" />
                <span className="capitalize">{formatFullDate(event.date)}</span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="h-4 w-4 shrink-0 text-sky-300" />
                {event.time}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 shrink-0 text-emerald-300" />
                {event.location}
              </p>
              {event.audience ? (
                <p className="flex items-center gap-2">
                  <Users className="h-4 w-4 shrink-0 text-amber-300" />
                  {event.audience}
                </p>
              ) : null}
              <p className="pt-2 text-xs text-slate-400">Organização: {event.organizer}</p>
            </div>

            {event.schedule ? (
              <div className="space-y-3">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Programação</h2>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{event.schedule}</p>
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {event.link && isHttpUrl(event.link) ? (
                <Button asChild>
                  <a href={event.link} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Inscrever-se
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <a href={whatsappShareUrl} target="_blank" rel="noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Compartilhar no WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
