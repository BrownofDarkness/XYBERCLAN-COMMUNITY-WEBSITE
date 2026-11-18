---
id: XYB-058
title: Join + Blob Maker /join (the live thing)
phase: 4-pages
type: dev
size: L
depends_on: [XYB-025, XYB-026, XYB-015]   # the application step (part 2) also needs XYB-071; build the maker first
skills: [react, nextjs, svg, forms, accessibility, gsap]
good_first_issue: false
---

# XYB-058 — Join + Blob Maker `/join`

## Why this exists (the strategy)
**Claim:** joining Xyberclan starts with being yourself. **Proof:** before you fill in a single field, you
make your own blob — and you watch it walk into the clan and fall into the beat with everyone else.

This is **the live thing** of the whole site (see `docs/creative-direction.md` §1). It turns the tagline
into an action: *different minds* (you choose your shape) → *one frequency* (it syncs with the crowd). It is
also the most important conversion page. Every **Join the clan** button leads here.

## What the visitor should feel and do
- **Feel:** delight first ("that's *my* blob"), then belonging ("it fits right in").
- **Do:** make a blob, send a short application, share their blob card, and join the Discord.

## Scope
1. **Blob Maker:** choose species, colour, face, and one accessory linked to a craft; live SVG preview idling
   on the clan beat; random button; the blob "joins the crowd" when done.
2. **Application:** a short form (name, email, crafts, why you want to join, how you found us, code of
   conduct consent), with the blob config attached.
3. **Confirmation:** shareable blob card (image), Discord invite, and what happens next.
4. **No-JS fallback** for the whole flow.
Build order: ship **part 1 (the Blob Maker)** first so the home teaser (XYB-040) can use it. Parts 2–3 follow once XYB-071 is merged; until then `/join` ends with the Discord invite.

5. Saves a blob config JSON usable by XYB-071 (form backend) and XYB-072 (add yourself by PR).

## Content
| Content | Source |
| --- | --- |
| Species list (names, shapes) | XYB-015 character bible |
| Colours | XYB-011 blob colour tokens (only those approved for blobs) |
| Faces / expressions | XYB-015 + XYB-016 face groups in the art kit |
| Accessories mapped to crafts (e.g. pencil = design, laptop = code, mic = content, wrench = hardware) | XYB-015, crafts list from XYB-001 |
| Page heading + lines | Draft — confirm in XYB-018: **"Make your blob."** / "Pick a shape, a colour, a face. Then come say hi." |
| Form labels, help and errors | Draft in this ticket, confirm in XYB-018 |
| What happens next | Real process from XYB-001 (e.g. "A moderator reads every application within 3 days"). Do not promise a time the clan can't keep. |

## Page structure (one flow, three moments)

### Moment 1 — Make your blob
- **Layout:** the live `<Blob>` preview (inline SVG) takes the big half of the screen (left on desktop, top on phone), standing
  on Ground with its contact shadow. Controls on the other half, in this order:
  1. **Shape** — species as a row of selectable small SVG silhouettes (radio group).
  2. **Colour** — swatches (radio group), each with a name ("Lagoon", "Deep"…).
  3. **Face** — 4–6 expressions (radio group).
  4. **What do you make?** — crafts as accessories (radio group, one choice; "Something else" allowed).
  5. **Shuffle** (randomise) and **This is me** (continue).
- `h1` "Make your blob." above the controls with its one line.
- A small crowd of existing member blobs stands at the back of the preview, smaller and set one tone step
  lighter towards the ground (a flat tone step, never a blur or backdrop-filter), so the visitor's blob reads first.
- Every combination works by construction: colour is one CSS variable (`--blob`), face and accessory swap one
  SVG group each. No pre-rendered images.

### Moment 2 — Tell us about you
- The finished blob moves to a small corner of the screen and stays there (it reacts: it nods when a field
  is valid, tilts its head on an error).
- The form, one column, 6 fields:
  - **Your name** (text, required)
  - **Email** (email, required — "We only use it to reply to you.")
  - **What you make** (checkboxes, prefilled from the accessory choice, at least one)
  - **Why Xyberclan?** (textarea, 20–600 characters, counter shown)
  - **How did you find us?** (select + "Other" text)
  - **Code of conduct** (checkbox, required, links to `/conduct` in a new tab)
- **Send my application** button. Turnstile check (from XYB-071) runs invisibly.

### Moment 3 — You're in the queue
- The blob walks into the crowd and falls into the beat with the others (the signature move, small).
- `h2` draft — confirm in XYB-018: "Your blob is in." + the real next step text.
- **Blob card:** an image of their blob + name + crafts + "Member-to-be of Xyberclan", with **Save image**
  and **Share** (Web Share API on phone, copy link elsewhere).
- **Join the Discord** (invite from XYB-070) as the primary action.
- Optional: **Add yourself on GitHub** link explaining the PR route (XYB-072), for members who prefer it.

## Design spec

**1440:** preview cols 1–7 at ~85vh; controls cols 8–12. Thumbnails 72px, swatches 44px, all 48px+ hit
areas. Form step: form cols 5–10, blob in the top-left corner at ~160px.

**768:** preview top 55vh, controls below in two columns (shape+colour / face+craft).

**390 (thumb-first):** preview top ~48vh and **stays visible** while controls scroll in a bottom panel
(each control group a horizontal scrolling row with snap). **This is me** fixed at the bottom of the
screen, full width, 56px. Form fields full width, labels above fields, 16px+ input font (no iOS zoom).

Controls: selected state = ink ring at 3px offset + check; never colour alone. Error text in ink with an
icon, tied to the field via `aria-describedby`. No placeholder-as-label.

## Motion spec
- **Every change:** the blob reacts — shape change morphs with a quick squash (scale 0.85 → 1.05 → 1,
  280ms); colour change sweeps across the clay in 200ms; face change blinks into the new face; accessory pops
  in from above.
- **Shuffle:** the blob spins once and lands with squash.
- **Idle:** bob and blink on the clan beat; eyes follow pointer (XYB-026).
- **This is me:** blob jumps, the screen transitions to the form while the blob shrinks into the corner
  (one GSAP timeline, ~700ms).
- **Sent:** blob hops out of the corner, walks into the crowd out of phase, then falls into phase.
- **Reduced motion:** the preview is the same SVG, standing still; changes swap
  instantly, no walking; the confirmation shows the blob already in the crowd.

## Build notes
- Route: `app/(site)/join/page.tsx` (server shell) + `BlobMaker` client component; the SVG
  preview uses the blob renderer (XYB-025) and behaviour kit (XYB-026). The default blob is in the server HTML.
- **Blob config schema** (add to XYB-005 if missing), versioned:
  ```json
  { "v": 1, "species": "pebble", "colour": "lagoon", "face": "grin", "accessory": "pencil" }
  ```
  Validated with zod on client and server. Stored in the URL (`/join?blob=pebble.lagoon.grin.pencil`) so a
  blob can be shared or resumed, and in `sessionStorage` (wrapped in try/catch).
- **Controls are native radio inputs** in `<fieldset>`s with `<legend>`s, styled. Arrow keys change choice,
  Tab moves between groups. Each radio has a text label ("Pebble — round and short").
- **No-JS fallback:** the page renders a plain `<form method="post" action="/api/join">` with the same
  radio groups (static SVG silhouettes) and fields; the server action / route handler from XYB-071 accepts it.
- Form submits to XYB-071 (server action or `/api/join`). Handle: pending state on the button, field-level
  errors from the server, network error with retry, duplicate email message.
- Blob card image: `/og/blob?c=pebble.lagoon.grin.pencil&name=…` from XYB-073 (escape and length-limit the name).
- Discord invite URL from env (XYB-070), never hard-coded.
- Analytics events (XYB-075): `blob_maker_started` (entry: join-page), `blob_maker_finished`, `application_submitted`, `discord_click`. No
  personal data in events.
- Components: `BlobMaker`, `BlobPreview`, `ChoiceGroup`, `JoinForm`, `JoinConfirmation`, `BlobCard`.

## Acceptance criteria
- [ ] Every combination of species × colour × face × accessory renders correctly as SVG (a visual test renders every combination in `/lab/blobs`).
- [ ] The whole Blob Maker works by keyboard alone (radio groups with arrow keys, visible focus) and by thumb at 390.
- [ ] The preview stays visible while choosing on phone; **This is me** is reachable without scrolling back up.
- [ ] Blob config is in the URL; opening the URL restores the same blob.
- [ ] With JavaScript off, a visitor can pick a blob (static SVG choices) and submit the application successfully.
- [ ] Form: labels above fields, errors tied with `aria-describedby`, error summary focused on submit failure, no data lost on error.
- [ ] Code of conduct consent is required and its link opens `/conduct` without losing form state.
- [ ] Confirmation shows the blob card, working **Save image** / **Share**, and the Discord invite.
- [ ] Time from landing on `/join` to first interactive preview < 2.5s on a throttled mid phone (Fast 4G, 4× CPU); controls usable from the first paint.
- [ ] Reduced motion: still SVG blobs, instant swaps, no walking.
- [ ] No personal data in analytics events or URLs (except the blob config and, on the card URL, the first name the person typed).
- [ ] Layout checked at 1440 / 768 / 390.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no glass, no gradients, no shadows on controls).

## Out of scope
- Storing and moderating applications (XYB-071).
- Accounts or login. Editing a blob after joining (members edit via XYB-072 or moderators).
- The home teaser of the Blob Maker (XYB-040), which reuses `BlobPreview` and `ChoiceGroup` from here.

## References
- Character creators in games (Animal Crossing, Mii): instant feedback on every choice, a character that reacts.
- Duolingo onboarding: personality before the form.
- Lu.ma / Partiful RSVP: short forms that feel like replying to a friend.
