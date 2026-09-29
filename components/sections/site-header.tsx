import re

with open('components/sections/site-header.tsx', 'r', encoding='utf-8') as f:
    text = f.read()

# We'll just generate the file from scratch because parsing merge conflicts programmatically for such a complex change is harder than just printing the unified code.

new_code = """\"use client\";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown, ExternalLink, MapPinned, MessageCircle, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const leftNav = [
  { href: "/sobre", label: "Sobre" },
  { href: "/#ecossistema", label: "Ecossistema" },
  { href: "/#programas", label: "Programas" }
];

const rightNav = [
  { href: "/conteudos", label: "Conteúdos" },
  { href: "/eventos", label: "Eventos" },
  { href: "/membro", label: "Área do Membro" },
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
    href: "/eventos"
  },
  {
    title: "Startups",
    description: "Vitrine das startups do ecossistema: segmento, estágio e contato.",
    category: "Vitrine",
    href: "/startups"
  },
  {
    title: "Universidades e Educação",
    description: "Instituições de ensino, escolas técnicas e trilhas de capacitação.",
    category: "Vitrine",
    href: "/universidades"
  },
  {
    title: "Mentores",
    description: "Profissionais disponíveis para orientar startups e estudantes.",
    category: "Vitrine",
    href: "/mentores"
  },
  {
    title: "Investidores",
    description: "Investidores-anjo, fundos e aceleradoras conectados à região.",
    category: "Vitrine",
    href: "/investidores"
  },
  {
    title: "Espaços",
    description: "Coworkings, laboratórios e hubs de inovação disponíveis.",
    category: "Vitrine",
    href: "/espacos"
  },
  {
    title: "Empresas e Indústrias",
    description: "Inovação aberta, acesso a talentos e patrocínio para empresas da região.",
    category: "Vitrine",
    href: "/empresas"
  },
  {
    title: "Desafios de Inovação",
    description: "Dores reais publicadas por empresas, abertas a startups e pesquisadores.",
    category: "Oportunidades",
    href: "/desafios"
  },
  {
    title: "Parceiros e Patrocinadores",
    description: "Quem sustenta o movimento, por categoria de contribuição.",
    category: "Institucional",
    href: "/parceiros"
  },
  {
    title: "Impacto e Transparência",
    description: "Indicadores verificados, cases, depoimentos e relatórios do movimento.",
    category: "Institucional",
    href: "/impacto"
  },
  {
    title: "Governança",
    description: "Coordenação, conselho, políticas legais e prestação de contas.",
    category: "Institucional",
    href: "/governanca"
  },
  {
    title: "Seja um Parceiro",
    description: "Formas de apoiar o Fênix Valley e enviar uma proposta de parceria.",
    category: "Ações",
    href: "/seja-parceiro"
  },
  {
    title: "Faça Parte (Formulário)",
    description: "Inscreva seu interesse no formulário para participar da curadoria.",
    category: "Ações",
    href: "/faca-parte"
  },
  {
    title: "Conteúdos e Notícias",
    description: "Artigos, guias práticos, cases de sucesso e editais do ecossistema.",
    category: "Conteúdos",
    href: "/conteudos"
  },
  {
    title: "Comunidade Fênix Valley",
    description: "Canais oficiais, encontros e regras de convivência para membros.",
    category: "Comunidade",
    href: "/comunidade"
  },
  {
    title: "Área do Membro",
    description: "Acesse seu perfil, itens salvos e acompanhe inscrições e candidaturas.",
    category: "Membro",
    href: "/membro"
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

  const [liveResults, setLiveResults] = useState<{
    actors: { id: number; name: string; segment: string; slug: string }[];
    opportunities: { id: number; title: string; type: string; link: string | null }[];
    events: { id: number; title: string; category: string; slug: string }[];
    challenges: { id: number; title: string; company: string; slug: string }[];
    partners: { id: number; name: string; category: string; slug: string }[];
    contents: { slug: string; title: string; category: string; summary: string }[];
  }>({
    actors: [],
    opportunities: [],
    events: [],
    challenges: [],
    partners: [],
    contents: []
  });
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const q = searchVal.trim();
    if (!q || q.length < 2) {
      setLiveResults({
        actors: [],
        opportunities: [],
        events: [],
        challenges: [],
        partners: [],
        contents: []
      });
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
        if (res.ok) {
          const data = (await res.json()) as { results?: typeof liveResults };
          if (data.results) {
            setLiveResults(data.results);
          }
        }
      } catch {
        // Fallback
      } finally {
        setIsSearching(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [searchVal]);

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
      <header className="relative z-40 border-b border-white/10 bg-slate-950/86 text-white backdrop-blur-xl">
        <div className="section-shell flex min-h-16 items-center justify-between gap-4 py-2 px-4 md:px-8">
          {/* mobile hamburger */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-slate-300 transition-colors hover:bg-white/10 hover:text-white lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* logo */}
          <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Fênix Valley">
            <Image src="/logo-fenix-valley.png" alt="" width={150} height={150} priority className="h-12 w-auto shrink-0" />
            <span className="hidden max-w-40 text-xs font-semibold leading-5 text-slate-300 xl:block">
              Ecossistema de inovação de Betim
            </span>
          </Link>

          {/* left nav - desktop */}
          <nav className="hidden items-center gap-6 lg:flex flex-1 ml-8 text-sm font-semibold text-slate-300">
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ))}
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

          <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle className="site-theme-toggle" />
            <Button onClick={toggleSearch} variant="ghost" size="sm" className="hidden text-slate-200 hover:bg-white/10 hover:text-white md:inline-flex">
              <Search className="h-4 w-4 mr-2" />
              Buscar
            </Button>
            <Button asChild size="sm">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4 mr-2" />
                Faça parte
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ── animated search bar ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="search-overlay fixed inset-x-0 bg-black/40 z-30"
            style={{ top: "80px", bottom: 0 }}
            onClick={() => setSearchOpen(false)}
          >
            <div 
              className="border-b border-white/10 bg-slate-950/95 py-4 shadow-lg shadow-black/20 backdrop-blur-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="section-shell px-4 md:px-8">
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
                    <div className="absolute left-0 right-0 mt-3 rounded-2xl border border-white/10 bg-slate-950/98 p-2.5 shadow-2xl backdrop-blur-2xl max-h-[400px] overflow-y-auto z-50 text-white space-y-3">
                      {/* Resultados da busca viva no ecossistema */}
                      {liveResults.actors.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary">
                            Startups & Organizações
                          </div>
                          <div className="mt-1 space-y-1">
                            {liveResults.actors.map((actor) => (
                              <button
                                key={`actor-${actor.id}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchVal("");
                                  router.push(actor.slug ? `/atores/${actor.slug}` : "/mapa");
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                              >
                                <div>
                                  <p className="font-semibold text-sm text-slate-200">{actor.name}</p>
                                  <p className="text-xs text-slate-400">{actor.segment}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {liveResults.events.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-sky-400">
                            Eventos
                          </div>
                          <div className="mt-1 space-y-1">
                            {liveResults.events.map((event) => (
                              <button
                                key={`event-${event.id}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchVal("");
                                  router.push(`/eventos/${event.slug}`);
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                              >
                                <div>
                                  <p className="font-semibold text-sm text-slate-200">{event.title}</p>
                                  <p className="text-xs text-slate-400">{event.category}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {liveResults.challenges.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-400">
                            Desafios de Inovação
                          </div>
                          <div className="mt-1 space-y-1">
                            {liveResults.challenges.map((challenge) => (
                              <button
                                key={`challenge-${challenge.id}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchVal("");
                                  router.push(`/desafios/${challenge.slug}`);
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                              >
                                <div>
                                  <p className="font-semibold text-sm text-slate-200">{challenge.title}</p>
                                  <p className="text-xs text-slate-400">{challenge.company}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {liveResults.contents.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                            Conteúdos & Artigos
                          </div>
                          <div className="mt-1 space-y-1">
                            {liveResults.contents.map((content) => (
                              <button
                                key={`content-${content.slug}`}
                                onClick={() => {
                                  setSearchOpen(false);
                                  setSearchVal("");
                                  router.push(`/conteudos/${content.slug}`);
                                }}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
                              >
                                <div>
                                  <p className="font-semibold text-sm text-slate-200">{content.title}</p>
                                  <p className="text-xs text-slate-400">{content.category}</p>
                                </div>
                                <ArrowRight className="h-4 w-4 text-slate-500 shrink-0" />
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Páginas e atalhos de navegação */}
                      {filteredItems.length > 0 && (
                        <div>
                          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                            Páginas e atalhos
                          </div>
                          <div className="mt-1 space-y-1">
                            {filteredItems.map((item, index) => (
                              <button
                                key={index}
                                onClick={() => handleItemClick(item)}
                                className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-white/5"
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
                            ))}
                          </div>
                        </div>
                      )}

                      {filteredItems.length === 0 &&
                        liveResults.actors.length === 0 &&
                        liveResults.events.length === 0 &&
                        liveResults.challenges.length === 0 &&
                        liveResults.contents.length === 0 && (
                          <div className="px-3 py-8 text-center text-sm text-slate-400 font-medium">
                            {isSearching
                              ? "Buscando no ecossistema..."
                              : `Nenhum resultado encontrado para "${searchVal}"`}
                          </div>
                        )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute inset-x-0 top-full bg-slate-950 border-b border-white/10 z-30 shadow-xl"
          >
            <nav className="flex flex-col gap-1 p-4">
              {leftNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}

              {rightNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={
                    "highlight" in item && item.highlight
                      ? "rounded-lg bg-orange-500 px-4 py-2.5 mt-2 text-center text-sm font-semibold text-white transition-colors hover:bg-orange-600"
                      : "rounded-lg px-4 py-2.5 text-sm font-semibold text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
                  }
                >
                  {item.label}
                </Link>
              ))}
              
              <Button onClick={() => { setMobileOpen(false); toggleSearch(); }} variant="ghost" className="mt-2 text-slate-300 hover:bg-white/5 hover:text-white justify-start px-4">
                <Search className="h-4 w-4 mr-2" />
                Buscar
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
"""

with open('components/sections/site-header.tsx', 'w', encoding='utf-8') as f:
    f.write(new_code)
