import { eq } from "drizzle-orm";
import { events } from "@/db/schema";
import type { getDb } from "@/lib/db";
import { slugify } from "@/lib/slug";

export async function uniqueEventSlug(db: ReturnType<typeof getDb>, title: string): Promise<string> {
  const base = slugify(title);
  let slug = base;
  let suffix = 2;
  while (await db.query.events.findFirst({ where: eq(events.slug, slug), columns: { id: true } })) {
    slug = `${base}-${suffix++}`;
  }
  return slug;
}
