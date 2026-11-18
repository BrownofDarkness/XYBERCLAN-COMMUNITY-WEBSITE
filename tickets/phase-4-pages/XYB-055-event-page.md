---
id: XYB-055
title: Event page /events/[slug]
phase: 4-pages
type: dev
size: M
depends_on: [XYB-054]
skills: [react, nextjs, gsap, dates-timezones, maps]
good_first_issue: false
---

# XYB-055 — Event page `/events/[slug]`

## Why this exists (the strategy)
**Claim:** before the event, this page gives you everything you need to show up. After the event, it
becomes the memory of it. **Proof:** clear when/where/how, real speakers with real photos, an agenda you
can trust — and afterwards, the real photos and what was made.

One page, two lives. It must switch from "invitation" to "recap" on its own when the event ends.

## What the visitor should feel and do
- **Before:** "I know when, where, who, and I've saved my spot." → **Save my spot** / **Add to calendar**.
- **After:** "I missed something good. I'm going to the next one." → **See what's next**.

## Scope
- Ticket hero: title, date, time, place, type, RSVP and calendar actions.
- About: what happens and who it is for.
- Agenda (times in the event's timezone).
- Speakers / hosts with real photos (or their blob if they prefer — but real photo is the default for speakers).
- Venue: address, static map image linking to a maps app, directions note; or online link rules.
- After the event: recap text, photo gallery, slides/recordings/projects made.
- Previous / next event navigation.

## Content
| Content | Source |
| --- | --- |
| Event frontmatter (title, dates, timeZone, type, venue, rsvpUrl, onlineUrl, cover, hosts) | `content/events/<slug>.mdx` (XYB-005), by the organiser |
| About text (80–200 words) | Organiser. Draft tone guidance in XYB-018. |
| Agenda items (time, title, who) | Organiser |
| Speakers (name, role, photo, member handle if any) | Speakers themselves, with photo consent. Members link to their profile. |
| Venue (name, address, lat/lng, access notes) | Organiser |
| Recap (text, photos, links to slides/recordings/projects) | Organiser after the event, photos from XYB-017's process with consent |

Timezone: the event's own IANA zone is the truth. Default display zone `Africa/Douala` only if XYB-001
confirms it — otherwise this stays an open question. Online events also show the visitor's local time.

## Page structure (top to bottom)

**Before the event**
1. **The ticket.** The page opens as one big ticket: stub on the left with the date huge (day, month,
   weekday), body on the right with the `h1` title (two lines max), time range with zone, place (or
   "Online"), and two actions: **Save my spot** (RSVP url) and **Add to calendar** (.ics). The ticket's field
   colour follows the event type. Two host blobs stand on top of the ticket's edge. Its job: answer
   what/when/where in five seconds.
2. **What happens.** About text at a comfortable reading size on the left; on the right, the cover photo
   or a photo from a past edition of the same series. Its job: why come.
3. **The agenda.** A real `<ol>` of time slots, each with time large on the left and title + who on the
   right. Its job: trust and planning.
4. **Who's there.** Speakers and hosts as large portrait photos with name, role, and talk title; members
   link to their `/clan` profile. Its job: real people, real faces.
5. **Getting there.** Venue name and address, access notes (stairs, parking, nearest landmark), a static
   map image linking to Google/Apple/OSM maps. For online: how and when the link is shared. Its job: no one gets lost.
6. **Neighbours.** Previous and next events as small tickets.

**After the event** (automatic once `end` < now)
1. The ticket turns into a **stamped** ticket (a "Happened" stamp shape across the stub), actions replaced by
   **See what's next**.
2. **Recap** text replaces "What happens".
3. **Gallery:** the event's real photos in a full-bleed rhythm (one wide, two tall, repeat), with a
   lightbox.
4. **What came out of it:** slides, recordings, projects (link to `/built`), if any.
5. Agenda and speakers remain; "Getting there" is removed.

## Design spec

**1440:** ticket fills the first screen width, ~60vh tall, stub 4 columns. About text cols 1–6 (60ch),
photo 7–12. Agenda: time col 1–3, content 4–10. Speakers: portraits 3 per row, 4:5 crop. Gallery full bleed.

**768:** ticket ~50vh; speakers 2 per row.

**390:** ticket vertical: stub band on top with date, body below, actions full width and sticky at the
bottom of the screen until the agenda starts (one **Save my spot** bar, 56px). Speakers 1 per row.
Gallery one column with occasional full-width images.

Map image square-cornered, real map tiles rendered at build (static image API) with attribution.

## Motion spec
- **Ticket entrance:** ticket slides up and settles with a small tilt correction; host blobs drop onto
  its edge with squash and then idle on the beat.
- **After the event:** the stamp lands once with a quick scale 1.3 → 1 and slight rotation, on first view only.
- **Agenda:** items reveal in sequence as the list enters (XYB-023).
- **Speakers:** photos reveal with a clip-path wipe from bottom (transform-based mask).
- **Gallery:** lightbox opens with a FLIP from the thumbnail.
- **Reduced motion:** no drops or stamp animation (stamp shown static), lightbox opens instantly.

## Build notes
- Route: `app/(site)/events/[slug]/page.tsx`, `generateStaticParams`, **ISR `revalidate = 3600`** so the
  before/after switch happens without deploy.
- `.ics` route: `app/events/[slug]/ics/route.ts` (shared with XYB-054).
- Static map: generate at build with a static maps provider (decide in PR: OpenStreetMap-based provider
  preferred for licence clarity) and save to `public/maps/<slug>.png`; include attribution text.
- RSVP url can be Lu.ma, Google Form or Discord event; open in a new tab with a clear label.
- Online link is never published on the page if the organiser marks it private; show "Link shared in Discord before start".
- Lightbox: accessible dialog (focus trap, Esc closes, arrow keys navigate, alt text per photo).
- `generateMetadata` + OG image from XYB-073 (`/og/event/[slug]`), JSON-LD `Event` with `eventStatus`
  and `eventAttendanceMode` (XYB-074).
- Components: `EventTicketHero`, `Agenda`, `SpeakerGrid`, `VenueBlock`, `RecapGallery`, `Lightbox`, `EventStamp`.

## Acceptance criteria
- [ ] Before/after state switches automatically within an hour of the event's end (tested on a preview with a fixture event).
- [ ] Date, time and zone are correct; online events also show the visitor's local time.
- [ ] **Add to calendar** produces a valid .ics (Google, Apple, Outlook import tested).
- [ ] Private online links never appear in HTML or JSON-LD.
- [ ] Every speaker photo has consent recorded in the event file (`photoConsent: true`) and meaningful alt text.
- [ ] Map image has attribution and links to a maps app; address is also plain text.
- [ ] Lightbox is keyboard operable, traps focus, and returns focus to the thumbnail on close.
- [ ] Sticky **Save my spot** bar on phone never covers content at the end of the page and disappears after the event.
- [ ] Layout checked at 1440 / 768 / 390; `h1` two lines max for a 60-character title.
- [ ] Reduced motion: static stamp, no drops, instant lightbox.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Built-in RSVP storage or ticketing.
- Live streaming embeds (link out instead).

## References
- Lu.ma event pages: what/when/where above everything, hosts with faces.
- Conference sites with recaps (Config, Ship): the page keeps living after the event.
- Passport and ticket stamps: a clear "this happened" mark.
