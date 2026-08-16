import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { EcosystemMap } from "@/components/map/ecosystem-map";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Mapa do ecossistema | Fênix Valley",
  description:
    "Mapa interativo de startups, universidades, empresas, hubs e espaços de inovação de Betim."
};

const shortcuts = [
  { href: "/startups", label: "Startups" },
  { href: "/universidades", label: "Universidades" },
  { href: "/mentores", label: "Mentores" },
  { href: "/investidores", label: "Investidores" },
  { href: "/espacos", label: "Espaços" }
];

export default function MapPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300">Mapa Fênix Valley</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Quem constrói o ecossistema de inovação de Betim.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Startups, universidades, empresas, hubs e espaços em um mapa vivo. Filtre por tipo,
                busque por bairro e cadastre sua organização.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3" aria-label="Vitrines por segmento">
              {shortcuts.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-slate-300 transition-colors hover:border-orange-400/60 hover:text-orange-300"
                >
                  {item.label}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              ))}
            </div>
            <EcosystemMap />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

