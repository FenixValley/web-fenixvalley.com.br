import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import { Building2, CalendarClock, ChevronRight, ExternalLink, Target } from "lucide-react";
import { challenges } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { FavoriteButton } from "@/components/ui/favorite-button";
import { ChallengeProposalForm } from "@/components/sections/challenge-proposal-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
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
    <EditorialShell active="/desafios">
      <PageHeader kicker={challenge.category} title={challenge.title} lede={challenge.company} />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-4xl space-y-10">
          <EditorialReveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--fx-muted)" }}
            >
              <Link href="/" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/desafios" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Desafios
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate max-w-xs" style={{ color: "var(--fx-ink)" }}>{challenge.title}</span>
            </nav>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap items-center gap-3">
                  <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                    {challenge.category}
                  </Badge>
                  <span className="font-mono text-xs uppercase tracking-[0.14em]" style={{ color: "var(--fx-accent)" }}>
                    {challenge.type}
                  </span>
                </div>
                <FavoriteButton
                  itemType="challenge"
                  itemId={String(challenge.id)}
                  title={challenge.title}
                  subtitle={challenge.company}
                  link={`/desafios/${challenge.slug}`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-sm" style={{ color: "var(--fx-muted)" }}>
                <span className="inline-flex items-center gap-1.5">
                  <Building2 className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                  {challenge.company}
                  {challenge.companySegment ? ` · ${challenge.companySegment}` : ""}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CalendarClock className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                  {challenge.deadline
                    ? `Propostas até ${formatChallengeDeadline(challenge.deadline, "long")}`
                    : "Fluxo contínuo"}
                </span>
                {challenge.companySite ? (
                  <Link
                    href={challenge.companySite}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] hover:underline"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    Site da empresa
                  </Link>
                ) : null}
              </div>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.15}>
            <article
              className="space-y-4 rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>O desafio</h2>
              <p className="whitespace-pre-line font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                {challenge.description}
              </p>
            </article>
          </EditorialReveal>

          {challenge.expectedOutcome ? (
            <EditorialReveal delay={0.2}>
              <article
                className="space-y-4 rounded-2xl p-6 sm:p-8"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <h2 className="inline-flex items-center gap-2 font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  <Target className="h-5 w-5" style={{ color: "var(--fx-accent)" }} />
                  Resultado esperado
                </h2>
                <p className="whitespace-pre-line font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  {challenge.expectedOutcome}
                </p>
              </article>
            </EditorialReveal>
          ) : null}

          <EditorialReveal delay={0.25}>
            <div
              className="space-y-6 rounded-2xl p-6 sm:p-8"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <div className="space-y-2">
                <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Apresente sua solução
                </h2>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  Startups, pesquisadores, times de pesquisa e profissionais da região podem responder a este
                  desafio. A curadoria valida cada envio antes de apresentar à empresa — seus dados não ficam
                  públicos.
                </p>
              </div>
              {closed ? (
                <div
                  className="rounded-xl border p-4 font-body text-sm"
                  style={{ borderColor: "rgba(234, 88, 12, 0.3)", background: "rgba(234, 88, 12, 0.08)", color: "rgb(194, 65, 12)" }}
                >
                  O prazo de propostas deste desafio já encerrou. Acompanhe os desafios abertos em{" "}
                  <Link href="/desafios" className="font-bold underline">
                    /desafios
                  </Link>
                  .
                </div>
              ) : (
                <ChallengeProposalForm challengeId={challenge.id} />
              )}
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
