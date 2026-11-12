import { getPost, getPosts } from "@/lib/content";
import { OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Post title beside its generated shape composition";

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const post = await getPost((await params).slug);
  if (!post) return ogImage({ title: "Writing", seed: "writing" });
  return ogImage({ title: post.title, seed: post.imageSeed, meta: `${post.topic} · ${post.readingTime} min read` });
}
