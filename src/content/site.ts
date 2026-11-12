/*
 * Repo-owned site copy. Notion owns posts and roles; everything here is
 * hard-coded on purpose (see DESIGN.md › Headline system).
 *
 * Headline strings use the authored-emphasis subset: `**…**` is stress,
 * `\n` is a line break.
 */

export type SiteLink = { label: string; href: string };

export const site = {
  name: "caseyisonit",
  logo: { word: "caseyison", tld: ".it" },
  url: "https://caseyison.it",

  nav: [
    { label: "Writing", href: "/writing" },
    { label: "Work", href: "/work" },
    { label: "About", href: "/about" },
  ] satisfies SiteLink[],

  social: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/caseyeickhoff/" },
    { label: "GitHub", href: "https://github.com/caseyisonit" },
    { label: "RSS", href: "/rss.xml" },
    { label: "Email", href: "mailto:caseyisonit@gmail.com" },
  ] satisfies SiteLink[],

  footer: {
    statement: "Guaranteed to improve **company culture.**",
  },
} as const;
