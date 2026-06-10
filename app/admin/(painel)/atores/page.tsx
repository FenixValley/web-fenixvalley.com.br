import Link from "next/link";
import { desc } from "drizzle-orm";
import { Check, Pencil, Plus, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { actors } from "@/db/schema";
import { getDb } from "@/lib/db";
import { actorTypeLabels } from "@/lib/schemas";
import { setActorStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminActorsPage() {
  const rows = await getDb().select().from(actors).orderBy(desc(actors.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Atores do mapa</h1>
        <Button asChild size="sm">
          <Link href="/admin/atores/novo">
            <Plus className="h-4 w-4" />
            Novo ator
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhum ator cadastrado.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Bairro</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((actor) => (
                <TableRow key={actor.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{actor.name}</p>
                    <p className="max-w-72 truncate text-xs text-slate-400">{actor.segment}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">
                    {actorTypeLabels[actor.type as keyof typeof actorTypeLabels] ?? actor.type}
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{actor.neighborhood}</TableCell>
                  <TableCell>
                    <StatusBadge status={actor.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setActorStatus(actor.id, "approved");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                          <Check className="h-4 w-4" />
                          Aprovar
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await setActorStatus(actor.id, "rejected");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                          <X className="h-4 w-4" />
                          Rejeitar
                        </Button>
                      </form>
                      <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                        <Link href={`/admin/atores/${actor.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
