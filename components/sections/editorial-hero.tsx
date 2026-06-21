import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fraunces } from "@/app/fonts";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export function EditorialHero() {
  return (
    <section className="relative overflow-hidden">
      {/* atmosfera — gradientes sutis como no demo do pretext */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-10%] z-0"
        style={{
          background:
            "radial-gradient(62% 54% at 16% 82%, rgba(45,88,128,0.16), transparent 69%), radial-gradient(58% 48% at 86% 10%, rgba(217,119,87,0.20), transparent 70%), linear-gradient(135deg, rgba(217,119,87,0.05) 0%, transparent 42%, rgba(45,88,128,0.05) 100%)"
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-20 pt-16 sm:px-10 sm:pt-24">
        <EditorialReveal>
          <p
            className="font-mono text-[11px] uppercase tracking-[0.34em]"
            style={{ color: "var(--fx-accent)" }}
          >
            O ecossistema de inovação de Betim
          </p>
          <span
            className="mt-3 block h-px w-full"
            style={{ background: "rgba(17,16,13,0.14)" }}
          />
        </EditorialReveal>

        <div className="mt-8">
          <PretextHeadline
            text="Betim renasce como um polo de tecnologia, talento e novos negócios."
            fontFamily={fraunces.style.fontFamily}
            weight={600}
            accent="renasce"
            sizeRatio={0.086}
            minSize={36}
            maxSize={96}
            leading={0.92}
          />
        </div>

        <EditorialReveal delay={0.25}>
          <div className="mt-10 grid gap-x-10 gap-y-6 md:grid-cols-[1.4fr_1fr] md:items-end">
            <div
              className="font-body text-[17px] leading-[1.62] [column-gap:2.5rem] md:[columns:2]"
              style={{ color: "var(--fx-muted)" }}
            >
              <p className="mb-4">
                Startups, universidades, indústrias, investidores e poder público em um só
                movimento. O Fênix Valley conecta quem constrói tecnologia no Vale do Aço de
                Betim — e abre caminho para os próximos negócios da região.
              </p>
              <p>
                Um mapa vivo do que está sendo criado aqui, com programas, oportunidades e uma
                comunidade que cresce a cada semana.
              </p>
            </div>

            <div className="flex flex-col gap-3 md:items-end">
              <Link
                href="/mapa"
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ background: "var(--fx-ink)", color: "var(--fx-paper)" }}
              >
                Explorar o mapa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/#participar"
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: "1px solid rgba(17,16,13,0.22)", color: "var(--fx-ink)" }}
              >
                Faça parte
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </EditorialReveal>
      </div>
    </section>
  );
}
