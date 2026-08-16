import type { Metadata } from "next";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Vitrine</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Mentores do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Profissionais que dedicam tempo para orientar startups, estudantes e projetos do ecossistema.
                Encontre um perfil alinhado ao desafio do seu negócio e entre em contato diretamente.
              </p>
            </div>
            <ActorCatalog
              types={["mentor"]}
              ctaLabel="Seja um mentor"
              ctaHref="/voluntarie-se"
              emptyTitle="Nenhum mentor aprovado por enquanto."
              emptyDescription="Mentores aparecem aqui assim que aprovados pela curadoria. Cadastre-se como voluntário(a) na área de Educação e mentorias para apoiar startups e estudantes da região."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
