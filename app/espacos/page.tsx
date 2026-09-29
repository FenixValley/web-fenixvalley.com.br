import type { Metadata } from "next";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Espaços | Fênix Valley",
  description:
    "Coworkings, laboratórios e hubs de inovação do ecossistema de Betim: estrutura, localização e como reservar.",
  openGraph: {
    title: "Espaços | Fênix Valley",
    description: "Coworkings, laboratórios e hubs de inovação do ecossistema de Betim."
  }
};

export default function EspacosPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Vitrine</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Espaços do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Coworkings, laboratórios e hubs de inovação disponíveis para eventos, reuniões e rotina de
                trabalho das startups e comunidades do ecossistema.
              </p>
            </div>
            <ActorCatalog
              types={["coworking", "laboratorio", "hub"]}
              ctaLabel="Cadastre seu espaço"
              emptyTitle="Nenhum espaço aprovado por enquanto."
              emptyDescription="Coworkings, laboratórios e hubs aparecem aqui assim que cadastrados no mapa do ecossistema e aprovados pela curadoria."
              detailFacets={["usageType"]}
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
