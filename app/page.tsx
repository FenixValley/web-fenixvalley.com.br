import { EditorialShell } from "@/components/editorial/editorial-shell";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { EditorialHero } from "@/components/sections/editorial-hero";

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
    <EditorialShell>
      <EditorialHero />

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
    </EditorialShell>
  );
}
