import Image from "next/image";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "#ecossistema", label: "Ecossistema" },
  { href: "#oportunidades", label: "Oportunidades" },
  { href: "#participar", label: "Participar" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur">
      <div className="section-shell flex h-16 items-center justify-between gap-4">
        <Link href="#" className="flex items-center gap-3" aria-label="Fênix Valley">
          <Image src="/logo-fenix-valley.svg" alt="" width={130} height={98} priority className="h-11 w-auto" />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-semibold text-muted-foreground md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="transition-colors hover:text-foreground">
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" className="shrink-0">
          <Link href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX" target="_blank" rel="noreferrer">
            <MessageCircle className="h-4 w-4" />
            Entrar
          </Link>
        </Button>
      </div>
    </header>
  );
}
