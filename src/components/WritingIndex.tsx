import Link from "next/link";

import { Headline } from "@/components/Headline";
import { PostList } from "@/components/PostList";
import { TOPICS, topicSlug, type PostMeta, type Topic } from "@/lib/content";

/** Shared by /writing and /writing/topics/[topic]. */
export function WritingIndex({ posts, topic }: { posts: PostMeta[]; topic?: Topic }) {
  return (
    <>
      <section className="section hero grid" aria-labelledby="writing-title">
        <div className="cell hero-text">
          <Headline id="writing-title" text={topic ? `Writing on **${topic.toLowerCase()}.**` : "**Writing.**"} className="post-title" />
        </div>
        <nav className="cell hero-aside" aria-label="Topics">
          <div className="panel">
            <p className="eyebrow">Topics</p>
            <ul className="panel-list">
              <li>
                <Link href="/writing" className="swc-Link swc-Link--quiet" aria-current={topic ? undefined : "page"}>
                  All
                </Link>
              </li>
              {TOPICS.map((t) => (
                <li key={t}>
                  <Link href={`/writing/topics/${topicSlug(t)}`} className="swc-Link swc-Link--quiet" aria-current={t === topic ? "page" : undefined}>
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </section>
      <section className="section writing" aria-label="Posts">
        {posts.length ? (
          <PostList posts={posts} />
        ) : (
          <p className="grid">
            <span className="cell empty">Nothing here yet.</span>
          </p>
        )}
      </section>
    </>
  );
}
