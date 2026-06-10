import Link from "next/link";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import type { SitePage } from "@/data/site-pages";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export function InternalPage({ page }: { page: SitePage }) {
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
              <span className="font-semibold text-slate-200">{page.title}</span>
            </nav>

            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">{page.kicker}</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {page.title}
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-slate-300">{page.description}</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {page.sections.map((section) => (
                <article key={section.title} className="surface-panel rounded-lg p-5">
                  <h2 className="font-[var(--font-space)] text-lg font-bold text-white">{section.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
                </article>
              ))}
            </div>

            <div className="flex flex-wrap gap-3">
              {page.ctas.map((cta, index) => (
                <Button key={cta.label} asChild variant={index === 0 ? "default" : "ghost"}>
                  <Link
                    href={cta.href}
                    {...(cta.external ? { target: "_blank", rel: "noreferrer" } : {})}
                  >
                    {cta.label}
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
