import Link from "next/link";
import { ArrowLeft, MapPinned } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="brand-grid absolute inset-x-0 top-0 h-96 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-2xl space-y-6 text-center">
            <p className="font-[var(--font-space)] text-7xl font-black text-orange-300">404</p>
            <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
              Esta página ainda não renasceu.
            </h1>
            <p className="text-lg leading-8 text-slate-300">
              O endereço que você procurou não existe ou mudou de lugar. Volte para a home ou
              explore o mapa do ecossistema.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild>
                <Link href="/">
                  <ArrowLeft className="h-4 w-4" />
                  Voltar para a home
                </Link>
              </Button>
              <Button asChild variant="ghost">
                <Link href="/mapa">
                  <MapPinned className="h-4 w-4" />
                  Abrir o mapa
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
