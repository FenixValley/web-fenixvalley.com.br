import { PartnerForm } from "@/components/admin/partner-form";
import { upsertPartner } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewPartnerPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Novo parceiro</h1>
      <PartnerForm action={upsertPartner.bind(null, null)} />
    </div>
  );
}
