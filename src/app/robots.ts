import type { MetadataRoute } from "next";

import { site } from "@/content/site";

/** Vercel preview deployments (where drafts show) are never crawled. */
export default function robots(): MetadataRoute.Robots {
  const preview = process.env.VERCEL_ENV !== undefined && process.env.VERCEL_ENV !== "production";
  return {
    rules: preview ? { userAgent: "*", disallow: "/" } : { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
