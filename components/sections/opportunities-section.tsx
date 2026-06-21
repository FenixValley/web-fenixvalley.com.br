import { Opportunity } from "@/data/opportunities";
import { fraunces } from "@/app/fonts";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { OpportunitiesTable } from "./opportunities-table";

export function OpportunitiesSection({
  opportunities,
  heading = "h2"
}: {
  opportunities: Opportunity[];
  heading?: "h1" | "h2";
}) {
  // Quando heading === "h1" o título da página é renderizado via PageHeader na
  // própria rota; aqui exibimos só a lista. Para "h2" mantemos o cabeçalho
  // editorial interno da seção.
  return (
    <section id="oportunidades" className="relative overflow-hidden py-16 sm:py-20">
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 sm:px-10">
        <div className="space-y-10">
          {heading === "h2" ? (
            <div className="max-w-[820px]">
              <EditorialReveal>
                <p
                  className="font-mono text-[11px] uppercase tracking-[0.34em]"
                  style={{ color: "var(--fx-accent)" }}
                >
                  Agenda viva
                </p>
              </EditorialReveal>
              <div className="mt-6">
                <PretextHeadline
                  text="Uma mesa aberta para projetos, conexões e próximos passos."
                  fontFamily={fraunces.style.fontFamily}
                  weight={600}
                  accent="aberta"
                  sizeRatio={0.072}
                  minSize={30}
                  maxSize={56}
                  leading={0.96}
                />
              </div>
              <EditorialReveal delay={0.2}>
                <p
                  className="mt-7 max-w-[58ch] font-body text-[18px] leading-[1.6]"
                  style={{ color: "var(--fx-muted)" }}
                >
                  Encontros, mentorias e iniciativas para aproximar quem quer criar tecnologia
                  de quem pode abrir portas, testar soluções e acelerar negócios.
                </p>
              </EditorialReveal>
            </div>
          ) : null}
          <EditorialReveal delay={heading === "h2" ? 0.3 : 0}>
            <OpportunitiesTable initialData={opportunities} />
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
