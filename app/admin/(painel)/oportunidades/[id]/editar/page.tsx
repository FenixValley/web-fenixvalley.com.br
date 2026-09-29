import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { OpportunityForm } from "@/components/admin/opportunity-form";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertOpportunity } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditOpportunityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const opportunityId = Number(id);
  if (!Number.isInteger(opportunityId)) notFound();

  const opportunity = await getDb().query.opportunities.findFirst({
    where: eq(opportunities.id, opportunityId)
  });
  if (!opportunity) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Editar oportunidade</h1>
      <OpportunityForm action={upsertOpportunity.bind(null, opportunityId)} initialValues={opportunity} />
    </div>
  );
}
