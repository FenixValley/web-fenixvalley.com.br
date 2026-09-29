import { metrics } from "@/data/ecosystem";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SpotlightCard } from "@/components/editorial/spotlight-card";

export function EditorialMetrics() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10">
      <div
        className="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3"
        style={{ borderColor: "var(--fx-line)", background: "var(--fx-line)" }}
      >
        {metrics.map((metric, index) => (
          <SpotlightCard
            key={metric.value}
            delay={index * 0.08}
            className="flex h-full flex-col gap-1 p-8"
            style={{ background: "var(--fx-paper)" }}
            spotlightColor="rgba(27, 59, 255, 0.12)"
          >
            <span
              className="font-display text-[42px] font-semibold leading-none tracking-tight"
              style={{ color: "var(--fx-accent)" }}
            >
              <AnimatedCounter value={metric.value} />
            </span>
            <span className="font-display text-[20px] font-medium" style={{ color: "var(--fx-ink)" }}>
              {metric.label}
            </span>
            <span className="mt-1 font-body text-[14px] leading-[1.5]" style={{ color: "var(--fx-muted)" }}>
              {metric.detail}
            </span>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
