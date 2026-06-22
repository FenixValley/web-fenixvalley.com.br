import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { EcosystemMap } from "@/components/map/ecosystem-map";

export const metadata: Metadata = {
  title: "Mapa do ecossistema | Fênix Valley",
  description:
    "Mapa interativo de startups, universidades, empresas, hubs e espaços de inovação de Betim."
};

export default function MapPage() {
  return (
    <EditorialShell active="/mapa">
      <PageHeader
        kicker="Mapa Fênix Valley"
        title="Quem constrói o ecossistema de inovação de Betim."
        accent="constrói"
        lede="Startups, universidades, empresas, hubs e espaços em um mapa vivo. Filtre por tipo, busque por bairro e cadastre sua organização."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <EcosystemMap />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
