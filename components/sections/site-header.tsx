"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ExternalLink, Menu, Search, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";


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
    title: "Sobre o Movimento",
    description: "Conheça o propósito, a missão e a visão do Fênix Valley.",
    category: "Geral",
    href: "/sobre"
  },
  {
    title: "Propósito, Missão e Visão",
    description: "O que impulsiona o ecossistema de Betim.",
    category: "Geral",
    href: "/sobre"
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
      {/* ── main header bar ── */}
      <header
        className="relative z-40 border-b transition-colors"
        style={{
          borderColor: "rgba(10, 16, 32, 0.08)",
          background: "rgba(255, 255, 255, 0.68)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)"
        }}
      >
        <div className="section-shell flex h-16 items-center justify-between gap-4">
          {/* left nav — desktop */}
          <nav className="hidden flex-1 items-center gap-6 text-sm font-semibold text-[#5a647e] lg:flex">
            {leftNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[#0a1020]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* hamburger — mobile */}
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="flex h-9 w-9 items-center justify-center rounded-md text-[#0a1020] transition-colors hover:bg-slate-100 lg:hidden"
            aria-label="Menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* center logo */}
          <Link
            href="/"
            className="flex shrink-0 items-center transition-transform duration-200 hover:scale-105"
            aria-label="Fênix Valley"
          >
            <Image
              src="/logo-simbolo.png"
              alt="Fênix Valley"
              width={44}
              height={44}
              priority
              className="h-10 w-10 object-contain"
            />
          </Link>

          {/* right nav — desktop */}
          <nav className="hidden flex-1 items-center justify-end gap-5 text-sm font-semibold text-[#5a647e] lg:flex">
            {rightNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={
                  item.highlight
                    ? "rounded-full bg-[#1b3bff] px-4 py-1.5 text-white shadow-sm transition-all hover:bg-[#102bcc]"
                    : "transition-colors hover:text-[#0a1020]"
                }
              >
                {item.label}
              </Link>
            ))}

            {/* search button in header bar */}
            <button
              onClick={toggleSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(10,16,32,0.12)] bg-white/80 text-[#5a647e] transition-colors hover:bg-white hover:text-[#0a1020] shadow-sm"
              aria-label="Buscar no ecossistema"
              title="Buscar no ecossistema (Ctrl+K)"
            >
              <Search className="h-4 w-4" />
            </button>
          </nav>

          {/* search trigger on mobile */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={toggleSearch}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(10,16,32,0.12)] bg-white/80 text-[#5a647e] transition-colors hover:bg-white hover:text-[#0a1020]"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* ── command palette search modal ── */}
      <AnimatePresence>
        {searchOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center px-4 pt-16 sm:pt-24">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSearchOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.2 }}
              className="relative z-10 w-full max-w-xl rounded-2xl border border-[rgba(10,16,32,0.12)] bg-white p-4 shadow-2xl"
            >
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#5a647e]" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchVal}
                  onChange={handleSearchChange}
                  placeholder="Buscar páginas, atalhos, startups e eventos..."
                  className="h-12 w-full rounded-xl border border-[rgba(10,16,32,0.12)] bg-slate-50 pl-12 pr-10 text-sm text-[#0a1020] outline-none transition-all placeholder:text-[#5a647e] focus:border-[#1b3bff] focus:bg-white focus:ring-2 focus:ring-[#1b3bff]/15"
                />
                <button
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchVal("");
                  }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {searchVal.trim() && (
                <div className="mt-3 max-h-[380px] space-y-3 overflow-y-auto pr-1">
                  {/* Resultados de startups */}
                  {liveResults.actors.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#1b3bff]">
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
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                          >
                            <div>
                              <p className="font-semibold text-sm text-[#0a1020]">{actor.name}</p>
                              <p className="text-xs text-[#5a647e]">{actor.segment}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#5a647e]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Resultados de eventos */}
                  {liveResults.events.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-sky-600">
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
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                          >
                            <div>
                              <p className="font-semibold text-sm text-[#0a1020]">{event.title}</p>
                              <p className="text-xs text-[#5a647e]">{event.category}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#5a647e]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Oportunidades */}
                  {liveResults.opportunities.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        Oportunidades
                      </div>
                      <div className="mt-1 space-y-1">
                        {liveResults.opportunities.map((opp) => (
                          <button
                            key={`opp-${opp.id}`}
                            onClick={() => {
                              setSearchOpen(false);
                              setSearchVal("");
                              router.push(opp.link || "/oportunidades");
                            }}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                          >
                            <div>
                              <p className="font-semibold text-sm text-[#0a1020]">{opp.title}</p>
                              <p className="text-xs text-[#5a647e]">{opp.type}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#5a647e]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Conteúdos */}
                  {liveResults.contents.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-emerald-600">
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
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                          >
                            <div>
                              <p className="font-semibold text-sm text-[#0a1020]">{content.title}</p>
                              <p className="text-xs text-[#5a647e]">{content.category}</p>
                            </div>
                            <ArrowRight className="h-4 w-4 shrink-0 text-[#5a647e]" />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Páginas e atalhos de navegação */}
                  {filteredItems.length > 0 && (
                    <div>
                      <div className="px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Páginas e atalhos
                      </div>
                      <div className="mt-1 space-y-1">
                        {filteredItems.map((item, index) => (
                          <button
                            key={index}
                            onClick={() => handleItemClick(item)}
                            className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition-colors hover:bg-slate-50"
                          >
                            <div className="flex-1 pr-4">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-[#0a1020]">{item.title}</span>
                                <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-[#1b3bff]">
                                  {item.category}
                                </span>
                              </div>
                              <p className="mt-0.5 line-clamp-1 text-xs text-[#5a647e]">{item.description}</p>
                            </div>
                            {item.target === "_blank" ? (
                              <ExternalLink className="h-4 w-4 shrink-0 text-[#5a647e]" />
                            ) : (
                              <ArrowRight className="h-4 w-4 shrink-0 text-[#5a647e]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {filteredItems.length === 0 &&
                    liveResults.actors.length === 0 &&
                    liveResults.events.length === 0 &&
                    liveResults.opportunities.length === 0 &&
                    liveResults.contents.length === 0 && (
                      <div className="px-3 py-8 text-center text-sm font-medium text-[#5a647e]">
                        {isSearching
                          ? "Buscando no ecossistema..."
                          : `Nenhum resultado encontrado para "${searchVal}"`}
                      </div>
                    )}
                </div>
              )}
            </motion.div>
          </div>
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
            className="overflow-hidden border-b lg:hidden"
            style={{
              borderColor: "rgba(10, 16, 32, 0.08)",
              background: "rgba(255, 255, 255, 0.85)",
              backdropFilter: "blur(24px) saturate(180%)",
              WebkitBackdropFilter: "blur(24px) saturate(180%)"
            }}
          >
            <nav className="section-shell flex flex-col gap-1 py-4">
              {leftNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold text-[#5a647e] transition-colors hover:bg-slate-50 hover:text-[#0a1020]"
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
                    item.highlight
                      ? "rounded-lg bg-[#1b3bff] px-4 py-2.5 text-center text-sm font-semibold text-white transition-colors hover:bg-[#102bcc]"
                      : "rounded-lg px-4 py-2.5 text-sm font-semibold text-[#5a647e] transition-colors hover:bg-slate-50 hover:text-[#0a1020]"
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
