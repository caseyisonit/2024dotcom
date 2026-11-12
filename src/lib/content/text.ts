import { slug as slugify } from "github-slugger";

import { parseEmphasis } from "@/components/Headline";

import type { TocEntry } from "./types";

const WORDS_PER_MINUTE = 225;

export function stripEmphasis(text: string) {
  return text.replace(/\*\*([\s\S]+?)\*\*/g, "$1");
}

/** Display headlines carry at most one stress run (DESIGN.md › Headline system). */
export function emphasisProblems(title: string): string[] {
  const runs = parseEmphasis(title).filter((r) => r.stress).length;
  const problems: string[] = [];
  if (runs > 1) problems.push(`has ${runs} bold runs; use one, at the end`);
  if (/\n/.test(title)) problems.push("contains a manual line break; titles wrap on their own");
  return problems;
}

/** Strips fenced code so headings and words inside code are ignored. */
function withoutCode(markdown: string) {
  return markdown.replace(/^```[\s\S]*?^```/gm, "");
}

export function readingTime(markdown: string) {
  const words = withoutCode(markdown).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / WORDS_PER_MINUTE));
}

export function headingId(text: string) {
  return slugify(stripEmphasis(text));
}

export function tableOfContents(markdown: string): TocEntry[] {
  return [...withoutCode(markdown).matchAll(/^##\s+(.+?)\s*#*\s*$/gm)].map((m) => ({
    id: headingId(m[1]),
    text: stripEmphasis(m[1]),
  }));
}
