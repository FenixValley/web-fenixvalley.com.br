import Link from "next/link";
import { editorialNav } from "./theme";

export function EditorialFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}>
      <div className="mx-auto grid w-full max-w-[1180px] gap-10 px-6 py-14 sm:px-10 md:grid-cols-[1.4fr_1fr]">
        <div className="max-w-md">
          <p className="font-display text-[24px] font-semibold leading-tight">
            Betim renascendo pela inovação.
          </p>
          <p className="mt-3 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
            Conecte-se ao ecossistema que transforma ideias em negócios e talentos em
            oportunidades.
          </p>
          <a
            href="https://chat.whatsapp.com/EtCfWvncoQZ6tx7I8obFzX"
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-block font-mono text-[12px] uppercase tracking-[0.18em]"
            style={{ color: "var(--fx-accent)" }}
          >
            Comunidade no WhatsApp →
          </a>
        </div>
        <nav className="flex flex-col gap-2 font-mono text-[12px] uppercase tracking-[0.16em] md:items-end" style={{ color: "var(--fx-muted)" }}>
          {editorialNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition-opacity hover:opacity-60">
              {item.label}
            </Link>
          ))}
          <Link href="/privacidade" className="transition-opacity hover:opacity-60">
            Privacidade
          </Link>
        </nav>
      </div>
      <div className="border-t" style={{ borderColor: "var(--fx-line)" }}>
        <div className="mx-auto flex w-full max-w-[1180px] flex-col gap-2 px-6 py-6 font-mono text-[11px] uppercase tracking-[0.16em] sm:flex-row sm:items-center sm:justify-between sm:px-10" style={{ color: "var(--fx-muted)" }}>
          <span>Fênix Valley — Betim · MG</span>
          <span>© {new Date().getFullYear()} · Ecossistema de inovação</span>
        </div>
      </div>
    </footer>
  );
}
