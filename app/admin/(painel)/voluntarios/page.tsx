import { desc } from "drizzle-orm";
import { Check, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { volunteers } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setVolunteerStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminVolunteersPage() {
  const rows = await getDb().select().from(volunteers).orderBy(desc(volunteers.id));

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Voluntários</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhuma inscrição recebida ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Área</TableHead>
                <TableHead>Disponibilidade</TableHead>
                <TableHead>Motivação</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((volunteer) => (
                <TableRow key={volunteer.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{volunteer.name}</p>
                    <p className="text-xs text-slate-400">{volunteer.email}</p>
                    {volunteer.phone ? <p className="text-xs text-slate-400">{volunteer.phone}</p> : null}
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{volunteer.area}</TableCell>
                  <TableCell className="text-sm text-slate-300">{volunteer.availability}</TableCell>
                  <TableCell className="max-w-64 text-sm text-slate-300">{volunteer.motivation}</TableCell>
                  <TableCell>
                    <StatusBadge status={volunteer.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setVolunteerStatus(volunteer.id, "approved");
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
                          await setVolunteerStatus(volunteer.id, "rejected");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                          <X className="h-4 w-4" />
                          Rejeitar
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
