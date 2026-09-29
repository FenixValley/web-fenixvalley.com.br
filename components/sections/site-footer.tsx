import Image from "next/image";
import Link from "next/link";
import { Mail, MapPinned, MessageCircle } from "lucide-react";

const footerGroups = [
  {
    title: "Institucional",
    links: [
      { label: "Sobre nós", href: "/sobre" },
      { label: "Comunidade", href: "/comunidade" },
      { label: "Impacto", href: "/impacto" },
      { label: "Governança", href: "/governanca" },
      { label: "Parceiros", href: "/parceiros" },
      { label: "Contato", href: "/contato" }
    ]
  },
  {
    title: "Ecossistema",
    links: [
      { label: "Mapa do ecossistema", href: "/mapa" },
      { label: "Startups", href: "/startups" },
      { label: "Empresas", href: "/empresas" },
      { label: "Desafios de inovação", href: "/desafios" },
      { label: "Universidades", href: "/universidades" },
      { label: "Investidores", href: "/investidores" },
      { label: "Mentores", href: "/mentores" },
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
  { label: "Privacidade e LGPD", href: "/privacidade" },
  { label: "Termos de uso", href: "/termos" },
  { label: "Cookies", href: "/cookies" },
  { label: "Código de conduta", href: "/codigo-de-conduta" },
  { label: "Política de conteúdo", href: "/politica-de-conteudo" },
  { label: "Governança", href: "/governanca" }
];

export function SiteFooter() {
  return (
    <footer className="border-t border-[rgba(10,16,32,0.08)] bg-[#f8faff] text-[#0a1020]">
      <div className="section-shell py-12 sm:py-16">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_1.45fr]">
          <div className="space-y-6">
            <Image src="/logo-vertical-escuro.png" alt="Fênix Valley" width={160} height={160} className="h-20 w-auto" />
            <p className="max-w-md text-sm leading-6 text-[#5a647e]">
              Betim pode criar novos negócios, formar talentos, desenvolver tecnologias e construir
              uma economia mais diversa, inovadora e preparada para o futuro.
            </p>
            <div className="grid gap-3 text-sm text-[#5a647e]">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-[#1b3bff] transition-colors">
                <MessageCircle className="h-4 w-4 text-[#1b3bff]" />
                Comunidade oficial no WhatsApp
              </Link>
              <Link href="mailto:betim.fenixvalley2026@gmail.com" className="inline-flex items-center gap-2 hover:text-[#1b3bff] transition-colors">
                <Mail className="h-4 w-4 text-[#1b3bff]" />
                betim.fenixvalley2026@gmail.com
              </Link>
              <span className="inline-flex items-center gap-2">
                <MapPinned className="h-4 w-4 text-emerald-600" />
                Betim, Minas Gerais
              </span>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-xs font-mono font-bold uppercase tracking-[0.16em] text-[#0a1020]">{group.title}</h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-sm leading-6 text-[#5a647e] hover:text-[#1b3bff] transition-colors">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-[rgba(10,16,32,0.08)] pt-6 text-xs text-[#5a647e] md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <Image src="/logo-vertical-escuro.png" alt="Fênix Valley" width={80} height={80} className="h-5 w-auto opacity-80" />
            <p>© 2026 Fênix Valley. Betim renascendo pela inovação.</p>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.label} href={link.href} className="hover:text-[#0a1020] transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
