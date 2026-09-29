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
import { SiteFooter } from "@/components/sections/site-footer";
import { SiteHeader } from "@/components/sections/site-header";
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
    pending: "border-amber-500/30 bg-amber-500/10 text-amber-400",
    approved: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    rejected: "border-rose-500/30 bg-rose-500/10 text-rose-400"
  };

  const statusLabels: Record<string, string> = {
    pending: "Em análise",
    approved: "Aprovado",
    rejected: "Recusado"
  };

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1} className="outline-none py-10 sm:py-16">
        <div className="section-shell space-y-10">
          {/* Header de Boas-vindas */}
          <div className="surface-panel flex flex-col gap-6 rounded-2xl p-6 sm:p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-xl ring-2 ring-primary/20">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="font-[var(--font-space)] text-2xl font-black text-foreground">
                    {user.name}
                  </h1>
                  <Badge variant="outline" className="border-primary/40 bg-primary/10 text-primary">
                    {user.role === "admin" ? "Gestor / Admin" : "Membro do Ecossistema"}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{user.email}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {user.role === "admin" ? (
                <Button asChild variant="outline" size="sm" className="gap-2 border-border">
                  <Link href="/admin">
                    <Shield className="h-4 w-4 text-primary" />
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
                <Button type="submit" variant="ghost" size="sm" className="gap-2 text-muted-foreground hover:text-foreground">
                  <LogOut className="h-4 w-4" />
                  Sair
                </Button>
              </form>
            </div>
          </div>

          {/* Atalhos Rápidos */}
          <div className="space-y-4">
            <h2 className="font-[var(--font-space)] text-lg font-bold text-foreground">
              Ações Rápidas
            </h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Link
                href="/mapa"
                className="surface-panel group flex items-center justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Mapa do Ecossistema</p>
                    <p className="text-xs text-muted-foreground">Cadastre sua organização</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/desafios"
                className="surface-panel group flex items-center justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10 text-orange-400">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Inovação Aberta</p>
                    <p className="text-xs text-muted-foreground">Ver desafios e soluções</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/eventos"
                className="surface-panel group flex items-center justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-500/10 text-sky-400">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Agenda de Eventos</p>
                    <p className="text-xs text-muted-foreground">Meetups e encontros</p>
                  </div>
                </div>
                <Plus className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </Link>

              <Link
                href="/oportunidades"
                className="surface-panel group flex items-center justify-between rounded-xl p-4 transition-transform hover:-translate-y-0.5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-500/10 text-purple-400">
                    <Compass className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">Oportunidades</p>
                    <p className="text-xs text-muted-foreground">Editais, vagas e fundos</p>
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
                <Bookmark className="h-5 w-5 text-primary" />
                <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                  Meus Itens Salvos
                </h2>
              </div>
              <span className="text-xs text-muted-foreground">
                {favorites.length} {favorites.length === 1 ? "item" : "itens"}
              </span>
            </div>
            <FavoriteList initialFavorites={favorites} />
          </div>

          {/* Minhas Inscrições e Submissões */}
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              <h2 className="font-[var(--font-space)] text-xl font-bold text-foreground">
                Minhas Candidaturas e Submissões
              </h2>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Voluntariado */}
              <div className="surface-panel rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <HeartHandshake className="h-4 w-4 text-primary" />
                    Voluntariado
                  </div>
                  <span className="text-xs text-muted-foreground">{myVolunteering.length}</span>
                </div>
                {myVolunteering.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhuma candidatura de voluntário enviada.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {myVolunteering.map((v) => (
                      <li key={v.id} className="border-t border-border pt-2 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground">{v.area}</span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[v.status] ?? ""}`}>
                            {statusLabels[v.status] ?? v.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground truncate">{v.availability}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Inscrições em Programas */}
              <div className="surface-panel rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Compass className="h-4 w-4 text-primary" />
                    Programas
                  </div>
                  <span className="text-xs text-muted-foreground">{myApplications.length}</span>
                </div>
                {myApplications.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhuma inscrição em programas por enquanto.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {myApplications.map((app) => (
                      <li key={app.id} className="border-t border-border pt-2 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground capitalize">
                            {app.programSlug.replace("-", " ")}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[app.status] ?? ""}`}>
                            {statusLabels[app.status] ?? app.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground truncate">{app.organization ?? "Individual"}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Propostas de Desafios */}
              <div className="surface-panel rounded-xl p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                    <Sparkles className="h-4 w-4 text-primary" />
                    Propostas de Desafios
                  </div>
                  <span className="text-xs text-muted-foreground">{myProposals.length}</span>
                </div>
                {myProposals.length === 0 ? (
                  <p className="text-xs text-muted-foreground">Nenhuma proposta enviada para desafios abertos.</p>
                ) : (
                  <ul className="space-y-2.5">
                    {myProposals.map((prop) => (
                      <li key={prop.id} className="border-t border-border pt-2 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-semibold text-foreground truncate max-w-[140px]">
                            {prop.challengeTitle ?? "Desafio"}
                          </span>
                          <span className={`rounded px-1.5 py-0.5 font-medium border ${statusColors[prop.status] ?? ""}`}>
                            {statusLabels[prop.status] ?? prop.status}
                          </span>
                        </div>
                        <p className="text-muted-foreground truncate">{prop.solution}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
