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

  home: {
    hero: "Casey\nis **on it:**",
    intro: {
      eyebrow: "Hi, I’m Casey Eickhoff",
      text: "I build design systems and maintain Spectrum Web Components. I codify taste — tokens, lint rules, guides — so quality survives scale, teams, and AI agents.",
    },
    location: { place: "Colorado Rockies", status: "Open to talk" },
  },

  /** Rotating phrases in the band under the hero. Each links to its topic. */
  band: [
    { phrase: "design systems", topic: "Design systems" },
    { phrase: "AI, humans at the gates", topic: "AI" },
    { phrase: "design engineering", topic: "Design engineering" },
  ],

  work: {
    /** `{years}` is computed from the earliest role in Notion. */
    hero: "Working\n{years} yrs **on it.**",
    dek: "Making products that are functional, accessible, and delightful.",
  },

  about: {
    hero: "Hi, I’m **Casey.**",
  },

  footer: {
    statement: "Guaranteed to improve **company culture.**",
  },
} as const;
