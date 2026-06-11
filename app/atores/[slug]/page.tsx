import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ChevronRight, ExternalLink, Mail, MapPin, MapPinned } from "lucide-react";
import { actors } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getDb } from "@/lib/db";
import { actorTypeLabels } from "@/lib/schemas";

export const dynamic = "force-dynamic";

async function getApprovedActor(slug: string) {
  return getDb().query.actors.findFirst({
    where: and(eq(actors.slug, slug), eq(actors.status, "approved"))
  });
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
  const actor = await getApprovedActor(slug);
  if (!actor) return { title: "Ator não encontrado | Fênix Valley" };
  return {
    title: `${actor.name} | Mapa Fênix Valley`,
    description: actor.description
  };
}

export default async function ActorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = await getApprovedActor(slug);
  if (!actor) notFound();

  const typeLabel = actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type;

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-3xl space-y-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/mapa" className="hover:text-orange-200">
                Mapa do ecossistema
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{actor.name}</span>
            </nav>

            <div className="space-y-4">
              <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                {typeLabel}
              </Badge>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {actor.name}
              </h1>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-300" />
                {actor.neighborhood}, Betim · {actor.segment}
              </p>
            </div>

            <div className="surface-panel rounded-lg p-6">
              <p className="text-base leading-8 text-slate-300">{actor.description}</p>
            </div>

            <div className="flex flex-wrap gap-3">
              {actor.email ? (
                <Button asChild>
                  <a href={`mailto:${actor.email}`}>
                    <Mail className="h-4 w-4" />
                    Entrar em contato
                  </a>
                </Button>
              ) : null}
              {actor.site && isHttpUrl(actor.site) ? (
                <Button asChild variant={actor.email ? "ghost" : "default"}>
                  <a href={actor.site} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visitar site
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <Link href="/mapa">
                  <MapPinned className="h-4 w-4" />
                  Ver no mapa
                </Link>
              </Button>
            </div>

            {!actor.email && !actor.site ? (
              <p className="text-sm leading-6 text-slate-400">
                Esta organização ainda não informou canais de contato. Fale com a coordenação em{" "}
                <Link href="/contato" className="text-orange-300 hover:text-orange-200">
                  /contato
                </Link>{" "}
                para chegar até ela.
              </p>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
