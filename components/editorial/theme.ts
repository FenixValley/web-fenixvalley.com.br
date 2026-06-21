import type { CSSProperties } from "react";

// Tokens do tema editorial: branco + azul forte, tons claros.
// Aplicado por página via EditorialShell (escopo local, não global) durante a
// migração — quando todas as rotas estiverem migradas, vira o tema padrão.
export const editorialTheme = {
  paper: "#ffffff",
  surface: "#f2f5ff",
  ink: "#0a1020",
  muted: "#5a647e",
  accent: "#1b3bff",
  accentSoft: "#e6ebff",
  line: "rgba(10,16,32,0.10)"
} as const;

export const editorialThemeStyle: CSSProperties = {
  "--fx-paper": editorialTheme.paper,
  "--fx-surface": editorialTheme.surface,
  "--fx-ink": editorialTheme.ink,
  "--fx-muted": editorialTheme.muted,
  "--fx-accent": editorialTheme.accent,
  "--fx-accent-soft": editorialTheme.accentSoft,
  "--fx-line": editorialTheme.line,
  background: "var(--fx-paper)",
  color: "var(--fx-ink)"
} as CSSProperties;

export const editorialNav = [
  { href: "/mapa", label: "Mapa" },
  { href: "/programas", label: "Programas" },
  { href: "/oportunidades", label: "Oportunidades" },
  { href: "/eventos", label: "Eventos" },
  { href: "/sobre", label: "Sobre" }
] as const;
