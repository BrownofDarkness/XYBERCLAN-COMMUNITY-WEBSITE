---
id: XYB-035
title: "Members preview: the crowd"
phase: 3-home
type: dev
size: M
depends_on: [XYB-026, XYB-005]
skills: [react, css, gsap, accessibility]
good_first_issue: false
---

# XYB-035 — Members preview: the crowd

## Why this exists (the strategy)
**Claim:** the clan is made of real, specific people you would like to meet.

**Proof:** a crowd of member blobs, and behind each blob a real human: a name, a craft, a city. You can
meet them one by one, right here on the home page.

The signature scene (XYB-032) shows the crowd as a whole. This section zooms in: it turns "a crowd" into
"people". It's the bridge from the home page into the members directory.

## What the visitor should feel and do
- **Feel:** curiosity — "who's that one?" — and then recognition: "that person does what I do".
- **Do:** hover or tap a few blobs, then press **Meet the clan** to see everyone.

## Scope
- A section with a heading, a short line, a loose crowd of 18–30 member blobs, a details panel for the
  selected member, and the link to `/clan`.
- Selection by hover (desktop), tap (touch) and keyboard (arrow keys + Enter).

## Content
- Members: a **rotating selection** from `content/members/` (XYB-005): only members who agreed to be featured
  (`featured: true` in their file). Random on every visit, seeded per day so the page is stable within a day.
- For each: display name, handle, craft(s), city, one short line ("what I'm into"), their blob config, and
  their photo **only if they provided one** (XYB-017 consent).
- Heading (draft — confirm in XYB-018): "Meet a few of us".
- Line: "Every blob is a real member. Pick one."
- If fewer than 8 featured members exist, the section shows all of them and the copy changes to
  "The first members of the clan" — it never fills the space with fake members.

## Design spec

**Desktop (1440)**
- Paper field. Heading `h2` at display step 2, left, columns 1–6; line at text-large below it.
- The crowd: columns 1–8, a **loose cluster** (not a grid) of blobs at 3 sizes (depth), arranged by a seeded
  scatter that never overlaps faces. They stand on an implied floor line.
- The details panel: columns 9–12, the **selected member**:
  - Their blob large (about 220px) at the top, in their colour.
  - Name at display step 4 (≈ 44px), craft and city on one line at text size, their line in text-large.
  - If they have a photo: a small square photo (96px) beside the name.
  - Link: "See {first name}'s profile →" to `/clan/{handle}`.
- Under the crowd: **Meet the clan →** (secondary pill or text link, decided in XYB-014).
- Default selected member: the first one in the day's selection (the panel is never empty).

**Tablet (768):** crowd full width (3 rows), details panel below it.
**Phone (390):** crowd becomes a horizontal **swipeable row** of blobs (scroll-snap), the panel sits under
the row and updates as a blob snaps to the centre.

## Motion spec
- **Entrance** (XYB-023): heading, line, then blobs pop up from the floor in a random order, 25ms stagger,
  each landing with a tiny squash.
- **Idle:** all blobs bob on the clan beat, **in sync** (they're past the signature scene: the clan is in phase now).
- **Hover / focus a blob:** it hops (stretch up, squash down), its neighbours turn their heads toward it, and
  the details panel crossfades to that member (name and line rise 12px, 200ms). Panel updates are debounced
  80ms so fast mouse movement doesn't flicker.
- **Select (click/Enter):** the panel's profile link gets focus-visible styling; a second click opens the profile.
- **Pointer:** all eyes follow the pointer while it's over the section.
- **Reduced motion:** no hops or bobbing; the panel swaps instantly.

## Build notes
- Files: `components/home/MembersPreview.tsx`, `components/home/Crowd.tsx`, `components/home/MemberPanel.tsx`.
- Rendering: each blob is a `<use>` from the blob sprite (XYB-025) with its own `--blob` colour, positioned with
  CSS. Cheap for 30 interactive blobs, and each one is a real button for hit-testing and focus.
- Accessibility: the crowd is a `role="listbox"` (or a list of buttons) labelled "Members". Each blob is an
  option/button with the accessible name "{name}, {craft}, {city}". Arrow keys move, Enter selects. The panel
  is an `aria-live="polite"` region.
- Day seed: `hash(YYYY-MM-DD)` → shuffle, computed on the server so there's no hydration mismatch.
- Shared selection logic with the directory (XYB-050): put it in `lib/members/select.ts`.

## Acceptance criteria
- [ ] Only members with `featured: true` appear; a test proves it.
- [ ] The details panel is never empty; it shows the first member on load.
- [ ] Hover, tap and keyboard all select a member and update the panel.
- [ ] Each blob has an accessible name with name, craft and city; arrow keys move between blobs.
- [ ] Blobs never cover each other's faces at 1440, 768 and 390.
- [ ] Phone: swipe row with scroll-snap; the panel follows the centred blob.
- [ ] Profile links go to `/clan/{handle}` and exist for every shown member.
- [ ] With fewer than 8 featured members, the alternate copy shows and no fake members appear.
- [ ] Idle bobbing is in sync with the clan beat used elsewhere on the page.
- [ ] Reduced motion: no hops or bobbing; instant panel swaps.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Search and filters (XYB-050). Member profile pages (XYB-051).

## References
- Read.cv: profiles that show the person's craft first.
- Video game character select screens: hover a character, see who they are.
