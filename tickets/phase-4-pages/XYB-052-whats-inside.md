---
id: XYB-052
title: What's inside /inside
phase: 4-pages
type: dev
size: L
depends_on: [XYB-023, XYB-017]
skills: [react, nextjs, gsap, copywriting, content]
good_first_issue: false
---

# XYB-052 — What's inside `/inside`

## Why this exists (the strategy)
**Claim:** you can see exactly what you get before you join. **Proof:** this page opens the door. It shows
the real spaces where the clan talks, the real programs that run, and a real (anonymised, consented) slice
of what happens inside — a conversation, a sprint board, a session photo.

Most communities hide the inside behind a sign-up. Showing it is the most honest pitch we have, and it
filters in the people who will actually fit.

## What the visitor should feel and do
- **Feel:** "I can picture myself in there. I know which room I'd walk into first."
- **Do:** **Join the clan**, or **See the event** for the next program session.

## Scope
- The spaces: each real Discord channel group presented as a room.
- The programs: only the ones XYB-001 confirms actually run (for example build sprints, mentorship, talks,
  study groups). Each with rhythm (how often), who it is for, and the next date if any.
- Resources: the real shared resources (guides, templates, tool perks) if XYB-001 confirms them.
- A real slice of the inside: one anonymised conversation snippet and one real artifact (sprint board,
  notes, photo), both with consent.
- Closing join call.

## Content
| Content | Source |
| --- | --- |
| Spaces (name, what happens there, who hangs out there) | Clan moderators, from the real Discord structure. Stored in `content/inside/spaces.json` (add schema to XYB-005 if missing). |
| Programs (name, rhythm, who for, what you leave with, next date) | Organisers of each program. `content/inside/programs/*.mdx`. Next date pulled from `content/events/` by program tag. |
| Resources | Moderators. `content/inside/resources.json`. Only real, working links. |
| The conversation snippet | A real thread, picked by moderators, every participant asked for consent, names replaced by blob + first name or "a member". Consent recorded in `content/inside/consent.md` (who, date). |
| The artifact | A real screenshot or photo (sprint board, whiteboard, demo day) from XYB-017's shoot list, with alt text. |
| Page heading + line | Draft — confirm in XYB-018: **"Step inside."** / "No sign-up wall. Here's what the clan looks like on a normal week." |

If a program or resource is not confirmed by XYB-001, it does not appear. A thin but true page beats a full fake one.

## Page structure (top to bottom)

1. **The door.** `h1` "Step inside." at display size, left; one supporting line. Right: the Xyberclan blob
   duo from the hero standing at an open door (inline SVG from the art kit, XYB-016 / XYB-025), holding it open. Its job:
   set the promise — we are showing you everything.
2. **The rooms.** The spaces as a floor plan, not a card grid: a large map-like composition where each
   space is a named "room" area with its blob regulars inside (a few member blobs idling). Click/focus a room:
   a panel opens with what happens there and an example topic. On phone it becomes a vertical list of rooms,
   each opening in place. Its job: make the structure tangible.
3. **A normal week.** One horizontal timeline Monday → Sunday showing when programs actually happen (from
   real rhythms). Each program sits on its day as a block with its name. Selecting it expands the program:
   who it is for, what you leave with, next date, **See the event**. Its job: show rhythm and commitment, not a menu.
4. **Overheard inside.** Full-field Deep section. The real conversation snippet, set as a sequence of
   messages with blob avatars, at statement size (not a fake chat UI with chrome; just the words and the
   blobs). Beside it, the real artifact image, large. Caption says what it is and when. Its job: proof that
   real things happen.
5. **What you can take.** Resources as a plain, generous list: name, one line, what it gives you. Only if
   real resources exist. Its job: concrete value.
6. **The close.** "Pick your room." + **Join the clan**. The door from section 1 returns, now with a gap
   in the crowd sized for one more blob. Its job: convert.

## Design spec

**1440:** door section: text cols 1–6, image 7–12. Rooms: full-width composition at ~70vh, rooms laid out
as irregular areas separated by tone steps of Ground (no lines). Week timeline: 7 equal columns, programs
as filled blocks in the program's field colour. Overheard: snippet cols 1–7, artifact 8–12.

**768:** rooms keep the plan but scroll horizontally inside a contained area with visible next-room peek;
week timeline scrolls horizontally with snap.

**390:** rooms become an accordion list (each room a full-width tone band with its blobs). Week becomes
a vertical day list showing only days with programs. Overheard: snippet then artifact, stacked.

Running text in full ink. Program blocks use colours from XYB-011 only. Snippet set in the text face, not monospace.

## Motion spec
- **Door:** on load the door swings open (a transform on the door leaf, drawn as part of the SVG scene), blobs step aside.
- **Rooms:** as the section enters, rooms fade/rise in staggered; the blobs inside start idling on the beat.
  Opening a room: panel expands with height animation via GSAP (or `interpolate-size`), blobs in that room hop once.
- **Week:** programs slide onto their day as you scroll in (stagger 70ms).
- **Overheard:** messages appear one after another as if being posted (each message rises 16px, 120ms apart,
  triggered once). Not a typing simulation.
- **Close:** the crowd at the door shuffles on the beat, and the one empty spot stays open (no outline
  shape, just the gap between blobs).
- **Reduced motion:** door already open, rooms and messages visible at once, no hops.

## Build notes
- Route: `app/(site)/inside/page.tsx`, static. Programs as MDX via the content layer.
- Rooms: semantic structure is a list of `<button aria-expanded>` + region per room; the plan layout is CSS
  grid with named areas. Not an image map.
- Week timeline: a real `<ol>` of days; each program a link/button with its day and time in text.
- Snippet: `<figure>` with `<blockquote>` per message and a `<figcaption>` stating context and consent.
- Pull "next date" for each program from events tagged with the program slug; hide the line if none.
- Components: `InsideDoor`, `RoomPlan`, `RoomPanel`, `WeekTimeline`, `Overheard`, `ResourceList`.

## Acceptance criteria
- [ ] Every space, program and resource shown is listed as confirmed in XYB-001 / PRODUCT.md; nothing is invented.
- [ ] The conversation snippet has recorded consent for every participant in `content/inside/consent.md`.
- [ ] Program "next date" comes from event data and disappears when there is no upcoming event.
- [ ] Rooms open and close by mouse, touch and keyboard (Enter/Space), with `aria-expanded` correct.
- [ ] The week timeline reads as an ordered list of days to a screen reader.
- [ ] No fake chat UI chrome (no fake timestamps, no fake read receipts); just real words, blobs and a caption.
- [ ] Phone layout is its own composition (accordion rooms, vertical week), checked at 390.
- [ ] Layout checked at 1440 / 768 / 390; reduced motion shows the final states.
- [ ] Works with JavaScript off: all rooms and programs readable (expanded by default without JS).
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no icon-topped cards, no outlined boxes).

## Out of scope
- Live Discord messages on the page (privacy). Live counts are XYB-034/XYB-070.
- Program sign-ups (they go through events and Discord).

## References
- Notion and Linear "how we work" pages: showing the real workflow builds trust.
- Lu.ma calendars: rhythm visible at a glance.
- Floor plans in architecture portfolios: space as structure, not as cards.
