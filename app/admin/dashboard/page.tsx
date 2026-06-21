"use client";

import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { FenixEvent } from "@/types/event";
import { Plus, Trash2, Edit, LogOut, Loader2, Calendar, Home } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminDashboard() {
  const [events, setEvents] = useState<FenixEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const { signOut } = useAuth();

  useEffect(() => {
    const q = query(collection(db, "eventos"), orderBy("date", "desc"));
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
      setLoading(false);
    }, (error) => {
      console.error("Erro ao carregar eventos:", error);
      setLoading(false);
    });
    return unsub;
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir este evento? Esta ação não pode ser desfeita.")) return;
    try {
      await deleteDoc(doc(db, "eventos", id));
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir evento.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8">
      <div className="mx-auto max-w-5xl space-y-8">
        
        {/* Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <h1 className="font-[var(--font-space)] text-2xl font-black text-white">
              Painel Administrativo
            </h1>
            <p className="text-sm text-slate-400">Gerencie os eventos do Fênix Valley</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white"
            >
              <Home className="h-4 w-4" />
              Voltar ao Site
            </Link>
            <button
              onClick={() => signOut()}
              className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10 hover:text-white"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </button>
            <Link
              href="/admin/eventos/novo"
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-orange-600 shadow-md shadow-orange-500/20"
            >
              <Plus className="h-4 w-4" />
              Novo Evento
            </Link>
          </div>
        </header>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4 text-slate-400">
            <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
            <p>Carregando eventos...</p>
          </div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 py-24 text-center">
            <Calendar className="h-12 w-12 text-slate-600 mb-4" />
            <p className="text-lg font-semibold text-slate-300">Nenhum evento encontrado</p>
            <p className="text-sm text-slate-500 mb-6">Crie seu primeiro evento para vê-lo aqui.</p>
            <Link
              href="/admin/eventos/novo"
              className="rounded-xl bg-orange-500 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-orange-600"
            >
              Criar Novo Evento
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div key={event.id} className="surface-panel flex flex-col rounded-2xl p-5 border border-white/10 transition-all hover:border-white/20">
                <div className="mb-4">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="inline-block rounded border border-white/10 bg-white/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {event.category}
                    </span>
                    {event.highlighted && (
                      <span className="inline-block rounded border border-yellow-500/30 bg-yellow-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-yellow-300">
                        Destaque
                      </span>
                    )}
                  </div>
                  <h3 className="font-[var(--font-space)] text-lg font-bold text-white line-clamp-2">
                    {event.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-400">
                    {event.date.toLocaleDateString("pt-BR")} às {event.date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                
                <div className="mt-auto flex items-center justify-end gap-2 pt-4 border-t border-white/5">
                  <Link
                    href={`/admin/eventos/${event.id}/editar`}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-sky-500/10 hover:text-sky-400 hover:border-sky-500/20"
                    title="Editar"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20"
                    title="Excluir"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
