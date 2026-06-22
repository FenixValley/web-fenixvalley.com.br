import { fraunces } from "@/app/fonts";
import { pillars } from "@/data/ecosystem";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { IndexList } from "@/components/editorial/index-list";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { EditorialMetrics } from "@/components/sections/editorial-metrics";
import { EditorialAudience } from "@/components/sections/editorial-audience";
import { EditorialEcosystem } from "@/components/sections/editorial-ecosystem";
import { EditorialPrograms } from "@/components/sections/editorial-programs";
import { EditorialContent } from "@/components/sections/editorial-content";
import { EditorialJoin } from "@/components/sections/editorial-join";

const pilares = pillars.map((p) => ({ title: p.title, description: p.description }));

export default function HomePage() {
  return (
    <EditorialShell>
      <EditorialHero />
      <EditorialMetrics />
      <EditorialAudience />
      <EditorialEcosystem />
      <EditorialPrograms />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div className="flex items-end justify-between gap-6 border-t pt-6" style={{ borderColor: "var(--fx-line)" }}>
            <div className="min-w-0 flex-1 max-w-[680px]">
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--fx-accent)" }}>
                As frentes
              </p>
              <PretextHeadline
                text="O que vive no Vale"
                fontFamily={fraunces.style.fontFamily}
                weight={600}
                level={2}
                accent="Vale"
                sizeRatio={0.062}
                minSize={26}
                maxSize={44}
                leading={1}
              />
            </div>
            <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--fx-muted)" }}>
              seis frentes
            </span>
          </div>
        </EditorialReveal>

        <div className="mt-4">
          <IndexList items={pilares} />
        </div>
      </section>

      <EditorialContent />
      <EditorialJoin />
    </EditorialShell>
  );
}
