import type { Metadata } from "next";
import Link from "next/link";
import { Building2, GraduationCap, HandCoins, Handshake, Megaphone, Rocket } from "lucide-react";
import { PartnerApplicationForm } from "@/components/sections/partner-application-form";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Apoie o movimento</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Seja um parceiro do Fênix Valley
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Sua organização pode acelerar o renascimento de Betim pela inovação. Cada parceria é desenhada
                com a coordenação a partir do que sua organização tem de melhor a oferecer — e fica registrada
                publicamente em{" "}
                <Link href="/parceiros" className="font-bold text-orange-300 hover:text-orange-200">
                  /parceiros
                </Link>
                .
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {supportWays.map((way) => (
                <article key={way.title} className="surface-panel rounded-lg p-5">
                  <way.icon className="h-6 w-6 text-orange-300" aria-hidden="true" />
                  <h2 className="mt-3 font-[var(--font-space)] text-base font-bold text-white">{way.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-slate-300">{way.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="section-shell relative grid gap-8 lg:grid-cols-[.9fr_1.1fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">O que você recebe</p>
                <h2 className="font-[var(--font-space)] text-2xl font-black leading-tight text-white sm:text-3xl">
                  Benefícios da parceria
                </h2>
              </div>
              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="surface-panel rounded-lg p-4 text-sm leading-6 text-slate-300">
                    {benefit}
                  </li>
                ))}
              </ul>
              <p className="text-sm leading-6 text-slate-400">
                Parcerias e patrocínios seguem o código de conduta e as políticas de transparência do movimento,
                publicados em{" "}
                <Link href="/governanca" className="font-bold text-orange-300 hover:text-orange-200">
                  /governanca
                </Link>
                .
              </p>
            </div>

            <div className="surface-panel space-y-4 rounded-lg p-6">
              <div className="space-y-2">
                <h2 className="font-[var(--font-space)] text-xl font-bold text-white">Envie sua proposta</h2>
                <p className="text-sm leading-6 text-slate-300">
                  A coordenação retorna com uma proposta de parceria adequada ao momento da sua organização.
                </p>
              </div>
              <PartnerApplicationForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
