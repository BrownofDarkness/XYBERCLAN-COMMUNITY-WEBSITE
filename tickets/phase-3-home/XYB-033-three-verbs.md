---
id: XYB-033
title: "What happens here: three verbs"
phase: 3-home
type: dev
size: L
depends_on: [XYB-023, XYB-017]
skills: [react, gsap, css, photography]
good_first_issue: false
---

# XYB-033 — What happens here: three verbs

## Why this exists (the strategy)
**Claim:** Xyberclan is not a chat group you join and forget. Three things really happen here:
**you find your people, you trade ideas, you make things happen.**

**Proof:** for each verb, one large real photograph of clan life and **one concrete, real example** (a named
meetup, a real thread or talk, a real project). Proof, not promises.

The hero's supporting sentence lists these three verbs. This section keeps that promise, one verb at a
time, as three full-height chapters with three different field colours. It must never become "three cards
with icons", the most common template pattern on the web.

## What the visitor should feel and do
- **Feel:** "This is real. Real people, real rooms, real work."
- **Do:** follow one of the three links to go deeper (Meet the clan / What's inside / Built by the clan).

## Scope
- Three chapters, each about one screen tall, in this order:
  1. **Find your people** — paper field.
  2. **Trade ideas** — Lagoon field.
  3. **Make things happen** — Deep field.
- Each chapter: heading, 2–3 sentences, one real example, one large photo, one link.
- A small blob in each chapter doing that verb (pose from XYB-015/016).

## Content
For each chapter, provided by the founders (XYB-001) and the photo team (XYB-017):

| Chapter | Heading | Body (draft — confirm in XYB-018) | Real example needed | Photo needed | Link |
| --- | --- | --- | --- | --- | --- |
| 1 | Find your people | Designers next to developers, students next to founders. Meet people who get excited about the same weird things you do. | One real meetup or Discord moment: name, date, what happened. | People talking at a real clan meetup, faces visible, with consent. | Meet the clan → `/clan` |
| 2 | Trade ideas | Ask the question you were scared to ask. Teach what you know. Get honest feedback before you ship. | One real talk, workshop or channel thread (title + who + when). | Someone presenting or a group around a laptop. | What's inside → `/inside` |
| 3 | Make things happen | Ideas are good. Shipped things are better. Members team up to build, launch and learn together. | One real project built by members (name, team, what it does). | The team that built it, or the project in use. | Built by the clan → `/built` |

- If a real example or photo does not exist yet, **the ticket is blocked**, not filled with stock. Ask in the
  content channel. Found archive pictures (XYB-017) may be used only for the world around the clan (the city,
  the venue), never presented as the clan's own people.
- Each photo needs alt text that says who/what/where (XYB-017 alt guide).

## Design spec
Each chapter uses a **different composition**, so the three never read as a repeated block.

**Chapter 1 — Find your people (paper)**
- Desktop: photo on the **right**, columns 6–12, full chapter height, cropped 4:5, square corners. Text on the
  left, columns 1–5: heading at display step 2 (≈ 72px, two lines max), body at text-large, the example as a
  short paragraph with the meetup name in bold, link below.
- A small blob (Lagoon) sits on the bottom edge of the photo, waving at another blob in the photo's corner.

**Chapter 2 — Trade ideas (Lagoon field)**
- Desktop: photo **full bleed** across the top 60% of the chapter (21:9 crop), heading set large **over the
  paper part below**, never over the photo. Body and example in two columns under it (columns 1–6 and 7–11).
- Blob: two blobs facing each other passing a small object (an idea: a little clay lightbulb or a speech blob,
  from XYB-015).

**Chapter 3 — Make things happen (Deep field, paper text)**
- Desktop: photo on the **left**, columns 1–7, 3:2 crop, and the heading **huge** on the right at display
  step 1, stacked "Make things / happen." (two lines). The real project appears as a short "case": name, team
  members' names, one sentence of what it does, link.
- Blob: a blob proudly holding up something it made, standing on top of the heading's baseline.

**Tablet (768):** every chapter becomes photo on top (full width, 4:3), text below, still in its own field colour.
**Phone (390):** same as tablet; photo 4:5, heading at step 4 (≈ 44px), blobs scaled to 64px tall.

**Field changes:** the field colour changes at the chapter boundary with a hard edge (no fade, no gradient).
The nav follows the field colour (XYB-030).

## Motion spec
- **Entrance per chapter** (XYB-023): heading words reveal (XYB-022), then body, example and link rise 24px +
  fade, 80ms stagger.
- **Photo:** clip reveal from the edge that faces the text (inset clip-path 0 → 100%, 900ms, `--ease-out`),
  then a slow scroll-linked scale 1.08 → 1.0 while the chapter is in view (the "one moving picture").
- **Field colour:** as the next chapter's top crosses 50% of the viewport, the body's field colour switches
  (handled by the field system from XYB-023/030), so the colour change feels like turning a page.
- **Blobs:** land when the chapter enters, then idle on the clan beat. Hover/tap makes them repeat their verb
  (wave / pass / lift).
- **Reduced motion:** no clip reveals or scale; photos and text are simply there; blobs stand still.

## Build notes
- Files: `components/home/ThreeVerbs.tsx`, `components/home/VerbChapter.tsx` (one component, three layout
  variants via a `layout="right|fullbleed|left"` prop, not three copies).
- Content: `content/home/verbs.json` (heading, body, example, photo path, alt, credit, link), validated by the
  zod schema from XYB-005.
- Images via `next/image`, AVIF/WebP, `sizes` set per layout, lazy below the fold, blur placeholder from a
  tiny version (not a gradient).
- Blobs: `<Blob>` inline SVG (XYB-025), idle on the clan beat (XYB-026), paused offscreen.
- Each chapter is a `<section aria-labelledby>` with its own `h2`.

## Acceptance criteria
- [ ] Three chapters, three different layouts, three field colours (paper, Lagoon, Deep).
- [ ] Every chapter has a real photo of the clan and a real, named example (checked against XYB-001 facts).
- [ ] No stock photos, no icons in tinted squares, no cards.
- [ ] Each heading is an `h2`, two lines max at 1440 / 768 / 390.
- [ ] Text on Lagoon and Deep fields meets 4.5:1 contrast (body) and 3:1 (large headings).
- [ ] No text sits on top of a photo.
- [ ] Each chapter's link goes to the right page and is reachable by keyboard in reading order.
- [ ] The photo scale effect stays within transform/opacity and runs at 60fps.
- [ ] Reduced motion: no reveals or scaling, everything visible.
- [ ] Every photo has alt text and a credit in `content/home/verbs.json`, shown in the footer credits.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Writing the full "What's inside" page (XYB-052). The project case studies (XYB-056).

## References
- Discord brand site: full-field colour chapters with big headings.
- Editorial magazines: one large photograph per spread, captioned with a real fact.
