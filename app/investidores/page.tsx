import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { ActorCatalog } from "@/components/sections/actor-catalog";

export const metadata: Metadata = {
  title: "Investidores | Fênix Valley",
  description:
    "Investidores conectados ao ecossistema de inovação de Betim: teses de investimento, estágios e segmentos de interesse.",
  openGraph: {
    title: "Investidores | Fênix Valley",
    description:
      "Investidores conectados ao ecossistema de inovação de Betim: teses de investimento, estágios e segmentos de interesse."
  }
};

export default function InvestidoresPage() {
  return (
    <EditorialShell active="/investidores">
      <PageHeader
        kicker="Capital & Crescimento"
        title="Investidores do Fênix Valley."
        accent="Investidores"
        lede="Investidores-anjo, fundos e aceleradoras com apetite para negócios de Betim e região. Conheça o perfil de cada um e solicite contato direto com as startups em busca de aporte."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <ActorCatalog
            types={["investidor", "aceleradora"]}
            ctaLabel="Cadastre-se como investidor"
            emptyTitle="Nenhum investidor aprovado por enquanto."
            emptyDescription="Investidores aparecem aqui assim que cadastrados no mapa do ecossistema e aprovados pela curadoria."
            detailFacets={["stage", "region"]}
          />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
