---
id: XYB-003
title: CI/CD and preview deploys
phase: 0-foundations
type: dev
size: M
depends_on: [XYB-002]
skills: [github-actions, vercel, playwright]
good_first_issue: false
---

# XYB-003 — CI/CD and preview deploys

## Why this exists (the strategy)
**Claim:** a site built by many hands can still stay fast, accessible and unbroken.
**Proof:** every pull request is checked by machines and gets its own live preview link before a human
reviews it. Quality is protected by default, not by hope.

Design review on a community project only works if reviewers can **see** the change. A preview URL per
PR lets designers review motion and layout on their own phone.

## What the visitor should feel and do
Visitors never see a broken page. Contributors see a green check and a preview link on their PR within minutes.

## Scope
- GitHub Actions workflow `ci.yml` on every PR and on `main`: install, lint, typecheck, build, smoke tests.
- Playwright smoke tests: home page loads, no console errors, `/lab` loads.
- axe accessibility check on the smoke pages (fails on serious/critical issues).
- Lighthouse CI on the preview URL with budgets (start loose, tightened in XYB-081).
- Vercel project connected to the repo: preview deploy per PR, production deploy from `main`.
- Branch protection on `main`: PR required, CI must pass, 1 approval minimum.

## Content
None.

## Design spec
None.

## Motion spec
None. (Later, XYB-081 adds a check that the page passes with `prefers-reduced-motion: reduce` emulated.)

## Build notes
- `.github/workflows/ci.yml`:
  - `pnpm/action-setup` + `actions/setup-node` (Node from `.nvmrc`, pnpm cache).
  - Steps: `pnpm i --frozen-lockfile` → `pnpm lint` → `pnpm typecheck` → `pnpm build` → `pnpm test:e2e`.
- `playwright.config.ts`: run against `pnpm start` locally in CI; projects for Desktop Chrome (1440×900) and Pixel 7 (390 wide).
- `tests/smoke.spec.ts`: visit `/` and `/lab`, assert status 200, assert no `console.error`, run `@axe-core/playwright`.
- `.github/workflows/lighthouse.yml`: triggered by the Vercel `deployment_status` event; run `treosh/lighthouse-ci-action` on the preview URL with `lighthouserc.json`:
  - Performance ≥ 0.8, Accessibility ≥ 0.95, Best practices ≥ 0.95, SEO ≥ 0.95 (to be raised in XYB-081).
- Vercel: framework preset Next.js, install command `pnpm i --frozen-lockfile`. Environment variables listed in `.env.example` only; secrets live in Vercel and GitHub secrets, never in the repo.
- Add a PR comment bot (Vercel does this by default) with the preview link.

## Acceptance criteria
- [ ] Opening a PR triggers CI; the PR shows lint, typecheck, build and e2e checks.
- [ ] A PR with a TypeScript error fails CI.
- [ ] A PR that adds a `console.error` on the home page fails the smoke test.
- [ ] A PR that adds an image without `alt` fails the axe check.
- [ ] Each PR gets a Vercel preview link in a comment within 5 minutes.
- [ ] Lighthouse runs on the preview URL and posts scores; failing budgets fail the check.
- [ ] `main` is protected: no direct pushes, CI required, 1 approval required.
- [ ] CI completes in under 6 minutes on a clean cache-hit run.
- [ ] `.env.example` lists every required variable with a comment; no secrets in the repo.

## Out of scope
- Final performance budgets (XYB-081). Full accessibility audit (XYB-080). Visual regression snapshots (can be a later ticket).

## References
- Trait from large open-source sites (Next.js, Astro): every PR has a preview link and fast checks, so reviewers review the result, not the diff.
