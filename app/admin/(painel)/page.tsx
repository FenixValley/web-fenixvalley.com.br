import Link from "next/link";
import { count, eq } from "drizzle-orm";
import {
  actors,
  challengeProposals,
  challenges,
  events,
  leads,
  opportunities,
  partnerApplications,
  volunteers
} from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCounts() {
  const db = getDb();
  // Contagens independentes: em série somariam oito idas ao D1 antes de renderizar.
  const [
    [pendingVolunteers],
    [pendingActors],
    [publishedOpportunities],
    [pendingEvents],
    [pendingChallenges],
    [pendingProposals],
    [pendingPartnerApplications],
    [totalLeads]
  ] = await Promise.all([
    db.select({ value: count() }).from(volunteers).where(eq(volunteers.status, "pending")),
    db.select({ value: count() }).from(actors).where(eq(actors.status, "pending")),
    db.select({ value: count() }).from(opportunities).where(eq(opportunities.status, "published")),
    db.select({ value: count() }).from(events).where(eq(events.status, "pending")),
    db.select({ value: count() }).from(challenges).where(eq(challenges.status, "pending")),
    db.select({ value: count() }).from(challengeProposals).where(eq(challengeProposals.status, "pending")),
    db.select({ value: count() }).from(partnerApplications).where(eq(partnerApplications.status, "pending")),
    db.select({ value: count() }).from(leads)
  ]);
  return {
    pendingVolunteers: pendingVolunteers.value,
    pendingActors: pendingActors.value,
    pendingEvents: pendingEvents.value,
    publishedOpportunities: publishedOpportunities.value,
    pendingChallenges: pendingChallenges.value,
    pendingProposals: pendingProposals.value,
    pendingPartnerApplications: pendingPartnerApplications.value,
    totalLeads: totalLeads.value
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const cards = [
    { label: "Voluntários pendentes", value: counts.pendingVolunteers, href: "/admin/voluntarios" },
    { label: "Atores pendentes", value: counts.pendingActors, href: "/admin/atores" },
    { label: "Eventos pendentes", value: counts.pendingEvents, href: "/admin/eventos" },
    { label: "Oportunidades publicadas", value: counts.publishedOpportunities, href: "/admin/oportunidades" },
    { label: "Desafios pendentes", value: counts.pendingChallenges, href: "/admin/desafios" },
    { label: "Propostas a avaliar", value: counts.pendingProposals, href: "/admin/desafios" },
    {
      label: "Candidaturas pendentes",
      value: counts.pendingPartnerApplications,
      href: "/admin/parceiros"
    },
    { label: "Leads recebidos", value: counts.totalLeads, href: "/admin/leads" }
  ];

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Visão geral</h1>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.label}
            href={card.href}
            className="surface-panel rounded-lg p-5 transition-transform hover:-translate-y-0.5"
          >
            <p className="font-[var(--font-space)] text-3xl font-black text-orange-300">{card.value}</p>
            <p className="mt-1 text-sm font-semibold text-white">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
