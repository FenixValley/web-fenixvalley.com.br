import { fraunces } from "@/app/fonts";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

// Cabeçalho de seção: kicker mono + headline diagramado pelo pretext (h2).
export function SectionHeading({
  kicker,
  title,
  accent,
  meta
}: {
  kicker: string;
  title: string;
  accent?: string;
  meta?: string;
}) {
  return (
    <EditorialReveal>
      <div className="flex items-end justify-between gap-6 border-t pt-6" style={{ borderColor: "var(--fx-line)" }}>
        <div className="min-w-0 flex-1 max-w-[760px]">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--fx-accent)" }}>
            {kicker}
          </p>
          <PretextHeadline
            text={title}
            fontFamily={fraunces.style.fontFamily}
            weight={600}
            level={2}
            accent={accent}
            sizeRatio={0.062}
            minSize={26}
            maxSize={44}
            leading={1}
          />
        </div>
        {meta ? (
          <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--fx-muted)" }}>
            {meta}
          </span>
        ) : null}
      </div>
    </EditorialReveal>
  );
}
