---
id: XYB-059
title: Code of conduct /conduct and FAQ /faq
phase: 4-pages
type: content
size: S
depends_on: [XYB-018]
skills: [copywriting, community-moderation, nextjs, mdx, accessibility]
good_first_issue: true
---

# XYB-059 — Code of conduct `/conduct` + FAQ `/faq`

## Why this exists (the strategy)
**Claim:** Xyberclan is a safe place to be different. **Proof:** clear rules in plain words, a real way to
report a problem, named people who handle it, and honest answers to the questions people actually ask
before joining.

"A space to be yourself" (from the hero concept) only means something if the clan protects it. This page
is where that promise becomes concrete. The FAQ removes the last doubts before someone joins.

## What the visitor should feel and do
- **Feel:** "I'd be safe here, and I know what to do if something goes wrong." / "My questions are answered."
- **Do:** read, then **Join the clan** — or, if they're a member, **Report a problem**.

## Scope
- `/conduct`: the code of conduct, written in plain language, in a reading layout.
- A **Report a problem** section: how, to whom, what happens next, confidentiality.
- `/faq`: real questions from people who asked before joining, with answers.
- Both pages share one reading template (Read mode).

## Content
| Content | Source |
| --- | --- |
| Code of conduct text | Founders + moderators. Start from Contributor Covenant 2.1 (CC BY 4.0, credit it), rewritten in the clan's voice (XYB-018). |
| Reporting process (channels, response time, who) | Moderators. Real names or roles, and a real contact (email alias, Discord mod-mail). Only promise times the team can keep. |
| Enforcement steps | Moderators (e.g. reminder → warning → temporary ban → removal). |
| FAQ questions (8–15) | Collected from real questions in Discord, DMs and events (XYB-001). Draft examples to validate: "Is it free?", "Do I need to be a developer?", "Is it only in [city]?", "What language do you speak?", "How much time do I need?", "Can I join as a beginner?", "How do events work?", "Who runs Xyberclan?" |
| Answers | Founders/moderators. Short, direct, true. |

Never publish an answer the team cannot stand behind. If the answer is "not yet", say "not yet".

## Page structure

### `/conduct`
1. **The promise.** `h1` "Code of conduct." and one plain sentence at statement size, draft — confirm in
   XYB-018: "Be kind, be curious, make room. Here's what that means in practice." Beside it, the hero blob
   duo arm in arm (inline SVG, still). Its job: warm tone before the rules.
2. **The short version.** 4–6 lines anyone can remember, set large. Its job: most people read only this.
3. **The full code.** Sections with `h2`s: What we expect · What we don't accept · Online and at events ·
   Consequences. Reading column 60–70ch. Its job: completeness.
4. **Report a problem.** Full-field Deep section, high contrast: how to report (each channel with a real
   link), what happens next in an ordered list, confidentiality, and who the moderators are (blobs + names or
   roles). Its job: make reporting easy and trusted.
5. **Credit and updates.** Contributor Covenant credit and "Last updated" date.

### `/faq`
1. **Heading.** `h1` "Questions." + one line.
2. **The answers.** Questions grouped (Joining · Events · The clan · Contributing to this website), each an
   expandable item using `<details>/<summary>`, the first one open. Its job: fast answers.
3. **Still wondering?** "Ask in Discord" link + **Join the clan**.

## Design spec

**1440:** reading column cols 3–9; statement lines up to 36px. Report section field colour Deep with Ground
text (check contrast in XYB-011). FAQ questions at the second size of the type scale, answers at text size.

**768:** same, column ~620px.

**390:** body 17–18px, FAQ summary rows 56px+ tall tap targets, the +/− indicator is a filled shape, not a
line icon in a circle outline.

No borders between FAQ items — space and a tone step on the open item.

## Motion spec
- **Conduct:** short version lines reveal one by one (XYB-023). The rest of the page is still for reading.
- **FAQ:** item open/close animates height (CSS `interpolate-size: allow-keywords` with GSAP fallback),
  the indicator rotates 45°. Blob duo nods once when you open the first item (optional, tiny).
- **Reduced motion:** instant open/close, no reveals.

## Build notes
- Routes: `app/(site)/conduct/page.tsx`, `app/(site)/faq/page.tsx`. Content in
  `content/pages/conduct.mdx` and `content/faq/*.json` or one `faq.mdx` (pick one, document it in XYB-005).
- `<details>` keeps FAQ working without JavaScript and is accessible by default; don't replace it with divs.
- Anchor link per question (`/faq#is-it-free`) for sharing answers in Discord.
- JSON-LD `FAQPage` for the FAQ (XYB-074).
- Mod contacts from env/config, not hard-coded in copy, so they can change.
- Components: `ReadingLayout` (shared with XYB-061), `ReportBlock`, `FaqGroup`, `FaqItem`.

## Acceptance criteria
- [ ] Code of conduct reviewed and approved by at least two moderators (names in the PR).
- [ ] Contributor Covenant credit present with the CC BY 4.0 licence link.
- [ ] Every reporting channel link works and reaches a real person (tested by sending a test report).
- [ ] Every FAQ question comes from a real question listed in XYB-001 notes.
- [ ] FAQ works without JavaScript and by keyboard; every question has a working anchor link.
- [ ] Report section text passes WCAG AA contrast on its field colour.
- [ ] Reading column 60–70 characters on desktop; headings fit two lines at all widths.
- [ ] Layout checked at 1440 / 768 / 390; reduced motion removes animations.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no outlined accordion boxes, no hairline dividers).

## Out of scope
- A reporting form with storage (reports go to the real channels; a form can come later as its own ticket).
- Legal terms and privacy (XYB-061).

## References
- Recurse Center social rules: short, human, memorable.
- Rust and Django community codes: clear enforcement and reporting.
- GOV.UK content design: plain words, short sentences, answer first.
