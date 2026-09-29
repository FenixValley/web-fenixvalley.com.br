import Image from "next/image";
import { ecosystemMapLayers, pillars } from "@/data/ecosystem";
import { FadeIn, Stagger, StaggerItem } from "@/components/ui/motion";

/* Nós do hub radial — posição absoluta relativa ao container */
const hubNodes = [
  { label: "Startups",      sub: "Fundadoras",   color: "text-orange-300",  ring: "ring-orange-400/40",  bg: "bg-orange-500/15",  pos: { top: "8%",  left: "50%",   tx: "-50%" } },
  { label: "Empresas",      sub: "Desafios",     color: "text-sky-300",     ring: "ring-sky-400/40",     bg: "bg-sky-500/15",     pos: { top: "26%", left: "82%",   tx: "-50%" } },
  { label: "Investidores",  sub: "Conexões",     color: "text-emerald-300", ring: "ring-emerald-400/40", bg: "bg-emerald-500/15", pos: { top: "68%", left: "82%",   tx: "-50%" } },
  { label: "Mentores",      sub: "Curadoria",    color: "text-purple-300",  ring: "ring-purple-400/40",  bg: "bg-purple-500/15",  pos: { top: "84%", left: "50%",   tx: "-50%" } },
  { label: "Universidades", sub: "Parcerias",    color: "text-pink-300",    ring: "ring-pink-400/40",    bg: "bg-pink-500/15",    pos: { top: "68%", left: "18%",   tx: "-50%" } },
  { label: "Comunidade",    sub: "Colaboração",  color: "text-yellow-300",  ring: "ring-yellow-400/40",  bg: "bg-yellow-500/15",  pos: { top: "26%", left: "18%",   tx: "-50%" } },
];

/* Coordenadas SVG de cada nó (viewBox 400×380) */
const nodeCoords = [
  [200, 42],
  [326, 113],
  [326, 254],
  [200, 325],
  [74,  254],
  [74,  113],
];
const CENTER = [200, 185];

export function EcosystemSection() {
  return (
    <section id="ecossistema" className="light-band border-y border-slate-200 py-16 sm:py-20">
      <div className="section-shell space-y-10">

        {/* ── cabeçalho da seção ── */}
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

        {/* ── painel principal ── */}
        <div className="grid gap-6 lg:grid-cols-[.95fr_1.05fr]">

          {/* Hub radial */}
          <div className="relative min-h-[420px] overflow-hidden rounded-2xl border border-slate-800 bg-slate-950 shadow-crisp">

            {/* grade de fundo */}
            <div className="brand-grid absolute inset-0 opacity-30" aria-hidden="true" />

            {/* glow laranja central */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{ background: "radial-gradient(circle, rgba(249,115,22,0.20) 0%, transparent 70%)" }}
              aria-hidden="true"
            />

            {/* badge de título */}
            <div className="absolute left-0 right-0 top-4 z-20 flex justify-center">
              <span className="rounded-full border border-orange-500/30 bg-orange-500/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange-300">
                Ecossistema · Betim
              </span>
            </div>

            {/* linhas SVG de conexão */}
            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 400 380"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              <defs>
                <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#818cf8" stopOpacity="0.15" />
                </linearGradient>
              </defs>
              {nodeCoords.map(([x2, y2], i) => (
                <line
                  key={i}
                  x1={CENTER[0]} y1={CENTER[1]}
                  x2={x2} y2={y2}
                  stroke="url(#lg1)"
                  strokeWidth="1.2"
                  strokeDasharray="5 4"
                />
              ))}
            </svg>

            {/* nó central — símbolo Fênix */}
            <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
              <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-orange-400/40 bg-white/10 shadow-2xl backdrop-blur-sm ring-4 ring-orange-500/10">
                <Image
                  src="/logo-simbolo.png"
                  alt="Fênix Valley"
                  width={52}
                  height={52}
                  className="h-13 w-13 object-contain"
                />
              </div>
            </div>

            {/* nós satélite */}
            {hubNodes.map(({ label, sub, color, ring, bg, pos }) => (
              <div
                key={label}
                className="absolute z-10"
                style={{
                  top: pos.top,
                  left: pos.left,
                  transform: `translateX(${pos.tx})`,
                }}
              >
                <div
                  className={`flex flex-col items-center gap-1 rounded-xl border border-white/10 ${bg} px-3 py-2 text-center shadow-lg backdrop-blur-sm ring-1 ${ring}`}
                >
                  <p className={`text-[11px] font-bold leading-none ${color}`}>{label}</p>
                  <p className="text-[10px] leading-none text-slate-400">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Pilares */}
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
