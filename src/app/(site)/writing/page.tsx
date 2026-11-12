import type { Metadata } from "next";

import { WritingIndex } from "@/components/WritingIndex";
import { notFound } from "next/navigation";

import { getPosts } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays on design systems, AI, design engineering, and accessibility.",
  alternates: { canonical: "/writing" },
  openGraph: { url: "/writing" },
};

export default async function WritingPage() {
  const posts = await getPosts();
  if (!posts.length) notFound();
  return <WritingIndex posts={posts} />;
}
