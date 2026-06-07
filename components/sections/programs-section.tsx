import { programs } from "@/data/ecosystem";

export function ProgramsSection() {
  return (
    <section id="programas" className="py-16 sm:py-20">
      <div className="section-shell space-y-10">

        <div className="max-w-3xl space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">
            Programas
          </p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
            Trilhas para quem quer criar, crescer e impactar Betim.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            Do problema à solução validada — estruturas abertas para diferentes
            momentos da jornada empreendedora.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {programs.map((program, index) => (
            <article
              key={program.title}
              className="surface-panel rounded-lg p-6 flex flex-col gap-5"
            >
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary">
                  {program.tag}
                </span>
                <span className="font-[var(--font-space)] text-3xl font-black text-white/10 select-none">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="space-y-2">
                <h3 className="font-[var(--font-space)] text-lg font-bold text-foreground">
                  {program.title}
                </h3>
                <p className="text-sm leading-6 text-muted-foreground">
                  {program.description}
                </p>
              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
}