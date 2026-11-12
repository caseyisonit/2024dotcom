import { site } from "@/content/site";
import { getPosts } from "@/lib/content";

export const dynamic = "force-static";

const escape = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  // Feeds only ever carry published posts, even on previews that show drafts.
  const posts = (await getPosts()).filter((p) => p.status === "published");
  const items = posts
    .map((p) => {
      const url = `${site.url}/writing/${p.slug}`;
      return `    <item>
      <title>${escape(p.plainTitle)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(`${p.published}T00:00:00Z`).toUTCString()}</pubDate>
      <category>${escape(p.topic)}</category>
      <description>${escape(p.dek)}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`${site.author}: Writing`)}</title>
    <link>${site.url}/writing</link>
    <atom:link href="${site.url}/rss.xml" rel="self" type="application/rss+xml" />
    <description>${escape(site.description)}</description>
    <language>en-us</language>
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
