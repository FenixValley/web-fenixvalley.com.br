import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { contentTracks, newsItems, partnerBands } from "@/data/ecosystem";

export function ContentCommunitySection() {
  return (
    <section className="light-band border-y border-slate-200 py-16 sm:py-20">
      <div className="section-shell space-y-12">
        <div className="grid gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div className="space-y-4">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-secondary">Conteúdo e comunidade</p>
            <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              Um portal para acompanhar o que acontece e aprender com quem está construindo.
            </h2>
            <p className="text-lg leading-8 text-slate-600">
              Notícias, guias, histórias e trilhas dão continuidade à comunidade entre eventos,
              programas e conexões presenciais.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {contentTracks.map((track) => {
              const Icon = track.icon;
              return (
                <article key={track.title} className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                  <Icon className="mb-5 h-6 w-6 text-primary" />
                  <h3 className="font-[var(--font-space)] text-lg font-bold text-slate-950">{track.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">{track.description}</p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-crisp sm:p-6">
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="font-[var(--font-space)] text-2xl font-black text-slate-950">Atualizações recentes</h3>
              <Link href="#participar" className="hidden items-center gap-2 text-sm font-bold text-secondary hover:text-blue-700 sm:inline-flex">
                Enviar pauta
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="divide-y divide-slate-200">
              {newsItems.map((item) => (
                <article key={item.title} className="py-4 first:pt-0 last:pb-0">
                  <h4 className="font-bold text-slate-950">{item.title}</h4>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-crisp sm:p-6">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-orange-300">Parceiros</p>
            <h3 className="mt-4 font-[var(--font-space)] text-2xl font-black">Quem sustenta o movimento aparece aqui.</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              A vitrine de parceiros deve destacar apoio institucional, tecnológico, acadêmico,
              empresarial e financeiro com critérios claros.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {partnerBands.map((partner) => (
                <div key={partner} className="rounded-md border border-white/10 bg-white/5 px-3 py-3 text-xs font-semibold text-slate-200">
                  {partner}
                </div>
              ))}
            </div>
            <Button asChild className="mt-6 w-full">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Entrar na comunidade
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
