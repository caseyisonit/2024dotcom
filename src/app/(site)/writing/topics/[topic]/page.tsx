import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { WritingIndex } from "@/components/WritingIndex";
import { TOPICS, getPosts, topicFromSlug, topicSlug } from "@/lib/content";

type Params = { params: Promise<{ topic: string }> };

export async function generateStaticParams() {
  if (!(await getPosts()).length) return [];
  return TOPICS.map((t) => ({ topic: topicSlug(t) }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const topic = topicFromSlug((await params).topic);
  if (!topic) return { title: "Writing" };
  const url = `/writing/topics/${topicSlug(topic)}`;
  return {
    title: `Writing on ${topic}`,
    description: `Casey Eickhoff on ${topic.toLowerCase()}.`,
    alternates: { canonical: url },
    openGraph: { url },
  };
}

export default async function TopicPage({ params }: Params) {
  const topic = topicFromSlug((await params).topic);
  if (!topic || !(await getPosts()).length) notFound();
  const posts = (await getPosts()).filter((p) => p.topic === topic);
  return <WritingIndex posts={posts} topic={topic} />;
}
