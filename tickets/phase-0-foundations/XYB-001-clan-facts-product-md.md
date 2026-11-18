---
id: XYB-001
title: Clan facts & PRODUCT.md
phase: 0-foundations
type: content
size: M
depends_on: []
skills: [writing, interviewing, community-knowledge]
good_first_issue: false
---

# XYB-001 — Clan facts & PRODUCT.md

## Why this exists (the strategy)
**Claim:** the website can only feel like Xyberclan if it is built from things that are true about Xyberclan.
**Proof:** a single file, `PRODUCT.md`, that holds the real facts, numbers, places, rituals and people.
Every other ticket reads from it.

Sites that look "generic" are generic because they were built from category ideas ("a community",
"tech people", "collaboration"). Sites that win awards are built from the subject's own details: its
name and what it means, its city, its rituals, its numbers, its constraints. This ticket collects those
details **before** anyone designs or writes a headline. Nobody may invent a fact about the clan in any
other ticket. If a fact is missing, it gets added here first.

## What the visitor should feel and do
This ticket is not seen by visitors. Contributors should feel: "I know who we are building for."
Contributors should do: open `PRODUCT.md` whenever they need a fact, a number or a word.

## Scope
- Interview the founders and 3–5 active members (30 minutes each, voice or chat).
- Write `PRODUCT.md` at the repo root with the sections below.
- Write the **subject inventory**: 10–15 things that belong to Xyberclan and to no other community.
- List what imagery truly exists today (photos, videos, screenshots, artwork) and where it lives.
- List what is still unknown, with an owner for each answer.

## Content
The founders answer these questions. Write the answers in full sentences. Write "unknown" if you do
not know. Never guess.

**Identity**
1. What does the name "Xyberclan" mean? Why the X? Why "clan"? Who chose it, and when?
2. When was the clan founded (month and year)? What happened that day?
3. In one sentence, what is Xyberclan? In one sentence, what is it **not**?
4. Who started it? (Names only with their consent.)

**People**
5. How many members today? How do you count a member (Discord join, application accepted, active in last 30 days)?
6. Which crafts are in the clan (developers, designers, security, data, students, makers, writers...)? Rough share of each.
7. Which cities and countries do members live in? Is there a home city?
8. The site is bilingual (English + French). Which is the clan's **main** language, so it becomes the default (XYB-006)? Any third language spoken a lot?
9. Who should **not** join? (This sharpens who should.)

**Places and channels**
10. Where does the clan live online? (Discord server, WhatsApp, GitHub org, X, LinkedIn, Instagram, YouTube.) Give the real links.
11. Where does the clan meet in person, if anywhere? Exact venues, neighbourhoods.

**Rituals and rhythm**
12. What happens every week? Every month? (Build nights, talks, study groups, code reviews, games.)
13. What are the clan's inside jokes, words or habits that only members know?
14. What is the best thing that has happened in the clan so far? A real story with names (with consent).

**Work**
15. What projects have members shipped together? Name, link, who, one line each.
16. Which events have happened? Date, place, number of people, photos?
17. What events are planned for the next 6 months?

**Rules and values**
18. Is there a code of conduct? Who moderates? How do you report a problem?
19. What does "No algorithms. Just chemistry." mean to the founders, in their own words?
20. How does someone join today, step by step? Is there an application? Is it free?

**Brand**
21. Who designed the hero concept (`docs/assets/hero-concept.png`)? Do we have the Figma file?
22. Which typefaces are in that file, and are they licensed for web use?
23. Who drew the blob mascots? Do source files exist (Figma, Illustrator)? Can they draw the 2D species set?

## Design spec
`PRODUCT.md` structure (Markdown, no styling):

```
# Xyberclan — PRODUCT.md
## In one sentence
## The name
## Who is in the clan        (numbers with date and source)
## Where we live              (links, places)
## Rhythm and rituals
## What we have made          (projects, events)
## How to join
## Values and conduct
## Subject inventory          (10–15 items)
## Imagery we really have     (table: item, where it lives, who owns it, consent yes/no)
## Unknowns                   (table: question, owner, due date)
## Sources                    (who was interviewed, when)
```

**Subject inventory** examples of the *kind* of item (not facts — fill with real ones): the meaning of
the name, the street or venue where meetups happen, the day and hour of the weekly ritual, the number
of members at a real date, the first project the clan shipped, a word only members use, the colour of
something in the clan's world. Each item is one line. The idea sentence in the creative direction
draws from this list.

## Motion spec
None. This is a content ticket.

## Build notes
- File: `/PRODUCT.md` at the repo root. Link it from the root `README.md`.
- Every number has a date and a source next to it: `214 members (Discord, 2026-11-20)`.
- Personal names and photos only with written consent. Note consent in the imagery table.
- Keep interview notes out of the repo if they contain private details; store a summary only.

## Acceptance criteria
- [ ] `PRODUCT.md` exists at the repo root and every section above is present.
- [ ] All 23 questions are answered or marked "unknown" with an owner in the Unknowns table.
- [ ] The subject inventory has at least 10 items, each specific to Xyberclan (the competitor test: none of them would be true of another community).
- [ ] Every number has a date and a source.
- [ ] Every link in "Where we live" opens the right place.
- [ ] The imagery table lists every real photo, video and design file available, with consent status.
- [ ] At least two founders have read the file and approved it in the PR.
- [ ] No invented facts. A reviewer can trace every statement to a source in the Sources section.

## Out of scope
- Writing website copy (that starts in XYB-018 and the section tickets).
- Designing anything.
- Collecting photos (XYB-017 does the shoot; this ticket only lists what exists).

## References
- The "subject inventory" method in `docs/creative-direction.md` §1 (the competitor test).
- Good community "about" pages (Are.na, Recurse Center): the trait is specificity — real dates, real rituals, real names.
