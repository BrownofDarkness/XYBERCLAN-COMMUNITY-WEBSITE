---
id: XYB-004
title: Contribution system
phase: 0-foundations
type: dev
size: S
depends_on: [XYB-002]
skills: [github, writing]
good_first_issue: true
---

# XYB-004 — Contribution system

## Why this exists (the strategy)
**Claim:** the clan builds its own home.
**Proof:** any member can go from "I want to help" to a merged pull request without asking anyone
how. Clear rules, clear templates, clear owners.

This website is itself a clan project. The contribution flow is the first thing new contributors
experience, so it must be as warm and clear as the site.

## What the visitor should feel and do
Contributors should feel welcome and safe to make mistakes. They should find a ticket, claim it, and open a PR the right way the first time.

## Scope
- `CONTRIBUTING.md`: how to set up, pick a ticket, branch, commit, open a PR, get reviewed.
- `.github/ISSUE_TEMPLATE/ticket.yml` (matches `tickets/_TEMPLATE.md`), `bug.yml`, `idea.yml`, and `config.yml`.
- `.github/pull_request_template.md` with the review checklist.
- `.github/CODEOWNERS`: design owners for `components/`, `styles/`, `docs/`; dev owners for `lib/`, `app/api/`.
- GitHub labels (created by `scripts/tickets-to-issues.sh` or by hand): `phase:0`…`phase:6`, `type:design|dev|3d|motion|content|qa`, `size:S|M|L`, `good first issue`, `blocked`, `needs-design-review`.
- Definition of Done (in CONTRIBUTING).
- Commit convention: Conventional Commits with the ticket id, e.g. `feat(hero): XYB-031 add pointer look`.

## Content
Write in plain, simple English. Short sentences. Assume the reader may not be a native speaker and may
be new to Git. Include a short "Your first PR in 10 steps" list with the exact commands.

**Definition of Done** (copy into CONTRIBUTING):
1. Every acceptance criterion in the ticket is checked.
2. Screenshots at 1440, 768 and 390 are in the PR. A screen recording for anything that moves.
3. Works with keyboard only, and with `prefers-reduced-motion: reduce`.
4. Follows the house rules in `docs/creative-direction.md` §4.
5. No placeholder text, no lorem ipsum, no invented facts.
6. CI is green and the preview link works.

## Design spec
None.

## Motion spec
None.

## Build notes
- The PR template contains the Definition of Done as checkboxes plus "Ticket: XYB-___" and "Preview link:".
- Issue forms (`.yml`) use dropdowns for phase, type and size so labels stay consistent.
- Link `CONTRIBUTING.md` and the code of conduct (XYB-059 will write the full one; link a short placeholder `CODE_OF_CONDUCT.md` based on Contributor Covenant 2.1 now, marked as temporary).
- Review rule: anything visual needs one design reviewer; anything in `lib/` or `app/api/` needs one dev reviewer.

## Acceptance criteria
- [ ] `CONTRIBUTING.md` exists and a new member can follow it to open a PR without help (test with one real newcomer).
- [ ] "New issue" on GitHub offers Ticket, Bug and Idea forms.
- [ ] New PRs are pre-filled with the PR template.
- [ ] CODEOWNERS requests the right reviewers automatically.
- [ ] All labels listed above exist with consistent colours.
- [ ] Definition of Done is in CONTRIBUTING and in the PR template.
- [ ] A temporary `CODE_OF_CONDUCT.md` is linked from CONTRIBUTING.

## Out of scope
- The public code of conduct page on the site (XYB-059).
- Bots beyond what GitHub and Vercel give by default.

## References
- Trait from welcoming open-source projects (Excalidraw, Astro): a "your first PR" path and friendly tone that make newcomers stay.
