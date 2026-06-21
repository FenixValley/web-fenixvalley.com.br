# Handoff — Fênix Valley Portal

**Data:** 2026-06-09
**Branch ativo:** `develop`
**Repositório:** https://github.com/FenixValley/web-fenixvalley.com.br

---

## O que foi feito nesta sessão

### PR #17 → #18 (mergeado em `main`)

O PR original (#17, autor: miguelmoraes-tech) foi revisado, corrigido e reaberto como #18. Correções aplicadas:

- Removido `projeto.tar.gz` (artefato binário de 2 MB)
- Removido `"use client"` desnecessário em `ecosystem-section.tsx`
- Cores hardcoded na `opportunities-table.tsx` migradas para tokens do design system (`text-muted-foreground`, `text-foreground`, `bg-card/60`, `border-border`)
- Acentuação corrigida nos dados de `programs`: Pré-aceleração, Inovação aberta, Residência tecnológica
- EOL adicionado ao final dos arquivos modificados

### Rebase `develop` ← `main`

O branch `develop` estava à frente de `main` com um commit mais rico (`1e96c72`). Após o merge do PR #18, foi feito rebase com resolução manual de conflitos. Decisões tomadas:

| Arquivo | Versão escolhida | Motivo |
|---|---|---|
| `site-header.tsx` | `develop` | ThemeToggle + dropdowns CSS, mais limpo |
| `ecosystem-section.tsx` | `develop` | Mapa vivo com `ecosystemActors` e `ecosystemMapLayers` |
| `programs-section.tsx` | `develop` | Layout 2 colunas com steps e links por programa |
| `opportunities-table.tsx` | Merge (tokens de `main`, estrutura de `develop`) | Preservar design tokens corretos |
| `app/page.tsx` | `develop` | Ordem: Hero → Audience → Ecosystem → Programs → Opportunities → Content → Join |
| `globals.css` | Merge (ambos) | Preservar estilos de `theme-light` para site-header do `develop` |

### Issues comentados

- **#1** e **#9** comentados com link para o PR #18 mergeado — mantidos abertos para continuar implementação.

---

## Estado atual da home (`develop`)

Seções na ordem de renderização:

1. `HeroSection` — slogan principal, CTAs
2. `AudienceSection` — 4 jornadas de público (empreender, inovar, formar, apoiar)
3. `EcosystemSection` — mapa vivo com atores + 6 pilares
4. `ProgramsSection` — 3 programas com steps (Mapear → Validar → Conectar → Acelerar)
5. `OpportunitiesSection` — tabela filtrada com badges
6. `ContentCommunitySection` — trilhas de conteúdo + parceiros
7. `JoinSection` — formulário de entrada + código de colaboração

---

## Design aprovado para implementação (Epic #1)

### Animações (aprovado)

Três primitivos em `components/ui/motion.tsx`:

- **`<FadeIn>`** — `motion.div` com `initial={{ opacity: 0, y: 16 }}`, `whileInView={{ opacity: 1, y: 0 }}`, `viewport={{ once: true, margin: "-80px" }}`
- **`<Stagger>`** — container que dispara `staggerChildren: 0.08` ao entrar no viewport
- **`<StaggerItem>`** — filho de `<Stagger>`, aplica o mesmo fade+slide por card

Timing compartilhado: `{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }`

`prefers-reduced-motion`: verificado via `useReducedMotion()` — sem animação se preferência ativa.

Aplicação por seção:
- Hero: título + subtítulo → `<FadeIn>`
- Ecossistema: header → `<FadeIn>`, grid de cards → `<Stagger>`
- Programas: header → `<FadeIn>`, lista → `<Stagger>`
- Oportunidades: header → `<FadeIn>`
- Audiência: cards → `<Stagger>`
- Join/Conteúdo: header → `<FadeIn>`

### CTA Vídeo Institucional (aprovado)

- Botão ghost com ícone `▶` no `HeroSection`
- Abre `<Dialog>` do shadcn/ui com iframe YouTube em aspect 16:9
- URL via `NEXT_PUBLIC_HERO_VIDEO_URL` — botão oculto se vazio
- Placeholder dev: `https://www.youtube.com/embed/dQw4w9WgXcQ`

### Lighthouse (pendente aprovação)

> Seção ainda não discutida — retomar aqui.

Meta: verde em Acessibilidade e Performance (críticos apenas).
Itens prováveis: `alt` texts, contraste, Next.js Image otimização, `font-display`.

---

## Próximos passos

### Epic #1 — Design system e Home pública

- [ ] Criar `components/ui/motion.tsx` com `<FadeIn>`, `<Stagger>`, `<StaggerItem>`
- [ ] Aplicar animações nas seções listadas acima
- [ ] Adicionar botão + modal de vídeo no `HeroSection`
- [ ] Rodar Lighthouse e corrigir problemas críticos de acessibilidade e performance
- [ ] Fechar issue #1

### Epic #9 — Programas do Fênix Valley

- [ ] Páginas dedicadas por programa (`/programas/[slug]`)
- [ ] Fluxo de inscrição (form + persistência — ainda a definir: banco, KV, Google Forms?)
- [ ] Painel admin para abrir/fechar inscrições
- [ ] Fechar issue #9

---

## Arquitetura atual

```
app/
  api/
    leads/route.ts          ← POST de leads (faca-parte)
    opportunities/route.ts  ← GET de oportunidades
  faca-parte/page.tsx
  globals.css               ← tokens + classes utilitárias (surface-panel, light-band, warm-band)
  layout.tsx
  page.tsx                  ← home page

components/
  sections/                 ← todas as seções da home
  ui/                       ← shadcn/ui: button, badge, card, input, table, textarea
  theme-toggle.tsx

data/
  ecosystem.ts              ← pillars, programs, metrics, audienceJourneys, ecosystemMapLayers...
  opportunities.ts
```

**Stack:** Next.js (App Router) · TypeScript · Tailwind CSS · shadcn/ui · motion/react · @tanstack/react-query · @tanstack/react-table · Cloudflare (deploy via OpenNext)

---

## Variáveis de ambiente

| Variável | Uso | Obrigatória |
|---|---|---|
| `NEXT_PUBLIC_HERO_VIDEO_URL` | URL do vídeo institucional no hero | Não (botão oculto se vazio) |
