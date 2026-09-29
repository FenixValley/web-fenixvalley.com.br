import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Linkedin,
  Mail,
  MapPin,
  MapPinned,
  MessageCircle,
  PlayCircle,
  Star
} from "lucide-react";
import { actors } from "@/db/schema";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import { MotionCard } from "@/components/editorial/motion-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { parseActorDetails } from "@/lib/actor-details";
import { getDb } from "@/lib/db";
import {
  actorTypeLabels,
  type InstitutionDetails,
  type InvestorDetails,
  type MentorDetails,
  type SpaceDetails,
  type StartupDetails
} from "@/lib/schemas";

export const dynamic = "force-dynamic";

async function getApprovedActor(slug: string) {
  return getDb().query.actors.findFirst({
    where: and(eq(actors.slug, slug), eq(actors.status, "approved"))
  });
}

function whatsappLink(value: string): string {
  const digits = value.replace(/\D/g, "");
  const withCountryCode = digits.length <= 11 ? `55${digits}` : digits;
  return `https://wa.me/${withCountryCode}`;
}

function isHttpUrl(value: string): boolean {
  try {
    const protocol = new URL(value).protocol;
    return protocol === "https:" || protocol === "http:";
  } catch {
    return false;
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const actor = await getApprovedActor(slug);
  if (!actor) return { title: "Ator não encontrado | Fênix Valley" };
  return {
    title: `${actor.name} | Mapa Fênix Valley`,
    description: actor.description,
    openGraph: {
      title: `${actor.name} | Fênix Valley`,
      description: actor.description,
      images: ["/logo-simbolo.png"]
    }
  };
}

export default async function ActorProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const actor = await getApprovedActor(slug);
  if (!actor) notFound();

  const typeLabel = actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type;
  const parsedDetails = parseActorDetails(actor.type, actor.details);
  const details = actor.type === "startup" ? (parsedDetails as StartupDetails | null) : null;
  const institutionDetails =
    actor.type === "universidade" || actor.type === "escola-tecnica"
      ? (parsedDetails as InstitutionDetails | null)
      : null;
  const mentorDetails = actor.type === "mentor" ? (parsedDetails as MentorDetails | null) : null;
  const investorDetails =
    actor.type === "investidor" || actor.type === "aceleradora" ? (parsedDetails as InvestorDetails | null) : null;
  const spaceDetails =
    actor.type === "coworking" || actor.type === "laboratorio" || actor.type === "hub"
      ? (parsedDetails as SpaceDetails | null)
      : null;

  return (
    <EditorialShell active="/mapa">
      <PageHeader kicker={typeLabel} title={actor.name} />

      <section className="mx-auto w-full max-w-[1180px] px-6 pb-20 pt-12 sm:px-10">
        <EditorialReveal>
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: "var(--fx-muted)" }}
          >
            <Link href="/" className="transition-colors hover:text-[color:var(--fx-accent)]">
              Início
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <Link href="/mapa" className="transition-colors hover:text-[color:var(--fx-accent)]">
              Mapa do ecossistema
            </Link>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span style={{ color: "var(--fx-ink)" }}>{actor.name}</span>
          </nav>
        </EditorialReveal>

        <div className="mt-10 grid gap-x-12 gap-y-10 md:grid-cols-[1.5fr_1fr] md:items-start">
          <EditorialReveal delay={0.1}>
            <div className="max-w-[58ch] space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" style={{ borderColor: "var(--fx-accent)", background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}>
                  {typeLabel}
                </Badge>
                {actor.featured ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold" style={{ color: "var(--fx-accent)" }}>
                    <Star className="h-3.5 w-3.5" style={{ fill: "var(--fx-accent)" }} />
                    {actor.highlightLabel ?? "Destaque"}
                  </span>
                ) : null}
              </div>
              <p
                className="flex items-center gap-2 font-mono text-[12px] uppercase tracking-[0.18em]"
                style={{ color: "var(--fx-muted)" }}
              >
                <MapPin className="h-4 w-4" style={{ color: "var(--fx-accent)" }} aria-hidden="true" />
                {actor.neighborhood}, Betim · {actor.segment}
              </p>
              <p className="font-body text-[18px] leading-[1.7]" style={{ color: "var(--fx-ink)" }}>
                {actor.description}
              </p>
            </div>

            {details ? (
              <div className="mt-8 space-y-5 rounded-lg border p-6" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
                <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>Ficha da startup</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {details.foundedYear ? <FactItem label="Fundação" value={details.foundedYear} /> : null}
                  {details.stage ? <FactItem label="Estágio" value={details.stage} /> : null}
                  {details.businessModel ? <FactItem label="Modelo de negócio" value={details.businessModel} /> : null}
                </div>
                {details.founders ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>Fundadores</p>
                    <p className="text-sm leading-6 whitespace-pre-line" style={{ color: "var(--fx-ink)" }}>{details.founders}</p>
                  </div>
                ) : null}
                {details.techFocus?.length ? <TagList label="Foco tecnológico" items={details.techFocus} /> : null}
                {details.needs?.length ? <TagList label="Buscando" items={details.needs} /> : null}
                {details.pitchVideoUrl || details.linkedin ? (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {details.pitchVideoUrl ? (
                      <Button asChild size="sm" variant="outline" style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}>
                        <a href={details.pitchVideoUrl} target="_blank" rel="noreferrer">
                          <PlayCircle className="mr-2 h-4 w-4" />
                          Assistir pitch
                        </a>
                      </Button>
                    ) : null}
                    {details.linkedin ? (
                      <Button asChild size="sm" variant="outline" style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}>
                        <a href={details.linkedin} target="_blank" rel="noreferrer">
                          <Linkedin className="mr-2 h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {institutionDetails ? (
              <div className="mt-8 space-y-5 rounded-lg border p-6" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
                <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>Ficha da instituição</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {institutionDetails.courses ? <LineList label="Cursos" value={institutionDetails.courses} /> : null}
                  {institutionDetails.labs ? <LineList label="Laboratórios" value={institutionDetails.labs} /> : null}
                  {institutionDetails.researchLines ? <LineList label="Linhas de pesquisa" value={institutionDetails.researchLines} /> : null}
                  {institutionDetails.extensionPrograms ? <LineList label="Programas de extensão" value={institutionDetails.extensionPrograms} /> : null}
                  {institutionDetails.partnerships ? <LineList label="Parcerias" value={institutionDetails.partnerships} /> : null}
                </div>
              </div>
            ) : null}

            {mentorDetails ? (
              <div className="mt-8 space-y-5 rounded-lg border p-6" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
                <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>Ficha do mentor</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mentorDetails.format ? <FactItem label="Formato" value={mentorDetails.format} /> : null}
                  {mentorDetails.availability ? <FactItem label="Disponibilidade" value={mentorDetails.availability} /> : null}
                </div>
                {mentorDetails.specialties ? <LineList label="Especialidades / temas" value={mentorDetails.specialties} /> : null}
                {mentorDetails.experience ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>Experiência</p>
                    <p className="text-sm leading-6 whitespace-pre-line" style={{ color: "var(--fx-ink)" }}>{mentorDetails.experience}</p>
                  </div>
                ) : null}
                {mentorDetails.supportedProjects ? <LineList label="Projetos apoiados" value={mentorDetails.supportedProjects} /> : null}
                {mentorDetails.linkedin ? (
                  <div className="pt-1">
                    <Button asChild size="sm" variant="outline" style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}>
                      <a href={mentorDetails.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {investorDetails ? (
              <div className="mt-8 space-y-5 rounded-lg border p-6" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
                <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>Ficha do investidor</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {investorDetails.stage ? <FactItem label="Estágio de interesse" value={investorDetails.stage} /> : null}
                  {investorDetails.region ? <FactItem label="Região de atuação" value={investorDetails.region} /> : null}
                </div>
                {investorDetails.thesis ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>Tese de investimento</p>
                    <p className="text-sm leading-6 whitespace-pre-line" style={{ color: "var(--fx-ink)" }}>{investorDetails.thesis}</p>
                  </div>
                ) : null}
                {investorDetails.segments ? <LineList label="Segmentos de interesse" value={investorDetails.segments} /> : null}
                {investorDetails.requirements ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>Requisitos para aplicar</p>
                    <p className="text-sm leading-6 whitespace-pre-line" style={{ color: "var(--fx-ink)" }}>{investorDetails.requirements}</p>
                  </div>
                ) : null}
                {investorDetails.linkedin ? (
                  <div className="pt-1">
                    <Button asChild size="sm" variant="outline" style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}>
                      <a href={investorDetails.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {spaceDetails ? (
              <div className="mt-8 space-y-5 rounded-lg border p-6" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
                <h2 className="font-display text-lg font-bold" style={{ color: "var(--fx-ink)" }}>Ficha do espaço</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {spaceDetails.capacity ? <FactItem label="Capacidade" value={spaceDetails.capacity} /> : null}
                  {spaceDetails.usageType ? <FactItem label="Tipo de uso" value={spaceDetails.usageType} /> : null}
                  {spaceDetails.hours ? <FactItem label="Horário de funcionamento" value={spaceDetails.hours} /> : null}
                </div>
                {spaceDetails.amenities ? <LineList label="Estrutura disponível" value={spaceDetails.amenities} /> : null}
                {spaceDetails.rules ? (
                  <div className="space-y-1.5">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>Regras de uso</p>
                    <p className="text-sm leading-6 whitespace-pre-line" style={{ color: "var(--fx-ink)" }}>{spaceDetails.rules}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              {actor.email ? (
                <Button asChild style={{ background: "var(--fx-accent)", color: "#fff" }}>
                  <a href={`mailto:${actor.email}`}>
                    <Mail className="mr-2 h-4 w-4" />
                    Entrar em contato
                  </a>
                </Button>
              ) : null}
              {actor.site && isHttpUrl(actor.site) ? (
                <Button asChild variant={actor.email ? "outline" : "default"} style={actor.email ? { borderColor: "var(--fx-line)", color: "var(--fx-ink)" } : { background: "var(--fx-accent)", color: "#fff" }}>
                  <a href={actor.site} target="_blank" rel="noreferrer">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Visitar site
                  </a>
                </Button>
              ) : null}
              {actor.whatsapp ? (
                <Button asChild variant="outline" style={{ borderColor: "var(--fx-line)", color: "var(--fx-ink)" }}>
                  <a href={whatsappLink(actor.whatsapp)} target="_blank" rel="noreferrer">
                    <MessageCircle className="mr-2 h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              ) : null}
            </div>
          </EditorialReveal>

          <MotionCard
            delay={0.2}
            className="flex flex-col gap-3 border p-6"
            style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
          >
            <aside className="flex flex-col gap-3">
              <p
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: "var(--fx-accent)" }}
              >
                Contato
              </p>

              {actor.email ? (
                <a
                  href={`mailto:${actor.email}`}
                  className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={{ background: "var(--fx-accent)", color: "#ffffff" }}
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Entrar em contato
                  </span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}

              {actor.site && isHttpUrl(actor.site) ? (
                <a
                  href={actor.site}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                  style={
                    actor.email
                      ? { border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }
                      : { background: "var(--fx-accent)", color: "#ffffff" }
                  }
                >
                  Visitar site
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ) : null}

              <Link
                href="/mapa"
                className="group inline-flex items-center justify-between gap-6 px-5 py-3 font-mono text-[13px] uppercase tracking-[0.18em] transition-colors"
                style={{ border: "1px solid var(--fx-line)", color: "var(--fx-ink)" }}
              >
                <span className="inline-flex items-center gap-2">
                  <MapPinned className="h-4 w-4" aria-hidden="true" />
                  Ver no mapa
                </span>
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>

              {!actor.email && !actor.site ? (
                <p className="font-body text-[14px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                  Esta organização ainda não informou canais de contato. Fale com a coordenação em{" "}
                  <Link href="/contato" className="underline transition-colors hover:text-[color:var(--fx-accent)]">
                    /contato
                  </Link>{" "}
                  para chegar até ela.
                </p>
              ) : null}
            </aside>
          </MotionCard>
        </div>
      </section>
    </EditorialShell>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>{label}</p>
      <p className="text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>{value}</p>
    </div>
  );
}

function LineList({ label, value }: { label: string; value: string }) {
  const items = value
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
  if (items.length === 0) return null;
  return (
    <div className="space-y-1.5">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>{label}</p>
      <ul className="space-y-1 text-sm leading-6" style={{ color: "var(--fx-ink)" }}>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function TagList({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em]" style={{ color: "var(--fx-muted)" }}>{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)", color: "var(--fx-muted)" }}>
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
