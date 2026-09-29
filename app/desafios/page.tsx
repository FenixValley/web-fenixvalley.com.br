import type { Metadata } from "next";
import Link from "next/link";
import { and, eq } from "drizzle-orm";
import { Plus } from "lucide-react";
import { challenges } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChallengeCard } from "@/components/sections/challenge-card";
import { ChallengeSubmitForm } from "@/components/sections/challenge-submit-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { openChallengesWhere } from "@/lib/challenges";
import { todayInBusinessTimeZone } from "@/lib/date";
import { getDb } from "@/lib/db";
import { challengeCategories, challengeTypes } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Desafios de inovação | Fênix Valley",
  description:
    "Desafios, provas de conceito e parcerias publicados por empresas e indústrias de Betim e região, abertos a startups, pesquisadores e talentos do ecossistema.",
  openGraph: {
    title: "Desafios de inovação | Fênix Valley",
    description:
      "Desafios de inovação aberta publicados por empresas de Betim e região, abertos a startups, pesquisadores e talentos.",
    images: ["/logo-simbolo.png"]
  }
};

function filterHref(category: string | null, type: string | null) {
  const params = new URLSearchParams();
  if (category) params.set("categoria", category);
  if (type) params.set("tipo", type);
  const query = params.toString();
  return query ? `/desafios?${query}` : "/desafios";
}

export default async function ChallengesPage({
  searchParams
}: {
  searchParams: Promise<{ categoria?: string; tipo?: string }>;
}) {
  const { categoria, tipo } = await searchParams;
  const category = challengeCategories.find((item) => item === categoria) ?? null;
  const type = challengeTypes.find((item) => item === tipo) ?? null;

  const conditions = [openChallengesWhere(todayInBusinessTimeZone())];
  if (category) conditions.push(eq(challenges.category, category));
  if (type) conditions.push(eq(challenges.type, type));

  const rows = await getDb()
    .select()
    .from(challenges)
    .where(and(...conditions))
    .orderBy(challenges.deadline, challenges.title);

  return (
    <EditorialShell active="/desafios">
      <PageHeader
        kicker="Inovação aberta"
        title="Desafios de inovação das empresas."
        accent="Desafios"
        lede="Empresas e indústrias da região publicam dores reais; startups, pesquisadores e talentos do ecossistema respondem com soluções, pilotos e provas de conceito."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Explore os desafios com inscrições abertas ou registre uma nova dor da sua operação.
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="shrink-0 font-mono text-xs uppercase tracking-[0.16em]">
                  <Plus className="h-4 w-4" />
                  Publicar desafio
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-2xl" style={{ background: "var(--fx-paper)" }}>
                <DialogTitle className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Publique um desafio de inovação
                </DialogTitle>
                <DialogDescription className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
                  Conte a dor da sua operação. Depois da curadoria, o desafio entra na vitrine e o ecossistema
                  passa a enviar propostas pelo portal.
                </DialogDescription>
                <ChallengeSubmitForm />
              </DialogContent>
            </Dialog>
          </div>
        </EditorialReveal>

        {/* Filters */}
        <div className="mt-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
            <Link
              href={filterHref(null, type)}
              aria-current={category === null ? "page" : undefined}
              className={cn(
                "rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                category === null
                  ? "border-primary/60 bg-primary/10 text-primary font-bold"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              Todas as categorias
            </Link>
            {challengeCategories.map((item) => (
              <Link
                key={item}
                href={filterHref(category === item ? null : item, type)}
                aria-current={category === item ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                  category === item
                    ? "border-primary/60 bg-primary/10 text-primary font-bold"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {item}
              </Link>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por tipo de chamada">
            {challengeTypes.map((item) => (
              <Link
                key={item}
                href={filterHref(category, type === item ? null : item)}
                aria-current={type === item ? "page" : undefined}
                className={cn(
                  "rounded-full border px-3 py-1.5 font-mono text-xs uppercase tracking-wider transition-colors",
                  type === item
                    ? "border-primary/60 bg-primary/10 text-primary font-bold"
                    : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
                )}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="mt-10">
          {rows.length === 0 ? (
            <div
              className="max-w-2xl rounded-xl p-8 font-body"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Nenhum desafio aberto{category || type ? " com esses filtros" : " por enquanto"}.
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Os desafios aparecem aqui assim que uma empresa publica e a curadoria aprova. Sua empresa tem
                uma dor que o ecossistema pode resolver? Use o botão de publicar desafio.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {rows.map((challenge) => (
                <ChallengeCard key={challenge.id} challenge={challenge} />
              ))}
            </div>
          )}
        </div>
      </section>
    </EditorialShell>
  );
}
