import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { fraunces } from "@/app/fonts";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { PretextHeadline } from "@/components/pretext/pretext-headline";

export default function NotFound() {
  return (
    <EditorialShell>
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-[-20%] z-0"
          style={{
            background:
              "radial-gradient(50% 60% at 80% 0%, rgba(27,59,255,0.12), transparent 70%), radial-gradient(40% 50% at 10% 100%, rgba(56,189,248,0.08), transparent 72%)"
          }}
        />
        <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 py-24 sm:px-10 sm:py-32">
          <EditorialReveal>
            <p className="font-mono text-[12px] uppercase tracking-[0.34em]" style={{ color: "var(--fx-accent)" }}>
              Erro 404
            </p>
          </EditorialReveal>

          <div className="mt-6 max-w-[820px]">
            <PretextHeadline
              text="Esta página ainda não renasceu."
              fontFamily={fraunces.style.fontFamily}
              weight={600}
              accent="renasceu"
              sizeRatio={0.1}
              minSize={34}
              maxSize={74}
              leading={0.94}
            />
          </div>

          <EditorialReveal delay={0.2}>
            <p className="mt-7 max-w-[52ch] font-body text-[18px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
              O endereço que você procurou não existe ou mudou de lugar. Volte para a home ou
              explore o mapa do ecossistema.
            </p>
          </EditorialReveal>

          <EditorialReveal delay={0.3}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/"
                className="group inline-flex items-center gap-3 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                style={{ background: "var(--fx-accent)", color: "#ffffff" }}
              >
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
                Voltar para a home
              </Link>
              <Link
                href="/mapa"
                className="group inline-flex items-center gap-3 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: "1px solid rgba(10,16,32,0.20)", color: "var(--fx-ink)" }}
              >
                Abrir o mapa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </EditorialReveal>
        </div>
      </section>
    </EditorialShell>
  );
}
