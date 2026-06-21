import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getSitePage, sitePages } from "@/data/site-pages";
import { InternalPage } from "@/components/sections/internal-page";

export const dynamicParams = false;

export function generateStaticParams() {
  return sitePages.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getSitePage(slug);
  if (!page) return {};
  return {
    title: `${page.title} | Fênix Valley`,
    description: page.description
  };
}

export default async function SitePageRoute({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getSitePage(slug);
  if (!page) notFound();

  return <InternalPage page={page} />;
}
