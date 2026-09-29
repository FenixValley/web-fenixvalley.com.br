import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { LearningTrackForm } from "@/components/admin/learning-track-form";
import { learningTracks } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertLearningTrack } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditLearningTrackPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trackId = Number(id);
  if (!Number.isInteger(trackId)) notFound();

  const track = await getDb().query.learningTracks.findFirst({ where: eq(learningTracks.id, trackId) });
  if (!track) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Editar trilha</h1>
      <LearningTrackForm action={upsertLearningTrack.bind(null, trackId)} initialValues={track} />
    </div>
  );
}
