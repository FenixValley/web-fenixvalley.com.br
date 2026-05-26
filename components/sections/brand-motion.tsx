"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export function BrandMotion() {
  const ringRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(ringRef.current, {
        rotate: 360,
        duration: 24,
        ease: "none",
        repeat: -1
      });
      gsap.to(pulseRef.current, {
        scale: 1.08,
        opacity: 0.78,
        duration: 1.7,
        yoyo: true,
        repeat: -1,
        ease: "power1.inOut"
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[430px]" aria-hidden="true">
      <div ref={pulseRef} className="absolute inset-[12%] rounded-full border border-blue-300 bg-white/55" />
      <div
        ref={ringRef}
        className="absolute inset-[6%] rounded-full border-2 border-dashed border-orange-300/80"
      />
      <motion.div
        initial={{ y: 18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className="absolute left-8 top-12"
      >
        <Badge variant="secondary">Betim Tech</Badge>
      </motion.div>
      <motion.div
        initial={{ y: -12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.18, duration: 0.65, ease: "easeOut" }}
        className="absolute bottom-16 right-4"
      >
        <Badge variant="accent">Nova economia</Badge>
      </motion.div>
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.08, duration: 0.75, ease: "easeOut" }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="flex h-44 w-44 items-center justify-center rounded-full bg-secondary text-7xl font-black text-white shadow-crisp sm:h-56 sm:w-56">
          FV
        </div>
      </motion.div>
    </div>
  );
}
