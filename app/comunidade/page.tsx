import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, HeartHandshake, Lightbulb, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";

export const metadata: Metadata = {
  title: "Comunidade | Fênix Valley",
  description:
    "Espaço de encontro, regras de colaboração, canal oficial no WhatsApp e conexões entre empreendedores, estudantes e empresas de Betim.",
  openGraph: {
    title: "Comunidade | Fênix Valley",
    description:
      "Espaço de encontro, regras de colaboração, canal oficial no WhatsApp e conexões entre empreendedores, estudantes e empresas de Betim.",
    images: ["/logo-simbolo.png"]
  }
};

const whatsappUrl = "https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX";

const partnerCommunities = [
  {
    name: "San Pedro Valley",
    description: "Comunidade de startups e inovação de Belo Horizonte e região metropolitana.",
    category: "Comunidade Regional"
  },
  {
    name: "SEBRAE Minas",
    description: "Programas de capacitação, aceleração e apoio a micro e pequenas empresas inovadoras.",
    category: "Fomento & Apoio"
  },
  {
    name: "Rede Acadêmica de Betim",
    description: "Núcleos de inovação e empresas juniores da PUC Minas Betim, IFMG e faculdades da região.",
    category: "Academia & Pesquisa"
  },
  {
    name: "CDL e Associações Empresariais",
    description: "Parceria com o setor produtivo, comércio e indústria de Betim e Contagem.",
    category: "Setor Produtivo"
  }
];

export default function ComunidadePage() {
  return (
    <EditorialShell active="/comunidade">
      <PageHeader
        kicker="Conexão Humana"
        title="A Comunidade Fênix Valley."
        accent="Comunidade"
        lede="Pessoas antes de tudo: reunimos quem acredita que Betim pode construir uma economia vibrante, tecnológica e colaborativa. Conheça nossos canais, princípios de convivência e como se engajar."
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <div className="grid gap-6 sm:grid-cols-2">
          {/* WhatsApp */}
          <MotionCard
            delay={0.05}
            className="flex flex-col justify-between rounded-xl p-6"
            style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
          >
            <div className="space-y-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                <MessageCircle className="h-6 w-6" />
              </div>
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Grupo Oficial no WhatsApp
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                O canal diário onde circulam novidades, vagas, chamadas para meetups e discussões sobre o
                ecossistema local.
              </p>
            </div>
            <div className="pt-6">
              <Button asChild className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                  Entrar no grupo oficial
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </MotionCard>

          {/* Código de Conduta */}
          <MotionCard
            delay={0.1}
            className="flex flex-col justify-between rounded-xl p-6"
            style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
          >
            <div className="space-y-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                <ShieldCheck className="h-6 w-6" />
              </div>
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Código de Conduta
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Regras claras contra assédio, spam e autopromoção vazia. Construímos um ambiente seguro, diverso e
                acolhedor para todos os participantes.
              </p>
            </div>
            <div className="pt-6">
              <Button asChild variant="outline" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/codigo-de-conduta">
                  Ler código de conduta
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionCard>

          {/* Apresente seu Projeto */}
          <MotionCard
            delay={0.15}
            className="flex flex-col justify-between rounded-xl p-6"
            style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
          >
            <div className="space-y-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                <Lightbulb className="h-6 w-6" />
              </div>
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Apresente seu Projeto
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Tem uma ideia de negócio ou startup em desenvolvimento? Cadastre seu projeto para receber apoio,
                conectar-se com mentores e aparecer no mapa.
              </p>
            </div>
            <div className="pt-6">
              <Button asChild variant="outline" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/faca-parte">
                  Cadastrar no Faça Parte
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionCard>

          {/* Voluntariado */}
          <MotionCard
            delay={0.2}
            className="flex flex-col justify-between rounded-xl p-6"
            style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
          >
            <div className="space-y-4">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
              >
                <HeartHandshake className="h-6 w-6" />
              </div>
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Seja Voluntário(a)
              </h2>
              <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Ajude a organizar eventos, produzir conteúdos, apoiar a comunidade ou conectar escolas e empresas
                na operação do movimento.
              </p>
            </div>
            <div className="pt-6">
              <Button asChild variant="outline" className="w-full gap-2 font-mono text-xs uppercase tracking-[0.16em]">
                <Link href="/voluntarie-se">
                  Quero ser voluntário(a)
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </MotionCard>
        </div>
      </section>

      {/* Comunidades Parceiras */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <EditorialReveal>
            <div className="max-w-2xl space-y-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                  Comunidades & Parceiros Conectados
                </h2>
              </div>
              <p className="font-body text-base leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                Iniciativas que caminham juntas para fortalecer Betim no cenário de tecnologia de Minas Gerais e do Brasil.
              </p>
            </div>
          </EditorialReveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {partnerCommunities.map((partner, index) => (
              <MotionCard
                key={partner.name}
                delay={index * 0.06}
                className="flex flex-col rounded-xl p-6"
                style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
              >
                <span
                  className="font-mono text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: "var(--fx-accent)" }}
                >
                  {partner.category}
                </span>
                <h3 className="mt-2 font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                  {partner.name}
                </h3>
                <p className="mt-2 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  {partner.description}
                </p>
              </MotionCard>
            ))}
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
