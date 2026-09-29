import type { ReactNode } from "react";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { editorialThemeStyle } from "./theme";

// Casca padrão das páginas públicas: aplica o tema editorial (white + azul forte)
// com o Header e Footer completos da main.
// Nota: MotionConfig já é provido globalmente pelo Providers no layout raiz.
export function EditorialShell({
  children
}: {
  children: ReactNode;
  active?: string;
}) {
  return (
    <div className="flex min-h-screen flex-col font-body" style={editorialThemeStyle}>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
