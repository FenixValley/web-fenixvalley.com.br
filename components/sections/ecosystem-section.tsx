import { ecosystemActors, ecosystemMapLayers, pillars } from "@/data/ecosystem";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";

export function EcosystemSection() {
  return (
    <section id="ecossistema" className="light-band border-y border-slate-200 py-16 sm:py-20">
      <div className="section-shell space-y-10">
        <div className="grid gap-8 lg:grid-cols-[.9fr_1.1fr] lg:items-end">
          <FadeIn className="max-w-3xl space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Mapa vivo</p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              A força de Betim precisa circular entre quem cria, aprende, investe e executa.
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              O Fênix Valley organiza essa rede em frentes práticas para transformar talento local
              em negócios, produtos, empregos e soluções para a cidade.
            </p>
          </FadeIn>
          <div className="grid gap-3 sm:grid-cols-3">
            {ecosystemMapLayers.map((layer) => {
              const Icon = layer.icon;
              return (
                <article key={layer.title} className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
                  <Icon className="mb-4 h-5 w-5 text-secondary" />
                  <h3 className="text-sm font-bold text-slate-950">{layer.title}</h3>
                  <p className="mt-2 text-xs leading-5 text-slate-600">{layer.description}</p>
                </article>
              );
            })}
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">
          <div className="relative min-h-[420px] overflow-hidden rounded-lg border border-slate-200 bg-slate-950 p-5 shadow-crisp">
            <div className="brand-grid absolute inset-0 opacity-70" aria-hidden="true" />
            <div className="absolute inset-8 rounded-[2rem] border border-sky-300/20" aria-hidden="true" />
            <div className="absolute left-[18%] top-[20%] h-24 w-24 rounded-full border border-orange-300/40" aria-hidden="true" />
            <div className="absolute bottom-[16%] right-[12%] h-36 w-36 rounded-full border border-emerald-300/30" aria-hidden="true" />
            <div className="relative z-10 flex h-full min-h-[380px] items-center justify-center">
              <div className="rounded-full border border-white/15 bg-white/10 px-5 py-3 text-center backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-200">Betim</p>
                <p className="text-sm font-semibold text-white">núcleo de conexões</p>
              </div>
              {ecosystemActors.map((actor) => (
                <div
                  key={actor.name}
                  className="absolute rounded-lg border border-white/10 bg-white/10 px-3 py-2 text-xs text-white shadow-xl backdrop-blur"
                  style={{ left: actor.x, top: actor.y }}
                >
                  <p className="font-bold">{actor.name}</p>
                  <p className="mt-0.5 text-[11px] text-slate-300">{actor.count}</p>
                </div>
              ))}
            </div>
          </div>
          <Stagger className="grid gap-4 md:grid-cols-2">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <StaggerItem key={pillar.title}>
                  <article className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-white">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-[var(--font-space)] text-lg font-bold text-slate-950">{pillar.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{pillar.description}</p>
                  </article>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>
      </div>
    </section>
  );
}
