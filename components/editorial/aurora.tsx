"use client";

import { motion } from "motion/react";

// Orbes desfocados animados (substitui o Lottie) — movimento lento e contínuo.
// A redução para reduced-motion vem do <MotionConfig> da casca.
export function Aurora() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -right-16 -top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(27,59,255,0.55), transparent 70%)" }}
        animate={{ x: [0, -28, 0], y: [0, 24, 0], scale: [1, 1.12, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 left-10 h-64 w-64 rounded-full blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(56,189,248,0.4), transparent 70%)" }}
        animate={{ x: [0, 34, 0], y: [0, -18, 0], scale: [1, 1.18, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
