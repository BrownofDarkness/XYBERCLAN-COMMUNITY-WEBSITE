---
id: XYB-060
title: 404, error and empty states — the lost blob
phase: 4-pages
type: design
size: S
depends_on: [XYB-025, XYB-026]
skills: [react, nextjs, copywriting, svg]
good_first_issue: true
---

# XYB-060 — 404, error and empty states: the lost blob

## Why this exists (the strategy)
**Claim:** even when something goes wrong, you're still with the clan. **Proof:** every dead end has a
blob who got lost too, a human sentence, and one clear way back.

Error pages are where most sites stop caring. Award juries and real visitors both notice the ones that
didn't. These states are small, but they carry the idea (*different minds, one frequency*) all the way
to the edges.

## What the visitor should feel and do
- **Feel:** a small smile instead of frustration.
- **Do:** get back on track in one click (home, clan, or retry).

## Scope
- `not-found.tsx` — 404 (page, member, event, project, article not found).
- `error.tsx` — runtime error inside a route, with **Try again**.
- `global-error.tsx` — the root layout failed (must work without the normal layout).
- Shared **empty state** component used by: clan filters (XYB-050), events with nothing upcoming (XYB-054),
  journal with no articles of a kind (XYB-057), search with no results.
- Animation failure fallback: if JavaScript fails or the motion engine does not start, every blob still shows as static SVG (no error message to the visitor).

## Content
Draft — confirm in XYB-018:

| State | Heading | Line | Action |
| --- | --- | --- | --- |
| 404 | "This blob got lost." | "The page you're looking for isn't here. Maybe it moved, maybe it never existed." | **Take me home** · **Meet the clan** |
| 404 member | "No blob by that name." | "Maybe they changed their handle, or haven't joined yet." | **Meet the clan** |
| Error | "Something slipped out of phase." | "That's on us. Try again, and if it keeps happening, tell us in Discord." | **Try again** · **Report it** |
| Global error | "We lost the beat for a moment." | "Reload the page. If that doesn't work, we're on Discord." | **Reload** |
| Empty (generic) | depends on the context | short, kind, with a next step | one action |

Never blame the visitor ("You typed the wrong address"). Never show stack traces or error codes beyond a short reference ID.

## Design spec

**404 page (1440):** full first screen. Left: `h1` at display size (two lines max), line, actions. Right:
a lone blob, slightly smaller than the hero blobs, looking around (searching pose), out of phase with the
beat — it bobs at a different rhythm than everything else. Far in the background, the crowd of blobs
(SVG sprite) is visible, in phase. The visual joke: the lost blob is literally off-beat.

**768:** same, blob 45% width.

**390:** blob on top (~40vh), text and actions below, actions full width.

**Empty state component:** a small blob (inline SVG, 120px) with an expression that fits ("shrug" pose from
XYB-015), heading at the second size, one line, one action. Left-aligned within its container, never
floating in the middle of an empty screen.

**Global error:** must not depend on fonts, tokens or JS bundles loading — inline minimal CSS with the core
colours, system font fallback, one blob inlined as a small static SVG (concrete colours, no CSS variables).

## Motion spec
- **404:** the lost blob bobs off-beat and looks left/right; when you hover **Take me home**, it turns toward
  the button and starts bobbing **on** the beat (it found its frequency). On click, it hops out of frame.
- **Error:** the blob shakes its head once.
- **Empty states:** the small blob shrugs once when it enters the viewport.
- **Reduced motion:** still SVG blobs, no bobbing, no hop.

## Build notes
- Files: `app/not-found.tsx`, `app/(site)/error.tsx` (client component, uses `reset()`),
  `app/global-error.tsx` (own `<html>` and `<body>`).
- Content routes call `notFound()` for unknown slugs; the per-type 404 copy uses a `kind` prop or the
  pathname segment.
- Error reporting: log the error with a digest/reference ID (Next provides `error.digest`); show the ID
  in small text so a member can quote it in Discord.
- `EmptyState` component: `{ blobPose, title, body, action }` — used by other tickets; export from the UI package.
- No-JS / failed-motion check: blobs are server-rendered SVG (XYB-025), so they appear without JavaScript. Verify
  here with JavaScript disabled and with a forced flag that skips the motion engine (`?nomotion=1` in dev only).
- Status codes: 404 for not found, 500 for errors (verify in production build).

## Acceptance criteria
- [ ] Unknown URLs, unknown member handles, unknown event/project/article slugs all return status 404 and the right copy.
- [ ] A thrown error in a route shows `error.tsx` with a working **Try again**, and a reference ID.
- [ ] `global-error.tsx` renders correctly with fonts and CSS blocked (tested by blocking requests in DevTools).
- [ ] The `EmptyState` component is used by XYB-050, XYB-054 and XYB-057 (or their tickets are updated to use it).
- [ ] With JavaScript disabled, every blob on the site shows as a static SVG and no error is shown to the visitor.
- [ ] Copy follows the drafted voice and never blames the visitor; no stack traces visible.
- [ ] Layout checked at 1440 / 768 / 390; reduced motion shows still SVG blobs only.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Monitoring / alerting setup (can be its own ticket later).
- Offline mode / service worker.

## References
- Classic playful 404s (Pixar, GitHub's parallax 404): one character, one joke, one way out.
- Discord's error screens: on-brand characters keep the mood light.
