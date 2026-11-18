---
id: XYB-057
title: Journal /journal and article page
phase: 4-pages
type: dev
size: M
depends_on: [XYB-005]
skills: [react, nextjs, mdx, typography, rss]
good_first_issue: true
---

# XYB-057 — Journal `/journal` + `/journal/[slug]`

## Why this exists (the strategy)
**Claim:** the clan has things worth saying. **Proof:** member-written stories — how someone landed their
first job, what a build sprint taught us, a recap of a talk, a tutorial — published with care and a
reading experience that respects the reader.

The journal gives the clan a voice outside Discord, gives members a byline they can share, and gives
search engines real content about the community.

## What the visitor should feel and do
- **Feel:** "This is good to read. These people know things and share them."
- **Do:** read a story to the end, meet the author's profile, subscribe via RSS, or **Join the clan**.

## Scope
- `/journal` index: latest stories, filterable by kind (story, tutorial, recap, announcement — confirm in XYB-018).
- `/journal/[slug]`: MDX article template with a first-class reading experience.
- Author block with blob and profile link (authors are members).
- RSS feed `/journal/rss.xml`.
- Reading time and published/updated dates.

## Content
| Content | Source |
| --- | --- |
| Articles (title, slug, kind, author handle(s), date, updated, summary, cover, body) | `content/journal/<slug>.mdx` (XYB-005), written by members, reviewed by an editor role in CONTRIBUTING (XYB-004) |
| Index heading + line | Draft — confirm in XYB-018: **"Journal."** / "Stories, lessons and notes from members." |
| Launch content | At least 3 real articles before this page goes live (owners named in XYB-001). If fewer, the nav link stays hidden. |

## Page structure

### `/journal` (index)
1. **Heading band.** `h1` "Journal." and one line, left. Right: the newest article's title set large as a
   link. Its job: say what this is and give one thing to read now.
2. **The list.** Articles as a typographic list, not cards: each row shows date, title at a large size,
   one-line summary, author's blob (small static SVG) and name, kind. Rows separated by space and a tone step
   on hover — no lines. A cover image appears beside the row only on hover/focus (desktop) — on phone
   covers are omitted from the list. Its job: fast scanning by title, like a good magazine contents page.
3. **Subscribe.** Plain line with the RSS link and the Discord channel where new posts are shared.

### `/journal/[slug]` (article)
1. **Title.** `h1` title first (two lines max at display size, or the second size for long titles), then
   the summary at statement size, then one author row: blob, name, date, kind, reading time. Nothing sits
   above the title (no small label line — house rules). Cover full width below.
2. **The body.** One reading column, 60–70ch, 18–20px, leading 1.55. Supports headings (h2, h3), lists,
   images (column width or full bleed), captions, quotes, code blocks with syntax highlighting (monospace
   allowed here — it is real code), callouts as a tone-step block (no borders), footnotes.
3. **The author.** Blob, name, bio from their profile, link **Meet [name]**.
4. **Keep reading.** Two more articles as large titles. Its job: the next read.

## Design spec

**1440:** index list title size = second size of the type scale; summary at text size. Article column
centred within the grid (cols 4–9), media breaks to full content width.

**768:** same structure, column ~620px.

**390:** text at 17–18px, side margins from XYB-013. Code blocks scroll horizontally inside, never the page.
Images full width.

Type: text face for body, display face for titles only. Links underlined (offset 0.2em, thickness from token),
colour = ink, hover = Deep. Quotes at statement size, not italic-styled accent words.

## Motion spec
- **Index:** rows rise in staggered (XYB-023). Hover cover image fades and follows the row (no pointer chasing).
- **Article:** title word reveal (XYB-022), then summary and cover. Body is **not** animated paragraph by
  paragraph — reading comes first.
- **Reading progress:** the author's small blob sits on the top bar and moves across with reading progress
  (one transform), blinking on the beat.
- **Reduced motion:** no reveals; progress blob static (or a plain progress bar).

## Build notes
- Routes: `app/(site)/journal/page.tsx`, `app/(site)/journal/[slug]/page.tsx`, RSS at
  `app/journal/rss.xml/route.ts` (full content or summary — decide in PR, default summary + link).
- MDX pipeline from XYB-005 with `rehype-pretty-code` (or Shiki) for code, `remark-gfm`, heading anchors,
  footnotes. Reading time computed at build.
- Draft support: `draft: true` articles excluded from production builds, visible on preview deploys.
- OG image from XYB-073 (title + author blob); JSON-LD `Article` (XYB-074).
- Components: `JournalList`, `JournalRow`, `ArticleHeader`, `Prose`, `AuthorCard`, `ReadingProgressBlob`, `KeepReading`.

## Acceptance criteria
- [ ] Reading column measures 60–70 characters per line at 1440 and 768.
- [ ] Body text is full ink, 18px or more on desktop, 17px or more on phone.
- [ ] Code blocks scroll inside themselves; the page never scrolls horizontally at 390.
- [ ] `draft: true` articles never appear in production HTML, sitemap or RSS.
- [ ] RSS validates (W3C feed validator) and includes title, link, date, author and summary.
- [ ] Every article has an author who exists in members; build fails otherwise.
- [ ] Article page passes heading-order checks (one `h1`, no skipped levels).
- [ ] Layout checked at 1440 / 768 / 390; reduced motion removes reveals.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no card grid on the index, no borders on callouts).

## Out of scope
- Comments (discussion happens in Discord; link to the channel).
- A CMS UI; articles are MDX via pull requests.

## References
- Stripe Press, The Browser Company blog: titles as the design, generous reading column.
- Craig Mod, Robin Sloan: reading experience over decoration.
- Classic magazine contents pages: typographic lists that invite scanning.
