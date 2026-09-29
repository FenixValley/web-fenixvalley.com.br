import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { fraunces } from "@/app/fonts";
import { Aurora } from "@/components/editorial/aurora";
import { PretextHeadline } from "@/components/pretext/pretext-headline";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { NewsletterForm } from "./newsletter-form";

export function EditorialJoin() {
  return (
    <section id="participar" className="mx-auto w-full max-w-[1180px] px-6 pb-24 pt-8 sm:px-10">
      <div
        className="relative overflow-hidden rounded-3xl border px-7 py-12 sm:px-12 sm:py-16"
        style={{ borderColor: "var(--fx-line)", background: "var(--fx-ink)" }}
      >
        <Aurora />

        <div
          className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-12"
          style={{ color: "#ffffff" }}
        >
          {/* Left Column: Movement & Community */}
          <div>
            <EditorialReveal>
              <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.34em]" style={{ color: "#9db0ff" }}>
                Faça parte do movimento
              </p>
            </EditorialReveal>
            <PretextHeadline
              text="Betim renasce com quem coloca a mão na massa."
              fontFamily={fraunces.style.fontFamily}
              weight={600}
              level={2}
              accent="mão na massa"
              sizeRatio={0.072}
              minSize={28}
              maxSize={48}
              leading={1.02}
            />
            <EditorialReveal delay={0.2}>
              <p className="mt-5 max-w-[50ch] font-body text-[16px] leading-[1.6]" style={{ color: "rgba(255,255,255,0.76)" }}>
                Entre na comunidade oficial, conecte-se com fundadores, cadastre sua organização no mapa e participe ativamente da construção do polo de inovação de Betim.
              </p>
            </EditorialReveal>
            <EditorialReveal delay={0.3}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] transition-transform hover:scale-[1.03]"
                  style={{ background: "var(--fx-accent)", color: "#ffffff" }}
                >
                  <MessageCircle className="h-4 w-4" />
                  Comunidade no WhatsApp
                </a>
                <Link
                  href="/mapa"
                  className="group inline-flex items-center gap-2.5 rounded-full px-6 py-3 font-mono text-[12px] uppercase tracking-[0.16em] transition-colors hover:bg-white/10"
                  style={{ border: "1px solid rgba(255,255,255,0.28)", color: "#ffffff" }}
                >
                  Cadastrar no mapa
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </EditorialReveal>
          </div>

          {/* Right Column: Radar da Inovação / Newsletter Card */}
          <EditorialReveal delay={0.25}>
            <div className="rounded-2xl border border-white/15 bg-white/[0.06] p-6 backdrop-blur-md sm:p-8">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-[#9db0ff]">
                <span className="inline-block h-2 w-2 rounded-full bg-[#1b3bff] shadow-[0_0_8px_#1b3bff]" />
                Radar da Inovação
              </div>
              <h3 className="mt-3 font-serif text-2xl font-semibold text-white tracking-tight">
                Receba novidades e editais
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70 mb-6">
                Oportunidades de fomento, novos programas, chamadas de inovação e eventos do ecossistema direto no seu e-mail. Sem spam.
              </p>
              <NewsletterForm />
            </div>
          </EditorialReveal>
        </div>
      </div>
    </section>
  );
}
