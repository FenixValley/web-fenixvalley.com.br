"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Visão geral" },
  { href: "/admin/voluntarios", label: "Voluntários" },
  { href: "/admin/atores", label: "Atores do mapa" },
  { href: "/admin/programas", label: "Programas" },
  { href: "/admin/eventos", label: "Eventos" },
  { href: "/admin/oportunidades", label: "Oportunidades" },
  { href: "/admin/leads", label: "Leads" }
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <nav className="flex gap-1 overflow-x-auto lg:flex-col" aria-label="Navegação do admin">
      {links.map((link) => {
        const active = link.href === "/admin" ? pathname === "/admin" : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "shrink-0 rounded-md px-3 py-2 text-sm font-semibold transition-colors",
              active ? "bg-white/10 text-white" : "text-slate-300 hover:bg-white/5 hover:text-white"
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
