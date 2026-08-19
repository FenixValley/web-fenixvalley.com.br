import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, HandCoins, Lightbulb, Plus } from "lucide-react";
import { challenges } from "@/db/schema";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChallengeCard } from "@/components/sections/challenge-card";
import { ChallengeSubmitForm } from "@/components/sections/challenge-submit-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { openChallengesWhere } from "@/lib/challenges";
import { todayInBusinessTimeZone } from "@/lib/date";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Empresas e inovação corporativa | Fênix Valley",
  description:
    "Empresas e indústrias de Betim e região publicam desafios de inovação, provas de conceito e parcerias, e se conectam a startups, pesquisadores e talentos do ecossistema.",
  openGraph: {
    title: "Empresas e inovação corporativa | Fênix Valley",
    description:
      "Publique desafios de inovação aberta e conecte sua empresa a startups, pesquisadores e talentos de Betim.",
    images: ["/logo-simbolo.png"]
  }
};

const benefits = [
  {
    icon: Lightbulb,
    title: "Inovação aberta",
    body: "Publique um desafio real — automação, logística, eficiência energética, ESG, indústria 4.0 — e receba propostas de quem já está resolvendo problemas parecidos na região."
  },
  {
    icon: GraduationCap,
    title: "Acesso a talentos",
    body: "Provas de conceito e residências tecnológicas colocam estudantes e profissionais em projetos reais da sua operação, com acompanhamento das instituições parceiras."
  },
  {
    icon: HandCoins,
    title: "Patrocínio e apoio",
    body: "Empresas que apoiam eventos, programas e turmas do movimento entram na vitrine de parceiros com sua contribuição registrada de forma transparente."
  }
];

export default async function EmpresasPage() {
  const openChallenges = await getDb()
    .select()
    .from(challenges)
    .where(openChallengesWhere(todayInBusinessTimeZone()))
    .orderBy(challenges.deadline, challenges.title)
    .limit(6);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">
                  Inovação corporativa
                </p>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                  Empresas e indústrias
                </h1>
                <p className="text-lg leading-8 text-slate-300">
                  Betim tem indústria, escala e problemas complexos. O Fênix Valley aproxima essa força de
                  startups, pesquisadores e talentos locais — para que a solução do próximo desafio da sua
                  operação nasça aqui na região.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
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
                      Conte a dor da sua operação. Depois da curadoria, o desafio entra na vitrine e o
                      ecossistema passa a enviar propostas pelo portal.
                    </DialogDescription>
                    <ChallengeSubmitForm />
                  </DialogContent>
                </Dialog>
                <Button asChild variant="ghost" className="shrink-0">
                  <Link href="/seja-parceiro">
                    Apoiar o movimento
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {benefits.map((benefit) => (
                <article key={benefit.title} className="surface-panel rounded-lg p-5">
                  <benefit.icon className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  <h2 className="mt-3 font-[var(--font-space)] text-base font-bold text-white">{benefit.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{benefit.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-3xl space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Desafios abertos</p>
                <h2 className="font-[var(--font-space)] text-2xl font-black leading-tight text-white sm:text-3xl">
                  O que as empresas estão buscando agora
                </h2>
                <p className="text-lg leading-8 text-slate-300">
                  Cada desafio publicado passa pela curadoria antes de aparecer aqui. Startups, pesquisadores e
                  talentos respondem pelo próprio portal, e a coordenação acompanha a conexão.
                </p>
              </div>
              <Link
                href="/desafios"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
              >
                Ver todos os desafios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {openChallenges.length === 0 ? (
              <div className="surface-panel max-w-2xl rounded-lg p-8">
                <h3 className="font-[var(--font-space)] text-xl font-bold text-white">
                  Nenhum desafio aberto por enquanto.
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Sua empresa pode ser a primeira: publique uma dor real da operação e deixe o ecossistema
                  responder com pilotos e provas de conceito.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {openChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} as="h3" />
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Vitrine</p>
              <h2 className="font-[var(--font-space)] text-2xl font-black leading-tight text-white sm:text-3xl">
                Empresas do ecossistema
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                Indústrias, prestadoras de serviço e empresas de tecnologia que já fazem parte do mapa do
                movimento em Betim e região.
              </p>
            </div>
            <ActorCatalog
              types={["empresa"]}
              ctaLabel="Cadastre sua empresa"
              emptyTitle="Nenhuma empresa aprovada por enquanto."
              emptyDescription="As empresas aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria."
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
