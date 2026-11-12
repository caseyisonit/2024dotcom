import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WritingIndex } from "@/components/WritingIndex";
import { TOPICS, getPosts, topicFromSlug, topicSlug } from "@/lib/content";

type Params = { params: Promise<{ topic: string }> };

export function generateStaticParams() {
  return TOPICS.map((t) => ({ topic: topicSlug(t) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const topic = topicFromSlug((await params).topic);
  return { title: topic ? `Writing on ${topic}` : "Writing" };
}

export default async function TopicPage({ params }: Params) {
  const topic = topicFromSlug((await params).topic);
  if (!topic) notFound();
  const posts = (await getPosts()).filter((p) => p.topic === topic);
  return <WritingIndex posts={posts} topic={topic} />;
}
