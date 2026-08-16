import type { Metadata } from "next";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Investidores | Fênix Valley",
  description:
    "Investidores conectados ao ecossistema de inovação de Betim: teses de investimento, estágios e segmentos de interesse."
};

export default function InvestidoresPage() {
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
                Investidores do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Investidores-anjo, fundos e aceleradoras com apetite para negócios de Betim e região. Conheça o
                perfil de cada um e solicite contato direto com as startups em busca de aporte.
              </p>
            </div>
            <ActorCatalog
              types={["investidor"]}
              ctaLabel="Cadastre-se como investidor"
              emptyTitle="Nenhum investidor aprovado por enquanto."
              emptyDescription="Investidores aparecem aqui assim que cadastrados no mapa do ecossistema e aprovados pela curadoria."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
