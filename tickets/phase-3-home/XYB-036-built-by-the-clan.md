---
id: XYB-036
title: Built by the clan
phase: 3-home
type: dev
size: M
depends_on: [XYB-005, XYB-023]
skills: [react, gsap, css]
good_first_issue: false
---

# XYB-036 — Built by the clan

## Why this exists (the strategy)
**Claim:** members here don't only talk. They ship things together.

**Proof:** real projects made by members, shown big: the actual product, the people who made it, and what
it does. Each one links to its case study.

"Make things happen" is the third verb in the hero. This section is the evidence, and the strongest reason
for a builder to join: "people here will build with me".

## What the visitor should feel and do
- **Feel:** respect, and a little envy — "I want to be on one of those teams."
- **Do:** open a project, or press **See everything we built** to go to `/built`.

## Scope
- Heading + one line, then 3–6 featured projects in a horizontal scroll-driven strip on desktop, a vertical
  stack on phone. Each project: large media, name, one-line description, the makers' blobs and names, link.
- Link to `/built`.

## Content
- Projects from `content/projects/` (XYB-005) with `featured: true`, ordered by `shippedAt` (newest first).
- For each project (supplied by the project's team through a PR, see XYB-072-style flow):
  - Name, one sentence (what it does, for whom), year.
  - Media: one real screenshot, screen recording (muted loop, ≤ 6s, poster frame), or photo of the thing.
  - Makers: member handles (their blobs and names are pulled from member files).
  - Optional link to the live project (external → ↗).
- Heading (draft — confirm in XYB-018): "Built by the clan".
- Line: "Things members made together. All of them real, most of them still running."
- If fewer than 3 real projects exist, the section shows them in a simple stacked layout (no horizontal
  scroll) — the scroll effect needs at least 3 to make sense.

## Design spec

**Desktop (1440)**
- Paper field. Heading `h2` at display step 2 on the left, line beside it on the right (columns 8–12),
  aligned to the heading's baseline.
- The strip: the section **pins** and vertical scroll moves the projects horizontally. Each project panel is
  about 70vw wide:
  - Media at 16:10, square corners, filling the panel width.
  - Under the media, one row: project name at display step 4 (≈ 44px) on the left; on the right the makers'
    small blobs (40px) in a row with their names in text size.
  - One sentence under the name, text-large, max 50ch. Link "Read the story →".
- A simple progress indicator: the current project number as words is not needed; use the next panel's
  edge peeking in (15vw) so people see there is more.

**Tablet (768):** no pin. Horizontal swipe row with scroll-snap, panels 85vw.
**Phone (390):** vertical stack, media 4:3, each project separated by 96px of space (no lines).

**Final link** after the strip: **See everything we built →** `/built`.

## Motion spec
- **Pin + horizontal scroll** (desktop only): ScrollTrigger pin, `x` of the track from 0 to `-(trackWidth - viewport)`,
  `scrub: 0.8`, snap to each panel's start.
- **Media:** each media scales 1.06 → 1.0 as its panel centres; videos play only while their panel is in view
  and pause otherwise.
- **Makers' blobs:** bob on the clan beat; hovering the makers row makes them hop together (a team high-five).
- **Entrance** (XYB-023): heading and line reveal before the pin starts.
- **Reduced motion:** no pin, no horizontal scroll: projects stack vertically like the phone layout; videos
  show their poster with a play button instead of autoplaying.

## Build notes
- Files: `components/home/BuiltStrip.tsx`, `components/home/ProjectPanel.tsx`. Share `ProjectPanel` with `/built` (XYB-056) if possible.
- Videos: `<video muted playsinline loop preload="none" poster>`; an IntersectionObserver plays/pauses.
  Provide MP4 (H.264) + WebM, max 2 MB each.
- The pin must be destroyed and rebuilt on resize across the 1024px breakpoint (ScrollTrigger `matchMedia`).
- Use real `<a>` links for each project; the whole panel is not one giant link (so text can be selected).
- Keyboard: tabbing to a project link scrolls its panel into view (listen to `focusin` and scroll Lenis to it).

## Acceptance criteria
- [ ] Only real projects with `featured: true` appear; makers resolve to real member files.
- [ ] Desktop: vertical scroll moves the strip horizontally and snaps to each project.
- [ ] Tabbing through project links brings each panel fully into view.
- [ ] Tablet uses swipe with scroll-snap; phone stacks vertically.
- [ ] Videos play only while visible, are muted, and have poster frames; nothing autoplays under reduced motion.
- [ ] With fewer than 3 projects, the stacked layout is used and no pin is created.
- [ ] External project links carry ↗ and open in the same tab (no forced new tabs).
- [ ] Media has alt text / captions; video has an accessible label.
- [ ] No cards with shadows or borders; panels are separated by space.
- [ ] 60fps during the horizontal scrub on desktop.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Case study pages (XYB-056). Project submission flow (handled with the content layer and XYB-072).

## References
- Studio portfolio sites: horizontal pinned galleries with big media.
- Supabase Launch Week: community-built things shown with pride.
