import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { Building2, CalendarClock, ChevronRight, ExternalLink, Target } from "lucide-react";
import { challenges } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { ChallengeProposalForm } from "@/components/sections/challenge-proposal-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { formatChallengeDeadline } from "@/lib/challenges";
import { todayInBusinessTimeZone } from "@/lib/date";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

// generateMetadata e a página buscam o mesmo desafio: o cache() da request evita
// as duas idas ao D1.
const getPublishedChallenge = cache(async (slug: string) =>
  getDb().query.challenges.findFirst({
    where: and(eq(challenges.slug, slug), eq(challenges.status, "published"))
  })
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getPublishedChallenge(slug);
  if (!challenge) return { title: "Desafio não encontrado | Fênix Valley" };
  return {
    title: `${challenge.title} | Desafios Fênix Valley`,
    description: challenge.description,
    openGraph: {
      title: `${challenge.title} | Fênix Valley`,
      description: challenge.description,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function ChallengeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const challenge = await getPublishedChallenge(slug);
  if (!challenge) notFound();

  const closed = challenge.deadline !== null && challenge.deadline < todayInBusinessTimeZone();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-4xl space-y-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/desafios" className="hover:text-orange-200">
                Desafios
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{challenge.title}</span>
            </nav>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {challenge.category}
                </Badge>
                <span className="text-xs font-semibold text-sky-300">{challenge.type}</span>
              </div>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {challenge.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-emerald-300" />
                  {challenge.company}
                  {challenge.companySegment ? ` · ${challenge.companySegment}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4 text-orange-300" />
                  {challenge.deadline
                    ? `Propostas até ${formatChallengeDeadline(challenge.deadline, "long")}`
                    : "Fluxo contínuo"}
                </span>
                {challenge.companySite ? (
                  <Link
                    href={challenge.companySite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-orange-300 hover:text-orange-200"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Site da empresa
                  </Link>
                ) : null}
              </div>
            </div>

            <article className="surface-panel space-y-4 rounded-lg p-6">
              <h2 className="font-[var(--font-space)] text-lg font-bold text-white">O desafio</h2>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{challenge.description}</p>
            </article>

            {challenge.expectedOutcome ? (
              <article className="surface-panel space-y-4 rounded-lg p-6">
                <h2 className="inline-flex items-center gap-2 font-[var(--font-space)] text-lg font-bold text-white">
                  <Target className="h-5 w-5 text-orange-300" />
                  Resultado esperado
                </h2>
                <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{challenge.expectedOutcome}</p>
              </article>
            ) : null}

            <div className="surface-panel space-y-4 rounded-lg p-6">
              <div className="space-y-2">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">
                  Apresente sua solução
                </h2>
                <p className="text-sm leading-6 text-slate-300">
                  Startups, pesquisadores, times de pesquisa e profissionais da região podem responder a este
                  desafio. A curadoria valida cada envio antes de apresentar à empresa — seus dados não ficam
                  públicos.
                </p>
              </div>
              {closed ? (
                <p className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-300">
                  O prazo de propostas deste desafio já encerrou. Acompanhe os desafios abertos em{" "}
                  <Link href="/desafios" className="font-bold underline">
                    /desafios
                  </Link>
                  .
                </p>
              ) : (
                <ChallengeProposalForm challengeId={challenge.id} />
              )}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
