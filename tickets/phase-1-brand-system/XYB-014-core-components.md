---
id: XYB-014
title: Core UI components
phase: 1-brand-system
type: dev
size: L
depends_on: [XYB-013, XYB-006]
skills: [react, typescript, accessibility, css]
good_first_issue: false
---

# XYB-014 — Core UI components

## Why this exists (the strategy)
**Claim:** every click on Xyberclan feels the same quality, whoever built the section.
**Proof:** a small set of shared components with every state designed (rest, hover, focus, active,
disabled, loading, error). Sections compose them; nobody styles a button twice.

## What the visitor should feel and do
Feel: things respond, things are clear. Do: always know what is clickable and what will happen.

## Scope
Build in `components/ui/`, each with a demo on `/lab/components`:

1. **Button** — the pill from the hero concept. Variants: `primary` (ink fill, ground text), `secondary` (text + arrow, no fill, no outline box), `on-field` (for Lagoon/Deep/Ink fields). Sizes: `md`, `lg`. Optional trailing icon. `asChild`/`href` support so links can look like buttons.
2. **TextLink** — inline and standalone. Standalone has the ↗ arrow only when the link leaves the site; internal links use →.
3. **Field** — text input, textarea, select, checkbox, radio group, with label, hint (`aria-describedby`) and error message.
4. **Toast / inline status** — for form success and errors (polite live region).
5. **Media** — wrapper for images/video with fixed aspect ratio, square corners, `alt` required, lazy by default, blurred-free placeholder colour from tokens (not a blur).
6. **Avatar** — member photo (square or circle? decide once; recommendation: circle for people, consistent site-wide) with blob fallback (uses `<Blob>` from XYB-025).
7. **Disclosure** — accessible expand/collapse for FAQ.
8. **VisuallyHidden** and **SkipLink**.

## Content
Button and link labels come from the CTA naming map in `docs/creative-direction.md` §5 and XYB-018.

## Design spec
- **Button primary:** height 56px (`lg`) / 48px (`md`), padding-inline 28px, radius 999px, `--ink` fill, `--ground` text, `--step-body` size, Medium weight. Arrow icon 18px, gap 16px (as in the concept).
- **Button secondary:** ink text + arrow, no box. Underline appears on hover (2px, offset 4px).
- **Hover:** primary fill lightens one tone step (`--ink` → `--ink-hover`), the arrow nudges 3px toward its direction.
- **Active (press):** scale 0.97, 100ms.
- **Focus-visible:** 3px `--lagoon` ring, 2px offset, on every interactive element. Never removed.
- **Disabled:** 40% opacity + `aria-disabled`, cursor not-allowed, no hover.
- **Loading:** label stays, a small blob spinner replaces the arrow (blob squash loop on the clan beat), `aria-busy="true"`.
- **Fields:** height 56px, ground-2 fill (a tone step, **no 1px border**), radius 16px (pill buttons + soft-cornered fields; document this pairing in `docs/brand/components.md`). Label above, in ink, `--step-small` Medium. Error text below in error colour with an icon, linked with `aria-describedby`.
- **Touch targets:** minimum 44 × 44px.
- No shadows, no gradients, no glass on any component.

## Motion spec
- All state changes use CSS transitions with motion tokens from XYB-020 (`--dur-fast` 120ms, `--ease-out`).
- Arrow nudge on hover: `transform: translate(3px, -3px)` for ↗, `translateX(3px)` for →.
- Reduced motion: keep colour/underline changes, remove transforms.
- Full micro-interaction polish is XYB-027; this ticket ships correct, simple states.

## Build notes
- Use native elements first (`<button>`, `<a>`, `<input>`). Use Radix primitives or React Aria only where native is not enough (select, disclosure) and document the choice.
- Icons: Solar icon set via Iconify (`@iconify/react` with offline bundle, or inline SVG exports). Never mix icon sets.
- Variants with a tiny `cva` setup or plain props → class maps. No CSS-in-JS runtime.
- Every component has a typed props interface and a short JSDoc.
- `/lab/components` shows every variant × every state side by side, at desktop and phone width.
- Add Playwright component checks for keyboard: Tab order, Enter/Space activation, Escape on disclosures.

## Acceptance criteria
- [ ] All 8 components exist with typed props and a `/lab/components` demo.
- [ ] No component holds hard-coded text: labels come from props or `messages/*.json` (XYB-006). Every component is shown in `/lab/components` in English and French; nothing breaks with the longer French labels ("Rejoindre le clan").
- [ ] Every interactive component shows rest, hover, focus-visible, active, disabled (and loading for Button).
- [ ] Every interactive element is reachable and usable by keyboard alone; focus ring visible on ground and on every field colour.
- [ ] Fields have visible labels, hints and errors linked by `aria-describedby`; errors are announced.
- [ ] External links show ↗ and set `rel="noopener noreferrer"`; internal links show →.
- [ ] Touch targets ≥ 44px at 390 width.
- [ ] No hard-coded colours, sizes or durations (tokens only).
- [ ] axe reports zero violations on `/lab/components`.
- [ ] No shadows, gradients, outlined 1px boxes or glass (design review).

## Out of scope
- Navigation and footer (XYB-030). Blob components (XYB-026). Advanced micro-interactions (XYB-027).

## References
- Trait from Linear and Vercel: tiny set of components, every state considered.
- Trait from the hero concept: the ink pill with an arrow is already the brand's button.
