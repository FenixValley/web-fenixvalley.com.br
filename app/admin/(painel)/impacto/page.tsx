import Link from "next/link";
import { asc } from "drizzle-orm";
import { BadgeCheck, EyeOff, Pencil, Plus, ShieldOff, Trash2, Upload } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { impactIndicators, impactStories } from "@/db/schema";
import { getDb } from "@/lib/db";
import { impactStoryTypeLabels } from "@/lib/schemas";
import {
  deleteImpactIndicator,
  deleteImpactStory,
  setImpactIndicatorVerified,
  setImpactStoryStatus
} from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminImpactPage() {
  const db = getDb();
  const indicators = await db
    .select()
    .from(impactIndicators)
    .orderBy(asc(impactIndicators.order), asc(impactIndicators.label));
  const stories = await db
    .select()
    .from(impactStories)
    .orderBy(asc(impactStories.order), asc(impactStories.title));

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-black text-foreground">Indicadores de impacto</h1>
            <p className="font-body text-sm text-muted-foreground">
              Só indicadores marcados como conferidos aparecem em /impacto — sempre com fonte e período.
            </p>
          </div>
          <Button asChild size="sm" className="font-mono text-xs uppercase tracking-[0.16em]">
            <Link href="/admin/impacto/indicadores/novo">
              <Plus className="h-4 w-4" />
              Novo indicador
            </Link>
          </Button>
        </div>
        {indicators.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">Nenhum indicador cadastrado.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Indicador</TableHead>
                  <TableHead>Valor</TableHead>
                  <TableHead>Fonte</TableHead>
                  <TableHead>Situação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {indicators.map((indicator) => (
                  <TableRow key={indicator.id}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{indicator.label}</p>
                      <p className="font-mono text-xs text-muted-foreground">{indicator.period}</p>
                    </TableCell>
                    <TableCell className="font-semibold text-foreground">{indicator.value}</TableCell>
                    <TableCell className="max-w-[16rem] font-mono text-xs text-muted-foreground">{indicator.source}</TableCell>
                    <TableCell>
                      <StatusBadge status={indicator.verified ? "published" : "draft"} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {indicator.verified ? (
                          <form
                            action={async () => {
                              "use server";
                              await setImpactIndicatorVerified(indicator.id, false);
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                              <ShieldOff className="h-4 w-4" />
                              Despublicar
                            </Button>
                          </form>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await setImpactIndicatorVerified(indicator.id, true);
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                              <BadgeCheck className="h-4 w-4" />
                              Marcar conferido
                            </Button>
                          </form>
                        )}
                        <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <Link href={`/admin/impacto/indicadores/${indicator.id}/editar`}>
                            <Pencil className="h-4 w-4" />
                            Editar
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deleteImpactIndicator(indicator.id);
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
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

      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="font-display text-xl font-bold text-foreground">Cases, depoimentos e relatórios</h2>
            <p className="font-body text-sm text-muted-foreground">Conteúdos publicados aparecem na página de impacto.</p>
          </div>
          <Button asChild size="sm" className="font-mono text-xs uppercase tracking-[0.16em]">
            <Link href="/admin/impacto/historias/nova">
              <Plus className="h-4 w-4" />
              Novo conteúdo
            </Link>
          </Button>
        </div>
        {stories.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">Nenhum conteúdo cadastrado.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Conteúdo</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stories.map((story) => (
                  <TableRow key={story.id}>
                    <TableCell>
                      <p className="font-semibold text-foreground">{story.title}</p>
                      {story.organization ? (
                        <p className="font-body text-xs text-muted-foreground">{story.organization}</p>
                      ) : null}
                    </TableCell>
                    <TableCell className="font-body text-sm text-muted-foreground">
                      {impactStoryTypeLabels[story.type as keyof typeof impactStoryTypeLabels] ?? story.type}
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={story.status} gender="f" />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {story.status === "published" ? (
                          <form
                            action={async () => {
                              "use server";
                              await setImpactStoryStatus(story.id, "draft");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                              <EyeOff className="h-4 w-4" />
                              Ocultar
                            </Button>
                          </form>
                        ) : (
                          <form
                            action={async () => {
                              "use server";
                              await setImpactStoryStatus(story.id, "published");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-emerald-600 hover:text-emerald-700">
                              <Upload className="h-4 w-4" />
                              Publicar
                            </Button>
                          </form>
                        )}
                        <Button asChild size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                          <Link href={`/admin/impacto/historias/${story.id}/editar`}>
                            <Pencil className="h-4 w-4" />
                            Editar
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deleteImpactStory(story.id);
                          }}
                        >
                          <Button size="sm" variant="ghost" className="text-rose-600 hover:text-rose-700">
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
    </div>
  );
}
