import { and, desc, eq, gte } from "drizzle-orm";
import { NextResponse } from "next/server";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";

export async function GET() {
  // Vencidas não aparecem como abertas: só datas de hoje em diante
  const today = new Date().toISOString().slice(0, 10);
  const rows = await getDb()
    .select()
    .from(opportunities)
    .where(and(eq(opportunities.status, "published"), gte(opportunities.date, today)))
    .orderBy(desc(opportunities.featured), opportunities.date);

  return NextResponse.json(
    rows.map((row) => ({
      id: String(row.id),
      title: row.title,
      type: row.type,
      stage: row.stage,
      audience: row.audience,
      date: row.date,
      owner: row.owner,
      link: row.link,
      featured: Boolean(row.featured)
    }))
  );
}
