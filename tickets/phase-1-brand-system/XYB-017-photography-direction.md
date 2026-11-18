---
id: XYB-017
title: Photography and imagery direction
phase: 1-brand-system
type: content
size: M
depends_on: [XYB-001]
skills: [photography, art-direction, image-editing, consent]
good_first_issue: false
---

# XYB-017 — Photography and imagery direction

## Why this exists (the strategy)
**Claim:** Xyberclan is real people doing real things together.
**Proof:** real photographs of real clan moments — not stock, not AI-generated people. The blobs carry
the brand; the photos carry the truth. One without the other feels either cold or fake.

Every section that says "we make things happen" needs a picture that proves it. This ticket makes sure
those pictures exist, look like one family, and are used with consent.

## What the visitor should feel and do
Feel: "these are real people, and they look like they have fun." Do: imagine themselves in the picture.

## Scope
- A photo style guide (light, framing, grade, crops).
- A shoot list for the next clan events and meetups.
- A consent form and a consent register.
- An editing preset (Lightroom / Darktable) so any member photographer can match the grade.
- Image delivery rules for the website (sizes, formats, alt text, credits).
- Sort and grade the existing photos listed in `PRODUCT.md` (XYB-001).

## Content
**Shoot list** (for each event or meetup; one photographer member per event):
1. Wide shot of the room with everybody in it (proof of size and energy).
2. Hands on keyboards, sketches, whiteboards — work happening (close, no faces needed).
3. Two or three people laughing or explaining something to each other (chemistry).
4. A speaker mid-sentence, from the side, with the audience in frame.
5. The place: the venue's door, street sign, view from the window (where the clan meets).
6. Small details: stickers on laptops, coffee cups, name tags, the clan's printed things.
7. A group photo at the end (everyone who agrees).
8. 10–20 seconds of video of the room (for muted loops), steady, horizontal.
9. Portraits of members who want a profile photo (plain wall, window light, chest up).

**Consent:** written consent (paper or form) from every recognisable person before a photo is published.
Children: no photos without guardian consent. Anyone can ask to be removed at any time, and we remove within 7 days.

## Design spec
- **Light:** natural or warm practical light. No flash straight on. No heavy filters.
- **Grade:** slightly lifted blacks matching `--ink` (never pure black), neutral-warm whites matching `--ground`, gentle saturation; cyan/blue in the scene can be pulled toward Lagoon/Deep slightly. One preset, applied to all.
- **Crops (the only ratios used on the site):** 3:2 (landscape), 4:5 (portrait), 1:1 (avatars, grid), 16:9 (video). Square corners always.
- **Framing:** leave space where text or a blob may sit next to the photo, but **never** put text on top of a face.
- **Never:** stock photos, AI-generated people, logos of other companies as decoration, photos without consent.
- **Captions:** say what is in the picture and when ("Build night, March 2026"). Credit the photographer in the caption or footer credits.

## Motion spec
For later tickets: a photo may get a slow scale (1.0 → 1.06 over the scroll of its section) or a scroll-linked move. Video loops are muted, 10–20s, with a poster frame. Reduced motion: still image.

## Build notes
- Originals go to the clan's shared drive (not Git). Web exports go to `public/content/photos/<event-slug>/`.
- Export sizes: 640, 1024, 1600, 2400px long edge; Next.js `<Image>` handles format (AVIF/WebP). Keep originals ≤ 2400px in the repo.
- Video: H.264 MP4 + WebM, 1280px wide, ≤ 2 MB for a 15s loop, plus a JPEG/AVIF poster.
- Consent register: `docs/consent-register.md` (no personal contact details in Git — names + date + photo ids only; full forms stay with the founders).
- Alt text guide in `docs/brand/photography.md`: describe what matters ("Twelve members around a table building a robot at the March build night"), not "image of people".
- Presets: `docs/brand/presets/xyberclan.xmp` (Lightroom) and `.dtstyle` (Darktable).

## Acceptance criteria
- [ ] `docs/brand/photography.md` contains the style guide, crops, shoot list, alt text guide and do/don't.
- [ ] A consent form template exists (PDF or online form link) and the consent register is set up.
- [ ] Editing presets exist for Lightroom and Darktable.
- [ ] At least 20 existing photos are graded with the preset and exported (or the PR states clearly how many exist).
- [ ] At least one muted video loop with poster is exported to spec (or a shoot is scheduled, with date and photographer named).
- [ ] Every exported photo has consent recorded.
- [ ] No stock or generated people anywhere in the repo.

## Out of scope
- Placing photos on pages (each section ticket). Blob renders (XYB-016).

## References
- Trait from Are.na and Recurse Center: honest, unpolished-but-composed photos of people in the room.
- Trait from strong event sites (Config, Supabase Launch Week recaps): wide room shots + close hands-at-work details.
