import { ImpactStoryForm } from "@/components/admin/impact-story-form";
import { upsertImpactStory } from "../../../actions";

export const dynamic = "force-dynamic";

export default function NewImpactStoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Novo conteúdo de impacto</h1>
      <ImpactStoryForm action={upsertImpactStory.bind(null, null)} />
    </div>
  );
}
