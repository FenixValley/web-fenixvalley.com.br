import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { STARTUP_ROLE_VALUE } from "@/data/mapa-form";

export const metadata: Metadata = {
  title: "Startups | Fênix Valley",
  description:
    "Vitrine das startups do ecossistema de inovação de Betim e região: segmentos, estágio e formas de conectar com cada negócio.",
  openGraph: {
    title: "Startups | Fênix Valley",
    description:
      "Vitrine das startups do ecossistema de inovação de Betim e região: segmentos, estágio e formas de conectar com cada negócio.",
    images: ["/logo-simbolo.png"]
  }
};

export default function StartupsPage() {
  return (
    <EditorialShell active="/startups">
      <PageHeader
        kicker="Vitrine"
        title="Startups do Fênix Valley."
        accent="Startups"
        lede="Negócios inovadores nascidos ou baseados em Betim e região, prontos para conectar com clientes, parceiros, programas de aceleração e investidores."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <ActorCatalog
            types={["startup"]}
            ctaLabel="Cadastre sua startup"
            emptyTitle="Nenhuma startup aprovada por enquanto."
            emptyDescription="As startups aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria. Cadastre a sua para fazer parte da vitrine."
            detailFacets={["stage", "businessModel"]}
            registerDefaultRole={STARTUP_ROLE_VALUE}
          />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
