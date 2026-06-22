import type { Metadata } from "next";
import { opportunities } from "@/data/opportunities";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";

export const metadata: Metadata = {
  title: "Oportunidades | Fênix Valley",
  description:
    "Encontros, mentorias, editais, chamadas e iniciativas abertas do ecossistema de inovação de Betim."
};

export default function OpportunitiesPage() {
  return (
    <EditorialShell active="/oportunidades">
      <PageHeader
        kicker="Agenda viva"
        title="Uma mesa aberta para projetos, conexões e próximos passos."
        accent="aberta"
        lede="Encontros, mentorias, editais e iniciativas para aproximar quem quer criar tecnologia de quem pode abrir portas, testar soluções e acelerar negócios."
      />
      <OpportunitiesSection opportunities={opportunities} heading="h1" />
    </EditorialShell>
  );
}
