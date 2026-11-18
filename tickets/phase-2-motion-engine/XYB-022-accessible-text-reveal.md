---
id: XYB-022
title: Accessible text reveal
phase: 2-motion-engine
type: motion
size: M
depends_on: [XYB-021]
skills: [react, gsap, accessibility]
good_first_issue: false
---

# XYB-022 — Accessible text reveal

## Why this exists (the strategy)
Our headlines are set big and few, so the moment each one appears matters. "Different minds. One
frequency." should arrive word by word, like members walking into a room one at a time, then
standing together. Done badly, split text is a well-known accessibility trap: screen readers read
"D-i-f-f…", links break, and if JavaScript fails the headline is invisible. This ticket builds **one**
reveal component that is beautiful and safe, so no one writes their own.

## What the visitor should feel and do
Feel: the words arrive with intent, and the headline "lands" together.
Do: read immediately. The headline is readable from the first frame; motion only adds to it.

## Scope
- `<Reveal>` component for headings and short statements (word split, optionally line split).
- Scroll-triggered (default) and immediate (hero) modes.
- Accessible output, no-JS visibility, reduced-motion behaviour.
- Re-split on resize and font load without a flash.

## Content
None. Uses the real headlines from section tickets.

## Design spec
- **Default reveal (words):** each word rises from `--rise-md` (24px) below with opacity 0→1, inside a
  line mask (`overflow: clip` per line) so the words seem to come up from behind a baseline.
- Stagger: `--stagger-base` (75ms) between words. Duration: `--dur-slow` (640ms). Ease: `--ease-out`.
- **Out of phase → in phase variant (`variant="phase"`):** words start at random small vertical offsets
  (±12px) and random delays (0–180ms), then all finish aligned at the same moment. Use it for the hero and the
  signature scene only.
- Maximum 14 words per reveal. Longer text is a paragraph and uses the section entrance (XYB-023) instead.
- Never split links, `<em>`, `<strong>` or any inline markup. If the heading contains a link, reveal by line, not word.

## Motion spec
- Trigger: when the element's top reaches 85% of the viewport height. Plays **once**.
- `immediate` mode (hero): starts after fonts are ready, at most 150ms after first paint.
- **Reduced motion:** no split at all. Text fades in over `--dur-fast` (180ms), opacity only.
- **No JavaScript:** text is fully visible. Nothing is hidden by CSS before JS runs.

## Build notes
- `components/motion/Reveal.tsx`:
  ```tsx
  <Reveal as="h2" variant="words" | "lines" | "phase" trigger="scroll" | "immediate">Meet the clan</Reveal>
  ```
- Use GSAP `SplitText` (registered in `lib/motion/gsap.ts`), with `type: 'words,lines'`, `mask: 'lines'`, and `autoSplit: true` so it re-splits on resize and font changes.
- **Accessibility pattern:**
  - Keep the original element as the accessible one: set `aria-label` on the heading with the full text, **or**
    (better) render a visually hidden copy (`.sr-only`) and put `aria-hidden="true"` on the split wrapper.
    Pick one pattern, use it everywhere, and document it in the component file.
  - Test with VoiceOver and NVDA: the heading must be read once, as whole words, at the correct heading level.
- **Hide before JS, safely:** add the class `js` to `<html>` with an inline script in `<head>`. Only
  `.js [data-reveal]` starts at `opacity: 0`. Add a 2.5s CSS safety animation that forces `opacity: 1`
  if the GSAP code never runs.
- All code inside `useGSAP(() => {...}, { scope })` with `gsap.matchMedia()` from XYB-020, so it cleans up and handles reduced motion.
- Revert the split on unmount (`split.revert()`).
- The `phase` variant reads per-word random values from a seeded random (`seed = text`), so it looks the same every visit and on server render.

## Acceptance criteria
- [ ] `<Reveal>` works on h1–h3 and `<p>` with `words`, `lines` and `phase` variants on `/lab/motion`.
- [ ] VoiceOver (Safari) and NVDA (Firefox) read each revealed heading once, as normal words, at the right level.
- [ ] With JavaScript disabled, every revealed heading is visible on first paint.
- [ ] If the GSAP bundle fails to load (block it in DevTools), headings become visible within 2.5s.
- [ ] With reduced motion on, nothing moves: headings fade in over 180ms, and no SplitText markup is created (check the DOM).
- [ ] Resizing the window from 1440 to 390 after a reveal leaves the text correctly wrapped (no broken lines or overlapping words).
- [ ] A heading with a link inside is revealed by line, and the link stays one clickable element.
- [ ] No layout shift during the reveal (CLS contribution = 0).
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no styled accent word, no eyebrow added by the component).

## Out of scope
- Character-by-character effects, scrambles, typewriter effects. They don't fit our voice.
- Paragraph and media entrances (XYB-023).

## References
- Editorial sites where headings rise from behind a line mask: calm, never bouncy.
- GSAP SplitText v3.13+ docs (`mask`, `autoSplit`, `onSplit`).
