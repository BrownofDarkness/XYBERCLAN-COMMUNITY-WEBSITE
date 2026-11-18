---
id: XYB-073
title: Dynamic share images
phase: 5-platform
type: dev
size: M
depends_on: [XYB-016, XYB-025, XYB-012]
skills: [nextjs, next-og, svg, typography]
good_first_issue: false
---

# XYB-073 — Dynamic share images

## Why this exists (the strategy)
**Claim:** every link to Xyberclan, shared anywhere, looks like it came from the clan.
**Proof:** when a member shares their profile on WhatsApp, X, LinkedIn or Discord, the preview card
shows **their blob, their name, their craft**. An event link shows a ticket. A project link shows the work.

Most of the clan's new members will arrive through a link a friend shared in a group chat. That preview
card is the real first screen of the site for them. It must be as good as the hero.

## What the visitor should feel and do
- Feel (sharer): "That's me. I want to post this."
- Feel (receiver): "That looks fun and real. Let me tap it."

## Scope
Generated `opengraph-image` (1200×630) and `twitter-image` for:
- Member profile `/clan/[handle]`: their blob (SVG) + name + crafts + city + "Member of Xyberclan".
- Event `/events/[slug]`: the ticket stub — title, date, time, place, the event's field colour.
- Project `/built/[slug]`: project cover image (real) + title + the members who built it (blob row).
- Journal post `/journal/[slug]`: title + author blob + reading time.
- Default (home and every other page): the hero duo + "Different minds. One frequency."

## Content
- The species SVGs from the art kit (XYB-016), coloured through the blob renderer's `blobToSvgString()` helper (XYB-025).
- The display face file (from XYB-012) in TTF/OTF form (Satori does not read WOFF2).

## Design spec
- Image size 1200×630, ground `#F7F7F2` or the item's field colour, ink `#232823`. Safe area: 64 px all round
  (WhatsApp and LinkedIn crop the edges).
- Member card: blob on the right, about 420 px tall, standing on its contact shadow. Name on the left in
  the display face at 88 px, max two lines; crafts at 32 px below. Wordmark bottom-left at 40 px tall.
- Event card: the whole card is the ticket. Date at 96 px (it is the most important fact), title at 56 px,
  place at 32 px. A perforated edge made from real cut-outs (circles of ground colour), not a dashed line.
- Project card: real cover image filling the left 60%, square corners; title and builders on the right.
- Long names: shrink one step (88 → 72 px), then truncate with an ellipsis. Never three lines.
- House rules apply: no gradients, no glows, no monospace, no eyebrow labels.
- **Failure state:** if the blob or cover image is missing, fall back to the default card. A broken
  image never ships.

## Motion spec
None (static images). Optional later: an animated preview for Discord embeds — out of scope.

## Build notes
- Use the Next.js file convention: `src/app/clan/[handle]/opengraph-image.tsx` etc., built on `ImageResponse` from `next/og`.
- Shared layout pieces in `src/og/` (`OgFrame`, `OgWordmark`, `loadOgFonts()`).
- Fonts: load the TTF with `readFile` from `src/og/fonts/` (Node runtime) and pass to `ImageResponse({ fonts })`.
  Load only the weights used (2 at most). Subset to Latin + Latin Extended (French accents).
- Blob images: call `blobToSvgString({ species, colour, face, accessory })` from XYB-025, which returns a
  standalone SVG with **concrete fill values** (no CSS variables or `color-mix`, which an `<img>` data URI cannot
  resolve), and pass it as `data:image/svg+xml;base64,…` to an `<img>` in the card. No PNG renders to maintain.
- Runtime: `nodejs` (reads files), `export const revalidate = 86400` for members and projects; events
  revalidate when the event content changes (on-demand via `revalidateTag("event:<slug>")`).
- Statically generate images for all known members, events and projects with `generateStaticParams`.
- Alt text: export `alt` from each image file ("Ada K.'s blob, a lagoon-coloured drop, and the words Designer in Douala").
- Keep each PNG under 300 KB (WhatsApp ignores larger images on some devices).
- A `/og-preview` page in development only lists every generated card side by side for review.

## Acceptance criteria
- [ ] Every page type listed in Scope has a generated share image; any other page uses the default card.
- [ ] Sharing a member, event and project URL in WhatsApp, Discord, LinkedIn and X shows the right card (screenshots in the PR; use each platform's debugger where one exists).
- [ ] Names, titles and places never run to three lines; the longest real names in the content were tested.
- [ ] French characters (é, è, ç, à, œ) render in the display face.
- [ ] Every card keeps its important content inside the 64 px safe area.
- [ ] Each image is under 300 KB and generated in under 1 second on a cold start.
- [ ] Missing blob or cover image falls back to the default card without a server error.
- [ ] Every share image has meaningful `alt` text.
- [ ] `/og-preview` exists in dev and is not reachable in Production.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Page `<title>` and `<meta>` descriptions (XYB-074).
- The downloadable member card from the Blob Maker (XYB-058 may reuse these components).

## References
- Trait to learn: Vercel Ship / Supabase Launch Week personalised tickets — people share them because they are theirs.
- Next.js docs: `opengraph-image`, `ImageResponse`.
