"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Tile com ícone Lucide animado: "pop" ao entrar na viewport e gira/escala no
// hover. Recebe o ícone já renderizado como children (elemento) para não passar
// uma função de Server p/ Client Component.
export function AnimatedIcon({
  children,
  className
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.span
      className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${className ?? ""}`}
      style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
      initial={reduceMotion ? false : { scale: 0.5, opacity: 0, rotate: -12 }}
      whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
      viewport={{ once: true }}
      transition={{ type: "spring", stiffness: 240, damping: 16 }}
      whileHover={reduceMotion ? undefined : { rotate: -8, scale: 1.1 }}
    >
      {children}
    </motion.span>
  );
}
