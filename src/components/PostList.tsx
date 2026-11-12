import Link from "next/link";

import { topicSlug, type PostMeta } from "@/lib/content";

import { Headline } from "./Headline";

/** Circle area scales with minutes (DESIGN.md › Shapes: circle = quantity). */
function ReadingCircle({ minutes, max }: { minutes: number; max: number }) {
  const scale = Math.sqrt(minutes / Math.max(max, 1));
  return (
    <svg
      className="reading-circle"
      viewBox="0 0 100 100"
      aria-hidden="true"
      focusable="false"
      style={{ "--scale": scale } as React.CSSProperties}
    >
      <circle cx="50" cy="50" r="50" />
    </svg>
  );
}

/** `headingLevel` follows the page outline: h3 under a section h2 (Home), h2 directly under the page h1 (Writing). */
export function PostList({
  posts,
  numbered = true,
  headingLevel = "h3",
}: {
  posts: PostMeta[];
  numbered?: boolean;
  headingLevel?: "h2" | "h3";
}) {
  const max = Math.max(...posts.map((p) => p.readingTime));
  return (
    <ol className="post-list">
      {posts.map((post, i) => (
        <li key={post.slug} className="post-row grid">
          {numbered && (
            <span className="cell post-index">
              {String(i + 1).padStart(2, "0")}
            </span>
          )}
          <div className="cell post-title-cell">
            <Link href={`/writing/${post.slug}`} className="post-link">
              <Headline
                as={headingLevel}
                role="heading"
                text={post.title}
                className="list-title"
              />
            </Link>
          </div>
          <div className="cell post-meta">
            <Link
              href={`/writing/topics/${topicSlug(post.topic)}`}
              className="tag-link"
            >
              <swc-badge size="s">{post.topic}</swc-badge>
            </Link>
            <span className="meta">{post.readingTime} min</span>
          </div>
          <div className="cell post-circle">
            <ReadingCircle minutes={post.readingTime} max={max} />
          </div>
        </li>
      ))}
    </ol>
  );
}
