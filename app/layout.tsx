import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
import { Providers } from "@/components/providers/providers";
import { VLibras } from "@/components/accessibility/vlibras";

export const metadata: Metadata = {
  title: "Fênix Valley | Betim, Tecnologia e Empreendedorismo",
  description:
    "Comunidade para conectar talentos, startups, universidades, empresas e investidores que querem transformar Betim em um polo de inovação.",
  metadataBase: new URL("https://fenixvalley.com.br"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/logo-simbolo.png",
    apple: "/logo-simbolo.png"
  },
  openGraph: {
    title: "Fênix Valley",
    description: "Betim renascendo pela inovação.",
    images: ["/logo-simbolo.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={fontVariables}>
      <body className="min-h-screen font-sans antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground focus:shadow-lg focus:ring-2 focus:ring-primary focus:outline-none"
        >
          Pular para o conteúdo principal
        </a>
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("fenix-theme")==="light"){document.documentElement.classList.add("theme-light")}}catch(e){}`
          }}
        />
        <Providers>
          <div id="main-content" tabIndex={-1} className="outline-none">
            {children}
          </div>
        </Providers>
        <VLibras />
      </body>
    </html>
  );
}
