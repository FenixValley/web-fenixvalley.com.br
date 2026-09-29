import Link from "next/link";
import { redirect } from "next/navigation";
import { LogOut } from "lucide-react";
import { AdminNav } from "@/components/admin/admin-nav";
import { Button } from "@/components/ui/button";
import { editorialThemeStyle } from "@/components/editorial/theme";
import { auth, signOut } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/admin/login");

  return (
    <div className="min-h-screen font-body text-foreground" style={editorialThemeStyle}>
      <header className="border-b" style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link href="/admin" className="font-display text-lg font-black text-foreground">
              Fênix Valley <span className="text-primary">Admin</span>
            </Link>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin/login" });
            }}
          >
            <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </form>
        </div>
      </header>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[200px_1fr]">
        <AdminNav />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
