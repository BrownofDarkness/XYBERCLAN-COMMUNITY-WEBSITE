---
id: XYB-006
title: Bilingual foundation (English + French)
phase: 0-foundations
type: dev
size: L
depends_on: [XYB-002]
skills: [nextjs, next-intl, typescript, playwright]
good_first_issue: false
---

# XYB-006 — Bilingual foundation (English + French)

## Why this exists (the strategy)
**Claim:** Xyberclan speaks the languages its people speak, English and French, on every page from day one.
**Proof:** every route exists in both languages, every button and error speaks both, and the French is
written by people, not machines.

*Different minds* includes people who think in French. A site that is English-first with French "coming
later" tells them they are second. And bilingual is a **foundation**, not a feature: the language sits in
every URL, every string, every content file and every headline length. Added at the end, it means
rebuilding every page. Added now, it costs each later ticket almost nothing.

**This ticket must be merged before any page or component with text is built (Phase 3 and 4, XYB-014, XYB-030).**

## What the visitor should feel and do
- Feel: "This was written for me", in either language.
- Do: arrive in their language automatically, switch once if they want, and stay in it everywhere.

## Scope
- Locale routing for `en` and `fr` with next-intl.
- Message files for UI strings, typed, with a check that both languages have the same keys.
- The content model for two languages (works with XYB-005).
- A `LanguageLink` component (used later in the nav and footer, XYB-030).
- Locale-aware helpers for dates, times, numbers and French typography.
- Tests that protect the two-line headline rule in French.
- A short guide in `docs/i18n.md` for the other six developers.

## Content
- `messages/en.json` and `messages/fr.json` with the first shared strings: nav labels, the CTA map from
  `docs/creative-direction.md` §5, skip link, menu open/close, language link, 404 basics.
- French drafts for the CTA map (draft — confirm in XYB-018 and XYB-076):

  | English | French (draft) |
  | --- | --- |
  | Join the clan | Rejoindre le clan |
  | Meet the clan | Rencontrer le clan |
  | Make your blob | Créer mon blob |
  | See the event | Voir l'événement |
  | Save my spot | Réserver ma place |
  | Different minds. One frequency. | Des esprits différents. Une seule fréquence. |

- **Default language:** a single config value, set from the answer to question 8 in XYB-001 (the clan's main
  language). Until it is answered, use `en`.

## Design spec
- **Language link:** never an "EN · FR" pair (dot separators are ornament). One link that names the other
  language in that language: **Français** on English pages, **English** on French pages, with
  `hreflang` and `lang` attributes on the link.
- **French runs about 20% longer.** Every headline must fit in two lines in **both** languages at 1440, 768
  and 390. If French does not fit, rewrite the French. Never shrink the type for one language.
- **French typography:** a narrow non-breaking space (U+202F) before `: ; ! ?` and inside « ». The helper
  does this automatically for message strings.
- **Missing translation:** the page shows in the other language with one plain sentence at the top
  ("Cette page n'existe qu'en anglais pour l'instant." / "This page is only in French for now."). Never a 404.

## Motion spec
- Switching language keeps the visitor on the equivalent page and uses the normal page transition (XYB-024).
- Text reveal (XYB-022) must split French correctly: never split inside `l'équipe`, `aujourd'hui`, or on « ».
  This ticket adds French test strings to `/lab/motion` so XYB-022 can check it.

## Build notes
- **Library:** `next-intl` (App Router, server components, typed messages).
- **Routes:** `app/[locale]/(site)/...`. Use `localePrefix: "as-needed"`: the default language has no prefix,
  the other gets one (`/fr/clan` or `/en/clan`). Slugs stay the same in both languages (`/fr/clan/ada`), so
  links and share images stay simple.
- **Detection:** middleware reads `Accept-Language` **only on the first visit**. After that the choice is in
  a `NEXT_LOCALE` cookie (functional, no consent needed). A manual choice is never overridden.
- **Messages:** `messages/{en,fr}.json`, nested by area (`nav.*`, `home.hero.*`, `join.*`, `errors.*`).
  Type them with next-intl's `AppConfig` so a missing key is a type error.
- **`pnpm i18n:check`:** fails if a key exists in one file but not the other, or if a value is empty. Runs in CI (XYB-003).
- **Content model (with XYB-005):**
  - Site-written content (spaces, programs, FAQ, events, projects, mindset, legal): localized fields
    `{ en: string; fr: string }` via a shared zod helper `localized()`. The build fails if a required
    language is missing on a published entry.
  - Long-form MDX: one file per language, `name.en.mdx` / `name.fr.mdx`, linked by the same slug.
  - Member-written content (bios, journal posts, quotes): written in **one** language, with a `lang` field.
    Shown as written, wrapped in an element with the right `lang`. Never machine-translated.
- **Helpers in `lib/i18n/`:** `formatDate`, `formatTime` (with the event's time zone), `formatNumber`,
  `formatRelative` (all on `Intl`), and `frenchSpacing(text)`.
- **`<html lang>`** set per locale in the root layout.
- **Playwright test** `e2e/headlines.spec.ts`: loads every route in both languages at 390, 768 and 1440 and
  fails if any `h1`/`h2` is taller than two line-heights. Later tickets add their routes to the list.
- **SEO:** hand `hreflang` alternates and `x-default` to XYB-074 through one helper, `alternatesFor(path)`.
- Write `docs/i18n.md`: how to add a string, how to add localized content, how to check headline length, what
  never to do (hard-coded text in components, machine translation).

## Acceptance criteria
- [ ] `/` and `/fr` (or `/en`, whichever is not the default) both render with the right `<html lang>`.
- [ ] Changing the default language is a one-line config change and is documented.
- [ ] First visit with a French browser goes to French; choosing English with the link keeps English on every later visit.
- [ ] `LanguageLink` keeps you on the equivalent page and works with keyboard and screen reader.
- [ ] `pnpm i18n:check` runs in CI and fails on a missing key (shown in the PR with a deliberate test).
- [ ] The `localized()` zod helper exists and the build fails when a published entry is missing a language.
- [ ] Date, time and number helpers give `18 nov. 2026` / `Nov 18, 2026` and `1 284` / `1,284`.
- [ ] `frenchSpacing` adds U+202F before `: ; ! ?`, with unit tests.
- [ ] The headline Playwright test runs in CI for both languages at three widths.
- [ ] A missing translation shows the fallback note, not a 404.
- [ ] Biome/ESLint rule or review checklist item: no hard-coded user-facing strings in components.
- [ ] `docs/i18n.md` exists and another developer has followed it once to add a string (proof in the PR).

## Out of scope
- Writing the French copy for pages (each page ticket, reviewed in XYB-076).
- Languages other than English and French.
- Translated slugs (`/fr/le-clan`). Same slugs in both languages.

## References
- next-intl docs (App Router, `localePrefix: "as-needed"`).
- Trait: Stripe's localized sites rewrite the copy for each language instead of translating word for word.
