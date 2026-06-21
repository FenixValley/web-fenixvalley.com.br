"use client";

import { useEffect, useMemo, useState } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FenixEvent, EventCategory } from "@/types/event";
import { useAuth } from "@/contexts/AuthContext";
import { EventCard } from "@/components/events/EventCard";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Loader2, CalendarX, Zap } from "lucide-react";
import Link from "next/link";

// ── Auth Modal ─────────────────────────────────────────────────────────────

function AuthModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="surface-panel w-full max-w-sm rounded-2xl p-8 text-center space-y-5 shadow-2xl">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/15 text-orange-400">
          <Zap className="h-7 w-7" />
        </div>
        <div className="space-y-2">
          <h2 className="font-[var(--font-space)] text-xl font-black text-white">
            Entre para confirmar presença
          </h2>
          <p className="text-sm leading-6 text-slate-400">
            Faça login ou cadastre-se gratuitamente para confirmar que você vai ao evento.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href="/auth"
            className="flex items-center justify-center gap-2 rounded-full bg-orange-500 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600"
          >
            Entrar / Cadastrar
          </Link>
          <button
            onClick={onClose}
            className="rounded-full border border-white/10 py-2.5 text-sm font-semibold text-slate-400 transition-all hover:bg-white/5 hover:text-white"
          >
            Agora não
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Category Filter ────────────────────────────────────────────────────────

const CATEGORIES: { value: "all" | EventCategory; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "meetup", label: "Meetups" },
  { value: "workshop", label: "Workshops" },
  { value: "hackathon", label: "Hackathons" },
];

// ── Page ──────────────────────────────────────────────────────────────────

export default function EventosPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<FenixEvent[]>([]);
  const [rsvps, setRsvps] = useState<Set<string>>(new Set());
  const [rsvpCounts, setRsvpCounts] = useState<Record<string, number>>({});
  const [category, setCategory] = useState<"all" | EventCategory>("all");
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // Real-time events listener
  useEffect(() => {
    const q = query(collection(db, "eventos"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const docs = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          date: data.date?.toDate?.() ?? new Date(data.date),
          createdAt: data.createdAt?.toDate?.() ?? new Date(data.createdAt),
        } as FenixEvent;
      });
      setEvents(docs);

      // Aggregate RSVP counts
      const counts: Record<string, number> = {};
      snap.docs.forEach((d) => {
        const data = d.data();
        if (data.rsvpCount !== undefined) counts[d.id] = data.rsvpCount;
      });
      setRsvpCounts(counts);

      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar eventos globais:", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  // Load user RSVPs
  useEffect(() => {
    if (!user) { setRsvps(new Set()); return; }
    const userRsvpRef = doc(db, "userRsvps", user.uid);
    const unsub = onSnapshot(userRsvpRef, (snap) => {
      const data = snap.data();
      setRsvps(new Set(data?.eventIds ?? []));
    });
    return unsub;
  }, [user]);

  const handleRSVP = async (eventId: string) => {
    if (!user) return;
    const userRsvpRef = doc(db, "userRsvps", user.uid);
    const rsvpRef = doc(db, "rsvps", `${eventId}_${user.uid}`);
    const eventRef = doc(db, "eventos", eventId);

    if (rsvps.has(eventId)) {
      // Remove RSVP
      await deleteDoc(rsvpRef);
      const snap = await getDoc(userRsvpRef);
      const current = snap.data()?.eventIds ?? [];
      await setDoc(userRsvpRef, { eventIds: current.filter((id: string) => id !== eventId) });
      setRsvpCounts((prev) => ({ ...prev, [eventId]: Math.max(0, (prev[eventId] ?? 1) - 1) }));
    } else {
      // Add RSVP
      await setDoc(rsvpRef, { eventId, userId: user.uid, userEmail: user.email, createdAt: new Date() });
      const snap = await getDoc(userRsvpRef);
      const current = snap.data()?.eventIds ?? [];
      await setDoc(userRsvpRef, { eventIds: [...current, eventId] });
      setRsvpCounts((prev) => ({ ...prev, [eventId]: (prev[eventId] ?? 0) + 1 }));
    }
  };

  const now = new Date();

  const { upcoming, past } = useMemo(() => {
    const filtered = category === "all" ? events : events.filter((e) => e.category === category);
    return {
      upcoming: filtered.filter((e) => e.date >= now).sort((a, b) => {
        if (a.highlighted && !b.highlighted) return -1;
        if (!a.highlighted && b.highlighted) return 1;
        return a.date.getTime() - b.date.getTime();
      }),
      past: filtered.filter((e) => e.date < now).sort((a, b) => b.date.getTime() - a.date.getTime()),
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [events, category]);

  return (
    <>
      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      <SiteHeader />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative overflow-hidden py-20 sm:py-28">
          <div className="brand-grid absolute inset-x-0 top-0 h-[380px]" aria-hidden="true" />
          <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-80 w-[700px] rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
          <div className="section-shell relative text-center space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-orange-400">
              <Zap className="h-3.5 w-3.5" />
              Agenda Fênix Valley
            </p>
            <h1 className="font-[var(--font-space)] text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
              Eventos & Encontros
            </h1>
            <p className="text-lg leading-8 text-slate-400 max-w-xl mx-auto">
              Meetups, workshops e hackathons para conectar, aprender e construir o ecossistema de inovação de Betim.
            </p>
          </div>
        </section>

        {/* Category filter */}
        <section className="sticky top-[64px] z-30 border-b border-white/8 bg-slate-950/90 backdrop-blur-xl py-3">
          <div className="section-shell flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setCategory(cat.value)}
                className={`shrink-0 rounded-full px-5 py-2 text-sm font-bold transition-all duration-200 ${
                  category === cat.value
                    ? "bg-orange-500 text-white shadow-md shadow-orange-500/25"
                    : "border border-white/10 bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </section>

        {/* Events grid */}
        <section className="py-12 sm:py-16">
          <div className="section-shell space-y-14">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-24 gap-4 text-slate-400">
                <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
                <p className="text-sm font-semibold">Carregando eventos...</p>
              </div>
            ) : (
              <>
                {/* Upcoming */}
                <div className="space-y-8">
                  <div className="flex items-center justify-between">
                    <h2 className="font-[var(--font-space)] text-2xl font-black text-white">
                      Próximos eventos
                    </h2>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-slate-400">
                      {upcoming.length} evento{upcoming.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {upcoming.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-20 gap-4 text-center">
                      <CalendarX className="h-12 w-12 text-slate-600" />
                      <div className="space-y-1">
                        <p className="font-semibold text-slate-300">Nenhum evento programado</p>
                        <p className="text-sm text-slate-500">
                          Fique de olho — novidades chegam em breve!
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                      {upcoming.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          hasRSVP={rsvps.has(event.id)}
                          rsvpCount={rsvpCounts[event.id] ?? 0}
                          onRSVP={handleRSVP}
                          onAuthRequired={() => setShowAuthModal(true)}
                        />
                      ))}
                    </div>
                  )}
                </div>

                {/* Past events */}
                {past.length > 0 && (
                  <div className="space-y-8">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/8" />
                      <h2 className="font-[var(--font-space)] text-lg font-bold text-slate-500">
                        Memórias
                      </h2>
                      <div className="h-px flex-1 bg-white/8" />
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                      {past.map((event) => (
                        <EventCard
                          key={event.id}
                          event={event}
                          hasRSVP={false}
                          rsvpCount={rsvpCounts[event.id] ?? 0}
                          onRSVP={() => {}}
                          onAuthRequired={() => {}}
                          isPast
                        />
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
