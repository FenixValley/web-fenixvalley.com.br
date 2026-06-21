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
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Eventos</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhum evento enviado ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
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
                    <p className="font-semibold text-white">{event.title}</p>
                    <p className="text-xs text-slate-400">
                      {event.category} · {event.mode} · {event.location}
                    </p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">
                    {event.date} {event.time}
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-slate-300">{event.organizer}</p>
                    <p className="text-xs text-slate-400">{event.organizerEmail}</p>
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
                        <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
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
                        <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
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
                        <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
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
