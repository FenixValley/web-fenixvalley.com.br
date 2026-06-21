"use client";

import { ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

type IndexItem = { title: string; description: string };

// Lista numerada editorial com animação: cada linha entra em stagger ao rolar e
// reage ao hover (número em acento, linha desliza, seta aparece).
export function IndexList({ items }: { items: IndexItem[] }) {
  const reduceMotion = useReducedMotion();
  return (
    <ol>
      {items.map((item, index) => (
        <motion.li
          key={item.title}
          initial={reduceMotion ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
          className="group relative grid grid-cols-[auto_1fr] items-baseline gap-x-6 gap-y-1 border-t py-6 sm:grid-cols-[5rem_minmax(0,22rem)_1fr]"
          style={{ borderColor: "var(--fx-line)" }}
          whileHover={reduceMotion ? undefined : { x: 6 }}
        >
          {/* barra de acento que cresce no hover */}
          <span
            aria-hidden
            className="absolute left-0 top-[-1px] h-px w-0 transition-all duration-500 group-hover:w-full"
            style={{ background: "var(--fx-accent)" }}
          />
          <span
            className="font-mono text-[13px] transition-colors"
            style={{ color: "var(--fx-accent)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="flex items-center gap-2 font-display text-[21px] font-medium sm:text-[23px]">
            {item.title}
            <ArrowUpRight
              className="h-4 w-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              style={{ color: "var(--fx-accent)" }}
            />
          </h3>
          <p
            className="col-start-2 font-body text-[16px] leading-[1.6] sm:col-start-3"
            style={{ color: "var(--fx-muted)" }}
          >
            {item.description}
          </p>
        </motion.li>
      ))}
    </ol>
  );
}
