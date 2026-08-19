import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { and, eq } from "drizzle-orm";
import {
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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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

// Números são coletados em formato livre. Local brasileiro (com DDD, sem código do país)
// tem 10 ou 11 dígitos — nesse caso prefixamos +55. Com código do país já tem 12 ou 13
// dígitos (ex.: DDD 55 é válido e não pode ser confundido com o prefixo do Brasil).
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
    <>
      <SiteHeader />
      <main>
        <section className="relative overflow-hidden py-14 sm:py-18">
          <div className="brand-grid absolute inset-x-0 top-0 h-72 opacity-50" aria-hidden="true" />
          <div className="section-shell relative max-w-3xl space-y-8">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-400">
              <Link href="/" className="hover:text-orange-200">
                Início
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <Link href="/mapa" className="hover:text-orange-200">
                Mapa do ecossistema
              </Link>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="font-semibold text-slate-200">{actor.name}</span>
            </nav>

            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="outline" className="border-orange-300/40 bg-orange-500/10 text-orange-300">
                  {typeLabel}
                </Badge>
                {actor.featured ? (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-300">
                    <Star className="h-3.5 w-3.5 fill-amber-300" />
                    {actor.highlightLabel ?? "Destaque"}
                  </span>
                ) : null}
              </div>
              <h1 className="font-[var(--font-space)] text-3xl font-black leading-tight text-white sm:text-4xl">
                {actor.name}
              </h1>
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <MapPin className="h-4 w-4 text-emerald-300" />
                {actor.neighborhood}, Betim · {actor.segment}
              </p>
            </div>

            <div className="surface-panel rounded-lg p-6">
              <p className="text-base leading-8 text-slate-300">{actor.description}</p>
            </div>

            {details ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha da startup</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {details.foundedYear ? (
                    <FactItem label="Fundação" value={details.foundedYear} />
                  ) : null}
                  {details.stage ? <FactItem label="Estágio" value={details.stage} /> : null}
                  {details.businessModel ? (
                    <FactItem label="Modelo de negócio" value={details.businessModel} />
                  ) : null}
                </div>
                {details.founders ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Fundadores</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{details.founders}</p>
                  </div>
                ) : null}
                {details.techFocus?.length ? (
                  <TagList label="Foco tecnológico" items={details.techFocus} />
                ) : null}
                {details.needs?.length ? <TagList label="Buscando" items={details.needs} /> : null}
                {details.pitchVideoUrl || details.linkedin ? (
                  <div className="flex flex-wrap gap-3 pt-1">
                    {details.pitchVideoUrl ? (
                      <Button asChild size="sm" variant="ghost">
                        <a href={details.pitchVideoUrl} target="_blank" rel="noreferrer">
                          <PlayCircle className="h-4 w-4" />
                          Assistir pitch
                        </a>
                      </Button>
                    ) : null}
                    {details.linkedin ? (
                      <Button asChild size="sm" variant="ghost">
                        <a href={details.linkedin} target="_blank" rel="noreferrer">
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </a>
                      </Button>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ) : null}

            {institutionDetails ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha da instituição</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {institutionDetails.courses ? <LineList label="Cursos" value={institutionDetails.courses} /> : null}
                  {institutionDetails.labs ? <LineList label="Laboratórios" value={institutionDetails.labs} /> : null}
                  {institutionDetails.researchLines ? (
                    <LineList label="Linhas de pesquisa" value={institutionDetails.researchLines} />
                  ) : null}
                  {institutionDetails.extensionPrograms ? (
                    <LineList label="Programas de extensão" value={institutionDetails.extensionPrograms} />
                  ) : null}
                  {institutionDetails.partnerships ? (
                    <LineList label="Parcerias" value={institutionDetails.partnerships} />
                  ) : null}
                </div>
              </div>
            ) : null}

            {mentorDetails ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha do mentor</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {mentorDetails.format ? <FactItem label="Formato" value={mentorDetails.format} /> : null}
                  {mentorDetails.availability ? (
                    <FactItem label="Disponibilidade" value={mentorDetails.availability} />
                  ) : null}
                </div>
                {mentorDetails.specialties ? (
                  <LineList label="Especialidades / temas" value={mentorDetails.specialties} />
                ) : null}
                {mentorDetails.experience ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Experiência</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{mentorDetails.experience}</p>
                  </div>
                ) : null}
                {mentorDetails.supportedProjects ? (
                  <LineList label="Projetos apoiados" value={mentorDetails.supportedProjects} />
                ) : null}
                {mentorDetails.linkedin ? (
                  <div className="pt-1">
                    <Button asChild size="sm" variant="ghost">
                      <a href={mentorDetails.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {investorDetails ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha do investidor</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {investorDetails.stage ? (
                    <FactItem label="Estágio de interesse" value={investorDetails.stage} />
                  ) : null}
                  {investorDetails.region ? <FactItem label="Região de atuação" value={investorDetails.region} /> : null}
                </div>
                {investorDetails.thesis ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Tese de investimento</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{investorDetails.thesis}</p>
                  </div>
                ) : null}
                {investorDetails.segments ? (
                  <LineList label="Segmentos de interesse" value={investorDetails.segments} />
                ) : null}
                {investorDetails.requirements ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Requisitos para aplicar</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{investorDetails.requirements}</p>
                  </div>
                ) : null}
                {investorDetails.linkedin ? (
                  <div className="pt-1">
                    <Button asChild size="sm" variant="ghost">
                      <a href={investorDetails.linkedin} target="_blank" rel="noreferrer">
                        <Linkedin className="h-4 w-4" />
                        LinkedIn
                      </a>
                    </Button>
                  </div>
                ) : null}
              </div>
            ) : null}

            {spaceDetails ? (
              <div className="surface-panel space-y-5 rounded-lg p-6">
                <h2 className="font-[var(--font-space)] text-lg font-bold text-white">Ficha do espaço</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {spaceDetails.capacity ? <FactItem label="Capacidade" value={spaceDetails.capacity} /> : null}
                  {spaceDetails.usageType ? <FactItem label="Tipo de uso" value={spaceDetails.usageType} /> : null}
                  {spaceDetails.hours ? <FactItem label="Horário de funcionamento" value={spaceDetails.hours} /> : null}
                </div>
                {spaceDetails.amenities ? (
                  <LineList label="Estrutura disponível" value={spaceDetails.amenities} />
                ) : null}
                {spaceDetails.rules ? (
                  <div className="space-y-1.5">
                    <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">Regras de uso</p>
                    <p className="text-sm leading-6 text-slate-300 whitespace-pre-line">{spaceDetails.rules}</p>
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="flex flex-wrap gap-3">
              {actor.email ? (
                <Button asChild>
                  <a href={`mailto:${actor.email}`}>
                    <Mail className="h-4 w-4" />
                    Entrar em contato
                  </a>
                </Button>
              ) : null}
              {actor.site && isHttpUrl(actor.site) ? (
                <Button asChild variant={actor.email ? "ghost" : "default"}>
                  <a href={actor.site} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Visitar site
                  </a>
                </Button>
              ) : null}
              {actor.whatsapp ? (
                <Button asChild variant={actor.email || actor.site ? "ghost" : "default"}>
                  <a href={whatsappLink(actor.whatsapp)} target="_blank" rel="noreferrer">
                    <MessageCircle className="h-4 w-4" />
                    WhatsApp
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost">
                <Link href="/mapa">
                  <MapPinned className="h-4 w-4" />
                  Ver no mapa
                </Link>
              </Button>
            </div>

            {!actor.email && !actor.site && !actor.whatsapp ? (
              <p className="text-sm leading-6 text-slate-400">
                Esta organização ainda não informou canais de contato. Fale com a coordenação em{" "}
                <Link href="/contato" className="text-orange-300 hover:text-orange-200">
                  /contato
                </Link>{" "}
                para chegar até ela.
              </p>
            ) : null}
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}

function FactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <p className="text-sm font-semibold text-slate-200">{value}</p>
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
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <ul className="space-y-1 text-sm leading-6 text-slate-300">
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
      <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-500">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Badge key={item} variant="outline" className="border-white/10 bg-white/5 text-slate-300">
            {item}
          </Badge>
        ))}
      </div>
    </div>
  );
}
