"use client";

import { motion, useMotionTemplate, useMotionValue } from "motion/react";
import React, { type MouseEvent, type ReactNode } from "react";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className = "",
  delay = 0,
  style,
  spotlightColor = "rgba(27, 59, 255, 0.14)"
}: SpotlightCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className={`group relative overflow-hidden transition-shadow duration-300 hover:shadow-lg ${className}`}
      style={style}
    >
      {/* Luz Spotlight que segue o cursor */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              320px circle at ${mouseX}px ${mouseY}px,
              ${spotlightColor},
              transparent 80%
            )
          `
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}
