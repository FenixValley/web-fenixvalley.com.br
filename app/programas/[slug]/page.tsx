import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { getProgram } from "@/data/programs";
import { programSettings } from "@/db/schema";
import { ProgramApplyForm } from "@/components/sections/program-apply-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { MotionCard } from "@/components/editorial/motion-card";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) return { title: "Programa não encontrado | Fênix Valley" };
  return {
    title: `${program.title} | Programas Fênix Valley`,
    description: program.summary
  };
}

export default async function ProgramPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = getProgram(slug);
  if (!program) notFound();

  const settings = await getDb().query.programSettings.findFirst({
    where: eq(programSettings.slug, program.slug)
  });
  const inscriptionsOpen = Boolean(settings?.inscriptionsOpen);

  return (
    <EditorialShell active="/programas">
      <PageHeader kicker={program.tag} title={program.title} lede={program.description} />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
          <div className="space-y-8">
            <MotionCard
              className="space-y-3 p-5"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <p className="flex items-center gap-3 font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--fx-accent)" }}>
                <AnimatedIcon>
                  <Users className="h-5 w-5" strokeWidth={1.6} />
                </AnimatedIcon>
                Para quem é
              </p>
              <p className="font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                {program.audience}
              </p>
            </MotionCard>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {program.steps.map((step, index) => (
                <MotionCard
                  key={step}
                  delay={index * 0.06}
                  className="p-4 text-center"
                  style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
                >
                  <CheckCircle2 className="mx-auto mb-2 h-5 w-5" style={{ color: "var(--fx-accent)" }} />
                  <p className="font-body text-[14px] font-semibold" style={{ color: "var(--fx-ink)" }}>{step}</p>
                </MotionCard>
              ))}
            </div>

            <EditorialReveal delay={0.16}>
              <div className="space-y-3">
                <h2 className="font-display text-[22px] font-semibold" style={{ color: "var(--fx-ink)" }}>
                  Critérios de participação
                </h2>
                <ul className="space-y-2">
                  {program.criteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-2 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>
            </EditorialReveal>

            <EditorialReveal delay={0.24}>
              <p className="flex items-start gap-2 font-body text-[14px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0" style={{ color: "var(--fx-accent)" }} />
                {program.calendar}
              </p>
            </EditorialReveal>
          </div>

          <MotionCard
            delay={0.1}
            className="p-5 sm:p-7"
            style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
          >
            <div>
              {inscriptionsOpen ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--fx-accent)" }}>
                      Inscrições abertas
                    </p>
                    <h2 className="font-display text-[22px] font-semibold" style={{ color: "var(--fx-ink)" }}>
                      Inscreva-se em {program.title}
                    </h2>
                  </div>
                  <ProgramApplyForm programSlug={program.slug} />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="font-mono text-[12px] uppercase tracking-[0.18em]" style={{ color: "var(--fx-muted)" }}>
                    Inscrições fechadas
                  </p>
                  <h2 className="font-display text-[22px] font-semibold" style={{ color: "var(--fx-ink)" }}>
                    Nenhuma turma aberta no momento
                  </h2>
                  <p className="font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                    As chamadas são divulgadas na agenda do ecossistema e na comunidade. Entre no
                    grupo do WhatsApp ou acompanhe as oportunidades na home para saber quando a
                    próxima turma abrir.
                  </p>
                </div>
              )}
            </div>
          </MotionCard>
        </div>
      </section>
    </EditorialShell>
  );
}
