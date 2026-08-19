import Link from "next/link";
import { asc, desc } from "drizzle-orm";
import { Check, EyeOff, Mail, Pencil, Plus, Trash2, Upload, X } from "lucide-react";
import { StatusBadge } from "@/components/admin/status-badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { partnerApplications, partners } from "@/db/schema";
import { getDb } from "@/lib/db";
import { deletePartner, setPartnerApplicationStatus, setPartnerStatus } from "../actions";

export const dynamic = "force-dynamic";

function parseSupportTypes(value: string): string[] {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch {
    return [];
  }
}

export default async function AdminPartnersPage() {
  const db = getDb();
  const rows = await db.select().from(partners).orderBy(asc(partners.order), asc(partners.name));
  const applications = await db
    .select()
    .from(partnerApplications)
    .orderBy(desc(partnerApplications.createdAt));

  return (
    <div className="space-y-10">
      <div className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-[var(--font-space)] text-2xl font-black text-white">Parceiros</h1>
            <p className="text-sm text-slate-400">Só parceiros publicados aparecem em /parceiros.</p>
          </div>
          <Button asChild size="sm">
            <Link href="/admin/parceiros/nova">
              <Plus className="h-4 w-4" />
              Novo parceiro
            </Link>
          </Button>
        </div>
        {rows.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhum parceiro cadastrado.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Parceiro</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((partner) => (
                  <TableRow key={partner.id}>
                    <TableCell>
                      <p className="font-semibold text-white">
                        {partner.name}
                        {partner.founding ? <span className="ml-2 text-xs text-amber-300">fundador</span> : null}
                      </p>
                      <p className="text-xs text-slate-400">/parceiros/{partner.slug}</p>
                    </TableCell>
                    <TableCell className="text-sm text-slate-300">{partner.category}</TableCell>
                    <TableCell>
                      <StatusBadge status={partner.status} />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {partner.status === "published" ? (
                          <form
                            action={async () => {
                              "use server";
                              await setPartnerStatus(partner.id, "draft");
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
                              await setPartnerStatus(partner.id, "published");
                            }}
                          >
                            <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                              <Upload className="h-4 w-4" />
                              Publicar
                            </Button>
                          </form>
                        )}
                        <Button asChild size="sm" variant="ghost" className="text-slate-300 hover:text-white">
                          <Link href={`/admin/parceiros/${partner.id}/editar`}>
                            <Pencil className="h-4 w-4" />
                            Editar
                          </Link>
                        </Button>
                        <form
                          action={async () => {
                            "use server";
                            await deletePartner(partner.id);
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

      <div className="space-y-6">
        <div className="space-y-1">
          <h2 className="font-[var(--font-space)] text-xl font-bold text-white">
            Candidaturas a parceria ({applications.length})
          </h2>
          <p className="text-sm text-slate-400">
            Propostas enviadas em /seja-parceiro. Aprovar aqui registra a decisão — o parceiro em si é cadastrado
            acima, com a contribuição acordada.
          </p>
        </div>
        {applications.length === 0 ? (
          <p className="text-sm text-slate-400">Nenhuma candidatura recebida.</p>
        ) : (
          <div className="space-y-4">
            {applications.map((application) => (
              <article key={application.id} className="surface-panel space-y-3 rounded-lg p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{application.organization}</p>
                    <p className="text-xs text-slate-400">
                      {application.category} · {application.contactName} · {application.createdAt}
                    </p>
                  </div>
                  <StatusBadge status={application.status} />
                </div>
                <p className="whitespace-pre-line text-sm leading-6 text-slate-300">{application.message}</p>
                <ul className="flex flex-wrap gap-2">
                  {parseSupportTypes(application.supportTypes).map((type) => (
                    <li
                      key={type}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {type}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <a
                    href={`mailto:${application.email}`}
                    className="inline-flex items-center gap-1.5 font-semibold text-orange-300 hover:text-orange-200"
                  >
                    <Mail className="h-4 w-4" />
                    {application.email}
                  </a>
                  {application.phone ? (
                    <span className="text-slate-400">{application.phone}</span>
                  ) : null}
                </div>
                <div className="flex items-center gap-2">
                  {application.status !== "approved" ? (
                    <form
                      action={async () => {
                        "use server";
                        await setPartnerApplicationStatus(application.id, "approved");
                      }}
                    >
                      <Button size="sm" variant="ghost" className="text-emerald-400 hover:text-emerald-300">
                        <Check className="h-4 w-4" />
                        Aprovar
                      </Button>
                    </form>
                  ) : null}
                  {application.status !== "rejected" ? (
                    <form
                      action={async () => {
                        "use server";
                        await setPartnerApplicationStatus(application.id, "rejected");
                      }}
                    >
                      <Button size="sm" variant="ghost" className="text-rose-400 hover:text-rose-300">
                        <X className="h-4 w-4" />
                        Rejeitar
                      </Button>
                    </form>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
