## Contexto

O portal precisa de uma base tecnica consistente para evoluir com Next.js, Tailwind, shadcn/ui, React Hook Form, TanStack Table, TanStack Query, Motion e GSAP.

## Escopo

- Migrar o projeto de npm para Yarn.
- Definir `packageManager` no `package.json`.
- Remover `package-lock.json` depois que `yarn.lock` estiver gerado.
- Padronizar scripts `yarn dev`, `yarn build`, `yarn lint`, `yarn test`.
- Configurar CI para instalar com Yarn e validar lint/build/test.
- Adicionar aliases, ESLint, TypeScript strict e checks de qualidade.
- Documentar setup local no README.
- Preparar estrutura de env vars para integrações futuras.

## Criterios de aceite

- `yarn install` gera lockfile reproduzivel.
- `yarn build` passa em ambiente limpo.
- README tem instrucoes de instalacao, execucao e convencoes.
- CI falha se build ou lint quebrarem.
