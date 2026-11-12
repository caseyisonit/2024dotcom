import type { MetadataRoute } from "next";

import { site } from "@/content/site";
import { TOPICS, getPosts, topicSlug } from "@/lib/content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = (await getPosts()).filter((p) => p.status === "published");
  const pages = ["", "/work", "/about"].map((path) => ({ url: `${site.url}${path}` }));
  if (!posts.length) return pages;

  const topics = TOPICS.filter((t) => posts.some((p) => p.topic === t));
  return [
    ...pages,
    { url: `${site.url}/writing`, lastModified: posts[0].published },
    ...topics.map((t) => ({ url: `${site.url}/writing/topics/${topicSlug(t)}` })),
    ...posts.map((p) => ({ url: `${site.url}/writing/${p.slug}`, lastModified: p.published })),
  ];
}
