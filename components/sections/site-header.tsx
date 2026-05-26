import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#sobre", label: "Sobre" },
  { href: "#ecossistema", label: "Ecossistema" },
  { href: "#programas", label: "Programas" },
  { href: "#oportunidades", label: "Oportunidades" },
  { href: "#participar", label: "Participar" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/78 backdrop-blur-xl">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="#" className="flex items-center gap-3" aria-label="Fênix Valley">
          <Image src="/logo-fenix-valley.png" alt="" width={130} height={130} priority className="h-12 w-auto" />
        </Link>
        <nav className="hidden items-center gap-5 text-sm font-semibold text-slate-300 lg:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="sm" className="hidden text-slate-200 hover:bg-white/10 hover:text-white md:inline-flex">
            <Link href="#oportunidades">
              <Search className="h-4 w-4" />
              Buscar
            </Link>
          </Button>
          <Button asChild size="sm" className="shrink-0">
            <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" />
              Faça parte
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
