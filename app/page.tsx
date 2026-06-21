import Link from "next/link";
import { EditorialHero } from "@/components/sections/editorial-hero";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

const NAV = [
  { href: "/mapa", label: "Mapa" },
  { href: "/programas", label: "Programas" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/sobre", label: "Sobre" }
];

const PILARES = [
  { title: "Ideias e projetos", description: "Compartilhar oportunidades, validar problemas reais e formar times." },
  { title: "Startups e empresas", description: "Conexão entre negócios locais, tecnologia aplicada e novas fontes de receita." },
  { title: "Universidades e talentos", description: "Aproximação entre estudantes, pesquisa, mercado e desafios da cidade." },
  { title: "Capital e parceiros", description: "Pontes com investidores, mentores, governo, entidades e lideranças." },
  { title: "Nova economia", description: "Diversificação econômica para reduzir a dependência de um único setor." },
  { title: "Impacto local", description: "Empreendedorismo como ferramenta para mudar vidas, cidades e mercados." }
];

export default function HomePage() {
  return (
    <div
      className="min-h-screen font-body"
      style={
        {
          "--fx-paper": "#ffffff",
          "--fx-surface": "#f2f5ff",
          "--fx-ink": "#0a1020",
          "--fx-muted": "#5a647e",
          "--fx-accent": "#1b3bff",
          "--fx-line": "rgba(10,16,32,0.10)",
          background: "var(--fx-paper)",
          color: "var(--fx-ink)"
        } as React.CSSProperties
      }
    >
      {/* masthead */}
      <header className="mx-auto flex w-full max-w-[1180px] items-baseline justify-between gap-6 px-6 pt-7 sm:px-10">
        <Link href="/" className="font-display text-[22px] font-semibold tracking-[-0.01em]">
          Fênix Valley
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.16em] sm:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="transition-opacity hover:opacity-60"
              style={{ color: "var(--fx-muted)" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </header>

      <main>
        <EditorialHero />

        {/* índice do ecossistema */}
        <section className="mx-auto w-full max-w-[1180px] px-6 pb-24 sm:px-10">
          <EditorialReveal>
            <div className="flex items-baseline justify-between border-t pt-6" style={{ borderColor: "var(--fx-line)" }}>
              <h2 className="font-display text-[28px] font-semibold sm:text-[34px]">O que vive no Vale</h2>
              <span className="font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--fx-muted)" }}>
                seis frentes
              </span>
            </div>
          </EditorialReveal>

          <ol className="mt-4">
            {PILARES.map((pilar, index) => (
              <EditorialReveal key={pilar.title} delay={index * 0.05}>
                <li
                  className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t py-6 sm:grid-cols-[5rem_minmax(0,22rem)_1fr] sm:items-baseline"
                  style={{ borderColor: "var(--fx-line)" }}
                >
                  <span className="font-mono text-[13px]" style={{ color: "var(--fx-accent)" }}>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-display text-[21px] font-medium sm:text-[23px]">{pilar.title}</h3>
                  <p className="col-start-2 font-body text-[16px] leading-[1.6] sm:col-start-3" style={{ color: "var(--fx-muted)" }}>
                    {pilar.description}
                  </p>
                </li>
              </EditorialReveal>
            ))}
          </ol>
        </section>
      </main>

      <footer
        className="border-t"
        style={{ borderColor: "var(--fx-line)" }}
      >
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-3 px-6 py-8 font-mono text-[12px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between sm:px-10" style={{ color: "var(--fx-muted)" }}>
          <span>Fênix Valley — Betim · MG</span>
          <span>Ecossistema de inovação · {new Date().getFullYear()}</span>
        </div>
      </footer>
    </div>
  );
}
