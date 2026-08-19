import { LearningTrackForm } from "@/components/admin/learning-track-form";
import { upsertLearningTrack } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewLearningTrackPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Nova trilha</h1>
      <LearningTrackForm action={upsertLearningTrack.bind(null, null)} />
    </div>
  );
}
