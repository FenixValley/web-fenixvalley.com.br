import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { EcosystemMap } from "@/components/map/ecosystem-map";

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
    <EditorialShell active="/mapa">
      <PageHeader
        kicker="Mapa Fênix Valley"
        title="Quem constrói o ecossistema de inovação de Betim."
        accent="constrói"
        lede="Startups, universidades, empresas, hubs e espaços em um mapa vivo. Filtre por tipo, busque por bairro e cadastre sua organização."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <nav className="mb-8 flex flex-wrap items-center gap-3" aria-label="Vitrines por segmento">
            {shortcuts.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors hover:text-[color:var(--fx-accent)]"
                style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)", color: "var(--fx-muted)" }}
              >
                {item.label}
                <ArrowUpRight className="h-3 w-3" />
              </Link>
            ))}
          </nav>
          <EcosystemMap />
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
