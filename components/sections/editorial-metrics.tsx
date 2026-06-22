import { metrics } from "@/data/ecosystem";
import { MotionCard } from "@/components/editorial/motion-card";

export function EditorialMetrics() {
  return (
    <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10">
      <div className="grid gap-px overflow-hidden rounded-2xl border md:grid-cols-3" style={{ borderColor: "var(--fx-line)", background: "var(--fx-line)" }}>
        {metrics.map((metric, index) => (
          <MotionCard
            key={metric.value}
            delay={index * 0.08}
            className="flex h-full flex-col gap-1 p-8"
            style={{ background: "var(--fx-paper)" }}
          >
            <span className="font-display text-[40px] font-semibold leading-none" style={{ color: "var(--fx-accent)" }}>
              {metric.value}
            </span>
            <span className="font-display text-[20px] font-medium">{metric.label}</span>
            <span className="mt-1 font-body text-[14px] leading-[1.5]" style={{ color: "var(--fx-muted)" }}>
              {metric.detail}
            </span>
          </MotionCard>
        ))}
      </div>
    </section>
  );
}
