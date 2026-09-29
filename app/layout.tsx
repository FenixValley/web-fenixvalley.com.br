import type { Metadata } from "next";
import "./globals.css";
import { fontVariables } from "./fonts";
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

import { VLibras } from "@/components/accessibility/vlibras";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning className={fontVariables}>
      <body className="min-h-screen font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("fenix-theme")==="light"){document.documentElement.classList.add("theme-light")}}catch(e){}`
          }}
        />
        <Providers>
          {children}
          <VLibras />
        </Providers>
      </body>
    </html>
  );
}
