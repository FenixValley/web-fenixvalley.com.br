# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Projeto

Portal do Fênix Valley — ecossistema de inovação, tecnologia e empreendedorismo de Betim. Site público em Next.js (App Router) com deploy em Cloudflare Workers via OpenNext. Conteúdo e UI em português brasileiro (pt-BR).

## Comandos

```bash
corepack enable && yarn install   # setup (Yarn Berry 4, nodeLinker: node-modules)
yarn dev                          # dev server em http://127.0.0.1:3000
yarn lint                         # next lint
yarn build                        # next build
yarn preview                      # build OpenNext + preview no runtime Cloudflare
yarn deploy                       # build OpenNext + deploy Cloudflare
yarn cf-typegen                   # regenera cloudflare-env.d.ts a partir do wrangler.jsonc
yarn test                         # vitest (lógica pura em lib/**/*.test.ts)
yarn db:generate                  # gera migration a partir de db/schema.ts
yarn db:migrate:local             # aplica migrations no D1 local (.wrangler/state)
yarn db:migrate:remote            # aplica migrations no D1 de produção
yarn seed:admin                   # cria gestor (ADMIN_EMAIL/ADMIN_PASSWORD; --remote p/ produção)
```

## Stack

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · shadcn/ui (componentes copiados em `components/ui/`) · motion/react · GSAP · react-hook-form + zod · TanStack Query/Table · Cloudflare via `@opennextjs/cloudflare` (`wrangler.jsonc`, `open-next.config.ts`).

## Arquitetura

- `app/page.tsx` — home composta por seções na ordem: Hero → Audience → Ecosystem → Programs → Opportunities → ContentCommunity → Join. Seções vivem em `components/sections/`.
- `data/ecosystem.ts` — conteúdo estático da home (pilares, programas, métricas, jornadas). `data/opportunities.ts` é só o `initialData` da tabela da home; a fonte viva é o banco via `/api/opportunities`.
- **Banco (Cloudflare D1 + Drizzle)** — schema em `db/schema.ts` (users, volunteers, actors, opportunities, leads), migrations em `db/migrations/` aplicadas com wrangler. Acesso via `getDb()` de `lib/db.ts` (usa `getCloudflareContext()` — funciona no `next dev` graças ao `initOpenNextCloudflareForDev()`). Páginas que consultam o banco precisam de `export const dynamic = "force-dynamic"`.
- **Auth (Auth.js v5)** — Credentials provider em `lib/auth.ts` (PBKDF2 via `lib/password.ts` — bcrypt não roda em Workers); config edge-safe separada em `lib/auth-config.ts` usada pelo `middleware.ts` que protege `/admin/*`. Sessão JWT com claim `role`.
- **Admin** — `app/admin/login` (público) e `app/admin/(painel)/` (layout com guard + sidebar). Mutações em `app/admin/(painel)/actions.ts` (server actions com `requireAdmin()`); formulários client com `useActionState`.
- **Mapa** — `/mapa` com MapLibre GL (tiles OpenFreeMap, sem API key), client-only via `next/dynamic` em `components/map/`. Mostra apenas atores `approved` de `/api/actors`; cadastro público entra como `pending`.
- APIs públicas em `app/api/` (leads, volunteers, actors, opportunities) validam com schemas zod de `lib/schemas.ts` e persistem no D1.
- `components/providers/providers.tsx` — QueryClientProvider (client component); `app/layout.tsx` injeta script inline de tema antes da hidratação.

### Fluxo de moderação

Voluntários (`/voluntarie-se`) e atores do mapa (dialog em `/mapa`) entram como `pending` e só aparecem publicamente após aprovação no admin. Oportunidades têm `published/archived`.

### Tema (dark padrão / light opcional)

O tema light é aplicado via classe `theme-light` no `<html>`, persistida em `localStorage` (`fenix-theme`) e alternada por `components/theme-toggle.tsx`. **Não há dark: variants do Tailwind** — `app/globals.css` faz override de classes utilitárias dentro de `html.theme-light` (ex.: remapeia `text-white`, `text-slate-300`). Classes utilitárias próprias do design system: `surface-panel`, `light-band`, `warm-band`, `section-shell`, `brand-grid`.

Prefira tokens do design system (`text-muted-foreground`, `text-foreground`, `bg-card/60`, `border-border`) a cores hardcoded — decisão registrada em PR #18.

### Convenções

- Componentes de seção são server components por padrão; só adicione `"use client"` quando houver interatividade ou hooks.
- Animações usam `motion/react` (não `framer-motion`) e devem respeitar `prefers-reduced-motion` (via `useReducedMotion()`).
- Arquivos terminam com newline (EOL) — exigido em review.
- Acentuação correta em conteúdo pt-BR nos arquivos de `data/`.

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `NEXT_PUBLIC_HERO_VIDEO_URL` | URL do vídeo institucional no hero (botão oculto se vazia) |
| `AUTH_SECRET` | Assinatura JWT do Auth.js — em `.env.local` (next dev) e secret do Worker em produção |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Só para `yarn seed:admin` (não vão para o runtime) |

Variáveis locais para o runtime Cloudflare vão em `.dev.vars` (gitignored). Deploy: criar o banco com `wrangler d1 create fenixvalley-db`, colar o `database_id` real no `wrangler.jsonc`, `yarn db:migrate:remote`, `wrangler secret put AUTH_SECRET` e `yarn seed:admin --remote`.

## Planejamento e estado do trabalho

- `docs/handoff.md` — handoff da última sessão com decisões de design aprovadas e próximos passos (Epics #1 e #9).
- `docs/backlog/issues/` — backlog completo do produto (16 épicos).
- `TODO.md` — checklist da home.
