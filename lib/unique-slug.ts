const MAX_SLUG_ATTEMPTS = 5;

/** Conflito do índice único da coluna `slug`, como o D1/SQLite reporta. */
function isSlugConflict(error: unknown, table: string): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return message.includes(`UNIQUE constraint failed: ${table}.slug`);
}

/**
 * Gera o slug e grava na mesma tentativa.
 *
 * O D1 não tem transação, então entre consultar "esse slug está livre?" e gravar
 * existe uma janela em que outro envio simultâneo leva o mesmo valor — e o insert
 * perdedor estourava o índice único, virando 500 na rota pública. Aqui o próprio
 * índice é o árbitro: no conflito pedimos o próximo candidato (a consulta agora
 * enxerga a linha do concorrente) e tentamos de novo. Qualquer outro erro sobe.
 */
export async function insertWithUniqueSlug<T>(
  table: string,
  nextSlug: () => Promise<string>,
  insert: (slug: string) => Promise<T>
): Promise<T> {
  for (let attempt = 0; attempt < MAX_SLUG_ATTEMPTS; attempt += 1) {
    const slug = await nextSlug();
    try {
      return await insert(slug);
    } catch (error) {
      if (!isSlugConflict(error, table)) throw error;
    }
  }
  // Esgotados os candidatos determinísticos (exigiria vários envios simultâneos do
  // mesmo título): uma última tentativa com sufixo aleatório em vez de devolver 500
  // para quem só perdeu a corrida pelo sufixo sequencial.
  const fallbackBase = await nextSlug();
  const fallbackSlug = `${fallbackBase}-${Math.random().toString(36).slice(2, 8)}`;
  return await insert(fallbackSlug);
}
