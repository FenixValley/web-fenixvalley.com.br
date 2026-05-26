import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { metrics } from "@/data/ecosystem";
import { BrandMotion } from "./brand-motion";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pb-14 pt-10 sm:pb-20 sm:pt-14">
      <div className="brand-grid absolute inset-x-0 top-0 h-[520px]" aria-hidden="true" />
      <div className="section-shell relative grid items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
        <div className="space-y-8">
          <Badge variant="outline" className="bg-white/75">
            Betim, Tecnologia e Empreendedorismo
          </Badge>
          <div className="space-y-5">
            <Image
              src="/logo-fenix-valley.svg"
              alt="Fênix Valley"
              width={560}
              height={420}
              priority
              className="h-auto w-full max-w-[480px]"
            />
            <h1 className="max-w-3xl font-[var(--font-space)] text-4xl font-black leading-tight tracking-normal text-balance sm:text-5xl lg:text-6xl">
              Betim renascendo pela inovação.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Uma comunidade para conectar talentos, startups, empreendedores, universidades,
              empresas e investidores na construção de uma economia mais tecnológica,
              diversificada e forte.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
                <MessageCircle className="h-5 w-5" />
                Entrar no WhatsApp
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="#oportunidades">
                Ver oportunidades
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            {metrics.map((metric) => (
              <div key={metric.label} className="border-l-4 border-primary bg-white/70 p-4 shadow-sm">
                <div className="font-[var(--font-space)] text-3xl font-black text-secondary">
                  {metric.value}
                </div>
                <div className="text-sm font-bold">{metric.label}</div>
                <div className="mt-1 text-xs leading-5 text-muted-foreground">{metric.detail}</div>
              </div>
            ))}
          </div>
        </div>
        <BrandMotion />
      </div>
    </section>
  );
}
