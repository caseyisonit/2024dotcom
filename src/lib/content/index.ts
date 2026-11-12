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

/** Sum of tenure per focus area, rounded to whole years. */
export async function getYearsByFocus(now = new Date()): Promise<{ area: FocusArea; years: number }[]> {
  const roles = await getRoles();
  return FOCUS_AREAS.map((area) => ({
    area,
    years: Math.round(roles.filter((r) => r.focusAreas.includes(area)).reduce((sum, r) => sum + tenureYears(r, now), 0)),
  }));
}

export async function getCurrentRole() {
  return (await getRoles()).find((r) => !r.end);
}

export function topicSlug(topic: string) {
  return topic.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });

export function formatDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

export function topicFromSlug(slug: string) {
  return TOPICS.find((t) => topicSlug(t) === slug);
}
