import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinned, MessageCircle } from "lucide-react";
import { NewsletterForm } from "./newsletter-form";

const footerGroups = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Comunidade", href: "/comunidade" },
      { label: "Impacto", href: "/impacto" },
      { label: "Contato", href: "/contato" }
    ]
  },
  {
    title: "Ecossistema",
    links: [
      { label: "Mapa do ecossistema", href: "/mapa" },
      { label: "Startups", href: "/startups" },
      { label: "Empresas", href: "/empresas" },
      { label: "Universidades", href: "/universidades" },
      { label: "Espaços", href: "/espacos" }
    ]
  },
  {
    title: "Programas",
    links: [
      { label: "Todos os programas", href: "/programas" },
      { label: "Pré-aceleração", href: "/programas/pre-aceleracao" },
      { label: "Inovação aberta", href: "/programas/inovacao-aberta" },
      { label: "Residência tecnológica", href: "/programas/residencia-tecnologica" }
    ]
  },
  {
    title: "Oportunidades",
    links: [
      { label: "Agenda aberta", href: "/oportunidades" },
      { label: "Eventos", href: "/eventos" },
      { label: "Conteúdos", href: "/conteudos" },
      { label: "Seja um parceiro", href: "/seja-parceiro" }
    ]
  }
];

const legalLinks = [
  { label: "Privacidade", href: "/privacidade" },
  { label: "LGPD", href: "/privacidade" },
  { label: "Código de conduta", href: "/#participar" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-white">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-8 rounded-lg border border-white/10 bg-white/[0.03] p-5 sm:p-7 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Conecte-se</p>
            <h2 className="max-w-2xl font-[var(--font-space)] text-2xl font-black leading-tight sm:text-3xl">
              Faça parte do ecossistema que transforma ideias em negócios e talentos em oportunidades.
            </h2>
            <p className="max-w-2xl text-sm leading-6 text-slate-300">
              Receba eventos, chamadas, editais e convites da comunidade Fênix Valley.
            </p>
          </div>
          <NewsletterForm />
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="space-y-6">
            <Image src="/logo-vertical.png" alt="Fênix Valley" width={160} height={200} className="h-24 w-auto" />
            <p className="max-w-md text-sm leading-6 text-slate-300">
              Betim pode criar novos negócios, formar talentos, desenvolver tecnologias e construir
              uma economia mais diversa, inovadora e preparada para o futuro.
            </p>
            <div className="grid gap-3 text-sm text-slate-300">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-orange-200">
                <MessageCircle className="h-4 w-4 text-orange-300" />
                Comunidade oficial no WhatsApp
              </Link>
              <Link href="mailto:betim.fenixvalley2026@gmail.com" className="inline-flex items-center gap-2 hover:text-orange-200">
                <Mail className="h-4 w-4 text-sky-300" />
                betim.fenixvalley2026@gmail.com
              </Link>
              <span className="inline-flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-emerald-300" />
                Betim, Minas Gerais
              </span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-100">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm leading-6 text-slate-400 hover:text-orange-200">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-tipografia.png" alt="Fênix Valley" width={80} height={24} className="h-4 w-auto opacity-60" />
            <p>© 2026 Fênix Valley. Betim renascendo pela inovação.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-slate-200">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
