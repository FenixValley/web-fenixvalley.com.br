import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ImpactStoryForm } from "@/components/admin/impact-story-form";
import { impactStories } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertImpactStory } from "../../../../actions";

export const dynamic = "force-dynamic";

export default async function EditImpactStoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const storyId = Number(id);
  if (!Number.isInteger(storyId)) notFound();

  const story = await getDb().query.impactStories.findFirst({ where: eq(impactStories.id, storyId) });
  if (!story) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar conteúdo de impacto</h1>
      <ImpactStoryForm action={upsertImpactStory.bind(null, storyId)} initialValues={story} />
    </div>
  );
}
