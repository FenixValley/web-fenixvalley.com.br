import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, ChevronRight, HeartHandshake, Lightbulb, MessageCircle, ShieldCheck, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

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
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-4xl space-y-12">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Link href="/" className="hover:text-primary">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-foreground">Comunidade</span>
            </nav>

            <div className="space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Conexão Humana</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-foreground sm:text-4xl">
                A Comunidade Fênix Valley
              </h1>
              <p className="max-w-3xl text-lg leading-8 text-muted-foreground">
                Pessoas antes de tudo: reunimos quem acredita que Betim pode construir uma economia vibrante,
                tecnológica e colaborativa. Conheça nossos canais, princípios de convivência e como se engajar.
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <div className="surface-panel flex flex-col justify-between rounded-xl p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MessageCircle className="h-6 w-6" />
                  </div>
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                    Grupo Oficial no WhatsApp
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    O canal diário onde circulam novidades, vagas, chamadas para meetups e discussões sobre o
                    ecossistema local.
                  </p>
                </div>
                <Button asChild className="w-full gap-2">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    Entrar no grupo oficial
                    <ArrowUpRight className="h-4 w-4" />
                  </a>
                </Button>
              </div>

              <div className="surface-panel flex flex-col justify-between rounded-xl p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ShieldCheck className="h-6 w-6" />
                  </div>
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                    Código de Conduta
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Regras claras contra assédio, spam e autopromoção vazia. Construímos um ambiente seguro, diverso e
                    acolhedor para todos os participantes.
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full gap-2 border-border">
                  <Link href="/codigo-de-conduta">
                    Ler código de conduta
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="surface-panel flex flex-col justify-between rounded-xl p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                    <Lightbulb className="h-6 w-6" />
                  </div>
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                    Apresente seu Projeto
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Tem uma ideia de negócio ou startup em desenvolvimento? Cadastre seu projeto para receber apoio,
                    conectar-se com mentores e aparecer no mapa.
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full gap-2 border-border">
                  <Link href="/faca-parte">
                    Cadastrar no Faça Parte
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              <div className="surface-panel flex flex-col justify-between rounded-xl p-6 space-y-5">
                <div className="space-y-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                    <HeartHandshake className="h-6 w-6" />
                  </div>
                  <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                    Seja Voluntário(a)
                  </h2>
                  <p className="text-sm leading-6 text-muted-foreground">
                    Ajude a organizar eventos, produzir conteúdos, apoiar a comunidade ou conectar escolas e empresas
                    na operação do movimento.
                  </p>
                </div>
                <Button asChild variant="outline" className="w-full gap-2 border-border">
                  <Link href="/voluntarie-se">
                    Quero ser voluntário(a)
                    <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="font-[var(--font-space)] text-2xl font-bold text-foreground">
                    Comunidades & Parceiros Conectados
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Iniciativas que caminham juntas para fortalecer Betim no cenário de tecnologia de Minas Gerais e do Brasil.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {partnerCommunities.map((partner) => (
                  <div key={partner.name} className="surface-panel rounded-lg p-5 space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      {partner.category}
                    </span>
                    <h3 className="font-[var(--font-space)] text-base font-bold text-foreground">
                      {partner.name}
                    </h3>
                    <p className="text-sm leading-6 text-muted-foreground">{partner.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
