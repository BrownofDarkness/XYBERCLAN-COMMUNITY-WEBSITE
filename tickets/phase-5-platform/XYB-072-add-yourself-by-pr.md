---
id: XYB-072
title: Add yourself by pull request
phase: 5-platform
type: dev
size: M
depends_on: [XYB-005, XYB-004]
skills: [github-actions, typescript, zod, nextjs]
good_first_issue: false
---

# XYB-072 — Add yourself by pull request

## Why this exists (the strategy)
**Claim:** this site is built by its members, and every member's place on it is their own.
**Proof:** your profile on `/clan` is a small file **you** wrote and **you** merged. The repo history is
literally the clan's history.

For technical members, adding yourself by pull request is the first ritual: your first commit to the
clan's project. For people who never used Git, it becomes a gentle first lesson (with a guide and a
mentor). It also means no member data is published without the member doing it themselves: consent
by design.

The ticket that builds this is not a good first issue. **Every member PR it enables is.**

## What the visitor should feel and do
- Feel (member): "I made my mark on this."
- Do: copy a template, fill in a file, open a PR, see their own preview, get merged.

## Scope
- The member file format: `content/members/<handle>.json` plus an optional photo.
- A template file and a step-by-step guide in `CONTRIBUTING.md`.
- A GitHub Action that validates every member file in a PR and comments with the result and a preview link.
- The same flow for **projects** (`content/projects/`) and **events** (`content/events/`): the validator checks every content type from XYB-005, and the guide has a short section for each. Project PRs need approval from one listed project member.
- An issue template "Add me to the clan" for people who prefer a form (a maintainer opens the PR for them).

## Content
- The guide text (warm, plain English, with a French version reviewed in XYB-076), reviewed with XYB-018.
- The list of allowed crafts and cities (shared with the content schema in XYB-005).

## Design spec
Not a visual ticket. What contributors see:
- **Bot comment, success:** "Welcome to the clan, @handle. Your profile preview: <preview-url>/clan/<handle>" and a small table of what was read from the file.
- **Bot comment, failure:** one line per problem, in plain words, with the fix ("`crafts` has `desing`. Did you mean `design`?"). Never a raw zod stack trace.

## Motion spec
None.

## Build notes
- File shape (validated with the zod `memberSchema` from XYB-005):
  ```json
  {
    "handle": "ada-k",
    "name": "Ada K.",
    "pronouns": "she/her",
    "city": "Douala",
    "crafts": ["design", "frontend"],
    "bio": "I make interfaces that feel like toys. Ask me about type.",
    "links": { "github": "ada-k", "website": "https://…" },
    "blob": { "species": "drop", "colour": "lagoon", "eyes": "happy", "accessory": null },
    "photo": "ada-k.avif",
    "joined": "2026-11",
    "consent": { "publicProfile": true, "photo": true, "structuredData": false }
  }
  ```
- `handle` rules: lowercase, `a-z0-9-`, 2–30 characters, must match the file name, unique across `content/members/`.
- Photo rules: optional, in `public/members/<handle>.avif` or `.webp`, square, 800×800 to 1600×1600,
  ≤ 300 KB, real photo of the member (creative-direction: avatars are real photos or their blob, never
  someone else). EXIF data stripped by the Action.
- `bio` ≤ 160 characters, no links inside (links go in `links`). `links` values are checked as URLs or usernames.
- `consent.publicProfile` must be `true` for the file to be accepted.
- Script: `scripts/validate-members.ts` (run with `pnpm validate:members`) — reusable locally and in CI.
- Action: `.github/workflows/members.yml`, triggered on PRs touching `content/members/**` or `public/members/**`:
  1. Run `pnpm validate:members --changed`.
  2. Check that a PR only touches **one** member's files and that the PR author is that member
     (GitHub username matches `links.github`) unless a maintainer label `added-for-member` is present.
  3. Post or update one sticky comment (`marocchino/sticky-pull-request-comment`) with results and the Vercel preview URL.
- `CODEOWNERS`: `content/members/` reviewed by the `@xyberclan/moderators` team.
- Removing yourself: delete your file in a PR; the guide explains it. A member can also ask a moderator.

## Acceptance criteria
- [ ] `CONTRIBUTING.md` has an "Add yourself to the clan" section a first-time Git user can follow (tested with one real non-developer member).
- [ ] `content/members/_template.json` exists and validates once its placeholder values are replaced.
- [ ] A PR with a valid file gets a green check and a welcome comment with a working preview link.
- [ ] A PR with a misspelled craft, a duplicate handle, a file-name mismatch, or `publicProfile: false` fails with one plain-language line per problem.
- [ ] A photo over 300 KB or not square fails with a clear message; EXIF is stripped from accepted photos.
- [ ] A PR touching two members' files fails unless labelled `added-for-member` by a maintainer.
- [ ] The comment is updated (not duplicated) on every push.
- [ ] `pnpm validate:members` runs locally and gives the same result as CI.
- [ ] The "Add me to the clan" issue form exists for people without Git.
- [ ] The merged profile appears on `/clan` and `/clan/<handle>` in the next deploy without code changes.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- The `/clan` pages themselves (XYB-050, XYB-051).
- Editing profiles from the website (later, if ever).
- Pulling member data from Discord.

## References
- Trait to learn: the "add yourself to the contributors list" first-PR rituals of open-source projects (e.g. first-contributions on GitHub).
- Trait to learn: Read.cv profiles — the person speaks for themselves.
