---
id: XYB-016
title: "2D blob art kit: Figma to SVG"
phase: 1-brand-system
type: design
size: L
depends_on: [XYB-015, XYB-011]
skills: [illustration, figma, svg]
good_first_issue: false
---

# XYB-016 — 2D blob art kit: Figma to SVG

## Why this exists (the strategy)
**Claim:** every member can have a blob that is unmistakably Xyberclan, and the site can draw thousands of
them, fast, in any colour, on any page.
**Proof:** one small kit of flat 2D parts (bodies, faces, arms, accessories) that combine into every blob.
The browser draws them as SVG: sharp at every size, a few kilobytes each, recoloured with one CSS variable,
visible in the very first HTML with no JavaScript.

The hero concept shows clay 3D blobs. We keep **everything people love about them** (the soft chunky
shapes, the tiny faces, the arm around a friend) and draw them flat. 2D is lighter, works on every phone,
and lets the Blob Maker (XYB-058) build any combination instantly.

## What the visitor should feel and do
- Feel: "they look soft enough to squeeze", the same warmth as the concept, in 2D.
- Do: recognise a Xyberclan blob anywhere: on the site, in a share image, as a Discord avatar.

## Scope
- Redraw the hero duo from `docs/assets/hero-concept.png` in 2D (first delivery, unblocks the hero).
- Draw all species from the character bible (XYB-015), at least 8.
- The face set (at least 8 expressions), the arm poses, and the accessories (one per craft, from XYB-015).
- Export a clean, named, optimised SVG for every part, following the rules below.
- A one-page style sheet in Figma showing how the parts combine, and do/don't examples.

## Content
| Delivery | Due (see `docs/team-plan.md`) |
| --- | --- |
| Hero duo (big Lagoon blob waving, arm around the small Deep blob) | **End of Sprint 1** |
| All species + faces + arms | End of Sprint 2 |
| Accessories (one per craft) | Sprint 3 |
| "Lost blob" pose for 404 (XYB-060), "door" pose for `/inside` (XYB-052) | Sprint 4 |

## Design spec

**The 2D clay look (the rules of the drawing)**
- **Three flat tones per blob:** `body` (the blob colour), `shade` (one darker flat shape, bottom-right side,
  as if lit from top-left), `highlight` (one small lighter flat shape, top-left). **No gradients, no blur,
  no textures.** The softness comes from the shapes, not from effects.
- **Silhouettes:** soft, rounded, a bit bottom-heavy, like the concept. No sharp corners anywhere. Each
  species must be recognisable as a filled black silhouette at 32 px.
- **Faces:** tiny and low on the body, as in the concept: two short vertical eyes and a small smile.
  Ink colour `#232823`. Emotion lives in the eyes and the mouth only.
- **Contact shadow:** one flat ellipse under the feet, ink at 10% opacity. It is part of the character, so
  it is allowed (creative direction §4).
- **No outlines.** Shapes meet shape, like the concept.

**Artboard and layers (the developers depend on these names)**
- Every species on its own **400 × 400** artboard. The floor line is at **y = 360**; feet touch it. The
  blob is centred on x = 200.
- Layer names, exactly (they become SVG `id`/`class` names):

  ```
  blob-<species>
  ├── contact-shadow
  ├── arm-r          (behind the body; pivot point marked with a 1×1 frame named pivot-arm-r)
  ├── body
  ├── shade
  ├── highlight
  ├── feet           (optional, species with legs)
  ├── face           (an empty group; faces are swapped in by code)
  │   └── anchor-face   (1×1 frame: where the face's centre sits)
  ├── arm-l          (in front of the body; pivot-arm-l)
  └── anchor-accessory (1×1 frame: where an accessory attaches)
  ```

- **Faces** on their own artboards (`face-happy`, `face-calm`, `face-blink`, `face-wow`, `face-shy`,
  `face-proud`, `face-sleepy`, `face-lost`), centred on (0,0), so code places them on `anchor-face`.
- **Accessories** on their own artboards (`acc-<craft>`), centred on (0,0), placed on `anchor-accessory`.
- **Arms**: a rest pose and a wave pose per species, each a single shape that rotates around its pivot.

**Colour rules**
- Fill `body` with the placeholder `#22C4D2` (Lagoon). On export it is replaced by `var(--blob)` so any blob
  colour from XYB-011 works.
- `shade` and `highlight` are exported as `color-mix(in oklch, var(--blob), #232823 22%)` and
  `color-mix(in oklch, var(--blob), white 35%)`. The designer checks every blob colour from XYB-011 with
  these two mixes in the style sheet and tunes the percentages once for all.

## Motion spec
No animation in this ticket, but **draw for motion** (XYB-026 animates these parts):
- Arms rotate around their pivots from -20° to +40°: check they never detach from the body at those angles.
- Eyes close by scaling to 10% height: draw them as separate shapes, not one path.
- The body breathes by scaling to 103% height from the floor line: nothing may poke out at that size.

## Build notes
- **Export:** Figma → SVG with "Include id attribute" on, outline text, no "Include bounding box".
- **Optimise** with SVGO using the shared config `svgo.config.mjs` (written in this ticket): keep `id`s,
  keep `viewBox`, remove metadata, round to 1 decimal, merge paths **only inside** each named layer.
- Files go in `components/blob/art/`:
  `species/<species>.svg`, `faces/<face>.svg`, `accessories/<craft>.svg`, `duo/hero-duo.svg`.
- A script `pnpm blobs:check` (with Lane E) fails if a species file is missing a required layer name, has
  a gradient, a filter, an embedded image, or is over budget.
- **Budget:** each species ≤ **6 KB gzipped**, each face ≤ 1 KB, each accessory ≤ 2 KB.
- Keep the Figma file in the shared team space and link it in `docs/brand/blobs.md` with the export steps.

## Acceptance criteria
- [ ] The hero duo SVG exists and matches the concept's pose and feeling (approved by the concept's designer).
- [ ] At least 8 species, 8 faces, both arm poses per species, and one accessory per craft exist as SVGs.
- [ ] Every species file has exactly the layer names above (`pnpm blobs:check` passes).
- [ ] No gradients, filters, blurs, outlines or embedded images in any file.
- [ ] Every species works in every blob colour from XYB-011 (style sheet shows the full grid).
- [ ] Every species is recognisable as a black silhouette at 32 px (shown in the PR).
- [ ] Arms at -20° and +40° stay attached; body at 103% height stays inside the artboard.
- [ ] All files are within budget (SVGO output sizes listed in the PR).
- [ ] `docs/brand/blobs.md` explains the layers, colours, export and how to add a new species.

## Out of scope
- The React component that draws blobs (XYB-025) and their animation (XYB-026).
- The character design itself, names and personalities (XYB-015).
- Any 3D.

## References
- The hero concept (`docs/assets/hero-concept.png`): the proportions and friendliness to keep.
- Trait: Headspace and Duolingo characters, flat shapes that still feel soft and alive.
