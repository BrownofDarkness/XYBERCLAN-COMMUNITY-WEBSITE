---
id: XYB-023
title: Section entrance system
phase: 2-motion-engine
type: motion
size: M
depends_on: [XYB-021]
skills: [react, gsap, css]
good_first_issue: true
---

# XYB-023 — Section entrance system

## Why this exists (the strategy)
Every section on the site has parts: a heading, some text, a picture, a list. When they all fade in as one
block, the page feels like a slideshow. When each part arrives in order, heading then text then picture,
the page feels **choreographed**, like a host introducing people one by one. This ticket makes that the
default for every section, with **data attributes only**, so section builders never write entrance code.

## What the visitor should feel and do
Feel: each section greets you in order. The page reads like a story, not a stack of boxes.
Do: keep scrolling, and read without waiting. Nothing blocks reading.

## Scope
- A data-attribute API: `data-enter` on parts, `data-enter-group` on the section.
- Batching with ScrollTrigger so 30 sections don't create 300 triggers.
- Order rules: heading → text → media → extras.
- Reduced-motion and no-JS behaviour.
- A media variant (picture reveals with a clip, not just a fade).

## Content
None.

## Design spec
| Part (`data-enter=`) | From | Duration | Delay in group |
| --- | --- | --- | --- |
| `heading` | rise `--rise-md` (24px), opacity 0 | 640ms | 0ms (or use `<Reveal>` from XYB-022) |
| `text` | rise `--rise-sm` (16px), opacity 0 | 640ms | +75ms after heading |
| `media` | clip-path inset 0 0 100% 0 → 0 + scale 1.06 → 1 | 900ms | +150ms |
| `item` (lists, chips of content) | rise 16px, opacity 0 | 520ms | +60ms each, max 8 |
| `action` (buttons, links) | opacity 0 → 1, rise 8px | 320ms | last |

- Stagger range: 60–90ms. Never above 90ms (it starts to feel slow).
- Ease: `--ease-out` for all; media clip uses `--ease-in-out`.
- Start point: when the group's top reaches 80% of viewport height. Plays **once**. Never reverses on scroll up.

## Motion spec
- **Groups:** everything inside one `[data-enter-group]` plays as one timeline, in the order above (DOM order breaks ties).
- **Fast scrollers:** if a group is already past the viewport when the trigger fires (fast scroll, anchor jump), it finishes immediately in 200ms. Nobody waits for content they already passed.
- **Reduced motion:** opacity-only fades, 180ms, no rise, no clip, no scale. Same order.
- **No JS:** everything visible (same `.js` class guard and 2.5s safety as XYB-022).

## Build notes
- `lib/motion/entrances.ts` — one module, started from a client `<EntranceRoot>` in `app/layout.tsx`.
  - Uses `ScrollTrigger.batch('[data-enter-group]', { start: 'top 80%', once: true, onEnter: batch => ... })`.
  - Builds the timeline per group with `gsap.timeline()` and the tokens from `lib/motion/tokens.ts`.
  - Re-scans after each route change (listen to `usePathname()`), and kills old triggers first.
- CSS in `styles/motion/entrances.css`:
  ```css
  .js [data-enter] { opacity: 0; }
  .js [data-enter="media"] { clip-path: inset(0 0 100% 0); }
  @keyframes enter-safety { to { opacity: 1; clip-path: inset(0); } }
  .js [data-enter] { animation: enter-safety 0s 2.5s forwards; }
  ```
  When the timeline starts, remove the safety animation (`el.style.animation = 'none'`).
- Media: put `data-enter="media"` on the **wrapper**, not the `<img>`. The image itself scales inside the
  wrapper (`overflow: clip`), so the frame stays square-cornered and still.
- Do not combine `data-enter` with another GSAP animation on the same property. If a section needs
  custom motion, it opts out with `data-enter-group="manual"`.
- Document the API with a short example in `components/motion/README.md`:
  ```html
  <section data-enter-group>
    <h2 data-enter="heading">Next events</h2>
    <p data-enter="text">Come as you are.</p>
    <figure data-enter="media">…</figure>
    <a data-enter="action" href="/events">See all events</a>
  </section>
  ```

## Acceptance criteria
- [ ] Adding `data-enter-group` and `data-enter` attributes to a section is enough. No other code needed.
- [ ] On `/lab/motion`, a demo section plays heading → text → media → items → action in that order, with 60–90ms between parts.
- [ ] A page with 20 groups creates at most 1–2 ScrollTrigger batch instances, not 20+ triggers.
- [ ] Jumping to the bottom of a long page with the End key shows all passed sections complete within 200ms.
- [ ] Scrolling back up never replays or hides anything.
- [ ] With JavaScript disabled, all content is visible.
- [ ] With reduced motion on, parts fade only (no translate, clip or scale) and still keep their order.
- [ ] Images in media wrappers keep square corners and cause no layout shift.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Headline word-splitting (XYB-022 does it, and a `heading` part can use `<Reveal>`).
- Scroll-scrubbed or pinned scenes (each scene ticket).

## References
- Award sites where a section's heading arrives first and the picture opens after it, like a curtain.
- GSAP `ScrollTrigger.batch()` docs.
