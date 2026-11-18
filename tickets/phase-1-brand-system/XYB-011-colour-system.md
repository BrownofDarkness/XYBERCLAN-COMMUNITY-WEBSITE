---
id: XYB-011
title: Colour system
phase: 1-brand-system
type: design
size: M
depends_on: [XYB-001]
skills: [colour, oklch, accessibility, css]
good_first_issue: false
---

# XYB-011 — Colour system

## Why this exists (the strategy)
**Claim:** "different minds" can be colourful and still look premium.
**Proof:** a strict system. The interface itself is calm (one ground, one ink). Colour lives in two
places only: **the blobs** (every member has one) and **whole field sections** (a section can turn fully
Lagoon or Deep). This is how the site looks joyful without looking cheap.

## What the visitor should feel and do
Feel: calm paper and ink, with bursts of life where the people are. Do: read easily, find the one action on each screen.

## Scope
- Colour tokens in OKLCH in `styles/tokens.css`, with hex fallbacks noted in comments.
- Roles: ground, ink, surfaces (tone steps), accent for focus, field colours, blob colours, states (success, warning, error).
- 4–6 new blob colours next to Lagoon and Deep.
- Contrast table for every text-on-colour pair the site uses.
- Tokens other tickets rely on: `--ink-hover` (XYB-027), `--error` (XYB-027, XYB-058), and the **route field-colour map** in `lib/routes.ts` (one field colour per top-level route, used by the page transition in XYB-024).
- Decide: a night theme only for event pages, or no dark theme at all. (Recommendation below.)

## Content
Starting values from the hero concept. Approximate OKLCH; verify with a converter (oklch.com) and adjust in the PR.

| Token | Hex (concept) | OKLCH (approx.) | Role |
| --- | --- | --- | --- |
| `--ground` | `#F7F7F2` | `oklch(97.5% 0.006 106)` | Page background |
| `--ground-2` | to define | ground, L −3% | Tone step for a quiet surface (no borders) |
| `--ink` | `#232823` | `oklch(26.5% 0.012 145)` | All text, primary button |
| `--ink-2` | to define | ink, L +25% | Small secondary notes only |
| `--lagoon` | `#22C4D2` | `oklch(75% 0.12 205)` | Big blob, field colour, focus ring |
| `--deep` | `#2785B7` | `oklch(57% 0.115 240)` | Small blob, field colour |

**Proposed blob colours** (design team chooses 4–6; all must look like the same clay family as Lagoon and Deep):

| Name | OKLCH (proposal) | Hex (approx.) |
| --- | --- | --- |
| Moss | `oklch(72% 0.14 135)` | `#7DB956` |
| Sun | `oklch(86% 0.15 92)` | `#F2CB3A` |
| Coral | `oklch(72% 0.16 35)` | `#F27A5E` |
| Mint | `oklch(88% 0.08 165)` | `#A8E6CB` |
| Pebble | `oklch(80% 0.012 100)` | `#C6C6BC` |
| Night | ink | `#232823` |

Rules for blob colours: **no violet or indigo**, no cream-and-terracotta pairing, similar chroma so no
colour shouts louder than the others. Blob colours never appear on small UI (links, buttons, icons).

## Design spec
- **Proportions per screen:** about 80% ground, 15% ink, 5% colour (blobs). A field section flips this: 90% field colour.
- **Field sections:** Lagoon field with ink text; Deep field with ground text (check contrast); Ink field with ground text (for the final call or footer).
- **Accent use:** the primary button is ink, not colour. Lagoon is used for the focus ring (3px, 2px offset) and nothing else in the UI.
- **States:** error, warning, success colours tuned to the same lightness family; error text must pass 4.5:1 on ground.
- **Contrast table to fill in the PR** (WCAG 2.2: 4.5:1 body text, 3:1 large text ≥ 24px or bold 19px, 3:1 UI):

| Text | On | Ratio | Body OK? | Large OK? |
| --- | --- | --- | --- | --- |
| ink | ground | ~14:1 | | |
| ink-2 | ground | | | |
| ink | lagoon | ~8:1 | | |
| ground | deep | ~4.2:1 (check) | | |
| ink | deep | | | |
| ground | ink | | | |
| error | ground | | | |
| lagoon focus ring | ground | | n/a | UI 3:1? |

  If ground-on-deep fails for body text, use deep fields only with large text, or darken `--deep-field` slightly (a separate token, the blob keeps its colour).
- **Dark theme:** recommendation — **no global dark mode at launch**. The paper ground is part of the identity. Event pages may use an **Ink field** "night" variant (ground text on ink) as a section, not a theme. Write the decision in `docs/brand/colour.md`.

## Motion spec
Field colour changes between sections are **hard cuts or a wipe** driven by scroll (XYB-033), never a fade between two colours (that would be a gradient in time). No colour animation on UI elements except focus ring appearance (opacity).

## Build notes
- `styles/tokens.css`: `:root { --ground: oklch(...); ... }` with `/* #F7F7F2 */` comments.
- Map to Tailwind v4 in `globals.css`: `@theme { --color-ground: var(--ground); --color-ink: var(--ink); --color-lagoon: var(--lagoon); ... }`.
- Export the same values as a TS object in `lib/brand/colours.ts` for the blob renderer (XYB-025), which needs concrete hex values for share images where CSS variables do not work.
- Add a `/lab/colour` page: swatches, every text pair with its live contrast ratio (compute with a small util).
- `::selection` uses lagoon background with ink text.

## Acceptance criteria
- [ ] All tokens exist in `styles/tokens.css` in OKLCH with hex comments.
- [ ] 4–6 blob colours chosen, none violet/indigo; shown together on a render or swatch sheet in the PR.
- [ ] The contrast table is complete; every pair used for body text passes 4.5:1.
- [ ] Focus ring passes 3:1 against ground and against every field colour it can appear on.
- [ ] `/lab/colour` shows every swatch and live contrast ratios.
- [ ] `lib/brand/colours.ts` matches the CSS tokens (one source of truth, documented).
- [ ] `docs/brand/colour.md` explains roles, proportions, the dark-theme decision and do/don't.
- [ ] No component uses a raw hex value (grep check in PR).
- [ ] `--ink-hover`, `--error` and the route field-colour map in `lib/routes.ts` exist and are documented.

## Out of scope
- Blob artwork and its shade/highlight tones (XYB-016). Section-level colour choreography (section tickets).

## References
- Trait from Discord's brand site: whole sections in one bold field colour with big type.
- Trait from editorial sites: a paper ground and true ink make everything feel printed and expensive.
