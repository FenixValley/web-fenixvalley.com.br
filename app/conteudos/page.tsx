import type { Metadata } from "next";
import { ContentCatalog } from "@/components/sections/content-catalog";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { contentArticles } from "@/data/contents";

export const metadata: Metadata = {
  title: "Conteúdos e Notícias | Fênix Valley",
  description:
    "Notícias, artigos práticos, cases de sucesso e editais para impulsionar a inovação e o empreendedorismo em Betim e região.",
  openGraph: {
    title: "Conteúdos e Notícias | Fênix Valley",
    description:
      "Notícias, artigos práticos, cases de sucesso e editais para impulsionar a inovação e o empreendedorismo em Betim e região.",
    images: ["/logo-simbolo.png"]
  }
};

export default function ConteudosPage() {
  return (
    <EditorialShell active="/conteudos">
      <PageHeader
        kicker="Conhecimento"
        title="Conteúdos e Notícias do Ecossistema."
        accent="Notícias"
        lede="Aprenda com quem está construindo a nova economia de Betim: análises, metodologias, casos reais, oportunidades de financiamento e novidades da comunidade."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <div className="space-y-12">
          <ContentCatalog articles={contentArticles} />

          <EditorialReveal delay={0.2}>
            <div
              className="rounded-2xl p-8 sm:p-10"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <div className="max-w-2xl space-y-4">
                <h2 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Receba os novos artigos e notícias quinzenalmente
                </h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  Fique por dentro das chamadas abertas, editais municipais e eventos do Fênix Valley diretamente no seu e-mail. Sem spam.
                </p>
                <div className="pt-2">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
