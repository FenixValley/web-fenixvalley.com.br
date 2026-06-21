import type { ReactNode } from "react";
import { EditorialFooter } from "./editorial-footer";
import { EditorialHeader } from "./editorial-header";
import { editorialThemeStyle } from "./theme";

// Casca padrão das páginas públicas: aplica o tema editorial (white + azul forte)
// e a navegação compartilhada. Escopo local enquanto a migração não cobre o site
// inteiro — rotas ainda não migradas seguem com o tema antigo.
export function EditorialShell({
  children,
  active
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col font-body" style={editorialThemeStyle}>
      <EditorialHeader active={active} />
      <main className="flex-1">{children}</main>
      <EditorialFooter />
    </div>
  );
}
