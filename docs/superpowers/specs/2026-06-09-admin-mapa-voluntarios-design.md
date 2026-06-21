# Design — Área administrativa, Mapa do ecossistema e Inscrição de voluntários

**Data:** 2026-06-09
**Escopo:** Épico #4 (banco, auth, admin), épico #5 (mapa — primeira fase), épicos #6/#14 (inscrição de voluntário da comunidade)
**Decisões do usuário:** Cloudflare D1 + Drizzle · Auth.js (auth completa) · Mapa geográfico real · Escopo MVP

## Contexto

O portal hoje é estático (dados em `data/*.ts`), com dois endpoints sem persistência. O deploy é Cloudflare Workers via OpenNext (`initOpenNextCloudflareForDev()` já habilita bindings no `next dev`). Esta rodada introduz persistência, autenticação e as primeiras superfícies dinâmicas.

## 1. Dados — D1 + Drizzle

- Binding `DB` (d1_databases) no `wrangler.jsonc`.
- `db/schema.ts` (drizzle-orm/sqlite) com tabelas:
  - `users` — id, name, email (unique), passwordHash, role (`admin`), createdAt. Hash PBKDF2-SHA256 via WebCrypto (bcrypt não roda em Workers); formato `pbkdf2$<iterations>$<saltB64>$<hashB64>`.
  - `volunteers` — id, name, email, phone (opcional), area, availability, motivation, status (`pending|approved|rejected`), createdAt.
  - `actors` — id, name, type (`startup|empresa|universidade|escola-tecnica|coworking|laboratorio|hub|investidor|aceleradora|incubadora|poder-publico|comunidade`), segment, neighborhood, description, site (opcional), lat, lng, status (`pending|approved|rejected`), createdAt.
  - `opportunities` — id, title, category, deadline (texto/data), audience, link (opcional), status (`published|archived`), createdAt.
  - `leads` — id, name, email, profile, objective, createdAt (formulário Faça Parte atual passa a persistir).
- Migrations geradas com drizzle-kit em `db/migrations/`, aplicadas com `wrangler d1 migrations apply` (local e remoto).
- Seed: migration/SQL com atores iniciais (derivados de `data/ecosystem.ts`) e oportunidades de `data/opportunities.ts`.
- Acesso: helper `db()` usando `getCloudflareContext().env.DB` + `drizzle()`.
- Script `yarn seed:admin` — gera hash do `ADMIN_PASSWORD` e insere/atualiza o usuário `ADMIN_EMAIL` via `wrangler d1 execute`.

## 2. Autenticação — Auth.js v5

- Credentials provider: email + senha conferidos contra `users` (PBKDF2).
- Sessão JWT (sem adapter de banco para sessão) com claim `role`.
- `middleware.ts` protege `/admin/*` exceto `/admin/login`; sem sessão → redirect para login.
- `AUTH_SECRET` em `.dev.vars`/secrets do Worker.
- Google OAuth fica para rodada futura (épico #16).

## 3. Área administrativa — `/admin`

Layout próprio (sidebar + header) independente do site público.

| Rota | Função |
|---|---|
| `/admin/login` | Formulário de login |
| `/admin` | Dashboard com contadores: voluntários pendentes, atores pendentes, oportunidades publicadas, leads |
| `/admin/voluntarios` | Tabela com aprovar/rejeitar |
| `/admin/atores` | Tabela com aprovar/rejeitar + criar/editar (alimenta o mapa) |
| `/admin/oportunidades` | CRUD com publicar/arquivar |
| `/admin/leads` | Listagem somente leitura |

- Mutações via Server Actions com `revalidatePath`.
- Listagens com estados de vazio/erro; critérios do épico #4 (aprovar/rejeitar/editar, permissões, loading/erro/sucesso).

## 4. Mapa — `/mapa`

- MapLibre GL JS com estilo gratuito do OpenFreeMap (sem API key), centrado em Betim (-19.97, -44.20), client component com `dynamic import` (sem SSR).
- Pins somente de atores `approved`, via `GET /api/actors` (filtros `type` e `q` por nome/bairro).
- UI: filtros por tipo (badges), busca, painel lateral com lista; clicar no pin ou item abre card de detalhe (nome, tipo, segmento, bairro, descrição, site).
- Mobile: lista colapsável sob o mapa.
- CTA "Cadastre sua organização" → formulário público (`POST /api/actors`) que entra como `pending`.
- Header do site ganha link "Mapa".
- Fora desta fase: página individual por ator, botão de conexão, oportunidades relacionadas.

## 5. Voluntários — `/voluntarie-se`

- Página pública com formulário (react-hook-form + zod, padrão do JoinForm): nome, email, telefone (opcional), área de atuação (select), disponibilidade (select), motivação (textarea), consentimento.
- `POST /api/volunteers` valida com zod e insere como `pending`.
- Links: seção Join da home e header.

## Variáveis de ambiente

| Variável | Uso |
|---|---|
| `AUTH_SECRET` | Assinatura JWT do Auth.js |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Usados apenas pelo `yarn seed:admin` |
| `NEXT_PUBLIC_HERO_VIDEO_URL` | (existente) vídeo do hero |

## Critérios de aceite

1. `yarn build` passa; app roda em `next dev` com D1 local.
2. Voluntário consegue se inscrever e aparece como pendente no admin.
3. Gestor faz login, aprova/rejeita voluntários e atores, gerencia oportunidades.
4. `/admin/*` inacessível sem login.
5. `/mapa` mostra pins reais em Betim com filtro por tipo e busca; cadastro público entra como pendente e não aparece no mapa até aprovação.
6. Formulário Faça Parte persiste leads.

## Fora de escopo

Páginas individuais de ator, solicitações de conexão, Google OAuth, upload de imagem/logo, favoritos/alertas, demais épicos (#7–#16).
