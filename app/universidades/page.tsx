import type { Metadata } from "next";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import {
  ArrowRight,
  Banknote,
  Cpu,
  Factory,
  Landmark,
  Lightbulb,
  type LucideIcon,
  Megaphone,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet
} from "lucide-react";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
import { learningTracks } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Universidades e educação | Fênix Valley",
  description:
    "Instituições de ensino, escolas técnicas e trilhas de capacitação do ecossistema de inovação de Betim, conectando estudantes a estágios, hackathons, mentorias e desafios.",
  openGraph: {
    title: "Universidades e educação | Fênix Valley",
    description:
      "Instituições de ensino, escolas técnicas e trilhas de capacitação do ecossistema de inovação de Betim."
  }
};

const TRACK_ICONS: Record<string, LucideIcon> = {
  Lightbulb,
  Presentation,
  Megaphone,
  Cpu,
  Sparkles,
  Wallet,
  Rocket,
  TrendingUp,
  Banknote,
  Landmark,
  Factory,
  ShieldCheck
};

export default async function UniversidadesPage() {
  const trilhas = await getDb()
    .select()
    .from(learningTracks)
    .where(eq(learningTracks.status, "published"))
    .orderBy(asc(learningTracks.order), asc(learningTracks.title));

  return (
    <EditorialShell active="/universidades">
      <PageHeader
        kicker="Educação & Talento"
        title="Universidades e Educação em Betim."
        accent="Educação"
        lede="Instituições de ensino, escolas técnicas, laboratórios e núcleos de pesquisa aplicada que formam talento para o ecossistema de inovação de Betim e região."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <ActorCatalog
            types={["universidade", "escola-tecnica"]}
            ctaLabel="Cadastre sua instituição"
            emptyTitle="Nenhuma instituição aprovada por enquanto."
            emptyDescription="Universidades e escolas técnicas aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria."
          />
        </EditorialReveal>
      </section>

      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                Área do estudante
              </p>
              <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                Trilhas de capacitação
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Frentes de aprendizado que conectam estudantes e empreendedores a cursos, mentorias, desafios e
                eventos do ecossistema.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-10">
            {trilhas.length === 0 ? (
              <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
                Nenhuma trilha publicada no momento.
              </p>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {trilhas.map((trilha, index) => {
                  const Icon = TRACK_ICONS[trilha.icon] ?? Lightbulb;
                  return (
                    <MotionCard
                      key={trilha.slug}
                      delay={index * 0.06}
                      className="group flex flex-col rounded-xl p-6 transition-transform hover:-translate-y-1"
                      style={{
                        background: "var(--fx-surface)",
                        border: "1px solid var(--fx-line)"
                      }}
                    >
                      <Link href={`/universidades/trilhas/${trilha.slug}`} className="flex h-full flex-col">
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-lg"
                          style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                        >
                          <Icon className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h3 className="mt-4 font-display text-lg font-semibold" style={{ color: "var(--fx-ink)" }}>
                          {trilha.title}
                        </h3>
                        <p className="mt-2 flex-1 font-body text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fx-muted)" }}>
                          {trilha.description}
                        </p>
                        <span
                          className="mt-5 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                          style={{ color: "var(--fx-accent)" }}
                        >
                          Ver trilha
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </Link>
                    </MotionCard>
                  );
                })}
              </div>
            )}
          </div>

          <EditorialReveal delay={0.2}>
            <div
              className="mt-12 flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <p className="max-w-xl font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Estágios, vagas, hackathons e mentorias para estudantes ficam reunidos na agenda de oportunidades e
                na agenda de eventos do movimento.
              </p>
              <div className="flex flex-wrap gap-4 font-mono text-xs uppercase tracking-[0.16em]">
                <Link
                  href="/oportunidades?tipo=Est%C3%A1gio"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Ver estágios
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/oportunidades?tipo=Vaga"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Ver vagas
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/eventos?categoria=Hackathon"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Ver hackathons
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/eventos?categoria=Acad%C3%AAmico"
                  className="inline-flex items-center gap-1.5 hover:underline"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Eventos acadêmicos
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
