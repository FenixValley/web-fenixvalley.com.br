import Link from "next/link";
import { count, eq } from "drizzle-orm";
import { actors, leads, opportunities, volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

async function getCounts() {
  const db = getDb();
  const [pendingVolunteers] = await db
    .select({ value: count() })
    .from(volunteers)
    .where(eq(volunteers.status, "pending"));
  const [pendingActors] = await db
    .select({ value: count() })
    .from(actors)
    .where(eq(actors.status, "pending"));
  const [publishedOpportunities] = await db
    .select({ value: count() })
    .from(opportunities)
    .where(eq(opportunities.status, "published"));
  const [totalLeads] = await db.select({ value: count() }).from(leads);
  return {
    pendingVolunteers: pendingVolunteers.value,
    pendingActors: pendingActors.value,
    publishedOpportunities: publishedOpportunities.value,
    totalLeads: totalLeads.value
  };
}

export default async function AdminDashboardPage() {
  const counts = await getCounts();
  const cards = [
    { label: "Voluntários pendentes", value: counts.pendingVolunteers, href: "/admin/voluntarios" },
    { label: "Atores pendentes", value: counts.pendingActors, href: "/admin/atores" },
    { label: "Oportunidades publicadas", value: counts.publishedOpportunities, href: "/admin/oportunidades" },
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
