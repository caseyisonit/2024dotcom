import type { Metadata } from "next";
import Link from "next/link";

import { AboutPortrait } from "@/components/AboutPortrait";
import { Headline } from "@/components/Headline";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: "Designer turned design engineer. Casey Eickhoff helps lead Spectrum Web Components at Adobe.",
  alternates: { canonical: "/about" },
  openGraph: { url: "/about" },
};

export default function AboutPage() {
  const [before, after] = site.about.outro.split("{work}");
  return (
    <>
      <section className="section hero about-hero grid" aria-labelledby="about-title">
        <div className="cell hero-text">
          <Headline id="about-title" text={site.about.hero} className="about-title" />
        </div>
        <AboutPortrait />
      </section>
      <section className="section intro grid" aria-labelledby="about-intro">
        <div className="cell intro-side">
          <p className="eyebrow" id="about-intro">
            {site.about.eyebrow}
          </p>
          <div className="about-where">
            <p className="panel-strong">{site.home.location.place}</p>
            <p className="meta">{site.home.location.status}</p>
          </div>
        </div>
        <div className="cell intro-text prose">
          {site.about.intro.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
          <p>
            {before}
            <Link href="/work" className="swc-Link">
              Work page
            </Link>
            {after}
          </p>
        </div>
      </section>
    </>
  );
}
