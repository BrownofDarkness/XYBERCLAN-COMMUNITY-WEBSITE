---
id: XYB-070
title: "Discord integration: live counts and invite"
phase: 5-platform
type: dev
size: M
depends_on: [XYB-002]
skills: [nextjs, typescript, discord-api, caching]
good_first_issue: false
---

# XYB-070 — Discord integration: live counts and invite

## Why this exists (the strategy)
**Claim:** the clan is alive right now, not a dead page about a community that used to exist.
**Proof:** real numbers straight from the place the clan actually lives (Discord): how many members,
how many are online at this moment, and a working door in.

Most community sites lie with round numbers ("10k+ members!") that never change. Ours shows the real
number, updated every few minutes, and is honest when it cannot get it. That honesty is the brand:
*No algorithms. Just chemistry.*

This ticket is the data layer only. The Pulse section (XYB-034), the join flow (XYB-058) and the
footer (XYB-030) display what it returns.

## What the visitor should feel and do
- Feel: "There are real people here, right now."
- Do: trust the number, then press **Join the clan**.

## Scope
- A server-only module that fetches Discord guild stats: `memberCount`, `onlineCount`.
- A cached route handler `GET /api/clan/pulse` that the client can call (no token, no Discord call from the browser).
- A typed result with an explicit "unavailable" state.
- The official invite URL, stored in one place, used by every "Join on Discord" link.
- A tiny React hook `useClanPulse()` for client components that need refresh (e.g. the Pulse section).

## Content
- The guild (server) ID and a permanent invite code, provided by the core team (from XYB-001).
- Decision by the core team: **widget JSON** (no bot, public, gives online count + a sample of online
  members but **not** the total member count) or **bot API** (needs a bot in the server, gives
  `approximate_member_count` and `approximate_presence_count`). Recommended: **bot API**, because the
  total member count is the number that matters.

## Design spec
This ticket ships no visible section, but it defines what consumers must show:
- **Fresh data:** the number, formatted with the locale (`1 284`, `1,284`), tabular figures.
- **Unavailable:** consumers either hide the stat entirely or show an em dash `—` with the label still
  readable ("Members online: —"). Never `0`, never a cached number older than 24 hours, never a made-up value.
- **Loading (client refresh only):** keep the previous number; do not flash a skeleton for a number that is already on screen.

## Motion spec
None in this ticket. Consumers may animate the number counting up **only** from the previous real value
to the new real value (XYB-034 decides). Reduced motion: the number simply changes.

## Build notes
- Files:
  - `src/server/discord.ts` — `getClanPulse(): Promise<ClanPulse>` (import `server-only` at the top).
  - `src/app/api/clan/pulse/route.ts` — GET handler returning JSON, `export const revalidate = 300`.
  - `src/lib/discord-invite.ts` — exports `DISCORD_INVITE_URL` built from the invite code.
  - `src/hooks/use-clan-pulse.ts` — fetches `/api/clan/pulse`, refreshes every 5 min while the tab is visible.
- Type:
  ```ts
  type ClanPulse =
    | { status: "ok"; memberCount: number; onlineCount: number; fetchedAt: string }
    | { status: "unavailable"; reason: "timeout" | "rate_limited" | "error" | "not_configured" };
  ```
- Bot API: `GET https://discord.com/api/v10/guilds/{GUILD_ID}?with_counts=true` with header
  `Authorization: Bot ${DISCORD_BOT_TOKEN}`. The bot needs **no** permissions beyond being in the server.
- Widget alternative: `GET https://discord.com/api/guilds/{GUILD_ID}/widget.json` (widget must be enabled
  in server settings). Map `presence_count` to `onlineCount`; `memberCount` becomes `null` and consumers hide it.
- Env vars (add to `.env.example` with comments, set in Vercel for Production and Preview):
  - `DISCORD_GUILD_ID`
  - `DISCORD_BOT_TOKEN` (server only, **never** prefixed `NEXT_PUBLIC_`)
  - `NEXT_PUBLIC_DISCORD_INVITE_CODE` (public by nature)
- Caching: `fetch(url, { next: { revalidate: 300, tags: ["clan-pulse"] } })`. Five minutes keeps us far
  below Discord rate limits even under traffic spikes.
- Failure handling: 3-second timeout with `AbortSignal.timeout(3000)`; on 429 read `retry_after` and return
  `rate_limited`; on any other error return `unavailable` and log once (no token in logs).
- Missing env vars in local dev return `not_configured` so contributors can run the site without a bot.
- Rotate the bot token if it ever appears in a log, a PR or a screenshot. Write that in the PR description.

## Acceptance criteria
- [ ] `getClanPulse()` returns real `memberCount` and `onlineCount` from the Xyberclan server in Production.
- [ ] The bot token is never sent to the browser: searching the built client bundle (`.next/static`) for the token and for `discord.com/api` finds nothing.
- [ ] `/api/clan/pulse` responds in under 100 ms on a cache hit and revalidates at most every 5 minutes.
- [ ] With Discord blocked (set `DISCORD_GUILD_ID` to a wrong value), the route returns `{ status: "unavailable" }` with HTTP 200, and no page crashes.
- [ ] With no env vars at all, `pnpm dev` runs and consumers see the unavailable state.
- [ ] A 3-second timeout is enforced; a hanging Discord call never blocks page rendering.
- [ ] `useClanPulse()` stops polling when the tab is hidden and resumes when visible.
- [ ] `DISCORD_INVITE_URL` is the only place the invite code lives; `grep` finds no other hard-coded `discord.gg` links.
- [ ] `.env.example` documents every new variable, and the README's "Running locally" section says the bot is optional.
- [ ] Unit tests cover: ok response, 429, timeout, malformed JSON, missing env.
- [ ] Follows the house rules in `docs/creative-direction.md` §4 (no fake numbers, ever).

## Out of scope
- Displaying the numbers (XYB-034, XYB-058, XYB-030).
- Listing member names or avatars from Discord (privacy: members opt in via XYB-072 instead).
- Discord login / OAuth.
- Syncing roles or events from Discord.

## References
- Discord developer docs: Guild resource (`with_counts`), Guild Widget.
- Trait to learn: GitHub's live "x people are viewing" style indicators — small, honest, current.
