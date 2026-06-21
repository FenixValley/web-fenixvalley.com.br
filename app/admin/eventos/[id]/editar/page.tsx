"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft, Loader2, Save } from "lucide-react";
import Link from "next/link";
import { EventCategory } from "@/types/event";

export default function EditarEvento() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "meetup" as EventCategory,
    date: "",
    time: "",
    imageUrl: "",
    registrationLink: "",
    highlighted: false,
  });

  useEffect(() => {
    async function fetchEvent() {
      try {
        const docRef = doc(db, "eventos", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const d = data.date.toDate();
          
          setFormData({
            title: data.title,
            description: data.description,
            category: data.category,
            date: d.toISOString().split('T')[0],
            time: d.toTimeString().slice(0, 5),
            imageUrl: data.imageUrl,
            registrationLink: data.registrationLink,
            highlighted: data.highlighted,
          });
        } else {
          setError("Evento não encontrado.");
        }
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar evento.");
      } finally {
        setLoading(false);
      }
    }
    
    if (id) {
      fetchEvent();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const eventDate = new Date(`${formData.date}T${formData.time}`);
      const eventRef = doc(db, "eventos", id);

      await updateDoc(eventRef, {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: eventDate,
        imageUrl: formData.imageUrl,
        registrationLink: formData.registrationLink,
        highlighted: formData.highlighted,
      });

      router.push("/admin/dashboard");
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar evento. Verifique os dados e tente novamente.");
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 sm:p-8">
      <div className="mx-auto max-w-3xl space-y-8">
        
        {/* Header */}
        <header className="flex items-center gap-4 border-b border-white/10 pb-6">
          <Link
            href="/admin/dashboard"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="font-[var(--font-space)] text-2xl font-black text-white">
              Editar Evento
            </h1>
            <p className="text-sm text-slate-400">Altere os dados do evento</p>
          </div>
        </header>

        {/* Form */}
        <form onSubmit={handleSubmit} className="surface-panel rounded-2xl p-6 sm:p-8 space-y-6">
          {error && (
            <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Título do Evento *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Descrição</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Categoria *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10 appearance-none"
                >
                  <option value="meetup">Meetup</option>
                  <option value="workshop">Workshop</option>
                  <option value="hackathon">Hackathon</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Data e Hora *</label>
                <div className="flex gap-2">
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
                  />
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                    className="w-32 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">URL da Imagem de Capa</label>
              <input
                type="url"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://exemplo.com/imagem.jpg"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">Link de Inscrição (Sympla, etc.)</label>
              <input
                type="url"
                name="registrationLink"
                value={formData.registrationLink}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none focus:border-orange-500/40 focus:ring-2 focus:ring-orange-500/10"
              />
            </div>

            <label className="flex items-center gap-3 cursor-pointer pt-2">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  name="highlighted"
                  checked={formData.highlighted}
                  onChange={handleChange}
                  className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 transition-all checked:border-orange-500 checked:bg-orange-500"
                />
                <svg
                  className="pointer-events-none absolute h-3 w-3 text-white opacity-0 transition-opacity peer-checked:opacity-100"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-1">
                <span className="text-sm font-bold text-white">Destacar este evento</span>
                <p className="text-xs text-slate-400">Aparecerá com destaque especial e no topo da lista</p>
              </div>
            </label>
          </div>

          <div className="flex justify-end pt-4 border-t border-white/10">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-bold text-white transition-all hover:bg-orange-600 disabled:opacity-60"
            >
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              {saving ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
