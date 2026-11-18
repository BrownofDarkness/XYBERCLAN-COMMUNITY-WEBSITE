---
id: XYB-025
title: Blob renderer (SVG)
phase: 2-motion-engine
type: dev
size: L
depends_on: [XYB-002, XYB-016]   # can start as soon as the hero duo SVG exists; the full kit lands later
skills: [react, svg, typescript, performance]
good_first_issue: false
---

# XYB-025 — Blob renderer (SVG)

## Why this exists (the strategy)
**Claim:** blobs appear everywhere on the site, instantly, on any device, as many as the clan has members.
**Proof:** one component, `<Blob>`, that draws any blob from the art kit (XYB-016) as inline SVG, on the
server. It is in the first HTML, so the hero shows its blobs before any JavaScript runs. For crowds it
switches to a sprite so hundreds of blobs stay smooth.

Every blob on the site goes through this component: the hero, the crowd, the members wall, profiles, the
Blob Maker, the footer, the 404. One renderer means one look, one place to fix bugs, one place to make it fast.

## What the visitor should feel and do
- Feel: the blobs are simply *there*, sharp and alive, never loading in.
- Do: nothing. This is the engine. Visitors only notice if it is missing or slow.

## Scope
- `<Blob>`: draws one blob as inline SVG from a `BlobConfig` (species, colour, face, accessory).
- `<BlobSprite>` + `<BlobUse>`: the crowd mode, for 30+ blobs on one screen.
- The build step that turns the art kit SVGs into typed React parts and one sprite.
- An offscreen pause helper so blobs that are not visible do not animate.
- `/lab/blobs`: every species × face × colour, and a 500-blob crowd for performance testing.

## Content
- Art: `components/blob/art/` from XYB-016.
- Config type: `BlobConfig` from XYB-005 (`lib/content/blob.ts`). Do not define a second one.

## Design spec
- Sizes: `size` prop in px or a token (`xs` 32, `s` 64, `m` 160, `l` 320, `xl` 560). The blob scales from
  its floor line, so blobs of different sizes stand on the same floor.
- Colour: `colour` sets `--blob` on the root `<svg>`. Shade and highlight follow automatically (XYB-016 mixes).
- Reduced motion and no-JS: the same SVG, still. No poster images exist or are needed.

## Motion spec
This ticket draws; XYB-026 animates. But the renderer must **expose the parts** XYB-026 moves:
- Inline mode: refs to `root`, `body`, `face`, `eye-l`, `eye-r`, `mouth`, `arm-l`, `arm-r`, with
  `transform-box: fill-box` and the correct `transform-origin` from the pivots in the art.
- Crowd mode: every animated part reads CSS custom properties (`--bob`, `--breathe`, `--look-x`, `--look-y`,
  `--blink`, `--arm`), so one script can move hundreds of blobs by writing variables on each `<svg>`.

## Build notes
- **Build step** `scripts/build-blobs.ts` (runs before `next build` and in dev on change):
  - reads `components/blob/art/**`, validates layer names (shares the check with `pnpm blobs:check`),
  - generates `components/blob/generated/parts.tsx` (one small React component per species, face and
    accessory, ids prefixed per instance with `useId()` to avoid duplicate ids on a page),
  - generates `public/blobs/sprite.svg` with one `<symbol>` per species × face for crowd mode.
- **`<Blob>` (inline mode)** — a **server component by default** (no JS shipped for still blobs). Props:
  `config`, `size`, `label?` (if set: `role="img"` + `aria-label`; if not: `aria-hidden="true"`),
  `pose?` (`rest` | `wave`), `className`. A client wrapper `<LiveBlob>` adds behaviours from XYB-026.
- **`<BlobSprite>` + `<BlobUse>` (crowd mode)** — the sprite is loaded once per page; each member is an
  `<svg><use href="/blobs/sprite.svg#round-happy"/></svg>` with `--blob` and the motion variables on it.
  CSS custom properties inherit into `<use>`, so colour and motion work without cloning the SVG.
  Each `<BlobUse>` can be wrapped in a real `<a>` (members wall, crowd) with its own accessible name.
- **Offscreen pause:** `useInView` (one shared IntersectionObserver for the page) sets `data-active` on
  each blob or group; XYB-026 only animates active ones. Also pause everything on `visibilitychange`.
- **Performance limits:** at most 60 animated blobs on desktop and 30 on a phone at the same time. The rest
  are drawn still. Use `content-visibility: auto` on long walls.
- **`blobToSvgString(config, { size })`** in `lib/blob/toSvg.ts`: a standalone SVG string with **concrete fill
  colours** (no CSS variables, no `color-mix`, resolved on the server), for places that cannot read CSS:
  share images in next/og (XYB-073, as an SVG data URI) and email.
- **Export to PNG** for Discord avatars and downloads: `lib/blob/toPng.ts` renders `blobToSvgString()` with
  `@resvg/resvg-js` on the server (used by XYB-073 and the join confirmation in XYB-058).
- Folder: `components/blob/` (components) and `lib/blob/` (helpers, types re-exported from XYB-005).

## Acceptance criteria
- [ ] `<Blob>` renders every species × face × accessory × blob colour correctly (grid in `/lab/blobs`).
- [ ] With JavaScript disabled, every blob on `/lab/blobs` and on the home page is visible and correct.
- [ ] A still `<Blob>` ships zero client JavaScript (checked in the build output).
- [ ] Two blobs of the same species on one page have no duplicate SVG `id`s (no broken references).
- [ ] Decorative blobs are `aria-hidden="true"`; labelled blobs have `role="img"` and their label.
- [ ] Crowd mode: 500 blobs on `/lab/blobs` scroll at ≥ 50 fps with 4× CPU throttling; ≤ 60 animate at once.
- [ ] Blobs that leave the screen or a hidden tab stop animating (Performance panel shows no work).
- [ ] Changing `colour` changes body, shade and highlight together, with no gradient anywhere.
- [ ] `blobToSvgString()` output has no CSS variables or `color-mix` and renders identically in a plain image viewer.
- [ ] `toPng()` produces a 600 × 600 transparent PNG that matches the SVG.
- [ ] Small sizes work: `<Blob size={16} />` stays recognisable (used by XYB-027 and the avatar fallback in XYB-014).
- [ ] `pnpm blobs:check` runs in CI (XYB-003).
- [ ] Bilingual: blob labels come from `messages/*.json` (XYB-006).
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- The art (XYB-016). All animation and behaviours (XYB-026). The Blob Maker controls (XYB-058).
- WebGL, canvas or any 3D library.

## References
- MDN: `<use>`, `<symbol>`, CSS custom properties in SVG.
- Trait: icon systems that ship one sprite and colour every instance with CSS.
