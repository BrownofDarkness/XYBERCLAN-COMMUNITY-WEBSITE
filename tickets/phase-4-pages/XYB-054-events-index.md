---
id: XYB-054
title: Events index /events
phase: 4-pages
type: dev
size: M
depends_on: [XYB-005, XYB-037]
skills: [react, nextjs, gsap, dates-timezones]
good_first_issue: false
---

# XYB-054 — Events index `/events`

## Why this exists (the strategy)
**Claim:** the clan meets, often, in real life and online. **Proof:** a clear calendar of what's coming,
and an honest archive of what already happened — with photos.

Events are where online members become friends. This page must make the next event feel like an
invitation you got personally, and the past events feel like proof that showing up is worth it.

## What the visitor should feel and do
- **Feel:** "Something is happening soon, and I'm invited."
- **Do:** open the next event and **Save my spot**, or add it to their calendar.

## Scope
- Upcoming events as invitation tickets (the same ticket artifact as the home section XYB-037, larger).
- A month calendar view for people who plan.
- Past events archive with a cover photo each, grouped by year.
- Filters: type (meetup, talk, build sprint, online, workshop — final list from XYB-001), city/online.
- Add to calendar (.ics) directly from the list.
- Correct dates and times in the right timezone.

## Content
| Content | Source |
| --- | --- |
| Events (title, slug, type, start/end with timezone, venue or online link, city, cover, summary, RSVP url, status) | `content/events/*.mdx` (XYB-005), written by event organisers |
| Past event cover photos | XYB-017 photo library, chosen by the organiser |
| Page heading + line | Draft — confirm in XYB-018: **"Show up."** / "Meetups, talks and build nights. Come as you are." |
| Empty upcoming state | Draft — confirm in XYB-018: "Nothing on the calendar yet. The next one is being planned in Discord." + Discord link |

**Timezone (open question):** default display timezone is `Africa/Douala` **only if XYB-001 confirms the
clan is based there**. Until then this is a question on the ticket; do not hard-code a city. Every event
stores its own IANA timezone; online events also show the time in the visitor's local zone.

## Page structure (top to bottom)

1. **Heading band.** `h1` "Show up." left, and the very next event's date set large on the right
   ("Sat 14 Dec") as a link to it. Its job: say what this page is and surface the next date immediately.
2. **Coming up.** Upcoming events as tickets, each a wide horizontal ticket stub: left the stub with date
   (day number huge, month, weekday), right the title, type, place, time, and actions **See the event** and
   **Add to calendar**. The ticket's field colour comes from the event type. The perforation between stub and
   body is a cut-out shape (filled notches, not a dashed line). Its job: invitations, not rows.
3. **The calendar.** A month view toggle (List / Month). Month view is a real table with days; event days
   carry the event's colour and title. Navigate months with buttons. Its job: help planners.
4. **Already happened.** Past events grouped by year, each as a cover photo with the title and date
   overlaid on a neutral scrim, laid out as a staggered masonry of real photos (sizes vary by how many photos
   the recap has). Its job: proof that the clan really meets.

## Design spec

**1440:** heading band: `h1` cols 1–7, next date cols 8–12. Tickets: full content width, ~220px tall, stub
3 columns, body 9. Past events: 3 columns, staggered heights.

**768:** tickets keep the stub layout at ~180px. Past events 2 columns.

**390:** tickets turn vertical: stub on top as a band (date + month in one line, large), body under it,
actions full width. Month view replaced by a compact agenda list (month view is optional on phone).
Past events single column.

Ticket colours by type from XYB-011 tokens. Square photo corners; the ticket's corners follow the stub
notch shape only. Text on photos uses the neutral scrim (the one allowed exception) and must pass AA.

## Motion spec
- **Tickets entrance:** each ticket slides in from the right 40px with a slight rotate (−1.5° → 0°), as if
  dealt on a table, staggered 90ms (XYB-023).
- **Ticket hover/focus:** the stub "tears" a few pixels away from the body (translate 6px), date nudges up.
  Press: 0.98 scale.
- **Past events:** photos rise in with a slow scale 1.05 → 1 (XYB-023).
- **Filter change:** FLIP reorder (GSAP Flip, 400ms).
- **Reduced motion:** no dealing, no tear, instant filter changes.

## Build notes
- Route: `app/(site)/events/page.tsx`. Static with **ISR (`revalidate = 3600`)** so events move from
  "Coming up" to "Already happened" without a deploy. The split uses the event's end time vs. now on the server.
- Dates: use `Intl.DateTimeFormat` with the event's `timeZone`; never `new Date(string)` without a zone.
  Store start/end as ISO with offset plus IANA zone.
- `.ics`: route handler `app/events/[slug]/ics/route.ts` (shared with XYB-055) returning `text/calendar`
  with `DTSTART;TZID=`, `UID`, `URL`, `LOCATION`. Button is a plain link with `download`.
- Filters in the URL (`?type=meetup&city=online`).
- JSON-LD `Event` per upcoming event (coordinate with XYB-074).
- Components: `EventTicket` (shared with XYB-037), `EventsCalendar`, `PastEventsGrid`, `EventFilters`.

## Acceptance criteria
- [ ] An event moves from "Coming up" to "Already happened" within an hour of its end without a redeploy (ISR verified on a preview).
- [ ] Times are correct for an event in another timezone (unit tests for at least Africa/Douala, Europe/Paris and an online event).
- [ ] Online events show the visitor's local time next to the event's own time.
- [ ] **Add to calendar** downloads a valid .ics that imports correctly into Google Calendar and Apple Calendar.
- [ ] The empty upcoming state shows the drafted line and a working Discord link.
- [ ] Month view is a real table navigable by keyboard; month buttons have accessible names ("Next month: January 2027").
- [ ] Text over past-event photos passes WCAG AA contrast with the scrim.
- [ ] Phone layout uses vertical tickets and is thumb-friendly (48px targets) at 390.
- [ ] Layout checked at 1440 / 768 / 390; reduced motion removes dealing and tear.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (perforation is a filled notch, not a dashed line).

## Out of scope
- The event detail page (XYB-055).
- Ticketing, payments or seat limits. RSVP goes to the external link set on the event.

## References
- Lu.ma and Partiful: events as invitations with personality.
- Supabase Launch Week / Vercel Ship: the ticket as a collectible artifact.
- Concert posters: the date is the headline.
