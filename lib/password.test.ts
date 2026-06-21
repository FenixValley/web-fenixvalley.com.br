import { describe, expect, it } from "vitest";
import { hashPassword, verifyPassword } from "./password";

describe("password hashing", () => {
  it("verifica a senha correta", async () => {
    const hash = await hashPassword("segredo-forte");
    expect(await verifyPassword("segredo-forte", hash)).toBe(true);
  });

  it("rejeita senha incorreta", async () => {
    const hash = await hashPassword("segredo-forte");
    expect(await verifyPassword("outra-senha", hash)).toBe(false);
  });

  it("gera salts diferentes a cada hash", async () => {
    expect(await hashPassword("x")).not.toBe(await hashPassword("x"));
  });

  it("rejeita hash malformado sem lançar", async () => {
    expect(await verifyPassword("x", "lixo")).toBe(false);
  });
});
