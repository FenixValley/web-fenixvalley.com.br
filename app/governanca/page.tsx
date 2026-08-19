import type { Metadata } from "next";
import Link from "next/link";
import { and, asc, eq } from "drizzle-orm";
import { ArrowRight, ChevronRight, ScrollText, ShieldCheck, Star, Users } from "lucide-react";
import { partners } from "@/db/schema";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">Governança</span>
            </nav>

            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Como nos organizamos</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Governança e transparência
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Um movimento que pede confiança de empresas, universidades e poder público precisa deixar claro
                quem decide o quê, sob quais regras e com qual prestação de contas. Esta página reúne a estrutura
                do Fênix Valley, as políticas que valem para todos e os compromissos assumidos publicamente.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {governanceBodies.map((body) => (
                <article key={body.title} className="surface-panel rounded-lg p-5">
                  <Users className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  <h2 className="mt-3 font-[var(--font-space)] text-lg font-bold text-white">{body.title}</h2>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
                    {body.role}
                  </p>
                  <ul className="mt-3 space-y-2">
                    {body.responsibilities.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-slate-300">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-orange-300" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            <p className="max-w-3xl text-sm leading-6 text-slate-400">
              A composição nominal de cada instância é publicada conforme os colegiados são formalizados. Para
              falar com a coordenação, use os canais em{" "}
              <Link href="/contato" className="font-bold text-orange-300 hover:text-orange-200">
                /contato
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-6">
            <div className="max-w-3xl space-y-4">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-amber-300" aria-hidden="true" />
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Parceiros fundadores</h2>
              </div>
              <p className="text-sm leading-6 text-slate-300">
                Organizações que sustentaram o movimento desde o início, com espaços, mentoria, tecnologia ou
                patrocínio.
              </p>
            </div>
            {foundingPartners.length === 0 ? (
              <p className="surface-panel max-w-2xl rounded-lg p-6 text-sm leading-7 text-slate-300">
                A lista de parceiros fundadores é publicada assim que as primeiras parcerias forem formalizadas.
                Quer estar entre elas? Comece por{" "}
                <Link href="/seja-parceiro" className="font-bold text-orange-300 hover:text-orange-200">
                  Seja um parceiro
                </Link>
                .
              </p>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {foundingPartners.map((partner) => (
                  <Link
                    key={partner.id}
                    href={`/parceiros/${partner.slug}`}
                    className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
                  >
                    <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{partner.name}</h3>
                    <p className="mt-1 text-xs text-slate-400">{partner.category}</p>
                    <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                      {partner.contribution}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                      Ver parceiro
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative grid gap-8 lg:grid-cols-2">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ScrollText className="h-5 w-5 text-sky-300" aria-hidden="true" />
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Políticas legais</h2>
              </div>
              <div className="space-y-3">
                {governancePolicies.map((policy) => (
                  <Link
                    key={policy.href}
                    href={policy.href}
                    className="surface-panel group block rounded-lg p-5 transition-transform hover:-translate-y-0.5"
                  >
                    <h3 className="font-[var(--font-space)] text-base font-bold text-white">{policy.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-300">{policy.description}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                      Ler
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-emerald-300" aria-hidden="true" />
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Prestação de contas</h2>
              </div>
              <ul className="space-y-3">
                {accountabilityCommitments.map((commitment) => (
                  <li key={commitment} className="surface-panel rounded-lg p-4 text-sm leading-6 text-slate-300">
                    {commitment}
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-6 text-slate-400">
                Os números apurados ficam em{" "}
                <Link href="/impacto" className="font-bold text-orange-300 hover:text-orange-200">
                  /impacto
                </Link>
                , e as parcerias registradas em{" "}
                <Link href="/parceiros" className="font-bold text-orange-300 hover:text-orange-200">
                  /parceiros
                </Link>
                .
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
