"use client";

import { useState } from "react";
import { SiteHeader } from "@/components/sections/site-header";
import { SiteFooter } from "@/components/sections/site-footer";
import { Loader2 } from "lucide-react";

export default function FacaPartePage() {
  const [loading, setLoading] = useState(true);

  // Link do Google Form (substitua por seu próprio link do formulário do Google se necessário)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfD_lS_bJwqD5H8l2Hq4KqB_s4e_tB44dJ7H_l7q15Z0_5-1w/viewform?embedded=true";

  return (
    <>
      <SiteHeader />
      <main className="min-h-screen py-10 sm:py-16">
        <div className="section-shell max-w-4xl">
          <div className="text-center space-y-4 mb-10">
            <h1 className="font-[var(--font-space)] text-3xl font-black text-slate-900 sm:text-4xl">
              Faça Parte do Ecossistema
            </h1>
            <p className="text-lg leading-8 text-slate-500 max-w-2xl mx-auto">
              Preencha o formulário abaixo para cadastrar seu interesse e conectar sua proposta ao movimento de inovação de Betim.
            </p>
          </div>

          <div className="relative surface-panel rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-xl min-h-[600px] flex items-center justify-center">
            {loading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-50/50 backdrop-blur-sm z-10 transition-opacity duration-300">
                <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
                <p className="mt-4 text-sm font-semibold text-slate-500">
                  Carregando formulário...
                </p>
              </div>
            )}
            <iframe
              src={googleFormUrl}
              title="Formulário de cadastro Faça Parte"
              width="100%"
              height="800"
              frameBorder="0"
              marginHeight={0}
              marginWidth={0}
              onLoad={() => setLoading(false)}
              className="w-full border-0 transition-opacity duration-300"
              style={{ opacity: loading ? 0 : 1 }}
            >
              Carregando…
            </iframe>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
