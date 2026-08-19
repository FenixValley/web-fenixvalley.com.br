import { and, eq, gte, isNull, or, type SQL } from "drizzle-orm";
import { challenges } from "@/db/schema";

/**
 * Recorte dos desafios visíveis ao público: publicados e ainda dentro do prazo.
 * Desafio sem prazo segue aberto; com prazo, sai da vitrine no dia seguinte ao
 * encerramento. Usado pelas páginas e pela API para não divergirem.
 */
export function openChallengesWhere(today: string): SQL {
  return and(eq(challenges.status, "published"), or(isNull(challenges.deadline), gte(challenges.deadline, today))!)!;
}

/** Formata a data AAAA-MM-DD do prazo em pt-BR, sem deslocar o dia por fuso. */
export function formatChallengeDeadline(date: string, style: "short" | "long" = "short"): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: style,
    year: "numeric",
    timeZone: "UTC"
  }).format(new Date(`${date}T12:00:00Z`));
}
