# Admin + Mapa + Voluntários — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Persistência em Cloudflare D1, área administrativa autenticada (`/admin`), mapa geográfico do ecossistema (`/mapa`) e inscrição pública de voluntários (`/voluntarie-se`).

**Architecture:** D1 + Drizzle como camada de dados (binding `DB`, acessado via `getCloudflareContext()`); Auth.js v5 com Credentials provider e sessão JWT protegendo `/admin` via middleware; admin com Server Components + Server Actions; mapa com MapLibre GL (client-only) lendo `/api/actors`; formulários públicos seguem o padrão existente (react-hook-form + zod → route handler).

**Tech Stack:** Next.js 15 App Router · Drizzle ORM/Kit · Cloudflare D1 · next-auth@5 (beta) · MapLibre GL · zod · vitest (novo, só para lógica pura)

**Spec:** `docs/superpowers/specs/2026-06-09-admin-mapa-voluntarios-design.md`

---

### Task 1: Fundação D1 + Drizzle

**Files:**
- Modify: `package.json` (deps + scripts)
- Modify: `wrangler.jsonc` (binding D1)
- Create: `drizzle.config.ts`

- [ ] **Step 1: Instalar dependências**

```bash
yarn add drizzle-orm next-auth@beta maplibre-gl
yarn add -D drizzle-kit vitest
```

- [ ] **Step 2: Adicionar binding D1 ao `wrangler.jsonc`** (após o bloco `"services"`):

```jsonc
  "d1_databases": [
    {
      "binding": "DB",
      "database_name": "fenixvalley-db",
      "database_id": "00000000-0000-0000-0000-000000000000",
      "migrations_dir": "db/migrations"
    }
  ],
```

Nota: o `database_id` placeholder funciona para dev local. Antes do deploy, rodar `yarn wrangler d1 create fenixvalley-db` e colar o id real.

- [ ] **Step 3: Criar `drizzle.config.ts`**

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/migrations",
  dialect: "sqlite"
});
```

- [ ] **Step 4: Adicionar scripts ao `package.json`**

```json
    "test": "vitest run",
    "db:generate": "drizzle-kit generate",
    "db:migrate:local": "wrangler d1 migrations apply fenixvalley-db --local",
    "db:migrate:remote": "wrangler d1 migrations apply fenixvalley-db --remote",
    "seed:admin": "node scripts/seed-admin.mjs"
```

- [ ] **Step 5: Regenerar tipos do Cloudflare e verificar**

Run: `yarn cf-typegen && grep -n "DB: D1Database" cloudflare-env.d.ts`
Expected: linha com `DB: D1Database;`

- [ ] **Step 6: Commit**

```bash
git add package.json yarn.lock wrangler.jsonc drizzle.config.ts cloudflare-env.d.ts
git commit -m "chore: configura D1, drizzle e dependencias do admin/mapa"
```

---

### Task 2: Schema do banco + migrations + seed

**Files:**
- Create: `db/schema.ts`
- Create: `db/migrations/` (gerado) + `db/migrations/0001_seed.sql`

- [ ] **Step 1: Criar `db/schema.ts`**

```ts
import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("admin"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const volunteers = sqliteTable("volunteers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  area: text("area").notNull(),
  availability: text("availability").notNull(),
  motivation: text("motivation").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const actors = sqliteTable("actors", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  type: text("type").notNull(),
  segment: text("segment").notNull(),
  neighborhood: text("neighborhood").notNull(),
  description: text("description").notNull(),
  site: text("site"),
  lat: real("lat").notNull(),
  lng: real("lng").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const opportunities = sqliteTable("opportunities", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  stage: text("stage").notNull(),
  audience: text("audience").notNull(),
  date: text("date").notNull(),
  owner: text("owner").notNull(),
  status: text("status").notNull().default("published"),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});

export const leads = sqliteTable("leads", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  profile: text("profile").notNull(),
  objective: text("objective").notNull(),
  createdAt: text("created_at").notNull().default(sql`(datetime('now'))`)
});
```

- [ ] **Step 2: Gerar migration**

Run: `yarn db:generate`
Expected: arquivo `db/migrations/0000_*.sql` com `CREATE TABLE` das 5 tabelas.

- [ ] **Step 3: Criar `db/migrations/0001_seed.sql`** (oportunidades atuais + atores institucionais de Betim com coordenadas aproximadas do centro, editáveis no admin):

```sql
INSERT INTO opportunities (title, type, stage, audience, date, owner, status) VALUES
('Rodada de Ideias Betim Tech', 'Meetup', 'Aberto', 'Fundadores, estudantes e profissionais', '2026-06-12', 'Fênix Valley', 'published'),
('Mapa de Startups e Soluções Locais', 'Comunidade', 'Aberto', 'Startups, PMEs e autônomos tech', '2026-06-20', 'Comunidade', 'published'),
('Mentorias para MVP e validação', 'Mentoria', 'Curadoria', 'Empreendedores em fase inicial', '2026-07-03', 'Rede de mentores', 'published'),
('Conexão universidade, empresa e talentos', 'Programa', 'Em breve', 'Universidades, empresas e estudantes', '2026-07-18', 'Parceiros locais', 'published'),
('Demo night para investidores-anjo', 'Capital', 'Em breve', 'Startups com tração inicial', '2026-08-01', 'Fênix Valley', 'published');

INSERT INTO actors (name, type, segment, neighborhood, description, site, lat, lng, status) VALUES
('Fênix Valley', 'comunidade', 'Ecossistema de inovação', 'Centro', 'Comunidade que conecta startups, universidades, empresas e talentos de Betim. Ponto de referência aproximado.', 'https://fenixvalley.com.br', -19.9678, -44.1987, 'approved'),
('PUC Minas — Betim', 'universidade', 'Ensino superior', 'Angola', 'Campus da PUC Minas em Betim, com cursos de tecnologia e parcerias acadêmicas. Localização aproximada.', NULL, -19.9540, -44.1760, 'approved'),
('SENAI Betim', 'escola-tecnica', 'Formação técnica', 'Centro', 'Unidade do SENAI com formação técnica e profissionalizante. Localização aproximada.', NULL, -19.9700, -44.2030, 'approved'),
('Prefeitura de Betim', 'poder-publico', 'Gestão pública', 'Centro', 'Poder público municipal, interlocutor de políticas de inovação. Localização aproximada.', NULL, -19.9668, -44.1988, 'approved');
```

- [ ] **Step 4: Aplicar migrations no banco local**

Run: `yarn db:migrate:local`
Expected: `2 migrations applied` (ou listagem 0000 e 0001 com ✓).

- [ ] **Step 5: Verificar dados**

Run: `yarn wrangler d1 execute fenixvalley-db --local --command "SELECT count(*) AS c FROM actors"`
Expected: `c = 4`

- [ ] **Step 6: Commit**

```bash
git add db/
git commit -m "feat: schema D1 com migrations e seed inicial"
```

---

### Task 3: Hash de senha (PBKDF2/WebCrypto) com testes

**Files:**
- Create: `lib/password.ts`
- Create: `lib/password.test.ts`
- Create: `vitest.config.ts`

- [ ] **Step 1: Criar `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["lib/**/*.test.ts"]
  }
});
```

- [ ] **Step 2: Escrever o teste que falha — `lib/password.test.ts`**

```ts
import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifica a senha correta", async () => {
    const hash = await hashPassword("segredo-forte");
    expect(await verifyPassword("segredo-forte", hash)).toBe(true);
  });

  it("rejeita senha incorreta", async () => {
    const hash = await hashPassword("segredo-forte");
    expect(await verifyPassword("outra-senha", hash)).toBe(false);
  });

  it("gera salts diferentes a cada hash", async () => {
    expect(await hashPassword("x")).not.toBe(await hashPassword("x"));
  });

  it("rejeita hash malformado sem lançar", async () => {
    expect(await verifyPassword("x", "lixo")).toBe(false);
  });
});
```

- [ ] **Step 3: Rodar e ver falhar**

Run: `yarn test`
Expected: FAIL — `Cannot find module './password'` (ou equivalente).

- [ ] **Step 4: Implementar `lib/password.ts`**

```ts
const ITERATIONS = 100_000;

function toB64(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes));
}

function fromB64(value: string): Uint8Array {
  return Uint8Array.from(atob(value), (c) => c.charCodeAt(0));
}

async function deriveBits(password: string, salt: Uint8Array, iterations: number): Promise<Uint8Array> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"]
  );
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: salt as BufferSource, iterations },
    key,
    256
  );
  return new Uint8Array(bits);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await deriveBits(password, salt, ITERATIONS);
  return `pbkdf2$${ITERATIONS}$${toB64(salt)}$${toB64(hash)}`;
}

export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  try {
    const [scheme, iterationsRaw, saltB64, hashB64] = stored.split("$");
    if (scheme !== "pbkdf2") return false;
    const iterations = Number(iterationsRaw);
    if (!Number.isFinite(iterations) || iterations < 1) return false;
    const expected = fromB64(hashB64);
    const actual = await deriveBits(password, fromB64(saltB64), iterations);
    if (expected.length !== actual.length) return false;
    let diff = 0;
    for (let i = 0; i < expected.length; i++) diff |= expected[i] ^ actual[i];
    return diff === 0;
  } catch {
    return false;
  }
}
```

- [ ] **Step 5: Rodar e ver passar**

Run: `yarn test`
Expected: 4 passed.

- [ ] **Step 6: Commit**

```bash
git add lib/password.ts lib/password.test.ts vitest.config.ts
git commit -m "feat: hash de senha PBKDF2 compativel com Workers"
```

---

### Task 4: Helper de acesso ao banco

**Files:**
- Create: `lib/db.ts`

- [ ] **Step 1: Criar `lib/db.ts`**

```ts
import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
```

- [ ] **Step 2: Verificar tipos**

Run: `yarn tsc --noEmit 2>&1 | head -5`
Expected: sem erros novos (warnings pré-existentes ok).

- [ ] **Step 3: Commit**

```bash
git add lib/db.ts
git commit -m "feat: helper drizzle sobre binding D1"
```

---

### Task 5: Auth.js (login de gestores)

**Files:**
- Create: `lib/auth-config.ts`
- Create: `lib/auth.ts`
- Create: `types/next-auth.d.ts`
- Create: `app/api/auth/[...nextauth]/route.ts`
- Create: `middleware.ts`
- Create: `scripts/seed-admin.mjs`
- Create: `.dev.vars` (não commitado) e `.env.local` (não commitado)

- [ ] **Step 1: Criar `lib/auth-config.ts`** (edge-safe, usado pelo middleware — sem provider/DB):

```ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true,
  pages: { signIn: "/admin/login" },
  session: { strategy: "jwt" },
  providers: [],
  callbacks: {
    jwt({ token, user }) {
      if (user && "role" in user) token.role = user.role as string;
      return token;
    },
    session({ session, token }) {
      if (token.role && session.user) session.user.role = token.role;
      return session;
    }
  }
} satisfies NextAuthConfig;
```

- [ ] **Step 2: Criar `types/next-auth.d.ts`**

```ts
import type { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & { role?: string };
  }
  interface User {
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string;
  }
}
```

- [ ] **Step 3: Criar `lib/auth.ts`**

```ts
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { users } from "@/db/schema";
import { authConfig } from "@/lib/auth-config";
import { getDb } from "@/lib/db";
import { verifyPassword } from "@/lib/password";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1)
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) return null;
        const db = getDb();
        const user = await db.query.users.findFirst({
          where: eq(users.email, parsed.data.email)
        });
        if (!user) return null;
        const valid = await verifyPassword(parsed.data.password, user.passwordHash);
        if (!valid) return null;
        return { id: String(user.id), name: user.name, email: user.email, role: user.role };
      }
    })
  ]
});
```

- [ ] **Step 4: Criar `app/api/auth/[...nextauth]/route.ts`**

```ts
import { handlers } from "@/lib/auth";

export const { GET, POST } = handlers;
```

- [ ] **Step 5: Criar `middleware.ts`** (raiz do projeto):

```ts
import NextAuth from "next-auth";
import { authConfig } from "@/lib/auth-config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  if (!request.auth && !isLoginPage) {
    return Response.redirect(new URL("/admin/login", request.nextUrl));
  }
  if (request.auth && isLoginPage) {
    return Response.redirect(new URL("/admin", request.nextUrl));
  }
});

export const config = { matcher: ["/admin/:path*"] };
```

- [ ] **Step 6: Criar `scripts/seed-admin.mjs`**

```js
#!/usr/bin/env node
import { execFileSync } from "node:child_process";

const email = process.env.ADMIN_EMAIL;
const password = process.env.ADMIN_PASSWORD;
const name = process.env.ADMIN_NAME ?? "Gestor Fênix Valley";
const remote = process.argv.includes("--remote");

if (!email || !password) {
  console.error("Defina ADMIN_EMAIL e ADMIN_PASSWORD no ambiente.");
  process.exit(1);
}

const ITERATIONS = 100000;
const salt = crypto.getRandomValues(new Uint8Array(16));
const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(password),
  "PBKDF2",
  false,
  ["deriveBits"]
);
const bits = await crypto.subtle.deriveBits(
  { name: "PBKDF2", hash: "SHA-256", salt, iterations: ITERATIONS },
  key,
  256
);
const b64 = (bytes) => Buffer.from(bytes).toString("base64");
const hash = `pbkdf2$${ITERATIONS}$${b64(salt)}$${b64(new Uint8Array(bits))}`;

const escape = (value) => value.replaceAll("'", "''");
const sql = `INSERT INTO users (name, email, password_hash, role) VALUES ('${escape(name)}', '${escape(email)}', '${hash}', 'admin') ON CONFLICT(email) DO UPDATE SET password_hash = excluded.password_hash, name = excluded.name;`;

execFileSync(
  "yarn",
  ["wrangler", "d1", "execute", "fenixvalley-db", remote ? "--remote" : "--local", "--command", sql],
  { stdio: "inherit" }
);
console.log(`Gestor ${email} criado/atualizado (${remote ? "remote" : "local"}).`);
```

- [ ] **Step 7: Configurar segredos locais** (arquivos já devem estar no .gitignore — conferir):

`.dev.vars`:
```
AUTH_SECRET=dev-secret-troque-em-producao-0123456789abcdef
```

`.env.local`:
```
AUTH_SECRET=dev-secret-troque-em-producao-0123456789abcdef
```

Run: `grep -E "dev.vars|env.local" .gitignore` — Expected: ambos listados (se faltar, adicionar).

- [ ] **Step 8: Criar o gestor local**

Run: `ADMIN_EMAIL=gestor@fenixvalley.com.br ADMIN_PASSWORD=fenix-admin-dev yarn seed:admin`
Expected: "Gestor gestor@fenixvalley.com.br criado/atualizado (local)." e `SELECT count(*) FROM users` → 1.

- [ ] **Step 9: Commit**

```bash
git add lib/auth-config.ts lib/auth.ts types/next-auth.d.ts app/api/auth middleware.ts scripts/seed-admin.mjs .gitignore
git commit -m "feat: autenticacao Auth.js com credentials e middleware do admin"
```

---

### Task 6: Schemas zod dos novos domínios

**Files:**
- Modify: `lib/schemas.ts` (adicionar ao final)

- [ ] **Step 1: Adicionar schemas**

```ts
export const volunteerAreas = [
  "Tecnologia e produto",
  "Design e conteúdo",
  "Eventos e comunidade",
  "Educação e mentorias",
  "Captação e parcerias",
  "Gestão e operações"
] as const;

export const volunteerAvailabilities = [
  "Algumas horas por mês",
  "Algumas horas por semana",
  "Pontual em eventos"
] as const;

export const volunteerSchema = z.object({
  name: z.string().min(3, "Informe seu nome completo."),
  email: z.string().email("Informe um e-mail válido."),
  phone: z.string().optional().or(z.literal("")),
  area: z.enum(volunteerAreas, { message: "Escolha uma área de atuação." }),
  availability: z.enum(volunteerAvailabilities, { message: "Escolha sua disponibilidade." }),
  motivation: z.string().min(10, "Conte em uma frase por que quer ser voluntário(a)."),
  consent: z.literal(true, { message: "É preciso autorizar o uso dos dados." })
});

export type VolunteerInput = z.infer<typeof volunteerSchema>;

export const actorTypes = [
  "startup",
  "empresa",
  "universidade",
  "escola-tecnica",
  "coworking",
  "laboratorio",
  "hub",
  "investidor",
  "aceleradora",
  "incubadora",
  "poder-publico",
  "comunidade"
] as const;

export const actorTypeLabels: Record<(typeof actorTypes)[number], string> = {
  startup: "Startup",
  empresa: "Empresa",
  universidade: "Universidade",
  "escola-tecnica": "Escola técnica",
  coworking: "Coworking",
  laboratorio: "Laboratório",
  hub: "Hub de inovação",
  investidor: "Investidor",
  aceleradora: "Aceleradora",
  incubadora: "Incubadora",
  "poder-publico": "Poder público",
  comunidade: "Comunidade"
};

export const actorSchema = z.object({
  name: z.string().min(2, "Informe o nome da organização."),
  type: z.enum(actorTypes, { message: "Escolha o tipo de organização." }),
  segment: z.string().min(2, "Informe o segmento ou área."),
  neighborhood: z.string().min(2, "Informe o bairro ou região."),
  description: z.string().min(10, "Descreva a organização em uma frase."),
  site: z.string().url("Informe uma URL válida.").optional().or(z.literal("")),
  lat: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().min(-90).max(90).optional()
  ),
  lng: z.preprocess(
    (value) => (value === "" || value === null ? undefined : value),
    z.coerce.number().min(-180).max(180).optional()
  )
});
```

Nota: o `preprocess` evita que um campo de formulário vazio vire `0` via `z.coerce` (pin em 0,0).

```ts

export type ActorInput = z.infer<typeof actorSchema>;

export const opportunityTypes = ["Meetup", "Programa", "Mentoria", "Comunidade", "Capital"] as const;
export const opportunityStages = ["Aberto", "Curadoria", "Em breve"] as const;

export const opportunitySchema = z.object({
  title: z.string().min(3, "Informe o título."),
  type: z.enum(opportunityTypes, { message: "Escolha o tipo." }),
  stage: z.enum(opportunityStages, { message: "Escolha o estágio." }),
  audience: z.string().min(3, "Informe o público."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD."),
  owner: z.string().min(2, "Informe o responsável.")
});

export type OpportunityInput = z.infer<typeof opportunitySchema>;
```

Nota: zod 3.24 aceita `{ message }` em `z.enum`/`z.literal`.

- [ ] **Step 2: Verificar**

Run: `yarn tsc --noEmit 2>&1 | head -5`
Expected: sem erros.

- [ ] **Step 3: Commit**

```bash
git add lib/schemas.ts
git commit -m "feat: schemas zod de voluntario, ator e oportunidade"
```

---

### Task 7: APIs públicas (volunteers, actors, leads, opportunities)

**Files:**
- Create: `app/api/volunteers/route.ts`
- Create: `app/api/actors/route.ts`
- Modify: `app/api/leads/route.ts`
- Modify: `app/api/opportunities/route.ts`

- [ ] **Step 1: Criar `app/api/volunteers/route.ts`**

```ts
import { NextResponse } from "next/server";
import { volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";
import { volunteerSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = volunteerSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const { consent: _consent, ...data } = parsed.data;
  await getDb().insert(volunteers).values({
    ...data,
    phone: data.phone || null
  });

  return NextResponse.json({
    ok: true,
    message: "Inscrição recebida! A coordenação do Fênix Valley entra em contato pelo e-mail informado."
  });
}
```

- [ ] **Step 2: Criar `app/api/actors/route.ts`**

```ts
import { and, eq, like, or } from "drizzle-orm";
import { NextResponse } from "next/server";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { actorSchema } from "@/lib/schemas";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

export async function GET(request: Request) {
  const url = new URL(request.url);
  const type = url.searchParams.get("type");
  const q = url.searchParams.get("q");

  const conditions = [eq(actors.status, "approved")];
  if (type) conditions.push(eq(actors.type, type));
  if (q) {
    const pattern = `%${q}%`;
    conditions.push(or(like(actors.name, pattern), like(actors.neighborhood, pattern))!);
  }

  const rows = await getDb()
    .select()
    .from(actors)
    .where(and(...conditions));
  return NextResponse.json(rows);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = actorSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  const data = parsed.data;
  await getDb().insert(actors).values({
    ...data,
    site: data.site || null,
    lat: data.lat ?? BETIM_CENTER.lat,
    lng: data.lng ?? BETIM_CENTER.lng,
    status: "pending"
  });

  return NextResponse.json({
    ok: true,
    message: "Cadastro recebido! Ele aparece no mapa assim que for aprovado pela curadoria."
  });
}
```

- [ ] **Step 3: Persistir leads — substituir o corpo de `app/api/leads/route.ts`**

```ts
import { NextResponse } from "next/server";
import { leads } from "@/db/schema";
import { getDb } from "@/lib/db";
import { leadSchema } from "@/lib/schemas";

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  await getDb().insert(leads).values(parsed.data);

  return NextResponse.json({
    ok: true,
    message: "Cadastro recebido. A comunidade Fênix Valley entra em contato pelo e-mail informado."
  });
}
```

- [ ] **Step 4: Servir oportunidades do banco — substituir `app/api/opportunities/route.ts`** (remover `force-static`):

```ts
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";

export async function GET() {
  const rows = await getDb()
    .select()
    .from(opportunities)
    .where(eq(opportunities.status, "published"));

  return NextResponse.json(
    rows.map((row) => ({
      id: String(row.id),
      title: row.title,
      type: row.type,
      stage: row.stage,
      audience: row.audience,
      date: row.date,
      owner: row.owner
    }))
  );
}
```

Nota: a home continua estática com `initialData` de `data/opportunities.ts`; a tabela revalida no cliente contra esta rota.

- [ ] **Step 5: Verificar em runtime**

Run (em terminais/etapas separadas, dev server no ar com `yarn dev --port 3100`):
```bash
curl -s -X POST http://127.0.0.1:3100/api/volunteers -H "Content-Type: application/json" \
  -d '{"name":"Teste Voluntária","email":"v@t.com","area":"Eventos e comunidade","availability":"Pontual em eventos","motivation":"Quero ajudar a comunidade local.","consent":true}'
curl -s "http://127.0.0.1:3100/api/actors" | head -c 300
curl -s http://127.0.0.1:3100/api/opportunities | head -c 200
```
Expected: `{"ok":true,...}`; JSON com 4 atores aprovados; JSON com 5 oportunidades.

- [ ] **Step 6: Commit**

```bash
git add app/api
git commit -m "feat: APIs de voluntarios e atores; leads e oportunidades no D1"
```

---

### Task 8: Página /voluntarie-se

**Files:**
- Create: `components/sections/volunteer-form.tsx`
- Create: `app/voluntarie-se/page.tsx`
- Modify: `components/sections/join-section.tsx` (link)

- [ ] **Step 1: Criar `components/sections/volunteer-form.tsx`** (padrão do JoinForm):

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { HeartHandshake } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  VolunteerInput,
  volunteerAreas,
  volunteerAvailabilities,
  volunteerSchema
} from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function VolunteerForm() {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<VolunteerInput>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { name: "", email: "", phone: "", motivation: "" }
  });

  function onSubmit(values: VolunteerInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Inscrição recebida!");
        reset();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          Nome
          <Input placeholder="Seu nome" {...register("name")} />
          {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
        </label>
        <label className="space-y-2 text-sm font-semibold">
          E-mail
          <Input placeholder="voce@email.com" type="email" {...register("email")} />
          {errors.email ? <span className="block text-xs text-destructive">{errors.email.message}</span> : null}
        </label>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <label className="space-y-2 text-sm font-semibold">
          Telefone (opcional)
          <Input placeholder="(31) 9 0000-0000" type="tel" {...register("phone")} />
        </label>
        <label className="space-y-2 text-sm font-semibold">
          Área de atuação
          <select className={selectClassName} {...register("area")}>
            <option value="">Selecione</option>
            {volunteerAreas.map((area) => (
              <option key={area} value={area}>
                {area}
              </option>
            ))}
          </select>
          {errors.area ? <span className="block text-xs text-destructive">{errors.area.message}</span> : null}
        </label>
      </div>
      <label className="space-y-2 text-sm font-semibold">
        Disponibilidade
        <select className={selectClassName} {...register("availability")}>
          <option value="">Selecione</option>
          {volunteerAvailabilities.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        {errors.availability ? (
          <span className="block text-xs text-destructive">{errors.availability.message}</span>
        ) : null}
      </label>
      <label className="space-y-2 text-sm font-semibold">
        Por que você quer ser voluntário(a)?
        <Textarea
          placeholder="Quero organizar eventos, mentorar, produzir conteúdo, apoiar a operação..."
          {...register("motivation")}
        />
        {errors.motivation ? (
          <span className="block text-xs text-destructive">{errors.motivation.message}</span>
        ) : null}
      </label>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-300">
        <input type="checkbox" className="mt-1 h-4 w-4" {...register("consent")} />
        Autorizo o uso dos meus dados para contato sobre o voluntariado no Fênix Valley.
      </label>
      {errors.consent ? <span className="block text-xs text-destructive">{errors.consent.message}</span> : null}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <HeartHandshake className="h-4 w-4" />
          {isPending ? "Enviando..." : "Quero ser voluntário(a)"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
```

- [ ] **Step 2: Criar `app/voluntarie-se/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { VolunteerForm } from "@/components/sections/volunteer-form";

export const metadata: Metadata = {
  title: "Voluntarie-se | Fênix Valley",
  description:
    "Inscreva-se para ser voluntário(a) da comunidade Fênix Valley e ajudar a construir o ecossistema de inovação de Betim."
};

export default function VolunteerPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="brand-grid absolute inset-x-0 top-0 h-96 opacity-50" aria-hidden="true" />
          <div className="section-shell relative grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Voluntariado</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                O movimento é feito por quem coloca a mão na massa.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Voluntários e voluntárias organizam eventos, produzem conteúdo, mentoram projetos e
                mantêm a comunidade viva. Conte como você quer contribuir e a coordenação entra em
                contato.
              </p>
            </div>
            <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-crisp sm:p-7">
              <VolunteerForm />
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 3: Linkar na seção Join** — em `components/sections/join-section.tsx`, logo após o `<Button asChild variant="secondary">` existente (dentro do mesmo bloco), adicionar:

```tsx
          <Button asChild variant="ghost">
            <Link href="/voluntarie-se">
              Quero ser voluntário(a)
            </Link>
          </Button>
```

(envolver os dois botões em `<div className="flex flex-wrap gap-3">` para layout.)

- [ ] **Step 4: Verificar no navegador**

Run: dev server + abrir `http://127.0.0.1:3100/voluntarie-se`, preencher e enviar.
Expected: mensagem de sucesso; `yarn wrangler d1 execute fenixvalley-db --local --command "SELECT name, status FROM volunteers ORDER BY id DESC LIMIT 1"` mostra a inscrição `pending`.

- [ ] **Step 5: Commit**

```bash
git add components/sections/volunteer-form.tsx app/voluntarie-se components/sections/join-section.tsx
git commit -m "feat: pagina e formulario de inscricao de voluntarios"
```

---

### Task 9: Admin — login e layout

**Files:**
- Create: `app/admin/login/page.tsx`
- Create: `app/admin/login/actions.ts`
- Create: `app/admin/(painel)/layout.tsx`
- Create: `components/admin/admin-nav.tsx`

- [ ] **Step 1: Criar `app/admin/login/actions.ts`**

```ts
"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/lib/auth";

export type LoginState = { error?: string };

export async function loginAction(_previous: LoginState, formData: FormData): Promise<LoginState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin"
    });
    return {};
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "E-mail ou senha inválidos." };
    }
    throw error;
  }
}
```

- [ ] **Step 2: Criar `app/admin/login/page.tsx`**

```tsx
"use client";

import { LogIn } from "lucide-react";
import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginAction, type LoginState } from "./actions";

export default function AdminLoginPage() {
  const [state, formAction, isPending] = useActionState<LoginState, FormData>(loginAction, {});

  return (
    <main className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border border-slate-800 bg-slate-950 p-6 shadow-crisp">
        <div className="space-y-2">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Área dos gestores</p>
          <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Fênix Valley Admin</h1>
        </div>
        <form action={formAction} className="space-y-4">
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            E-mail
            <Input name="email" type="email" required placeholder="gestor@fenixvalley.com.br" />
          </label>
          <label className="block space-y-2 text-sm font-semibold text-slate-200">
            Senha
            <Input name="password" type="password" required placeholder="••••••••" />
          </label>
          {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
          <Button type="submit" className="w-full" disabled={isPending}>
            <LogIn className="h-4 w-4" />
            {isPending ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </div>
    </main>
  );
}
```

- [ ] **Step 3: Criar `components/admin/admin-nav.tsx`**

```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/voluntarios", label: "Voluntários" },
  { href: "/admin/atores", label: "Atores do mapa" },
  { href: "/admin/oportunidades", label: "Oportunidades" },
  { href: "/admin/leads", label: "Leads" }
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Navegação do admin">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
              active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
```

- [ ] **Step 4: Criar `app/admin/(painel)/layout.tsx`**

```tsx
import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import { auth, signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="border-b border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link href="/admin" className="font-[var(--font-space)] text-lg font-black text-white">
              Fênix Valley <span className="text-orange-300">Admin</span>
            </Link>
            <p className="text-xs text-slate-400">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <AdminNav />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
```

- [ ] **Step 5: Verificar fluxo de login**

Run: dev server, abrir `http://127.0.0.1:3100/admin` → deve redirecionar para `/admin/login`. Logar com `gestor@fenixvalley.com.br` / `fenix-admin-dev`.
Expected: redirect para `/admin` (404 da página é esperado até a Task 10 — layout com header "Fênix Valley Admin" deve aparecer... criar `app/admin/(painel)/page.tsx` mínimo nesta task se necessário para validar: ver Task 10 Step 1, pode ser antecipado).

- [ ] **Step 6: Commit**

```bash
git add app/admin components/admin
git commit -m "feat: login e layout da area administrativa"
```

---

### Task 10: Admin — ações de servidor e dashboard

**Files:**
- Create: `app/admin/(painel)/actions.ts`
- Create: `app/admin/(painel)/page.tsx`
- Create: `components/admin/status-badge.tsx`

- [ ] **Step 1: Criar `app/admin/(painel)/actions.ts`**

```ts
"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { actors, opportunities, volunteers } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";
import { actorSchema, opportunitySchema } from "@/lib/schemas";

const BETIM_CENTER = { lat: -19.9678, lng: -44.1987 };

async function requireAdmin() {
  const session = await auth();
  if (!session?.user) throw new Error("Não autorizado.");
}

export async function setVolunteerStatus(id: number, status: "approved" | "rejected") {
  await requireAdmin();
  await getDb().update(volunteers).set({ status }).where(eq(volunteers.id, id));
  revalidatePath("/admin/voluntarios");
  revalidatePath("/admin");
}

export async function setActorStatus(id: number, status: "approved" | "rejected") {
  await requireAdmin();
  await getDb().update(actors).set({ status }).where(eq(actors.id, id));
  revalidatePath("/admin/atores");
  revalidatePath("/admin");
}

export async function setOpportunityStatus(id: number, status: "published" | "archived") {
  await requireAdmin();
  await getDb().update(opportunities).set({ status }).where(eq(opportunities.id, id));
  revalidatePath("/admin/oportunidades");
  revalidatePath("/admin");
}

export type FormState = { error?: string };

export async function upsertActor(id: number | null, _previous: FormState, formData: FormData): Promise<FormState> {
  await requireAdmin();
  const parsed = actorSchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const data = {
    ...parsed.data,
    site: parsed.data.site || null,
    lat: parsed.data.lat ?? BETIM_CENTER.lat,
    lng: parsed.data.lng ?? BETIM_CENTER.lng
  };
  const db = getDb();
  if (id === null) {
    await db.insert(actors).values({ ...data, status: "approved" });
  } else {
    await db.update(actors).set(data).where(eq(actors.id, id));
  }
  revalidatePath("/admin/atores");
  redirect("/admin/atores");
}

export async function upsertOpportunity(
  id: number | null,
  _previous: FormState,
  formData: FormData
): Promise<FormState> {
  await requireAdmin();
  const parsed = opportunitySchema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors).flat()[0];
    return { error: first ?? "Revise os campos." };
  }
  const db = getDb();
  if (id === null) {
    await db.insert(opportunities).values({ ...parsed.data, status: "published" });
  } else {
    await db.update(opportunities).set(parsed.data).where(eq(opportunities.id, id));
  }
  revalidatePath("/admin/oportunidades");
  redirect("/admin/oportunidades");
}
```

- [ ] **Step 2: Criar `components/admin/status-badge.tsx`**

```tsx
const styles: Record<string, string> = {
  pending: "bg-amber-500/15 text-amber-400 border-amber-500/30",
  approved: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  rejected: "bg-rose-500/15 text-rose-400 border-rose-500/30",
  published: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
  archived: "bg-slate-500/15 text-slate-400 border-slate-500/30"
};

const labels: Record<string, string> = {
  pending: "Pendente",
  approved: "Aprovado",
  rejected: "Rejeitado",
  published: "Publicada",
  archived: "Arquivada"
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${styles[status] ?? styles.archived}`}
    >
      {labels[status] ?? status}
    </span>
  );
}
```

- [ ] **Step 3: Criar `app/admin/(painel)/page.tsx`** (dashboard):

```tsx
import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { actors, leads, opportunities, volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCounts() {
  const db = getDb();
  const [pendingVolunteers] = await db
    .select({ value: count() })
    .from(volunteers)
    .where(eq(volunteers.status, "pending"));
  const [pendingActors] = await db
    .select({ value: count() })
    .from(actors)
    .where(eq(actors.status, "pending"));
  const [publishedOpportunities] = await db
    .select({ value: count() })
    .from(opportunities)
    .where(eq(opportunities.status, "published"));
  const [totalLeads] = await db.select({ value: count() }).from(leads);
  return {
    pendingVolunteers: pendingVolunteers.value,
    pendingActors: pendingActors.value,
    publishedOpportunities: publishedOpportunities.value,
    totalLeads: totalLeads.value
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const cards = [
    { label: "Voluntários pendentes", value: counts.pendingVolunteers, href: "/admin/voluntarios" },
    { label: "Atores pendentes", value: counts.pendingActors, href: "/admin/atores" },
    { label: "Oportunidades publicadas", value: counts.publishedOpportunities, href: "/admin/oportunidades" },
    { label: "Leads recebidos", value: counts.totalLeads, href: "/admin/leads" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Visão geral</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="surface-panel rounded-lg p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-[var(--font-space)] text-3xl font-black text-orange-300">{card.value}</p>
            <p className="mt-1 text-sm font-semibold text-white">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Verificar**

Run: abrir `http://127.0.0.1:3100/admin` logado.
Expected: 4 cards com contagens reais (1 voluntário pendente da Task 8, 0 atores pendentes, 5 oportunidades, leads conforme testes).

- [ ] **Step 5: Commit**

```bash
git add app/admin components/admin
git commit -m "feat: dashboard e server actions do admin"
```

---

### Task 11: Admin — voluntários e leads

**Files:**
- Create: `app/admin/(painel)/voluntarios/page.tsx`
- Create: `app/admin/(painel)/leads/page.tsx`

- [ ] **Step 1: Criar `app/admin/(painel)/voluntarios/page.tsx`**

```tsx
import { desc } from "drizzle-orm";
import { Check, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setVolunteerStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminVolunteersPage() {
  const rows = await getDb().select().from(volunteers).orderBy(desc(volunteers.id));

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Voluntários</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhuma inscrição recebida ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Disponibilidade</TableHead>
                <TableHead>Motivação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{volunteer.name}</p>
                    <p className="text-xs text-slate-400">{volunteer.email}</p>
                    {volunteer.phone ? <p className="text-xs text-slate-400">{volunteer.phone}</p> : null}
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{volunteer.area}</TableCell>
                  <TableCell className="text-sm text-slate-300">{volunteer.availability}</TableCell>
                  <TableCell className="max-w-64 text-sm text-slate-300">{volunteer.motivation}</TableCell>
                  <TableCell>
                    <StatusBadge status={volunteer.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setVolunteerStatus(volunteer.id, "approved");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                          <Check className="h-4 w-4" />
                          Aprovar
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await setVolunteerStatus(volunteer.id, "rejected");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                          <X className="h-4 w-4" />
                          Rejeitar
                        </Button>
                      </form>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Criar `app/admin/(painel)/leads/page.tsx`**

```tsx
import { desc } from "drizzle-orm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const rows = await getDb().select().from(leads).orderBy(desc(leads.id));

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Leads (Faça Parte)</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhum lead recebido ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Recebido em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{lead.profile}</TableCell>
                  <TableCell className="max-w-72 text-sm text-slate-300">{lead.objective}</TableCell>
                  <TableCell className="text-sm text-slate-400">{lead.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Verificar**

Run: abrir `/admin/voluntarios`, aprovar o voluntário de teste.
Expected: badge muda para "Aprovado"; contagem de pendentes no dashboard cai para 0. `/admin/leads` lista leads enviados.

- [ ] **Step 4: Commit**

```bash
git add app/admin
git commit -m "feat: moderacao de voluntarios e listagem de leads no admin"
```

---

### Task 12: Admin — atores do mapa (moderação + criar/editar)

**Files:**
- Create: `app/admin/(painel)/atores/page.tsx`
- Create: `app/admin/(painel)/atores/novo/page.tsx`
- Create: `app/admin/(painel)/atores/[id]/editar/page.tsx`
- Create: `components/admin/actor-form.tsx`

- [ ] **Step 1: Criar `components/admin/actor-form.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { FormState } from "@/app/admin/(painel)/actions";
import { actorTypeLabels, actorTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type ActorFormValues = {
  name: string;
  type: string;
  segment: string;
  neighborhood: string;
  description: string;
  site: string | null;
  lat: number;
  lng: number;
};

export function ActorForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: ActorFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Nome
        <Input name="name" required defaultValue={initialValues?.name} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo
          <select name="type" required defaultValue={initialValues?.type ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {actorTypes.map((type) => (
              <option key={type} value={type}>
                {actorTypeLabels[type]}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Segmento
          <Input name="segment" required defaultValue={initialValues?.segment} />
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Bairro/Região
          <Input name="neighborhood" required defaultValue={initialValues?.neighborhood} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Latitude
          <Input name="lat" type="number" step="any" defaultValue={initialValues?.lat} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Longitude
          <Input name="lng" type="number" step="any" defaultValue={initialValues?.lng} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Site (opcional)
        <Input name="site" type="url" placeholder="https://" defaultValue={initialValues?.site ?? ""} />
      </label>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Descrição
        <Textarea name="description" required defaultValue={initialValues?.description} />
      </label>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar ator"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Criar `app/admin/(painel)/atores/page.tsx`**

```tsx
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Check, Pencil, Plus, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { actorTypeLabels } from "@/lib/schemas";
import { setActorStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminActorsPage() {
  const rows = await getDb().select().from(actors).orderBy(desc(actors.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Atores do mapa</h1>
        <Button asChild size="sm">
          <Link href="/admin/atores/novo">
            <Plus className="h-4 w-4" />
            Novo ator
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhum ator cadastrado.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((actor) => (
                <TableRow key={actor.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{actor.name}</p>
                    <p className="max-w-72 truncate text-xs text-slate-400">{actor.segment}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">
                    {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type}
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{actor.neighborhood}</TableCell>
                  <TableCell>
                    <StatusBadge status={actor.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setActorStatus(actor.id, "approved");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                          <Check className="h-4 w-4" />
                          Aprovar
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await setActorStatus(actor.id, "rejected");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                          <X className="h-4 w-4" />
                          Rejeitar
                        </Button>
                      </form>
                      <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                        <Link href={`/admin/atores/${actor.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Criar `app/admin/(painel)/atores/novo/page.tsx`**

```tsx
import { ActorForm } from "@/components/admin/actor-form";
import { upsertActor } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewActorPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Novo ator</h1>
      <ActorForm action={upsertActor.bind(null, null)} />
    </div>
  );
}
```

- [ ] **Step 4: Criar `app/admin/(painel)/atores/[id]/editar/page.tsx`**

```tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ActorForm } from "@/components/admin/actor-form";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertActor } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditActorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actorId = Number(id);
  if (!Number.isInteger(actorId)) notFound();

  const actor = await getDb().query.actors.findFirst({ where: eq(actors.id, actorId) });
  if (!actor) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar ator</h1>
      <ActorForm action={upsertActor.bind(null, actorId)} initialValues={actor} />
    </div>
  );
}
```

- [ ] **Step 5: Verificar**

Run: criar um ator novo pelo admin, editar um existente, aprovar/rejeitar.
Expected: listagem reflete mudanças; `curl -s "http://127.0.0.1:3100/api/actors" | python3 -c "import json,sys; print(len(json.load(sys.stdin)))"` conta apenas aprovados.

- [ ] **Step 6: Commit**

```bash
git add app/admin components/admin
git commit -m "feat: gestao de atores do mapa no admin"
```

---

### Task 13: Admin — oportunidades (CRUD)

**Files:**
- Create: `app/admin/(painel)/oportunidades/page.tsx`
- Create: `app/admin/(painel)/oportunidades/nova/page.tsx`
- Create: `app/admin/(painel)/oportunidades/[id]/editar/page.tsx`
- Create: `components/admin/opportunity-form.tsx`

- [ ] **Step 1: Criar `components/admin/opportunity-form.tsx`**

```tsx
"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { FormState } from "@/app/admin/(painel)/actions";
import { opportunityStages, opportunityTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

type OpportunityFormValues = {
  title: string;
  type: string;
  stage: string;
  audience: string;
  date: string;
  owner: string;
};

export function OpportunityForm({
  action,
  initialValues
}: {
  action: (previous: FormState, formData: FormData) => Promise<FormState>;
  initialValues?: OpportunityFormValues;
}) {
  const [state, formAction, isPending] = useActionState<FormState, FormData>(action, {});

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Título
        <Input name="title" required defaultValue={initialValues?.title} />
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Tipo
          <select name="type" required defaultValue={initialValues?.type ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {opportunityTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Estágio
          <select name="stage" required defaultValue={initialValues?.stage ?? ""} className={selectClassName}>
            <option value="">Selecione</option>
            {opportunityStages.map((stage) => (
              <option key={stage} value={stage}>
                {stage}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Data
          <Input name="date" type="date" required defaultValue={initialValues?.date} />
        </label>
        <label className="block space-y-2 text-sm font-semibold text-slate-200">
          Responsável
          <Input name="owner" required defaultValue={initialValues?.owner} />
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold text-slate-200">
        Público
        <Input name="audience" required defaultValue={initialValues?.audience} />
      </label>
      {state.error ? <p className="text-sm font-medium text-destructive">{state.error}</p> : null}
      <Button type="submit" disabled={isPending}>
        {isPending ? "Salvando..." : "Salvar oportunidade"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Criar `app/admin/(painel)/oportunidades/page.tsx`**

```tsx
import Link from "next/link";
import { desc } from "drizzle-orm";
import { Archive, Pencil, Plus, Upload } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setOpportunityStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const rows = await getDb().select().from(opportunities).orderBy(desc(opportunities.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Oportunidades</h1>
        <Button asChild size="sm">
          <Link href="/admin/oportunidades/nova">
            <Plus className="h-4 w-4" />
            Nova oportunidade
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhuma oportunidade cadastrada.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{opportunity.title}</p>
                    <p className="max-w-72 truncate text-xs text-slate-400">{opportunity.audience}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{opportunity.type}</TableCell>
                  <TableCell className="text-sm text-slate-300">{opportunity.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={opportunity.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {opportunity.status === "published" ? (
                        <form
                          action={async () => {
                            "use server";
                            await setOpportunityStatus(opportunity.id, "archived");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                            <Archive className="h-4 w-4" />
                            Arquivar
                          </Button>
                        </form>
                      ) : (
                        <form
                          action={async () => {
                            "use server";
                            await setOpportunityStatus(opportunity.id, "published");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                            <Upload className="h-4 w-4" />
                            Publicar
                          </Button>
                        </form>
                      )}
                      <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                        <Link href={`/admin/oportunidades/${opportunity.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
```

- [ ] **Step 3: Criar `app/admin/(painel)/oportunidades/nova/page.tsx`**

```tsx
import { OpportunityForm } from "@/components/admin/opportunity-form";
import { upsertOpportunity } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewOpportunityPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Nova oportunidade</h1>
      <OpportunityForm action={upsertOpportunity.bind(null, null)} />
    </div>
  );
}
```

- [ ] **Step 4: Criar `app/admin/(painel)/oportunidades/[id]/editar/page.tsx`**

```tsx
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { OpportunityForm } from "@/components/admin/opportunity-form";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertOpportunity } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opportunityId = Number(id);
  if (!Number.isInteger(opportunityId)) notFound();

  const opportunity = await getDb().query.opportunities.findFirst({
    where: eq(opportunities.id, opportunityId)
  });
  if (!opportunity) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar oportunidade</h1>
      <OpportunityForm action={upsertOpportunity.bind(null, opportunityId)} initialValues={opportunity} />
    </div>
  );
}
```

- [ ] **Step 5: Verificar**

Run: criar, arquivar e republicar uma oportunidade no admin; depois `curl -s http://127.0.0.1:3100/api/opportunities`.
Expected: oportunidade arquivada some da API pública; recém-criada aparece.

- [ ] **Step 6: Commit**

```bash
git add app/admin components/admin
git commit -m "feat: CRUD de oportunidades no admin"
```

---

### Task 14: Mapa do ecossistema — /mapa

**Files:**
- Create: `components/map/map-canvas.tsx`
- Create: `components/map/actor-register-form.tsx`
- Create: `components/map/ecosystem-map.tsx`
- Create: `app/mapa/page.tsx`
- Modify: `components/sections/site-header.tsx` (links absolutos + entrada "Mapa")

- [ ] **Step 1: Criar `components/map/map-canvas.tsx`** (só roda no cliente):

```tsx
"use client";

import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

export type MapActor = {
  id: number;
  name: string;
  type: string;
  segment: string;
  neighborhood: string;
  description: string;
  site: string | null;
  lat: number;
  lng: number;
};

const BETIM_CENTER: [number, number] = [-44.1987, -19.9678];

export default function MapCanvas({
  actors,
  selectedId,
  onSelect
}: {
  actors: MapActor[];
  selectedId: number | null;
  onSelect: (id: number) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;
    const map = new maplibregl.Map({
      container: containerRef.current,
      style: "https://tiles.openfreemap.org/styles/liberty",
      center: BETIM_CENTER,
      zoom: 12.2
    });
    map.addControl(new maplibregl.NavigationControl({ showCompass: false }), "top-right");
    mapRef.current = map;
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    markersRef.current.forEach((marker) => marker.remove());
    markersRef.current = actors.map((actor) => {
      const element = document.createElement("button");
      element.type = "button";
      element.setAttribute("aria-label", actor.name);
      element.className =
        "h-4 w-4 cursor-pointer rounded-full border-2 border-white bg-orange-500 shadow-lg transition-transform hover:scale-125";
      element.addEventListener("click", () => onSelectRef.current(actor.id));
      return new maplibregl.Marker({ element })
        .setLngLat([actor.lng, actor.lat])
        .addTo(map);
    });
  }, [actors]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || selectedId === null) return;
    const actor = actors.find((item) => item.id === selectedId);
    if (actor) {
      map.flyTo({ center: [actor.lng, actor.lat], zoom: 14, duration: 700 });
    }
  }, [selectedId, actors]);

  return <div ref={containerRef} className="h-full w-full" />;
}
```

- [ ] **Step 2: Criar `components/map/actor-register-form.tsx`**

```tsx
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ActorInput, actorSchema, actorTypeLabels, actorTypes } from "@/lib/schemas";

const selectClassName =
  "flex h-11 w-full rounded-md border bg-background px-3 py-2 text-sm outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring";

export function ActorRegisterForm({ onSuccess }: { onSuccess?: () => void }) {
  const [message, setMessage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ActorInput>({
    resolver: zodResolver(actorSchema),
    defaultValues: { name: "", segment: "", neighborhood: "", description: "", site: "" }
  });

  function onSubmit(values: ActorInput) {
    setMessage(null);
    startTransition(async () => {
      const response = await fetch("/api/actors", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values)
      });
      const payload = (await response.json()) as { ok: boolean; message?: string };
      if (payload.ok) {
        setMessage(payload.message ?? "Cadastro recebido!");
        reset();
        onSuccess?.();
        return;
      }
      setMessage("Revise os campos e tente novamente.");
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <label className="block space-y-2 text-sm font-semibold">
        Nome da organização
        <Input placeholder="Nome" {...register("name")} />
        {errors.name ? <span className="block text-xs text-destructive">{errors.name.message}</span> : null}
      </label>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Tipo
          <select className={selectClassName} {...register("type")}>
            <option value="">Selecione</option>
            {actorTypes.map((type) => (
              <option key={type} value={type}>
                {actorTypeLabels[type]}
              </option>
            ))}
          </select>
          {errors.type ? <span className="block text-xs text-destructive">{errors.type.message}</span> : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Segmento
          <Input placeholder="Ex.: educação, logística, SaaS" {...register("segment")} />
          {errors.segment ? (
            <span className="block text-xs text-destructive">{errors.segment.message}</span>
          ) : null}
        </label>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="block space-y-2 text-sm font-semibold">
          Bairro/Região
          <Input placeholder="Ex.: Centro, Angola, PTB" {...register("neighborhood")} />
          {errors.neighborhood ? (
            <span className="block text-xs text-destructive">{errors.neighborhood.message}</span>
          ) : null}
        </label>
        <label className="block space-y-2 text-sm font-semibold">
          Site (opcional)
          <Input placeholder="https://" {...register("site")} />
          {errors.site ? <span className="block text-xs text-destructive">{errors.site.message}</span> : null}
        </label>
      </div>
      <label className="block space-y-2 text-sm font-semibold">
        Descrição
        <Textarea placeholder="O que a organização faz e como participa do ecossistema" {...register("description")} />
        {errors.description ? (
          <span className="block text-xs text-destructive">{errors.description.message}</span>
        ) : null}
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" disabled={isPending}>
          <Send className="h-4 w-4" />
          {isPending ? "Enviando..." : "Enviar para curadoria"}
        </Button>
        {message ? <p className="text-sm font-medium text-secondary">{message}</p> : null}
      </div>
    </form>
  );
}
```

- [ ] **Step 3: Criar `components/map/ecosystem-map.tsx`**

```tsx
"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ExternalLink, MapPin, Plus, Search, X } from "lucide-react";
import { ActorRegisterForm } from "@/components/map/actor-register-form";
import type { MapActor } from "@/components/map/map-canvas";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { actorTypeLabels, actorTypes } from "@/lib/schemas";
import { cn } from "@/lib/utils";

const MapCanvas = dynamic(() => import("@/components/map/map-canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full items-center justify-center bg-slate-900 text-sm text-slate-400">
      Carregando mapa...
    </div>
  )
});

async function fetchActors(): Promise<MapActor[]> {
  const response = await fetch("/api/actors");
  if (!response.ok) throw new Error("Não foi possível carregar o mapa.");
  return response.json();
}

export function EcosystemMap() {
  const { data: actors = [], isError } = useQuery({ queryKey: ["actors"], queryFn: fetchActors });
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const visibleActors = useMemo(() => {
    const query = search.trim().toLowerCase();
    return actors.filter((actor) => {
      if (typeFilter && actor.type !== typeFilter) return false;
      if (!query) return true;
      return (
        actor.name.toLowerCase().includes(query) ||
        actor.neighborhood.toLowerCase().includes(query) ||
        actor.segment.toLowerCase().includes(query)
      );
    });
  }, [actors, typeFilter, search]);

  const availableTypes = useMemo(
    () => actorTypes.filter((type) => actors.some((actor) => actor.type === type)),
    [actors]
  );

  const selected = visibleActors.find((actor) => actor.id === selectedId) ?? null;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTypeFilter(null)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
              typeFilter === null
                ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
            )}
          >
            Todos
          </button>
          {availableTypes.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setTypeFilter(typeFilter === type ? null : type)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors",
                typeFilter === type
                  ? "border-orange-400/60 bg-orange-500/15 text-orange-300"
                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white"
              )}
            >
              {actorTypeLabels[type]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-500" />
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Buscar por nome, bairro ou segmento"
              className="pl-9"
            />
          </div>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" className="shrink-0">
                <Plus className="h-4 w-4" />
                Cadastre sua organização
              </Button>
            </DialogTrigger>
            <DialogContent className="max-h-[85vh] overflow-y-auto">
              <DialogTitle>Cadastre sua organização no mapa</DialogTitle>
              <p className="text-sm text-muted-foreground">
                O cadastro passa pela curadoria do Fênix Valley antes de aparecer no mapa.
              </p>
              <ActorRegisterForm />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {isError ? (
        <p className="rounded-lg border border-rose-500/30 bg-rose-500/10 p-4 text-sm text-rose-300">
          Não foi possível carregar os atores do mapa. Tente novamente em instantes.
        </p>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="relative h-[420px] overflow-hidden rounded-lg border border-white/10 sm:h-[540px]">
          <MapCanvas actors={visibleActors} selectedId={selectedId} onSelect={setSelectedId} />
          {selected ? (
            <div className="absolute bottom-4 left-4 right-4 z-10 max-w-md rounded-lg border border-white/10 bg-slate-950/95 p-4 shadow-2xl backdrop-blur sm:right-auto">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-orange-300">
                    {actorTypeLabels[selected.type as keyof typeof actorTypeLabels] ?? selected.type}
                  </p>
                  <h3 className="font-[var(--font-space)] text-lg font-bold text-white">{selected.name}</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedId(null)}
                  aria-label="Fechar detalhes"
                  className="rounded-md p-1 text-slate-400 hover:bg-white/10 hover:text-white"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5" />
                {selected.neighborhood} · {selected.segment}
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">{selected.description}</p>
              {selected.site ? (
                <a
                  href={selected.site}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-sm font-bold text-orange-300 hover:text-orange-200"
                >
                  Visitar site
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              ) : null}
            </div>
          ) : null}
        </div>
        <aside className="max-h-[540px] space-y-2 overflow-y-auto">
          <p className="text-sm text-slate-400">{visibleActors.length} atores no mapa</p>
          {visibleActors.map((actor) => (
            <button
              key={actor.id}
              type="button"
              onClick={() => setSelectedId(actor.id)}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition-colors",
                selectedId === actor.id
                  ? "border-orange-400/60 bg-orange-500/10"
                  : "border-white/10 bg-white/5 hover:bg-white/10"
              )}
            >
              <p className="text-sm font-bold text-white">{actor.name}</p>
              <p className="text-xs text-slate-400">
                {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type} · {actor.neighborhood}
              </p>
            </button>
          ))}
        </aside>
      </div>
    </div>
  );
}
```

- [ ] **Step 4: Criar `app/mapa/page.tsx`**

```tsx
import type { Metadata } from "next";
import { EcosystemMap } from "@/components/map/ecosystem-map";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export const metadata: Metadata = {
  title: "Mapa do ecossistema | Fênix Valley",
  description:
    "Mapa interativo de startups, universidades, empresas, hubs e espaços de inovação de Betim."
};

export default function MapPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-12 sm:py-16">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative space-y-8">
            <div className="max-w-3xl space-y-4">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-sky-300">Mapa Fênix Valley</p>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                Quem constrói o ecossistema de inovação de Betim.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Startups, universidades, empresas, hubs e espaços em um mapa vivo. Filtre por tipo,
                busque por bairro e cadastre sua organização.
              </p>
            </div>
            <EcosystemMap />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
```

- [ ] **Step 5: Atualizar `components/sections/site-header.tsx`** — substituir os arrays `navItems` e `quickActions` por (âncoras viram absolutas para funcionar fora da home; "Mapa vivo" → `/mapa`):

```tsx
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
    href: "/#ecossistema",
    label: "Ecossistema",
    links: [
      { href: "/mapa", label: "Mapa do ecossistema" },
      { href: "/#participar", label: "Startups e empresas" },
      { href: "/#participar", label: "Universidades e mentores" }
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
```

Também trocar `href="#ecossistema"` do link "Betim renascendo pela inovação" por `href="/mapa"` e `href="#"` do logo por `href="/"`.

- [ ] **Step 6: Verificar no navegador**

Run: abrir `http://127.0.0.1:3100/mapa`.
Expected: mapa de Betim com 4 pins; filtro por tipo reduz pins; busca "PUC" deixa 1; clique no pin abre card; "Cadastre sua organização" envia e cai como pendente no admin (não aparece no mapa).

- [ ] **Step 7: Commit**

```bash
git add components/map app/mapa components/sections/site-header.tsx
git commit -m "feat: mapa interativo do ecossistema em /mapa"
```

---

### Task 15: Verificação final integrada

**Files:** nenhum novo (correções pontuais se a verificação achar problema)

- [ ] **Step 1: Testes unitários**

Run: `yarn test`
Expected: todos passando.

- [ ] **Step 2: Build de produção**

Run: `yarn build`
Expected: compila sem erros; rotas `/admin/*` como dinâmicas (ƒ), `/`, `/mapa`, `/voluntarie-se` estáticas (○).

- [ ] **Step 3: Fluxo ponta a ponta no navegador (dev server)**

1. `/voluntarie-se` → inscrever voluntário → sucesso.
2. `/admin/login` → senha errada mostra erro; senha certa entra.
3. `/admin` → contadores corretos; aprovar voluntário em `/admin/voluntarios`.
4. `/admin/atores` → criar ator novo → aparece no `/mapa`.
5. `/mapa` → filtros, busca, card de detalhe, cadastro público → pendente no admin.
6. `/admin/oportunidades` → arquivar uma → some de `/api/opportunities` (tabela da home após refetch).
7. Logout → `/admin` redireciona para login.

- [ ] **Step 4: Atualizar CLAUDE.md** — acrescentar na seção Comandos:

```markdown
yarn db:generate                  # gera migration a partir de db/schema.ts
yarn db:migrate:local             # aplica migrations no D1 local (.wrangler/state)
yarn db:migrate:remote            # aplica migrations no D1 de produção
yarn seed:admin                   # cria gestor (ADMIN_EMAIL/ADMIN_PASSWORD; --remote p/ produção)
yarn test                         # vitest (lógica pura)
```

E na seção Variáveis de ambiente: `AUTH_SECRET` (em `.env.local` para next dev e secret do Worker em produção).

- [ ] **Step 5: Commit final**

```bash
git add CLAUDE.md
git commit -m "docs: comandos de banco e auth no CLAUDE.md"
```

---

## Notas de deploy (fora do fluxo de dev)

1. `yarn wrangler d1 create fenixvalley-db` → colar `database_id` real no `wrangler.jsonc`.
2. `yarn db:migrate:remote`.
3. `yarn wrangler secret put AUTH_SECRET` (valor forte).
4. `ADMIN_EMAIL=... ADMIN_PASSWORD=... yarn seed:admin --remote`.
5. `yarn deploy`.
