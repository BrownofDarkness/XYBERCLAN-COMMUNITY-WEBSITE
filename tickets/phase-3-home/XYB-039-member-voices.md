---
id: XYB-039
title: Member voices
phase: 3-home
type: dev
size: M
depends_on: [XYB-017, XYB-023]
skills: [react, css, gsap, interviewing]
good_first_issue: false
---

# XYB-039 — Member voices

## Why this exists (the strategy)
**Claim:** being in the clan changes something real for people.

**Proof:** members say it themselves, in their own words, with their real face and name. Not "Amazing
community! ★★★★★" — a specific story: what they found, who they met, what they built.

Everything else on the page is us talking. This section is the only place where members talk, so it carries
more trust than any other. That's why it has the strictest rule on the site: **real quotes only, with written
consent, or the section does not exist.**

## What the visitor should feel and do
- **Feel:** "That could be me."
- **Do:** read two or three, then keep scrolling to the final call (XYB-040).

## Scope
- Heading, then 3–6 real quotes, one shown large at a time, the others reachable.
- Each quote: the words, the member's photo, name, craft, city, and how long they've been in the clan.
- **The section is hidden** if fewer than 3 approved quotes exist.

## Content
- **Collecting quotes** (owner: a content volunteer, with XYB-017):
  - Ask members one open question: "What happened for you because you joined Xyberclan?"
  - Keep their words. You may shorten (with "…") but never rewrite meaning. Max about 40 words per quote.
  - Get **written consent** for the quote, the name and the photo (consent form from XYB-017). Store the consent
    record outside the repo; the content file just stores `consent: true` and the date.
  - Photos: real photos of the member (their own or from a clan event), square crop.
- Content file: `content/voices/{handle}.json` → `quote`, `handle`, `photo`, `photoAlt`, `memberSince`,
  `consentDate`, `approved: true`.
- Heading (draft — confirm in XYB-018): "In their words".
- **Forbidden:** invented quotes, "lorem" quotes during review deploys, AI-written quotes, quotes from
  non-members presented as members, stock photos of "happy people".

## Design spec

**Desktop (1440)**
- Paper field. Heading `h2` at display step 3 at top left.
- **One quote at a time, large:** the quote as a `<blockquote>` at statement size (≤ 36px), columns 1–8,
  max about 4 lines. Under it: name (bold) · craft · city · "member since {year}".
- On the right, columns 9–12: the member's **photo large** (square, about 360px), and their blob (100px)
  standing on the bottom edge of the photo, slightly overlapping it — the person and their blob together.
- Below: the other voices as a row of **small square photos** (64px). The active one is full size and full
  colour; the others are smaller. Clicking a photo shows that quote. No dots, no arrows-only controls.

**Tablet (768):** photo above the quote (square, 240px), row of small photos below the quote.
**Phone (390):** quote at 22px, photo 160px above it, small photos become a swipe row.

**Statement-size rule:** a quote is a statement, not a headline: never larger than 36px desktop / 24px phone.

## Motion spec
- **Entrance** (XYB-023): heading, then the first quote's words reveal by line (XYB-022), then photo clips in
  from the bottom, then the blob hops onto the photo's edge.
- **Switching voices:** the current quote fades out and up (8px), the new one fades in by line; the photo
  crossfades; the blob for the new member swaps with a quick pop (scale 0.6 → 1 with overshoot).
- **No autoplay rotation.** Quotes change only when the visitor asks. (Auto-rotating quotes are hard to read
  and fail WCAG 2.2.2 without a pause control.)
- **Idle:** blob bobs on the clan beat.
- **Reduced motion:** instant swaps, no reveals.

## Build notes
- Files: `components/home/MemberVoices.tsx`, `components/home/VoiceSwitcher.tsx`.
- Server-side guard: `const voices = getApprovedVoices(); if (voices.length < 3) return null;` — a test covers it.
- Each small photo is a `<button aria-pressed>` with the accessible name "Show {name}'s story".
- The active quote region is `aria-live="polite"` so screen-reader users hear the new quote when they switch.
- `<figure>` + `<blockquote>` + `<figcaption>` structure for each quote.
- Photos through `next/image`, square crop, lazy.

## Acceptance criteria
- [ ] With fewer than 3 approved voices, the section does not render (no heading, no gap).
- [ ] Every quote has `approved: true`, a `consentDate`, and a matching member file.
- [ ] Every voice has a real photo and alt text; no illustrated or generated faces.
- [ ] Quote text ≤ 36px desktop and ≤ 24px phone, max 4 lines.
- [ ] Voices change only on user action; there is no autoplay.
- [ ] Keyboard: each small photo is a button; Enter/Space switches; the new quote is announced.
- [ ] The person's blob appears with their photo and matches their member file.
- [ ] Semantic `figure` / `blockquote` / `figcaption` markup.
- [ ] Reduced motion: instant swaps.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Long member stories (they go in the Journal, XYB-057).

## References
- Documentary portraits: the face and the words given equal weight.
- Read.cv / Are.na: respect for the person over hype.
