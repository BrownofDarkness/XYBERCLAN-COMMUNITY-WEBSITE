---
id: XYB-021
title: Smooth scroll + ScrollTrigger plumbing
phase: 2-motion-engine
type: dev
size: M
depends_on: [XYB-020]
skills: [react, nextjs, gsap, lenis]
good_first_issue: false
---

# XYB-021 — Smooth scroll + ScrollTrigger plumbing

## Why this exists (the strategy)
Our signature scenes (XYB-032 *into phase*, the three verbs in XYB-033, the mindset story in XYB-053)
are driven by scroll. If scrolling stutters, or ScrollTrigger measures the page before fonts and images
load, every scene breaks: wrong start points, jumps, pinned sections that overlap. This ticket builds the
plumbing **once**, correctly, so no section ticket has to think about it.

**Lenis is our only smooth-scroll engine.** We do not install Locomotive Scroll or any other. One engine, one ticker, one source of truth for scroll position.

## What the visitor should feel and do
Feel: scrolling is soft and weighted, like sliding paper on a table, never floaty or laggy.
Do: scroll, use the keyboard, use anchor links. Everything works exactly like a normal page.

## Scope
- Lenis set up once, globally, in the app layout.
- Lenis driven by the GSAP ticker and connected to ScrollTrigger.
- Correct refresh after web fonts, images and route changes.
- Clean destroy on unmount. No leaked ScrollTriggers between routes.
- Reduced motion and touch rules.
- Anchor links, keyboard scrolling and "scroll to top on route change" all working.

## Content
None.

## Design spec
- Lenis options: `duration` not used; use `lerp: 0.1` (desktop). Wheel multiplier `1`. `smoothWheel: true`.
- **Touch devices:** native scrolling (`syncTouch: false`). Phones already have good momentum scrolling. Do not fight it.
- **Reduced motion:** Lenis is **not created at all**. The page uses native scroll. Scrubbed scenes show their final state (each scene ticket handles its own final state, but this ticket provides the flag).

## Motion spec
- Scroll position updates on the same frame as all GSAP animations (one ticker, no double requestAnimationFrame).
- Anchor links (`#section`) scroll with Lenis using the `--ease-in-out` token over 1.0–1.4s depending on distance, and move keyboard focus to the target.
- On route change: scroll resets to top **instantly** (no animated scroll between pages); the page transition (XYB-024) handles the visual.

## Build notes
- `lib/motion/smooth-scroll.tsx` — `<SmoothScrollProvider>` (client component) mounted once in `app/layout.tsx`.
  ```ts
  const lenis = new Lenis({ lerp: 0.1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time: number) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);
  // cleanup:
  return () => { gsap.ticker.remove(raf); lenis.destroy(); };
  ```
- Use the `media` helper from XYB-020 (`gsap.matchMedia`): create Lenis only under the `motion` condition and when `(pointer: fine)`.
- Expose `useLenis()` (returns the instance or `null`) and `scrollTo(target, opts)` that falls back to
  `element.scrollIntoView({ behavior: 'auto' })` when Lenis is off.
- **Refresh rules** (`lib/motion/refresh.ts`):
  - `document.fonts.ready.then(() => ScrollTrigger.refresh())`.
  - A `ResizeObserver` on `<main>` that calls a debounced (150ms) `ScrollTrigger.refresh()`.
  - Images inside pinned or scrubbed sections must have width/height set (no layout shift). Add a lint note in `CONTRIBUTING.md`.
- **Route changes** (App Router): in a client component that watches `usePathname()`:
  - Before the new page mounts: section components kill their own triggers through `gsap.context()` / `useGSAP()` cleanup (from `@gsap/react`). This is the rule for every ticket: **all GSAP code lives in `useGSAP` with a scope ref.**
  - After mount: `lenis.scrollTo(0, { immediate: true })`, then `ScrollTrigger.refresh()` on the next frame.
- Nested scroll areas (menus, dialogs, the Blob Maker panel): add `data-lenis-prevent` so they scroll natively.
- When a dialog or the mobile menu opens: `lenis.stop()`. On close: `lenis.start()`.
- Pinned sections: always `pinSpacing: true` unless the scene ticket says otherwise, and `anticipatePin: 1`.
- Dev-only: `?markers=1` in the URL turns on ScrollTrigger markers globally (`ScrollTrigger.defaults({ markers: true })`).

## Acceptance criteria
- [ ] `package.json` contains `lenis` and **does not** contain `locomotive-scroll` or any other smooth-scroll library.
- [ ] Lenis is created exactly once (log in dev; navigating between 5 routes never creates a second instance).
- [ ] After visiting 5 routes and coming back, `ScrollTrigger.getAll().length` equals the count for the current page only (no leaks).
- [ ] A test page with a pinned section and a late-loading web font starts the pin at the correct point (markers line up).
- [ ] With OS reduced motion on, `useLenis()` returns `null` and the page scrolls natively.
- [ ] On an iPhone and an Android phone, scrolling is native (no lerp, no jitter).
- [ ] Space, Page Down, arrow keys and Home/End all scroll the page on desktop.
- [ ] Clicking an anchor link scrolls smoothly **and** moves focus to the target heading.
- [ ] Opening the mobile menu stops page scrolling behind it; closing it resumes.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Any visible scroll animation (XYB-022, XYB-023, scene tickets).
- A custom scrollbar. The native scrollbar stays.
- Horizontal smooth scroll for galleries (each section ticket decides).

## References
- Studio sites built with Lenis + GSAP: the scroll feels heavy but never delayed.
- GSAP docs, "ScrollTrigger with Lenis" pattern (ticker-driven, `lagSmoothing(0)`).
