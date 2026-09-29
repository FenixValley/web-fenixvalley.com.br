import { fraunces } from "@/app/fonts";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

// Cabeçalho padrão das páginas internas: kicker mono + headline diagramado pelo
// pretext + lede opcional. Reaproveitado em todas as rotas editoriais.
export function PageHeader({
  kicker,
  title,
  accent,
  lede
}: {
  kicker: string;
  title: string;
  accent?: string;
  lede?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b" style={{ borderColor: "var(--fx-line)" }}>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-20%] z-0"
        style={{
          background:
            "radial-gradient(50% 60% at 88% 0%, rgba(27,59,255,0.12), transparent 70%), radial-gradient(40% 50% at 6% 100%, rgba(56,189,248,0.08), transparent 72%)"
        }}
      />
      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-14 pt-14 sm:px-10 sm:pt-20">
        <EditorialReveal>
          <p className="font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: "var(--fx-accent)" }}>
            {kicker}
          </p>
        </EditorialReveal>
        <div className="mt-6 max-w-[820px]">
          <PretextHeadline
            text={title}
            fontFamily={fraunces.style.fontFamily}
            weight={600}
            accent={accent}
            sizeRatio={0.092}
            minSize={34}
            maxSize={78}
            leading={0.94}
          />
        </div>
        {lede ? (
          <EditorialReveal delay={0.2}>
            <p className="mt-7 max-w-[58ch] font-body text-[18px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
              {lede}
            </p>
          </EditorialReveal>
        ) : null}
      </div>
    </section>
  );
}
