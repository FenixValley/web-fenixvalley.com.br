"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, MapPinned, MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const navItems = [
  {
    href: "/#sobre",
    label: "Sobre",
    links: [
      { href: "/#sobre", label: "História e propósito" },
      { href: "/#ecossistema", label: "Cinco pilares" },
      { href: "/#participar", label: "Código de colaboração" }
    ]
  },
  {
    href: "/mapa",
    label: "Ecossistema",
    links: [
      { href: "/mapa", label: "Mapa do ecossistema" },
      { href: "/#ecossistema", label: "Pilares e mapa vivo" },
      { href: "/#participar", label: "Startups e empresas" }
    ]
  },
  {
    href: "/#oportunidades",
    label: "Oportunidades",
    links: [
      { href: "/#oportunidades", label: "Agenda aberta" },
      { href: "/#oportunidades", label: "Editais e chamadas" },
      { href: "/#participar", label: "Divulgar evento" }
    ]
  },
  {
    href: "/#participar",
    label: "Faça Parte",
    links: [
      { href: "/#participar", label: "Cadastrar perfil" },
      { href: "/mapa", label: "Cadastrar organização no mapa" },
      { href: "/voluntarie-se", label: "Ser voluntário(a)" }
    ]
  }
];

const quickActions = [
  { href: "/mapa", label: "Mapa do ecossistema" },
  { href: "/#oportunidades", label: "Divulgar evento" },
  { href: "/voluntarie-se", label: "Ser voluntário(a)" }
];

export function SiteHeader() {
  return (
    <header className="site-header sticky top-0 z-40 border-b border-white/10 bg-slate-950/86 text-white backdrop-blur-xl">
      <div className="site-header-top hidden border-b border-white/10 bg-slate-950/70 md:block">
        <div className="section-shell flex h-9 items-center justify-between text-xs text-slate-300">
          <Link href="/mapa" className="inline-flex items-center gap-2 hover:text-white">
            <MapPinned className="h-3.5 w-3.5 text-orange-300" />
            Betim renascendo pela inovação
          </Link>
          <div className="flex items-center gap-4">
            {quickActions.map((action) => (
              <Link key={action.label} href={action.href} className="font-semibold hover:text-orange-200">
                {action.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-2">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Fênix Valley">
          <Image src="/logo-fenix-valley.png" alt="" width={150} height={150} priority className="h-12 w-auto shrink-0" />
          <span className="hidden max-w-40 text-xs font-semibold leading-5 text-slate-300 xl:block">
            Ecossistema de inovação de Betim
          </span>
        </Link>
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <div key={item.label} className="group relative">
              <Link
                href={item.href}
                className="inline-flex h-10 items-center gap-1 rounded-md px-3 text-sm font-semibold text-slate-200 transition-colors hover:bg-white/10 hover:text-white"
              >
                {item.label}
                <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
              </Link>
              <div className="invisible absolute left-0 top-11 w-64 translate-y-1 rounded-lg border border-white/10 bg-slate-950/96 p-2 opacity-0 shadow-2xl shadow-black/40 transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
                {item.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between rounded-md px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-white/10 hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle className="site-theme-toggle" />
          <Button asChild variant="ghost" size="sm" className="hidden text-slate-200 hover:bg-white/10 hover:text-white md:inline-flex">
            <Link href="#oportunidades">
              <Search className="h-4 w-4" />
              Buscar
            </Link>
          </Button>
          <Button asChild size="sm">
            <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Faça parte
            </Link>
          </Button>
        </div>
      </div>
      <nav className="section-shell flex gap-2 overflow-x-auto pb-3 lg:hidden" aria-label="Navegação principal">
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="shrink-0 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
