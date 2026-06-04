import { metrics } from "@/data/ecosystem";
import { BrandMotion } from "./brand-motion";


export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-12 pt-10 sm:pb-16 sm:pt-14">
      <div className="brand-grid absolute inset-x-0 top-0 h-[620px]" aria-hidden="true" />
      <div className="section-shell relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="max-w-4xl font-[var(--font-space)] text-4xl font-black leading-tight tracking-normal text-balance text-white sm:text-5xl lg:text-6xl">
              Inovação que transforma. Tecnologia que conecta. Empreendedorismo que impulsiona Betim.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-slate-300">
              O Fênix Valley é o ecossistema de inovação que conecta pessoas, ideias,
              instituições e oportunidades para construir um futuro próspero, tecnológico e
              sustentável para Betim.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="surface-panel rounded-lg p-4">
                <div className="font-[var(--font-space)] text-2xl font-black text-orange-300">
                  {metric.value}
                </div>
                <div className="text-sm font-bold text-white">{metric.label}</div>
                <div className="mt-1 text-xs leading-5 text-slate-400">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <BrandMotion />
      </div>
      <div id="sobre" className="section-shell relative mt-10 grid gap-4 md:grid-cols-3">
        {[
          ["Propósito", "Transformar Betim em um polo de inovação, tecnologia e empreendedorismo."],
          ["Missão", "Conectar pessoas, organizações e oportunidades para estimular negócios inovadores."],
          ["Visão", "Tornar Betim referência regional em tecnologia aplicada, startups e desenvolvimento sustentável."]
        ].map(([title, text]) => (
          <article key={title} className="surface-panel rounded-lg p-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300">{title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
