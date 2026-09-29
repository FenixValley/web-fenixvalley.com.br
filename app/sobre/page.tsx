import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import {
  Users,
  Zap,
  Lightbulb,
  Rocket,
  Network,
  Star,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  TrendingUp,
  MapPin,
  Eye,
  Handshake,
} from "lucide-react";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
import { SpotlightCard } from "@/components/editorial/spotlight-card";

export const metadata: Metadata = {
  title: "Sobre | Fênix Valley",
  description:
    "Conheça a história, os pilares e a jornada do Fênix Valley, o ecossistema de inovação de Betim que renasce das cinzas."
};

const pillars = [
  {
    icon: Handshake,
    title: "Colaboração Real",
    description:
      "Menos hierarquia, mais mão na massa. Aqui as parcerias nascem de conversas honestas e trabalho compartilhado."
  },
  {
    icon: Network,
    title: "Conexão de Alto Valor",
    description:
      "O lugar onde você encontra seus futuros sócios, mentores e parceiros que compartilham a mesma visão."
  },
  {
    icon: Lightbulb,
    title: "Inovação Aberta",
    description:
      "Ideias que circulam livremente para que todos cresçam juntos. Nenhum conhecimento fica preso em uma sala."
  },
  {
    icon: Zap,
    title: "Bias for Action",
    description:
      "Não somos um clube de debates, somos um hub de execução. Construímos, testamos e aprendemos em ciclos rápidos."
  }
];

const journey = [
  {
    year: "2017",
    title: "A Semente Germinada",
    description:
      "O governo iniciou um trabalho estratégico nas principais regiões de Minas Gerais para fortalecer ecossistemas de inovação. Gisele Ribeiro Ramos liderou a região metropolitana (Betim, Contagem, Ibirité e entorno), estimulando a comunidade através de eventos, hackathons, palestras e articulação entre governo, prefeituras e empreendedores.",
    icon: Star
  },
  {
    year: "2018-2020",
    title: "Crescimento em Movimento",
    description:
      "Cada líder de território, junto com apoiadores locais, começou a fortalecer sua comunidade. Nesse processo, identificou-se a necessidade de um nome que representasse esse renascimento. Assim nasceu 'Fênix Valley' — a fênix que renasce das cinzas, simbolizando a inovação em ascensão na região.",
    icon: Network
  },
  {
    year: "2020-2023",
    title: "Pausa Necessária",
    description:
      "A pandemia desacelerou o movimento. Eventos presenciais foram interrompidos e a energia comunitária minguou. Mas as sementes já estavam plantadas, e a comunidade nunca deixou de acreditar que retornaria.",
    icon: Star
  },
  {
    year: "2024-2025",
    title: "O Retorno com Força Total",
    description:
      "A Fênix Valley ressurge com toda energia. Programas estruturados, agenda intensiva de eventos, mentorias ativas e uma base crescente de membros comprometidos. Betim se consolida como polo de inovação que atrai talentos de toda a região metropolitana.",
    icon: TrendingUp
  },
  {
    year: "Hoje",
    title: "O Movimento Continua",
    description:
      "Somos um ecossistema em expansão, conectando ideias, pessoas e oportunidades. O próximo capítulo precisa de você.",
    icon: Rocket,
    highlight: true
  }
];

const benefits = [
  {
    icon: Users,
    title: "Networking",
    tagline: "Pare de procurar contatos e comece a construir parcerias.",
    description:
      "Acesso a uma rede curada de empreendedores, desenvolvedores, designers, investidores e mentores que compartilham do mesmo propósito."
  },
  {
    icon: Eye,
    title: "Mentoria",
    tagline: "Acesso a quem já percorreu o caminho que você quer seguir.",
    description:
      "Conectamos você com profissionais experientes que já erraram, aprenderam e escalaram. Economize anos de tentativa e erro."
  },
  {
    icon: MapPin,
    title: "Visibilidade",
    tagline: "Sua ideia apresentada para as pessoas certas.",
    description:
      "Showcases, pitches, eventos e canais da comunidade colocam seu projeto em destaque para quem realmente pode ajudá-lo a crescer."
  }
];

const teamMembers = [
  { name: "Fundadores", role: "Líderes do Movimento", initials: "FV" },
  { name: "Mentores", role: "Guias de Jornada", initials: "MT" },
  { name: "Parceiros", role: "Empresas & Instituições", initials: "PR" },
  { name: "Membros Ativos", role: "O Coração do Ecossistema", initials: "MA" }
];

export default function SobrePage() {
  return (
    <EditorialShell active="/sobre">
      <PageHeader
        kicker="Nosso Ecossistema"
        title="Mais que um ecossistema, o combustível da inovação em Betim."
        accent="combustível"
        lede="Construímos o ambiente onde as ideias de Betim tomam forma, ganham impulso e se transformam em negócios e soluções que impactam vidas."
      />

      {/* Manifesto */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <EditorialReveal>
            <div className="space-y-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                O Manifesto
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
                Por que existimos
              </h2>
              <div className="space-y-4 font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                <p>
                  Betim carrega um potencial imenso. Uma cidade industrial com uma das maiores
                  economias de Minas Gerais, cheia de talentos que precisam de conexão, de
                  oportunidades que precisam de visibilidade, e de ideias que precisam de combustível.
                </p>
                <p>
                  O <strong style={{ color: "var(--fx-ink)" }}>Fênix Valley</strong> nasceu exatamente dessa lacuna.
                  Como a fênix que renasce das cinzas, acreditamos na capacidade de transformar o cenário
                  local — não esperando que alguém venha fazer por nós, mas construindo com as
                  próprias mãos um ecossistema vibrante, inclusivo e de impacto real.
                </p>
                <p>
                  Não fazemos eventos pelo evento. Conectamos pessoas que vão criar as empresas,
                  soluções e empregos que Betim merece ter. Somos o movimento que faltava.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/faca-parte"
                  className="inline-flex items-center gap-2 px-6 py-3 font-mono text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--fx-accent)" }}
                >
                  Quero fazer parte
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </EditorialReveal>

          <EditorialReveal delay={0.15}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border" style={{ borderColor: "var(--fx-line)" }}>
              <Image
                src="/community-event.png"
                alt="Comunidade Fênix Valley em ação"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[rgba(10,16,32,0.6)] via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5">
                <div
                  className="rounded-xl p-4 backdrop-blur-md"
                  style={{ background: "rgba(255, 255, 255, 0.9)", border: "1px solid var(--fx-line)" }}
                >
                  <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                    Comunidade em movimento
                  </p>
                  <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>
                    Betim, Minas Gerais
                  </p>
                </div>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>

      {/* Pilares */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                Nossos Pilares
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
                O que nos move todos os dias
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Quatro princípios que guiam cada decisão, cada encontro e cada conexão que facilitamos.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <SpotlightCard
                  key={pillar.title}
                  delay={index * 0.08}
                  className="flex flex-col gap-4 rounded-xl p-8"
                  style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
                  spotlightColor="rgba(27, 59, 255, 0.12)"
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                      {pillar.title}
                    </h3>
                    <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                      {pillar.description}
                    </p>
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Jornada / Timeline */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
              A Jornada
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
              De uma faísca a um movimento
            </h2>
          </div>
        </EditorialReveal>

        <div className="relative mt-12">
          <div
            className="absolute bottom-0 left-6 top-0 hidden w-px sm:block"
            style={{ background: "var(--fx-line)" }}
            aria-hidden="true"
          />

          <div className="space-y-8">
            {journey.map((item, index) => {
              const Icon = item.icon;
              return (
                <EditorialReveal key={item.year} delay={index * 0.08}>
                  <div className="relative flex gap-6 sm:gap-10">
                    <div
                      className="relative z-10 hidden h-12 w-12 shrink-0 items-center justify-center rounded-full border sm:flex"
                      style={
                        item.highlight
                          ? { background: "var(--fx-accent)", color: "#ffffff", borderColor: "var(--fx-accent)" }
                          : { background: "var(--fx-paper)", color: "var(--fx-accent)", borderColor: "var(--fx-line)" }
                      }
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div
                      className="flex-1 rounded-xl p-6 sm:p-8"
                      style={{
                        background: item.highlight ? "var(--fx-surface)" : "var(--fx-paper)",
                        border: `1px solid ${item.highlight ? "var(--fx-accent)" : "var(--fx-line)"}`
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-[11px] uppercase tracking-wider"
                          style={{
                            background: item.highlight ? "var(--fx-accent-soft)" : "var(--fx-surface)",
                            color: item.highlight ? "var(--fx-accent)" : "var(--fx-muted)"
                          }}
                        >
                          <Calendar className="h-3 w-3" />
                          {item.year}
                        </span>
                        {item.highlight ? (
                          <span className="font-mono text-xs font-semibold" style={{ color: "var(--fx-accent)" }}>
                            • Em andamento
                          </span>
                        ) : null}
                      </div>
                      <h3 className="mt-3 font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                        {item.title}
                      </h3>
                      <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                </EditorialReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                Alavanca para Você
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
                O que você encontra aqui
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                A diferença entre um membro passivo e um membro ativo é o que você constrói com as conexões disponíveis.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <MotionCard
                  key={benefit.title}
                  delay={index * 0.08}
                  className="flex flex-col gap-5 rounded-xl p-8"
                  style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
                >
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                      {benefit.title}
                    </h3>
                    <p className="mt-1 font-body text-xs font-semibold italic" style={{ color: "var(--fx-accent)" }}>
                      &ldquo;{benefit.tagline}&rdquo;
                    </p>
                    <p className="mt-3 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                      {benefit.description}
                    </p>
                  </div>
                </MotionCard>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comunidade */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
              Nossa Rede
            </p>
            <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
              A cara do ecossistema
            </h2>
            <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
              Somos feitos de pessoas reais, com projetos reais. Cada participante representa uma iniciativa transformando Betim.
            </p>
          </div>
        </EditorialReveal>

        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {teamMembers.map((member) => (
            <div
              key={member.name}
              className="flex flex-col items-center rounded-xl p-6 text-center"
              style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full font-display font-bold"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                {member.initials}
              </div>
              <p className="mt-4 font-display text-sm font-bold" style={{ color: "var(--fx-ink)" }}>
                {member.name}
              </p>
              <p className="mt-1 font-body text-xs" style={{ color: "var(--fx-muted)" }}>
                {member.role}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Final */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 text-center sm:px-10">
          <EditorialReveal>
            <div className="mx-auto max-w-2xl space-y-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                O Convite
              </p>
              <h2 className="font-display text-3xl font-bold sm:text-4xl" style={{ color: "var(--fx-ink)" }}>
                O próximo capítulo precisa de você.
              </h2>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Venha cocriar, aprender e escalar conosco. Betim está aberta para a inovação.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                <Link
                  href="/faca-parte"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90"
                  style={{ background: "var(--fx-accent)" }}
                >
                  Quero fazer parte
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/oportunidades"
                  className="inline-flex items-center gap-2 px-8 py-3.5 font-mono text-xs uppercase tracking-[0.16em] transition-colors"
                  style={{ border: "1px solid var(--fx-line)", color: "var(--fx-ink)", background: "var(--fx-paper)" }}
                >
                  Ver oportunidades
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
