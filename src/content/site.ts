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
  author: "Casey Eickhoff",
  /** Default search and share description. */
  description:
    "Casey Eickhoff builds design systems and maintains Spectrum Web Components. Writing on design systems, AI, design engineering, and accessibility.",

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
      /** Approved by Casey verbatim. */
      text: "I build design systems and maintain Spectrum Web Components. Adherence by design, not by policing. I codify standards and taste so the quality bar stays high, no matter who’s shipping.",
    },
    location: { place: "Colorado Rockies", status: "Open to talk" },
  },

  /** Rotating phrases in the band under the hero. Each links to its topic. */
  band: [
    { phrase: "design engineering", topic: "Design engineering" },
    { phrase: "design systems", topic: "Design systems" },
    { phrase: "human first, AI friendly", topic: "AI" },
  ],

  work: {
    /** `{years}` is computed from the earliest role in Notion. */
    hero: "Working\n{years} yrs **on it.**",
    dek: "Making systems and products that are functional, accessible, and delightful.",
  },

  about: {
    hero: "Hi, I’m\n**Casey.**",
    eyebrow: "Hi, I’m Casey Eickhoff",
    /** Rewritten from LinkedIn and the resume (Nov 2026); facts and numbers unchanged. */
    intro: [
      "These days I help lead Spectrum Web Components, Adobe’s open-source design system. It’s under the hood of seven Adobe products, including Photoshop Web, Illustrator Web, Express, Firefly Boards, and Adobe Fonts.",
      "I took the scenic route here. I spent 12 years as a designer and art director: keeping the Denver Center for the Performing Arts on brand, building my first product design system at Under Armour, and running my own studio on the side. Then I moved into engineering to build the systems I used to design. Now I’m senior on both sides, so I get to sweat the details in Figma and in the pull request.",
      "I still love blending engineering and design, and I love helping people grow. I mentor engineers and designers, and I’ve left 430+ pull request reviews along the way.",
    ],
    /** Closing line; `{work}` becomes a link to the Work page. */
    outro: "The Theyoncé of Engineering, at your service. The receipts are on the {work}. Let’s create something amazing together.",
  },

  footer: {
    /** "Guaranteed to improve" stays; the bold ending rotates. The first ending is the default. */
    statement: {
      lead: "Guaranteed to improve",
      endings: ["company culture.", "your design system.", "code review.", "accessibility scores.", "the standup.", "the vibe."],
    },
  },
} as const;
