---
id: XYB-015
title: "The Blob species: character bible"
phase: 1-brand-system
type: design
size: L
depends_on: [XYB-011]
skills: [character-design, illustration, figma, brand]
good_first_issue: false
---

# XYB-015 — The Blob species: character bible

## Why this exists (the strategy)
**Claim:** *different minds* — every member is different, and that is the point.
**Proof:** a family of blob characters with different shapes ("species"), colours, faces and small
accessories. Every member picks one combination in the Blob Maker (XYB-058) and it becomes their
avatar across the site. The blobs are the only decoration this site has, so they must be designed with
the same care as the logo.

The hero concept shows two members of this family: a tall Lagoon blob with arms and legs, waving, and
a small round Deep blob leaning on it. This ticket turns those two into a full, consistent cast.

## What the visitor should feel and do
Feel: warmth, a smile, "I want one". Do: recognise themselves in a species and make their own blob.

## Scope
- At least **8 species**, each with a name, silhouette, proportions and personality note.
- An expression set shared by all species.
- A colour rule (which blob colours from XYB-011 each species can use: all, by default).
- Small accessories that hint at crafts, without stereotypes (optional, max 1 per blob).
- Pose set for the site: idle, wave, lean, jump, sit, look-at, sleep, celebrate.
- Do / don't sheet.
- Hand-off package for XYB-016 (2D art kit): one Figma artboard per species, front view, with named layers (`body`, `shade`, `highlight`, `face`, `arm-l`, `arm-r`, `feet`, `accessory` anchor, `contact-shadow`).

## Content
**Proposed species** (names and shapes are proposals, the design team owns the final cast):

| Species | Silhouette | Note |
| --- | --- | --- |
| Drop | Tall bean, short legs, two arms (the hero's big blob) | The host. Waves first. |
| Pebble | Small round egg, no limbs (the hero's small blob) | Shy, leans on others. |
| Puff | Wide cloud with three bumps on top | Calm, sits a lot. |
| Bean | Curved kidney shape, lying on its side | Relaxed, a thinker. |
| Stack | Two soft spheres stacked | Builder energy. |
| Noodle | Long thin body with a bend | Curious, stretches to look. |
| Dome | Half-sphere, flat bottom, tiny feet | Steady, grounded. |
| Twin | Two small blobs joined at the side | Always together (collaboration). |

Personality notes are flavour for animation, **not** assigned to crafts or genders. Any member can be any species.

**Expressions** (eyes + mouth only, the faces stay minimal like the concept: two vertical oval eyes, a small curve smile):
neutral, smile, big smile (eyes closed as arcs), surprised, sleepy, wink, focused, shy (eyes look down).

**Accessories (optional, one per blob):** headphones, beanie, round glasses, tiny laptop, paint brush, plant sprout on top, scarf. All in ink or a second blob colour. No logos, no flags, no text.

## Design spec
- **Material:** soft clay, matte with a gentle sheen, no visible texture noise at web sizes. Same as the concept render.
- **Proportions:** all species fit in a 1 : 1.4 box (width : height) for the "standing" pose, so they line up in crowds.
- **Eyes:** dark (ink, slightly lighter than `--ink`), vertical ovals, set in the top third. Eye spacing ≈ 35% of body width.
- **Contact shadow:** soft ellipse under each blob, part of the render only (the house rule allows it because it is physical, not UI).
- **Colour:** any blob colour from XYB-011. Accessory in ink or one other blob colour. Max 2 colours per blob.
- **Silhouette test:** every species must be recognisable as a solid ink silhouette at 48px.
- **Crowd test:** 30 blobs of mixed species and colours side by side must look like one family, not a toy box (lightness and chroma stay in one family).
- Deliverables in Figma: `Blob Bible` page with species sheets, expression sheet, pose sheet, accessory sheet, silhouette test, crowd test, do/don't.

## Motion spec
Write a short **personality-in-motion** note per species for XYB-026 (for example: Pebble moves slowly and tilts; Noodle stretches before it moves; Drop waves with its whole body). Squash and stretch amounts per species (soft species squash more). All idle motion follows the clan beat.

## Build notes
- Store the bible in Figma and export a PDF + PNG sheets to `docs/brand/blobs/`.
- Define the enums the code will use (copy into `lib/blob/types.ts` in XYB-026 and the content schema in XYB-005):
  - `species`: `drop | pebble | puff | bean | stack | noodle | dome | twin`
  - `colour`: the blob colour token names from XYB-011
  - `face`: `neutral | smile | big-smile | surprised | sleepy | wink | focused | shy`
  - `accessory`: `none | headphones | beanie | glasses | laptop | brush | sprout | scarf`
- Naming in files: kebab-case, species first: `drop-lagoon-wave.png`.

## Acceptance criteria
- [ ] At least 8 species with turnaround sheets (front, 3/4, side, back).
- [ ] 8 expressions shown on at least 3 species.
- [ ] 8 poses shown on Drop and Pebble at minimum.
- [ ] Silhouette test and crowd test pages exist and pass design review.
- [ ] No species, accessory or colour is tied to a gender, nationality or stereotype (reviewed by 2 members).
- [ ] Do/don't sheet exists (no outlines, no gradients, no realistic features, no text on blobs).
- [ ] Enums are written in `docs/brand/blobs/README.md` and match the content schema in XYB-005.
- [ ] Founders and at least 5 members have voted on the final cast (link to the poll in the PR).

## Out of scope
- Final SVG artwork and export (XYB-016). Code (XYB-026). The Blob Maker UI (XYB-058).

## References
- Trait from Discord's Wumpus and Duolingo's cast: simple shapes, big personality, consistent family.
- Trait from clay-style characters on Dribbble/Awwwards, kept in 2D: soft chunky silhouettes, three flat tones, tiny faces that carry emotion.
