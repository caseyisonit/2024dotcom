import Link from "next/link";

import { Band } from "@/components/Band";
import { FocusMeters } from "@/components/FocusMeters";
import { Headline } from "@/components/Headline";
import { PostList } from "@/components/PostList";
import { site } from "@/content/site";
import { TOPICS, getPosts, getYearsByFocus, topicSlug } from "@/lib/content";

export default async function Home() {
  const [posts, focus] = await Promise.all([getPosts(), getYearsByFocus()]);
  const latest = posts[0];

  return (
    <>
      <section className="section hero grid" aria-labelledby="hero-title">
        <div className="cell hero-text">
          <Headline id="hero-title" text={site.home.hero} className="hero-title" />
        </div>
        <aside className="cell hero-aside" aria-label="At a glance">
          <div className="panel">
            <p className="eyebrow">Writing about</p>
            <ul className="panel-list">
              {TOPICS.slice(0, 3).map((t) => (
                <li key={t}>
                  <Link href={`/writing/topics/${topicSlug(t)}`} className="swc-Link swc-Link--quiet">
                    {t}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {latest && (
            <div className="panel">
              <p className="eyebrow">Latest</p>
              <Link href={`/writing/${latest.slug}`} className="swc-Link swc-Link--quiet panel-strong">
                {latest.plainTitle}
              </Link>
              <p className="meta">
                {latest.readingTime} min
              </p>
            </div>
          )}
          <div className="panel">
            <p className="panel-strong">{site.home.location.place}</p>
            <p className="meta">{site.home.location.status}</p>
          </div>
        </aside>
      </section>

      <Band />

      <section className="section intro grid" aria-labelledby="intro-title">
        <p className="cell eyebrow intro-eyebrow" id="intro-title">
          {site.home.intro.eyebrow}
        </p>
        <p className="cell intro-text">{site.home.intro.text}</p>
      </section>

      <section className="section writing" aria-labelledby="writing-title">
        <header className="section-header grid">
          <div className="cell section-header-title">
            <h2 id="writing-title" className="headline headline--heading section-title structure">
              Writing
            </h2>
          </div>
          <div className="cell section-header-aside">
            <Link href="/writing" className="swc-Link swc-Link--quiet">
              All posts
            </Link>
            <p className="meta legend">
              <span className="legend-dot" aria-hidden="true" /> = reading time
            </p>
          </div>
        </header>
        <PostList posts={posts.slice(0, 3)} />
      </section>

      <section className="work field" aria-labelledby="work-title">
        <header className="section-header grid">
          <div className="cell section-header-title">
            <h2 id="work-title" className="headline headline--heading section-title">
              Work
            </h2>
            <p className="meta">Years by area of focus</p>
          </div>
          <div className="cell section-header-aside">
            <Link href="/work" className="swc-Link swc-Link--quiet">
              All roles
            </Link>
          </div>
        </header>
        <div className="grid">
          <div className="cell meters-cell">
            <FocusMeters items={focus} />
          </div>
        </div>
      </section>
    </>
  );
}
