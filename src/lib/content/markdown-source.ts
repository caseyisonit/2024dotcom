import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { emphasisProblems, readingTime, stripEmphasis, tableOfContents } from "./text";
import { TOPICS, type ContentSource, type Post, type PostStatus, type Topic } from "./types";
import { roles } from "./roles";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function fail(file: string, message: string): never {
  throw new Error(`content/posts/${file}: ${message}`);
}

function isoDate(value: unknown, file: string, field: string) {
  const date = value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) fail(file, `"${field}" must be a YYYY-MM-DD date`);
  return date;
}

function parsePost(file: string, raw: string): Post {
  const { data, content } = matter(raw);
  const slug = file.replace(/\.mdx?$/, "");

  const title = String(data.title ?? "").trim();
  if (!title) fail(file, '"title" is required');
  for (const problem of emphasisProblems(title)) console.warn(`content/posts/${file}: title ${problem}`);

  const status = (data.status ?? "draft") as PostStatus;
  if (status !== "draft" && status !== "published") fail(file, '"status" must be draft or published');

  const topic = data.topic as Topic;
  if (!TOPICS.includes(topic)) fail(file, `"topic" must be one of: ${TOPICS.join(", ")}`);

  return {
    slug,
    title,
    plainTitle: stripEmphasis(title),
    status,
    published: isoDate(data.published, file, "published"),
    topic,
    dek: String(data.dek ?? "").trim(),
    imageSeed: String(data.imageSeed ?? slug),
    readingTime: readingTime(content),
    body: content,
    toc: tableOfContents(content),
  };
}

export const markdownSource: ContentSource = {
  async listPosts() {
    const files = (await readdir(POSTS_DIR)).filter((f) => /\.mdx?$/.test(f));
    return Promise.all(files.map(async (f) => parsePost(f, await readFile(path.join(POSTS_DIR, f), "utf8"))));
  },
  async listRoles() {
    return roles;
  },
};
