---
id: XYB-038
title: Mindset teaser
phase: 3-home
type: motion
size: S
depends_on: [XYB-022]
skills: [gsap, scrolltrigger, copywriting, css]
good_first_issue: true
---

# XYB-038 — Mindset teaser

## Why this exists (the strategy)
**Claim:** Xyberclan has values, and they are not the usual "innovation, passion, excellence".

**Proof:** one line from the manifesto, written by the clan, said big enough that you remember it — and a
way to read the rest.

After all the activity above (people, projects, events), the page slows down for one breath. This is the
page's one deliberate quiet moment. It must feel like a person speaking, not a slogan.

## What the visitor should feel and do
- **Feel:** "I agree with that." A small nod.
- **Do:** press **Read our mindset** to go to `/mindset`.

## Scope
- One statement (max about 25 words), set large, with a scroll-scrubbed word highlight.
- One link to `/mindset`.
- One blob, sitting quietly next to the line, listening.

## Content
- **The line:** chosen by the founders from the manifesto (XYB-053). It must be specific to Xyberclan.
  Example of the *kind* of line (draft — confirm in XYB-018, do not ship without approval):
  > "We'd rather build something small with people we trust than something big with people we don't know."
- Bad examples (do not use): "We believe in community." "Together we grow." (They pass the competitor test,
  so they fail it.)
- **Link:** "Read our mindset →" `/mindset`.
- Owner: founders pick the line; XYB-018 polishes it.

## Design spec
- **Paper field**, generous space: 200px above and below on desktop (this is the deliberate rest).
- The statement is a `<p>` (not a heading: it's a statement), at **statement size: 36px max on desktop**,
  24px on phone, leading 1.25, max 3 lines, set across columns 2–10, left aligned.
- A section heading still exists for structure and screen readers: `h2` "Our mindset" at text-large, above the
  statement, in full ink (sentence case, not an uppercase label).
- Words start at a **light tone of ink** (ink at 25%, `--color-ink-faint` from XYB-011) and turn **full ink**
  one by one as you scroll. This is a colour step per word, never a gradient across the line.
- A small Deep blob (80px) sits at the end of the last line, on the baseline, like it's part of the sentence.
- Link 40px under the statement.

**Tablet (768):** columns 1–12, 30px. **Phone (390):** 24px, full width, blob drops below the text, left.

## Motion spec
- **Scroll scrub:** ScrollTrigger from "statement top hits 75% of viewport" to "statement bottom hits 40%":
  each word's colour steps from faint to full ink in reading order (`scrub: true`). Implemented as an opacity
  change on a full-ink copy of each word (transform/opacity only), not a colour animation on every frame.
- **Blob:** nods once when the last word turns ink, then idles on the clan beat.
- **Reduced motion:** every word is full ink from the start; blob still.
- **No JS:** full ink text (the faint state is only applied by the script).

## Build notes
- File: `components/home/MindsetTeaser.tsx`. Line comes from `content/home/mindset-teaser.json` (one field: `line`).
- Use the text split helper from XYB-022 with `aria-hidden` split words and an unsplit accessible copy.
- Faint tone must still be readable for people who stop scrolling halfway: at least 3:1 contrast on paper
  (if ink at 25% fails, use the lightest ink tint that passes 3:1).

## Acceptance criteria
- [ ] The line is approved by the founders and is about Xyberclan specifically (passes the competitor test).
- [ ] The statement is a `<p>`, ≤ 36px on desktop and ≤ 24px on phone, max 3 lines at every width.
- [ ] The section has an `h2` "Our mindset" in sentence case.
- [ ] Words turn from faint to full ink with scroll, one by one, with no gradient.
- [ ] The faint state has at least 3:1 contrast.
- [ ] Without JavaScript or with reduced motion, all words are full ink.
- [ ] Screen readers read the sentence once, normally.
- [ ] The link goes to `/mindset`.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- The manifesto page (XYB-053).

## References
- Apple product pages: one sentence revealed by scroll.
- Manifesto pages of small studios: one line said with conviction.
