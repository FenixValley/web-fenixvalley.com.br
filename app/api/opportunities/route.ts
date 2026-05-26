import { NextResponse } from "next/server";
import { opportunities } from "@/data/opportunities";

export const dynamic = "force-static";

export function GET() {
  return NextResponse.json(opportunities);
}
