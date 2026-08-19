import type { Metadata } from "next";
import Link from "next/link";
import { and, eq, gte, isNull, or } from "drizzle-orm";
import { ArrowRight, Building2, CalendarClock, Plus } from "lucide-react";
import { challenges } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChallengeSubmitForm } from "@/components/sections/challenge-submit-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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

function formatDeadline(date: string) {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));
}

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

  const today = todayInBusinessTimeZone();
  const conditions = [
    eq(challenges.status, "published"),
    // Desafio sem prazo segue aberto; com prazo, sai da vitrine no dia seguinte ao encerramento.
    or(isNull(challenges.deadline), gte(challenges.deadline, today))!
  ];
  if (category) conditions.push(eq(challenges.category, category));
  if (type) conditions.push(eq(challenges.type, type));

  const rows = await getDb()
    .select()
    .from(challenges)
    .where(and(...conditions))
    .orderBy(challenges.deadline, challenges.title);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Inovação aberta</p>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                  Desafios das empresas
                </h1>
                <p className="text-lg leading-8 text-slate-300">
                  Empresas e indústrias da região publicam dores reais; startups, pesquisadores e talentos do
                  ecossistema respondem com soluções, pilotos e provas de conceito. A curadoria do Fênix Valley
                  aprova cada desafio antes da publicação.
                </p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="shrink-0">
                    <Plus className="h-4 w-4" />
                    Publicar desafio
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-h-[85vh] overflow-y-auto p-6 sm:max-w-2xl">
                  <DialogTitle>Publique um desafio de inovação</DialogTitle>
                  <DialogDescription>
                    Conte a dor da sua operação. Depois da curadoria, o desafio entra na vitrine e o ecossistema
                    passa a enviar propostas pelo portal.
                  </DialogDescription>
                  <ChallengeSubmitForm />
                </DialogContent>
              </Dialog>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
                <Link
                  href={filterHref(null, type)}
                  className={cn(
                    "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                    category === null
                      ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                      : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                  )}
                >
                  Todas as categorias
                </Link>
                {challengeCategories.map((item) => (
                  <Link
                    key={item}
                    href={filterHref(category === item ? null : item, type)}
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      category === item
                        ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
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
                    className={cn(
                      "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                      type === item
                        ? "border-sky-400/60 bg-sky-500/15 text-sky-300"
                        : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
                    )}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>

            {rows.length === 0 ? (
              <div className="surface-panel max-w-2xl rounded-lg p-8">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
                  Nenhum desafio aberto{category || type ? " com esses filtros" : " por enquanto"}.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Os desafios aparecem aqui assim que uma empresa publica e a curadoria aprova. Sua empresa tem
                  uma dor que o ecossistema pode resolver? Use o botão de publicar desafio.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {rows.map((challenge) => (
                  <Link
                    key={challenge.id}
                    href={`/desafios/${challenge.slug}`}
                    className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
                  >
                    <div className="mb-3 flex items-center justify-between gap-2">
                      <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                        {challenge.category}
                      </Badge>
                      <span className="text-xs font-semibold text-sky-300">{challenge.type}</span>
                    </div>
                    <h2 className="font-[var(--font-space)] text-lg font-bold text-white">{challenge.title}</h2>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                      {challenge.description}
                    </p>
                    <div className="mt-4 space-y-1 text-xs text-slate-400">
                      <p className="flex items-center gap-1.5">
                        <Building2 className="h-3.5 w-3.5 text-emerald-300" />
                        <span className="truncate">{challenge.company}</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <CalendarClock className="h-3.5 w-3.5 text-orange-300" />
                        {challenge.deadline
                          ? `Propostas até ${formatDeadline(challenge.deadline)}`
                          : "Fluxo contínuo"}
                      </p>
                    </div>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                      Ver desafio
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
