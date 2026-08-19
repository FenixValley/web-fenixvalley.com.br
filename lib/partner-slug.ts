import { eq } from "drizzle-orm";
import { partners } from "@/db/schema";
import type { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function uniquePartnerSlug(db: ReturnType<typeof getDb>, name: string): Promise<string> {
  const base = slugify(name);
  let slug = base;
  let suffix = 2;
  while (await db.query.partners.findFirst({ where: eq(partners.slug, slug), columns: { id: true } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}
