"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const storageKey = "fenix-theme";

export function ThemeToggle({ className }: { className?: string }) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    const light = localStorage.getItem(storageKey) === "light";
    document.documentElement.classList.toggle("theme-light", light);
    setIsLight(light);
  }, []);

  function toggleTheme() {
    const nextIsLight = !isLight;
    document.documentElement.classList.toggle("theme-light", nextIsLight);
    localStorage.setItem(storageKey, nextIsLight ? "light" : "dark");
    setIsLight(nextIsLight);
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        "inline-flex h-9 items-center gap-2 rounded-md border border-white/10 bg-white/5 px-3 text-xs font-bold text-slate-100 transition-colors hover:bg-white/10",
        className
      )}
      aria-label={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
      title={isLight ? "Ativar tema escuro" : "Ativar tema claro"}
    >
      {isLight ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
      <span className="hidden sm:inline">{isLight ? "Dark" : "White"}</span>
    </button>
  );
}
