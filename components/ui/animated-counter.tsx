"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useMotionValue, useSpring } from "motion/react";

interface AnimatedCounterProps {
  value: string;
  className?: string;
}

export function AnimatedCounter({
  value,
  className = ""
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Extrai prefixo, número e sufixo (ex: "R$ 4M" -> prefix "R$ ", num 4, suffix "M")
  const match = value.match(/^([^\d]*)[\d.,]+(.*)$/);
  const numericStr = match ? value.match(/[\d.,]+/)?.[0]?.replace(",", ".") ?? "0" : "0";
  const targetNumber = parseFloat(numericStr) || 0;
  const prefix = match ? match[1] : "";
  const suffix = match ? match[2] : "";

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
      if (Number.isInteger(targetNumber)) {
        setDisplayNumber(Math.round(latest));
      } else {
        setDisplayNumber(parseFloat(latest.toFixed(1)));
      }
    });
    return () => unsubscribe();
  }, [springVal, targetNumber]);

  if (!match) {
    return <span ref={ref} className={className}>{value}</span>;
  }

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayNumber}
      {suffix}
    </span>
  );
}
