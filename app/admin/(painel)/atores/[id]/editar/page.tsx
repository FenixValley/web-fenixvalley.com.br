import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import { ActorForm } from "@/components/admin/actor-form";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { upsertActor } from "../../../actions";

export const dynamic = "force-dynamic";

export default async function EditActorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const actorId = Number(id);
  if (!Number.isInteger(actorId)) notFound();

  const actor = await getDb().query.actors.findFirst({ where: eq(actors.id, actorId) });
  if (!actor) notFound();

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Editar ator</h1>
      <ActorForm action={upsertActor.bind(null, actorId)} initialValues={actor} />
    </div>
  );
}
