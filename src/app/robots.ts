import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** /robots.txt: crawl everything except the cart, checkout and API. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/cart", "/checkout/", "/api/"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
