import Link from "next/link";
import { desc } from "drizzle-orm";
import { Archive, Pencil, Plus, Upload } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setOpportunityStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const rows = await getDb().select().from(opportunities).orderBy(desc(opportunities.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Oportunidades</h1>
        <Button asChild size="sm">
          <Link href="/admin/oportunidades/nova">
            <Plus className="h-4 w-4" />
            Nova oportunidade
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhuma oportunidade cadastrada.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Título</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((opportunity) => (
                <TableRow key={opportunity.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{opportunity.title}</p>
                    <p className="max-w-72 truncate text-xs text-slate-400">{opportunity.audience}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{opportunity.type}</TableCell>
                  <TableCell className="text-sm text-slate-300">{opportunity.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={opportunity.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {opportunity.status === "published" ? (
                        <form
                          action={async () => {
                            "use server";
                            await setOpportunityStatus(opportunity.id, "archived");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                            <Archive className="h-4 w-4" />
                            Arquivar
                          </Button>
                        </form>
                      ) : (
                        <form
                          action={async () => {
                            "use server";
                            await setOpportunityStatus(opportunity.id, "published");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                            <Upload className="h-4 w-4" />
                            Publicar
                          </Button>
                        </form>
                      )}
                      <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                        <Link href={`/admin/oportunidades/${opportunity.id}/editar`}>
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
