"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FenixEvent } from "@/types/event";
import { EventCard } from "@/components/events/EventCard";
import { Loader2, CalendarX, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function OpportunitiesSection() {
  const router = useRouter();
  const [events, setEvents] = useState<FenixEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Busca os eventos e filtra para mostrar apenas os próximos
    const q = query(collection(db, "eventos"), orderBy("date", "asc"));
    const unsub = onSnapshot(q, (snap) => {
      const now = new Date();
      const docs = snap.docs.map((d) => {
        const data = d.data();
        return {
          id: d.id,
          ...data,
          date: data.date?.toDate?.() ?? new Date(data.date),
        } as FenixEvent;
      }).filter(e => e.date >= now).slice(0, 3);
      
      setEvents(docs);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao buscar eventos: ", error);
      setLoading(false);
      setEvents([]);
    });
    return unsub;
  }, []);

  return (
    <section id="oportunidades" className="py-16 sm:py-20 relative">
      <div className="section-shell space-y-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-500">Agenda viva</p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl text-white">
              Uma mesa aberta para projetos, conexões e próximos passos.
            </h2>
            <p className="text-lg leading-8 text-slate-400">
              Encontros, mentorias e iniciativas para aproximar quem quer criar tecnologia de quem
              pode abrir portas, testar soluções e acelerar negócios.
            </p>
          </div>
          <Link
            href="/eventos"
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-white/10 hover:text-orange-400"
          >
            Ver todos os eventos
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <p className="text-sm font-semibold">Carregando eventos...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-16 text-center gap-4">
            <CalendarX className="h-12 w-12 text-slate-600" />
            <div className="space-y-1">
              <p className="font-semibold text-slate-300">Ainda não há eventos futuros registrados</p>
              <p className="text-sm text-slate-500">
                Fique de olho — novidades chegam em breve!
              </p>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard
                key={event.id}
                event={event}
                hasRSVP={false}
                rsvpCount={0}
                onRSVP={() => router.push('/eventos')}
                onAuthRequired={() => router.push('/auth')}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
