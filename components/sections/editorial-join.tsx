import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { fraunces } from "@/app/fonts";
import { LottiePlayer } from "@/components/editorial/lottie-player";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";

export function EditorialJoin() {
  return (
    <section id="participar" className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-8 sm:px-10">
      <div
        className="relative overflow-hidden rounded-3xl border px-7 py-14 sm:px-14 sm:py-20"
        style={{ borderColor: "var(--fx-line)", background: "var(--fx-ink)" }}
      >
        <div className="pointer-events-none absolute -right-16 -top-16 h-80 w-80 opacity-[0.45]">
          <LottiePlayer name="network" className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(60% 80% at 80% 0%, rgba(27,59,255,0.35), transparent 70%)" }} />

        <div className="relative z-10 max-w-[760px]" style={{ color: "#ffffff" }}>
          <EditorialReveal>
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: "#9db0ff" }}>
              Faça parte
            </p>
          </EditorialReveal>
          <PretextHeadline
            text="Betim renasce com quem coloca a mão na massa."
            fontFamily={fraunces.style.fontFamily}
            weight={600}
            level={2}
            accent="mão na massa"
            sizeRatio={0.072}
            minSize={30}
            maxSize={58}
            leading={0.96}
          />
          <EditorialReveal delay={0.2}>
            <p className="mt-6 max-w-[54ch] font-body text-[17px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.74)" }}>
              Entre na comunidade, cadastre sua organização no mapa e participe dos programas e
              chamadas do ecossistema de inovação de Betim.
            </p>
          </EditorialReveal>
          <EditorialReveal delay={0.3}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-[13px] uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                style={{ background: "var(--fx-accent)", color: "#ffffff" }}
              >
                <MessageCircle className="h-4 w-4" />
                Comunidade no WhatsApp
              </a>
              <Link
                href="/mapa"
                className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-[13px] uppercase tracking-[0.16em]"
                style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#ffffff" }}
              >
                Cadastrar no mapa
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
