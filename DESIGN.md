# DESIGN.md — caseyisonit

Direction: **Loud Gridhouse with shapes**, palette **Sanzo Wada Vol. 2 · 030 v2**.
Rigor underneath, exuberance on top. Built on Spectrum Web Components gen2; the brand lives in token overrides, not forks.

Source of truth for tokens: `src/styles/brand/brand.css`. Figma: file `rpZP90p7B4HFFR5UXqeCzz`, page "Casey", rows `08·030·2` and the "Board · Shape system".

## Token layers

Mirrors the three-layer model the site writes about.

| Layer | Prefix | Example | Rule |
|---|---|---|---|
| Core (design language) | `--wada-*`, `--mix-*` | `--wada-deep-slate-green` | Raw values only. Never used by components. |
| Semantic (platform) | `--casey-*` | `--casey-ink`, `--casey-stress-top` | Meaning, with `light-dark()` pairs. Components use these. |
| Component (implementation) | `--swc-*` | `--swc-accent-background-color-default` | SWC hooks, pointed at semantic tokens. Overrides sit on `:root, .swc-theme` after `swc.css`. |

## Color

Every hue is Wada. Neutrals mixed by hand are labeled **mixed, not Wada**. No pure white, no pure black.

| Core token | Hex | Source |
|---|---|---|
| `--mix-blush` | `#F8F4F0` | mixed, not Wada |
| `--wada-deep-slate-green` | `#112F2C` | Wada |
| `--wada-blackish-olive` | `#42533E` | Wada |
| `--wada-artemisia-green` | `#709390` | Wada |
| `--wada-light-green-yellow` | `#C7D14F` | Wada (chartreuse) |
| `--wada-cameo-pink` | `#E0B3B6` | Wada |
| `--wada-english-red` | `#D96629` | Wada |
| `--wada-orange-citrine` | `#986F2D` | Wada |

### Accent roles: one job per color

| Job | Semantic token | Light | Dark |
|---|---|---|---|
| Page ground / ink | `--casey-ground` / `--casey-ink` | Blush / Deep Slate Green | Deep Slate Green / Blush |
| Emphasis, top of page | `--casey-stress-top` | Blackish Olive (7.6:1) | Light Green Yellow (8.6:1) |
| Emphasis, end of page | `--casey-stress-end` | Cameo Pink on footer (7.7:1) | Blackish Olive on footer (4.4:1, large only) |
| Structure | `--casey-structure` | Orange Citrine | Orange Citrine |
| Data | `--casey-data` | English Red | English Red |
| Fields | `--casey-field-band` / `-work` / `-foot` | Artemisia / Light Green Yellow / Deep Slate Green | Artemisia / Blackish Olive / Cameo Pink |
| Tags | `--casey-tag` | Light Green Yellow | Light Green Yellow |

- Eyebrows, labels, meta, and links use ink, never an accent.
- Orange Citrine: large text (≥ 24px) and graphics only (4.1:1 on Blush, 3.2:1 on Deep Slate Green).
- Chartreuse sits only on darks or behind dark text.
- The generated post image is the only place every accent mixes.

## Type

| Role | Family | Weights | Tracking |
|---|---|---|---|
| Display, headings | Bricolage Grotesque (variable, `opsz` 96 for display) | 200 setup, 800 stress/headings | −2% ≥ 96px, −1% 40–95px, 0 below |
| UI, body | Hanken Grotesk | 400, 500, 700 | 0 (eyebrows +8%, uppercase) |
| Meta, code | Martian Mono | 400 | 0 |

### Headline system
- One field per headline. Emphasis is authored: `**…**` in repo strings, bold annotation in Notion titles, rendered as `<strong>`.
- **Display** role (heroes, post title, Next, footer statement): setup 200, stress 800 in the stress color. One stress run, at the end. No bold in a Notion title → all stress. More than one → build warning.
- **Heading** role (h2, list titles, band phrase): all 800, no contrast.
- `on it` never breaks (`on\u00A0it`). CMS titles carry no manual breaks (`text-wrap: balance`). Arrows are `swc-icon`, never typed.
- Line height: 93% at ≥ 96px, 104% below.

### Fluid sizes (390 → 1440px)
| Token | Mobile | Desktop |
|---|---|---|
| `--casey-size-hero` | 111 | 288 |
| `--casey-size-work-hero` | 100 | 270 |
| `--casey-size-post-title` | 66 | 210 |
| `--casey-size-band` | 76 | 188 |
| `--casey-size-section` | 64 | 128 |
| `--casey-size-statement` | 52 | 132 |
| `--casey-size-next` | 34 | 96 |
| `--casey-size-list-title` | 24 | 80 |
| `--casey-size-h2` | 32 | 52 |

## Space and grid

| Token | Desktop | Mobile | SWC token |
|---|---|---|---|
| `--casey-space-section` | 64 | 48 | `--swc-spacing-800` / `-700` |
| `--casey-space-heading` | 24 | 16 | `--swc-spacing-400` / `-300` |
| `--casey-space-row` | 24 | 24 | `--swc-spacing-400` |
| `--casey-page-margin` | 48 | 15 (+16 inset = 31 content edge) | `--swc-spacing-700` |

- 12 columns desktop (112px cells at 1440), 4 columns mobile (90px cells at 390). Breakpoint 768px.
- Spacing is measured from the content edge, not the box. No spacer elements.

### Grid lines
- 1px, ink color. A rule is a section edge: `border-block-start` on each section, full bleed. The site header owns the rule under it; the hero has none.
- Filled bands are their own border. No rules inside or between filled bands.
- Column lines (`border-inline-end`) run the full section height and always meet a rule. No column line at the page margins.
- Hero image keeps its tile grid (internal lines only). Body figures are borderless.

## Shapes

One shape, one job: circle = quantity (reading time, area ∝ minutes), square = unit, triangle = direction, semicircle = horizon, quarter circle = connection, bar = duration (`swc-meter`). Shapes fill their cell or sit on a grid line. Never decoration.

Post image generator: SVG from the slug. Shapes colored in reading order, stepping through every accent from a seeded start; no two neighbors match. Dark mode swaps Blackish Olive and ink for Blush. Mobile uses a crop of the densest row.

## Motion

Opt-in via `prefers-reduced-motion: no-preference`. Plays once on scroll-in, never loops: turn (rotate 90°, 400ms, `cubic-bezier(0.2, 0.8, 0.2, 1)`), grow (scale from 0, 480ms ease-out, 80ms stagger), settle (tiles fade/scale, 200ms, 50ms stagger).

## Components

SWC gen2 only. Custom code only for gaps, listed as contribution candidates.

| UI | Implementation |
|---|---|
| Menu, theme toggle, pause | `swc-action-button` quiet + `swc-icon` (`menu-hamburger`, `contrast`) + `swc-tooltip` |
| Mobile menu | `swc-popover` + `swc-menu` |
| Topic tags | `swc-badge` |
| Years by focus, tenure | `swc-meter` |
| Post image | `swc-asset` wrapping the generated SVG |
| Links | `link.css` + `swc-icon` (`chevron-right`, `open-in`) |
| Rules in prose | `swc-divider size=s` |
| **Gaps (custom)** | Site nav landmark, article list, reading-time circle + diagrams, band pager, table of contents, draft notice, code block |

## Accessibility

WCAG 2.2 AA minimum. Contrast checked per pairing above. Focus ring uses `--casey-focus` (chartreuse on dark, Deep Slate Green on light), never Spectrum blue. Honors `prefers-reduced-motion`, `prefers-color-scheme`, `prefers-contrast`, `forced-colors`. Responsive 320px to ultra-wide.
