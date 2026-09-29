import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ChevronRight, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/sections/share-buttons";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { contentArticles, getContentArticle } from "@/data/contents";

export function generateStaticParams() {
  return contentArticles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getContentArticle(slug);
  if (!article) return {};

  return {
    title: `${article.title} | Fênix Valley`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Fênix Valley`,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedAt,
      authors: [article.author.name],
      tags: article.tags,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function ConteudoArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getContentArticle(slug);
  if (!article) notFound();

  return (
    <EditorialShell active="/conteudos">
      <PageHeader kicker={article.kicker} title={article.title} lede={article.summary} />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-16">
        <div className="max-w-4xl space-y-10">
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
              <Link href="/conteudos" className="hover:underline" style={{ color: "var(--fx-muted)" }}>
                Conteúdos
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate max-w-xs" style={{ color: "var(--fx-ink)" }}>{article.title}</span>
            </nav>
          </EditorialReveal>

          <EditorialReveal delay={0.1}>
            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-4">
                <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                  {article.category}
                </Badge>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs" style={{ color: "var(--fx-muted)" }}>
                  <Calendar className="h-3.5 w-3.5" style={{ color: "var(--fx-accent)" }} />
                  {article.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-xs" style={{ color: "var(--fx-muted)" }}>
                  <Clock className="h-3.5 w-3.5" style={{ color: "var(--fx-accent)" }} />
                  {article.readTime} de leitura
                </span>
              </div>

              <div className="flex flex-col gap-4 border-y py-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--fx-line)" }}>
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-full"
                    style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                  >
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-bold" style={{ color: "var(--fx-ink)" }}>{article.author.name}</p>
                    <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>{article.author.role}</p>
                  </div>
                </div>
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </header>
          </EditorialReveal>

          <EditorialReveal delay={0.15}>
            <div
              className="space-y-8 rounded-2xl p-6 sm:p-10"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              {article.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  {section.heading ? (
                    <h2 className="font-display text-xl font-bold sm:text-2xl" style={{ color: "var(--fx-ink)" }}>
                      {section.heading}
                    </h2>
                  ) : null}
                  <p className="font-body text-base leading-relaxed whitespace-pre-line" style={{ color: "var(--fx-muted)" }}>
                    {section.body}
                  </p>
                </section>
              ))}

              <div className="pt-6 border-t space-y-4" style={{ borderColor: "var(--fx-line)" }}>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-wider mr-1" style={{ color: "var(--fx-muted)" }}>
                    Tags:
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2.5 py-1 font-mono text-[11px]"
                      style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <ShareButtons title={article.title} slug={article.slug} />
                  <Button asChild variant="ghost" size="sm" className="font-mono text-xs uppercase tracking-[0.16em]">
                    <Link href="/conteudos" className="gap-1.5">
                      <ArrowLeft className="h-4 w-4" />
                      Voltar aos conteúdos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.2}>
            <div
              className="rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <div className="space-y-1">
                <h3 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                  Quer colaborar com artigos ou cases da sua startup?
                </h3>
                <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  Envie histórias, editais ou artigos técnicos para publicação no portal do movimento.
                </p>
              </div>
              <Button asChild className="shrink-0 font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/faca-parte">Fazer parte do movimento</Link>
              </Button>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
