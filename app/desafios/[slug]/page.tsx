import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { Building2, CalendarClock, ChevronRight, ExternalLink, Target } from "lucide-react";
import { challenges } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { ChallengeProposalForm } from "@/components/sections/challenge-proposal-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { formatChallengeDeadline, isChallengeClosed } from "@/lib/challenges";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const challenge = await getDb().query.challenges.findFirst({
    where: and(eq(challenges.slug, slug), eq(challenges.status, "published"))
  });

  if (!challenge) return {};

  return {
    title: `${challenge.title} | Desafios de Inovação | Fênix Valley`,
    description: challenge.description.slice(0, 160),
    openGraph: {
      title: challenge.title,
      description: challenge.description.slice(0, 160),
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function ChallengeDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const challenge = await getDb().query.challenges.findFirst({
    where: and(eq(challenges.slug, slug), eq(challenges.status, "published"))
  });

  if (!challenge) notFound();

  const closed = isChallengeClosed(challenge.deadline);

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-4xl space-y-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/desafios" className="hover:text-primary">
                Desafios
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-foreground truncate max-w-xs">{challenge.title}</span>
            </nav>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    {challenge.category}
                  </Badge>
                  <span className="text-xs font-semibold text-primary">{challenge.type}</span>
                </div>
                <FavoriteButton
                  itemType="challenge"
                  itemId={String(challenge.id)}
                  title={challenge.title}
                  subtitle={challenge.company}
                  link={`/desafios/${challenge.slug}`}
                />
              </div>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-foreground sm:text-4xl">
                {challenge.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4 text-emerald-400" />
                  {challenge.company}
                  {challenge.companySegment ? ` · ${challenge.companySegment}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4 text-primary" />
                  {challenge.deadline
                    ? `Propostas até ${formatChallengeDeadline(challenge.deadline, "long")}`
                    : "Fluxo contínuo"}
                </span>
                {challenge.companySite ? (
                  <Link
                    href={challenge.companySite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Site da empresa
                  </Link>
                ) : null}
              </div>
            </div>

            <article className="surface-panel space-y-4 rounded-lg p-6">
              <h2 className="font-[var(--font-space)] text-lg font-bold text-foreground">O desafio</h2>
              <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{challenge.description}</p>
            </article>

            {challenge.expectedOutcome ? (
              <article className="surface-panel space-y-4 rounded-lg p-6">
                <h2 className="inline-flex items-center gap-2 font-[var(--font-space)] text-lg font-bold text-foreground">
                  <Target className="h-5 w-5 text-primary" />
                  Resultado esperado
                </h2>
                <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">{challenge.expectedOutcome}</p>
              </article>
            ) : null}

            <div className="surface-panel space-y-4 rounded-lg p-6">
              <div className="space-y-2">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-foreground">
                  Apresente sua solução
                </h2>
                <p className="text-sm leading-6 text-muted-foreground">
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
