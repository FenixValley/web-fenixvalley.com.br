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
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Educação</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Universidades e educação
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Instituições de ensino, escolas técnicas, laboratórios e núcleos de pesquisa aplicada que formam
                talento para o ecossistema de inovação de Betim e região.
              </p>
            </div>
            <ActorCatalog
              types={["universidade", "escola-tecnica"]}
              ctaLabel="Cadastre sua instituição"
              emptyTitle="Nenhuma instituição aprovada por enquanto."
              emptyDescription="Universidades e escolas técnicas aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria."
            />
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Área do estudante</p>
              <h2 className="font-[var(--font-space)] text-2xl font-black leading-tight text-white sm:text-3xl">
                Trilhas de capacitação
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                Frentes de aprendizado que conectam estudantes e empreendedores a cursos, mentorias, desafios e
                eventos do ecossistema. Cada trilha é reforçada pela agenda de eventos e pelas oportunidades em
                andamento.
              </p>
            </div>
            {trilhas.length === 0 ? (
              <p className="text-sm text-slate-400">Nenhuma trilha publicada no momento.</p>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {trilhas.map((trilha) => {
                  const Icon = TRACK_ICONS[trilha.icon] ?? Lightbulb;
                  return (
                    <Link
                      key={trilha.slug}
                      href={`/universidades/trilhas/${trilha.slug}`}
                      className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
                    >
                      <Icon className="h-6 w-6 text-orange-300" aria-hidden="true" />
                      <h3 className="mt-3 font-[var(--font-space)] text-base font-bold text-white">{trilha.title}</h3>
                      <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                        {trilha.description}
                      </p>
                      <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                        Ver trilha
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            )}
            <div className="surface-panel flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                Estágios, vagas, hackathons e mentorias para estudantes ficam reunidos na agenda de oportunidades e
                na agenda de eventos do movimento.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/oportunidades?tipo=Est%C3%A1gio"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver estágios
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/oportunidades?tipo=Vaga"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver vagas
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/eventos?categoria=Hackathon"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver hackathons
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/eventos?categoria=Acad%C3%AAmico"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver eventos acadêmicos
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
