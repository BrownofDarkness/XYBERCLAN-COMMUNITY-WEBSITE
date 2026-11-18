---
id: XYB-075
title: Privacy-first analytics
phase: 5-platform
type: dev
size: S
depends_on: [XYB-002]
skills: [nextjs, analytics]
good_first_issue: true
---

# XYB-075 — Privacy-first analytics

## Why this exists (the strategy)
**Claim:** we respect visitors the way we respect members. *No algorithms. Just chemistry.*
**Proof:** no cookies, no tracking across sites, no cookie banner, and only the numbers the clan really
needs to improve the site: does the path to joining work?

A cookie banner on the first screen would sit on top of the hero, ruin the first impression and say
"we track you". We choose a tool that does not need one.

## What the visitor should feel and do
- Feel: nothing. No banner, no pop-up, no slowdown.
- Do: use the site normally.

## Scope
- Install one cookieless analytics tool for page views.
- Track a small, named set of funnel events.
- A shared dashboard the core team can read.

## Content
- Decision by the core team: **Plausible** (hosted, paid, EU, zero maintenance) or **Umami** (free,
  self-hosted, needs a database). Recommended: Plausible if there is a budget, Umami on Vercel + Supabase if not.

## Design spec
Nothing visible. **Failure state:** if the analytics script is blocked by an ad blocker or fails to load,
the site behaves exactly the same. No errors in the console.

## Motion spec
None.

## Build notes
- Files: `src/lib/analytics.ts` with one function `track(event: AnalyticsEvent, props?)` that is a no-op
  when analytics is not configured, in development, or when the script is missing.
- Events (the only ones allowed; add more only through a new ticket):

  | Event | When | Props |
  | --- | --- | --- |
  | `join_click` | Any **Join the clan** button pressed | `location` (nav, hero, final-call, footer, …) |
  | `blob_maker_started` | First change in the Blob Maker | `entry` (home-teaser, join-page) |
  | `blob_maker_finished` | Blob confirmed | `species`, `colour` |
  | `application_submitted` | Server confirms success (XYB-071) | none |
  | `discord_click` | Any Discord invite link pressed | `location` |
  | `event_rsvp_click` | **Save my spot** pressed | `event` (slug) |

- Never send names, emails, handles, free text or anything that identifies a person.
- Load the script with `next/script` `strategy="afterInteractive"` from our own domain via a rewrite
  (`/stats/js/script.js`) so it is not blocked as third-party and stays fast.
- Env vars: `NEXT_PUBLIC_ANALYTICS_DOMAIN`, and for Umami `NEXT_PUBLIC_UMAMI_WEBSITE_ID`.
- Disabled on Preview deployments (`VERCEL_ENV !== "production"`).
- Set up a funnel/goal in the dashboard: `join_click` → `blob_maker_finished` → `application_submitted`.

## Acceptance criteria
- [ ] Tool decision recorded in the PR.
- [ ] No cookies are set by analytics (check DevTools → Application → Cookies on Production).
- [ ] No cookie banner exists anywhere on the site.
- [ ] Page views appear in the dashboard within a minute of visiting Production.
- [ ] All six events fire from the right places with the right props (checked in the dashboard's realtime view).
- [ ] No event sends personal data; `grep` for `track(` shows only the allowed event names.
- [ ] With an ad blocker on, the site works and the console has no errors.
- [ ] Analytics is off in development and on Preview deployments.
- [ ] The analytics script adds less than 3 KB to the page and does not affect LCP.
- [ ] The privacy page (XYB-061) names the tool and what it collects.

## Out of scope
- Heatmaps, session recordings, A/B testing.
- Marketing pixels (Meta, Google Ads). Not on this site.

## References
- Plausible and Umami docs (proxying the script through Next.js rewrites).
- Trait to learn: sites that show their analytics publicly (Plausible's public dashboards) — transparency as a value.
