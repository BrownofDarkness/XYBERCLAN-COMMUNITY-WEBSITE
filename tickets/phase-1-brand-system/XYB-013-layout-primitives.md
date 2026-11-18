---
id: XYB-013
title: "Layout primitives: grid, margins, rhythm"
phase: 1-brand-system
type: dev
size: M
depends_on: [XYB-011, XYB-012]
skills: [css, react, responsive-design]
good_first_issue: false
---

# XYB-013 — Layout primitives: grid, margins, rhythm

## Why this exists (the strategy)
**Claim:** every page feels composed, like a poster, not stacked like a template.
**Proof:** one grid, one pair of outer margins, one section rhythm, used by every section. When a
section breaks the grid (a blob running off the edge, a photo going full-bleed), it does it on purpose,
and the frame around it stays the same.

## What the visitor should feel and do
Feel: calm and order, even when things move. Do: scan each screen top-left to bottom-right without getting lost.

## Scope
- Breakpoints, container, 12-column grid (6 on tablet, 4 on phone), gutters, outer margins.
- Vertical rhythm: space tokens, section padding, gaps inside sections.
- React primitives: `Section`, `Container`, `Grid`, `Stack`, `FullBleed`.
- Rules for asymmetry and empty space.

## Content
None.

## Design spec

**Breakpoints** (min-width): `sm 480`, `md 768`, `lg 1024`, `xl 1280`, `2xl 1600`.

**Outer margins** (the frame — always equal left and right):

| Width | Margin | Columns | Gutter |
| --- | --- | --- | --- |
| 390 (phone) | 16px | 4 | 12px |
| 768 (tablet) | 24px | 6 | 16px |
| 1440 (desktop) | 32px | 12 | 24px |
| ≥ 1600 | content max 1536px, centred | 12 | 24px |

Use `--margin: clamp(1rem, 0.5rem + 2vw, 2rem)`.

**Space scale** (`--space-*`): 4, 8, 12, 16, 24, 32, 48, 64, 96, 128, 192, 256 px.

**Section rhythm:**
- Gap between sections on desktop: 160–240px (`--section-gap: clamp(6rem, 3rem + 10vw, 15rem)`).
- Any gap **inside** a section is clearly smaller (≤ 96px), so sections read as groups.
- No stretch of the page taller than half a screen may be empty. A deliberate rest (one field of colour or one big picture) is allowed **once** per page.
- Headline to supporting sentence: 32–48px.

**Asymmetry rule:** asymmetry lives inside the grid, never in the frame. If text sits in columns 1–6,
columns 7–12 hold its picture, its blob, its list or its second column. Never nothing.

**Text edges:** text blocks share 2–3 left edges across the whole page (column 1, column 7, and optionally column 3). Pick them here and document them.

**Full-bleed:** pictures and field colours may run edge to edge. Text never touches the screen edge.

## Motion spec
None. (Sections expose a `data-section` attribute that the entrance system XYB-023 uses.)

## Build notes
- `styles/tokens.css`: `--margin`, `--gutter`, `--section-gap`, `--space-*`, `--content-max`.
- `components/layout/Section.tsx`: renders `<section>` with `aria-labelledby` (required prop `headingId`), vertical padding from `--section-gap`, optional `field` prop (`ground | lagoon | deep | ink`) that sets background and text colours from tokens.
- `Container.tsx` (margins + max width), `Grid.tsx` (CSS grid, `cols` per breakpoint), `Stack.tsx` (vertical gap from the space scale), `FullBleed.tsx` (escapes the container).
- Use CSS grid with `grid-template-columns: repeat(var(--cols), minmax(0, 1fr))`.
- Prefer container queries (`@container`) inside components so they work in any column span.
- `/lab/layout`: a debug overlay toggle (key `g`) that shows the columns — only on `/lab`, never in production pages (house rule: no visible grid lines).

## Acceptance criteria
- [ ] Tokens exist and match the tables above.
- [ ] `Section` requires a heading id and renders `aria-labelledby`.
- [ ] `field` prop switches background and text colour from tokens only, with passing contrast.
- [ ] At 390, 768 and 1440 the left and right margins are equal (measure in DevTools, screenshot in PR).
- [ ] No horizontal scroll at any width from 320 to 2560.
- [ ] `/lab/layout` shows a sample page with 3 sections, a full-bleed picture and the grid overlay toggle.
- [ ] `docs/brand/layout.md` documents the frame, rhythm, text edges and asymmetry rule.

## Out of scope
- Navigation and footer (XYB-030). Components like buttons (XYB-014).

## References
- Trait from Swiss / editorial web design: a strict frame lets the content be wild inside it.
- Trait from award sites: big section gaps that make every section feel like its own scene.
