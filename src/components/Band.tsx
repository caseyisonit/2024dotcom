"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { site } from "@/content/site";

const INTERVAL_MS = 6000;

function topicHref(topic: string) {
  return `/writing/topics/${topic.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
}

/**
 * The phrase band under the hero. Rotates only when the user allows motion,
 * and always offers a pause control (WCAG 2.2.2).
 */
export function Band() {
  const phrases = site.band;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    setPaused(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, phrases.length]);

  const current = phrases[index];
  const label = `${String(index + 1).padStart(2, "0")} / ${String(phrases.length).padStart(2, "0")}`;

  return (
    <section className="band field" aria-roledescription="carousel" aria-label="Topics">
      <div className="band-phrases" aria-live={paused ? "polite" : "off"}>
        {phrases.map((p, i) => (
          <p key={p.phrase} className="headline headline--heading band-phrase" aria-hidden={i === index ? undefined : true}>
            {p.phrase}
          </p>
        ))}
      </div>
      <div className="band-controls">
        <span className="meta" aria-hidden="true">
          {label}
        </span>
        <swc-action-button quiet size="s" onClick={() => setPaused((p) => !p)} accessible-label={paused ? "Play topics" : "Pause topics"}>
          {paused ? "Play" : "Pause"}
        </swc-action-button>
        <swc-action-button quiet size="s" onClick={() => setIndex((i) => (i + 1) % phrases.length)}>
          Next topic
        </swc-action-button>
        <Link href={topicHref(current.topic)} className="swc-Link band-link">
          Read the {current.phrase} writing
          <swc-icon-chevron-right size="s"></swc-icon-chevron-right>
        </Link>
      </div>
    </section>
  );
}
