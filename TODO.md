# TODO - Web Fênix Valley

## Status Geral: Todas as Issues Fechadas com Sucesso

- [x] **#28 (Bug)**: `yarn seed:admin` falha no Windows (`spawnSync yarn ENOENT`) — resolvido com detecção de plataforma e `yarn.cmd`.
- [x] **#29 (Bug)**: `StatusBadge` usa rótulos no feminino para entidades masculinas — resolvido com prop `gender?: "m" | "f"` e dicionários de termos por gênero.
- [x] **#30 (Bug)**: Erro de hidratação na home (`BrandMotion`) — resolvido com eliminação do ternário de hidratação e configuração unificada via `<MotionConfig reducedMotion="user">`.
- [x] **#31 (Enhancement)**: Acessibilidade: widget VLibras oficial, skip link `#main-content` e `@media (prefers-reduced-motion: reduce)` consistente em todo o CSS e Motion.
- [x] **#26 (Enhancement)**: Migração de cores hardcoded para tokens semânticos do design system (`text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, etc.).
- [x] **#16 (Epic)**: Conteúdos, newsletter e comunidade — catálogo de artigos (`/conteudos`), páginas individuais (`/conteudos/[slug]`), botões de compartilhamento social e página oficial de comunidade (`/comunidade`).
- [x] **#15 (Epic)**: Área do membro e busca inteligente — autenticação de membros (`/login`, `/cadastro`), painel do usuário (`/membro`), acompanhamento de propostas, inscrições e voluntariado, favoritos no banco D1 (`user_favorites`) e busca global categorizada no cabeçalho (`/api/search`).
