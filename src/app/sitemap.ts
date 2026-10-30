import type { MetadataRoute } from "next";
import { gearCategories, programs } from "@/data/catalog";
import { allPosts } from "@/data/journal";
import { SITE_URL } from "@/lib/site";

/** /sitemap.xml: every public page, so search engines can find them all. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  });
  return [
    page("/", 1, "weekly"),
    page("/equipment", 0.9, "weekly"),
    ...gearCategories.flatMap((c) => c.products.map((p) => page(`/equipment/${p.slug}`, 0.8))),
    page("/programs", 0.9, "weekly"),
    ...programs.map((p) => page(`/programs/${p.slug}`, 0.8)),
    page("/blog", 0.7, "weekly"),
    ...allPosts.map((p) => ({ ...page(`/blog/${p.slug}`, 0.6), lastModified: new Date(p.date) })),
    page("/about", 0.5, "yearly"),
    page("/privacy", 0.3, "yearly"),
  ];
}
