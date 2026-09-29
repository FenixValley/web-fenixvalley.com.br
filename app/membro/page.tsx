import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import {
  Bookmark,
  Calendar,
  Compass,
  FileText,
  HeartHandshake,
  LogOut,
  MapPin,
  Plus,
  Shield,
  Sparkles
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FavoriteList } from "@/components/member/favorite-list";
import { EditorialShell } from "@/components/editorial/editorial-shell";
import { PageHeader } from "@/components/editorial/page-header";
import { EditorialReveal } from "@/components/pretext/editorial-reveal";
import {
  challengeProposals,
  challenges,
  programApplications,
  userFavorites,
  users,
  volunteers
} from "@/db/schema";
import { auth, signOut } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Área do Membro | Fênix Valley",
  description: "Painel exclusivo do membro do ecossistema Fênix Valley."
};

export default async function MemberDashboardPage() {
  const session = await auth();
  if (!session?.user?.email) {
    redirect("/login?callbackUrl=/membro");
  }

  const db = getDb();
  const user = await db.query.users.findFirst({
    where: eq(users.email, session.user.email)
  });

  if (!user) {
    redirect("/login?callbackUrl=/membro");
  }

  const [favorites, myVolunteering, myApplications, myProposals] = await Promise.all([
    db
      .select()
      .from(userFavorites)
      .where(eq(userFavorites.userId, user.id))
      .orderBy(desc(userFavorites.createdAt)),

    db
      .select()
      .from(volunteers)
      .where(eq(volunteers.email, user.email))
      .orderBy(desc(volunteers.createdAt)),

    db
      .select()
      .from(programApplications)
      .where(eq(programApplications.email, user.email))
      .orderBy(desc(programApplications.createdAt)),

    db
      .select({
        id: challengeProposals.id,
        solution: challengeProposals.solution,
        status: challengeProposals.status,
        createdAt: challengeProposals.createdAt,
        challengeTitle: challenges.title
      })
      .from(challengeProposals)
      .leftJoin(challenges, eq(challengeProposals.challengeId, challenges.id))
      .where(eq(challengeProposals.email, user.email))
      .orderBy(desc(challengeProposals.createdAt))
  ]);

  const statusColors: Record<string, string> = {
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-700",
    approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700",
    rejected: "border-rose-500/30 bg-rose-500/10 text-rose-700"
  };

  const statusLabels: Record<string, string> = {
    pending: "Em análise",
    approved: "Aprovado",
    rejected: "Recusado"
  };

  return (
    <EditorialShell active="/membro">
      <PageHeader
        kicker="Painel Pessoal"
        title="Área do Membro Fênix Valley."
        accent="Membro"
        lede={`Bem-vindo(a), ${user.name}. Acompanhe aqui suas oportunidades salvas, candidaturas e participação no ecossistema.`}
      />

      <section className="mx-auto w-full max-w-[1180px] px-6 py-12 sm:px-10 sm:py-16">
        <div className="space-y-12">
          {/* Header do Usuário */}
          <EditorialReveal>
            <div
              className="flex flex-col gap-6 rounded-2xl p-6 sm:p-8 md:flex-row md:items-center md:justify-between"
              style={{
                background: "var(--fx-surface)",
                border: "1px solid var(--fx-line)"
              }}
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full font-display text-xl font-bold"
                  style={{
                    background: "var(--fx-accent-soft)",
                    color: "var(--fx-accent)"
                  }}
                >
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="font-display text-2xl font-bold" style={{ color: "var(--fx-ink)" }}>
                      {user.name}
                    </h2>
                    <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">
                      {user.role === "admin" ? "Gestor / Admin" : "Membro da Rede"}
                    </Badge>
                  </div>
                  <p className="font-body text-sm" style={{ color: "var(--fx-muted)" }}>{user.email}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                {user.role === "admin" ? (
                  <Button asChild variant="outline" size="sm" className="gap-2 font-mono text-xs uppercase tracking-[0.16em]">
                    <Link href="/admin">
                      <Shield className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                      Painel Admin
                    </Link>
                  </Button>
                ) : null}
                <form
                  action={async () => {
                    "use server";
                    await signOut({ redirectTo: "/" });
                  }}
                >
                  <Button
                    type="submit"
                    variant="ghost"
                    size="sm"
                    className="gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground hover:text-foreground"
                  >
                    <LogOut className="h-4 w-4" />
                    Sair
                  </Button>
                </form>
              </div>
            </div>
          </EditorialReveal>

          {/* Atalhos Rápidos */}
          <div className="space-y-4">
            <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
              Ações Rápidas
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/mapa"
                className="group flex items-center justify-between rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "rgba(16, 185, 129, 0.12)", color: "rgb(5, 150, 105)" }}
                  >
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>Mapa</p>
                    <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Cadastrar organização</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/desafios"
                className="group flex items-center justify-between rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                  >
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>Desafios</p>
                    <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Inovação aberta</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/eventos"
                className="group flex items-center justify-between rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "rgba(14, 165, 233, 0.12)", color: "rgb(2, 132, 199)" }}
                  >
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>Eventos</p>
                    <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Agenda e meetups</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/oportunidades"
                className="group flex items-center justify-between rounded-xl p-5 transition-transform hover:-translate-y-0.5"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{ background: "rgba(147, 51, 234, 0.12)", color: "rgb(126, 34, 206)" }}
                  >
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>Oportunidades</p>
                    <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Editais, vagas e fundos</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>

          {/* Itens Salvos / Favoritos */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bookmark className="h-5 w-5" style={{ color: "var(--fx-accent)" }} />
                <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                  Meus Itens Salvos
                </h2>
              </div>
              <span className="font-mono text-xs" style={{ color: "var(--fx-muted)" }}>
                {favorites.length} {favorites.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <FavoriteList initialFavorites={favorites} />
          </div>

          {/* Minhas Inscrições e Submissões */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5" style={{ color: "var(--fx-accent)" }} />
              <h2 className="font-display text-xl font-bold" style={{ color: "var(--fx-ink)" }}>
                Minhas Candidaturas e Submissões
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Voluntariado */}
              <div
                className="space-y-4 rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                    <HeartHandshake className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                    Voluntariado
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--fx-muted)" }}>{myVolunteering.length}</span>
                </div>
                {myVolunteering.length === 0 ? (
                  <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Nenhuma candidatura de voluntário enviada.</p>
                ) : (
                  <ul className="space-y-3 font-body">
                    {myVolunteering.map((v) => (
                      <li key={v.id} className="border-t pt-2 text-xs space-y-1" style={{ borderColor: "var(--fx-line)" }}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold" style={{ color: "var(--fx-ink)" }}>{v.area}</span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[v.status] ?? ""}`}>
                            {statusLabels[v.status] ?? v.status}
                          </span>
                        </div>
                        <p className="truncate" style={{ color: "var(--fx-muted)" }}>{v.availability}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Inscrições em Programas */}
              <div
                className="space-y-4 rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                    <Compass className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                    Programas
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--fx-muted)" }}>{myApplications.length}</span>
                </div>
                {myApplications.length === 0 ? (
                  <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Nenhuma inscrição em programas por enquanto.</p>
                ) : (
                  <ul className="space-y-3 font-body">
                    {myApplications.map((app) => (
                      <li key={app.id} className="border-t pt-2 text-xs space-y-1" style={{ borderColor: "var(--fx-line)" }}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold capitalize" style={{ color: "var(--fx-ink)" }}>
                            {app.programSlug.replace("-", " ")}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[app.status] ?? ""}`}>
                            {statusLabels[app.status] ?? app.status}
                          </span>
                        </div>
                        <p className="truncate" style={{ color: "var(--fx-muted)" }}>{app.organization ?? "Individual"}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Propostas de Desafios */}
              <div
                className="space-y-4 rounded-xl p-6"
                style={{ background: "var(--fx-surface)", border: "1px solid var(--fx-line)" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-display text-sm font-semibold" style={{ color: "var(--fx-ink)" }}>
                    <Sparkles className="h-4 w-4" style={{ color: "var(--fx-accent)" }} />
                    Propostas de Desafios
                  </div>
                  <span className="font-mono text-xs" style={{ color: "var(--fx-muted)" }}>{myProposals.length}</span>
                </div>
                {myProposals.length === 0 ? (
                  <p className="font-body text-xs" style={{ color: "var(--fx-muted)" }}>Nenhuma proposta enviada para desafios abertos.</p>
                ) : (
                  <ul className="space-y-3 font-body">
                    {myProposals.map((prop) => (
                      <li key={prop.id} className="border-t pt-2 text-xs space-y-1" style={{ borderColor: "var(--fx-line)" }}>
                        <div className="flex items-center justify-between">
                          <span className="font-semibold truncate max-w-[140px]" style={{ color: "var(--fx-ink)" }}>
                            {prop.challengeTitle ?? "Desafio"}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[prop.status] ?? ""}`}>
                            {statusLabels[prop.status] ?? prop.status}
                          </span>
                        </div>
                        <p className="truncate" style={{ color: "var(--fx-muted)" }}>{prop.solution}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </EditorialShell>
  );
}
