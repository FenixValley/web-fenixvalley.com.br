"use client";

import { motion, MotionConfig, type Variants } from "motion/react";

const transition = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };
const viewport = { once: true, margin: "-80px" } as const;

const fadeVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition }
};

const staggerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

type MotionSectionProps = {
  children: React.ReactNode;
  className?: string;
  /** Atraso adicional em segundos antes da animação iniciar. */
  delay?: number;
};

// MotionConfig reducedMotion="user" desativa as animações de transform para quem
// prefere movimento reduzido, mantendo a árvore idêntica entre servidor e cliente
// (trocar motion.div por div causaria mismatch de hidratação com conteúdo invisível).

export function FadeIn({ children, className, delay = 0 }: MotionSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ ...transition, delay }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function Stagger({ children, className }: MotionSectionProps) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        variants={staggerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
      >
        {children}
      </motion.div>
    </MotionConfig>
  );
}

export function StaggerItem({ children, className }: MotionSectionProps) {
  return (
    <motion.div className={className} variants={fadeVariants}>
      {children}
    </motion.div>
  );
}
