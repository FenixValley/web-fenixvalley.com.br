"use client";

import { layoutWithLines, prepareWithSegments, type LayoutLine } from "@chenglou/pretext";
import { motion, useReducedMotion } from "motion/react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

// Usa o motor de layout do pretext (chenglou/pretext) para quebrar o título na
// largura disponível e posicionar cada linha em absoluto — re-fluindo no resize
// sem reflow do DOM, como o demo https://chenglou.me/pretext/dynamic-layout/.

type PretextHeadlineProps = {
  text: string;
  /** font-family resolvida (ex.: fraunces.style.fontFamily) — precisa bater com a renderizada. */
  fontFamily: string;
  weight?: number;
  /** fontSize = clamp(minSize, width * sizeRatio, maxSize) */
  sizeRatio?: number;
  minSize?: number;
  maxSize?: number;
  leading?: number;
  /** trecho colorido com o acento (case-insensitive). */
  accent?: string;
  /** nível semântico do heading (1 = h1). */
  level?: 1 | 2 | 3;
  className?: string;
};

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export function PretextHeadline({
  text,
  fontFamily,
  weight = 600,
  sizeRatio = 0.082,
  minSize = 34,
  maxSize = 92,
  leading = 0.94,
  accent,
  level = 1,
  className
}: PretextHeadlineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [layout, setLayout] = useState<{ lines: LayoutLine[]; height: number; fontSize: number } | null>(
    null
  );

  useIsoLayoutEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    let frame = 0;
    function recompute() {
      const node = containerRef.current;
      if (!node) return;
      const width = node.clientWidth;
      if (width <= 0) return;
      const fontSize = Math.max(minSize, Math.min(maxSize, width * sizeRatio));
      const lineHeight = fontSize * leading;
      const font = `${weight} ${fontSize}px/${lineHeight}px ${fontFamily}`;
      const prepared = prepareWithSegments(text, font);
      const result = layoutWithLines(prepared, width, lineHeight);
      setLayout({ lines: result.lines, height: result.height, fontSize });
    }

    function schedule() {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(recompute);
    }

    schedule();
    const observer = new ResizeObserver(schedule);
    observer.observe(node);

    // Re-medir quando a fonte real terminar de carregar (antes mede o fallback).
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(schedule).catch(() => {});
    }

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [text, fontFamily, weight, sizeRatio, minSize, maxSize, leading]);

  const lineHeight = layout ? layout.fontSize * leading : undefined;

  return (
    <div
      ref={containerRef}
      className={className}
      role="heading"
      aria-level={level}
      aria-label={text}
      style={{
        position: "relative",
        width: "100%",
        height: layout ? layout.height : undefined,
        fontFamily,
        fontWeight: weight
      }}
    >
      {layout ? (
        layout.lines.map((line, index) => (
          <motion.span
            key={`${index}-${line.text}`}
            aria-hidden
            initial={reduceMotion ? false : { opacity: 0, y: "0.42em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: "absolute",
              left: 0,
              top: index * (lineHeight ?? 0),
              fontSize: layout.fontSize,
              lineHeight: `${lineHeight}px`,
              whiteSpace: "pre",
              willChange: "transform, opacity"
            }}
          >
            {renderAccent(line.text, accent)}
          </motion.span>
        ))
      ) : (
        // Fallback (SSR / antes da medição / sem JS): fluxo normal, acessível.
        <span aria-hidden style={{ display: "block", lineHeight: leading }}>
          {renderAccent(text, accent)}
        </span>
      )}
    </div>
  );
}

function renderAccent(text: string, accent?: string) {
  if (!accent) return text;
  const lower = text.toLowerCase();
  const target = accent.toLowerCase();
  const at = lower.indexOf(target);
  if (at === -1) return text;
  return (
    <>
      {text.slice(0, at)}
      <span style={{ color: "var(--fx-accent)" }}>{text.slice(at, at + accent.length)}</span>
      {text.slice(at + accent.length)}
    </>
  );
}
