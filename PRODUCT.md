# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
- **Peers** in design systems, frontend, and design: they read opinionated long-form posts on design systems, AI in the industry, and design, and share them.
- **Hiring managers and recruiters:** they need quick proof of Casey's leadership, scope, and craft, a clear career history, and an easy way to make contact.

Both audiences matter equally.

## Product Purpose
Casey Eickhoff's personal site and blog. It publishes Casey's thinking on design systems, AI, design, and how they connect, and shows Casey's career. Success: a visitor leaves seeing Casey as a powerhouse and a breath of fresh air in design systems, someone they want leading their system and would like to know personally.

## Positioning
Casey maintains Spectrum Web Components, and this site is built with that system and restyled into a personal brand. The site itself demonstrates the core idea: one design language, applied through a platform, rendered by an implementation.

## Operating Context
- Built on Spectrum Web Components gen2 (`@adobe/spectrum-wc`), restyled through `--swc-*` tokens.
- Every UI element is an SWC gen2 component. Custom elements are allowed only where gen2 has no component yet, and each is documented as a gap.
- Next.js App Router, deployed on Vercel with Vercel Analytics.
- Posts start as local Markdown; Notion becomes the CMS later behind the same loader. Posts may embed live SWC components later.

## Capabilities and Constraints
- v1 pages: Home, Writing (index and post), About, Work (career timeline).
- Light and dark color schemes that follow system preference, with a toggle.
- Fonts must be free/open-licensed or a single small one-time purchase; no subscriptions.
- Domains owned (GoDaddy): `caseyison.it`, `caseyisonit.com`, `caseyeickhoff.com`. Undecided: which is primary; the others redirect to it.

## Brand Commitments
- Name and handle: **caseyisonit** ("Casey is on it") leads the brand.
- Voice: authentic first, blending warm, direct, playful, and precise. Laid-back confidence with humor ("Guaranteed to improve company culture.").
- Never reads as difficult, arrogant, or patronizing.
- Personal identity is present but not leading.

## Evidence on Hand
- Current bio copy (three paragraphs on the previous homepage).
- LinkedIn: https://www.linkedin.com/in/caseyeickhoff/
- Licensed National Forest fonts in `src/assets/webFonts/` (available, not committed to the new brand).
- No career timeline, project write-ups, testimonials, talks, or posts exist yet. Do not fabricate them; use visible placeholders.

## Product Principles
1. Codified opinions: taste is written down as tokens, lint rules, and guides.
2. Humans hold the gates; AI assists.
3. Accessible first, one role per component.
4. Show the layers: design language → platform → implementation.
5. Clear and fast: one obvious next action per view.

## Accessibility & Inclusion
- WCAG 2.2 AA minimum.
- Legibility is non-negotiable, especially for cognitive disabilities. Every design direction follows these foundations:
  - Body text 18px or larger on mobile and 20–21px on desktop, line height of at least 1.5, and lines of 70 characters or fewer.
  - Labels and meta text 14px or larger. All-caps only for labels of three words or fewer, with letter spacing of 6% or less.
  - Expressive display faces, italics, and thin weights only at 32px and up. UI text (nav, buttons, tabs, links, meta) uses the text face.
  - Headings in sentence case, sized so the longest word fits a 320px viewport without breaking.
  - Contrast of 4.5:1 for text and 3:1 for large display text and UI boundaries. Decorative color never carries meaning on its own.
  - Touch targets of 44px, and a focus indicator that is always visible.
- Neuro-inclusive: scannable structure, calm at rest, motion only when the user allows it.
- Responsive from 320px to ultra-wide; usable at 400% zoom.
- Honors `prefers-color-scheme`, `prefers-reduced-motion`, `prefers-contrast`, `forced-colors`, and `prefers-reduced-transparency`.
