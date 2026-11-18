---
id: XYB-084
title: Showcase kit for galleries
phase: 6-quality-launch
type: content
size: M
depends_on: [XYB-083]
skills: [copywriting, screen-recording, video-editing, design]
good_first_issue: false
---

# XYB-084 — Showcase kit for galleries

## Why this exists (the strategy)
**Claim:** this site was built by the community it is about, and that story is worth telling.
**Proof:** a case study, a short film and a set of stills that show the craft *and* the people behind it,
ready to submit to design galleries and to share with the world.

The site's best story is not "a premium website". It is: *a clan of different minds built their own home,
ticket by ticket, on one frequency.* The git history, the tickets, the members who sculpted blobs and wrote
scroll scenes: that is the case study. Galleries feature work; people share stories. This kit gives both.

We never write or say that the site won an award unless a gallery has actually published that result, with a link.

## What the visitor should feel and do
- Feel (jury, designers, future members): "A community made this? Together?"
- Do: visit the site, share the film, and — for future members — join.

## Scope
- A case-study journal post (`/journal/how-the-clan-built-its-home`) using the journal template (XYB-057).
- A 60–90 second screen recording of the site, edited.
- Stills at 1440 and 390 for each key page.
- Submission texts for Awwwards, CSS Design Awards, Godly and Siteinspire.
- A contributor credits list.

## Content
- **The case study** (1,200–2,000 words), in this order:
  1. The idea: *Different minds. One frequency.* — how the hero concept became the blob system.
  2. The blobs: from sketch to Figma to animated SVG in the browser (XYB-015, XYB-016) with real process images.
  3. The beat: how one shared clock moves the whole site (XYB-020, XYB-032).
  4. The Blob Maker: the live thing, and how many members made their blob in the first month (real number only).
  5. How it was built: number of tickets, contributors, pull requests, first-time contributors (counted from git and GitHub, not estimated).
  6. What we learned, including what did not work.
  7. Credits: every contributor by name/handle and what they did.
- **The film script** (60–90 s): hero intro → cursor plays with the blobs → the into-phase scene → the three verbs →
  the members crowd → Blob Maker making a blob live → events → the footer wordmark. Recorded at 60 fps,
  1920×1080 and a 1080×1920 vertical cut for social. Optional soft sound bed (the clan beat from XYB-028 if it shipped).
- **Stills:** home hero, signature scene mid-way, three verbs, members crowd, Blob Maker, event page,
  member profile, footer — each at 1440×900 and 390×844, PNG, no browser chrome, plus 3 detail crops (blob close-up, type, micro-interaction).
- **Submission text** (short and long versions, ≤ 600 characters and ≤ 1,500 characters): what Xyberclan is,
  the idea, the community-built story, the tech stack, credits. No superlatives we cannot prove.

## Design spec
- Stills are captured from Production at device pixel ratio 2, no cursor, no scrollbars, content fully loaded.
- The film uses the site's own type and colours for any title cards; no added effects, no gradients, no stock music with a recognisable track.
- The case-study post follows the journal template; process images square-cornered, captioned with what they show.
- **Failure state:** if a gallery rejects the submission, nothing changes on the site. We do not put gallery
  logos or "as seen on" badges on the site unless the result is real and published.

## Motion spec
- The film shows motion at real speed (no speed-ramping the scroll to fake smoothness).
- Show the reduced-motion version for 3–4 seconds in the film: it is part of the craft.

## Build notes
- Record with Screen Studio, OBS or Chrome DevTools recorder at 60 fps; edit in DaVinci Resolve or Remotion.
- Count contributions with `git shortlog -sn --all` and the GitHub API (PRs merged, first-time contributors). Store the numbers and the command used in `docs/showcase/numbers.md`.
- Store all assets in `docs/showcase/` (stills, film exports, texts). Large video files go to the clan's
  shared drive or GitHub Releases, linked from the folder, not committed to git.
- Gallery notes:
  - **Awwwards:** paid submission; needs title, URL, description, tags, 1600×1200 thumbnail, credits. Core team decides the budget.
  - **CSS Design Awards:** paid submission; similar fields.
  - **Godly** and **Siteinspire:** free, curated; submit the URL and a short note.
- Submit only after XYB-083 is complete and the site has run stable for at least a week.

## Acceptance criteria
- [ ] The case-study post is published, 1,200–2,000 words, with real process images and full contributor credits.
- [ ] Every number in the case study and submissions is backed by `docs/showcase/numbers.md` with its source command.
- [ ] A 60–90 s film exists in 16:9 and 9:16, 60 fps, showing real-speed motion and a reduced-motion moment.
- [ ] Stills exist for every listed page at 1440×900 and 390×844, plus 3 detail crops.
- [ ] Short and long submission texts are written, reviewed against the voice guide (XYB-018), and contain no award claims.
- [ ] Submission decisions (which galleries, budget) recorded by the core team.
- [ ] Submissions sent; their status tracked in `docs/showcase/submissions.md`.
- [ ] No award, badge or "featured on" mark appears on the site unless published by the gallery, with a link.
- [ ] Every contributor in git history is credited (or has asked not to be).
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Paid promotion or ads.
- Changing the site to please a jury after launch (that is a new ticket with its own reason).

## References
- Trait to learn: Linear's and The Browser Company's behind-the-scenes posts — honest process, real artefacts.
- Trait to learn: open-source release notes that thank every contributor by name.
