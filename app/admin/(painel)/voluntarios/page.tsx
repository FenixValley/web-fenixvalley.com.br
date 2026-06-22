import { desc } from "drizzle-orm";
import { Check, Download, X } from "lucide-react";
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
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-black text-foreground">Voluntários</h1>
        <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
          <a href="/admin/exportar?type=volunteers" download>
            <Download className="h-4 w-4" />
            Exportar CSV
          </a>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma inscrição recebida ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
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
                    <p className="font-semibold text-foreground">{volunteer.name}</p>
                    <p className="text-xs text-muted-foreground">{volunteer.email}</p>
                    {volunteer.phone ? <p className="text-xs text-muted-foreground">{volunteer.phone}</p> : null}
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{volunteer.area}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{volunteer.availability}</TableCell>
                  <TableCell className="max-w-64 text-sm text-muted-foreground">{volunteer.motivation}</TableCell>
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
                        <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
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
                        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
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
