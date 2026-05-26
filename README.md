# Fenix Valley

Portal digital do ecossistema de inovacao, tecnologia e empreendedorismo de Betim.

O Fenix Valley conecta empreendedores, startups, universidades, estudantes, mentores,
investidores, empresas, poder publico e instituicoes de apoio para fortalecer uma
economia local mais diversa, tecnologica e colaborativa.

## Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Componentes no estilo shadcn/ui
- React Hook Form
- TanStack Query
- TanStack Table
- Motion
- GSAP

## Desenvolvimento

Instale as dependencias:

```bash
corepack enable
yarn install
```

Execute o servidor local:

```bash
yarn dev
```

Abra:

```text
http://127.0.0.1:3000
```

## Scripts

```bash
yarn dev
yarn build
yarn start
yarn lint
yarn preview
yarn deploy
yarn upload
yarn cf-typegen
```

## Deploy Cloudflare Workers

O projeto esta configurado para deploy via OpenNext Cloudflare.

Arquivos principais:

- `wrangler.jsonc`
- `open-next.config.ts`
- `.dev.vars`
- `public/_headers`

Preview no runtime da Cloudflare:

```bash
yarn preview
```

Deploy:

```bash
yarn deploy
```

Gerar tipos de bindings:

```bash
yarn cf-typegen
```

## Backlog

O backlog inicial do produto esta em [`docs/backlog`](docs/backlog/README.md).

O projeto usa Yarn Berry (`packageManager` fixado no `package.json`) com
`nodeLinker: node-modules` para compatibilidade com Next.js, OpenNext e Wrangler.

## Licenca

Este projeto esta licenciado sob a Affero General Public License 2.0.
Consulte [`LICENSE`](LICENSE).
