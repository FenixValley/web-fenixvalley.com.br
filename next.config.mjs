import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Sem otimizador no runtime Cloudflare: as imagens saem direto na URL informada.
    // Logos de parceiros são cadastrados pelo admin e podem estar em qualquer host,
    // por isso o padrão remoto é aberto — não há proxy de imagem para ser abusado.
    unoptimized: true,
    remotePatterns: [{ protocol: "https", hostname: "**" }]
  },
  experimental: {
    reactCompiler: false
  }
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}
