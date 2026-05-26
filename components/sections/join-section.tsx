import Link from "next/link";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { JoinForm } from "./join-form";

export function JoinSection() {
  return (
    <section id="participar" className="border-y bg-white py-16 sm:py-20">
      <div className="section-shell grid gap-10 lg:grid-cols-[.85fr_1.15fr] lg:items-start">
        <div className="space-y-6">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Participar</p>
          <h2 className="font-[var(--font-space)] text-3xl font-black leading-tight sm:text-4xl">
            Respeito, colaboração e propósito como regra de entrada.
          </h2>
          <p className="text-lg leading-8 text-muted-foreground">
            A comunidade é para quem acredita que Betim pode construir uma nova economia baseada
            em tecnologia, inovação e empreendedorismo.
          </p>
          <div className="flex items-start gap-3 rounded-lg border bg-background p-4">
            <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
            <p className="text-sm leading-6 text-muted-foreground">
              Spam, conteúdos ofensivos e divulgações sem relação com a proposta do grupo ficam fora.
            </p>
          </div>
          <Button asChild variant="secondary">
            <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Convite do grupo
            </Link>
          </Button>
        </div>
        <div className="rounded-lg border bg-background p-5 shadow-crisp sm:p-7">
          <JoinForm />
        </div>
      </div>
    </section>
  );
}
