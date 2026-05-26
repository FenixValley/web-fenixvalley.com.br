import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

export const metadata: Metadata = {
  title: "Fênix Valley | Betim, Tecnologia e Empreendedorismo",
  description:
    "Comunidade para conectar talentos, startups, universidades, empresas e investidores que querem transformar Betim em um polo de inovação.",
  metadataBase: new URL("https://fenixvalley.com.br"),
  icons: {
    icon: "/logo-fenix-valley.png",
    shortcut: "/logo-fenix-valley.png",
    apple: "/logo-fenix-valley.png"
  },
  openGraph: {
    title: "Fênix Valley",
    description: "Betim renascendo pela inovação.",
    images: ["/logo-fenix-valley.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
