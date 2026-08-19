/** Eventos e oportunidades usam o calendário local de Betim, não UTC. */
export const BUSINESS_TIME_ZONE = "America/Sao_Paulo";

/**
 * Data de hoje em AAAA-MM-DD no fuso de Betim, montada a partir das partes.
 *
 * Formatar com o locale `en-CA` também devolve AAAA-MM-DD hoje, mas esse formato vem
 * dos dados de CLDR do runtime e não é garantido pela spec — como o valor é comparado
 * direto com `events.date`/`opportunities.date` no banco, montamos explicitamente.
 */
export function todayInBusinessTimeZone(now: Date = new Date()): string {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: BUSINESS_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(now);
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((item) => item.type === type)?.value ?? "";
  return `${part("year")}-${part("month")}-${part("day")}`;
}
