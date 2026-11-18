---
id: XYB-005
title: Content layer and schemas
phase: 0-foundations
type: dev
size: M
depends_on: [XYB-002, XYB-006, XYB-015]   # XYB-015 only for the final blob enums; start with placeholder enums
skills: [typescript, zod, mdx]
good_first_issue: false
---

# XYB-005 — Content layer and schemas

## Why this exists (the strategy)
**Claim:** the site is made of the clan's real content, and members can add to it themselves.
**Proof:** members, events, projects and stories live as typed files in `content/`. Adding yourself, an
event or a project is a small pull request that is checked by a schema. No CMS login, no lost data,
full history in Git.

## What the visitor should feel and do
Visitors see real, consistent content everywhere. Contributors can add an event or a member by copying one file.

## Scope
- Choose the content tool: **Velite** (recommended: zod schemas, MDX, typed output) or Content Collections. Document why in the PR.
- Schemas for: `member`, `event`, `project`, `story` (journal), `space` (what's inside), `program`, `faq`, `quote` (member voices).
- One real or clearly-marked sample entry per type (`_example` prefix, excluded from production builds).
- Typed helpers in `lib/content.ts`: `getMembers()`, `getMember(handle)`, `getUpcomingEvents(n)`, `getPastEvents()`, `getProjects()`, etc.
- Schema validation runs in `pnpm build` and fails the build on bad content.

## Content
Folder layout:

```
content/
├── members/<handle>.json
├── events/<yyyy-mm-dd>-<slug>.mdx
├── projects/<slug>.mdx
├── journal/<yyyy-mm-dd>-<slug>.mdx
├── spaces/<slug>.json
├── programs/<slug>.mdx
├── faq/<slug>.json
└── quotes/<handle>-<n>.json
```

Real entries come from `PRODUCT.md` (XYB-001). Sample entries are marked `_example-*` and never ship.

## Design spec
None. Fields below shape every page's design, so designers should review this PR.

## Motion spec
None.

## Build notes
Key fields (zod). Required unless marked `?`.

- **member**: `handle` (slug, unique), `name`, `pronouns?`, `crafts` (enum list, from XYB-001), `city?`, `country?`, `bio` (≤ 280 chars), `links?` ({ github, linkedin, site, x }), `photo?` (path, consent required), `blob` ({ species, colour, face, accessory? } — enums from XYB-015), `joined` (date), `consent` ({ listed: true, photo: boolean, structuredData: boolean } — `structuredData` allows Person markup in XYB-074).
- **blobConfig** (shared, in `lib/content/blob.ts`): `{ species, colour, face, accessory? }` with enums from XYB-015. One schema used by member files, the Blob Maker (XYB-058), the join backend (XYB-071), add-yourself-by-PR (XYB-072) and share images (XYB-073).
- **event**: `title`, `date`, `endDate?`, `timezone`, `venue` ({ name, address?, city, online: boolean, mapUrl? }), `rsvpUrl?`, `capacity?`, `speakers?` (member handles), `cover?`, `recap?` ({ photos: path[], attendance?: number }), MDX body = agenda.
- **project**: `title`, `slug`, `summary` (≤ 140), `members` (handles), `links`, `cover`, `media?`, `year`, `status` (`shipped` | `building`), MDX body = case study.
- **story**: `title`, `author` (handle), `date`, `cover?`, `summary`, MDX body.
- **space**: `name`, `kind` (`channel` | `room` | `repo`), `about`, `rhythm?`.
- **program**: `name`, `about`, `cadence`, `leads` (handles), `nextDate?`.
- **faq**: `q`, `a` (markdown), `order`.
- **quote**: `member` (handle), `text` (≤ 240), `context?`, `consent: true`.

- Cross-reference checks: every handle used in `speakers`, `members`, `author`, `leads` must exist in `content/members`. Fail the build otherwise.
- Images referenced from content live in `public/content/...` and must exist (check in build).
- Dates are ISO 8601 with timezone for events.
- Export TypeScript types from the generated output; components import types, not raw JSON.

**Bilingual (XYB-006):** site-written fields use the `localized()` helper (`{ en, fr }`); long-form MDX is one file per language (`slug.en.mdx` / `slug.fr.mdx`); member-written fields (bio, story body, quote text) carry a `lang` field and are never translated automatically.

## Acceptance criteria
- [ ] Site-written fields are localized with `localized()`; member-written fields carry `lang`.
- [ ] All eight schemas exist and generate TypeScript types.
- [ ] `pnpm build` fails with a clear message when a required field is missing.
- [ ] `pnpm build` fails when an event lists a speaker handle that does not exist.
- [ ] `pnpm build` fails when a referenced image file does not exist.
- [ ] `_example-*` entries are excluded from production output.
- [ ] Helpers in `lib/content.ts` are typed and covered by at least one unit test each (Vitest).
- [ ] A `content/README.md` explains how to add a member, an event and a project, with copy-paste examples.
- [ ] A designer has reviewed the fields and approved in the PR.

## Out of scope
- The "add yourself by PR" bot and checks (XYB-072). A web form for joining (XYB-071).
- Any page that renders this content.

## References
- Trait from community sites like Recurse Center directory and open-source "people" pages: profiles as files people own and edit themselves.
