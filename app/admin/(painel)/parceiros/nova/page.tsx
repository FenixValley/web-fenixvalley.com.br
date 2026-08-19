import { PartnerForm } from "@/components/admin/partner-form";
import { upsertPartner } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Novo parceiro</h1>
      <PartnerForm action={upsertPartner.bind(null, null)} />
    </div>
  );
}
