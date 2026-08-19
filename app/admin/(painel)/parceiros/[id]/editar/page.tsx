import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { PartnerForm } from "@/components/admin/partner-form";
import { partners } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertPartner } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditPartnerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const partnerId = Number(id);
  if (!Number.isInteger(partnerId)) notFound();

  const partner = await getDb().query.partners.findFirst({ where: eq(partners.id, partnerId) });
  if (!partner) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar parceiro</h1>
      <PartnerForm action={upsertPartner.bind(null, partnerId)} initialValues={partner} />
    </div>
  );
}
