import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, ChevronRight, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShareButtons } from "@/components/sections/share-buttons";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <article className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-4xl space-y-10">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/conteudos" className="hover:text-primary">
                Conteúdos
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="truncate max-w-xs font-semibold text-foreground">{article.title}</span>
            </nav>

            <header className="space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                  {article.category}
                </Badge>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {article.publishedAt}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  {article.readTime} de leitura
                </span>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{article.kicker}</p>
                <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-foreground sm:text-4xl">
                  {article.title}
                </h1>
                <p className="text-lg leading-8 text-muted-foreground">{article.summary}</p>
              </div>

              <div className="flex flex-col gap-4 border-y border-border py-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{article.author.name}</p>
                    <p className="text-xs text-muted-foreground">{article.author.role}</p>
                  </div>
                </div>
                <ShareButtons title={article.title} slug={article.slug} />
              </div>
            </header>

            <div className="surface-panel space-y-8 rounded-2xl p-6 sm:p-10">
              {article.sections.map((section, idx) => (
                <section key={idx} className="space-y-3">
                  {section.heading ? (
                    <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground sm:text-2xl">
                      {section.heading}
                    </h2>
                  ) : null}
                  <p className="text-base leading-8 text-muted-foreground whitespace-pre-line">{section.body}</p>
                </section>
              ))}

              <div className="pt-6 border-t border-border space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground mr-1">Tags:</span>
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="border border-border">
                      #{tag}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <ShareButtons title={article.title} slug={article.slug} />
                  <Button asChild variant="ghost" size="sm">
                    <Link href="/conteudos" className="gap-1.5">
                      <ArrowLeft className="h-4 w-4" />
                      Voltar aos conteúdos
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            <div className="surface-panel rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-1">
                <h3 className="font-[var(--font-space)] text-lg font-bold text-foreground">
                  Quer colaborar com artigos ou cases da sua startup?
                </h3>
                <p className="text-sm text-muted-foreground">
                  Envie histórias, editais ou artigos técnicos para publicação no portal do movimento.
                </p>
              </div>
              <Button asChild className="shrink-0">
                <Link href="/faca-parte">Fazer parte do movimento</Link>
              </Button>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
