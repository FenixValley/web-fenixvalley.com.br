"use client";

import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

// Carrega um Lottie de /public/lottie/<name>.json e só anima quando está visível
// na viewport (IntersectionObserver) — economiza CPU e respeita reduced-motion.
export function LottiePlayer({
  name,
  className,
  loop = true
}: {
  name: string;
  className?: string;
  loop?: boolean;
}) {
  const [data, setData] = useState<unknown>(null);
  const [inView, setInView] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let active = true;
    fetch(`/lottie/${name}.json`)
      .then((r) => r.json())
      .then((json) => active && setData(json))
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [name]);

  useEffect(() => {
    const node = wrapperRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [data]);

  useEffect(() => {
    const inst = lottieRef.current;
    if (!inst) return;
    if (inView && !reduceMotion) inst.play();
    else inst.pause();
  }, [inView, reduceMotion, data]);

  return (
    <div ref={wrapperRef} className={className} aria-hidden>
      {data ? (
        <Lottie
          lottieRef={lottieRef}
          animationData={data}
          loop={loop}
          autoplay={false}
          className="h-full w-full"
        />
      ) : null}
    </div>
  );
}
