import Image from "next/image";
import Link from "next/link";
import {
  Users,
  Zap,
  Lightbulb,
  Rocket,
  Network,
  Star,
  ArrowRight,
  Calendar,
  TrendingUp,
  MapPin,
  Eye,
  Handshake,
} from "lucide-react";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";

// ── Data ──────────────────────────────────────────────────────────────────────

const pillars = [
  {
    icon: Handshake,
    title: "Colaboração Real",
    description:
      "Menos hierarquia, mais mão na massa. Aqui as parcerias nascem de conversas honestas e trabalho compartilhado.",
    color: "orange",
  },
  {
    icon: Network,
    title: "Conexão de Alto Valor",
    description:
      "O lugar onde você encontra seus futuros sócios, mentores e amigos que compartilham a mesma chama.",
    color: "sky",
  },
  {
    icon: Lightbulb,
    title: "Inovação Aberta",
    description:
      "Ideias que circulam livremente para que todos cresçam juntos. Nenhum conhecimento fica preso em uma sala.",
    color: "emerald",
  },
  {
    icon: Zap,
    title: "Bias for Action",
    description:
      "Não somos um clube de debates, somos um hub de execução. Construímos, testamos e aprendemos em ciclos rápidos.",
    color: "amber",
  },
];

const journey = [
  {
    year: "2023",
    title: "A Primeira Faísca",
    description:
      "Um grupo de empreendedores de Betim percebeu que a cidade tinha talento de sobra, mas faltava uma estrutura para conectar esse potencial. O Fênix Valley nasceu dessa inquietação.",
    icon: Star,
  },
  {
    year: "2024",
    title: "Construindo a Rede",
    description:
      "Primeiros eventos, primeiras conexões reais. Startups se encontraram com investidores, jovens talentos com mentores experientes. A comunidade começou a ganhar forma e identidade.",
    icon: Network,
  },
  {
    year: "2025",
    title: "O Ecossistema Vivo",
    description:
      "Programas estruturados, uma agenda ativa de eventos e uma base crescente de membros comprometidos. Betim começa a se reconhecer como polo de inovação.",
    icon: TrendingUp,
  },
  {
    year: "Hoje",
    title: "O Movimento Continua",
    description:
      "Somos um ecossistema em expansão, conectando ideias, pessoas e oportunidades. O próximo capítulo precisa de você.",
    icon: Rocket,
    highlight: true,
  },
];

const benefits = [
  {
    icon: Users,
    title: "Networking",
    tagline: "Pare de procurar contatos e comece a construir parcerias.",
    description:
      "Acesso a uma rede curada de empreendedores, desenvolvedores, designers, investidores e mentores que compartilham do mesmo propósito.",
  },
  {
    icon: Eye,
    title: "Mentoria",
    tagline: "Acesso a quem já percorreu o caminho que você quer seguir.",
    description:
      "Conectamos você com profissionais experientes que já erraram, aprenderam e escalaram. Economize anos de tentativa e erro.",
  },
  {
    icon: MapPin,
    title: "Visibilidade",
    tagline: "Sua ideia apresentada para as pessoas certas.",
    description:
      "Showcases, pitches, eventos e canais da comunidade colocam seu projeto em destaque para quem realmente pode ajudá-lo a crescer.",
  },
];

const teamMembers = [
  { name: "Fundadores", role: "Líderes do Movimento", initials: "FV" },
  { name: "Mentores", role: "Guias de Jornada", initials: "MT" },
  { name: "Parceiros", role: "Empresas & Instituições", initials: "PR" },
  { name: "Membros Ativos", role: "O Coração do Ecossistema", initials: "MA" },
];

// ── Page ──────────────────────────────────────────────────────────────────────

export default function SobrePage() {
  return (
    <>
      <SiteHeader />

      <main>
        {/* ── 1. Hero Headline ── */}
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-[500px] w-[900px] rounded-full bg-orange-500/10 blur-3xl" aria-hidden="true" />
          <div className="pointer-events-none absolute bottom-0 right-0 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" aria-hidden="true" />
          <div className="brand-grid absolute inset-x-0 top-0 h-[400px]" aria-hidden="true" />

          <div className="section-shell relative text-center space-y-8 max-w-4xl mx-auto">
            <p className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-4 py-1.5 text-sm font-bold uppercase tracking-widest text-orange-400">
              <Rocket className="h-3.5 w-3.5" />
              Nosso Ecossistema
            </p>
            <h1 className="font-[var(--font-space)] text-4xl font-black leading-tight tracking-tight text-balance sm:text-5xl lg:text-6xl xl:text-7xl">
              Mais que um ecossistema, o{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-orange-500 to-amber-400">
                combustível
              </span>{" "}
              da próxima geração de inovadores.
            </h1>
            <p className="text-lg leading-8 text-slate-300 max-w-2xl mx-auto">
              Construímos o ambiente onde as ideias de Betim tomam forma, ganham impulso
              e se transformam em realidades que impactam vidas e mudam cidades.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/faca-parte"
                className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/25 transition-all hover:bg-orange-600 hover:shadow-xl hover:shadow-orange-500/30 hover:-translate-y-0.5"
              >
                Quero me tornar membro
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/#oportunidades"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:bg-white/10 hover:border-white/25"
              >
                Conhecer eventos
              </Link>
            </div>
          </div>
        </section>

        {/* ── 2. Manifesto ── */}
        <section className="py-16 sm:py-24">
          <div className="section-shell">
            <div className="grid gap-12 lg:grid-cols-[1fr_1fr] items-center">
              <div className="space-y-6">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-400">
                  O Manifesto
                </p>
                <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
                  Por que existimos
                </h2>
                <div className="space-y-4 text-slate-300 text-lg leading-8">
                  <p>
                    Betim carrega um potencial imenso. Uma cidade industrial com uma das maiores
                    economias de Minas Gerais, cheia de talentos que precisam de conexão, de
                    oportunidades que precisam de visibilidade, e de ideias que precisam de combustível.
                  </p>
                  <p>
                    O <strong className="text-white">Fênix Valley</strong> nasceu exatamente dessa lacuna.
                    Como a fênix que renasce das cinzas, acreditamos na capacidade de transformar o cenário
                    local — não esperando que alguém de fora venha fazer por nós, mas construindo com as
                    próprias mãos um ecossistema vibrante, inclusivo e de impacto real.
                  </p>
                  <p>
                    Não fazemos eventos pelo evento. Conectamos pessoas que vão criar as empresas,
                    soluções e empregos que Betim merece ter. Somos o movimento que faltava.
                  </p>
                </div>
              </div>
              <div className="relative aspect-video lg:aspect-square overflow-hidden rounded-2xl">
                <Image
                  src="/community-event.png"
                  alt="Comunidade Fênix Valley em ação"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="surface-panel rounded-xl px-4 py-3">
                    <p className="text-sm font-semibold text-white">Comunidade em movimento</p>
                    <p className="text-xs text-slate-400 mt-0.5">Betim, Minas Gerais</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── 3. Pilares ── */}
        <section className="py-16 sm:py-24 relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/0 via-sky-950/20 to-slate-950/0" aria-hidden="true" />
          <div className="section-shell relative space-y-12">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-400">
                Nossos Pilares
              </p>
              <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
                O que nos move todos os dias
              </h2>
              <p className="text-lg leading-8 text-slate-400">
                Quatro princípios que guiam cada decisão, cada evento e cada conexão que facilitamos.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              {pillars.map((pillar) => {
                const Icon = pillar.icon;
                const colorMap: Record<string, string> = {
                  orange: "bg-orange-500/15 text-orange-400 border-orange-500/20",
                  sky: "bg-sky-500/15 text-sky-400 border-sky-500/20",
                  emerald: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
                  amber: "bg-amber-500/15 text-amber-400 border-amber-500/20",
                };
                const hoverMap: Record<string, string> = {
                  orange: "hover:border-orange-500/30 hover:shadow-[0_16px_48px_rgb(249_115_22_/_0.12)]",
                  sky: "hover:border-sky-500/30 hover:shadow-[0_16px_48px_rgb(56_189_248_/_0.12)]",
                  emerald: "hover:border-emerald-500/30 hover:shadow-[0_16px_48px_rgb(52_211_153_/_0.12)]",
                  amber: "hover:border-amber-500/30 hover:shadow-[0_16px_48px_rgb(251_191_36_/_0.12)]",
                };
                return (
                  <article
                    key={pillar.title}
                    className={`surface-panel rounded-2xl p-8 flex flex-col gap-5 transition-all duration-300 hover:-translate-y-1 ${hoverMap[pillar.color]}`}
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl border ${colorMap[pillar.color]}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-[var(--font-space)] text-xl font-bold text-white">
                        {pillar.title}
                      </h3>
                      <p className="text-sm leading-7 text-slate-400">
                        {pillar.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 4. Jornada (Timeline) ── */}
        <section className="py-16 sm:py-24">
          <div className="section-shell space-y-14">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-emerald-400">
                A Jornada
              </p>
              <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
                De uma faísca a um movimento
              </h2>
            </div>

            <div className="relative">
              {/* vertical line */}
              <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-orange-500/0 via-orange-500/40 to-orange-500/0 hidden sm:block" aria-hidden="true" />

              <div className="space-y-10">
                {journey.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.year} className="relative flex gap-8 sm:gap-10">
                      {/* icon node */}
                      <div className={`relative z-10 hidden sm:flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${item.highlight ? "border-orange-500/60 bg-orange-500/20 text-orange-400" : "border-white/15 bg-slate-900 text-slate-400"}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className={`surface-panel flex-1 rounded-2xl p-6 sm:p-8 space-y-3 transition-all duration-300 ${item.highlight ? "border-orange-500/25 shadow-lg shadow-orange-500/10" : ""}`}>
                        <div className="flex items-center gap-3">
                          <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider ${item.highlight ? "border-orange-500/40 bg-orange-500/15 text-orange-400" : "border-white/10 bg-white/5 text-slate-400"}`}>
                            <Calendar className="h-3 w-3" />
                            {item.year}
                          </span>
                          {item.highlight && (
                            <span className="text-xs font-semibold text-orange-400 animate-pulse">
                              • Ao vivo agora
                            </span>
                          )}
                        </div>
                        <h3 className="font-[var(--font-space)] text-xl font-bold text-white">
                          {item.title}
                        </h3>
                        <p className="text-sm leading-7 text-slate-400">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Benefícios ── */}
        <section className="py-16 sm:py-24 relative">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-orange-950/20 via-transparent to-sky-950/20" aria-hidden="true" />
          <div className="section-shell relative space-y-14">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-amber-400">
                O que você vai encontrar aqui
              </p>
              <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
                Mais do que uma comunidade — uma alavanca.
              </h2>
              <p className="text-lg leading-8 text-slate-400">
                A diferença entre um membro passivo e um membro ativo é o que você faz com as conexões que criamos para você.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-3">
              {benefits.map((benefit) => {
                const Icon = benefit.icon;
                return (
                  <article
                    key={benefit.title}
                    className="surface-panel rounded-2xl p-8 flex flex-col gap-6 hover:-translate-y-1 transition-all duration-300 hover:border-orange-500/25"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-orange-500/25 bg-orange-500/10 text-orange-400">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="space-y-3">
                      <h3 className="font-[var(--font-space)] text-lg font-bold text-white">
                        {benefit.title}
                      </h3>
                      <p className="text-sm font-semibold italic text-orange-300/90">
                        &ldquo;{benefit.tagline}&rdquo;
                      </p>
                      <p className="text-sm leading-7 text-slate-400">
                        {benefit.description}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 6. A Cara da Comunidade ── */}
        <section className="py-16 sm:py-24">
          <div className="section-shell space-y-14">
            <div className="text-center space-y-4 max-w-2xl mx-auto">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-400">
                Nossa Comunidade
              </p>
              <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
                A cara do ecossistema
              </h2>
              <p className="text-lg leading-8 text-slate-400">
                Somos feitos de pessoas reais, com sonhos reais. Cada rosto aqui representa uma ideia que pode mudar Betim.
              </p>
            </div>

            {/* photo grid */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src="/community-event.png"
                  alt="Encontro da comunidade Fênix Valley"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-bold text-white">Encontros & Networking</p>
                  <p className="text-xs text-slate-300">Onde as parcerias nascem</p>
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-2xl">
                <Image
                  src="/brainstorm-session.png"
                  alt="Sessão de brainstorm no Fênix Valley"
                  fill
                  className="object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <p className="text-sm font-bold text-white">Workshops & Mentoria</p>
                  <p className="text-xs text-slate-300">Conhecimento que circula</p>
                </div>
              </div>
            </div>

            {/* member types grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {teamMembers.map((member) => (
                <div
                  key={member.name}
                  className="surface-panel rounded-2xl p-6 text-center space-y-3 hover:-translate-y-1 transition-all duration-300 hover:border-orange-500/25"
                >
                  <div className="mx-auto h-16 w-16 rounded-full border-2 border-orange-500/30 bg-gradient-to-br from-orange-500/20 to-sky-500/20 flex items-center justify-center">
                    <span className="font-[var(--font-space)] text-sm font-black text-orange-300">
                      {member.initials}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{member.name}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7. CTA Final ── */}
        <section className="py-16 sm:py-24">
          <div className="section-shell">
            <div className="relative overflow-hidden surface-panel rounded-3xl px-8 py-16 sm:px-16 text-center space-y-8">
              {/* decorative glows */}
              <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-orange-500/20 blur-3xl" aria-hidden="true" />
              <div className="pointer-events-none absolute -bottom-24 left-1/4 h-64 w-64 rounded-full bg-sky-500/15 blur-3xl" aria-hidden="true" />

              <div className="relative space-y-4 max-w-2xl mx-auto">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-400">
                  O Convite
                </p>
                <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                  O próximo capítulo do Fênix Valley precisa de{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-400">
                    você.
                  </span>
                </h2>
                <p className="text-lg leading-8 text-slate-300 max-w-xl mx-auto">
                  Não somos uma plateia, somos um ecossistema. Venha cocriar, aprender e
                  escalar conosco. Betim está pronta para o próximo movimento.
                </p>
              </div>

              <div className="relative flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="/faca-parte"
                  className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-orange-500/30 transition-all hover:bg-orange-600 hover:shadow-2xl hover:shadow-orange-500/40 hover:-translate-y-0.5"
                >
                  Quero me tornar membro
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/#oportunidades"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-8 py-3.5 text-sm font-semibold text-slate-200 backdrop-blur transition-all hover:bg-white/10 hover:border-white/25"
                >
                  Conhecer nossos eventos
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
