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
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Voltar para os desafios
      </Link>

      <div className="surface-panel space-y-3 rounded-lg p-5">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="font-[var(--font-space)] text-2xl font-black text-white">{challenge.title}</h1>
          <StatusBadge status={challenge.status} />
        </div>
        <p className="text-sm text-slate-400">
          {challenge.company}
          {challenge.companySegment ? ` · ${challenge.companySegment}` : ""} · {challenge.category} ·{" "}
          {challenge.type}
        </p>
        <p className="whitespace-pre-line text-sm leading-6 text-slate-300">{challenge.description}</p>
        {challenge.expectedOutcome ? (
          <p className="whitespace-pre-line text-sm leading-6 text-slate-400">
            <span className="font-semibold text-slate-200">Resultado esperado: </span>
            {challenge.expectedOutcome}
          </p>
        ) : null}
        <div className="flex flex-wrap gap-4 text-sm">
          <a
            href={`mailto:${challenge.companyEmail}`}
            className="inline-flex items-center gap-1.5 font-semibold text-orange-300 hover:text-orange-200"
          >
            <Mail className="h-4 w-4" />
            {challenge.companyEmail}
          </a>
          {challenge.companySite ? (
            <a
              href={challenge.companySite}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white"
            >
              <ExternalLink className="h-4 w-4" />
              Site da empresa
            </a>
          ) : null}
        </div>
      </div>

      <div className="space-y-4">
        <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
          Propostas recebidas ({proposals.length})
        </h2>
        {proposals.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhuma proposta enviada para este desafio até agora.</p>
        ) : (
          <div className="space-y-4">
            {proposals.map((proposal) => (
              <article key={proposal.id} className="surface-panel space-y-3 rounded-lg p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">
                      {proposal.name}
                      {proposal.organization ? ` · ${proposal.organization}` : ""}
                    </p>
                    <p className="text-xs text-slate-400">
                      {proposal.profile} · {proposal.createdAt}
                    </p>
                  </div>
                  <StatusBadge status={proposal.status} />
                </div>
                <p className="whitespace-pre-line text-sm leading-6 text-slate-300">{proposal.solution}</p>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <a
                    href={`mailto:${proposal.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-orange-300 hover:text-orange-200"
                  >
                    <Mail className="h-4 w-4" />
                    {proposal.email}
                  </a>
                  {proposal.link ? (
                    <a
                      href={proposal.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-slate-300 hover:text-white"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Material de apoio
                    </a>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {proposal.status !== "approved" ? (
                    <form
                      action={async () => {
                        "use server";
                        await setChallengeProposalStatus(proposal.id, "approved");
                      }}
                    >
                      <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
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
                      <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
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
