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
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

// generateMetadata e a página buscam o mesmo parceiro: o cache() da request evita
// as duas idas ao D1.
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-4xl space-y-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/parceiros" className="hover:text-orange-200">
                Parceiros
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{partner.name}</span>
            </nav>

            <div className="space-y-4">
              {partner.logoUrl ? (
                <Image
                  src={partner.logoUrl}
                  alt={partner.name}
                  width={200}
                  height={64}
                  className="h-16 w-auto object-contain"
                />
              ) : null}
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {partner.category}
                </Badge>
                {partner.founding ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                    Parceiro fundador
                  </span>
                ) : null}
                {partner.since ? <span className="text-xs text-slate-400">Parceiro desde {partner.since}</span> : null}
              </div>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {partner.name}
              </h1>
              <p className="text-lg leading-8 text-slate-300">{partner.description}</p>
            </div>

            <article className="surface-panel space-y-4 rounded-lg p-6">
              <h2 className="inline-flex items-center gap-2 font-[var(--font-space)] text-lg font-bold text-white">
                <HandHeart className="h-5 w-5 text-orange-300" />
                Como apoia o Fênix Valley
              </h2>
              <p className="whitespace-pre-line text-sm leading-7 text-slate-300">{partner.contribution}</p>
            </article>

            <div className="flex flex-wrap gap-3">
              {partner.site ? (
                <Button asChild>
                  <Link href={partner.site} target="_blank" rel="noreferrer">
                    Visitar site
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <Link href="/parceiros">Ver todos os parceiros</Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/seja-parceiro">Seja um parceiro</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
