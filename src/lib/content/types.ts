/*
 * Content model. Field names mirror the Notion databases so the Markdown
 * source and the future Notion source are interchangeable (DESIGN.md, and
 * the content model notes: Posts and Roles databases).
 */

export const TOPICS = ["Design systems", "AI", "Design engineering", "Accessibility"] as const;
export type Topic = (typeof TOPICS)[number];

export const FOCUS_AREAS = ["Design systems", "Accessibility", "UX & UI design", "Design engineering"] as const;
export type FocusArea = (typeof FOCUS_AREAS)[number];

export type PostStatus = "draft" | "published";

export type PostMeta = {
  slug: string;
  /** Authored emphasis: `**…**` marks the stressed run. */
  title: string;
  /** Title with emphasis markers removed, for metadata and plain contexts. */
  plainTitle: string;
  status: PostStatus;
  /** ISO date, YYYY-MM-DD. */
  published: string;
  topic: Topic;
  dek: string;
  imageSeed: string;
  readingTime: number;
};

export type Post = PostMeta & {
  /** MDX body. Quote blocks render as pull quotes; H2s feed the anchor menu. */
  body: string;
  toc: TocEntry[];
};

export type TocEntry = { id: string; text: string };

export type Role = {
  role: string;
  company: string;
  location: string;
  /** ISO date, YYYY-MM-DD. */
  start: string;
  /** ISO date; undefined means current. */
  end?: string;
  focusAreas: FocusArea[];
  highlights: string[];
};

/** Where content comes from. Markdown today; Notion later. */
export interface ContentSource {
  listPosts(): Promise<Post[]>;
  listRoles(): Promise<Role[]>;
}
