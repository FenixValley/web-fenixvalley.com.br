"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export default function FacaPartePage() {
  const [loading, setLoading] = useState(true);

  // Link do Google Form (substitua por seu próprio link do formulário do Google se necessário)
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSfD_lS_bJwqD5H8l2Hq4KqB_s4e_tB44dJ7H_l7q15Z0_5-1w/viewform?embedded=true";

  return (
    <EditorialShell>
      <PageHeader
        kicker="Faça parte"
        title="Faça parte do ecossistema"
        accent="ecossistema"
        lede="Preencha o formulário abaixo para cadastrar seu interesse e conectar sua proposta ao movimento de inovação de Betim."
      />
      <section className="mx-auto w-full max-w-[1180px] px-6 py-14 sm:px-10 sm:py-20">
        <EditorialReveal>
          <div
            className="relative flex min-h-[600px] items-center justify-center overflow-hidden rounded-2xl border bg-[var(--fx-paper)] shadow-sm"
            style={{ borderColor: "var(--fx-line)" }}
          >
            {loading && (
              <div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center backdrop-blur-sm transition-opacity duration-300"
                style={{ backgroundColor: "var(--fx-surface)" }}
              >
                <Loader2 className="h-10 w-10 animate-spin" style={{ color: "var(--fx-accent)" }} />
                <p className="mt-4 text-sm font-semibold" style={{ color: "var(--fx-muted)" }}>
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
        </EditorialReveal>
      </section>
    </EditorialShell>
  );
}
