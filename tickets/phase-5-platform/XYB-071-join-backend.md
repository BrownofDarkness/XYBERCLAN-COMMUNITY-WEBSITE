---
id: XYB-071
title: Join application backend
phase: 5-platform
type: dev
size: L
depends_on: [XYB-005]
skills: [nextjs, typescript, zod, postgres, supabase, email]
good_first_issue: false
---

# XYB-071 — Join application backend

## Why this exists (the strategy)
**Claim:** joining Xyberclan is a real, human, safe process, not a newsletter sign-up.
**Proof:** your application reaches real moderators within minutes, you get a warm confirmation
straight away, your data is stored safely, and you can ask for it to be deleted at any time.

The Blob Maker (XYB-058) is the most delightful moment of the site. If the submit button behind it
fails, spams moderators or leaks data, the whole story breaks. This ticket makes sure it never does.

## What the visitor should feel and do
- Feel: "Someone will actually read this."
- Do: submit once, get a clear confirmation, know what happens next and when.

## Scope
- A server action `submitApplication()` (or route handler `POST /api/join`) that validates, checks the
  bot challenge, rate-limits, stores, notifies moderators and emails the applicant.
- One zod schema shared by the form (client) and the server.
- Storage table + security rules.
- Moderator notification to a private Discord channel.
- Confirmation email.
- Data retention rule and a delete-request path.

## Content
- Form fields (final list confirmed with XYB-058 and XYB-018):
  `name`, `email`, `handle` (optional), `city`, `crafts` (multi-select from a fixed list), `why`
  (free text, 20–600 characters), `howDidYouHear` (optional), `blob` (the Blob Maker config JSON),
  `consentConduct` (must be true), `consentContact` (must be true).
- Copy for the confirmation email and the success screen: from XYB-018, signed by a real moderator name.

## Design spec
The form UI lives in XYB-058. This ticket defines the states it must render:
- **Submitting:** button shows "Sending…" and is disabled; the form stays readable.
- **Success:** "You're in the queue. A moderator will reply within 72 hours." + their blob, waving.
- **Field errors:** next to the field, linked with `aria-describedby`, in plain words ("Tell us a bit more — at least 20 characters").
- **Server down / unknown error:** "We couldn't send this. Your answers are saved on this device — try again in a minute." Data is kept in `sessionStorage`, never lost.
- **Rate-limited:** "You've already sent an application. Check your inbox, or write to us."

## Motion spec
None here (XYB-058 owns it). Error states never shake the whole form; only the field message appears.

## Build notes
- **Decision for the core team: storage.** Recommended: **Supabase Postgres** (free tier, row-level
  security, EU region available, dashboard moderators can use). Alternatives: Airtable (easy for
  non-devs, weaker security), Notion DB, plain email only. Record the decision in the PR.
- Table (Supabase):
  ```sql
  create table applications (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    email citext not null,
    handle text,
    city text,
    crafts text[] not null default '{}',
    why text not null,
    how_did_you_hear text,
    blob jsonb not null,
    status text not null default 'pending' check (status in ('pending','accepted','declined','deleted')),
    reviewed_by text,
    ip_hash text not null
  );
  alter table applications enable row level security;
  -- no policies for anon: only the service role (server) can insert/read
  create unique index applications_email_pending on applications (email) where status = 'pending';
  ```
- Files:
  - `src/lib/schemas/application.ts` — the zod schema, imported by the form and the action.
  - `src/server/join/submit.ts` — the server action.
  - `src/server/join/notify-discord.ts`, `src/server/join/send-email.ts`.
  - `src/emails/application-received.tsx` — React Email template.
- Bot protection: **Cloudflare Turnstile** (invisible/managed mode). Verify the token server-side at
  `https://challenges.cloudflare.com/turnstile/v0/siteverify` before anything else.
- Rate limit: 3 submissions per IP hash per hour and 1 pending application per email. Use Upstash
  Redis (`@upstash/ratelimit`) or a Postgres check. Store only a salted SHA-256 of the IP, never the raw IP.
- Moderator notification: Discord webhook to a private `#join-queue` channel. Message: name, city,
  crafts, first 200 characters of `why`, link to the record in the Supabase dashboard. No email address in Discord.
- Email: **Resend** from `hello@<domain>`; SPF/DKIM set up in XYB-083. If email fails, the application is
  still saved and the success screen still shows; log the failure.
- Order of operations: validate → Turnstile → rate limit → insert → (in parallel, non-blocking) webhook + email.
  Only a failed insert shows an error to the visitor.
- Env vars: `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `TURNSTILE_SECRET_KEY`,
  `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `DISCORD_JOIN_WEBHOOK_URL`, `RESEND_API_KEY`, `IP_HASH_SALT`,
  `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`. Document all in `.env.example`.
- Retention: declined applications are deleted after 90 days, accepted ones after the member profile
  is created (XYB-072) or after 12 months. A scheduled Supabase function or Vercel cron (`/api/cron/retention`, protected by `CRON_SECRET`) runs nightly.
- Delete requests: the privacy page (XYB-061) gives `privacy@<domain>`; a moderator runbook in
  `docs/runbooks/delete-request.md` explains how to find and hard-delete a record within 30 days.

## Acceptance criteria
- [ ] Storage decision recorded in the PR and in `docs/decisions/`.
- [ ] The same zod schema validates on the client and the server; changing a rule in one place changes both.
- [ ] A request without a valid Turnstile token is rejected with 400 and stores nothing.
- [ ] A fourth submission from the same IP within an hour returns the rate-limited state.
- [ ] A second pending application with the same email is refused politely.
- [ ] The service role key is never in the client bundle (search `.next/static`).
- [ ] RLS is on: the anon key cannot read or insert into `applications` (tested with a script).
- [ ] The Discord message arrives in `#join-queue` within 10 seconds and contains no email address.
- [ ] The confirmation email arrives, renders in Gmail and Apple Mail, and passes a spam test (mail-tester ≥ 8/10).
- [ ] If Resend or Discord is down, the application is still stored and the visitor still sees success.
- [ ] If the database insert fails, the visitor sees the friendly error and their answers survive a page reload.
- [ ] The nightly retention job deletes declined applications older than 90 days (tested with a seeded row).
- [ ] `docs/runbooks/delete-request.md` exists and a moderator who is not a developer can follow it.
- [ ] Bilingual: every visible string comes from `messages/*.json` or localized content (XYB-006); the section works in English and French, and every headline still fits two lines in French at 1440, 768 and 390.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- The form UI and the Blob Maker (XYB-058).
- A moderator admin dashboard (use the Supabase dashboard for now).
- Automatic Discord role assignment.
- Payments of any kind.

## References
- Trait to learn: Recurse Center's application — human, honest about timing and what happens next.
- Supabase RLS docs, Cloudflare Turnstile docs, React Email + Resend docs.
