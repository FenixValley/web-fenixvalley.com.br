import { describe, expect, it } from "vitest";
import { insertWithUniqueSlug } from "./unique-slug";

/** Erro como o D1/SQLite reporta o índice único da coluna slug. */
function slugConflict(table: string) {
  return new Error(`D1_ERROR: UNIQUE constraint failed: ${table}.slug`);
}

describe("insertWithUniqueSlug", () => {
  it("grava na primeira tentativa quando o slug está livre", async () => {
    const usados: string[] = [];
    const resultado = await insertWithUniqueSlug(
      "challenges",
      async () => "meu-desafio",
      async (slug) => {
        usados.push(slug);
        return { slug };
      }
    );

    expect(resultado).toEqual({ slug: "meu-desafio" });
    expect(usados).toEqual(["meu-desafio"]);
  });

  it("pede o próximo candidato quando o slug foi levado por outro envio", async () => {
    // Simula a corrida: o concorrente gravou "meu-desafio" entre a consulta e o insert,
    // então a segunda consulta já enxerga a linha dele e devolve o sufixo.
    const candidatos = ["meu-desafio", "meu-desafio-2"];
    const tentados: string[] = [];
    let indice = 0;

    const resultado = await insertWithUniqueSlug(
      "challenges",
      async () => candidatos[indice++],
      async (slug) => {
        tentados.push(slug);
        if (slug === "meu-desafio") throw slugConflict("challenges");
        return { slug };
      }
    );

    expect(resultado).toEqual({ slug: "meu-desafio-2" });
    expect(tentados).toEqual(["meu-desafio", "meu-desafio-2"]);
  });

  it("propaga erro que não seja conflito de slug, sem repetir", async () => {
    let tentativas = 0;

    await expect(
      insertWithUniqueSlug(
        "challenges",
        async () => "meu-desafio",
        async () => {
          tentativas += 1;
          throw new Error("D1_ERROR: no such table: challenges");
        }
      )
    ).rejects.toThrow("no such table");

    expect(tentativas).toBe(1);
  });

  it("não confunde conflito de outra coluna ou de outra tabela", async () => {
    let tentativas = 0;

    await expect(
      insertWithUniqueSlug(
        "challenges",
        async () => "meu-desafio",
        async () => {
          tentativas += 1;
          throw new Error("D1_ERROR: UNIQUE constraint failed: users.email");
        }
      )
    ).rejects.toThrow("users.email");

    expect(tentativas).toBe(1);
  });

  it("desiste depois do limite de tentativas, propagando o último conflito", async () => {
    let tentativas = 0;

    await expect(
      insertWithUniqueSlug(
        "partners",
        async () => "parceiro",
        async () => {
          tentativas += 1;
          throw slugConflict("partners");
        }
      )
    ).rejects.toThrow("UNIQUE constraint failed: partners.slug");

    expect(tentativas).toBe(5);
  });
});
