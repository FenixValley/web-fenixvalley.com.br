import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { ArrowRight, Handshake, Star } from "lucide-react";
import { partners } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getDb } from "@/lib/db";
import { partnerCategories } from "@/lib/schemas";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Parceiros e patrocinadores | Fênix Valley",
  description:
    "Instituições de ensino, empresas, poder público e organizações de apoio que sustentam o Fênix Valley, organizadas por categoria de contribuição.",
  openGraph: {
    title: "Parceiros e patrocinadores | Fênix Valley",
    description: "Quem sustenta o movimento de inovação de Betim, por categoria de apoio.",
    images: ["/logo-simbolo.png"]
  }
};

export default async function PartnersPage() {
  const rows = await getDb()
    .select()
    .from(partners)
    .where(eq(partners.status, "published"))
    .orderBy(asc(partners.order), asc(partners.name));

  const byCategory = partnerCategories
    .map((category) => ({ category, items: rows.filter((partner) => partner.category === category) }))
    .filter((group) => group.items.length > 0);

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
                  Quem sustenta o movimento
                </p>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                  Parceiros e patrocinadores
                </h1>
                <p className="text-lg leading-8 text-slate-300">
                  Nenhum ecossistema se constrói sozinho. Instituições de ensino, empresas, poder público e
                  organizações de apoio cedem espaços, mentores, desafios, tecnologia e patrocínio — e cada
                  contribuição fica registrada de forma transparente.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/seja-parceiro">
                  <Handshake className="h-4 w-4" />
                  Seja um parceiro
                </Link>
              </Button>
            </div>

            {byCategory.length === 0 ? (
              <div className="surface-panel max-w-2xl rounded-lg p-8">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
                  A vitrine de parceiros está sendo montada.
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-300">
                  Publicamos aqui apenas parcerias formalizadas com a coordenação. Sua organização quer ser uma
                  das primeiras? Fale com a gente pela página{" "}
                  <Link href="/seja-parceiro" className="font-bold text-orange-300 hover:text-orange-200">
                    Seja um parceiro
                  </Link>
                  .
                </p>
              </div>
            ) : (
              <div className="space-y-12">
                {byCategory.map((group) => (
                  <div key={group.category} className="space-y-4">
                    <h2 className="font-[var(--font-space)] text-xl font-bold text-white">{group.category}</h2>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {group.items.map((partner) => (
                        <Link
                          key={partner.id}
                          href={`/parceiros/${partner.slug}`}
                          className="surface-panel group flex flex-col rounded-lg p-5 transition-transform hover:-translate-y-1"
                        >
                          {/* Os cards já vêm agrupados por categoria, então o topo mostra só o
                              logo (quando houver) e o selo de fundador. */}
                          <div className="mb-3 flex min-h-[2.5rem] items-center justify-between gap-2">
                            {partner.logoUrl ? (
                              <Image
                                src={partner.logoUrl}
                                alt={partner.name}
                                width={120}
                                height={40}
                                className="h-10 w-auto max-w-[60%] object-contain"
                              />
                            ) : (
                              <span aria-hidden="true" />
                            )}
                            {partner.founding ? (
                              <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                                <Star className="h-3.5 w-3.5 fill-amber-300" />
                                Fundador
                              </span>
                            ) : null}
                          </div>
                          <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{partner.name}</h3>
                          <p className="mt-2 flex-1 text-sm leading-6 text-slate-300 line-clamp-3">
                            {partner.description}
                          </p>
                          {partner.since ? (
                            <p className="mt-4 text-xs text-slate-400">Parceiro desde {partner.since}</p>
                          ) : null}
                          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-orange-300 group-hover:text-orange-200">
                            Ver parceiro
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
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
