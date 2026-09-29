"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion } from "motion/react";

type EcosystemNode = {
  id: string;
  name: string;
  x: number; // Porcentagem horizontal exata
  y: number; // Porcentagem vertical exata
  isCore?: boolean;
};

// 6 atores perfeitamente alinhados com simetria bilateral e distâncias idênticas
// Eixo de simetria vertical em X = 50%
const nodes: EcosystemNode[] = [
  {
    id: "universidades",
    name: "Universidades",
    x: 50,
    y: 18
  },
  {
    id: "startups",
    name: "Startups",
    x: 24,
    y: 38
  },
  {
    id: "empresas",
    name: "Empresas",
    x: 76,
    y: 38
  },
  {
    id: "hubs",
    name: "Hubs",
    x: 50,
    y: 52,
    isCore: true
  },
  {
    id: "mentores",
    name: "Mentores",
    x: 24,
    y: 72
  },
  {
    id: "investidores",
    name: "Investidores",
    x: 76,
    y: 72
  }
];

// Conexões limpas e simétricas entre os atores
const edges: [number, number][] = [
  // Linhas verticais e horizontais perfeitas
  [1, 4], // Startups <-> Mentores (vertical perfeita em X = 24%)
  [2, 5], // Empresas <-> Investidores (vertical perfeita em X = 76%)
  [4, 5], // Mentores <-> Investidores (horizontal perfeita em Y = 72%)
  [0, 3], // Universidades <-> Hubs (vertical perfeita em X = 50%)

  // Conexões triangulares superiores (telhado simétrico)
  [1, 0], // Startups <-> Universidades
  [0, 2], // Universidades <-> Empresas

  // Conexões radiais com o Hub Central (raios simétricos)
  [3, 1], // Hubs <-> Startups
  [3, 2], // Hubs <-> Empresas
  [3, 4], // Hubs <-> Mentores
  [3, 5]  // Hubs <-> Investidores
];

export function EcosystemLivePanel() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border select-none shadow-sm"
      style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
    >
      {/* Malha blueprint suave de fundo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(var(--fx-line) 1px, transparent 1px), linear-gradient(90deg, var(--fx-line) 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* Badge superior: Rede Viva */}
      <div
        className="absolute left-4 top-4 z-20 flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] shadow-sm backdrop-blur-md"
        style={{ borderColor: "var(--fx-line)", background: "rgba(255, 255, 255, 0.9)" }}
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full rounded-full bg-[#1b3bff] animate-ping opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[#1b3bff]" />
        </span>
        <span style={{ color: "var(--fx-ink)", fontWeight: 500 }}>Rede Viva • Toque nos nós</span>
      </div>

      {/* Conexões SVG animadas conectadas exatamente ao centro de cada nó */}
      <svg
        aria-hidden
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full pointer-events-none z-10"
      >
        {edges.map(([a, b]) => {
          const isConnected = hoveredIndex !== null && (a === hoveredIndex || b === hoveredIndex);
          const isDimmed = hoveredIndex !== null && !isConnected;

          return (
            <motion.line
              key={`edge-${a}-${b}`}
              x1={nodes[a].x}
              y1={nodes[a].y}
              x2={nodes[b].x}
              y2={nodes[b].y}
              stroke="var(--fx-accent)"
              strokeWidth={isConnected ? 0.9 : 0.45}
              strokeOpacity={isConnected ? 0.95 : isDimmed ? 0.12 : 0.4}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{
                pathLength: 1,
                opacity: 1,
                strokeWidth: isConnected ? 0.9 : 0.45,
                strokeOpacity: isConnected ? 0.95 : isDimmed ? 0.12 : 0.4
              }}
              transition={{
                pathLength: { duration: 0.8, delay: 0.1 + (a + b) * 0.03, ease: "easeOut" },
                opacity: { duration: 0.4 },
                strokeWidth: { duration: 0.2 },
                strokeOpacity: { duration: 0.2 }
              }}
            />
          );
        })}
      </svg>

      {/* Nós do ecossistema: Badges coesos e perfeitamente centrados nos vértices */}
      {nodes.map((node, index) => {
        const isHovered = hoveredIndex === index;
        const isCore = node.isCore;

        return (
          <div
            key={node.id}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            style={{ left: `${node.x}%`, top: `${node.y}%` }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <div
              className="flex items-center gap-1.5 sm:gap-2 rounded-full border px-2.5 sm:px-3.5 py-1 sm:py-1.5 shadow-sm transition-all duration-200 cursor-pointer select-none hover:scale-[1.05] active:scale-95"
              style={{
                background: isHovered
                  ? "var(--fx-accent)"
                  : isCore
                  ? "rgba(240, 244, 255, 0.98)"
                  : "rgba(255, 255, 255, 0.96)",
                borderColor: isHovered
                  ? "var(--fx-accent)"
                  : isCore
                  ? "rgba(27, 59, 255, 0.4)"
                  : "var(--fx-line)",
                color: isHovered
                  ? "#ffffff"
                  : isCore
                  ? "var(--fx-accent)"
                  : "var(--fx-ink)",
                boxShadow: isHovered
                  ? "0 4px 16px rgba(27, 59, 255, 0.3)"
                  : isCore
                  ? "0 2px 8px rgba(27, 59, 255, 0.1)"
                  : "0 1px 3px rgba(0, 0, 0, 0.04)"
              }}
            >
              {/* Ponto de status pulsante */}
              <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 shrink-0 items-center justify-center">
                <span
                  className="absolute inline-flex h-full w-full rounded-full animate-ping opacity-60"
                  style={{
                    background: isHovered ? "#ffffff" : "var(--fx-accent)"
                  }}
                />
                <span
                  className="relative inline-flex h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full"
                  style={{
                    background: isHovered ? "#ffffff" : "var(--fx-accent)"
                  }}
                />
              </span>

              {/* Nome do ator em tipografia mono editorial */}
              <span className="font-mono text-[9px] sm:text-[10.5px] font-semibold uppercase tracking-[0.14em] whitespace-nowrap">
                {node.name}
              </span>
            </div>
          </div>
        );
      })}

      {/* Botão inferior direito: Abrir o mapa */}
      <Link
        href="/mapa"
        className="group absolute bottom-4 right-4 z-20 inline-flex items-center gap-2 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2 font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-white shadow-sm transition-transform hover:scale-[1.03]"
        style={{ background: "var(--fx-accent)" }}
      >
        Abrir o mapa
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </Link>
    </div>
  );
}
