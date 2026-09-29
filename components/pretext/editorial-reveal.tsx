"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Reveal editorial: fade + leve subida ao entrar na viewport (scroll).
// A redução para prefers-reduced-motion é tratada pelo <MotionConfig reducedMotion="user">
// na casca — por isso não ramificamos no render (evita hydration mismatch).
export function EditorialReveal({
  children,
  delay = 0,
  className
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
