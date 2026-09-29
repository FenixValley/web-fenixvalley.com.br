"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
  duration?: number;
}

export function AnimatedCounter({
  value,
  className = "",
  duration = 1.8
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Extrai prefixo, número e sufixo (ex: "R$ 4M" -> prefix "R$ ", num 4, suffix "M")
  // Ex: "120+" -> prefix "", num 120, suffix "+"
  const match = value.match(/^([^\d]*)([\d.,]+)(.*)$/);
  
  if (!match) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  const prefix = match[1];
  const numericStr = match[2].replace(",", ".");
  const suffix = match[3];
  const targetNumber = parseFloat(numericStr) || 0;

  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, {
    damping: 35,
    stiffness: 120
  });

  const [displayNumber, setDisplayNumber] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionVal.set(targetNumber);
    }
  }, [isInView, targetNumber, motionVal]);

  useEffect(() => {
    const unsubscribe = springVal.on("change", (latest) => {
      // Se for número inteiro, arredonda sem casas
      if (Number.isInteger(targetNumber)) {
        setDisplayNumber(Math.round(latest));
      } else {
        setDisplayNumber(parseFloat(latest.toFixed(1)));
      }
    });
    return () => unsubscribe();
  }, [springVal, targetNumber]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayNumber}
      {suffix}
    </span>
  );
}
