"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ArrowRight, MapPin, Plus, Search, Star } from "lucide-react";
import { ActorRegisterForm } from "@/components/map/actor-register-form";
import type { MapActor } from "@/components/map/map-canvas";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { actorTypeLabels } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type CatalogActor = MapActor & { featured?: number | null };

async function fetchActors(): Promise<CatalogActor[]> {
  const response = await fetch("/api/actors");
  if (!response.ok) throw new Error("Não foi possível carregar os dados.");
  return response.json();
}

export function ActorCatalog({
  types,
  ctaLabel,
  ctaHref,
  emptyTitle,
  emptyDescription
}: {
  types: string[];
  ctaLabel: string;
  /** Quando definido, o CTA vira um link direto em vez de abrir o formulário de cadastro no mapa. */
  ctaHref?: string;
  emptyTitle: string;
  emptyDescription: string;
}) {
  const { data: actors = [], isError } = useQuery({ queryKey: ["actors"], queryFn: fetchActors });
  const [segment, setSegment] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const scoped = useMemo(() => actors.filter((actor) => types.includes(actor.type)), [actors, types]);

  const segments = useMemo(
    () => Array.from(new Set(scoped.map((actor) => actor.segment))).sort((a, b) => a.localeCompare(b)),
    [scoped]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return scoped
      .filter((actor) => {
        if (segment && actor.segment !== segment) return false;
        if (!query) return true;
        return (
          actor.name.toLowerCase().includes(query) ||
          actor.neighborhood.toLowerCase().includes(query) ||
          actor.segment.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [scoped, segment, search]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSegment(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              segment === null
                ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
            )}
          >
            Todos os segmentos
          </button>
          {segments.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSegment(segment === item ? null : item)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                segment === item
                  ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
              )}
            >
              {item}
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
          {ctaHref ? (
            <Button asChild size="sm" className="shrink-0">
              <Link href={ctaHref}>
                <Plus className="h-4 w-4" />
                {ctaLabel}
              </Link>
            </Button>
          ) : (
            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" className="shrink-0">
                  <Plus className="h-4 w-4" />
                  {ctaLabel}
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-2xl">
                <DialogTitle>Cadastre sua organização no mapa</DialogTitle>
                <p className="text-sm text-muted-foreground">
                  Preencha o mapeamento oficial do ecossistema Fênix Valley (Betim e Contagem). As respostas
                  ajudam a curadoria a conectar os atores da região e a incluir seu perfil nesta vitrine.
                </p>
                <ActorRegisterForm />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {isError ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          Não foi possível carregar os dados agora. Tente novamente em instantes.
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <div className="surface-panel max-w-2xl rounded-lg p-8">
          <h2 className="font-[var(--font-space)] text-xl font-bold text-white">{emptyTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{emptyDescription}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((actor) =>
            actor.slug ? (
              <Link
                key={actor.id}
                href={`/atores/${actor.slug}`}
                className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                    {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type}
                  </Badge>
                  {actor.featured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-300" />
                      Destaque
                    </span>
                  ) : null}
                </div>
                <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{actor.name}</h3>
                <p className="mt-1 text-xs text-slate-400">{actor.segment}</p>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">{actor.description}</p>
                <p className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin className="h-3.5 w-3.5 text-emerald-300" />
                  {actor.neighborhood}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                  Ver perfil
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ) : null
          )}
        </div>
      )}
    </div>
  );
}
