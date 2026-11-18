---
id: XYB-080
title: Accessibility audit (WCAG 2.2 AA)
phase: 6-quality-launch
type: qa
size: M
depends_on: [M3]
skills: [accessibility, screen-readers, playwright, axe]
good_first_issue: false
---

# XYB-080 — Accessibility audit (WCAG 2.2 AA)

## Why this exists (the strategy)
**Claim:** *A space to be yourself* means everyone, including people who use a screen reader, a keyboard,
a switch, zoom, or who get sick from motion.
**Proof:** the whole site meets WCAG 2.2 AA, tested by tools **and** by people using real assistive
technology, and the most motion-heavy parts have complete, designed alternatives.

A site full of animated blobs and scroll scenes is exactly where accessibility usually breaks. If ours works
for everyone, that is itself part of the craft judges look for, and part of who the clan is.

## What the visitor should feel and do
- Feel: welcome, whatever device or body they use.
- Do: everything any other visitor can do — read, meet members, make a blob, join.

## Scope
- Automated checks in CI on every page.
- Manual audit of every page and every interactive component.
- Screen-reader passes on three platforms.
- A written report with every issue filed as its own ticket (or fixed in this PR if small).

## Content
- The test script below, run page by page, recorded in `docs/audits/a11y-<date>.md`.
- If possible, one session with a clan member (or friend of the clan) who uses a screen reader daily.

## Design spec
What must be true visually:
- Text contrast ≥ 4.5:1 (≥ 3:1 for text ≥ 24 px or bold ≥ 19 px) on **every** field colour, including Lagoon and Deep sections.
- Focus indicator visible on every control, ≥ 2 px, ≥ 3:1 against both the control and the ground (Lagoon ring on paper; ink ring on Lagoon/Deep fields).
- Focused elements are never hidden under the sticky nav (WCAG 2.2 — 2.4.11 Focus Not Obscured).
- Target size ≥ 24×24 px for every control (2.5.8); 44×44 px recommended for primary ones on touch.
- Page works at 200% zoom and at 320 px width with no horizontal scroll (1.4.10 Reflow).
- **Failure state check:** error messages are text, not colour alone.

## Motion spec
- `prefers-reduced-motion: reduce`: no smooth scroll, no scrubbed or pinned scenes, no parallax, blobs
  shown as still SVGs, page transitions become instant cross-fades ≤ 150 ms. Final states visible immediately.
- Nothing flashes more than 3 times per second.
- Any motion that lasts more than 5 seconds and is not essential (idle blobs, marquees if any) can be paused
  (2.2.2) — a "Pause motion" control in the footer that sets the reduced-motion state site-wide.

## Build notes
- **Automated:** `@axe-core/playwright` in the Playwright suite (from XYB-003), run on every route at
  1440 and 390, failing the build on any serious or critical violation.
- **Blob SVGs:** decorative blobs are `aria-hidden="true"` and not focusable; meaningful ones (a member's blob, the hero duo) are `role="img"` with a label. Every scene has a text
  equivalent in the DOM (e.g. the signature scene's message is real text; the members crowd has a real
  list of links behind it).
- **Blob Maker:** every option is a native radio group or a `role="radiogroup"` with arrow-key support;
  the live preview has a text description that updates politely (`aria-live="polite"`): "Your blob: a lagoon drop with happy eyes."
- **Split text:** confirm XYB-022's rule: the heading keeps an unsplit accessible name; split spans are `aria-hidden`.
- **Live numbers (XYB-034):** not announced every refresh (no `aria-live` on counters).
- **Keyboard map** to verify on every page: Skip link → nav → main content in reading order → footer.
  Escape closes menus and dialogs and returns focus to the trigger. No keyboard traps.
- **Screen readers:** VoiceOver + Safari (macOS and iOS), NVDA + Firefox or Chrome (Windows), TalkBack + Chrome (Android).
  For each: landmarks, heading outline (one `h1`, no skipped levels), link names out of context, form labels and errors, images' alt text.
- **Forms (XYB-058, XYB-071):** labels always visible, errors linked with `aria-describedby`, error summary focused on submit, `autocomplete` attributes set.
- Language: `lang` correct (see XYB-076).
- Record results in `docs/audits/a11y-<date>.md` with a table: page, criterion, issue, severity, ticket.

## Acceptance criteria
- [ ] axe runs in CI on every route at 1440 and 390 with zero serious/critical violations.
- [ ] Lighthouse Accessibility = 100 on home, `/clan`, `/join`, an event page and `/mindset`.
- [ ] Every page passes a keyboard-only walkthrough: all actions reachable, visible focus, no traps, focus never hidden by the nav.
- [ ] The Blob Maker can be completed and the application submitted with keyboard only and with VoiceOver.
- [ ] VoiceOver, NVDA and TalkBack passes recorded for home, `/clan`, `/join`, `/events/[slug]`.
- [ ] Contrast verified (with tool screenshots) for text on paper, Lagoon, Deep and every other field colour.
- [ ] All controls are ≥ 24×24 px.
- [ ] Reduced-motion mode shows every scene's final state, still blobs, no smooth scroll (screen recording in PR).
- [ ] The footer "Pause motion" control works and persists for the session.
- [ ] 200% zoom and 320 px width cause no loss of content or horizontal scroll.
- [ ] Every issue found is fixed or filed as its own ticket linked from the audit doc.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- AAA conformance (nice where cheap, not required).
- Sign-language video content.

## References
- WCAG 2.2 quick reference (W3C), especially 2.4.11, 2.5.7, 2.5.8, 3.3.8 (new in 2.2).
- Trait to learn: GOV.UK — accessibility treated as craft, not compliance.
