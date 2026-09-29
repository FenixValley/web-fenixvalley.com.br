import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { ActorCatalog } from "@/components/sections/actor-catalog";

export const metadata: Metadata = {
  title: "Mentores | Fênix Valley",
  description:
    "Mentores do ecossistema de inovação de Betim: especialidades, temas de atuação e formas de conectar com empreendedores e projetos.",
  openGraph: {
    title: "Mentores | Fênix Valley",
    description:
      "Mentores do ecossistema de inovação de Betim: especialidades, temas de atuação e formas de conectar com empreendedores e projetos."
  }
};

export default function MentoresPage() {
  return (
    <EditorialShell active="/mentores">
      <PageHeader
        kicker="Vitrine"
        title="Mentores do Fênix Valley."
        accent="Mentores"
        lede="Profissionais que dedicam tempo para orientar startups, estudantes e projetos do ecossistema. Encontre um perfil alinhado ao desafio do seu negócio e entre em contato diretamente."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <ActorCatalog
            types={["mentor"]}
            ctaLabel="Seja um mentor"
            ctaHref="/voluntarie-se"
            emptyTitle="Nenhum mentor aprovado por enquanto."
            emptyDescription="Mentores aparecem aqui assim que aprovados pela curadoria. Cadastre-se como voluntário(a) na área de Educação e mentorias para apoiar startups e estudantes da região."
            detailFacets={["format", "availability"]}
          />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
