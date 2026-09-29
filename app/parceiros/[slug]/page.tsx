import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cache } from "react";
import { and, eq } from "drizzle-orm";
import { ChevronRight, ExternalLink, HandHeart, Star } from "lucide-react";
import { partners } from "@/db/schema";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

const getPublishedPartner = cache(async (slug: string) =>
  getDb().query.partners.findFirst({
    where: and(eq(partners.slug, slug), eq(partners.status, "published"))
  })
);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const partner = await getPublishedPartner(slug);
  if (!partner) return { title: "Parceiro não encontrado | Fênix Valley" };
  return {
    title: `${partner.name} | Parceiros Fênix Valley`,
    description: partner.description,
    openGraph: {
      title: `${partner.name} | Fênix Valley`,
      description: partner.description,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function PartnerProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const partner = await getPublishedPartner(slug);
  if (!partner) notFound();

  return (
    <EditorialShell active="/parceiros">
      <PageHeader kicker={partner.category} title={partner.name} lede={partner.description} />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-3xl space-y-10">
          <EditorialReveal>
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "var(--fx-muted)" }}
            >
              <Link href="/" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/parceiros" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Parceiros
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span style={{ color: "var(--fx-ink)" }}>{partner.name}</span>
            </nav>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <div className="space-y-5">
              {partner.logoUrl ? (
                <div className="rounded-xl border p-4 w-fit" style={{ borderColor: "var(--fx-line)", background: "#ffffff" }}>
                  <Image
                    src={partner.logoUrl}
                    alt={partner.name}
                    width={200}
                    height={64}
                    className="h-14 w-auto object-contain"
                  />
                </div>
              ) : null}

              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                  {partner.category}
                </Badge>
                {partner.founding ? (
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em]"
                    style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                  >
                    <Star className="h-3 w-3 fill-current" />
                    Parceiro fundador
                  </span>
                ) : null}
                {partner.since ? (
                  <span className="font-mono text-xs" style={{ color: "var(--fx-muted)" }}>
                    Parceiro desde {partner.since}
                  </span>
                ) : null}
              </div>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.15}>
            <article
              className="space-y-4 rounded-xl p-6 sm:p-8"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <h2 className="inline-flex items-center gap-2 font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                <HandHeart className="h-5 w-5" style={{ color: "var(--fx-accent)" }} />
                Como apoia o Fênix Valley
              </h2>
              <p className="whitespace-pre-line font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                {partner.contribution}
              </p>
            </article>
          </EditorialReveal>

          <EditorialReveal delay={0.2}>
            <div className="flex flex-wrap gap-4 pt-2">
              {partner.site ? (
                <Button asChild className="font-mono text-xs uppercase tracking-[0.16em]">
                  <Link href={partner.site} target="_blank" rel="noreferrer">
                    Visitar site
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="outline" className="font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/parceiros">Ver todos os parceiros</Link>
              </Button>
              <Button asChild variant="ghost" className="font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/seja-parceiro">Seja um parceiro</Link>
              </Button>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
