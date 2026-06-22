import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

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
    <html lang="pt-BR" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <script
          dangerouslySetInnerHTML={{
            __html: `try{if(localStorage.getItem("fenix-theme")==="light"){document.documentElement.classList.add("theme-light")}}catch(e){}`
          }}
        />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
