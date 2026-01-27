import type { MetadataRoute } from "next";
import {
  getAllServiceSlugs,
  getAllGallerySlugs,
  getAllPageSlugs,
} from "@/lib/contentful/queries";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

// Static pages with their parent paths
const parentPageRoutes: Record<string, string> = {
  "despre-noi": "/despre-noi",
  concept: "/concept",
  asociatia: "/asociatia",
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [serviceSlugs, gallerySlugs, pageSlugs] = await Promise.all([
    getAllServiceSlugs(),
    getAllGallerySlugs(),
    getAllPageSlugs(),
  ]);

  // Static routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/servicii`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/despre-noi`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/concept`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/asociatia`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/galerie`,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/harta-site`,
      changeFrequency: "monthly",
      priority: 0.3,
    },
  ];

  // Service pages
  const serviceRoutes: MetadataRoute.Sitemap = serviceSlugs.map((slug) => ({
    url: `${siteUrl}/servicii/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // Gallery pages
  const galleryRoutes: MetadataRoute.Sitemap = gallerySlugs.map((slug) => ({
    url: `${siteUrl}/galerie/${slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Dynamic pages (child pages under despre-noi, concept, asociatia)
  // Filter out top-level pages that already have static routes
  const topLevelSlugs = new Set([
    "despre-noi",
    "concept",
    "asociatia",
    "contact",
    "servicii",
    "galerie",
    "harta-site",
  ]);

  const pageRoutes: MetadataRoute.Sitemap = pageSlugs
    .filter((slug) => !topLevelSlugs.has(slug))
    .map((slug) => ({
      url: `${siteUrl}/${slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    }));

  return [...staticRoutes, ...serviceRoutes, ...galleryRoutes, ...pageRoutes];
}
