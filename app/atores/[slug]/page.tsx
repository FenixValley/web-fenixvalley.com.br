import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ChevronRight, ExternalLink, Linkedin, Mail, MapPin, MapPinned, PlayCircle, Star } from "lucide-react";
import { actors } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { parseActorDetails } from "@/lib/actor-details";
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
    description: actor.description,
    openGraph: {
      title: `${actor.name} | Fênix Valley`,
      description: actor.description,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function ActorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = await getApprovedActor(slug);
  if (!actor) notFound();

  const typeLabel = actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type;
  const details = parseActorDetails(actor.type, actor.details);

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
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {typeLabel}
                </Badge>
                {actor.featured ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                    {actor.highlightLabel ?? "Destaque"}
                  </span>
                ) : null}
              </div>
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

            {details ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha da startup</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {details.foundedYear ? (
                    <FactItem label="Fundação" value={details.foundedYear} />
                  ) : null}
                  {details.stage ? <FactItem label="Estágio" value={details.stage} /> : null}
                  {details.businessModel ? (
                    <FactItem label="Modelo de negócio" value={details.businessModel} />
                  ) : null}
                </div>
                {details.founders ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Fundadores</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{details.founders}</p>
                  </div>
                ) : null}
                {details.techFocus?.length ? (
                  <TagList label="Foco tecnológico" items={details.techFocus} />
                ) : null}
                {details.needs?.length ? <TagList label="Buscando" items={details.needs} /> : null}
                {details.pitchVideoUrl || details.linkedin ? (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {details.pitchVideoUrl ? (
                      <Button asChild size="sm" variant="ghost">
                        <a href={details.pitchVideoUrl} target="_blank" rel="noreferrer">
                          <PlayCircle className="h-4 w-4" />
                          Assistir pitch
                        </a>
                      </Button>
                    ) : null}
                    {details.linkedin ? (
                      <Button asChild size="sm" variant="ghost">
                        <a href={details.linkedin} target="_blank" rel="noreferrer">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

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

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-200">{value}</p>
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="border-white/10 bg-white/5 text-slate-300">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
