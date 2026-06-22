import Link from "next/link";
import { desc } from "drizzle-orm";
import { Archive, Pencil, Plus, Star, Upload } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";
import { setOpportunityFeatured, setOpportunityStatus } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminOpportunitiesPage() {
  const rows = await getDb().select().from(opportunities).orderBy(desc(opportunities.id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-display text-2xl font-black text-foreground">Oportunidades</h1>
        <Button asChild size="sm">
          <Link href="/admin/oportunidades/nova">
            <Plus className="h-4 w-4" />
            Nova oportunidade
          </Link>
        </Button>
      </div>
      {rows.length === 0 ? (
        <p className="text-sm text-muted-foreground">Nenhuma oportunidade cadastrada.</p>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border">
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
                    <p className="font-semibold text-foreground">{opportunity.title}</p>
                    <p className="max-w-72 truncate text-xs text-muted-foreground">{opportunity.audience}</p>
                  </TableCell>
                  <TableCell className="text-sm text-muted-foreground">{opportunity.type}</TableCell>
                  <TableCell className="text-sm text-muted-foreground">{opportunity.date}</TableCell>
                  <TableCell>
                    <StatusBadge status={opportunity.status} />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <form
                        action={async () => {
                          "use server";
                          await setOpportunityFeatured(opportunity.id, !opportunity.featured);
                        }}
                      >
                        <Button
                          size="sm"
                          variant="ghost"
                          className={opportunity.featured ? "text-amber-600 hover:text-amber-700" : "text-muted-foreground hover:text-amber-600"}
                        >
                          <Star className="h-4 w-4" />
                          {opportunity.featured ? "Remover destaque" : "Destacar"}
                        </Button>
                      </form>
                      {opportunity.status === "published" ? (
                        <form
                          action={async () => {
                            "use server";
                            await setOpportunityStatus(opportunity.id, "archived");
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
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
                          <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                            <Upload className="h-4 w-4" />
                            Publicar
                          </Button>
                        </form>
                      )}
                      <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
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
