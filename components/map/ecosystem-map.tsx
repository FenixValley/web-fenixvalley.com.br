"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, ExternalLink, MapPin, Plus, Search, X } from "lucide-react";
import { ActorRegisterForm } from "@/components/map/actor-register-form";
import type { MapActor } from "@/components/map/map-canvas";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { actorTypeLabels, actorTypes } from "@/lib/schemas";

const MapCanvas = dynamic(() => import("@/components/map/map-canvas"), {
  ssr: false,
  loading: () => (
    <div
      className="flex h-full w-full items-center justify-center font-mono text-xs uppercase tracking-[0.18em]"
      style={{ background: "var(--fx-surface)", color: "var(--fx-muted)" }}
    >
      Carregando mapa...
    </div>
  )
});

function isHttpUrl(value: string): boolean {
  try {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

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

  const chipClass =
    "rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors";

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter(null)}
            className={chipClass}
            style={
              typeFilter === null
                ? { background: "var(--fx-accent)", borderColor: "var(--fx-accent)", color: "#ffffff" }
                : { background: "var(--fx-paper)", borderColor: "var(--fx-line)", color: "var(--fx-muted)" }
            }
          >
            Todos
          </button>
          {availableTypes.map((type) => {
            const active = typeFilter === type;
            return (
              <button
                key={type}
                type="button"
                onClick={() => setTypeFilter(active ? null : type)}
                className={chipClass}
                style={
                  active
                    ? { background: "var(--fx-accent)", borderColor: "var(--fx-accent)", color: "#ffffff" }
                    : { background: "var(--fx-paper)", borderColor: "var(--fx-line)", color: "var(--fx-muted)" }
                }
              >
                {actorTypeLabels[type]}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--fx-muted)" }}
            />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, bairro ou segmento"
              className="w-full rounded-full border py-2.5 pl-9 pr-3 font-body text-sm outline-none transition-colors placeholder:opacity-60 focus:border-[var(--fx-accent)]"
              style={{
                background: "var(--fx-paper)",
                borderColor: "var(--fx-line)",
                color: "var(--fx-ink)"
              }}
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-mono text-[12px] uppercase tracking-[0.12em] transition-opacity hover:opacity-90"
                style={{ background: "var(--fx-accent)", color: "#ffffff" }}
              >
                <Plus className="h-4 w-4" />
                Cadastre sua organização
              </button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-2xl">
              <DialogTitle>Cadastre sua organização no mapa</DialogTitle>
              <p className="text-sm text-muted-foreground">
                Preencha o mapeamento oficial do ecossistema Fênix Valley (Betim e Contagem). As
                respostas ajudam a curadoria a conectar os atores da região.
              </p>
              <ActorRegisterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isError ? (
        <p
          className="rounded-lg border p-4 font-body text-sm"
          style={{ borderColor: "rgba(190,18,60,0.30)", background: "rgba(190,18,60,0.06)", color: "#9f1239" }}
        >
          Não foi possível carregar os atores do mapa. Tente novamente em instantes.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div
          className="relative h-[420px] overflow-hidden rounded-lg border sm:h-[540px]"
          style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
        >
          <MapCanvas actors={visibleActors} selectedId={selectedId} onSelect={setSelectedId} />
          {selected ? (
            <div
              className="absolute bottom-4 left-4 right-4 z-10 max-w-md rounded-lg border p-4 shadow-xl backdrop-blur sm:right-auto"
              style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p
                    className="font-mono text-[11px] uppercase tracking-[0.16em]"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    {actorTypeLabels[selected.type as keyof typeof actorTypeLabels] ?? selected.type}
                  </p>
                  <h3 className="font-display text-lg font-semibold" style={{ color: "var(--fx-ink)" }}>
                    {selected.name}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Fechar detalhes"
                  className="rounded-md p-1 transition-colors hover:bg-[var(--fx-surface)]"
                  style={{ color: "var(--fx-muted)" }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p
                className="mt-1 flex items-center gap-1 font-body text-xs"
                style={{ color: "var(--fx-muted)" }}
              >
                <MapPin className="h-3.5 w-3.5" />
                {selected.neighborhood} · {selected.segment}
              </p>
              <p className="mt-2 font-body text-sm leading-6" style={{ color: "var(--fx-ink)" }}>
                {selected.description}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-4">
                {selected.slug ? (
                  <Link
                    href={`/atores/${selected.slug}`}
                    className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.1em] transition-opacity hover:opacity-80"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Ver perfil completo
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : null}
                {selected.site && isHttpUrl(selected.site) ? (
                  <a
                    href={selected.site}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-[12px] uppercase tracking-[0.1em] transition-opacity hover:opacity-80"
                    style={{ color: "var(--fx-muted)" }}
                  >
                    Visitar site
                    <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
        <div className="max-h-[540px] space-y-2 overflow-y-auto" aria-label="Lista de atores do mapa">
          <p className="font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>
            {visibleActors.length} atores no mapa
          </p>
          {visibleActors.map((actor) => {
            const active = selectedId === actor.id;
            return (
              <button
                key={actor.id}
                type="button"
                onClick={() => setSelectedId(actor.id)}
                className="w-full rounded-lg border p-3 text-left transition-colors"
                style={
                  active
                    ? { borderColor: "var(--fx-accent)", background: "var(--fx-accent-soft)" }
                    : { borderColor: "var(--fx-line)", background: "var(--fx-paper)" }
                }
              >
                <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                  {actor.name}
                </p>
                <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>
                  {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type} · {actor.neighborhood}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
