---
id: XYB-076
title: French voice, glossary and bilingual review
phase: 5-platform
type: content
size: L
depends_on: [XYB-006, XYB-018]
skills: [french, copywriting, review]
good_first_issue: false
---

# XYB-076 — French voice, glossary and bilingual review

## Why this exists (the strategy)
**Claim:** the French site is as good as the English one, written for French readers, not translated for them.
**Proof:** two named French copy owners write and approve every French string. A shared glossary keeps the
clan's words consistent. A final review pass catches anything that slipped.

XYB-006 builds the machine for two languages. Every page ticket ships both languages. This ticket owns the
**quality** of the French: the voice, the words, and the final check before launch. A half-good French site
is worse than none, because it tells French speakers they are an afterthought.

## What the visitor should feel and do
- Feel: "This was written in French", not "this was translated".
- Do: read, join and take part entirely in French without ever falling back to English by accident.

## Scope
**Part A — Owners and voice (start in Sprint 1, size S):**
- Name two **French copy owners** (members who write French well). Every French string needs one of their approvals.
- Add a French section to the voice guide (XYB-018): **tu** or **vous** (recommended: **tu**, it matches
  the clan's warmth; the core team decides), tone, sentence length, what to avoid (anglicisms where a good
  French word exists, but keep the clan's own words like "blob").
- Start `docs/glossary.md`: every clan word in both languages (clan, member, blob, species, craft, the beat,
  sprint, event types, program names). One translation per word, used everywhere.

**Part B — Ongoing review (every sprint):**
- French copy owners review the French in every PR that adds text (label `needs-fr-review`).
- They can write the French themselves when the developer only has English.

**Part C — Final bilingual pass (Sprint 6, before launch):**
- Read every page in French on a phone, start to finish.
- Check headlines fit two lines (the XYB-006 Playwright test plus a human read).
- Check French typography, accents, apostrophes (’ not '), « » quotes.
- Check emails (XYB-071), share images (XYB-073), metadata (XYB-074) and error messages in French.

## Content
- `docs/glossary.md` (both languages, one row per term).
- The French part of the voice guide (XYB-018).
- French for: home, `/inside`, `/mindset`, `/join`, `/conduct`, `/faq`, legal, events, projects, all UI
  strings, emails, share images, metadata.
- Member-written content (bios, journal posts, quotes) stays in the language it was written in.

## Design spec
- No design work. But the owners have authority to ask for a layout change when French cannot fit without
  losing meaning. The fix is never smaller type for French only.
- What the visitor sees on failure: if a page has no French yet, the XYB-006 fallback note. That note must
  never appear on launch day for core pages (home, join, inside, mindset, conduct, faq, legal).

## Motion spec
None. Check that French text reveals (XYB-022) do not split words wrongly during Part C.

## Build notes
- GitHub label `needs-fr-review`, added automatically when a PR changes `messages/*.json` or localized content
  (a small Action, or a CODEOWNERS entry for the French owners on `messages/fr.json` and `*.fr.mdx`).
- Machine translation is allowed **only** as a private first draft for the owners. It never merges unreviewed.
- Keep `docs/glossary.md` in sync with `messages/*.json` keys for clan terms.

## Acceptance criteria
- [ ] Two French copy owners are named in `docs/decisions/french-owners.md`.
- [ ] Tu/vous decision recorded in the voice guide.
- [ ] `docs/glossary.md` covers every clan term used on the site.
- [ ] CODEOWNERS (or an Action) requests a French owner's review on any change to French text.
- [ ] Every core page has French approved by an owner; none shows the fallback note.
- [ ] Emails, share images and metadata exist and read well in French.
- [ ] Headline test green in French at 1440, 768 and 390, and a human read found no awkward cut.
- [ ] French typography correct everywhere (U+202F spaces, ’, « »).
- [ ] No string on the site was machine-translated without an owner's approval.

## Out of scope
- The routing and tooling (XYB-006).
- Languages other than English and French.
- Translating member-written content.

## References
- Trait: Stripe and Airbnb rewrite copy per language; their French pages read as if written in French.
