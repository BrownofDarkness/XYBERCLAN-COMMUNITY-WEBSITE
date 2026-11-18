---
id: XYB-053
title: Our mindset /mindset
phase: 4-pages
type: motion
size: L
depends_on: [XYB-022, XYB-032]
skills: [gsap, scrolltrigger, copywriting, react, accessibility]
good_first_issue: false
---

# XYB-053 — Our mindset `/mindset`

## Why this exists (the strategy)
**Claim:** Xyberclan runs on a few beliefs, and we live them. **Proof:** each value on this page is tied to
a real story from the clan — a moment where a member acted on it.

Values pages are usually a list of nice words nobody reads. Ours is a long-read you scroll through like a
short film, and every value is earned by a story. It is also the page that tells the wrong people, kindly,
that this might not be their place.

## What the visitor should feel and do
- **Feel:** "These people think like me" — or, just as useful, "this isn't for me."
- **Do:** read to the end, accept the conduct summary in spirit, then **Join the clan**.

## Scope
- The manifesto as one continuous scroll story.
- 4–6 values (final list from XYB-001), each with one real story, a real photo or artifact, and the
  member's blob.
- A short conduct summary linking to the full code (XYB-059).
- Closing join call.

## Content
| Content | Source |
| --- | --- |
| Manifesto text (~400–700 words) | Founders, edited in XYB-018. Draft opening — confirm in XYB-018: "We don't sort people by followers. We tune in to each other." |
| Values (name + one sentence each) | Founders + core members, confirmed in XYB-001. Starting point from the hero concept: "Different minds", "One frequency", "No algorithms, just chemistry", "Make things happen". |
| One real story per value (80–150 words) | Collected from members by moderators, with the member's consent and name/blob, or anonymised by request. |
| One photo or artifact per story | From XYB-017's library (event photos, screenshots, sketches). |
| Conduct summary (3–5 lines) | From XYB-059. |

No value ships without its story. If a value has no real story yet, cut the value.

## Page structure (one scroll story, in chapters)

1. **Opening.** Full screen, Ground. The `h1` "Our mindset." is small-ish at the top for orientation; the
   first manifesto line fills the screen at display size, two lines max. As you scroll it gives way to the
   next. Its job: set the tone in one sentence.
2. **The manifesto.** A pinned reading sequence: manifesto paragraphs at statement size, revealed line
   by line as you scroll (scroll-scrubbed highlight from soft ink to full ink, final state always full ink).
   A single blob walks along the bottom edge of the screen as you progress, like a reading bar with a face.
   Its job: make reading feel like a journey, not homework.
3. **The values, one chapter each.** Each value takes a full field colour (Lagoon, Deep, then the other
   blob colours from XYB-011). Composition per chapter: value name as `h2` at display size, its sentence,
   then the story set as a quotation with the member's blob and name, beside a large real photo. Chapters
   alternate the photo side. Its job: each belief proven by a person.
4. **Into phase.** A short reprise of the home signature scene (XYB-032): the blobs from each story gather
   and fall into one beat. One line: draft — confirm in XYB-018: "Different minds. One frequency." Its job:
   tie the values back to the clan's one idea.
5. **The deal.** Conduct summary on Ground: what we expect, what we don't tolerate, how to report. Link
   **Read the code of conduct** (→ `/conduct`). Its job: safety, stated plainly.
6. **The close.** **Join the clan**. Its job: convert the people who nodded along.

## Design spec

**1440:** manifesto text in a 60ch measure at statement size (≤ 36px), left-aligned on cols 2–8, with the
reading blob on the bottom edge. Value chapters: `h2` spans cols 1–8; story cols 1–6, photo cols 7–12
(alternating). Each chapter at least one viewport tall, no chapter with an empty half.

**768:** same structure, photo above the story.

**390:** manifesto at 22–24px, measure ~32ch. Pinning shorter (or off if it causes jank; then a normal
scroll with reveals). Value chapters stack: name, sentence, photo full width, story.

Field colour changes are hard cuts at chapter edges (no gradients). Text on Lagoon is Ink; text on Deep is
Ground — verify contrast in XYB-011's table.

## Motion spec
- **Manifesto:** pinned with ScrollTrigger; each line scrubs from 35% to 100% ink opacity as it crosses
  the reading line. The reading blob walks (position tied to progress) and blinks on the beat.
- **Chapter change:** the page background switches field colour as the chapter's top crosses mid-screen
  (one tween on a CSS variable, 400ms, not scrubbed).
- **Value entrance:** `h2` word reveal (XYB-022), then sentence, story and photo (XYB-023 stagger). The
  photo scales from 1.06 to 1 as it enters.
- **Into phase:** reuse the XYB-032 scene component with fewer blobs.
- **Reduced motion:** no pinning, no scrub; all text full ink; field colours as static section backgrounds;
  blobs stand still (same SVG).

## Build notes
- Route: `app/(site)/mindset/page.tsx`. Manifesto and values as one MDX file
  `content/pages/mindset.mdx` with custom components `<Manifesto>`, `<Value>`, `<Story>`, so copy edits
  never need code changes.
- The scrub highlight must not split links or inline markup (XYB-022 rules). Full text is in the HTML and
  readable without JS.
- Field colour: set `--field` on `<main>` from the active chapter; each chapter also sets its own
  background so it works without JS.
- Watch for pin-spacing bugs on iOS Safari; test with Lenis on and off.
- Components: `ManifestoScroll`, `ReadingBlob`, `ValueChapter`, `StoryQuote`, `ConductSummary`.

## Acceptance criteria
- [ ] Every value has a real story with recorded consent (or a member's explicit request to stay anonymous).
- [ ] Headline and every `h2` fit in two lines at 1440 / 768 / 390.
- [ ] Manifesto measure stays between 45 and 70 characters on desktop.
- [ ] With JavaScript off, the full manifesto, all values and stories are readable in full ink.
- [ ] Reduced motion: no pinning or scrubbing, no walking blob, field colours still present.
- [ ] Contrast of text on each field colour passes WCAG AA (≥ 4.5:1 for body, ≥ 3:1 for large display).
- [ ] No layout jump when pinning starts or ends (CLS < 0.05 measured).
- [ ] Scroll stays above 50fps during the manifesto on a throttled mid phone profile.
- [ ] Links to `/conduct` and `/join` work and are reachable by keyboard.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no styled accent words, no gradients between chapters).

## Out of scope
- The full code of conduct text (XYB-059).
- New blob scenes; reuse XYB-026 and XYB-032.

## References
- Long-form scroll stories in editorial sites (NYT, The Pudding): reading paced by scroll, text first.
- Discord brand pages: full-field colour chapters with big type.
- Basecamp/37signals manifestos: plain words, strong opinions, no buzzwords.
