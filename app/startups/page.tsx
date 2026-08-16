import type { Metadata } from "next";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Startups | Fênix Valley",
  description:
    "Vitrine das startups do ecossistema de inovação de Betim e região: segmentos, estágio e formas de conectar com cada negócio."
};

export default function StartupsPage() {
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
                Startups do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Negócios inovadores nascidos ou baseados em Betim e região, prontos para conectar com clientes,
                parceiros, programas de aceleração e investidores. Startups em destaque são selecionadas pela
                curadoria do movimento.
              </p>
            </div>
            <ActorCatalog
              types={["startup"]}
              ctaLabel="Cadastre sua startup"
              emptyTitle="Nenhuma startup aprovada por enquanto."
              emptyDescription="As startups aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria. Cadastre a sua para fazer parte da vitrine."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
