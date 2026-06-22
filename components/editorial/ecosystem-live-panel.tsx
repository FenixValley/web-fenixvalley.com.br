"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { ecosystemActors } from "@/data/ecosystem";
import { LottiePlayer } from "@/components/editorial/lottie-player";

// Painel "mapa vivo": pulso Lottie ao centro + atores como pontos pulsantes.
export function EcosystemLivePanel() {
  const reduceMotion = useReducedMotion();
  return (
    <div
      className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border"
      style={{ borderColor: "var(--fx-line)", background: "var(--fx-surface)" }}
    >
      {/* rede de nós animada (Lottie) como pano de fundo vivo */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.55]">
        <LottiePlayer name="network" className="h-[125%] w-[125%]" />
      </div>

      {ecosystemActors.map((actor, index) => (
        <motion.div
          key={actor.name}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: actor.x, top: actor.y }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.4 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + index * 0.12, type: "spring", stiffness: 220, damping: 16 }}
        >
          <div className="group flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              {!reduceMotion ? (
                <motion.span
                  className="absolute inline-flex h-full w-full rounded-full"
                  style={{ background: "var(--fx-accent)" }}
                  animate={{ scale: [1, 2.4], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: index * 0.3, ease: "easeOut" }}
                />
              ) : null}
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
