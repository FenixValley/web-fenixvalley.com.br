import type { Metadata } from "next";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { VolunteerForm } from "@/components/sections/volunteer-form";

export const metadata: Metadata = {
  title: "Voluntarie-se | Fênix Valley",
  description:
    "Inscreva-se para ser voluntário(a) da comunidade Fênix Valley e ajudar a construir o ecossistema de inovação de Betim."
};

export default function VolunteerPage() {
  return (
    <EditorialShell active="/voluntarie-se">
      <PageHeader
        kicker="Voluntariado"
        title="O movimento é feito por quem coloca a mão na massa."
        accent="mão na massa"
        lede="Voluntários e voluntárias organizam eventos, produzem conteúdo, mentoram projetos e mantêm a comunidade viva. Conte como você quer contribuir e a coordenação entra em contato."
      />
      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div
            className="rounded-2xl border bg-[var(--fx-paper)] p-5 shadow-sm sm:p-8"
            style={{ borderColor: "var(--fx-line)" }}
          >
            <VolunteerForm />
          </div>
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
