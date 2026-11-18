---
id: XYB-018
title: Voice and UX copy guide
phase: 1-brand-system
type: content
size: M
depends_on: [XYB-001]
skills: [copywriting, ux-writing, english, french]
good_first_issue: false
---

# XYB-018 — Voice and UX copy guide

## Why this exists (the strategy)
**Claim:** Xyberclan sounds like a person you would want to sit next to.
**Proof:** one voice used on every page, every button and every error message. The same words for the
same things everywhere. A clear guide so 20 contributors write like one clan.

## What the visitor should feel and do
Feel: welcomed, not sold to. Do: understand every label without thinking, and always know the next step.

## Scope
- Voice principles with examples (do / don't).
- Vocabulary list (words we use, words we never use).
- The CTA naming map (one label per action, site-wide).
- Patterns for headlines, supporting sentences, buttons, form labels, hints, errors, empty states, success messages, 404.
- The **copy deck** for the home page (all section headlines and supporting sentences), reviewed against the two-line rule.
- The site is bilingual. The French voice rules (tu/vous, glossary) are written with the French copy owners in XYB-076.

## Content
**Voice:** warm, direct, a little playful, never corporate. Short sentences. Talk to one person ("you"). Speak as the clan ("we"). Humour from the blobs, clarity from the words.

| Do | Don't |
| --- | --- |
| "Find your people." | "Leverage our vibrant ecosystem." |
| "Next build night: Friday, 18:00." | "Stay tuned for exciting upcoming events!" |
| "We read every application. Expect an answer within 7 days." | "Your submission has been received." |

**Vocabulary:**
- Use: members, the clan, build, make, ship, meet, show up, blob.
- Never: users, customers, ecosystem, synergy, leverage, cutting-edge, revolutionary, "join thousands" (unless the real number is thousands, with a date).

**CTA naming map** (from `docs/creative-direction.md` §5 — these exact words, everywhere):

| Action | Label | Where |
| --- | --- | --- |
| Apply / become a member | **Join the clan** | Nav, hero, final call, /join |
| Members directory | **Meet the clan** | Hero secondary, members preview |
| Make your avatar | **Make your blob** | Final call teaser, /join |
| Event detail | **See the event** | Event tickets |
| RSVP | **Save my spot** | Event page |
| Project detail | **See the project** | Built by the clan |
| Read a story | **Read the story** | Journal |

The hero concept uses "Find your people", "Explore the clan" and "Join the clan" for overlapping actions.
"Find your people" stays as **copy** (a sentence), not as a button label. XYB-031 applies this.

**Error message pattern:** what happened + what to do, in plain words, no blame, no codes.
- Field: "Add your email so we can answer you." (not "Email is required")
- Format: "That email looks incomplete. Check the part after @." (not "Invalid email")
- Server: "Something broke on our side. Your answers are saved. Try again in a minute." (+ retry button)
- Offline: "You're offline. We'll send this when you're back."

**Empty states:** say why it is empty and what to do. "No events this month yet. Members plan them on Discord — come and plan one."

**Success:** specific and human. "You're in the queue. A real person reads every application. Expect an answer by email within 7 days." (Only if that is true — check with founders.)

## Design spec
- **Headlines:** ≤ 2 lines at every width. About 32 characters is safe at display size. Count before you commit.
- **Supporting sentence:** one sentence, ≤ 25 words, directly under the headline.
- **Buttons:** verb first, 1–4 words, sentence case.
- **No** eyebrow labels, no all-caps, no exclamation marks in UI (one allowed in a celebration message).
- Numbers: digits, not words. Dates: "Fri 20 Nov, 18:00" style (decide the format once, both languages).

## Motion spec
None. (Microcopy may appear with motion; the words must make sense before any animation.)

## Build notes
- Write `docs/brand/voice.md` (principles, vocabulary, patterns) and `docs/copy/home.md` (the home page copy deck, section by section, in scroll order matching Phase 3 tickets).
- Put UI strings (buttons, errors, empty states) in `messages/en.json` and `messages/fr.json` (XYB-006), never hard-coded in components.
- Every fact in the copy deck links to its source in `PRODUCT.md`.

## Acceptance criteria
- [ ] `docs/brand/voice.md` exists with principles, do/don't, vocabulary and all message patterns.
- [ ] CTA naming map is final and matches `docs/creative-direction.md` §5.
- [ ] `docs/copy/home.md` contains a headline + supporting sentence for every Phase 3 section (XYB-031 → XYB-040).
- [ ] Every headline in the copy deck is ≤ 32 characters or tested to fit 2 lines at 390 and 1440.
- [ ] `lib/copy/en.ts` holds all shared UI strings.
- [ ] No banned words in the copy deck (grep check in PR).
- [ ] Every claim in the copy deck has a source in `PRODUCT.md`; no invented numbers.
- [ ] Two founders and one non-native English-speaking member reviewed the copy for clarity.

## Out of scope
- Long-form manifesto text for `/mindset` (XYB-053). French review (XYB-076).

## References
- Trait from Arc / The Browser Company and Mailchimp's content style guide: human, specific, kind.
- Trait from GOV.UK writing: plain words, short sentences, errors that tell you how to fix them.
