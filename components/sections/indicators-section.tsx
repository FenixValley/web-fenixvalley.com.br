import { Card } from "@/components/ui/card";

export function IndicatorsSection() {
  return (
    <section id="indicadores" className="py-16 sm:py-20">
      <div className="section-shell space-y-8">
        <div className="space-y-4">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Indicadores</p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
            Sinais de movimento — em validação e atualização contínua.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            Para manter transparência, exibimos apenas informações qualificadas. Quando houver dados reais,
            os cards serão preenchidos automaticamente.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: "Base viva",
              description: "Cadastro e conexões dos atores do ecossistema.",
              status: "Em validação"
            },
            {
              title: "Agenda ativa",
              description: "Chamadas, desafios, eventos e oportunidades.",
              status: "Atualizando"
            },
            {
              title: "Rede conectada",
              description: "Colaboração entre startups, empresas, talentos e capital.",
              status: "Monitorada"
            }
          ].map((item) => (
            <Card key={item.title} className="surface-panel rounded-lg p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300/90">
                    {item.title}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
                <span className="shrink-0 rounded-md border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-orange-300">
                  {item.status}
                </span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

