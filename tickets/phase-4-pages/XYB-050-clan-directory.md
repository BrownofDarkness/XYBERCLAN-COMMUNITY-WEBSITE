---
id: XYB-050
title: The Clan directory /clan
phase: 4-pages
type: dev
size: L
depends_on: [XYB-005, XYB-025, XYB-026]
skills: [react, nextjs, svg, accessibility, performance]
good_first_issue: false
---

# XYB-050 — The Clan directory `/clan`

## Why this exists (the strategy)
**Claim:** "Find your people" is not a slogan here, it is a place. **Proof:** every real member is on this
page as their own blob, and you can find the ones who share your craft, your city or your interest in
under ten seconds.

This page is the hero's promise kept. The home page says *different minds*; this page shows every one
of them, standing together, breathing on the same beat.

## What the visitor should feel and do
- **Feel:** "There are real people like me here, and they look like they have fun."
- **Do:** filter to their craft or city, open two or three profiles, then **Join the clan**.

## Scope
- The blob wall: every published member as their blob, idle on the clan beat.
- A list view for scanning (name, crafts, city), toggled from the wall.
- Filters: craft, city, interest. Free-text search on name and handle.
- Filters and view kept in the URL (`/clan?craft=design&city=douala&view=list`).
- Full keyboard navigation and a correct screen-reader story.
- Smooth with hundreds of members (target: 500 without dropping below 50fps on a mid phone).
- Empty filter state.

## Content
| Content | Source |
| --- | --- |
| Members (handle, name, blob config, crafts, city, interests, published flag) | `content/members/*.json` (schema from XYB-005), added via XYB-072 or XYB-071 |
| Craft, city and interest lists | Derived from member data at build time. Labels and order confirmed in XYB-018. |
| Page heading + one line | Draft — confirm in XYB-018: **"Meet the clan."** / "Every blob here is a real member. Find the ones who make what you make." |
| Empty state line | Draft — confirm in XYB-018: "No blob matches that yet. Maybe you're the first one." + **Join the clan** |

Only members with `published: true` appear. Never pad the wall with fake or sample members in production.
Sample members live only in `content/members/_samples/` and are excluded from production builds.

## Page structure (top to bottom)

1. **Heading band.** `h1` "Meet the clan." at display size, left. To its right, the real count of
   published members set large as a number ("142 members") — computed, never typed. One supporting line
   under the heading. Its job: say what this page is and how many people are here.
2. **The control bar.** Search field, three filter groups (craft, city, interest), and the view toggle
   (Wall / List). Sticks below the nav on scroll on desktop; on phone it collapses into one **Filter**
   button that opens a sheet. Its job: get from 500 people to the 6 you care about.
3. **The wall** (default view). Blobs in a loose, slightly irregular crowd (not a strict grid: each blob
   has a small seeded offset and scale so the crowd feels alive, but positions are stable between visits).
   Under or beside each blob: the member's first name in small text. Hover or focus a blob: it turns to face
   you, waves, and a label shows name, top craft, city. Click/Enter opens the profile. Its job: make the clan
   feel like a crowd of individuals.
4. **The list view.** A real `<table>` (or `role="list"` of rows) with blob thumbnail, name, handle,
   crafts, city. Sortable by name and by join date. Its job: fast scanning for people who know what they want.
5. **The close.** A full-field Lagoon band: "Your blob belongs here." + **Make your blob** (→ `/join`). Its
   job: turn browsing into joining.

## Design spec

**1440:** 12-column grid from XYB-013. Heading band uses columns 1–8 for the `h1`, 9–12 for the count.
Control bar full width, single row. Wall fills the full content width, about 8 blobs per row at ~140px
each with 24–40px seeded jitter. List view: 5 columns, row height 72px, blob thumb 48px.

**768:** heading and count stack. Control bar wraps to two rows (search on top). Wall ~5 per row.
List view drops the handle column.

**390:** `h1` on two lines max. Count sits under the heading. Control bar = search + **Filter** button +
view toggle, one row. Filter sheet slides from the bottom, full width, with an **Apply** button showing the
result count ("Show 23 members"). Wall 3 per row, blobs ~100px. List view: blob, name, top craft only.

Tokens only (colour from XYB-011, type from XYB-012). Labels in full ink. No card borders, no shadows on rows;
the hovered row gets one tone step of background. Active filters show as removable chips in the control bar
(plain text + × button, ink on a light tone; these are controls, not decorative pills).

## Motion spec
- **Entrance:** blobs drop into the wall from slightly above with a small squash on landing, staggered
  by a seeded random order (out of phase) over ~900ms, then all settle onto the clan beat (in phase).
  Only blobs in the first viewport animate in; the rest are already in place.
- **Idle:** every blob bobs and blinks on the shared clan clock from XYB-020/XYB-026.
- **Hover/focus:** the blob turns toward the pointer, does a short wave, label fades up 8px.
- **Filtering:** blobs that leave shrink and fade (200ms); remaining blobs glide to their new spots with
  a FLIP animation (GSAP Flip, 450ms, ease from XYB-020). New blobs pop in with squash.
- **View toggle:** cross-fade wall ↔ list (250ms). No morph needed.
- **Reduced motion:** still SVG blobs, no drop-in, no idle bob, no FLIP; filtering swaps instantly.

## Build notes
- Route: `app/(site)/clan/page.tsx` (server component, statically generated). Member data read at build
  via the content layer (XYB-005); revalidate on deploy. The client part is `ClanDirectory.tsx`.
- Filtering runs on the client over a small serialised index (`handle, name, crafts, city, interests,
  blob, joinedAt`). Keep this index under 60KB gzip for 500 members.
- URL state: `useSearchParams` + `router.replace` (no history spam). Parse defensively: unknown values are
  ignored, not crashes.
- **Performance plan (required):**
  - Every blob is a `<use href="#species">` from the blob sprite (XYB-025) with its own `--blob` colour. The
    sprite is loaded once per page; hundreds of blobs cost no image requests.
  - Only blobs in or near the viewport (max 60 on desktop, 30 on phone) animate. An IntersectionObserver
    adds and removes an `is-live` class per row; rows out of view are static SVG.
  - List view virtualised (`@tanstack/react-virtual`) above 100 rows.
  - `content-visibility: auto` on wall rows below the fold.
- Each blob is a real `<a href="/clan/handle">` with an accessible name: "Name — craft, city". The blob SVG
  inside the link is `aria-hidden="true"` (the link's name carries the meaning).
- Keyboard: Tab moves through search → filters → toggle → first blob. In the wall, arrow keys move between
  blobs (roving tabindex), Enter opens. Filters are native checkboxes in `<fieldset>`s with `<legend>`s.
- Live region (`aria-live="polite"`) announces "23 members match".
- Components: `BlobWall`, `BlobTile`, `ClanList`, `ClanFilters`, `FilterSheet`, `MemberCount`.

## Acceptance criteria
- [ ] Every member with `published: true` appears once; no unpublished or sample member appears in a production build.
- [ ] The member count is computed from data, never hard-coded.
- [ ] Filtering by craft, city and interest combine correctly (AND across groups, OR within a group) and are covered by unit tests.
- [ ] Filters, search and view are in the URL; reloading or sharing the URL restores the exact state; back button works.
- [ ] Empty state shows the drafted line and a working **Join the clan** link.
- [ ] Keyboard only: you can search, filter, switch view and open any member's profile; focus is always visible.
- [ ] Screen reader announces the result count after each filter change and reads each blob as "Name — craft, city".
- [ ] With 500 sample members (dev fixture), scrolling the wall stays above 50fps on a mid-range Android (Chrome DevTools 4× CPU throttle as proxy) and no more than 60 blobs (30 on phone) animate at once.
- [ ] The page works with JavaScript off: members show as a plain list of links with their static SVG blobs.
- [ ] Reduced motion: no idle bob, no drop-in, no FLIP; everything still usable.
- [ ] Layout checked at 1440 / 768 / 390; the filter sheet works by thumb on phone.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no card grid look, no outlined boxes, no shadows at rest).

## Out of scope
- The profile page itself (XYB-051).
- Adding or editing members (XYB-071, XYB-072).
- Messaging between members. No accounts, no logins.

## References
- Read.cv directory: respect for each person, calm scanning.
- Discord brand pages: characters as a crowd with personality.
- Are.na: browsing people without a feed or ranking. No "top members", no popularity sort.
