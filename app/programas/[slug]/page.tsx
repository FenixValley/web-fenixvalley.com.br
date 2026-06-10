import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { CalendarDays, CheckCircle2, Users } from "lucide-react";
import { getProgram } from "@/data/programs";
import { programSettings } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { ProgramApplyForm } from "@/components/sections/program-apply-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative grid gap-10 lg:grid-cols-[1.05fr_.95fr] lg:items-start">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {program.tag}
                </Badge>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                  {program.title}
                </h1>
                <p className="text-lg leading-8 text-slate-300">{program.description}</p>
              </div>

              <div className="surface-panel space-y-3 rounded-lg p-5">
                <p className="flex items-center gap-2 text-sm font-bold text-white">
                  <Users className="h-4 w-4 text-orange-300" />
                  Para quem é
                </p>
                <p className="text-sm leading-6 text-slate-300">{program.audience}</p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {program.steps.map((step) => (
                  <div key={step} className="surface-panel rounded-lg p-4 text-center">
                    <CheckCircle2 className="mx-auto mb-2 h-5 w-5 text-emerald-400" />
                    <p className="text-sm font-bold text-white">{step}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Critérios de participação</h2>
                <ul className="space-y-2">
                  {program.criteria.map((criterion) => (
                    <li key={criterion} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                      <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-orange-300" />
                      {criterion}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="flex items-start gap-2 text-sm leading-6 text-slate-400">
                <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-sky-300" />
                {program.calendar}
              </p>
            </div>

            <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-crisp sm:p-7">
              {inscriptionsOpen ? (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-400">
                      Inscrições abertas
                    </p>
                    <h2 className="font-[var(--font-space)] text-xl font-bold">
                      Inscreva-se em {program.title}
                    </h2>
                  </div>
                  <ProgramApplyForm programSlug={program.slug} />
                </div>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-slate-400">
                    Inscrições fechadas
                  </p>
                  <h2 className="font-[var(--font-space)] text-xl font-bold">
                    Nenhuma turma aberta no momento
                  </h2>
                  <p className="text-sm leading-6 text-slate-300">
                    As chamadas são divulgadas na agenda do ecossistema e na comunidade. Entre no
                    grupo do WhatsApp ou acompanhe as oportunidades na home para saber quando a
                    próxima turma abrir.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
