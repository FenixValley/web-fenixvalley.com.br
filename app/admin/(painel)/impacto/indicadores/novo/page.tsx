import { ImpactIndicatorForm } from "@/components/admin/impact-indicator-form";
import { upsertImpactIndicator } from "../../../actions";

export const dynamic = "force-dynamic";

export default function NewImpactIndicatorPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Novo indicador</h1>
      <ImpactIndicatorForm action={upsertImpactIndicator.bind(null, null)} />
    </div>
  );
}
