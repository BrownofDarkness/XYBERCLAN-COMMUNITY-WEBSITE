# Team plan — 7 developers, 6 sprints

Seven people write the code. Each one owns a **lane**: a set of tickets that belong together, so one person
holds the whole picture of their area and nobody waits on a stranger. Lanes are ordered so that all seven can
work from week one.

A sprint is **2 weeks**. Six sprints ≈ 12 weeks from empty repo to launch, with the home page public at the
end of Sprint 4. If the team has less time per week, keep the order and stretch the sprints; do not reorder.

---

## The seven lanes

| Lane | Owner | Owns these tickets | The person who fits |
| --- | --- | --- | --- |
| **A — Platform lead** | _name_ | 002, 003, 004, 052, 074, 075, 081, 083 | The most experienced Next.js dev. Sets up the repo, guards CI and performance, final say on code review. |
| **B — Language & content** | _name_ | 006, 005, 059, 037, 054, 055, 057, 061 | Likes data models and TypeScript. Builds the bilingual foundation and the content layer, then the events and reading pages. |
| **C — Design system** | _name_ | 013, 014, 027, 030, 060, 053 | Best eye for CSS and detail. Builds every shared component; everyone else uses them. |
| **D — Motion** | _name_ | 020, 021, 022, 023, 024, 033, 038 | Knows (or wants to master) GSAP and ScrollTrigger. Owns the clan beat and how the whole site moves. |
| **E — Blobs & character motion** | _name_ | 025, 026, 031, 032, 035, 028 | Comfortable with SVG and GSAP. Brings the blobs to life, owns the hero and the signature scene. |
| **F — Community** | _name_ | 072, 036, 039, 050, 051, 056, 073 | Likes product features. Owns the members directory, profiles, projects and the add-yourself-by-PR ritual. |
| **G — Join & live data** | _name_ | 070, 071, 058, 034, 040 | Likes backend and forms. Owns Discord, the join backend and the Blob Maker, the live heart of the site. |
| **Everyone** | all 7 | 080, 082 | Accessibility and device QA in Sprint 6: each lane tests the pages it built, then swaps with a pair. |

**Not code, but someone must own it** (founders, designer, writers):

| Work | Tickets | Needed by |
| --- | --- | --- |
| Clan facts | 001 | **End of week 1.** Many tickets wait on it. |
| Brand design | 010, 011, 012, 015 | End of Sprint 1 (Lane C needs tokens and type in Sprint 2). |
| Blob illustration in Figma (designer) | 016 | End of Sprint 1 for the hero duo, Sprint 2 for all species. |
| Photos, voice, French | 017, 018, 076 | 018 in Sprint 1; photos at the first event in Sprint 2–3; French review every sprint. |
| Showcase kit | 084 | Sprint 6. |

> Lane E can start from the hero duo SVG alone; the other species slot in as XYB-016 delivers them.

---

## Sprint by sprint

| Sprint | A — Platform | B — Language & content | C — Design system | D — Motion | E — Blobs & motion | F — Community | G — Join & live |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **1 · Ground** (wk 1–2) | 002 (day 1–3), 003, 004 | 006 (after 002), then 005 | Pair on 004; start 013 with the draft tokens from the creative direction | 020 | 025 (start with the hero duo SVG) | Review the 005 schemas with B; prepare 072 | 070 |
| **2 · Language** (wk 3–4) | 075, base of 074 | finish 005, 059 | 013, 014 | 021, 022 | 025 → 026 (hero duo first, other species as 016 lands) | 072 | 071 |
| **3 · Home I** (wk 5–6) | 081 (budget + Lighthouse CI) | 037 | 027, 030 | 023, 024 | 031 hero | 036 | 058 part 1 (Blob Maker) |
| **4 · Home II → M2 launch** (wk 7–8) | M2 launch checks (083, home only) | 054 | 060 | 033, 038 | 032, 035 | 039 | 034, 040 |
| **5 · The whole clan** (wk 9–10) | 052 | 055, 057 | 053 | Motion polish on every page; help C with 053 | Blob performance pass; 028 (optional) | 050, 073 | 058 parts 2–3 (application + confirmation) |
| **6 · Launch** (wk 11–12) | 074 final, 083 | 061; support the French pass (076) | Polish | Polish | Polish | 051, 056 | Hardening of 071 (rate limits, spam, emails in both languages) |
| | **Everyone in Sprint 6:** 080 accessibility, 082 devices. **Founders:** 084. | | | | | | |

**Milestones**
- End of Sprint 1 → **M0 Ground**: the repo builds, deploys a preview per PR, speaks two languages, has content schemas.
- End of Sprint 2 → **M1 Language**: tokens, components and the motion engine exist in `/lab`.
- End of Sprint 4 → **M2 Home**: the home page is public, in English and French.
- End of Sprint 5 → **M3 The whole clan**: every page, the full join flow.
- End of Sprint 6 → **M4 Launch**.

---

## How seven people stay in sync

- **One shared foundation first.** Sprint 1 is the only time people wait on each other. XYB-002 lands in
  the first three days, XYB-006 (bilingual) and XYB-005 (content) by the end of week 2. Nobody builds a page
  before those three are merged.
- **`/lab` is the meeting point.** Lanes C, D and E publish everything they make to `/lab` first. Page
  builders use only what is in `/lab`, so nobody writes a second button or a second fade.
- **Review pairs.** Every PR needs one review from the pair lane, plus Lane A for anything touching config,
  CI or dependencies:
  - A ↔ B (platform and data), C ↔ D (components and motion), E ↔ D (blobs and motion), F ↔ G (product features).
  - A French copy owner reviews any PR that changes French text (label `needs-fr-review`, XYB-076).
- **CODEOWNERS** (set up in XYB-004) maps each lane's folders to its owner: `lib/motion/` → D,
  `lib/blob/` and `components/blob/` → E, `components/ui/` → C, `messages/` and `content/` schemas → B, `app/api/` → G.
- **Async stand-up** in Discord, every weekday: yesterday, today, blocked by.
- **Demo day** at the end of every sprint: each lane shows its work on the preview URL, in **both languages**
  and on a **real phone**. 10 minutes per lane.
- **Small PRs.** One ticket = one PR. If a PR grows past ~600 changed lines, split it.
- **Blocked for more than a day?** Say it in the stand-up. Lane A decides: wait, stub it, or swap tickets.

---

## Rules every developer follows

1. Read `docs/creative-direction.md` and `docs/i18n.md` before your first PR.
2. No hard-coded text. Every string goes in `messages/en.json` and `messages/fr.json`.
3. Every PR shows screenshots at 1440, 768 and 390, **in English and French**, and a recording if it moves.
4. Every PR is checked with `prefers-reduced-motion` on and with the keyboard only.
5. Tick every acceptance box in the ticket yourself before asking for review.
