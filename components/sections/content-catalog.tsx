"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, BookOpen, Clock, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { ContentArticle, ContentCategory } from "@/data/contents";

const categories: ContentCategory[] = ["Notícia", "Artigo", "Case", "Guia", "Edital"];

export function ContentCatalog({ articles }: { articles: ContentArticle[] }) {
  const [selectedCategory, setSelectedCategory] = useState<ContentCategory | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return articles.filter((article) => {
      if (selectedCategory && article.category !== selectedCategory) {
        return false;
      }
      if (!query) return true;
      return (
        article.title.toLowerCase().includes(query) ||
        article.summary.toLowerCase().includes(query) ||
        article.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [articles, selectedCategory, search]);

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Filtrar por categoria">
          <button
            type="button"
            onClick={() => setSelectedCategory(null)}
            className={cn(
              "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              selectedCategory === null
                ? "border-primary/60 bg-primary/15 text-primary"
                : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
            )}
          >
            Todos os conteúdos
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
              className={cn(
                "cursor-pointer rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                selectedCategory === category
                  ? "border-primary/60 bg-primary/15 text-primary"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground"
              )}
            >
              {category}s
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por título ou tema..."
            aria-label="Buscar conteúdos por título ou tema"
            className="pl-9"
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface-panel rounded-lg p-8">
          <h3 className="font-[var(--font-space)] text-lg font-bold text-foreground">
            Nenhum conteúdo encontrado
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Tente buscar com outros termos ou limpar os filtros de categoria.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((article) => (
            <article
              key={article.slug}
              className="surface-panel group flex flex-col justify-between rounded-xl p-6 transition-transform hover:-translate-y-1"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    {article.category}
                  </Badge>
                  <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-primary">{article.kicker}</p>
                  <h2 className="mt-1 font-[var(--font-space)] text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    <Link href={`/conteudos/${article.slug}`}>{article.title}</Link>
                  </h2>
                </div>

                <p className="text-sm leading-6 text-muted-foreground line-clamp-3">{article.summary}</p>
              </div>

              <div className="mt-6 border-t border-border pt-4">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{article.author.name}</span>
                  <span>{article.publishedAt}</span>
                </div>
                <Link
                  href={`/conteudos/${article.slug}`}
                  className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary group-hover:underline"
                >
                  <BookOpen className="h-4 w-4" />
                  Ler artigo
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
