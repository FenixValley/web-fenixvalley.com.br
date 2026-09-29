import { contentTracks, newsItems } from "@/data/ecosystem";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { MotionCard } from "@/components/editorial/motion-card";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { SectionHeading } from "@/components/editorial/section-heading";

export function EditorialContent() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <SectionHeading
        kicker="Conteúdo & comunidade"
        title="O que mantém o ecossistema conectado e em movimento."
        accent="movimento"
        meta="trilhas vivas"
      />

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {contentTracks.map((track, index) => (
          <MotionCard
            key={track.title}
            delay={index * 0.08}
            className="group flex h-full flex-col gap-4 rounded-2xl border p-7"
            style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
          >
            <AnimatedIcon>
              <track.icon className="h-5 w-5" strokeWidth={1.6} />
            </AnimatedIcon>
            <h3 className="font-display text-[20px] font-semibold">{track.title}</h3>
            <p className="font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
              {track.description}
            </p>
          </MotionCard>
        ))}
      </div>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-2xl border sm:grid-cols-3" style={{ borderColor: "var(--fx-line)", background: "var(--fx-line)" }}>
        {newsItems.map((item, index) => (
          <EditorialReveal key={item.title} delay={index * 0.06}>
            <li className="h-full p-6" style={{ background: "var(--fx-paper)" }}>
              <span className="font-mono text-[12px]" style={{ color: "var(--fx-accent)" }}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-2 font-display text-[18px] font-semibold">{item.title}</h4>
              <p className="mt-1.5 font-body text-[14px] leading-[1.55]" style={{ color: "var(--fx-muted)" }}>
                {item.description}
              </p>
            </li>
          </EditorialReveal>
        ))}
      </ol>
    </section>
  );
}
