import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, HandCoins, Lightbulb, Plus } from "lucide-react";
import { challenges } from "@/db/schema";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChallengeCard } from "@/components/sections/challenge-card";
import { ChallengeSubmitForm } from "@/components/sections/challenge-submit-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
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
    <EditorialShell active="/empresas">
      <PageHeader
        kicker="Inovação corporativa"
        title="Empresas e indústrias conectadas à inovação."
        accent="indústrias"
        lede="Betim tem indústria, escala e problemas complexos. O Fênix Valley aproxima essa força de startups, pesquisadores e talentos locais — para que a solução do próximo desafio da sua operação nasça aqui na região."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Conecte sua corporação à rede de talentos e soluções tecnológicas do ecossistema.
            </p>
            <div className="flex flex-wrap gap-3">
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
                    Conte a dor da sua operação. Depois da curadoria, o desafio entra na vitrine e o
                    ecossistema passa a enviar propostas pelo portal.
                  </DialogDescription>
                  <ChallengeSubmitForm />
                </DialogContent>
              </Dialog>
              <Button asChild variant="outline" className="shrink-0 font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/seja-parceiro">
                  Apoiar o movimento
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </EditorialReveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <MotionCard
                key={benefit.title}
                delay={index * 0.08}
                className="flex flex-col rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h2 className="mt-4 font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                  {benefit.title}
                </h2>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  {benefit.body}
                </p>
              </MotionCard>
            );
          })}
        </div>
      </section>

      {/* Desafios abertos */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="max-w-2xl space-y-3">
                <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                  Desafios abertos
                </p>
                <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                  O que as empresas estão buscando agora
                </h2>
                <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  Cada desafio publicado passa pela curadoria antes de aparecer aqui.
                </p>
              </div>
              <Link
                href="/desafios"
                className="inline-flex shrink-0 items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] hover:underline"
                style={{ color: "var(--fx-accent)" }}
              >
                Ver todos os desafios
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </EditorialReveal>

          <div className="mt-10">
            {openChallenges.length === 0 ? (
              <div
                className="max-w-2xl rounded-xl p-8 font-body"
                style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
              >
                <h3 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Nenhum desafio aberto por enquanto.
                </h3>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  Sua empresa pode ser a primeira: publique uma dor real da operação e deixe o ecossistema
                  responder com pilotos e provas de conceito.
                </p>
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {openChallenges.map((challenge) => (
                  <ChallengeCard key={challenge.id} challenge={challenge} as="h3" />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Vitrine de empresas */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
              Vitrine
            </p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
              Empresas do ecossistema
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Indústrias, prestadoras de serviço e empresas de tecnologia que já fazem parte do mapa em Betim e região.
            </p>
          </div>
        </EditorialReveal>

        <div className="mt-10">
          <ActorCatalog
            types={["empresa"]}
            ctaLabel="Cadastre sua empresa"
            emptyTitle="Nenhuma empresa aprovada por enquanto."
            emptyDescription="As empresas aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria."
          />
        </div>
      </section>
    </EditorialShell>
  );
}
