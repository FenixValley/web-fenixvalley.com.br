"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Clock,
  ExternalLink,
  Share2,
  Star,
  Users,
} from "lucide-react";
import { FenixEvent, EventCategory } from "@/types/event";
import { useCountdown } from "@/hooks/useCountdown";
import { useAuth } from "@/contexts/AuthContext";

// ── Helpers ────────────────────────────────────────────────────────────────

const CATEGORY_LABELS: Record<EventCategory, string> = {
  meetup: "Meetup",
  workshop: "Workshop",
  hackathon: "Hackathon",
};

const CATEGORY_COLORS: Record<EventCategory, string> = {
  meetup: "bg-sky-500/15 text-sky-300 border-sky-500/25",
  workshop: "bg-emerald-500/15 text-emerald-300 border-emerald-500/25",
  hackathon: "bg-purple-500/15 text-purple-300 border-purple-500/25",
};

function formatDate(date: Date) {
  return date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(date: Date) {
  return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

function buildShareUrl(event: FenixEvent) {
  const base = typeof window !== "undefined" ? window.location.origin : "https://fenixvalley.com.br";
  const params = new URLSearchParams({
    utm_source: "instagram",
    utm_medium: "stories",
    utm_campaign: "evento",
    utm_content: event.id,
  });
  return `${base}/eventos?${params.toString()}`;
}

// ── Countdown display ──────────────────────────────────────────────────────

function CountdownBlock({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center">
      <span className="font-[var(--font-space)] text-xl font-black tabular-nums leading-none text-white sm:text-2xl">
        {value}
      </span>
      <span className="mt-0.5 text-[9px] font-bold uppercase tracking-widest text-slate-500">
        {label}
      </span>
    </div>
  );
}

function Countdown({ date }: { date: Date }) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(date);
  if (isExpired) return null;
  return (
    <div className="flex items-end gap-2 rounded-xl border border-orange-500/20 bg-orange-500/8 px-4 py-3">
      <CountdownBlock label="dias" value={days} />
      <span className="mb-1 text-lg font-black text-orange-500/60">:</span>
      <CountdownBlock label="horas" value={hours} />
      <span className="mb-1 text-lg font-black text-orange-500/60">:</span>
      <CountdownBlock label="min" value={minutes} />
      <span className="mb-1 text-lg font-black text-orange-500/60">:</span>
      <CountdownBlock label="seg" value={seconds} />
    </div>
  );
}

// ── RSVP button ────────────────────────────────────────────────────────────

interface RSVPButtonProps {
  event: FenixEvent;
  hasRSVP: boolean;
  rsvpCount: number;
  onRSVP: (eventId: string) => void;
  onAuthRequired: () => void;
}

function RSVPButton({ event, hasRSVP, rsvpCount, onRSVP, onAuthRequired }: RSVPButtonProps) {
  const { user } = useAuth();

  const handleClick = () => {
    if (!user) {
      onAuthRequired();
      return;
    }
    onRSVP(event.id);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-all duration-200 ${
        hasRSVP
          ? "bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30"
          : "bg-orange-500 text-white shadow-sm shadow-orange-500/25 hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/30"
      }`}
    >
      <Users className="h-3.5 w-3.5" />
      {hasRSVP ? "Eu vou ✓" : "Eu vou"}
      {rsvpCount > 0 && (
        <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-black ${hasRSVP ? "bg-orange-500/20" : "bg-white/20"}`}>
          {rsvpCount}
        </span>
      )}
    </button>
  );
}

// ── Main EventCard ─────────────────────────────────────────────────────────

interface EventCardProps {
  event: FenixEvent;
  hasRSVP: boolean;
  rsvpCount: number;
  onRSVP: (eventId: string) => void;
  onAuthRequired: () => void;
  isPast?: boolean;
}

export function EventCard({
  event,
  hasRSVP,
  rsvpCount,
  onRSVP,
  onAuthRequired,
  isPast = false,
}: EventCardProps) {
  const handleShare = async () => {
    const url = buildShareUrl(event);
    const text = `🔥 ${event.title} — ${formatDate(event.date)} às ${formatTime(event.date)}\n\nFaça parte do ecossistema: ${url}`;
    if (navigator.share) {
      await navigator.share({ title: event.title, text, url }).catch(() => {});
    } else {
      await navigator.clipboard.writeText(url).catch(() => {});
      alert("Link copiado para a área de transferência!");
    }
  };

  return (
    <article
      className={`group surface-panel flex flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 ${
        event.highlighted && !isPast
          ? "border-orange-500/30 shadow-lg shadow-orange-500/10 hover:shadow-xl hover:shadow-orange-500/15"
          : "hover:border-white/20"
      } ${isPast ? "opacity-70 hover:opacity-90" : ""}`}
    >
      {/* Cover image */}
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-950/60 to-slate-900">
            <span className="font-[var(--font-space)] text-4xl font-black text-orange-500/30 select-none">
              FV
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

        {/* Badges overlay */}
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm ${CATEGORY_COLORS[event.category]}`}>
            {CATEGORY_LABELS[event.category]}
          </span>
          {event.highlighted && !isPast && (
            <span className="inline-flex items-center gap-1 rounded-full border border-yellow-500/30 bg-yellow-500/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-yellow-300 backdrop-blur-sm">
              <Star className="h-2.5 w-2.5 fill-yellow-300" />
              Destaque
            </span>
          )}
          {isPast && (
            <span className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 backdrop-blur-sm">
              Encerrado
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col gap-4 p-5">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5 text-orange-400" />
            {formatDate(event.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-orange-400" />
            {formatTime(event.date)}
          </span>
        </div>

        {/* Title */}
        <h3 className="font-[var(--font-space)] text-lg font-bold leading-snug text-white line-clamp-2">
          {event.title}
        </h3>

        {/* Description */}
        {event.description && (
          <p className="text-sm leading-6 text-slate-400 line-clamp-2">
            {event.description}
          </p>
        )}

        {/* Countdown */}
        {!isPast && <Countdown date={event.date} />}

        {/* Actions */}
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-1">
          {!isPast ? (
            <RSVPButton
              event={event}
              hasRSVP={hasRSVP}
              rsvpCount={rsvpCount}
              onRSVP={onRSVP}
              onAuthRequired={onAuthRequired}
            />
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            {event.registrationLink && !isPast && (
              <Link
                href={event.registrationLink}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-300 transition-all hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-3 w-3" />
                Inscrição
              </Link>
            )}
            <button
              onClick={handleShare}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-400 transition-all hover:bg-white/10 hover:text-sky-400"
              title="Compartilhar"
            >
              <Share2 className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
