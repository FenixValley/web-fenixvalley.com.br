"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

// Card editorial com reveal no scroll (stagger via delay) + lift no hover.
export function MotionCard({
  children,
  className,
  delay = 0,
  style
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={reduceMotion ? undefined : { y: -6 }}
    >
      {children}
    </motion.div>
  );
}
