import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { asc, eq } from "drizzle-orm";
import { ArrowRight, Handshake, Star } from "lucide-react";
import { partners } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
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
    <EditorialShell active="/parceiros">
      <PageHeader
        kicker="Quem sustenta o movimento"
        title="Parceiros e patrocinadores do Fênix Valley."
        accent="Parceiros"
        lede="Instituições de ensino, empresas, poder público e organizações de apoio cedem espaços, mentores, desafios, tecnologia e patrocínio — e cada contribuição fica registrada com transparência."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Nenhum ecossistema se constrói sozinho. Conheça as instituições que viabilizam o movimento e como se juntar a elas.
            </p>
            <Button asChild className="shrink-0 font-mono text-xs uppercase tracking-[0.16em]">
              <Link href="/seja-parceiro">
                <Handshake className="h-4 w-4" />
                Seja um parceiro
              </Link>
            </Button>
          </div>
        </EditorialReveal>

        <div className="mt-12">
          {byCategory.length === 0 ? (
            <div
              className="max-w-2xl rounded-xl p-8 font-body"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                A vitrine de parceiros está sendo montada.
              </h2>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Publicamos aqui apenas parcerias formalizadas com a coordenação. Sua organização quer ser uma
                das primeiras? Fale com a gente pela página{" "}
                <Link href="/seja-parceiro" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                  Seja um parceiro
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {byCategory.map((group) => (
                <div key={group.category} className="space-y-4">
                  <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                    {group.category}
                  </h2>
                  <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                    {group.items.map((partner, index) => (
                      <MotionCard
                        key={partner.id}
                        delay={index * 0.06}
                        className="group flex flex-col rounded-xl p-6 transition-transform hover:-translate-y-1"
                        style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
                      >
                        <Link href={`/parceiros/${partner.slug}`} className="flex h-full flex-col">
                          <div className="mb-4 flex min-h-[2.5rem] items-center justify-between gap-2">
                            {partner.logoUrl ? (
                              <Image
                                src={partner.logoUrl}
                                alt={partner.name}
                                width={120}
                                height={40}
                                className="h-9 w-auto max-w-[60%] object-contain"
                              />
                            ) : (
                              <span aria-hidden="true" />
                            )}
                            {partner.founding ? (
                              <span
                                className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                              >
                                <Star className="h-3 w-3 fill-current" />
                                Fundador
                              </span>
                            ) : null}
                          </div>
                          <h3 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                            {partner.name}
                          </h3>
                          <p className="mt-2 flex-1 font-body text-sm leading-relaxed line-clamp-3" style={{ color: "var(--fx-muted)" }}>
                            {partner.description}
                          </p>
                          {partner.since ? (
                            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>
                              Parceiro desde {partner.since}
                            </p>
                          ) : null}
                          <span
                            className="mt-4 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.16em]"
                            style={{ color: "var(--fx-accent)" }}
                          >
                            Ver parceiro
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </Link>
                      </MotionCard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </EditorialShell>
  );
}
