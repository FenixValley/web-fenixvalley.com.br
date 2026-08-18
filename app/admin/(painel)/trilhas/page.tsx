import Link from "next/link";
import { asc } from "drizzle-orm";
import { EyeOff, Pencil, Plus, Trash2, Upload } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { learningTracks } from "@/db/schema";
import { getDb } from "@/lib/db";
import { deleteLearningTrack, setLearningTrackStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminLearningTracksPage() {
  const rows = await getDb().select().from(learningTracks).orderBy(asc(learningTracks.order), asc(learningTracks.title));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Trilhas de capacitação</h1>
        <Button asChild size="sm">
          <Link href="/admin/trilhas/nova">
            <Plus className="h-4 w-4" />
            Nova trilha
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhuma trilha cadastrada.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Trilha</TableHead>
                <TableHead>Ordem</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((track) => (
                <TableRow key={track.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{track.title}</p>
                    <p className="text-xs text-slate-400">/universidades/trilhas/{track.slug}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{track.order}</TableCell>
                  <TableCell>
                    <StatusBadge status={track.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {track.status === "published" ? (
                        <form
                          action={async () => {
                            "use server";
                            await setLearningTrackStatus(track.id, "draft");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                            <EyeOff className="h-4 w-4" />
                            Ocultar
                          </Button>
                        </form>
                      ) : (
                        <form
                          action={async () => {
                            "use server";
                            await setLearningTrackStatus(track.id, "published");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                            <Upload className="h-4 w-4" />
                            Publicar
                          </Button>
                        </form>
                      )}
                      <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                        <Link href={`/admin/trilhas/${track.id}/editar`}>
                          <Pencil className="h-4 w-4" />
                          Editar
                        </Link>
                      </Button>
                      <form
                        action={async () => {
                          "use server";
                          await deleteLearningTrack(track.id);
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                          <Trash2 className="h-4 w-4" />
                          Excluir
                        </Button>
                      </form>
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
