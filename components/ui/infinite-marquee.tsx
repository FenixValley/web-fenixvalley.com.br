"use client";

import { motion } from "motion/react";

interface InfiniteMarqueeProps {
  items?: string[];
  speed?: number;
  className?: string;
}

const defaultItems = [
  "Startups Locais",
  "Indústria 4.0",
  "Polo Universitário",
  "Residência Tecnológica",
  "Aceleração de Negócios",
  "Capital & Investimento",
  "Hackathons & Desafios",
  "Inovação Aberta",
  "Deeptech",
  "ESG & Sustentabilidade"
];

export function InfiniteMarquee({
  items = defaultItems,
  speed = 28,
  className = ""
}: InfiniteMarqueeProps) {
  // Duplicamos os itens para um loop contínuo perfeito
  const displayItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y py-3 ${className}`}
      style={{
        borderColor: "var(--fx-line)",
        background: "rgba(242, 245, 255, 0.45)"
      }}
    >
      {/* Máscaras de gradiente lateral para fade suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-[var(--fx-paper)] to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-[var(--fx-paper)] to-transparent"
      />

      <motion.div
        className="flex w-max items-center gap-8 hover:[animation-play-state:paused]"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear"
        }}
      >
        {displayItems.map((item, idx) => (
          <div key={`${item}-${idx}`} className="flex items-center gap-8 shrink-0">
            <span
              className="font-mono text-[11px] font-semibold uppercase tracking-[0.24em] transition-colors hover:text-[#1b3bff]"
              style={{ color: "var(--fx-muted)" }}
            >
              {item}
            </span>
            <span
              className="inline-block h-1.5 w-1.5 rounded-full"
              style={{ background: "var(--fx-accent)", opacity: 0.6 }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
