---
id: XYB-000
title: Short name of the work
phase: 0-foundations | 1-brand-system | 2-motion-engine | 3-home | 4-pages | 5-platform | 6-quality-launch
type: design | dev | 3d | motion | content | qa
size: S | M | L          # S = ½ day, M = 1–2 days, L = 3–5 days. Anything bigger is split.
depends_on: []           # ticket ids that must be merged first
skills: []               # e.g. [react, gsap, svg, illustration, copywriting, figma]
good_first_issue: false
---

# XYB-000 — Title

## Why this exists (the strategy)
The one claim this page/section/system makes, and the proof it uses. If there is no claim, the ticket should not exist.

## What the visitor should feel and do
One line for the feeling, one line for the action.

## Scope
- What is in.

## Content
The real words, data and media this needs. Who provides them. No placeholder text ships.

## Design spec
Layout on desktop (1440), tablet (768) and phone (390). Type sizes, colours (tokens only), media crops.

## Motion spec
Entrance, idle, interaction, scroll behaviour. The reduced-motion version.

## Build notes
Files, components, libraries, data sources, gotchas.

## Acceptance criteria
- [ ] Checklist anyone can verify in review.
- [ ] Works at 1440 / 768 / 390, keyboard only, and with `prefers-reduced-motion`.
- [ ] Bilingual: no hard-coded text; works in English and French; headlines fit two lines in French too.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
What not to do here, so the ticket stays small.

## References
Traits to learn from (never copy).
