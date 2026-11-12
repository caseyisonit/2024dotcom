import type { Role } from "./types";

/*
 * Placeholder roles until the Notion Roles database exists. Shape matches
 * Notion: Role (title), Company, Location, Start, End (empty = current),
 * Focus areas (multi-select), Highlights.
 */
export const roles: Role[] = [
  {
    role: "[Role title]",
    company: "[Company]",
    location: "[Location]",
    start: "2021-01-01",
    focusAreas: ["Design systems", "Design engineering"],
    highlights: ["[Highlight: outcome, scale, or impact]", "[Highlight: system or team change]"],
  },
  {
    role: "[Role title]",
    company: "[Company]",
    location: "[Location]",
    start: "2018-01-01",
    end: "2021-01-01",
    focusAreas: ["Design systems", "Accessibility"],
    highlights: ["[Highlight: outcome, scale, or impact]", "[Highlight: system or team change]"],
  },
  {
    role: "[Role title]",
    company: "[Company]",
    location: "[Location]",
    start: "2016-01-01",
    end: "2018-01-01",
    focusAreas: ["UX & UI design"],
    highlights: ["[Highlight: outcome, scale, or impact]", "[Highlight: system or team change]"],
  },
  {
    role: "[Role title]",
    company: "[Company]",
    location: "[Location]",
    start: "2013-01-01",
    end: "2016-01-01",
    focusAreas: ["UX & UI design", "Accessibility"],
    highlights: ["[Highlight: outcome, scale, or impact]", "[Highlight: system or team change]"],
  },
];
