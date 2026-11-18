---
id: XYB-034
title: "The pulse: the clan right now"
phase: 3-home
type: dev
size: M
depends_on: [XYB-070, XYB-023]
skills: [react, next-server-components, data-fetching, css]
good_first_issue: false
---

# XYB-034 — The pulse: the clan right now

## Why this exists (the strategy)
**Claim:** Xyberclan is alive **today**, not a nice website over an empty server.

**Proof:** live numbers and moments pulled from real sources: who is online on Discord right now, how long
until the next event, the latest thing a member shipped. Each one is different on every visit.

Most community sites show "10,000+ members" that nobody believes. We show something smaller and true, live.
This is the home page's live thing (alongside the Blob Maker teaser in XYB-040).

## What the visitor should feel and do
- **Feel:** "There are people here right now. I could talk to them tonight."
- **Do:** open the Discord invite, save the next event, or look at the latest project.

## Scope
Three live readings in one band, each with its own source and its own honest fallback:

| Reading | Source | Example display | Fallback when missing |
| --- | --- | --- | --- |
| Online now | Discord widget / API via XYB-070 | "**23** members online right now" + a row of small blobs, one per online member (max 23) | Hide the number. Show "Come say hi on Discord" + the invite link. |
| Next event | `content/events/` (XYB-005) | "**4 days, 6 hours** until *Build Night #12*, Douala" (real values) | If no upcoming event: "Next event coming soon. Get told first →" linking to the events page. |
| Latest shipped | `content/projects/` (XYB-005) | "Latest shipped: *Project name* by 3 members, 2 weeks ago" | If none: hide this reading. |

- A small "Updated a minute ago" note for the online count, so the number is honest about its age.

## Content
- All numbers come from data. **No number is ever typed by hand into this component.**
- Labels (draft — confirm in XYB-018): "online right now", "until", "Latest shipped".
- Owner: data from XYB-070 and the content files; copy from XYB-018.

## Design spec
This band is the only place on the home page that uses figures as the main type, so it must look like a
**live board**, not a stats row.

**Desktop (1440)**
- Ink field (dark), paper text: the band reads as "the lights are on". About 70vh tall.
- One heading `h2` at display step 3: "Right now in the clan" (draft).
- The three readings set as **one big sentence per line**, left aligned, each line a different length, with
  the number at display step 2 (≈ 72px, tabular figures) and the rest of the line at text-large:
  - line 1: number + "members online right now" + the small blob row trailing to the right.
  - line 2: countdown + "until" + event name (event name links to the event).
  - line 3: "Latest shipped:" + project name (links to project).
- No boxes, no dividers between the lines: space (48px) separates them.

**Tablet (768):** same, number at step 3. Blob row wraps under line 1.
**Phone (390):** each reading stacks: number on its own line (≈ 48px), label under it. Blob row max 12.

## Motion spec
- **Entrance** (XYB-023): heading reveal, then each line rises with 120ms stagger.
- **Numbers:** count up from 0 to the real value once on entrance (600ms, tabular figures so nothing jumps).
  The countdown then ticks every second (only seconds digit animates: a short 150ms vertical roll).
- **Blob row:** small online blobs bob **on the clan beat**, all in sync (the frequency again). When the
  online count changes on refresh, new blobs pop in with a squash, leaving blobs shrink away.
- **Live refresh:** online count refetches every 60s while the band is visible and the tab is active.
- **Reduced motion:** no count-up, countdown updates once per minute without the roll, blobs still.

## Build notes
- Files: `components/home/Pulse.tsx` (server component wrapper) + `components/home/PulseLive.client.tsx`.
- Server: fetch the Discord summary from the route built in XYB-070 (`/api/discord/summary`, cached 60s).
  Next event and latest project come from the content layer at build time; the countdown is computed on the client from the event's ISO date with time zone (`Africa/Douala` or the event's own zone).
- Hydration: render the server values first; the client only takes over the ticking and the refresh, so there
  is no flash of zeros.
- Countdown text uses `Intl.RelativeTimeFormat` / `Intl.DateTimeFormat` so it can be translated (XYB-076).
- Announce updates politely: the online count in an `aria-live="polite"` region, **not** the ticking countdown
  (that would spam screen readers).
- Each reading is its own component with its own `null` fallback, so one failing source never breaks the band.

## Acceptance criteria
- [ ] Every number shown comes from Discord or the content files; a grep finds no hard-coded figures in the component.
- [ ] Turning off the Discord API (env var unset) shows the fallback line, not "0" and not an error.
- [ ] With no upcoming event, the event line shows the "coming soon" fallback.
- [ ] With no projects, the third line is not rendered.
- [ ] Countdown is correct across time zones (test with the browser set to UTC and to Africa/Douala).
- [ ] The online count refreshes every 60s only while visible; no requests while the tab is hidden.
- [ ] Figures use tabular numbers; nothing shifts while the countdown ticks.
- [ ] Contrast on the ink field ≥ 4.5:1 for all text.
- [ ] Screen readers get the online count once, not every second.
- [ ] Reduced motion: no count-up or rolling digits.
- [ ] Layout matches the spec at 1440 / 768 / 390, no boxes, no dividers.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- The Discord integration itself (XYB-070). Any chart or graph of growth.

## References
- Train station departure boards: live, simple, trusted.
- Lu.ma: event countdowns that make a date feel close.
