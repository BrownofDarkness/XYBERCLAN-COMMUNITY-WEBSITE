---
id: XYB-056
title: Built by the clan /built and project case studies
phase: 4-pages
type: dev
size: M
depends_on: [XYB-005, XYB-036]
skills: [react, nextjs, mdx, gsap, art-direction]
good_first_issue: false
---

# XYB-056 — Built by the clan `/built` + `/built/[slug]`

## Why this exists (the strategy)
**Claim:** "Make things happen" is true — members ship real things together. **Proof:** every project
here was made by clan members, with the team named and linked, the story told, and the work shown big.

This is the clan's portfolio. It tells a newcomer "you could build something like this here, with
these people", and it gives members a place to be proud of their work.

## What the visitor should feel and do
- **Feel:** "These people actually make stuff. I want to make stuff with them."
- **Do:** open a case study, meet a team member's profile, then **Join the clan**.

## Scope
- `/built` index: all published projects, filterable by kind (app, design, open source, hardware, content,
  event — final list from XYB-001).
- `/built/[slug]` case-study template written in MDX: the problem, who made it, how, what came out, links.
- Team members linked to their `/clan` profiles with their blobs.
- Next/previous project navigation.

## Content
| Content | Source |
| --- | --- |
| Project frontmatter (title, slug, kind, year, summary, cover, team handles, links, status) | `content/projects/<slug>.mdx` (XYB-005), written by the project team |
| Case-study body (300–900 words) + 4–10 media items | The project team, edited for voice (XYB-018) |
| Media | Real screenshots, photos, videos of the project. Software projects show their real interface. |
| Index heading + line | Draft — confirm in XYB-018: **"Built by the clan."** / "Things members made together. Every one started as a conversation." |

Only projects made by members, with the team's consent to be featured. No client work presented as clan work
unless the team says so. No made-up metrics; numbers only if the team can back them.

## Page structure

### `/built` (index)
1. **Heading band.** `h1` "Built by the clan." left; right, the real count of projects and the number of
   members who worked on them, computed from data. Its job: scale of output, honestly.
2. **The work.** Projects as large images in an editorial rhythm: one full-width feature, then a pair, then
   an offset single, repeating. Each shows cover, title, kind, year and the team's blobs in a small row.
   Filter by kind in a plain text tab bar above. Its job: let the work speak big.
3. **Start something.** Full-field Deep band: draft — confirm in XYB-018: "Got an idea? Someone here wants
   to build it with you." + **Join the clan**. Its job: from admiring to joining.

### `/built/[slug]` (case study)
1. **Cover.** `h1` project title (two lines max), one-sentence summary, kind and year; the cover media at
   full width (video loop if available). Its job: what it is in five seconds.
2. **The team.** The team's blobs standing in a row, each with name and role, linking to profiles. Its job:
   people first.
3. **The story.** MDX body in a reading column (60–70ch) with full-width media breaks between paragraphs.
   Recommended headings: "The spark", "How we built it", "What came out". Its job: show how the clan works.
4. **Try it.** Links to the live project, repo, Figma, video — a plain list of text links with icons.
5. **Next project.** The next project's cover, large, as a link. Its job: keep exploring.

## Design spec

**1440:** index rhythm: feature full content width at 16:9; pair at 2 × 6 columns 4:5; offset single 7
columns at 3:2 starting at column 4. Case study: reading column cols 3–9; media breaks full content width
or full bleed.

**768:** index pairs stay as pairs; offset single becomes full width. Case study column ~600px.

**390:** index single column, all 4:5 except features at 16:9. Team blobs in a horizontal scroll row.
Case study text at 17–18px.

Square-cornered media. Titles below images, not overlaid (except where a scrim is truly needed).
Team blob row uses small `<Blob>` SVGs from the sprite (XYB-025) on the index, static until hovered.

## Motion spec
- **Index:** images reveal with a clip-path wipe upward and a scale 1.08 → 1 (XYB-023), titles follow.
  Hover/focus: image scales to 1.03 inside its frame, the team blobs hop once in sequence.
- **Filter change:** FLIP reorder (400ms).
- **Case study cover:** media scales 1.1 → 1 on load; title word reveal (XYB-022).
- **Index → case study:** shared-element view transition on the cover image (XYB-024).
- **Media in the story:** slow parallax (max 8% of height) on full-bleed images only.
- **Reduced motion:** no wipes, no parallax, no hop, plain navigation.

## Build notes
- Routes: `app/(site)/built/page.tsx` and `app/(site)/built/[slug]/page.tsx`, static with
  `generateStaticParams`.
- MDX components available to authors: `<Media src alt caption full />`, `<Video src poster />`,
  `<Pair>`, `<Quote by="handle">` (quotes only from real team members), `<Links>`. Document them in the
  content README (XYB-005).
- Validate at build: every `team` handle exists in members; every media has alt text; cover exists.
- Videos: muted, `playsinline`, `loop`, poster frame, `preload="none"` below the fold, pause when offscreen.
- OG image from XYB-073; JSON-LD `CreativeWork` (XYB-074).
- Components: `ProjectRhythm`, `ProjectTile`, `KindTabs`, `CaseStudyCover`, `TeamRow`, `ProjectLinks`.

## Acceptance criteria
- [ ] Project and member counts on the index are computed from data.
- [ ] Build fails if a project lists a team handle that does not exist, or a media item without alt text.
- [ ] Every team member links to their profile; profiles list the project back (XYB-051 shows it).
- [ ] The editorial rhythm never shows two identical layouts in a row and never leaves a half-empty row (odd counts handled).
- [ ] Case-study reading column stays within 60–70 characters on desktop.
- [ ] Videos are muted, have posters, and pause when offscreen.
- [ ] Shared-element transition works where supported and falls back to a normal navigation.
- [ ] Layout checked at 1440 / 768 / 390; reduced motion removes wipes, parallax and transitions.
- [ ] Works with JavaScript off (all projects listed, filters become plain links).
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no card grid, no shadows, no invented metrics).

## Out of scope
- Submitting a project from the site (teams add projects by PR, same flow as XYB-072).
- Voting, likes or rankings.

## References
- Studio portfolios on Awwwards: work shown big, an editorial rhythm instead of a grid.
- GitHub "Built with" pages: always credit the people.
- Read.cv projects: the team is part of the work.
