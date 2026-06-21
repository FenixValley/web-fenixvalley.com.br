import { describe, expect, it } from "vitest";
import { slugify } from "./slug";

describe("slugify", () => {
  it("remove acentos e espaços", () => {
    expect(slugify("PUC Minas — Betim")).toBe("puc-minas-betim");
  });

  it("normaliza maiúsculas e símbolos", () => {
    expect(slugify("Fênix Valley!")).toBe("fenix-valley");
  });

  it("não gera slug vazio", () => {
    expect(slugify("???")).toBe("organizacao");
  });
});
