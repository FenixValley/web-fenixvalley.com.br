import { metrics } from "@/data/ecosystem";
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
            className="h-full p-8"
            style={{ background: "var(--fx-paper)" }}
            spotlightColor="rgba(27, 59, 255, 0.12)"
          >
            <div className="flex h-full flex-col justify-between gap-3">
              <div>
                <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                  <span
                    className="font-display text-[38px] font-semibold leading-none tracking-tight"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    {metric.value}
                  </span>
                  <span
                    className="font-display text-[20px] font-medium leading-snug"
                    style={{ color: "var(--fx-ink)" }}
                  >
                    {metric.label}
                  </span>
                </div>
                <p
                  className="mt-3 block font-body text-[14px] leading-[1.6]"
                  style={{ color: "var(--fx-muted)" }}
                >
                  {metric.detail}
                </p>
              </div>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
