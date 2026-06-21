import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { VolunteerForm } from "@/components/sections/volunteer-form";

export const metadata: Metadata = {
  title: "Voluntarie-se | Fênix Valley",
  description:
    "Inscreva-se para ser voluntário(a) da comunidade Fênix Valley e ajudar a construir o ecossistema de inovação de Betim."
};

export default function VolunteerPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="brand-grid absolute inset-x-0 top-0 h-96 opacity-50" aria-hidden="true" />
          <div className="section-shell relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Voluntariado</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                O movimento é feito por quem coloca a mão na massa.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Voluntários e voluntárias organizam eventos, produzem conteúdo, mentoram projetos e
                mantêm a comunidade viva. Conte como você quer contribuir e a coordenação entra em
                contato.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-crisp sm:p-7">
              <VolunteerForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
