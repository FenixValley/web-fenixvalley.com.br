import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Banknote,
  Cpu,
  Factory,
  Landmark,
  Lightbulb,
  Megaphone,
  Presentation,
  Rocket,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  Wallet
} from "lucide-react";
import { ActorCatalog } from "@/components/sections/actor-catalog";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Universidades e educação | Fênix Valley",
  description:
    "Instituições de ensino, escolas técnicas e trilhas de capacitação do ecossistema de inovação de Betim, conectando estudantes a estágios, hackathons, mentorias e desafios.",
  openGraph: {
    title: "Universidades e educação | Fênix Valley",
    description:
      "Instituições de ensino, escolas técnicas e trilhas de capacitação do ecossistema de inovação de Betim."
  }
};

const trilhas = [
  { icon: Lightbulb, title: "Ideia ao MVP", description: "Do problema à primeira versão testável do produto." },
  { icon: Presentation, title: "Modelo de negócio", description: "Proposta de valor, canais e estrutura de receita." },
  { icon: Megaphone, title: "Marketing e vendas", description: "Posicionamento, aquisição e relacionamento com clientes." },
  { icon: Cpu, title: "Programação", description: "Fundamentos e boas práticas para times de produto digital." },
  { icon: Sparkles, title: "Inteligência artificial", description: "Aplicações práticas de IA em produtos e processos." },
  { icon: Wallet, title: "Investimento", description: "Como se preparar para rodadas e conversar com investidores." },
  { icon: Rocket, title: "Pitch", description: "Comunicação clara e persuasiva para bancas e parceiros." },
  { icon: TrendingUp, title: "Vendas B2B/B2G", description: "Ciclos de venda para empresas e poder público." },
  { icon: Banknote, title: "Finanças", description: "Fluxo de caixa, precificação e indicadores essenciais." },
  { icon: Landmark, title: "GovTech", description: "Inovação aplicada a serviços e desafios públicos." },
  { icon: Factory, title: "Indústria 4.0", description: "Automação, dados e eficiência para o setor produtivo." },
  { icon: ShieldCheck, title: "ESG", description: "Impacto socioambiental e governança para negócios sustentáveis." }
];

export default function UniversidadesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Educação</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Universidades e educação
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Instituições de ensino, escolas técnicas, laboratórios e núcleos de pesquisa aplicada que formam
                talento para o ecossistema de inovação de Betim e região.
              </p>
            </div>
            <ActorCatalog
              types={["universidade", "escola-tecnica"]}
              ctaLabel="Cadastre sua instituição"
              emptyTitle="Nenhuma instituição aprovada por enquanto."
              emptyDescription="Universidades e escolas técnicas aparecem aqui assim que cadastradas no mapa do ecossistema e aprovadas pela curadoria."
            />
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Área do estudante</p>
              <h2 className="font-[var(--font-space)] text-2xl font-black leading-tight text-white sm:text-3xl">
                Trilhas de capacitação
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                Doze frentes de aprendizado que conectam estudantes e empreendedores a cursos, mentorias, desafios
                e eventos do ecossistema. Cada trilha é reforçada pela agenda de eventos e pelos programas em
                andamento.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {trilhas.map(({ icon: Icon, title, description }) => (
                <div key={title} className="surface-panel rounded-lg p-5">
                  <Icon className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  <h3 className="mt-3 font-[var(--font-space)] text-base font-bold text-white">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{description}</p>
                </div>
              ))}
            </div>
            <div className="surface-panel flex flex-col gap-4 rounded-lg p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-xl text-sm leading-6 text-slate-300">
                Estágios, vagas, hackathons e mentorias para estudantes ficam reunidos na agenda de oportunidades e
                na agenda de eventos do movimento.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/eventos?categoria=Acad%C3%AAmico"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver eventos acadêmicos
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#oportunidades"
                  className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Ver oportunidades
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
