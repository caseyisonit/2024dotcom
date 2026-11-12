"use client";

import { useEffect, useState } from "react";

import { site } from "@/content/site";

const INTERVAL_MS = 6000;

/**
 * Footer statement: the lead stays, the bold ending rotates. Every ending
 * sits in one grid cell so the footer never changes height. Rotates only
 * when the user allows motion, with a pause control (WCAG 2.2.2).
 */
export function FooterStatement() {
  const { lead, endings } = site.footer.statement;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(true);

  useEffect(() => {
    setPaused(matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % endings.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused, endings.length]);

  return (
    <div className="statement-block">
      <p className="headline headline--display headline--end statement">
        {lead}{" "}
        <span className="statement-endings" aria-live={paused ? "polite" : "off"}>
          {endings.map((ending, i) => (
            <strong key={ending} aria-hidden={i === index ? undefined : true}>
              {ending}
            </strong>
          ))}
        </span>
      </p>
      <swc-action-button quiet size="s" onClick={() => setPaused((p) => !p)} accessible-label={paused ? "Play statements" : "Pause statements"}>
        {paused ? "Play" : "Pause"}
      </swc-action-button>
    </div>
  );
}
