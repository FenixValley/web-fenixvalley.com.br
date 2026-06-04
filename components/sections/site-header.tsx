"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";


const leftNav = [
  { href: "/#sobre", label: "Sobre" },
  { href: "/#ecossistema", label: "Ecossistema" },
  { href: "/#programas", label: "Programas" }
];

const rightNav = [
  { href: "/#oportunidades", label: "Oportunidades" },
  { href: "/#eventos", label: "Eventos" },
  { href: "/faca-parte", label: "Faça Parte", highlight: true }
];

interface SearchItem {
  title: string;
  description: string;
  category: string;
  href: string;
  target?: string;
}

const searchItems: SearchItem[] = [
  {
    title: "Sobre o Movimento",
    description: "Conheça o propósito, a missão e a visão do Fênix Valley.",
    category: "Geral",
    href: "/#sobre"
  },
  {
    title: "Propósito, Missão e Visão",
    description: "O que impulsiona o ecossistema de Betim.",
    category: "Geral",
    href: "/#sobre"
  },
  {
    title: "Ecossistema de Inovação",
    description: "A rede de conexão entre startups, talentos, capital e empresas.",
    category: "Sobre",
    href: "/#ecossistema"
  },
  {
    title: "Frentes Práticas (Pilares)",
    description: "Ideias, projetos, universidades, capital, nova economia e impacto local.",
    category: "Pilares",
    href: "/#ecossistema"
  },
  {
    title: "Programas e Trilhas",
    description: "Inovação aberta, pré-aceleração e residência tecnológica.",
    category: "Programas",
    href: "/#programas"
  },
  {
    title: "Mesa Aberta / Oportunidades",
    description: "Editais, vagas, mentorias e projetos ativos na comunidade.",
    category: "Oportunidades",
    href: "/#oportunidades"
  },
  {
    title: "Indicadores e Transparência",
    description: "Sinais de movimento e validação contínua de Betim.",
    category: "Dados",
    href: "/#indicadores"
  },
  {
    title: "Eventos e Agenda",
    description: "Chamadas e encontros ativos organizados no polo.",
    category: "Eventos",
    href: "/#oportunidades"
  },
  {
    title: "Faça Parte (Formulário)",
    description: "Inscreva seu interesse no Google Forms para participar da curadoria.",
    category: "Ações",
    href: "/faca-parte"
  },
  {
    title: "Comunidade no WhatsApp",
    description: "Conecte-se com outros membros no nosso grupo oficial do WhatsApp.",
    category: "Ações",
    href: "https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX",
    target: "_blank"
  }
];


export function SiteHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  const toggleSearch = useCallback(() => {
    setSearchOpen((prev) => !prev);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(e.target.value);
  };

  const filteredItems = searchVal.trim()
    ? searchItems.filter(item =>
        item.title.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.description.toLowerCase().includes(searchVal.toLowerCase()) ||
        item.category.toLowerCase().includes(searchVal.toLowerCase())
      )
    : [];

  const handleItemClick = (item: SearchItem) => {
    setSearchOpen(false);
    setSearchVal("");

    if (item.target === "_blank") {
      window.open(item.href, "_blank");
      return;
    }

    if (item.href.startsWith("/#")) {
      const targetId = item.href.replace("/#", "");
      if (pathname === "/") {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else {
        router.push(item.href);
      }
    } else {
      router.push(item.href);
    }
  };

  /* close search on Escape */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSearchOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);


  return (
    <div className="sticky top-0 z-40">
      {/* ── main header bar ── */}
      <header className="relative z-40 border-b border-white/10 bg-slate-950/75 backdrop-blur-xl">
        <div className="section-shell flex h-16 items-center justify-between gap-4">
          {/* left nav — desktop */}
          <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold text-slate-300 lg:flex">
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* hamburger — mobile */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* center logo */}
          <Link href="#" className="flex shrink-0 items-center" aria-label="Fênix Valley">
            <Image
              src="/logo-fenix-valley.png"
              alt=""
              width={130}
              height={130}
              priority
              className="h-11 w-auto"
            />
          </Link>

          {/* right nav — desktop */}
          <nav className="hidden flex-1 items-center justify-end gap-6 text-sm font-semibold text-slate-300 lg:flex">
            {rightNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.highlight
                    ? "rounded-full bg-orange-500 px-4 py-1.5 text-white shadow-sm shadow-orange-500/20 transition-all hover:bg-orange-600 hover:shadow-md hover:shadow-orange-500/25"
                    : "transition-colors hover:text-white"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* placeholder for mobile to balance flexbox */}
          <div className="w-9 lg:hidden" />
        </div>
      </header>

      {/* ── search trigger — centered below header ── */}
      <div className="relative z-40 flex justify-center">
        <button
          onClick={toggleSearch}
          className={`-mt-[18px] flex h-9 w-9 items-center justify-center rounded-full border shadow-sm transition-all duration-300 ${
            searchOpen
              ? "bg-white text-slate-950 border-white shadow-lg"
              : "bg-slate-900 text-slate-300 border-white/10 hover:bg-slate-800 hover:text-white hover:shadow-md"
          }`}
          aria-label={searchOpen ? "Fechar busca" : "Abrir busca"}
        >
          {searchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
        </button>
      </div>

      {/* ── animated search bar ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="search-overlay"
            style={{ top: "64px" }}
          >
            <div className="border-b border-white/10 bg-slate-950/95 py-4 shadow-lg shadow-black/20 backdrop-blur-xl">
              <div className="section-shell">
                <div className="relative mx-auto max-w-xl">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={searchVal}
                    onChange={handleSearchChange}
                    placeholder="Buscar páginas, atalhos e recursos..."
                    className="h-12 w-full rounded-xl border border-white/10 bg-slate-900/60 pl-12 pr-4 text-sm text-white outline-none transition-all placeholder:text-slate-500 focus:border-orange-500/40 focus:bg-slate-900 focus:ring-2 focus:ring-orange-500/10"
                  />

                  {searchVal.trim() && (
                    <div className="absolute left-0 right-0 mt-3 rounded-2xl border border-white/10 bg-slate-950/98 p-2.5 shadow-2xl backdrop-blur-2xl max-h-[350px] overflow-y-auto z-50 text-white">
                      <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        Páginas e atalhos encontrados
                      </div>
                      <div className="mt-1.5 space-y-1">
                        {filteredItems.length > 0 ? (
                          filteredItems.map((item, index) => (
                            <button
                              key={index}
                              onClick={() => handleItemClick(item)}
                              className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left transition-colors hover:bg-white/5 border border-transparent hover:border-white/5"
                            >
                              <div className="flex-1 pr-4">
                                <div className="flex items-center gap-2">
                                  <span className="font-semibold text-slate-200 text-sm">{item.title}</span>
                                  <span className="rounded bg-orange-950/50 text-orange-400 border border-orange-500/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide">
                                    {item.category}
                                  </span>
                                </div>
                                <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{item.description}</p>
                              </div>
                              {item.target === "_blank" ? (
                                <ExternalLink className="h-4 w-4 text-slate-500 shrink-0" />
                              ) : (
                                <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-3 py-8 text-center text-sm text-slate-400 font-medium">
                            Nenhum recurso ou atalho encontrado para &ldquo;{searchVal}&rdquo;
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── mobile nav drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-xl lg:hidden"
          >
            <nav className="section-shell flex flex-col gap-1 py-4">
              {[...leftNav, ...rightNav].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    "highlight" in item && item.highlight
                      ? "rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                      : "rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
