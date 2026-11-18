---
id: XYB-024
title: "Page transitions: the blob wipe"
phase: 2-motion-engine
type: motion
size: L
depends_on: [XYB-021, XYB-015]
skills: [react, nextjs, css, svg, gsap]
good_first_issue: false
---

# XYB-024 — Page transitions: the blob wipe

## Why this exists (the strategy)
Moving between pages is where most sites feel cheap: a white flash, a jump, a spinner. Ours should feel like
walking from one room of the clan's house into the next. A soft **blob shape** (a silhouette from the
character bible, XYB-015) swells from the link you clicked and fills the screen in the **next page's field
colour**, then shrinks away to show the new page. It is our characters' body used as a door. It belongs to
Xyberclan and nobody else.

## What the visitor should feel and do
Feel: the site is one continuous place, and every click is a small, satisfying moment.
Do: navigate as fast as they want. The transition never blocks clicking or reading.

## Scope
- Route transitions using the **View Transitions API** (Next.js `viewTransition` + React 19 `<ViewTransition>`).
- The blob wipe: the shape grows from the click point, in the destination's field colour.
- Shared-element transitions for a few named elements (member blob → member profile, event ticket → event page).
- A fallback for browsers without View Transitions.
- Reduced-motion version.

## Content
- Each route declares its field colour in its layout metadata (e.g. `/events` = Deep, `/mindset` = Ink, `/clan` = Ground). The list is agreed with XYB-011.

## Design spec
- **Shape:** one blob silhouette from XYB-015, exported as an SVG path, used as a CSS `clip-path: path(...)` or `mask-image`. Same shape everywhere (it is our door, not a random blob).
- **Origin:** the centre of the clicked link or button. For keyboard navigation and browser back/forward: the centre of the screen.
- **Timing (total ≤ 900ms):**
  | Step | What | Duration | Ease |
  | --- | --- | --- | --- |
  | Grow | Blob scales from 0 to cover the viewport (scale computed from the farthest corner) | 420ms | `--ease-in-out` |
  | Hold | Field colour fully covers; new page swaps underneath | ≤ 80ms | — |
  | Reveal | Blob shrinks toward the bottom-centre and squashes slightly as it leaves (`squash` ease) | 380ms | `squash` |
- The new page's headline uses its `<Reveal>` entrance only after the wipe is 60% gone.
- **Shared elements:** use `view-transition-name` on:
  - the member's blob on `/clan` → the large blob on `/clan/[handle]`,
  - an event ticket on home/`/events` → the ticket hero on `/events/[slug]`.
  These morph with the default View Transition crossfade + position, 500ms, `--ease-in-out`.

## Motion spec
- Navigation starts **immediately** on click. If the next page takes longer than the grow step, the field
  colour holds (no spinner) and a single blob at the centre bobs on the clan beat until the page is ready.
- **Back/forward:** same wipe, coming from the screen centre.
- **Reduced motion:** no blob shape. A 180ms crossfade only. Shared elements crossfade without moving.
- **No View Transitions support (older Firefox/Safari):** no wipe. Instant route change, the new page's normal entrances play. No polyfill.

## Build notes
- Enable in `next.config.ts`: `experimental: { viewTransition: true }` (check the current Next 16 flag name before starting).
- `components/motion/RouteTransition.tsx` wraps `{children}` in the root layout with React's `<ViewTransition>`.
- Styles in `styles/motion/view-transitions.css`:
  ```css
  ::view-transition-old(root), ::view-transition-new(root) { animation: none; mix-blend-mode: normal; }
  ::view-transition-group(blob-wipe) { animation-duration: 900ms; }
  ```
  The blob is a fixed overlay element (`view-transition-name: blob-wipe`) whose clip-path animation is driven by CSS keyframes with `--origin-x/--origin-y` set from the click event.
- A tiny `useTransitionOrigin()` hook stores the last pointer-down position (in a module variable, not state). Links read it.
- Field colour per route: export `export const field = 'deep'` from each route's `layout.tsx` or a `routeFields` map in `lib/routes.ts`.
- Lenis: call `lenis.stop()` at grow start, `scrollTo(0, { immediate: true })` during hold, `lenis.start()` after reveal (see XYB-021).
- Focus: after the route change, move focus to the new page's `<h1>` (with `tabIndex={-1}`) and announce the page title through a polite live region.
- Prefetching stays on (Next `<Link>` default) so most transitions never need the waiting state.

## Acceptance criteria
- [ ] In Chrome/Edge/Safari 18+, clicking any internal link plays: blob grows from the click point → new page → blob shrinks, in ≤ 900ms.
- [ ] The wipe colour is the **destination** page's field colour, for every route in `lib/routes.ts`.
- [ ] Clicking a member blob on `/clan` morphs it into the profile blob on `/clan/[handle]`.
- [ ] Browser back/forward plays the wipe from the screen centre and restores the scroll position of the previous page.
- [ ] With a slow 3G throttle, the field colour holds with a bobbing blob, then reveals. No white flash at any point.
- [ ] In a browser without View Transitions, navigation works instantly with no errors in the console.
- [ ] With reduced motion on, only a 180ms crossfade plays.
- [ ] After every navigation, focus is on the new `<h1>` and screen readers announce the new page title.
- [ ] Clicking links quickly (3 clicks in 1s) never leaves an overlay stuck on screen.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no gradient in the wipe, flat field colour only).

## Out of scope
- Transitions for in-page tabs or filters (XYB-027 and page tickets).
- Designing the blob silhouette itself (XYB-015).

## References
- Sites where the transition shape is a brand element, not a generic fade.
- Chrome's View Transitions docs (cross-document and same-document), React 19 `<ViewTransition>`.
