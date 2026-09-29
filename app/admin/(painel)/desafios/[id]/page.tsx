import Link from "next/link";
import { notFound } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { ArrowLeft, Check, ExternalLink, Mail, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { challengeProposals, challenges } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setChallengeProposalStatus } from "../../actions";

export const dynamic = "force-dynamic";

export default async function AdminChallengeProposalsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const challengeId = Number(id);
  if (!Number.isInteger(challengeId)) notFound();

  const db = getDb();
  const challenge = await db.query.challenges.findFirst({ where: eq(challenges.id, challengeId) });
  if (!challenge) notFound();

  const proposals = await db
    .select()
    .from(challengeProposals)
    .where(eq(challengeProposals.challengeId, challengeId))
    .orderBy(desc(challengeProposals.createdAt));

  return (
    <div className="space-y-6">
      <Link
        href="/admin/desafios"
        className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para os desafios
      </Link>

      <div
        className="space-y-3 rounded-xl border border-border p-6"
        style={{ background: "var(--fx-paper)" }}
      >
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-display text-2xl font-black text-foreground">{challenge.title}</h1>
          <StatusBadge status={challenge.status} />
        </div>
        <p className="font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
          {challenge.company}
          {challenge.companySegment ? ` · ${challenge.companySegment}` : ""} · {challenge.category} ·{" "}
          {challenge.type}
        </p>
        <p className="whitespace-pre-line font-body text-sm leading-relaxed text-foreground">{challenge.description}</p>
        {challenge.expectedOutcome ? (
          <p className="whitespace-pre-line font-body text-sm leading-relaxed text-muted-foreground">
            <span className="font-semibold text-foreground">Resultado esperado: </span>
            {challenge.expectedOutcome}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-4 pt-2 font-mono text-xs">
          <a
            href={`mailto:${challenge.companyEmail}`}
            className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
          >
            <Mail className="h-4 w-4" />
            {challenge.companyEmail}
          </a>
          {challenge.companySite ? (
            <a
              href={challenge.companySite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground hover:text-foreground"
            >
              <ExternalLink className="h-4 w-4" />
              Site da empresa
            </a>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-display text-xl font-bold text-foreground">
          Propostas recebidas ({proposals.length})
        </h2>
        {proposals.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">Nenhuma proposta enviada para este desafio até agora.</p>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <article
                key={proposal.id}
                className="space-y-3 rounded-xl border border-border p-5"
                style={{ background: "var(--fx-surface)" }}
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-display font-semibold text-foreground">
                      {proposal.name}
                      {proposal.organization ? ` · ${proposal.organization}` : ""}
                    </p>
                    <p className="font-mono text-xs text-muted-foreground">
                      {proposal.profile} · {proposal.createdAt}
                    </p>
                  </div>
                  <StatusBadge status={proposal.status} gender="f" />
                </div>
                <p className="whitespace-pre-line font-body text-sm leading-relaxed text-foreground">{proposal.solution}</p>
                <div className="flex flex-wrap items-center gap-4 font-mono text-xs">
                  <a
                    href={`mailto:${proposal.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    <Mail className="h-4 w-4" />
                    {proposal.email}
                  </a>
                  {proposal.link ? (
                    <a
                      href={proposal.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-muted-foreground hover:text-foreground"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Material de apoio
                    </a>
                  ) : null}
                </div>
                <div className="flex items-center gap-2 pt-1">
                  {proposal.status !== "approved" ? (
                    <form
                      action={async () => {
                        "use server";
                        await setChallengeProposalStatus(proposal.id, "approved");
                      }}
                    >
                      <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                        <Check className="h-4 w-4" />
                        Aprovar e encaminhar
                      </Button>
                    </form>
                  ) : null}
                  {proposal.status !== "rejected" ? (
                    <form
                      action={async () => {
                        "use server";
                        await setChallengeProposalStatus(proposal.id, "rejected");
                      }}
                    >
                      <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
                        <X className="h-4 w-4" />
                        Rejeitar
                      </Button>
                    </form>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
