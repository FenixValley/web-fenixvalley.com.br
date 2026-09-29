"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Building2, GraduationCap, Lightbulb, Sparkles, type LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { programs } from "@/data/ecosystem";
import { AnimatedIcon } from "@/components/editorial/animated-icon";
import { SpotlightCard } from "@/components/editorial/spotlight-card";
import { SectionHeading } from "@/components/editorial/section-heading";

const iconByTag: Record<string, LucideIcon> = {
  Ideação: Lightbulb,
  Empresas: Building2,
  Talentos: GraduationCap
};

const filterTabs = [
  { id: "all", label: "Todos os programas" },
  { id: "Ideação", label: "Ideação & Startups" },
  { id: "Empresas", label: "Empresas & Indústria" },
  { id: "Talentos", label: "Talentos & Formação" }
];

export function EditorialPrograms() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredPrograms =
    activeFilter === "all"
      ? programs
      : programs.filter((p) => p.tag.toLowerCase() === activeFilter.toLowerCase());

  return (
    <section id="programas" className="mx-auto w-full max-w-[1180px] px-6 py-16 sm:px-10 sm:py-20">
      <SectionHeading
        kicker="Programas"
        title="Uma esteira da ideia ao negócio com impacto."
        accent="impacto"
        meta="trilhas"
      />

      {/* Abas de filtro interativas */}
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
        <div
          className="flex flex-wrap gap-1.5 rounded-full border p-1"
          style={{ borderColor: "var(--fx-line)", background: "rgba(242,245,255,0.6)" }}
        >
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className="relative rounded-full px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors focus:outline-none"
                style={{
                  color: isActive ? "#ffffff" : "var(--fx-muted)"
                }}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-program-tab"
                    className="absolute inset-0 rounded-full shadow-sm"
                    style={{ background: "var(--fx-accent)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <span className="font-mono text-[11px] uppercase tracking-[0.18em]" style={{ color: "var(--fx-muted)" }}>
          {filteredPrograms.length} {filteredPrograms.length === 1 ? "trilha disponível" : "trilhas disponíveis"}
        </span>
      </div>

      <motion.div layout className="mt-8 grid gap-5 md:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filteredPrograms.map((program, index) => {
            const Icon = iconByTag[program.tag] ?? Lightbulb;
            return (
              <motion.div
                key={program.title}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
              >
                <SpotlightCard
                  className="group flex h-full flex-col gap-5 rounded-2xl border p-7"
                  style={{ borderColor: "var(--fx-line)", background: "var(--fx-paper)" }}
                  spotlightColor="rgba(27, 59, 255, 0.12)"
                >
                  <div className="flex items-center justify-between">
                    <AnimatedIcon>
                      <Icon className="h-5 w-5" strokeWidth={1.6} />
                    </AnimatedIcon>
                    <span
                      className="rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em]"
                      style={{ background: "var(--fx-accent-soft)", color: "var(--fx-accent)" }}
                    >
                      {program.tag}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-[21px] font-semibold" style={{ color: "var(--fx-ink)" }}>
                      {program.title}
                    </h3>
                    <p className="mt-2 font-body text-[15px] leading-[1.6]" style={{ color: "var(--fx-muted)" }}>
                      {program.description}
                    </p>
                  </div>
                  <Link
                    href={program.href}
                    className="inline-flex items-center gap-1.5 font-mono text-[12px] uppercase tracking-[0.16em] transition-transform group-hover:translate-x-1"
                    style={{ color: "var(--fx-accent)" }}
                  >
                    Conhecer programa
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </Link>
                </SpotlightCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
