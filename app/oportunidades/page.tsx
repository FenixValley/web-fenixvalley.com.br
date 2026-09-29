import type { Metadata } from "next";
import { opportunities } from "@/data/opportunities";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { opportunityTypes } from "@/lib/schemas";
import { todayInBusinessTimeZone } from "@/lib/date";

export const metadata: Metadata = {
  title: "Oportunidades | Fênix Valley",
  description:
    "Encontros, mentorias, editais, chamadas e iniciativas abertas do ecossistema de inovação de Betim."
};

export default async function OpportunitiesPage({
  searchParams
}: {
  searchParams: Promise<{ tipo?: string }>;
}) {
  const { tipo } = await searchParams;
  const initialType = opportunityTypes.find((type) => type === tipo) ?? null;
  const today = todayInBusinessTimeZone();
  const activeOpportunities = opportunities.filter((opportunity) => opportunity.date >= today);

  return (
    <EditorialShell active="/oportunidades">
      <PageHeader
        kicker="Agenda viva"
        title="Uma mesa aberta para projetos, conexões e próximos passos."
        accent="aberta"
        lede="Encontros, mentorias, editais e iniciativas para aproximar quem quer criar tecnologia de quem pode abrir portas, testar soluções e acelerar negócios."
      />
      <OpportunitiesSection opportunities={activeOpportunities} heading="h1" initialType={initialType} />
    </EditorialShell>
  );
}
