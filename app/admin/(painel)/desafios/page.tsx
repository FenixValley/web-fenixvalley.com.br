import Link from "next/link";
import { count, desc, sql } from "drizzle-orm";
import { Archive, Check, Inbox, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { challengeProposals, challenges } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setChallengeStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminChallengesPage() {
  const db = getDb();
  const rows = await db.select().from(challenges).orderBy(desc(challenges.createdAt));
  const proposalCounts = await db
    .select({
      challengeId: challengeProposals.challengeId,
      total: count(),
      pending: sql<number>`sum(case when ${challengeProposals.status} = 'pending' then 1 else 0 end)`
    })
    .from(challengeProposals)
    .groupBy(challengeProposals.challengeId);

  const countsById = new Map(proposalCounts.map((item) => [item.challengeId, item]));

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="font-display text-2xl font-black text-foreground">Desafios de inovação</h1>
        <p className="font-body text-sm text-muted-foreground">
          Desafios enviados por empresas. Só os publicados aparecem em /desafios e em /empresas.
        </p>
      </div>
      {rows.length === 0 ? (
        <p className="font-body text-sm text-muted-foreground">Nenhum desafio recebido até agora.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Desafio</TableHead>
                <TableHead>Empresa</TableHead>
                <TableHead>Prazo</TableHead>
                <TableHead>Propostas</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((challenge) => {
                const counts = countsById.get(challenge.id);
                return (
                  <TableRow key={challenge.id}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{challenge.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {challenge.category} · {challenge.type}
                      </p>
                    </TableCell>
                    <TableCell>
                      <p className="text-sm text-foreground">{challenge.company}</p>
                      <p className="text-xs text-muted-foreground">{challenge.companyEmail}</p>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {challenge.deadline ?? "Contínuo"}
                    </TableCell>
                    <TableCell>
                      <Link
                        href={`/admin/desafios/${challenge.id}`}
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
                      >
                        <Inbox className="h-4 w-4" />
                        {counts?.total ?? 0}
                        {counts?.pending ? (
                          <span className="rounded-full bg-amber-500/15 px-2 py-0.5 text-xs text-amber-700">
                            {counts.pending} nova(s)
                          </span>
                        ) : null}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={challenge.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {challenge.status !== "published" ? (
                          <form
                            action={async () => {
                              "use server";
                              await setChallengeStatus(challenge.id, "published");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                              <Check className="h-4 w-4" />
                              Publicar
                            </Button>
                          </form>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await setChallengeStatus(challenge.id, "archived");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                              <Archive className="h-4 w-4" />
                              Arquivar
                            </Button>
                          </form>
                        )}
                        {challenge.status !== "rejected" ? (
                          <form
                            action={async () => {
                              "use server";
                              await setChallengeStatus(challenge.id, "rejected");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
                              <X className="h-4 w-4" />
                              Rejeitar
                            </Button>
                          </form>
                        ) : null}
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
