import type { Metadata } from "next";
import { opportunities } from "@/data/opportunities";
import { OpportunitiesSection } from "@/components/sections/opportunities-section";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { opportunityTypes } from "@/lib/schemas";

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

  return (
    <>
      <SiteHeader />
      <main>
        <OpportunitiesSection opportunities={opportunities} heading="h1" initialType={initialType} />
      </main>
      <SiteFooter />
    </>
  );
}
