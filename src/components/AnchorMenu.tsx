"use client";

import { useEffect, useState } from "react";

import type { TocEntry } from "@/lib/content";

/** "On this page": marks the section in view with the structure accent. */
export function AnchorMenu({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState(entries[0]?.id);

  useEffect(() => {
    const headings = entries.map((e) => document.getElementById(e.id)).filter((h): h is HTMLElement => !!h);
    const observer = new IntersectionObserver(
      (records) => {
        const visible = records.filter((r) => r.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (!entries.length) return null;

  return (
    <nav className="anchor-menu" aria-labelledby="anchor-menu-title">
      <p className="eyebrow" id="anchor-menu-title">
        On this page
      </p>
      <ul>
        {entries.map((e) => (
          <li key={e.id}>
            <a href={`#${e.id}`} aria-current={active === e.id ? "location" : undefined}>
              {e.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
