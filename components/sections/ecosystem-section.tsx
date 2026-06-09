import { pillars } from "@/data/ecosystem";

export function EcosystemSection() {
  return (
    <section id="ecossistema" className="py-16 sm:py-20">
      <div className="section-shell space-y-10">

        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Ecossistema
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
            A força de Betim precisa circular entre quem cria, aprende, investe e executa.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            O Fênix Valley organiza essa rede em frentes práticas para transformar talento local
            em negócios, produtos, empregos e soluções para a cidade.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <article
                key={pillar.title}
                className="group surface-panel rounded-xl p-6 flex flex-col gap-5 cursor-default transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgb(249_115_22_/_0.12)] hover:border-primary/30"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-md bg-secondary/20 text-secondary transition-all duration-300 group-hover:bg-primary/20 group-hover:text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-[var(--font-space)] text-lg font-bold text-foreground transition-colors duration-300 group-hover:text-primary">
                    {pillar.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground">
                    {pillar.description}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
