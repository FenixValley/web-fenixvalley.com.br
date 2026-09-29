import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ImpactIndicatorForm } from "@/components/admin/impact-indicator-form";
import { impactIndicators } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertImpactIndicator } from "../../../../actions";

export const dynamic = "force-dynamic";

export default async function EditImpactIndicatorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const indicatorId = Number(id);
  if (!Number.isInteger(indicatorId)) notFound();

  const indicator = await getDb().query.impactIndicators.findFirst({
    where: eq(impactIndicators.id, indicatorId)
  });
  if (!indicator) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar indicador</h1>
      <ImpactIndicatorForm action={upsertImpactIndicator.bind(null, indicatorId)} initialValues={indicator} />
    </div>
  );
}
