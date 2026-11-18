---
id: XYB-010
title: Logo, wordmark and favicons
phase: 1-brand-system
type: design
size: M
depends_on: [XYB-001]
skills: [logo-design, figma, svg, motion-design]
good_first_issue: false
---

# XYB-010 — Logo, wordmark and favicons

## Why this exists (the strategy)
**Claim:** Xyberclan is recognisable at 16 pixels and at full screen width.
**Proof:** one clean mark (the X with a blob beside it), one wordmark, and a set of exported files every
other ticket uses. The mark already tells the story: the **X** is the structure (the clan, the build),
the **blob** is the person.

The hero concept (`docs/assets/hero-concept.png`, top left) already has a mark: an ink X made of two
rounded bars, a Lagoon (`#22C4D2`) blob shape and a Deep (`#2785B7`) circle overlapping it. This ticket
turns that sketch into a production-ready identity, without changing its spirit.

## What the visitor should feel and do
Feel: "friendly, crafted, not corporate". Do: recognise the clan in a browser tab, a Discord server icon and a share image.

## Scope
- Redraw the mark as clean vector geometry (whole-number coordinates, consistent corner radii).
- **Remove the gradient** on the small X bar from the concept (house rule: no gradients). Use flat ink.
- Design the wordmark "Xyberclan" in the display face from XYB-012 (or custom-drawn letters based on it). Decide capitalisation: "Xyberclan" (recommended, matches the concept title).
- Lockups: mark alone; mark + wordmark horizontal; wordmark alone (for the footer, set at full width).
- Colour versions: full colour on Ground; ink-only; reversed (Ground on Ink); one-colour on Lagoon and Deep fields.
- Clear space and minimum sizes.
- Favicon set and app icons.
- **Animated mark** spec + Lottie or SVG/CSS file (see Motion spec).

## Content
- Source: the hero SVG from the founders (`Xyberclan — A place for your people.svg`). Ask the concept's designer for the Figma file (XYB-001 question 21).
- Wordmark spelling and capitalisation confirmed by the founders in the PR.

## Design spec
- **Mark grid:** draw on a 48 × 48 unit grid. Bars of the X: equal width, fully rounded ends. Blob: one continuous Bézier shape, no corners. Circle: perfect circle, overlaps the blob by about 30% of its diameter.
- **Minimum size:** mark 16px (favicon version is simplified: no thin details, maybe drop the circle overlap stroke). Wordmark 80px wide.
- **Clear space:** the height of the circle on every side.
- **Footer wordmark:** must hold up when set edge to edge at 1440 (about 1380px wide). Check letter spacing at that size; display type needs tighter tracking than at 40px.
- **Colours:** tokens only (`--ink`, `--ground`, `--lagoon`, `--deep`) from XYB-011.
- Exports:
  - `public/brand/mark.svg`, `mark-ink.svg`, `mark-reversed.svg`, `wordmark.svg`, `lockup-horizontal.svg`.
  - `app/icon.svg` (adapts to dark tabs with `prefers-color-scheme` inside the SVG), `app/favicon.ico` (16/32/48), `app/apple-icon.png` (180), `public/brand/icon-512.png`, `icon-192.png`, maskable icon with safe zone.
  - Discord server icon 512 and banner, social avatar 400 × 400.

## Motion spec
The animated mark is used in the nav on first load and in the page transition (XYB-024).

- **Load:** the X bars slide in from opposite sides and lock together (300ms, `--ease-out` from XYB-020). The blob drops in from above, **squashes** on landing (scaleY 0.8 → 1.06 → 1, 450ms), then the circle pops (scale 0 → 1.1 → 1, 250ms). Total under 1s.
- **Idle:** the blob breathes on the clan beat (scaleY ±2%, period from XYB-020). Nothing else moves.
- **Hover (nav link to home):** the blob does one small hop (translateY -3px, squash on return).
- **Reduced motion:** static mark, no idle, no hop.
- Deliver as an inline SVG React component `components/brand/Mark.tsx` with GSAP timelines, or as a Lottie file if the animation needs shape morphing. Prefer inline SVG (smaller, crisp, themeable).

## Build notes
- Optimise every SVG with SVGO; keep `viewBox`, remove fixed width/height, use `currentColor` for the ink-only version.
- `components/brand/Mark.tsx` and `components/brand/Wordmark.tsx` accept `title` for accessible name ("Xyberclan home").
- Write `docs/brand/logo.md`: do / don't (no stretching, no recolouring outside tokens, no effects, no shadows).

## Acceptance criteria
- [ ] Mark redrawn on the 48-unit grid with no gradient, approved by the concept's designer or two founders.
- [ ] All lockups and colour versions exported as optimised SVG (each under 4 KB).
- [ ] Favicon is legible at 16px in light and dark browser tabs (screenshots in PR).
- [ ] Apple, Android (maskable) and Discord icons exported and checked in a real device/app.
- [ ] Footer wordmark tested at 1440 width edge to edge (screenshot in PR).
- [ ] `Mark` component animates per spec and respects `prefers-reduced-motion`.
- [ ] `docs/brand/logo.md` exists with clear-space and minimum-size rules.
- [ ] Demo of all versions on `/lab/brand`.

## Out of scope
- Changing the concept into a new logo. This is a refinement, not a redesign.
- The blob characters themselves (XYB-015).

## References
- Trait from Discord and Duolingo: a mark simple enough to draw from memory, with character inside it.
- Trait from strong studio sites: the wordmark returns at full width in the footer as a confident close.
