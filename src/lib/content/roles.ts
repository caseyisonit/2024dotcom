import type { Role } from "./types";

/*
 * Roles until the Notion Roles database exists. Shape matches Notion: Role
 * (title), Company, Location, Start, End (empty = current), Focus areas
 * (multi-select), Highlights. Source: Casey's LinkedIn and resume (Nov 2026).
 * Highlights are rewritten in the site voice; every fact and number is kept.
 *
 * Early career (2006–2012) is one entry with no focus areas: it starts the
 * Work hero's years (20, from 2006) but adds nothing to the focus meters.
 */
export const roles: Role[] = [
  {
    role: "Senior Design Engineer, Spectrum Web Components",
    company: "Adobe",
    location: "Denver, CO (remote)",
    start: "2026-02-01",
    focusAreas: ["Design systems", "Design engineering", "Accessibility"],
    highlights: [
      "Set the gen2 migration strategy and wrote the 8-phase playbook 12 engineers follow. About 30 components have shipped on it so far.",
      "Wrote 12 RFCs on where the system goes next, from the CSS cutoff to forms, focus management, and migration resource planning.",
      "Turned standards into CI gates and one AI rules source (35 skills, 8 rules) that Copilot, Cursor, and Claude all read. Cut CI compute 75% in five months.",
      "Mentor 5 early-career engineers and 2 product designers, with 430+ pull request reviews focused on architecture and accessibility.",
    ],
  },
  {
    role: "Design Engineer 2, Spectrum Web Components",
    company: "Adobe",
    location: "Denver, CO (remote)",
    start: "2024-09-01",
    end: "2026-02-01",
    focusAreas: ["Design systems", "Design engineering", "Accessibility"],
    highlights: [
      "Led the gen1 → gen2 cutover and got the team to land it, earning Adobe’s “Own the Outcome” recognition.",
      "Closed the multi-quarter epic that removed the dependency on upstream Spectrum CSS, a long-running source of style drift.",
      "Cleared a backlog of flaky cross-browser tests so CI could be trusted as a release gate again.",
      "Fixed accessibility in high-traffic components and built reusable focus and pending-state primitives. Promoted to senior in 17 months.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Metwork",
    location: "Denver, CO",
    start: "2024-07-01",
    end: "2024-09-01",
    focusAreas: ["Design systems", "Design engineering"],
    highlights: [
      "Set up engineering processes, contribution guidelines, and quality standards for a brand-new team.",
      "Designed and built a web components design system in a Turborepo monorepo, made to grow with the product.",
    ],
  },
  {
    role: "Senior Frontend Engineer, Design Systems",
    company: "Freelance",
    location: "Denver, CO",
    start: "2024-05-01",
    end: "2024-07-01",
    focusAreas: ["Design systems", "Design engineering", "Accessibility"],
    highlights: [
      "Built design system components and accessible user flows in React and Vue for client products, to WCAG standards.",
      "Partnered with designers and backend engineers to ship on schedule.",
    ],
  },
  {
    role: "Senior Engineer I, Recess Design System & Accessibility",
    company: "Guild Education",
    location: "Denver, CO",
    start: "2023-03-01",
    end: "2024-05-01",
    focusAreas: ["Design systems", "Design engineering", "Accessibility"],
    highlights: [
      "Led the accessibility strategy for Recess: 82% fewer violations, and every critical one gone.",
      "Ran Recess as an inner-source platform. Its contribution standards were called “the gold standard for inner-source at Guild,” and outside contributions grew 11% a quarter.",
      "Built a metrics app that cut manual audits 97%, swapped a paid visual regression service for Playwright to save $16K a year, and automated scaffolding to launch components 78% faster.",
    ],
  },
  {
    role: "Software Engineer II, Frontend Foundations",
    company: "Guild Education",
    location: "Denver, CO",
    start: "2021-09-01",
    end: "2023-03-01",
    focusAreas: ["Design systems", "Design engineering"],
    highlights: [
      "Shipped a company-wide rebrand in 3 months behind feature flags, with zero visual leaks.",
      "Created Guild’s first design token library, in CSS, SCSS, and TypeScript.",
      "Rebuilt the Storybook docs templates; developer experience NPS rose 23%.",
    ],
  },
  {
    role: "UX/UI Front-End Engineer (Product Owner)",
    company: "ALFI",
    location: "Denver, CO",
    start: "2021-07-01",
    end: "2021-09-01",
    focusAreas: ["UX & UI design", "Design engineering"],
    highlights: [
      "Acted as product owner and UX lead: set priorities, wrote tickets, and made the wireframes and mockups.",
      "Mentored engineers on frontend best practices.",
    ],
  },
  {
    role: "UX/UI Front-End Engineer",
    company: "oVertone Haircare",
    location: "Denver, CO",
    start: "2020-10-01",
    end: "2021-06-01",
    focusAreas: ["UX & UI design", "Design engineering", "Accessibility"],
    highlights: [
      "Designed and built a loyalty program on headless Shopify. Account creation rose 30% and loyalty-point revenue 41%.",
      "Championed accessibility, analytics, and styling standards across the storefront.",
    ],
  },
  {
    role: "Front-End UX Engineer",
    company: "60Hertz Microgrids",
    location: "Denver, CO",
    start: "2020-01-01",
    end: "2020-10-01",
    focusAreas: ["UX & UI design", "Design engineering"],
    highlights: [
      "Did field UX research in rural Alaska for offline, low-literacy microgrid maintenance software.",
      "Turned the research into web and mobile prototypes, then built them in Vue.",
    ],
  },
  {
    role: "Senior Digital Designer",
    company: "Denver Center for the Performing Arts",
    location: "Denver, CO",
    start: "2017-02-01",
    end: "2020-01-01",
    focusAreas: ["Brand & art direction", "UX & UI design"],
    highlights: [
      "Owned the brand system across web, print, broadcast, and in-venue for the largest nonprofit theatre organization in the US.",
      "Redesigned print-at-home tickets with QR codes; venue entry got 32% faster.",
      "Art directed fundraising campaigns that grew revenue 15% year over year to $1.15M, and directed TV commercials.",
    ],
  },
  {
    role: "Senior Digital Designer (Design Lead)",
    company: "Domoto Brands",
    location: "Denver, CO",
    start: "2016-11-01",
    end: "2017-01-01",
    focusAreas: ["Brand & art direction", "UX & UI design"],
    highlights: [
      "Set the agency’s website design and launch process, from design through development to QA.",
      "Managed a 5-person team of designers and developers. Client site traffic rose 20% and team efficiency 15%.",
    ],
  },
  {
    role: "Graphic Designer",
    company: "Texas Creative",
    location: "San Antonio & Austin, TX",
    start: "2016-05-01",
    end: "2016-11-01",
    focusAreas: ["Brand & art direction"],
    highlights: [
      "Presented creative strategy to clients and owned production-ready output.",
      "Standardized the design-to-print handoff, cutting production errors 25%.",
    ],
  },
  {
    role: "Product Designer, Connected Fitness",
    company: "Under Armour",
    location: "Austin, TX",
    start: "2014-06-01",
    end: "2016-04-01",
    focusAreas: ["Design systems", "UX & UI design"],
    highlights: [
      "Built my first product design system: templates for sponsored challenges that cut launch time 85%.",
      "Made internal tools so non-designers could build challenges inside brand guardrails.",
      "Rebuilt the email design system; open rates rose 20%.",
    ],
  },
  {
    role: "Interactive Designer (Art Direction)",
    company: "Drumroll",
    location: "Austin, TX",
    start: "2012-08-01",
    end: "2014-06-01",
    focusAreas: ["Brand & art direction", "UX & UI design"],
    highlights: [
      "Developed brand standards for multiple clients across email, social, contests, and microsites.",
      "Art directed junior designers and led client presentations. Email open rates rose 25%.",
    ],
  },
  {
    role: "Founder & Art Director",
    company: "Casey Eickhoff Design",
    location: "Austin, TX & Denver, CO",
    start: "2008-03-01",
    end: "2019-12-01",
    focusAreas: ["Brand & art direction"],
    highlights: [
      "Ran an independent design and brand practice for nearly 12 years alongside full-time roles.",
      "Branding, identity systems, and event activations for clients including Under Armour, Comcast, and Jefferson Bank.",
    ],
  },
  {
    role: "Early career",
    company: "Texas Creative, Texas State University, Austin Museum of Art, Springbox, and more",
    location: "Texas",
    start: "2006-03-01",
    end: "2012-05-01",
    focusAreas: [],
    highlights: [
      "Internships and first design jobs in production, print, and interactive design, alongside a BFA in Communication Design.",
      "Redesigned the identity for Texas State’s Student Association for Campus Activities and marketed 40+ events; attendance rose 25%.",
    ],
  },
];
