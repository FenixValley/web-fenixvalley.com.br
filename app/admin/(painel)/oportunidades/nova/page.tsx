import { OpportunityForm } from "@/components/admin/opportunity-form";
import { upsertOpportunity } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewOpportunityPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Nova oportunidade</h1>
      <OpportunityForm action={upsertOpportunity.bind(null, null)} />
    </div>
  );
}
