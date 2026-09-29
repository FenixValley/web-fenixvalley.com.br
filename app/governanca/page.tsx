import type { Metadata } from "next";
import Link from "next/link";
import { and, asc, eq } from "drizzle-orm";
import { ArrowRight, ScrollText, ShieldCheck, Star, Users } from "lucide-react";
import { partners } from "@/db/schema";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
import { accountabilityCommitments, governanceBodies, governancePolicies } from "@/data/governance";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Governança | Fênix Valley",
  description:
    "Como o Fênix Valley se organiza: coordenação, conselho, comitê de curadoria, parceiros fundadores, políticas legais e compromissos de prestação de contas.",
  openGraph: {
    title: "Governança | Fênix Valley",
    description: "Estrutura, políticas e compromissos de transparência do movimento.",
    images: ["/logo-simbolo.png"]
  }
};

export default async function GovernancaPage() {
  const foundingPartners = await getDb()
    .select()
    .from(partners)
    .where(and(eq(partners.status, "published"), eq(partners.founding, 1)))
    .orderBy(asc(partners.order), asc(partners.name));

  return (
    <EditorialShell active="/governanca">
      <PageHeader
        kicker="Governança"
        title="Transparência e regras que sustentam o movimento."
        accent="Transparência"
        lede="Um movimento que pede confiança de empresas, universidades e poder público precisa deixar claro quem decide o quê, sob quais regras e com qual prestação de contas."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
              Como nos organizamos
            </p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
              Instâncias de coordenação
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              A estrutura colegiada que orienta as decisões, a curadoria e as prioridades do ecossistema.
            </p>
          </div>
        </EditorialReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {governanceBodies.map((body, index) => (
            <MotionCard
              key={body.title}
              delay={index * 0.08}
              className="flex flex-col rounded-xl p-6"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-lg"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                <Users className="h-5 w-5" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                {body.title}
              </h3>
              <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--fx-accent)" }}>
                {body.role}
              </p>
              <ul className="mt-4 space-y-2 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                {body.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--fx-accent)" }} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </MotionCard>
          ))}
        </div>

        <p className="mt-8 font-body text-sm" style={{ color: "var(--fx-muted)" }}>
          A composição nominal de cada instância é publicada conforme os colegiados são formalizados. Para
          falar com a coordenação, use o canal em{" "}
          <Link href="/comunidade" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
            Comunidade
          </Link>
          .
        </p>
      </section>

      {/* Parceiros Fundadores */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                  Parceiros fundadores
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Organizações que sustentaram o movimento desde o início, com espaços, mentoria, tecnologia ou patrocínio.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-10">
            {foundingPartners.length === 0 ? (
              <div
                className="max-w-2xl rounded-xl p-6 font-body text-sm leading-relaxed"
                style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)", color: "var(--fx-muted)" }}
              >
                A lista de parceiros fundadores é publicada assim que as primeiras parcerias forem formalizadas.
                Quer estar entre elas? Comece por{" "}
                <Link href="/seja-parceiro" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                  Seja um parceiro
                </Link>
                .
              </div>
            ) : (
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {foundingPartners.map((partner) => (
                  <Link
                    key={partner.id}
                    href={`/parceiros/${partner.slug}`}
                    className="group flex flex-col rounded-xl p-6 transition-transform hover:-translate-y-1"
                    style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
                  >
                    <h3 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                      {partner.name}
                    </h3>
                    <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: "var(--fx-muted)" }}>
                      {partner.category}
                    </p>
                    <p className="mt-2 flex-1 font-body text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fx-muted)" }}>
                      {partner.contribution}
                    </p>
                    <span
                      className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                      style={{ color: "var(--fx-accent)" }}
                    >
                      Ver parceiro
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Políticas Legais & Prestação de Contas */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Políticas Legais */}
          <div className="space-y-6">
            <EditorialReveal>
              <div className="flex items-center gap-2">
                <ScrollText className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Políticas legais
                </h2>
              </div>
            </EditorialReveal>

            <div className="space-y-3">
              {governancePolicies.map((policy) => (
                <Link
                  key={policy.href}
                  href={policy.href}
                  className="group block rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                  style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
                >
                  <h3 className="font-display text-base font-bold" style={{ color: "var(--fx-ink)" }}>
                    {policy.title}
                  </h3>
                  <p className="mt-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                    {policy.description}
                  </p>
                  <span
                    className="mt-3 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Ler política
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Prestação de contas */}
          <div className="space-y-6">
            <EditorialReveal>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Prestação de contas
                </h2>
              </div>
            </EditorialReveal>

            <ul className="space-y-3">
              {accountabilityCommitments.map((commitment) => (
                <li
                  key={commitment}
                  className="rounded-xl p-5 font-body text-sm leading-relaxed"
                  style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
                >
                  {commitment}
                </li>
              ))}
            </ul>
            <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
              Os números apurados ficam em{" "}
              <Link href="/impacto" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                /impacto
              </Link>
              , e as parcerias registradas em{" "}
              <Link href="/parceiros" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                /parceiros
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
