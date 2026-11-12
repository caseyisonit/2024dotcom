import type { Metadata } from "next";

import { Headline } from "@/components/Headline";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "About" };

// Not designed in Figma yet: built from the shared hero and intro patterns.
export default function AboutPage() {
  return (
    <>
      <section className="section hero grid" aria-labelledby="about-title">
        <div className="cell hero-text">
          <Headline id="about-title" text={site.about.hero} className="post-title" />
        </div>
        <aside className="cell hero-aside" aria-label="Where">
          <div className="panel">
            <p className="panel-strong">{site.home.location.place}</p>
            <p className="meta">{site.home.location.status}</p>
          </div>
        </aside>
      </section>
      <section className="section intro grid" aria-labelledby="about-intro">
        <p className="cell eyebrow intro-eyebrow" id="about-intro">
          {site.home.intro.eyebrow}
        </p>
        <div className="cell intro-text prose">
          <p>{site.home.intro.text}</p>
          <p>
            I believe in rigor underneath and exuberance on top: a design language becomes core tokens, a platform turns them into semantic
            tokens, and every implementation adds component tokens of its own. Humans hold the gates.
          </p>
        </div>
      </section>
    </>
  );
}
