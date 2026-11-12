import type { Metadata } from "next";

import { WritingIndex } from "@/components/WritingIndex";
import { getPosts } from "@/lib/content";

export const metadata: Metadata = { title: "Writing" };

export default async function WritingPage() {
  return <WritingIndex posts={await getPosts()} />;
}
