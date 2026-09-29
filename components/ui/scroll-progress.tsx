"use client";

import { motion, useScroll, useSpring } from "motion/react";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[60] h-[2.5px] origin-left bg-[#1b3bff] shadow-[0_0_12px_#1b3bff]"
      style={{ scaleX }}
    />
  );
}
