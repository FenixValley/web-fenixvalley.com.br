import { eq } from "drizzle-orm";
import { actors } from "@/db/schema";
import type { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function uniqueActorSlug(db: ReturnType<typeof getDb>, name: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let suffix = 2;
  while (
    await db.query.actors.findFirst({ where: eq(actors.slug, slug), columns: { id: true } })
  ) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}
