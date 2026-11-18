---
id: XYB-020
title: Motion tokens and the clan beat
phase: 2-motion-engine
type: motion
size: M
depends_on: [XYB-002]
skills: [typescript, react, gsap, css]
good_first_issue: false
---

# XYB-020 — Motion tokens and the clan beat

## Why this exists (the strategy)
Our tagline is *Different minds. One frequency.* This ticket builds that frequency in code. One shared
clock (**the clan beat**) drives every idle movement on every page. Two blobs on two different pages
bob on the same beat. If each component sets its own timings, the site feels random. With one set of
tokens and one beat, it feels like one living thing.

The proof is simple. Open two tabs side by side, or scroll from the hero to the footer: every idle blob
is breathing together.

## What the visitor should feel and do
Feel: "this place has a pulse", calm and alive without being busy.
Do: nothing. This is the engine. Visitors only see what it makes possible.

## Scope
- Motion tokens: durations, eases, distances, stagger, as CSS custom properties **and** a TypeScript object.
- GSAP global defaults and custom eases, registered once.
- The clan beat: one ticker-driven phase value, readable from React and from plain GSAP code.
- A reduced-motion contract that every later motion ticket follows.
- A `/lab/motion` page that shows every token and the beat working.

## Content
None. Only the lab page's labels ("Fast", "Base", "Slow", "Beat").

## Design spec

### Duration tokens
| Token | Value | Use |
| --- | --- | --- |
| `--dur-instant` | 90ms | Press feedback, colour flips |
| `--dur-fast` | 180ms | Hover, focus, small UI |
| `--dur-base` | 320ms | Menus, toasts, element entrances |
| `--dur-slow` | 640ms | Section entrances, headline reveals |
| `--dur-scene` | 1200ms | Hero intro, page transitions |

### Ease tokens
| Token | Curve | Feel |
| --- | --- | --- |
| `--ease-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | Default for things arriving |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Things moving from A to B |
| `--ease-in` | `cubic-bezier(0.55, 0, 1, 0.45)` | Things leaving (rare) |
| `squash` (GSAP CustomEase) | quick overshoot, settle | Blob lands, button release |
| `bob` (GSAP `sine.inOut`) | smooth sine | Idle breathing |

### Distance and stagger tokens
- `--rise-sm: 16px`, `--rise-md: 24px`, `--rise-lg: 32px` (how far entrances travel up).
- `--stagger-tight: 60ms`, `--stagger-base: 75ms`, `--stagger-loose: 90ms`.
- Rule: never more than 8 staggered items in one group. Past 8, stagger the groups, not the items.

### The clan beat
- **Frequency: 0.75 Hz** (one full bob every 1.333s). Close to a calm resting breath, slow enough never to feel nervous.
- The beat exposes `phase` (0→1, loops), `sin` (−1→1) and `beatCount` (integer, +1 every cycle).
- Idle bob amplitude for blobs: 4–6px up and down, plus a 2% squash/stretch on the Y scale at the bottom of each bob.
- A blink happens on a beat, never between beats: every 4–7 beats, chosen per blob from a seed.
- **Out of phase → in phase:** each blob can have its own `phaseOffset` (0–1). A `sync` value (0→1)
  blends every offset toward 0. `sync = 1` means everybody moves together. XYB-032 animates this.

## Motion spec
- The beat never stops while the tab is visible. It pauses when `document.hidden` is true and continues from the same phase when the tab comes back. No jump.
- **Reduced motion:** `phase` is frozen at a resting pose (0.25, the top of the bob). Blinks stay
  (they are tiny and not motion-heavy), but no bob and no squash. All duration tokens become `0ms` for
  travel. Opacity changes keep `--dur-fast` so things still appear softly.

## Build notes
- `styles/tokens/motion.css` — CSS custom properties above, plus:
  ```css
  @media (prefers-reduced-motion: reduce) {
    :root { --rise-sm: 0px; --rise-md: 0px; --rise-lg: 0px; --dur-slow: var(--dur-fast); --dur-scene: var(--dur-fast); }
  }
  ```
- `lib/motion/tokens.ts` — the same values as a typed `const` object (seconds for GSAP, ms for CSS).
  One source of truth: generate the CSS from the TS, or add a unit test that compares the two.
- `lib/motion/gsap.ts` — the only place GSAP plugins are registered (`ScrollTrigger`, `SplitText`,
  `CustomEase`). Runs once, client-only. Sets `gsap.defaults({ ease: 'expo.out', duration: 0.64 })`.
  Registers `CustomEase.create('squash', 'M0,0 C0.14,0 0.2,1.18 0.42,1.08 0.62,0.98 0.8,1 1,1')`.
- `lib/motion/clan-beat.ts` — a tiny singleton, not React state:
  - `gsap.ticker.add(tick)` updates `phase = (elapsed * 0.75) % 1`.
  - `subscribe(fn)` / `unsubscribe(fn)` for listeners that need a callback per frame.
  - `getBeat()` returns `{ phase, sin, beatCount }` with no allocation (reuse one object).
  - Listens to `visibilitychange` to pause and resume without a phase jump.
- `lib/motion/useClanBeat.ts` — React hook. Do **not** `setState` every frame. Return a ref-based getter
  for GSAP callers and the blob renderer's CSS variables (`--beat`), and an `onBeat(cb)` helper that fires once per beat (for blinks).
- `lib/motion/useReducedMotion.ts` — reads `matchMedia('(prefers-reduced-motion: reduce)')`, listens for changes, **and** the site's own **Pause motion** switch (footer, XYB-030 / XYB-080), stored in `localStorage` under `xyb-motion` and mirrored as `<html data-motion="reduce">`. Either source turns reduced motion on.
- `lib/motion/media.ts` — a shared `gsap.matchMedia()` helper with named conditions:
  `{ motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)', desktop: '(min-width: 1024px)', touch: '(pointer: coarse)' }`.
  Every later ticket builds its timelines inside this so cleanup and reduced motion are automatic.
- `app/lab/motion/page.tsx` — shows each duration on a moving square, each ease as a graph, and 12 dots
  bobbing on the beat with random offsets plus a slider for `sync` (0→1). Excluded from the sitemap and `noindex`.

## Acceptance criteria
- [ ] All tokens exist in `motion.css` and `tokens.ts` with the exact values above, and a test fails if they drift apart.
- [ ] GSAP plugins are registered in exactly one file. `grep -r "registerPlugin" src` returns one hit.
- [ ] `/lab/motion` shows 12 dots that bob at 0.75 Hz (measure: 15 cycles in ~20s).
- [ ] Moving the `sync` slider to 1 brings all 12 dots into the same phase smoothly, with no snapping.
- [ ] Switching tabs for 10 seconds and coming back resumes the bob from the same phase (no jump).
- [ ] Setting `<html data-motion="reduce">` (the footer Pause motion switch) has exactly the same effect as the OS setting.
- [ ] With reduced motion turned on in the OS, the dots rest still, and no element travels anywhere on the lab page.
- [ ] `useClanBeat` causes **zero** React re-renders per frame (check with React DevTools Profiler).
- [ ] The beat ticker costs less than 0.1ms per frame (Chrome Performance panel).
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Smooth scrolling (XYB-021), text reveals (XYB-022), section entrances (XYB-023).
- Blob rendering and behaviours. This ticket only provides the beat the blobs read (XYB-025, XYB-026).

## References
- Linear's motion: few durations, used with discipline.
- Apple's "breathing" sleep light: a slow rhythm you feel more than see.
- Disney's 12 principles: squash and stretch, slow in and slow out.
