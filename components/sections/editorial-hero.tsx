import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { fraunces } from "@/app/fonts";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { InfiniteMarquee } from "@/components/ui/infinite-marquee";

export function EditorialHero() {
  return (
    <section className="relative overflow-hidden">
      {/* atmosfera — gradientes sutis como no demo do pretext */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[-10%] z-0"
        style={{
          background:
            "radial-gradient(58% 50% at 84% 8%, rgba(27,59,255,0.16), transparent 68%), radial-gradient(60% 52% at 12% 88%, rgba(27,59,255,0.10), transparent 70%), radial-gradient(40% 40% at 70% 60%, rgba(56,189,248,0.10), transparent 72%), linear-gradient(135deg, rgba(27,59,255,0.05) 0%, transparent 46%, rgba(27,59,255,0.04) 100%)"
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-6 pb-16 pt-16 sm:px-10 sm:pt-24">
        <EditorialReveal>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p
              className="font-mono text-[11px] uppercase tracking-[0.34em]"
              style={{ color: "var(--fx-accent)" }}
            >
              O ecossistema de inovação de Betim
            </p>
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] shadow-sm"
              style={{
                borderColor: "var(--fx-line)",
                background: "rgba(255,255,255,0.75)",
                backdropFilter: "blur(8px)"
              }}
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1b3bff] opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1b3bff]" />
              </span>
              <span style={{ color: "var(--fx-ink)", fontWeight: 500 }}>Rede Ativa em Betim</span>
            </div>
          </div>
          <span
            className="mt-4 block h-px w-full"
            style={{ background: "var(--fx-line)" }}
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
                movimento. O Fênix Valley conecta quem constrói tecnologia no polo de
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
                className="group inline-flex items-center justify-between gap-6 rounded-full px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] shadow-sm transition-all hover:scale-[1.03] hover:shadow-[0_4px_20px_rgba(27,59,255,0.25)]"
                style={{ background: "var(--fx-accent)", color: "#ffffff" }}
              >
                Explorar o mapa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/#participar"
                className="group inline-flex items-center justify-between gap-6 rounded-full border px-6 py-3.5 font-mono text-[12px] uppercase tracking-[0.18em] transition-all hover:scale-[1.03] hover:bg-white"
                style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)", background: "var(--fx-paper)" }}
              >
                Faça parte
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </EditorialReveal>
      </div>

      <InfiniteMarquee />
    </section>
  );
}
