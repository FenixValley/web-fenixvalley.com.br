"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";
import { ecosystemActors } from "@/data/ecosystem";

// Posições (0-100) a partir dos % dos atores.
const pts = ecosystemActors.map((a) => ({
  name: a.name,
  x: parseFloat(a.x),
  y: parseFloat(a.y)
}));

// Arestas da rede (índices em ecosystemActors): Investidores no centro + cruzamentos.
const edges = [
  [4, 0],
  [4, 1],
  [4, 2],
  [4, 3],
  [0, 3],
  [1, 2]
];

// Painel "mapa vivo": rede de conexões animada (SVG/motion) + atores pulsantes.
export function EcosystemLivePanel() {
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
    >
      {/* malha de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.5]"
        style={{
          backgroundImage:
            "linear-gradient(var(--fx-line) 1px, transparent 1px), linear-gradient(90deg, var(--fx-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* conexões animadas */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        {edges.map(([a, b], i) => (
          <motion.line
            key={`${a}-${b}`}
            x1={pts[a].x}
            y1={pts[a].y}
            x2={pts[b].x}
            y2={pts[b].y}
            stroke="var(--fx-accent)"
            strokeWidth={0.4}
            strokeOpacity={0.45}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 + i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </svg>

      {/* atores pulsantes */}
      {ecosystemActors.map((actor, index) => (
        <motion.div
          key={actor.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: actor.x, top: actor.y }}
          initial={{ opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.12, type: "spring", stiffness: 220, damping: 16 }}
        >
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <motion.span
                className="absolute inline-flex h-full w-full rounded-full"
                style={{ background: "var(--fx-accent)" }}
                animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeOut" }}
              />
              <span className="relative inline-flex h-3 w-3 rounded-full" style={{ background: "var(--fx-accent)" }} />
            </span>
            <span
              className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] shadow-sm"
              style={{ background: "var(--fx-paper)", color: "var(--fx-ink)" }}
            >
              {actor.name}
            </span>
          </div>
        </motion.div>
      ))}

      <Link
        href="/mapa"
        className="group absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-full px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] shadow-sm transition-transform hover:scale-[1.03]"
        style={{ background: "var(--fx-accent)", color: "#ffffff" }}
      >
        Abrir o mapa
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
