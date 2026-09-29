import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { ActorCatalog } from "@/components/sections/actor-catalog";

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
    <EditorialShell active="/espacos">
      <PageHeader
        kicker="Infraestrutura"
        title="Espaços do Fênix Valley."
        accent="Espaços"
        lede="Coworkings, laboratórios e hubs de inovação disponíveis para eventos, reuniões e rotina de trabalho das startups e comunidades do ecossistema."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <ActorCatalog
            types={["coworking", "laboratorio", "hub"]}
            ctaLabel="Cadastre seu espaço"
            emptyTitle="Nenhum espaço aprovado por enquanto."
            emptyDescription="Coworkings, laboratórios e hubs aparecem aqui assim que cadastrados no mapa do ecossistema e aprovados pela curadoria."
            detailFacets={["usageType"]}
          />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
