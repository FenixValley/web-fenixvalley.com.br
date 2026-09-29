import { ImpactStoryForm } from "@/components/admin/impact-story-form";
import { upsertImpactStory } from "../../../actions";

export const dynamic = "force-dynamic";

export default function NewImpactStoryPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Novo conteúdo de impacto</h1>
      <ImpactStoryForm action={upsertImpactStory.bind(null, null)} />
    </div>
  );
}
