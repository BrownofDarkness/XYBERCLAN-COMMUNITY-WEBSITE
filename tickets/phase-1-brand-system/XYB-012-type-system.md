---
id: XYB-012
title: Type system
phase: 1-brand-system
type: design
size: M
depends_on: [XYB-001]
skills: [typography, css, licensing]
good_first_issue: false
---

# XYB-012 — Type system

## Why this exists (the strategy)
**Claim:** Xyberclan speaks with a confident, friendly voice.
**Proof:** a display face with round, soft shapes (like the clay blobs) set very large, and a calm text
face for reading. Few sizes, big contrast between them. Type is the second character on the site after
the blobs.

## What the visitor should feel and do
Feel: "these people are confident and kind". Do: read the headline from across the room and the body text without effort.

## Scope
- Identify the display face used in the hero concept ("Different minds. One frequency."). In the SVG the text is outlined (converted to paths), so the name is not in the file. **Ask the designer of the concept** (XYB-001 question 22) and check the Figma file.
- Check the licence for web use. If it is not licensed or too expensive, choose an open alternative (candidates below) that matches the round, geometric shapes.
- Choose the text face. The hero body looks like Inter or a close neo-grotesk.
- Self-host fonts with `next/font/local`, subset (Latin + Latin Extended for French accents), variable if available.
- A 5-step fluid type scale with `clamp()`, tracking and leading per step.
- Rules: max 5 sizes per page, max 2 families, headlines ≤ 2 lines.

## Content
**Open display candidates to test against the concept** (set "Different minds. One frequency." in each, at 120px, overlay on the hero image at 50% opacity, pick the closest):
- Bricolage Grotesque (variable, has optical sizes)
- Gabarito
- Familjen Grotesk
- Onest
- Funnel Display

**Text face candidates:** Inter (or Inter Display for larger sizes), Onest, Instrument Sans. If one family can do both jobs well, use **one family** (preferred).

French readiness: test `é è ê à ç œ « »` and the word "Rejoindre le clan" in every candidate.

## Design spec
Five steps. Values are a starting point; tune in the PR with screenshots at 1440 / 768 / 390.

| Token | Use | `font-size` | Leading | Tracking |
| --- | --- | --- | --- | --- |
| `--step-display` | Hero headline, footer wordmark line | `clamp(3.5rem, 2rem + 6.5vw, 8.5rem)` (≈ 56px → 126px at 1440) | 0.92 | -0.035em |
| `--step-h2` | Section headlines | `clamp(2.25rem, 1.5rem + 3vw, 4.5rem)` (≈ 36px → 67px) | 0.98 | -0.03em |
| `--step-lead` | Lead sentences, statements, card titles | `clamp(1.375rem, 1.1rem + 1vw, 2rem)` (≈ 22px → 32px) | 1.2 | -0.01em |
| `--step-body` | Running text | `clamp(1.0625rem, 1rem + 0.2vw, 1.1875rem)` (≈ 17px → 19px) | 1.5 | 0 |
| `--step-small` | Captions, meta, legal | `clamp(0.875rem, 0.85rem + 0.1vw, 0.9375rem)` (≈ 14px → 15px) | 1.45 | 0 |

- Headline-to-body ratio at 1440: about 126 / 19 ≈ 6.6. This is intended: big things big, small things small.
- Measure: body text 45–75 characters per line (`max-width: 62ch`).
- Weights: display at one weight (the concept looks like Medium/Semibold). Body Regular, plus Medium for buttons and labels. No more weights.
- No uppercase tracked labels. No italics in headlines. No monospace except in real code blocks.
- Tabular figures (`font-variant-numeric: tabular-nums`) for dates, counts and times.
- `text-wrap: balance` on headlines, `text-wrap: pretty` on paragraphs.

## Motion spec
None here. Headline reveal behaviour is XYB-022. Note for that ticket: split by **words**, never by letters for running text.

## Build notes
- Fonts in `public/fonts/` (WOFF2 only), loaded with `next/font/local` in `app/layout.tsx`, `display: "swap"`, exposed as CSS variables `--font-display` and `--font-text`.
- Provide a metric-matched fallback (`adjustFontFallback` or manual `size-adjust`) so the layout does not jump when fonts load (CLS ≈ 0).
- Preload only the display face weight used above the fold.
- Tokens in `styles/tokens.css`, mapped in Tailwind `@theme` as `--text-display`, `--text-h2`, etc.
- Utility components: `components/ui/Heading.tsx` (`as` prop for h1–h3, `size` prop for the step), `Text.tsx`.
- Add `/lab/type`: every step at the three widths, the French test line, and a "two-line check" for the real headlines from the copy deck.
- Licence files go in `public/fonts/LICENSES/`.

## Acceptance criteria
- [ ] The concept's display face is identified (or confirmed unknown), and the choice is documented with licence in `docs/brand/type.md`.
- [ ] Overlay comparison of candidates vs. the concept is in the PR.
- [ ] Fonts are self-hosted WOFF2, subset, total under 120 KB for the faces loaded on the home page.
- [ ] All 5 steps exist as tokens and render correctly at 1440, 768 and 390 (screenshots).
- [ ] "Different minds. One frequency." fits in 2 lines at 390 and at 1440.
- [ ] French characters render correctly in every weight used.
- [ ] Layout shift from font loading is under 0.01 (Lighthouse or Web Vitals).
- [ ] Max 2 families and max 3 weights loaded across the site.
- [ ] `/lab/type` exists.

## Out of scope
- Writing headlines (XYB-018 and section tickets). Animated text (XYB-022).

## References
- Trait from Linear and strong editorial sites: very few sizes, huge contrast between display and body.
- Trait from the hero concept itself: round, soft display letters that echo the clay blobs.
