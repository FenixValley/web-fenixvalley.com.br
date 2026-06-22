import { desc, eq } from "drizzle-orm";
import { Check, Lock, LockOpen, X } from "lucide-react";
import { programsCatalog } from "@/data/programs";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { programApplications, programSettings } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setProgramApplicationStatus, setProgramInscriptions } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminProgramsPage() {
  const db = getDb();
  const settings = await db.select().from(programSettings);
  const applications = await db.select().from(programApplications).orderBy(desc(programApplications.id));
  const openBySlug = new Map(settings.map((s) => [s.slug, Boolean(s.inscriptionsOpen)]));
  const programTitles = new Map(programsCatalog.map((p) => [p.slug, p.title]));

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <h1 className="font-display text-2xl font-black text-foreground">Programas</h1>
        <div className="overflow-hidden rounded-xl border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Programa</TableHead>
                <TableHead>Inscrições</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {programsCatalog.map((program) => {
                const open = openBySlug.get(program.slug) ?? false;
                return (
                  <TableRow key={program.slug}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{program.title}</p>
                      <p className="text-xs text-muted-foreground">/programas/{program.slug}</p>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold ${
                          open
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-border bg-muted text-muted-foreground"
                        }`}
                      >
                        {open ? "Abertas" : "Fechadas"}
                      </span>
                    </TableCell>
                    <TableCell>
                      <form
                        action={async () => {
                          "use server";
                          await setProgramInscriptions(program.slug, !open);
                        }}
                      >
                        {open ? (
                          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                            <Lock className="h-4 w-4" />
                            Fechar inscrições
                          </Button>
                        ) : (
                          <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                            <LockOpen className="h-4 w-4" />
                            Abrir inscrições
                          </Button>
                        )}
                      </form>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="font-display text-xl font-black text-foreground">Inscrições recebidas</h2>
        {applications.length === 0 ? (
          <p className="text-sm text-muted-foreground">Nenhuma inscrição recebida ainda.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Programa</TableHead>
                  <TableHead>Motivação</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applications.map((application) => (
                  <TableRow key={application.id}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{application.name}</p>
                      <p className="text-xs text-muted-foreground">{application.email}</p>
                      {application.organization ? (
                        <p className="text-xs text-muted-foreground">{application.organization}</p>
                      ) : null}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {programTitles.get(application.programSlug) ?? application.programSlug}
                    </TableCell>
                    <TableCell className="max-w-64 text-sm text-muted-foreground">{application.motivation}</TableCell>
                    <TableCell>
                      <StatusBadge status={application.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <form
                          action={async () => {
                            "use server";
                            await setProgramApplicationStatus(application.id, "approved");
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
                            await setProgramApplicationStatus(application.id, "rejected");
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
    </div>
  );
}
