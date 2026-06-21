import Link from "next/link";
import { editorialNav } from "./theme";

export function EditorialHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur" style={{ borderColor: "var(--fx-line)", background: "rgba(255,255,255,0.82)" }}>
      <div className="mx-auto flex w-full max-w-[1180px] items-baseline justify-between gap-6 px-6 py-4 sm:px-10">
        <Link href="/" className="font-display text-[21px] font-semibold tracking-[-0.01em]">
          Fênix Valley
        </Link>
        <nav className="hidden items-center gap-7 font-mono text-[12px] uppercase tracking-[0.16em] sm:flex">
          {editorialNav.map((item) => {
            const isActive = active === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group relative"
                style={{ color: isActive ? "var(--fx-accent)" : "var(--fx-muted)" }}
              >
                {item.label}
                <span
                  aria-hidden
                  className="absolute -bottom-1 left-0 h-px origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
                  style={{
                    width: "100%",
                    background: "var(--fx-accent)",
                    transform: isActive ? "scaleX(1)" : "scaleX(0)"
                  }}
                />
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
