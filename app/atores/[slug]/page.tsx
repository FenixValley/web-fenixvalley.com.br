import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { ArrowUpRight, ChevronRight, Mail, MapPin, MapPinned } from "lucide-react";
import { actors } from "@/db/schema";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
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
    <EditorialShell active="/mapa">
      <PageHeader kicker={typeLabel} title={actor.name} />

      <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-12 sm:px-10">
        <EditorialReveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--fx-muted)" }}
          >
            <Link href="/" className="transition-colors hover:text-[color:var(--fx-accent)]">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href="/mapa" className="transition-colors hover:text-[color:var(--fx-accent)]">
              Mapa do ecossistema
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span style={{ color: "var(--fx-ink)" }}>{actor.name}</span>
          </nav>
        </EditorialReveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <EditorialReveal delay={0.1}>
            <div className="max-w-[58ch] space-y-6">
              <p
                className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em]"
                style={{ color: "var(--fx-muted)" }}
              >
                <MapPin className="h-4 w-4" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                {actor.neighborhood}, Betim · {actor.segment}
              </p>
              <p className="font-body text-[18px] leading-[1.7]" style={{ color: "var(--fx-ink)" }}>
                {actor.description}
              </p>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.2}>
            <aside
              className="flex flex-col gap-3 border p-6"
              style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
            >
              <p
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: "var(--fx-accent)" }}
              >
                Contato
              </p>

              {actor.email ? (
                <a
                  href={`mailto:${actor.email}`}
                  className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={{ background: "var(--fx-accent)", color: "#ffffff" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Entrar em contato
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}

              {actor.site && isHttpUrl(actor.site) ? (
                <a
                  href={actor.site}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={
                    actor.email
                      ? { border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }
                      : { background: "var(--fx-accent)", color: "#ffffff" }
                  }
                >
                  Visitar site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}

              <Link
                href="/mapa"
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                  Ver no mapa
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {!actor.email && !actor.site ? (
                <p className="font-body text-[14px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                  Esta organização ainda não informou canais de contato. Fale com a coordenação em{" "}
                  <Link href="/contato" className="underline transition-colors hover:text-[color:var(--fx-accent)]">
                    /contato
                  </Link>{" "}
                  para chegar até ela.
                </p>
              ) : null}
            </aside>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
