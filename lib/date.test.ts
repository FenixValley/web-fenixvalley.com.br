import { describe, expect, it } from "vitest";
import { todayInBusinessTimeZone } from "./date";

describe("todayInBusinessTimeZone", () => {
  it("devolve o formato AAAA-MM-DD com zero à esquerda", () => {
    // 2026-03-05T12:00Z => 09:00 em Betim, mesmo dia
    expect(todayInBusinessTimeZone(new Date("2026-03-05T12:00:00Z"))).toBe("2026-03-05");
  });

  it("usa o calendário de Betim, não o UTC", () => {
    // 2026-03-06T02:00Z ainda é dia 5 em Betim (UTC-3)
    expect(todayInBusinessTimeZone(new Date("2026-03-06T02:00:00Z"))).toBe("2026-03-05");
  });

  it("não adianta o dia no fim da noite em Betim", () => {
    // 2026-03-05T23:00Z => 20h do dia 5 em Betim; toISOString() daria dia 5 aqui,
    // mas às 21h locais (00:00Z do dia 6) passaria a adiantar — este caso trava isso.
    expect(todayInBusinessTimeZone(new Date("2026-03-06T00:30:00Z"))).toBe("2026-03-05");
  });
});
