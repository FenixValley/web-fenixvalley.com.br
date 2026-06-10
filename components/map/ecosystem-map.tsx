"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, MapPin, Plus, Search, X } from "lucide-react";
import { ActorRegisterForm } from "@/components/map/actor-register-form";
import type { MapActor } from "@/components/map/map-canvas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { actorTypeLabels, actorTypes } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const MapCanvas = dynamic(() => import("@/components/map/map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-900 text-sm text-slate-400">
      Carregando mapa...
    </div>
  )
});

async function fetchActors(): Promise<MapActor[]> {
  const response = await fetch("/api/actors");
  if (!response.ok) throw new Error("Não foi possível carregar o mapa.");
  return response.json();
}

export function EcosystemMap() {
  const { data: actors = [], isError } = useQuery({ queryKey: ["actors"], queryFn: fetchActors });
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const visibleActors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return actors.filter((actor) => {
      if (typeFilter && actor.type !== typeFilter) return false;
      if (!query) return true;
      return (
        actor.name.toLowerCase().includes(query) ||
        actor.neighborhood.toLowerCase().includes(query) ||
        actor.segment.toLowerCase().includes(query)
      );
    });
  }, [actors, typeFilter, search]);

  const availableTypes = useMemo(
    () => actorTypes.filter((type) => actors.some((actor) => actor.type === type)),
    [actors]
  );

  const selected = visibleActors.find((actor) => actor.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              typeFilter === null
                ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
            )}
          >
            Todos
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(typeFilter === type ? null : type)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                typeFilter === type
                  ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
              )}
            >
              {actorTypeLabels[type]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, bairro ou segmento"
              className="pl-9"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="shrink-0">
                <Plus className="h-4 w-4" />
                Cadastre sua organização
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto p-6">
              <DialogTitle>Cadastre sua organização no mapa</DialogTitle>
              <p className="text-sm text-muted-foreground">
                O cadastro passa pela curadoria do Fênix Valley antes de aparecer no mapa.
              </p>
              <ActorRegisterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isError ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          Não foi possível carregar os atores do mapa. Tente novamente em instantes.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="relative h-[420px] overflow-hidden rounded-lg border border-white/10 sm:h-[540px]">
          <MapCanvas actors={visibleActors} selectedId={selectedId} onSelect={setSelectedId} />
          {selected ? (
            <div className="absolute bottom-4 left-4 right-4 z-10 max-w-md rounded-lg border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur sm:right-auto">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                    {actorTypeLabels[selected.type as keyof typeof actorTypeLabels] ?? selected.type}
                  </p>
                  <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{selected.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Fechar detalhes"
                  className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {selected.neighborhood} · {selected.segment}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{selected.description}</p>
              {selected.site ? (
                <a
                  href={selected.site}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Visitar site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <aside className="max-h-[540px] space-y-2 overflow-y-auto">
          <p className="text-sm text-slate-400">{visibleActors.length} atores no mapa</p>
          {visibleActors.map((actor) => (
            <button
              key={actor.id}
              type="button"
              onClick={() => setSelectedId(actor.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition-colors",
                selectedId === actor.id
                  ? "border-orange-400/60 bg-orange-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
            >
              <p className="text-sm font-bold text-white">{actor.name}</p>
              <p className="text-xs text-slate-400">
                {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type} · {actor.neighborhood}
              </p>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
