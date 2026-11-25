import type { MetadataRoute } from "next";
import { SITE_URL } from "@/content/clinic";

// Unofficial demo: block all crawlers until the clinic authorises production.
// For production, replace with `allow: "/"`.
export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", disallow: "/" }], sitemap: `${SITE_URL}/sitemap.xml` };
}
