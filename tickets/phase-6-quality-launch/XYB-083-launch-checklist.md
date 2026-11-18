---
id: XYB-083
title: Content QA and launch checklist
phase: 6-quality-launch
type: qa
size: S
depends_on: [XYB-080, XYB-081, XYB-082]
skills: [qa, content, dns, vercel]
good_first_issue: false
---

# XYB-083 — Content QA and launch checklist

## Why this exists (the strategy)
**Claim:** on launch day, everything on the site is true, credited, consented to and working.
**Proof:** a checklist, ticked line by line by two people, kept in the repo as a record.

The fastest way to lose a community's trust is to launch with a "Lorem ipsum", a photo someone did not
agree to, a broken Join button, or a fake number. This ticket is the last gate before the world sees the
clan's work.

## What the visitor should feel and do
- Feel: everything works and everything is real.
- Do: join, share, come back.

## Scope
- Run the checklist below on the release candidate.
- Fix small issues directly; block the launch on anything in the **Blockers** list.
- Flip DNS and announce.

## Content
- `docs/launch/checklist-<date>.md`: a copy of the checklist below with each box ticked and initialled by two people.
- `docs/launch/consent-register.md`: every photo and quote on the site, who is in it, who agreed, and when.

## Design spec
Not a design ticket. Visual checks are in the checklist (headlines, margins, empty stretches).

## Motion spec
Final check: every scroll scene starts, finishes and rests correctly on desktop and phone, and in reduced motion.

## Build notes
The checklist (copy into the launch doc):

**Content — Blockers**
- [ ] No placeholder text anywhere: search the built HTML for `lorem`, `ipsum`, `TODO`, `TBD`, `xxx`, `example.com`, `placeholder`.
- [ ] No invented numbers, members, testimonials, logos or partners (creative-direction §4). Every number traces to a source.
- [ ] Every photo of a person is in the consent register with written consent.
- [ ] Every quote (XYB-039) is in the consent register, approved by the person, with their real name or chosen handle.
- [ ] Every found/licensed image or clip is credited in the footer credits and in `docs/credits.md`, with licence and source.
- [ ] Every member profile has `consent.publicProfile: true`.

**Content — Quality**
- [ ] Spell-check pass in every language (English and French, signed off by a French copy owner, XYB-076).
- [ ] Action labels match the voice guide everywhere: **Join the clan**, **Meet the clan**, **Make your blob**.
- [ ] Every headline ≤ 2 lines at 1440, 768, 390.
- [ ] Dates, times and timezones of upcoming events are correct.

**Function — Blockers**
- [ ] Join flow end to end on Production: Blob Maker → submit → moderator Discord message → confirmation email.
- [ ] Discord invite link works and does not expire (permanent invite).
- [ ] Every internal link resolves (run a link checker such as `lychee` on the built site); no 404s except the 404 page itself.
- [ ] External links open the right pages; social links are the real accounts.
- [ ] Redirects for any old URLs (old site, short links like `/discord`, `/join`) are in `next.config` and tested.
- [ ] No open `severity:blocker` issues from XYB-080, XYB-081, XYB-082.

**Platform**
- [ ] Production env vars set in Vercel for every service (Discord, Supabase, Turnstile, Resend, analytics); none of them are preview keys.
- [ ] Analytics receives page views and the six funnel events (XYB-075).
- [ ] Share images render for home, a member, an event and a project (XYB-073).
- [ ] Favicon, Apple touch icon, manifest icons and theme colour present (XYB-010).
- [ ] `robots.txt` allows indexing on Production; `sitemap.xml` is submitted to Google Search Console and Bing Webmaster Tools.
- [ ] Privacy page, conduct page and legal notice live and linked from the footer (XYB-059, XYB-061).
- [ ] Email domain: SPF, DKIM and DMARC records set for the Resend sending domain.

**Domain and DNS**
- [ ] Domain points to Vercel; `www` redirects to apex (or the reverse, decided once).
- [ ] HTTPS valid on both; HSTS enabled.
- [ ] DNS TTL lowered 24 h before the switch, restored after.

**After launch (first 48 hours)**
- [ ] Watch Vercel logs and Speed Insights for errors and slow pages.
- [ ] Watch the `#join-queue` channel: applications arrive.
- [ ] A rollback plan exists: the previous deployment can be promoted in one click; who does it is named.

## Acceptance criteria
- [ ] `docs/launch/checklist-<date>.md` exists with every line ticked and initialled by two different people.
- [ ] `docs/launch/consent-register.md` covers every person-photo and quote on the site.
- [ ] `docs/credits.md` lists every third-party asset with licence and source.
- [ ] Link checker report attached to the PR with zero broken links.
- [ ] A real test application went through end to end on Production and was then deleted.
- [ ] The rollback owner is named in the launch doc.
- [ ] Launch announcement posted in the clan's Discord with thanks to every contributor (list generated from git history).
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- New features or design changes. If it is not on the checklist, it waits for after launch.
- The gallery submissions (XYB-084).

## References
- Trait to learn: GOV.UK service "go live" assessments — a calm, written gate rather than a rush.
