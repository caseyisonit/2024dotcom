import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AnchorMenu } from "@/components/AnchorMenu";
import { Headline } from "@/components/Headline";
import { PostImage } from "@/components/PostImage";
import { SiteFooter } from "@/components/SiteFooter";
import { getNextPost, getPost, getPosts, topicSlug } from "@/lib/content";
import { renderBody } from "@/lib/content/render";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPosts()).map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const post = await getPost((await params).slug);
  return post ? { title: post.plainTitle, description: post.dek } : {};
}

export default async function PostPage({ params }: Params) {
  const post = await getPost((await params).slug);
  if (!post) notFound();
  const [body, next] = await Promise.all([
    renderBody(post.body),
    getNextPost(post.slug),
  ]);

  return (
    <>
      <main id="main" tabIndex={-1}>
        <article className="post" aria-labelledby="post-title">
          <header className="post-header grid">
            <div className="cell hero-text">
              <p className="post-meta-line">
                <Link
                  href={`/writing/topics/${topicSlug(post.topic)}`}
                  className="tag-link"
                >
                  <swc-badge size="s">{post.topic}</swc-badge>
                </Link>
                <span className="meta">{post.readingTime} min read</span>
              </p>
              {post.status === "draft" && (
                <p className="draft-notice" role="note">
                  Draft. Not visible in production.
                </p>
              )}
              <Headline
                id="post-title"
                text={post.title}
                className="post-title"
              />
              {post.dek && <p className="dek">{post.dek}</p>}
            </div>
            <div className="hero-media">
              <PostImage seed={post.imageSeed} />
            </div>
          </header>

          <div className="post-body grid">
            <div className="cell toc-cell">
              <AnchorMenu entries={post.toc} />
            </div>
            <div className="cell prose">{body}</div>
          </div>
        </article>
      </main>
      <SiteFooter
        lead={
          next && (
            <nav className="next-post" aria-label="Next post">
              <Link href={`/writing/${next.slug}`} className="next-link">
                <span className="eyebrow">Next</span>
                <span className="next-row">
                  <Headline
                    as="span"
                    text={next.title}
                    position="end"
                    className="next-title"
                  />
                  <swc-icon-arrow-ui-right size="xl"></swc-icon-arrow-ui-right>
                </span>
              </Link>
            </nav>
          )
        }
      />
    </>
  );
}
