import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import {
  ArrowUpRight,
  CalendarDays,
  ChevronRight,
  Clock,
  ExternalLink,
  MapPin,
  MessageCircle,
  Users
} from "lucide-react";
import { events } from "@/db/schema";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { MotionCard } from "@/components/editorial/motion-card";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
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
    <EditorialShell active="/eventos">
      <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--fx-line)" }}>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-20%] z-0"
          style={{
            background:
              "radial-gradient(50% 60% at 88% 0%, rgba(27,59,255,0.12), transparent 70%), radial-gradient(40% 50% at 6% 100%, rgba(56,189,248,0.08), transparent 72%)"
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[820px] px-6 pb-14 pt-14 sm:px-10 sm:pt-20">
          <EditorialReveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em]"
              style={{ color: "var(--fx-muted)" }}
            >
              <Link href="/" className="transition-colors hover:text-[var(--fx-accent)]">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/eventos" className="transition-colors hover:text-[var(--fx-accent)]">
                Eventos
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate normal-case tracking-normal" style={{ color: "var(--fx-ink)" }}>
                {event.title}
              </span>
            </nav>
          </EditorialReveal>

          <div className="mt-7 space-y-5">
            <EditorialReveal delay={0.05}>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="rounded-full px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                >
                  {event.category}
                </span>
                <span
                  className="rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                  style={{ borderColor: "var(--fx-line)", color: "var(--fx-muted)" }}
                >
                  {event.mode}
                </span>
              </div>
            </EditorialReveal>
            <EditorialReveal delay={0.1}>
              <h1 className="font-display text-4xl leading-[1.02] sm:text-5xl" style={{ color: "var(--fx-ink)" }}>
                {event.title}
              </h1>
            </EditorialReveal>
            <EditorialReveal delay={0.16}>
              <p className="max-w-[58ch] font-body text-[18px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                {event.description}
              </p>
            </EditorialReveal>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[820px] space-y-10 px-6 py-14 sm:px-10 sm:py-18">
        <MotionCard
          className="space-y-3 rounded-2xl border p-6 font-mono text-[12px] uppercase tracking-[0.08em]"
          style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)", color: "var(--fx-muted)" }}
        >
            <p className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
              <span style={{ color: "var(--fx-ink)" }}>{formatFullDate(event.date)}</span>
            </p>
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
              {event.time}
            </p>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
              <span className="normal-case tracking-normal">{event.location}</span>
            </p>
            {event.audience ? (
              <p className="flex items-center gap-2">
                <Users className="h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
                <span className="normal-case tracking-normal">{event.audience}</span>
              </p>
            ) : null}
            <p className="pt-2 normal-case tracking-normal" style={{ color: "var(--fx-muted)" }}>
              Organização: <span style={{ color: "var(--fx-ink)" }}>{event.organizer}</span>
            </p>
        </MotionCard>

        {event.schedule ? (
          <EditorialReveal delay={0.08}>
            <div className="space-y-3">
              <h2
                className="font-mono text-[12px] uppercase tracking-[0.28em]"
                style={{ color: "var(--fx-accent)" }}
              >
                Programação
              </h2>
              <p
                className="whitespace-pre-line font-body text-[16px] leading-[1.7]"
                style={{ color: "var(--fx-muted)" }}
              >
                {event.schedule}
              </p>
            </div>
          </EditorialReveal>
        ) : null}

        <EditorialReveal delay={0.12}>
          <div className="flex flex-wrap gap-3">
            {event.link && isHttpUrl(event.link) ? (
              <a
                href={event.link}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ background: "var(--fx-accent)", color: "#ffffff" }}
              >
                <span className="inline-flex items-center gap-2">
                  <ExternalLink className="h-4 w-4" />
                  Inscrever-se
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ) : null}
            <a
              href={whatsappShareUrl}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
              style={{ border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
            >
              <span className="inline-flex items-center gap-2">
                <MessageCircle className="h-4 w-4" />
                Compartilhar no WhatsApp
              </span>
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
