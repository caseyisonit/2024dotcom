import { cache } from "react";

import { markdownSource } from "./markdown-source";
import { FOCUS_AREAS, TOPICS, type ContentSource, type FocusArea, type Post, type Role } from "./types";

export * from "./types";
export { stripEmphasis } from "./text";

const source: ContentSource = markdownSource;

/** Drafts show in development, or anywhere with SHOW_DRAFTS=1. */
export function showDrafts() {
  return process.env.NODE_ENV !== "production" || process.env.SHOW_DRAFTS === "1";
}

const allPosts = cache(async () => {
  const posts = await source.listPosts();
  return posts.sort((a, b) => b.published.localeCompare(a.published));
});

export async function getPosts(): Promise<Post[]> {
  const posts = await allPosts();
  return showDrafts() ? posts : posts.filter((p) => p.status === "published");
}

/**
 * One switch for the whole Writing section. False in production until a post
 * is published (drafts count in dev, previews, or with SHOW_DRAFTS=1). When
 * false: no Writing routes, nav item, Home writing sections, or RSS link.
 */
export async function hasWriting() {
  return (await getPosts()).length > 0;
}

export async function getPost(slug: string) {
  return (await getPosts()).find((p) => p.slug === slug);
}

/** The post after this one in reading order (older), wrapping to the newest. */
export async function getNextPost(slug: string) {
  const posts = await getPosts();
  if (posts.length < 2) return undefined;
  const i = posts.findIndex((p) => p.slug === slug);
  return posts[(i + 1) % posts.length];
}

export const getRoles = cache(async (): Promise<Role[]> => {
  const roles = await source.listRoles();
  return [...roles].sort((a, b) => b.start.localeCompare(a.start));
});

const YEAR_MS = 365.25 * 24 * 60 * 60 * 1000;

export function tenureYears(role: Role, now = new Date()) {
  const end = role.end ? new Date(role.end) : now;
  return Math.max(0, (end.getTime() - new Date(role.start).getTime()) / YEAR_MS);
}

/** Whole years since the earliest role started (Work hero: "[N] yrs on it."). */
export async function getYearsWorking(now = new Date()) {
  const roles = await getRoles();
  if (!roles.length) return 0;
  const first = roles.reduce((a, r) => (r.start < a.start ? r : a));
  return Math.floor((now.getTime() - new Date(first.start).getTime()) / YEAR_MS);
}

/** Total time covered by a set of roles, merging overlaps (the studio ran alongside full-time jobs). */
function coveredYears(roles: Role[], now: Date) {
  const spans = roles
    .map((r) => [new Date(r.start).getTime(), r.end ? new Date(r.end).getTime() : now.getTime()])
    .sort((a, b) => a[0] - b[0]);
  let total = 0;
  let [from, to] = spans[0] ?? [0, 0];
  for (const [start, end] of spans.slice(1)) {
    if (start > to) {
      total += to - from;
      [from, to] = [start, end];
    } else to = Math.max(to, end);
  }
  return (total + to - from) / YEAR_MS;
}

/** Years per focus area, rounded; overlapping roles count once. Roles with no focus area (early career) add nothing. */
export async function getYearsByFocus(now = new Date()): Promise<{ area: FocusArea; years: number }[]> {
  const roles = await getRoles();
  return FOCUS_AREAS.map((area) => ({
    area,
    years: Math.round(coveredYears(roles.filter((r) => r.focusAreas.includes(area)), now)),
  }));
}

/** "3 mos" under a year, otherwise whole years. */
export function formatTenure(years: number) {
  if (years < 1) return `${Math.max(1, Math.round(years * 12))} mos`;
  const n = Math.round(years);
  return `${n} ${n === 1 ? "yr" : "yrs"}`;
}

export async function getCurrentRole() {
  return (await getRoles()).find((r) => !r.end);
}

export function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function topicFromSlug(slug: string) {
  return TOPICS.find((t) => topicSlug(t) === slug);
}
