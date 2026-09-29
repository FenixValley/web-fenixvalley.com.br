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
  // Remapeia os tokens shadcn (HSL triplets, usados via hsl(var(--token))) para a
  // paleta editorial dentro do escopo da casca — assim Input/Textarea/Button/Dialog,
  // Badge e qualquer text-foreground/bg-card/border-border herdam o tema white+azul.
  "--background": "0 0% 100%",
  "--foreground": "222 53% 8%",
  "--card": "0 0% 100%",
  "--card-foreground": "222 53% 8%",
  "--popover": "0 0% 100%",
  "--popover-foreground": "222 53% 8%",
  "--primary": "230 100% 55%",
  "--primary-foreground": "0 0% 100%",
  "--secondary": "230 100% 55%",
  "--secondary-foreground": "0 0% 100%",
  "--muted": "226 100% 97%",
  "--muted-foreground": "222 17% 42%",
  "--accent": "226 100% 96%",
  "--accent-foreground": "222 53% 8%",
  "--border": "222 24% 90%",
  "--input": "222 24% 90%",
  "--ring": "230 100% 55%",
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
