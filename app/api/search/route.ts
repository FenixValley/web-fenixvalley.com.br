import { NextResponse } from "next/server";
import { and, eq, like, or } from "drizzle-orm";
import { actors, challenges, events, opportunities, partners } from "@/db/schema";
import { contentArticles } from "@/data/contents";
import { getDb } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (!q || q.length < 2) {
    return NextResponse.json({
      query: q,
      total: 0,
      results: {
        actors: [],
        opportunities: [],
        events: [],
        challenges: [],
        partners: [],
        contents: []
      }
    });
  }

  const db = getDb();
  const searchPattern = `%${q}%`;

  const [foundActors, foundOpportunities, foundEvents, foundChallenges, foundPartners] =
    await Promise.all([
      db
        .select({
          id: actors.id,
          name: actors.name,
          type: actors.type,
          segment: actors.segment,
          neighborhood: actors.neighborhood,
          slug: actors.slug
        })
        .from(actors)
        .where(
          and(
            eq(actors.status, "approved"),
            or(
              like(actors.name, searchPattern),
              like(actors.segment, searchPattern),
              like(actors.neighborhood, searchPattern),
              like(actors.description, searchPattern)
            )
          )
        )
        .limit(6),

      db
        .select({
          id: opportunities.id,
          title: opportunities.title,
          type: opportunities.type,
          stage: opportunities.stage,
          link: opportunities.link
        })
        .from(opportunities)
        .where(
          and(
            eq(opportunities.status, "published"),
            or(like(opportunities.title, searchPattern), like(opportunities.audience, searchPattern))
          )
        )
        .limit(6),

      db
        .select({
          id: events.id,
          title: events.title,
          category: events.category,
          date: events.date,
          slug: events.slug
        })
        .from(events)
        .where(
          and(
            eq(events.status, "approved"),
            or(like(events.title, searchPattern), like(events.description, searchPattern))
          )
        )
        .limit(6),

      db
        .select({
          id: challenges.id,
          title: challenges.title,
          category: challenges.category,
          company: challenges.company,
          slug: challenges.slug
        })
        .from(challenges)
        .where(
          and(
            eq(challenges.status, "published"),
            or(
              like(challenges.title, searchPattern),
              like(challenges.company, searchPattern),
              like(challenges.category, searchPattern)
            )
          )
        )
        .limit(6),

      db
        .select({
          id: partners.id,
          name: partners.name,
          category: partners.category,
          slug: partners.slug
        })
        .from(partners)
        .where(
          and(
            eq(partners.status, "published"),
            or(like(partners.name, searchPattern), like(partners.category, searchPattern))
          )
        )
        .limit(6)
    ]);

  // Busca em conteúdos estáticos
  const foundContents = contentArticles
    .filter(
      (article) =>
        article.title.toLowerCase().includes(q) ||
        article.summary.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q))
    )
    .slice(0, 6)
    .map((article) => ({
      slug: article.slug,
      title: article.title,
      category: article.category,
      summary: article.summary
    }));

  const total =
    foundActors.length +
    foundOpportunities.length +
    foundEvents.length +
    foundChallenges.length +
    foundPartners.length +
    foundContents.length;

  return NextResponse.json({
    query: q,
    total,
    results: {
      actors: foundActors,
      opportunities: foundOpportunities,
      events: foundEvents,
      challenges: foundChallenges,
      partners: foundPartners,
      contents: foundContents
    }
  });
}
