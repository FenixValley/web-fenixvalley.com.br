# Handoff — Fênix Valley Portal

**Data:** 2026-09-17
**Branch ativo:** `main`
**Repositório:** https://github.com/FenixValley/web-fenixvalley.com.br

---

## Sessão de Finalização — Fechamento das 7 Issues do GitHub

Todas as 7 issues pendentes foram implementadas e verificadas com sucesso:

1. **Issue #28 (Bug):** `yarn seed:admin falha no Windows (spawnSync yarn ENOENT)`
   - Corrigido em `scripts/seed-admin.mjs` invocando `yarn.cmd` dinamicamente quando `process.platform === "win32"`.
2. **Issue #29 (Bug):** `StatusBadge usa rótulos no feminino para entidades masculinas`
   - Adicionado parâmetro `gender?: "m" | "f"` em `StatusBadge` com vocabulário contextual ("Publicado / Publicada", "Rascunho", "Arquivado / Arquivada") nos módulos do admin.
3. **Issue #30 (Bug):** `Erro de hidratação na home (BrandMotion)`
   - Eliminado descasamento entre SSR e cliente removendo a ramificação ternária no render e centralizando a preferência do usuário no `<MotionConfig reducedMotion="user">` no `Providers`.
4. **Issue #31 (Enhancement):** `Acessibilidade: widget VLibras, skip link e reduced-motion consistente`
   - Integrado o widget oficial do VLibras via `components/accessibility/vlibras.tsx` (SSR safe).
   - Adicionado Skip Link acessível para `#main-content` no `app/layout.tsx`.
   - Adicionado suporte padronizado para `@media (prefers-reduced-motion: reduce)` e foco visível `:focus-visible` em `app/globals.css`.
5. **Issue #26 (Enhancement):** `Migrar cores hardcoded para os tokens do design system`
   - Substituição sistemática de cores literais Tailwind (`text-white`, `text-slate-*`, `border-white/*`, etc.) por variáveis semânticas do tema (`text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, etc.) em páginas e componentes da aplicação.
6. **Issue #16 (Epic):** `[Epic] Conteúdos, newsletter e comunidade`
   - Catálogo de artigos, editais e cases em `/conteudos` com filtros por tipo e pesquisa integrada.
   - Páginas de leitura dinâmica em `/conteudos/[slug]` com tempo estimado de leitura, SEO/OpenGraph e botões de compartilhamento social (WhatsApp, LinkedIn, X, copiar link).
   - Página de comunidade oficial em `/comunidade` com link direto para o WhatsApp oficial e diretrizes do ecossistema.
7. **Issue #15 (Epic):** `[Epic] Área do membro e busca inteligente`
   - Nova tabela D1 `user_favorites` com migração aplicada (`0013_mute_darkstar.sql`).
   - Rotas de autenticação e sessão para membros (`/login`, `/cadastro`, `/api/auth/register`).
   - Painel do membro em `/membro` exibindo perfil, histórico de voluntariado, inscrições em programas, propostas de desafios e lista de itens favoritados com remoção dinâmica.
   - Botão de favoritar interativo (`components/ui/favorite-button.tsx`) em desafios e itens do ecossistema.
   - Busca global agregada em `/api/search` conectada à modal do cabeçalho com debounce e categorização em tempo real (atores, eventos, oportunidades, desafios, parceiros e conteúdos).


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
