import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/components/ui/motion";
import { JoinForm } from "./join-form";

export function JoinSection() {
  return (
    <section id="participar" className="warm-band border-y border-slate-200 py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <FadeIn className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Participar</p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
            Respeito, colaboração e propósito como regra de entrada.
          </h2>
          <p className="text-lg leading-8 text-slate-600">
            A comunidade é para quem acredita que Betim pode construir uma nova economia baseada
            em tecnologia, inovação e empreendedorismo.
          </p>
          <div className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-6 text-slate-600">
              Spam, conteúdos ofensivos e divulgações sem relação com a proposta do grupo ficam fora.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="secondary">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Convite do grupo
              </Link>
            </Button>
            <Button asChild variant="ghost">
              <Link href="/voluntarie-se">Quero ser voluntário(a)</Link>
            </Button>
          </div>
        </FadeIn>
        <div className="rounded-lg border border-slate-800 bg-slate-950 p-5 text-white shadow-crisp sm:p-7">
          <JoinForm />
        </div>
      </div>
    </section>
  );
}
