---
id: XYB-082
title: Device and browser QA
phase: 6-quality-launch
type: qa
size: M
depends_on: [M3]
skills: [qa, testing, browserstack]
good_first_issue: true
---

# XYB-082 — Device and browser QA

## Why this exists (the strategy)
**Claim:** the site works on the phone in your pocket, not just on the builders' laptops.
**Proof:** a recorded test run on real devices that match what the clan actually uses, including
low-end Android phones that are common in our region.

This is a ticket the whole clan can help with: every member with a different phone is a tester.
It is a good first issue because it needs care and curiosity, not code.

## What the visitor should feel and do
- Feel: the site was made for their device.
- Do: everything — on any device in the matrix.

## Scope
- Define the device and browser matrix.
- Run the test script on every page for every row of the matrix.
- File every bug as its own issue with device, browser, steps and a screenshot or recording.

## Content
- The matrix and results go in `docs/audits/devices-<date>.md`.
- Ask in Discord: "What phone do you browse on?" — add the top 3 answers to the matrix.

## Design spec
The matrix (minimum; add the clan's real devices):

| Device | OS | Browsers |
| --- | --- | --- |
| Low-end Android (e.g. Tecno Spark, Infinix Hot, Samsung Galaxy A0x/A1x — 3–4 GB RAM) | Android 12+ | Chrome, Opera Mini/Opera, Samsung Internet |
| Mid-range Android (e.g. Samsung Galaxy A5x, Pixel 7a) | Android 14+ | Chrome, Samsung Internet, Firefox |
| iPhone SE / 12 mini (small screen) | iOS 17+ | Safari |
| Recent iPhone | iOS 18+ | Safari, Chrome |
| iPad | iPadOS 17+ | Safari (portrait and landscape) |
| Windows laptop | Windows 11 | Chrome, Edge, Firefox |
| MacBook | macOS 14+ | Safari, Chrome, Firefox |
| Large desktop screen (≥ 2560 px wide) | any | Chrome |

**What to check on every page:**
- Layout at that device's width: margins equal on both sides, no horizontal scroll, headlines ≤ 2 lines.
- The hero blobs are there with the first paint (inline SVG) and start moving without a jump; on low-end devices they only bob.
- Scrolling feels smooth; scroll scenes play and never get stuck half-way.
- Every button and link works by touch; nothing needs hover to be usable.
- Forms: the right keyboard appears (email keyboard for email), autofill works, errors are readable.
- Text is readable without zooming; the iOS Safari address bar collapsing does not break full-height sections (`svh`/`dvh` used correctly).
- Dark mode at OS level does not break colours (the site has its own palette; forced colour inversion off).
- Landscape phone orientation still works.
- **Failure state:** with JavaScript disabled, every page is complete with still SVG blobs.

## Motion spec
- On each device, also test with the OS "Reduce motion" setting on (iOS: Accessibility → Motion; Android: Remove animations).
- Note any device where scroll scenes drop frames visibly; send to XYB-081.

## Build notes
- Use real devices where possible (members' phones). Fill gaps with BrowserStack or LambdaTest (free for open source on request).
- Opera Mini (extreme data saving) does not run modern JS: the site must still show content and working links there. That is the no-JS test in real life.
- Use the Vercel Production URL or a release-candidate preview, not localhost.
- Bug issue template: `.github/ISSUE_TEMPLATE/device-bug.yml` with fields device, OS version, browser version, page URL, steps, expected, actual, screenshot/video.
- Label bugs `qa:device` and `severity:blocker|major|minor`. Blockers stop the launch (XYB-083).

## Acceptance criteria
- [ ] The matrix includes at least two low-end Android devices actually used by clan members.
- [ ] Every page in the site map was tested on every row of the matrix; results table in `docs/audits/devices-<date>.md`.
- [ ] Every row was also tested with OS-level reduced motion on.
- [ ] The site was tested with JavaScript off and in Opera Mini; content and links work in both.
- [ ] The Blob Maker and the join form were completed end to end on a low-end Android and an iPhone SE.
- [ ] Every bug found is filed with the device-bug template and labelled with severity.
- [ ] Zero open `severity:blocker` bugs at the end of the ticket.
- [ ] The `device-bug.yml` issue template exists for future reports.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Fixing the bugs found (each gets its own ticket, unless trivially small).
- Internet Explorer and browsers older than two major versions.

## References
- StatCounter: mobile browser and device share for the clan's countries (from XYB-001; check current numbers before choosing devices).
- Trait to learn: sites that feel native on Samsung Internet and Safari alike — they test on both.
