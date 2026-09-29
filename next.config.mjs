import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // ATENÇÃO: as duas linhas abaixo são um par. O hostname curinga só é aceitável
    // porque `unoptimized: true` faz a imagem sair direto na URL informada, sem
    // otimizador atuando como proxy de busca. Se `unoptimized` voltar a ser false,
    // troque o curinga por uma allowlist dos hosts de logo de parceiro antes.
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
