import { getCloudflareContext } from "@opennextjs/cloudflare";
import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";

export function getDb() {
  const { env } = getCloudflareContext();
  return drizzle(env.DB, { schema });
}
