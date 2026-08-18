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
import { parseActorDetails } from "@/lib/actor-details";
import { actorTypeLabels, type StartupDetails } from "@/lib/schemas";
import { cn } from "@/lib/utils";

type CatalogActor = MapActor & {
  featured?: number | null;
  highlightLabel?: string | null;
  details?: string | null;
};

type DetailFacetKey = Extract<keyof StartupDetails, "stage" | "businessModel">;

const DETAIL_FACET_LABELS: Record<DetailFacetKey, string> = {
  stage: "Estágio",
  businessModel: "Modelo de negócio"
};

const chipClassName = (active: boolean) =>
  cn(
    "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
    active
      ? "border-orange-400/60 bg-orange-500/15 text-orange-300 hover:bg-orange-500/25"
      : "border-white/10 bg-white/5 text-slate-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
  );

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
  emptyDescription,
  detailFacets = [],
  registerDefaultRole
}: {
  types: string[];
  ctaLabel: string;
  /** Quando definido, o CTA vira um link direto em vez de abrir o formulário de cadastro no mapa. */
  ctaHref?: string;
  emptyTitle: string;
  emptyDescription: string;
  /** Chaves de StartupDetails pra virar chip de filtro extra (só tem efeito quando `types` inclui "startup"). */
  detailFacets?: DetailFacetKey[];
  /** Pré-seleciona o papel no formulário de cadastro do mapa. */
  registerDefaultRole?: string;
}) {
  const { data: actors = [], isPending, isError } = useQuery({ queryKey: ["actors"], queryFn: fetchActors });
  const [segment, setSegment] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [facetFilters, setFacetFilters] = useState<Partial<Record<DetailFacetKey, string>>>({});

  const scoped = useMemo(() => actors.filter((actor) => types.includes(actor.type)), [actors, types]);

  const detailsByActor = useMemo(() => {
    // detailFacets (stage/businessModel) só são usadas para o catálogo de startups.
    const map = new Map<number, StartupDetails | null>();
    for (const actor of scoped) {
      map.set(actor.id, parseActorDetails(actor.type, actor.details ?? null) as StartupDetails | null);
    }
    return map;
  }, [scoped]);

  const segments = useMemo(
    () => Array.from(new Set(scoped.map((actor) => actor.segment))).sort((a, b) => a.localeCompare(b)),
    [scoped]
  );

  const facetOptions = useMemo(() => {
    const options = {} as Record<DetailFacetKey, string[]>;
    for (const key of detailFacets) {
      const values = new Set<string>();
      for (const actor of scoped) {
        const value = detailsByActor.get(actor.id)?.[key];
        if (value) values.add(value);
      }
      options[key] = Array.from(values).sort((a, b) => a.localeCompare(b));
    }
    return options;
  }, [detailFacets, scoped, detailsByActor]);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return scoped
      .filter((actor) => {
        if (segment && actor.segment !== segment) return false;
        for (const key of detailFacets) {
          const wanted = facetFilters[key];
          if (wanted && detailsByActor.get(actor.id)?.[key] !== wanted) return false;
        }
        if (!query) return true;
        return (
          actor.name.toLowerCase().includes(query) ||
          actor.neighborhood.toLowerCase().includes(query) ||
          actor.segment.toLowerCase().includes(query)
        );
      })
      .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }, [scoped, segment, search, detailFacets, facetFilters, detailsByActor]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por segmento">
          <button
            type="button"
            onClick={() => setSegment(null)}
            aria-pressed={segment === null}
            className={chipClassName(segment === null)}
          >
            Todos os segmentos
          </button>
          {segments.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setSegment(segment === item ? null : item)}
              aria-pressed={segment === item}
              className={chipClassName(segment === item)}
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
              aria-label="Buscar por nome, bairro ou segmento"
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
                <ActorRegisterForm defaultRole={registerDefaultRole} />
              </DialogContent>
            </Dialog>
          )}
        </div>
      </div>

      {detailFacets.length > 0 ? (
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-6 sm:gap-y-3">
          {detailFacets.map((key) => (
            <div
              key={key}
              className="flex flex-wrap items-center gap-2"
              role="group"
              aria-label={`Filtrar por ${DETAIL_FACET_LABELS[key]}`}
            >
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-500">
                {DETAIL_FACET_LABELS[key]}
              </span>
              <button
                type="button"
                onClick={() => setFacetFilters((prev) => ({ ...prev, [key]: undefined }))}
                aria-pressed={!facetFilters[key]}
                className={chipClassName(!facetFilters[key])}
              >
                Todos
              </button>
              {(facetOptions[key] ?? []).map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() =>
                    setFacetFilters((prev) => ({ ...prev, [key]: prev[key] === value ? undefined : value }))
                  }
                  aria-pressed={facetFilters[key] === value}
                  className={chipClassName(facetFilters[key] === value)}
                >
                  {value}
                </button>
              ))}
            </div>
          ))}
        </div>
      ) : null}

      {isPending ? (
        <p className="surface-panel max-w-2xl rounded-lg p-8 text-sm text-slate-300">Carregando...</p>
      ) : isError ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          Não foi possível carregar os dados agora. Tente novamente em instantes.
        </p>
      ) : filtered.length === 0 ? (
        <div className="surface-panel max-w-2xl rounded-lg p-8">
          <h2 className="font-[var(--font-space)] text-xl font-bold text-white">{emptyTitle}</h2>
          <p className="mt-3 text-sm leading-7 text-slate-300">{emptyDescription}</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {filtered.map((actor) => {
            const cardClassName = "surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1";
            const content = (
              <>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                    {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type}
                  </Badge>
                  {actor.featured ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                      <Star className="h-3.5 w-3.5 fill-amber-300" />
                      {actor.highlightLabel ?? "Destaque"}
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
                {actor.slug ? (
                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                    Ver perfil
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                ) : null}
              </>
            );
            return actor.slug ? (
              <Link key={actor.id} href={`/atores/${actor.slug}`} className={cardClassName}>
                {content}
              </Link>
            ) : (
              <div key={actor.id} className={cardClassName}>
                {content}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
