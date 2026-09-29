import type { Metadata } from "next";
import { ContentCatalog } from "@/components/sections/content-catalog";
import { NewsletterForm } from "@/components/sections/newsletter-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-10">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Conhecimento</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-foreground sm:text-4xl">
                Conteúdos e Notícias do Ecossistema
              </h1>
              <p className="text-lg leading-8 text-muted-foreground">
                Aprenda com quem está construindo a nova economia de Betim: análises, metodologias, casos reais,
                oportunidades de financiamento e novidades da comunidade.
              </p>
            </div>

            <ContentCatalog articles={contentArticles} />

            <div className="surface-panel rounded-2xl p-8 sm:p-10">
              <div className="max-w-2xl space-y-4">
                <h2 className="font-[var(--font-space)] text-2xl font-bold text-foreground">
                  Receba os novos artigos e notícias quinzenalmente
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
                  Fique por dentro das chamadas abertas, editais municipais e eventos do Fênix Valley diretamente no seu e-mail. Sem spam.
                </p>
                <div className="pt-2">
                  <NewsletterForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
