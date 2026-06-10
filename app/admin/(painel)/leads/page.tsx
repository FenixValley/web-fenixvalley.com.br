import { desc } from "drizzle-orm";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { leads } from "@/db/schema";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  const rows = await getDb().select().from(leads).orderBy(desc(leads.id));

  return (
    <div className="space-y-6">
      <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Leads (Faça Parte)</h1>
      {rows.length === 0 ? (
        <p className="text-sm text-slate-400">Nenhum lead recebido ainda.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-white/10">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Perfil</TableHead>
                <TableHead>Objetivo</TableHead>
                <TableHead>Recebido em</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((lead) => (
                <TableRow key={lead.id}>
                  <TableCell>
                    <p className="font-semibold text-white">{lead.name}</p>
                    <p className="text-xs text-slate-400">{lead.email}</p>
                  </TableCell>
                  <TableCell className="text-sm text-slate-300">{lead.profile}</TableCell>
                  <TableCell className="max-w-72 text-sm text-slate-300">{lead.objective}</TableCell>
                  <TableCell className="text-sm text-slate-400">{lead.createdAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}
