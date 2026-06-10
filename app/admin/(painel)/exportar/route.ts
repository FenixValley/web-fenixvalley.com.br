import { desc } from "drizzle-orm";
import { leads, volunteers } from "@/db/schema";
import { auth } from "@/lib/auth";
import { getDb } from "@/lib/db";

export const dynamic = "force-dynamic";

function toCsv(headers: string[], rows: (string | null)[][]): string {
  const escapeCell = (value: string | null) => {
    const cell = value ?? "";
    return /[",\n;]/.test(cell) ? `"${cell.replaceAll('"', '""')}"` : cell;
  };
  return [headers, ...rows].map((row) => row.map(escapeCell).join(",")).join("\n");
}

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return new Response("Não autorizado.", { status: 401 });
  }

  const type = new URL(request.url).searchParams.get("type");
  const db = getDb();

  let csv: string;
  if (type === "volunteers") {
    const rows = await db.select().from(volunteers).orderBy(desc(volunteers.id));
    csv = toCsv(
      ["nome", "email", "telefone", "area", "disponibilidade", "motivacao", "status", "criado_em"],
      rows.map((v) => [v.name, v.email, v.phone, v.area, v.availability, v.motivation, v.status, v.createdAt])
    );
  } else if (type === "leads") {
    const rows = await db.select().from(leads).orderBy(desc(leads.id));
    csv = toCsv(
      ["nome", "email", "perfil", "objetivo", "criado_em"],
      rows.map((l) => [l.name, l.email, l.profile, l.objective, l.createdAt])
    );
  } else {
    return new Response("Use ?type=leads ou ?type=volunteers.", { status: 400 });
  }

  return new Response(`﻿${csv}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="fenixvalley-${type}.csv"`
    }
  });
}
