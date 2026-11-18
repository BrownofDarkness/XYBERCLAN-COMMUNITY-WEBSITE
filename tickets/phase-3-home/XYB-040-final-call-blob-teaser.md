---
id: XYB-040
title: "Final call: your blob is waiting"
phase: 3-home
type: dev
size: M
depends_on: [XYB-025, XYB-026, XYB-058]   # only XYB-058 part 1 (the Blob Maker), not the application backend
skills: [react, svg, gsap, accessibility]
good_first_issue: false
---

# XYB-040 — Final call: your blob is waiting

## Why this exists (the strategy)
**Claim:** there is a place in the clan for you, and joining takes a minute.

**Proof:** you don't read about it, you **do** it: pick a colour and a shape, and your blob appears right
next to the two hero blobs, as if you were already one of them. Then **Make your blob** takes you to `/join`
to finish it and apply.

This is the end of the home page and its strongest call to action. Everything above was proof; this is the
moment the visitor makes a choice. A small taste of the Blob Maker (XYB-058) turns "maybe later" into
"I've already started".

## What the visitor should feel and do
- **Feel:** delight, and a sense of ownership — "that one's mine".
- **Do:** press **Make your blob** (goes to `/join` with their choices kept).

## Scope
- A full-height closing section before the footer.
- A mini maker: **colour** (5–6 swatches) and **species** (3–4 shapes) only. Face, craft and name are on `/join`.
- The two hero blobs plus the visitor's new blob, on stage together.
- Primary action **Make your blob** → `/join?species=…&colour=…`. Secondary: **Join the clan** for people who
  don't want to play.

## Content
- Heading (draft — confirm in XYB-018): "Your blob is waiting".
- Line: "Pick a colour and a shape. Finish it, then join the clan. Takes about a minute." (Only say "a minute" if
  XYB-058 + XYB-071 really take about a minute; otherwise change the line.)
- Control labels: "Colour" and "Shape". Swatch names are spoken names, not hex codes: e.g. "Lagoon", "Deep",
  and the other names from XYB-011. Species names from XYB-015.
- Buttons: **Make your blob** (primary), **Join the clan** (secondary text link).

## Design spec

**Desktop (1440)**
- **Lagoon field** (the brand colour, last colour before the ink footer).
- Left (columns 1–5): heading `h2` at display step 1 (as big as the hero), two lines max; line under it at
  text-large; then the two controls; then the buttons.
- Controls:
  - **Colour:** a row of round swatches (44px, the only round things besides buttons and blobs), the selected
    one has a 3px ink ring with 3px gap (no shadow).
  - **Shape:** a row of small species silhouettes (56px inline SVG) as buttons; the selected one sits on a
    paper-tinted round base.
- Right (columns 6–12): the stage. The two hero blobs on the left of the stage, and the visitor's blob arriving
  on the right, the big Lagoon blob's arm moving to welcome it (the hero pose, now with three).
- The stage floor is shared with the hero so it reads as "the same scene, now with you".

**Tablet (768):** stage on top, heading and controls below.
**Phone (390):** heading, then stage (60vh), then controls as two horizontal swipe rows, then the buttons
(primary full width). The primary button must be visible when the controls are visible.

## Motion spec
- **Entrance:** the two hero blobs walk in from the left (a small hop cycle), stop, and look at an empty
  spot. A soft outline of where "you" will stand is **not** drawn (no decorative shapes) — instead the
  small blob points at the empty spot.
- **First choice:** the visitor's blob **drops in** with a big squash and a little dust puff (a few soft
  clay crumbs, 300ms) and the big blob waves at it.
- **Changing colour:** the blob's material colour tweens in 250ms, and it does a happy wiggle.
- **Changing shape:** the blob squashes flat, swaps geometry while flat, and pops back up as the new shape
  (morph cheat, 350ms total).
- **Idle:** all three bob on the clan beat, **in sync** — the visitor is already on the frequency.
- **Make your blob press:** the visitor's blob hops toward the button and the page transition (XYB-024) starts
  from the blob's position, in the blob's colour.
- **Reduced motion:** no walking or dropping; the SVG blob swaps instantly on each choice.

## Build notes
- Files: `components/home/FinalCall.tsx`, `components/home/MiniMaker.tsx`.
- **Reuse the Blob Maker's state and parts** from XYB-058: `useBlobMakerState()` in `lib/blob-maker/` and the
  same species/colour lists from XYB-015 / XYB-011. Do not create a second source of truth.
- Selections pass to `/join` through the URL (`?species=&colour=`), so it works with JS disabled too: the
  controls are a real `<form method="get" action="/join">` with radio inputs styled as swatches/silhouettes.
- Blobs: `<Blob>` from the renderer (XYB-025). The default pick is in the server HTML; changing colour sets `--blob`, changing species swaps the `<use>` target.
- Remember the last choice in `sessionStorage` (try/catch) so returning from `/join` keeps it.
- Radio groups: `fieldset` + `legend` ("Colour", "Shape"), arrow keys move within a group (native radio behaviour).

## Acceptance criteria
- [ ] Picking a colour or shape updates the visitor's blob on the stage within 300ms.
- [ ] Colour and shape lists come from the same source as `/join` (one import, no duplicates).
- [ ] **Make your blob** opens `/join` with the chosen species and colour already selected.
- [ ] With JavaScript off, the form still submits to `/join?species=…&colour=…`.
- [ ] Controls are native radio groups with legends; keyboard and screen reader work (arrow keys, names spoken).
- [ ] Swatches have spoken names ("Lagoon"), never hex values, as accessible names.
- [ ] Phone: primary button visible with the controls; no horizontal page scroll.
- [ ] Idle bob of all three blobs is in sync with the clan beat.
- [ ] Reduced motion: instant swaps, no drop or walk.
- [ ] The heading is two lines max at 1440 / 768 / 390.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Faces, accessories, names, crafts, saving or sharing the blob (all on `/join`, XYB-058).
- The application form (XYB-071).

## References
- Character creators in games: instant feedback on every choice.
- Duolingo: the mascot celebrates your first step.
