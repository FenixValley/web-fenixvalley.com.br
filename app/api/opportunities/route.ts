import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { opportunities } from "@/db/schema";
import { getDb } from "@/lib/db";

export async function GET() {
  const rows = await getDb()
    .select()
    .from(opportunities)
    .where(eq(opportunities.status, "published"));

  return NextResponse.json(
    rows.map((row) => ({
      id: String(row.id),
      title: row.title,
      type: row.type,
      stage: row.stage,
      audience: row.audience,
      date: row.date,
      owner: row.owner
    }))
  );
}
