import { eq } from "drizzle-orm";
import { challenges } from "@/db/schema";
import type { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function uniqueChallengeSlug(db: ReturnType<typeof getDb>, title: string): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  while (await db.query.challenges.findFirst({ where: eq(challenges.slug, slug), columns: { id: true } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}
