---
id: XYB-027
title: Micro-interactions and states
phase: 2-motion-engine
type: motion
size: M
depends_on: [XYB-014, XYB-020]
skills: [css, react, accessibility]
good_first_issue: true
---

# XYB-027 — Micro-interactions and states

## Why this exists (the strategy)
Premium is felt in the small things: how a button gives under your finger, how a link's arrow leans
forward, how a form tells you something went wrong without shouting. These are the moments people touch
most often, hundreds of times per visit. This ticket gives every control a consistent, soft, clay-like
response, so the whole site feels like one hand-made object.

## What the visitor should feel and do
Feel: every control answers back, softly and instantly.
Do: click, tap, tab, type, with total confidence about what is clickable and what happened.

## Scope
States for every interactive component from XYB-014: hover, focus-visible, active (press), disabled, loading,
success, error. Covers pill buttons, text links with arrows, nav links, form fields, toggles, filters/chips of
the directory, and cards that are links.

## Content
- State copy (loading, success, error messages) comes from the voice guide (XYB-018). Examples:
  "Sending…", "You're in. Check your inbox.", "That email looks unfinished."

## Design spec

| Element | Hover (pointer: fine only) | Press | Focus-visible | Disabled |
| --- | --- | --- | --- | --- |
| **Pill button (primary, ink)** | Background steps one tone lighter (`--ink-hover`), arrow nudges 3px up-right | `scale(0.97)`, 90ms | 2px **Lagoon** ring, 2px offset (`outline: 2px solid var(--lagoon); outline-offset: 2px`) | 40% opacity, no hover, `cursor: not-allowed` |
| **Pill button (secondary)** | Ground tone step under the label | `scale(0.97)` | Same ring | Same |
| **Text link with ↗ / →** | Arrow moves 3px in its direction, underline grows from 1px to 2px thickness (text-decoration, not a border) | Arrow returns, 90ms | Same ring around the link | — |
| **Nav link** | Underline appears (text-decoration-thickness 2px, `text-underline-offset: 6px`) | — | Same ring | — |
| **Current nav link** | Always underlined, `aria-current="page"` | — | — | — |
| **Form field** | Background one tone step darker | — | Ring + label stays visible above | Muted, readable |
| **Card that is a link** | Media inside scales 1 → 1.03 (600ms, `--ease-out`), title underlines | `scale(0.99)` | Ring on the whole card | — |

- **Durations:** hover in `--dur-fast` (180ms), hover out 240ms, press `--dur-instant` (90ms), release 220ms with the `squash` ease (a tiny overshoot, like clay springing back).
- **Arrows** are icons from Solar (via Iconify), never text characters, and always `aria-hidden`.
- **The cursor stays native.** No custom cursor, no magnetic buttons, no cursor followers.
- Hit area: minimum 44×44px for every control on touch, even if the visible shape is smaller.

### Form feedback
- **Error:** the field gets an ink-coloured message below it, linked with `aria-describedby`, and the field nudges horizontally 3 times (±4px, 240ms total). The colour is an error token from XYB-011, used only for the icon and a 2px left mark on the message, never as the text colour if it fails contrast.
- **Loading:** the button keeps its width, the label changes to "Sending…" and a small blob (16px inline SVG) bobs on the clan beat beside it. `aria-busy="true"`.
- **Success:** the button turns Lagoon for 1.2s with a check icon, and focus moves to the success message.

## Motion spec
- Only `transform`, `opacity`, `background-color`, `text-decoration-thickness` change. No layout properties.
- **Touch:** no hover styles under `(hover: none)`. Press feedback stays.
- **Reduced motion:** no scale, no nudge, no arrow travel. Colour and underline changes stay (they are not motion).

## Build notes
- All in CSS: `styles/motion/interactions.css` using the motion tokens. No JavaScript for hover or press.
- Use `:focus-visible`, never `:focus`, for the ring. Never `outline: none` without a replacement.
- Use `@media (hover: hover) and (pointer: fine)` around hover rules.
- The error shake is a CSS keyframe added with a class for 240ms, then removed (`animationend`).
- The loading blob uses `<Blob size={16}>` from XYB-025, with the idle bob from XYB-026.
- Add every state for every component to the `/lab/components` page from XYB-014, with a "force state" toggle so reviewers can see them all at once.

## Acceptance criteria
- [ ] Every component in `/lab/components` shows hover, focus-visible, active, disabled (and loading/success/error for forms) side by side.
- [ ] Tabbing through the home page shows a visible Lagoon ring on every control, with 3:1 contrast against both Ground and Ink backgrounds (check the token pair).
- [ ] Pressing a pill button scales it to 0.97 and releases with a small overshoot, with no layout shift around it.
- [ ] On a phone, no hover state gets "stuck" after a tap.
- [ ] Submitting an invalid form shows the message under the field, the screen reader announces it, and the field nudges.
- [ ] The loading state keeps the button width (no jump) and sets `aria-busy`.
- [ ] With reduced motion on, nothing scales or moves; colour and underline feedback still work.
- [ ] No custom cursor anywhere. `grep -r "cursor: none"` returns nothing.
- [ ] All touch targets are at least 44×44px (measure in DevTools).
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no glow, no shadow on hover).

## Out of scope
- The components themselves (XYB-014).
- Page and section motion (XYB-022, XYB-023, XYB-024).

## References
- Linear and Vercel: hover states that are almost invisible but always there.
- Physical buttons: they give a little when pressed and spring back.
