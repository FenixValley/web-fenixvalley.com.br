import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Faça Parte | Fênix Valley",
  description:
    "Cadastre seu interesse e conecte sua proposta ao ecossistema de inovação de Betim."
};

export default function FacaParteLayout({ children }: { children: React.ReactNode }) {
  return children;
}
