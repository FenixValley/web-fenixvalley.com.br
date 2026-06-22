"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

// Card editorial com reveal no scroll (stagger via delay) + lift no hover.
// Redução tratada pelo <MotionConfig reducedMotion="user"> da casca.
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
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -6 }}
    >
      {children}
    </motion.div>
  );
}
