import { pillars } from "@/data/ecosystem";

export function EcosystemSection() {
  return (
    <section id="ecossistema" className="border-y bg-white py-16 sm:py-20">
      <div className="section-shell space-y-10">
        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Ecossistema</p>
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
              <article key={pillar.title} className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md bg-secondary text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="font-[var(--font-space)] text-xl font-bold">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{pillar.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
