import { ActorForm } from "@/components/admin/actor-form";
import { upsertActor } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewActorPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Novo ator</h1>
      <ActorForm action={upsertActor.bind(null, null)} />
    </div>
  );
}
