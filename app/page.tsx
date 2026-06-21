import { fraunces } from "@/app/fonts";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { IndexList } from "@/components/editorial/index-list";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
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
          <div className="flex items-end justify-between gap-6 border-t pt-6" style={{ borderColor: "var(--fx-line)" }}>
            <div className="max-w-[680px]">
              <PretextHeadline
                text="O que vive no Vale"
                fontFamily={fraunces.style.fontFamily}
                weight={600}
                level={2}
                accent="Vale"
                sizeRatio={0.06}
                minSize={26}
                maxSize={40}
                leading={1}
              />
            </div>
            <span className="shrink-0 font-mono text-[12px] uppercase tracking-[0.2em]" style={{ color: "var(--fx-muted)" }}>
              seis frentes
            </span>
          </div>
        </EditorialReveal>

        <div className="mt-4">
          <IndexList items={PILARES} />
        </div>
      </section>
    </EditorialShell>
  );
}
