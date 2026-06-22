import { ecosystemMapLayers } from "@/data/ecosystem";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { EcosystemLivePanel } from "@/components/editorial/ecosystem-live-panel";
import { MotionCard } from "@/components/editorial/motion-card";
import { SectionHeading } from "@/components/editorial/section-heading";

export function EditorialEcosystem() {
  return (
    <section
      className="relative overflow-hidden border-y py-16 sm:py-24"
      style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
    >
      <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
        <SectionHeading
          kicker="O mapa vivo"
          title="Um retrato em tempo real de quem constrói em Betim."
          accent="tempo real"
          meta="ecossistema"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div className="grid gap-4">
            {ecosystemMapLayers.map((layer, index) => (
              <MotionCard
                key={layer.title}
                delay={index * 0.08}
                className="group flex items-start gap-4 rounded-2xl border p-6"
                style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
              >
                <AnimatedIcon>
                  <layer.icon className="h-5 w-5" strokeWidth={1.6} />
                </AnimatedIcon>
                <div>
                  <h3 className="font-display text-[20px] font-semibold">{layer.title}</h3>
                  <p className="mt-1.5 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                    {layer.description}
                  </p>
                </div>
              </MotionCard>
            ))}
          </div>

          <EcosystemLivePanel />
        </div>
      </div>
    </section>
  );
}
