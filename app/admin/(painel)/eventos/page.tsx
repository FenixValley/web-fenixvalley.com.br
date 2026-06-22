import { desc } from "drizzle-orm";
import { Archive, Check, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { events } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setEventStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminEventsPage() {
  const rows = await getDb().select().from(events).orderBy(desc(events.id));

  return (
    <div className="space-y-6">
      <h1 className="font-display text-2xl font-black text-foreground">Eventos</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhum evento enviado ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Evento</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Organizador</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((event) => (
                <TableRow key={event.id}>
                  <TableCell>
                    <p className="font-semibold text-foreground">{event.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.category} · {event.mode} · {event.location}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">
                    {event.date} {event.time}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-muted-foreground">{event.organizer}</p>
                    <p className="text-xs text-muted-foreground">{event.organizerEmail}</p>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={event.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setEventStatus(event.id, "approved");
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
                          await setEventStatus(event.id, "rejected");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
                          <X className="h-4 w-4" />
                          Rejeitar
                        </Button>
                      </form>
                      <form
                        action={async () => {
                          "use server";
                          await setEventStatus(event.id, "archived");
                        }}
                      >
                        <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <Archive className="h-4 w-4" />
                          Arquivar
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
