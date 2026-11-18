---
id: XYB-051
title: Member profile /clan/[handle]
phase: 4-pages
type: dev
size: M
depends_on: [XYB-050, XYB-025, XYB-073]
skills: [react, nextjs, svg, accessibility, privacy]
good_first_issue: false
---

# XYB-051 — Member profile `/clan/[handle]`

## Why this exists (the strategy)
**Claim:** in this clan, a person is more than a username. **Proof:** each member has a page that shows
who they are, what they make and what they have built with the clan, in their own words, and only what
they chose to share.

A profile is where "find your people" becomes "I want to talk to *this* person". It must respect the member
first and impress the visitor second.

## What the visitor should feel and do
- **Feel:** "I know a little about this person now, and I'd like to say hi."
- **Do:** follow the member's chosen "say hi" link, or open a project they built.

## Scope
- Their blob, large (inline SVG), idle on the clan beat.
- Name, handle, optional pronouns, crafts, city (optional), short bio.
- Links the member chose to publish (website, GitHub, Behance, LinkedIn, X, etc.).
- Projects they built (from `/built`) and events they attended or spoke at.
- One "Say hi" action, routed through the channel the member picked.
- Share image (from XYB-073) and correct metadata.
- Previous / next member navigation.

## Content
| Content | Source |
| --- | --- |
| Profile fields | `content/members/<handle>.json` (XYB-005), written by the member (XYB-072) or by moderators from the join form (XYB-071) |
| Projects | `content/projects/*` where the member's handle is listed in `team` |
| Events | `content/events/*` where the member is in `speakers` or `attendees` (attendees only if the member opted in) |
| Bio | Written by the member. Max 280 characters. No editing by us beyond typos with consent. |
| Page labels | Draft — confirm in XYB-018: "Makes", "Built with the clan", "Showed up at", "Say hi" |

**Privacy rule:** every field except handle, name and blob is optional. A field the member left empty is
**not shown at all** (no "No bio yet", no empty heading). Email is never displayed.

## Page structure (top to bottom)

1. **The person.** Left: the `h1` is the member's name at display size; under it, handle and pronouns
   in small text, then crafts as one plain sentence ("Designer, illustrator and occasional coder"), then
   the bio at statement size. Right: their blob, large (about half the first screen), rendered as inline
   SVG by `<Blob>` (XYB-025). Under the blob, one **Say hi** button. Its job: meet the person in one look.
2. **Built with the clan.** Only if they have projects. Each project as a large image with its title and
   one line, laid out as a horizontal row on desktop (one big, the rest smaller), stacked on phone. Its
   job: show what they make, with proof.
3. **Showed up at.** Only if they have events. A compact list of event names and dates, each linking to the
   event page; talks they gave are marked "Spoke". Its job: show they are part of the clan's life.
4. **Find them elsewhere.** Their published links as a plain list of text links with icons (Solar via
   Iconify). Its job: let you follow them outside the clan.
5. **Neighbours.** Previous / next member (alphabetical), each with their small blob. Plus **Meet the clan**
   back to the directory. Its job: keep you exploring people, not leaving.

## Design spec

**1440:** person section on 12 columns: text on 1–6, blob on 7–12, vertically centred, first screen.
`h1` at display size (two lines max; long names wrap, never shrink below the second size). Projects row:
one item spans 6 columns, others 3. Field colour of the person section: the member's blob colour at a
very light tone step (derived token from XYB-011), rest of page on Ground.

**768:** person section stays two columns but blob is 40%. Projects 2 per row.

**390:** blob first (about 55vh), then name, crafts, bio, **Say hi**. Projects stacked full width.
Links list one per line, 48px tall tap targets.

Square-cornered project media. No outlined boxes around sections; space and the field colour change
separate them.

## Motion spec
- **Entrance:** the blob drops in from above with squash on landing, turns to face the visitor, waves once.
  Name reveals word by word (XYB-022), then crafts and bio (XYB-023 stagger).
- **Idle:** blob on the clan beat; eyes follow the pointer (XYB-026), blink on the beat.
- **Say hi hover:** the blob leans toward the button and smiles (if XYB-026 exposes a `react` hook).
- **Coming from `/clan`:** the blob tile morphs into the large blob with a view transition (shared element
  name `blob-<handle>`, XYB-024). Back reverses it.
- **Reduced motion:** the same SVG blob standing still, no drop, no follow, no morph. Everything visible at once.

## Build notes
- Route: `app/(site)/clan/[handle]/page.tsx`, `generateStaticParams` from published members. Unknown or
  unpublished handle → `notFound()` (the lost-blob 404, XYB-060).
- `generateMetadata`: title "Name — Xyberclan", description from bio (or "A member of Xyberclan"), OG image
  from XYB-073 route `/og/member/[handle]`.
- **Say hi routing:** member picks one of `discord` (deep link to their Discord profile by user ID),
  `email-relay` (a form posting to XYB-071 that forwards without exposing the address, rate-limited),
  or `link` (one URL). If none chosen, the button is not shown.
- Projects/events joins happen at build time in the content layer, not on the client.
- JSON-LD `Person` with only published fields (coordinate with XYB-074).
- Components: `ProfileHero`, `ProfileProjects`, `ProfileEvents`, `ProfileLinks`, `MemberNeighbours`, `SayHi`.

## Acceptance criteria
- [ ] Every published member has a statically generated page; unpublished or unknown handles return the 404 page with status 404.
- [ ] Empty optional fields render nothing at all (no empty headings or placeholder text); covered by a test with a minimal member.
- [ ] Email address never appears in the HTML, JSON-LD or client bundle (grep the build output).
- [ ] Projects and events lists match the content data exactly (test with a fixture member in two projects and one event).
- [ ] **Say hi** follows the member's chosen channel; the email relay never reveals the address and is rate-limited.
- [ ] Share preview (Discord, WhatsApp, X, LinkedIn) shows the member's blob card from XYB-073.
- [ ] Long names (40+ characters) and long handles keep the `h1` to two lines at 1440 / 768 / 390.
- [ ] Coming from `/clan`, the blob morph runs where View Transitions are supported and degrades to a normal navigation elsewhere.
- [ ] Keyboard and screen reader: the page reads name, crafts, bio, then sections in order; the blob SVG has `role="img"` and a text alternative ("Name's blob: a teal round blob with a big smile").
- [ ] Reduced motion: still SVG blob, no morph, no follow.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Editing a profile from the site (members edit via PR or by asking moderators).
- Likes, followers, counts of any kind. No popularity signals.
- Private messaging inside the site.

## References
- Read.cv: a profile that feels like a calm personal page, not a social card.
- Are.na profiles: what someone *makes* matters more than how many people follow them.
- Duolingo characters: one small reaction (the wave) makes a page feel alive.
