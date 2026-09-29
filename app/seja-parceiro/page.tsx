import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, HandCoins, Handshake, Megaphone, Rocket } from "lucide-react";
import { PartnerApplicationForm } from "@/components/sections/partner-application-form";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";

export const metadata: Metadata = {
  title: "Seja um parceiro | Fênix Valley",
  description:
    "Formas de apoiar o Fênix Valley: espaços, mentoria, desafios de inovação aberta, patrocínio, tecnologia e bolsas. Envie sua proposta de parceria para a coordenação.",
  openGraph: {
    title: "Seja um parceiro | Fênix Valley",
    description: "Apoie o movimento que transforma Betim em polo de inovação, tecnologia e empreendedorismo.",
    images: ["/logo-simbolo.png"]
  }
};

const supportWays = [
  {
    icon: Building2,
    title: "Espaços e estrutura",
    body: "Ceder salas, auditórios ou laboratórios para encontros, turmas dos programas e demo days do movimento."
  },
  {
    icon: GraduationCap,
    title: "Mentoria e especialistas",
    body: "Disponibilizar profissionais para mentorias, bancas, palestras e trilhas de capacitação do ecossistema."
  },
  {
    icon: Rocket,
    title: "Desafios de inovação aberta",
    body: "Publicar dores reais da operação e receber propostas de startups, pesquisadores e talentos da região."
  },
  {
    icon: HandCoins,
    title: "Patrocínio e bolsas",
    body: "Financiar eventos, programas, premiações e bolsas de estudo que sustentam a agenda do movimento."
  },
  {
    icon: Megaphone,
    title: "Divulgação e mídia",
    body: "Ampliar o alcance das chamadas, eventos e conquistas do ecossistema nos seus canais de comunicação."
  },
  {
    icon: Handshake,
    title: "Tecnologia e ferramentas",
    body: "Oferecer créditos, licenças e infraestrutura para as startups e projetos acompanhados pelo movimento."
  }
];

const benefits = [
  "Conexão direta com startups, pesquisadores e talentos de Betim e região.",
  "Presença na vitrine pública de parceiros, com página própria e contribuição registrada.",
  "Participação em bancas, demo days e nas decisões sobre a agenda do ecossistema.",
  "Acesso antecipado às chamadas, programas e resultados dos desafios de inovação aberta."
];

export default function SejaParceiroPage() {
  return (
    <EditorialShell active="/seja-parceiro">
      <PageHeader
        kicker="Apoie o movimento"
        title="Seja um parceiro do Fênix Valley."
        accent="parceiro"
        lede="Sua organização pode acelerar a inovação em Betim com espaços, mentoria, tecnologia ou desafios. Cada parceria é desenhada com a coordenação a partir do que sua organização tem de melhor a oferecer."
      />

      {/* Formas de Apoio */}
      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10">
        <EditorialReveal>
          <div className="max-w-2xl space-y-3">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
              Modalidades
            </p>
            <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
              Como apoiar o ecossistema
            </h2>
          </div>
        </EditorialReveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {supportWays.map((way, index) => {
            const Icon = way.icon;
            return (
              <MotionCard
                key={way.title}
                delay={index * 0.06}
                className="flex flex-col rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-lg"
                  style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>
                  {way.title}
                </h3>
                <p className="mt-2 flex-1 font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                  {way.body}
                </p>
              </MotionCard>
            );
          })}
        </div>
      </section>

      {/* Benefícios + Formulário */}
      <section className="border-t py-16 sm:py-20" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
        <div className="mx-auto w-full max-w-[1180px] px-6 sm:px-10">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6">
              <EditorialReveal>
                <div className="space-y-3">
                  <p className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "var(--fx-accent)" }}>
                    Contrapartidas
                  </p>
                  <h2 className="font-display text-2xl font-bold sm:text-3xl" style={{ color: "var(--fx-ink)" }}>
                    Benefícios da parceria
                  </h2>
                </div>
              </EditorialReveal>

              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="rounded-xl p-5 font-body text-sm leading-relaxed"
                    style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
                  >
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>
                Parcerias e patrocínios seguem o código de conduta e as políticas de transparência do movimento,
                publicados em{" "}
                <Link href="/governanca" className="font-semibold underline" style={{ color: "var(--fx-accent)" }}>
                  /governanca
                </Link>
                .
              </p>
            </div>

            <EditorialReveal delay={0.15}>
              <div
                className="space-y-6 rounded-2xl p-6 sm:p-8"
                style={{ background: "var(--fx-paper)", border: "1px solid var(--fx-line)" }}
              >
                <div className="space-y-2">
                  <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                    Envie sua proposta
                  </h2>
                  <p className="font-body text-sm leading-relaxed" style={{ color: "var(--fx-muted)" }}>
                    A coordenação retorna com uma proposta de parceria adequada ao momento da sua organização.
                  </p>
                </div>
                <PartnerApplicationForm />
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
