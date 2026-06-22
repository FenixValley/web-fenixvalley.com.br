import { ActorForm } from "@/components/admin/actor-form";
import { upsertActor } from "../../actions";

export const dynamic = "force-dynamic";

export default function NewActorPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Novo ator</h1>
      <ActorForm action={upsertActor.bind(null, null)} />
    </div>
  );
}
