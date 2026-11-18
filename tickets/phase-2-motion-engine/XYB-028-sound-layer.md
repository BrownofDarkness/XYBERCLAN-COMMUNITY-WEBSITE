---
id: XYB-028
title: Sound of the clan (optional)
phase: 2-motion-engine
type: motion
size: M
depends_on: [XYB-020]
skills: [web-audio, sound-design, react, accessibility]
good_first_issue: false
---

# XYB-028 — Sound of the clan (optional)

## Why this exists (the strategy)
*One frequency* is a sound word. For visitors who choose to turn it on, the site can be heard: a soft,
warm tone that breathes on the clan beat, and tiny clay "pops" when blobs land or get poked. In the
signature scene (XYB-032), as the blobs fall into phase, out-of-tune tones resolve into one chord. Only a
few sites dare to use sound well, and juries notice it. But sound must **never** surprise anyone, so it is
**off by default** and only plays after the visitor turns it on.

This ticket is **optional**. Build it only after M2 (home) is complete and performance is within budget.

## What the visitor should feel and do
Feel: (if they turn it on) a calm hum, like a room full of people breathing together.
Do: find the sound toggle easily, and turn it off just as easily.

## Scope
- A sound toggle in the navigation (XYB-030 leaves space for it).
- A Web Audio engine: one ambient drone synced to the clan beat, and a small set of one-shot sounds.
- The "into phase" chord resolution hook for XYB-032.
- Remembering the visitor's choice.

## Content
Sounds, either synthesized in code or recorded and licensed (CC0 or made by a member). List each with its source in `public/sounds/CREDITS.md`.

| Sound | When | Length | Level |
| --- | --- | --- | --- |
| Ambient drone | Continuous while on | Loop or synth | −30 LUFS, very soft |
| Pop (soft clay) | Blob press / land | 80–150ms | −22 dB |
| Wave chirp | Blob waves | 200ms | −24 dB |
| Resolve chord | Signature scene reaches `sync = 1` | 1.5s | −20 dB |
| Click (UI) | None by default | — | UI stays silent |

## Design spec
- **Toggle:** a small text button in the nav: "Sound off" / "Sound on", with a Solar speaker icon. It is a
  real `<button aria-pressed>`. No modal asking "enable sound?" on load. No autoplay ever.
- The drone's volume swells gently with the beat: gain moves ±10% at 0.75 Hz.
- In the signature scene, each scattered blob group adds a tone slightly detuned (±15–40 cents). As `sync` goes to 1, the detune goes to 0, so the sound resolves at the same time the blobs align.
- Total audio files: under 300KB (or zero if fully synthesized).

## Motion spec
- Turning on: fade in over 1.2s. Turning off: fade out over 400ms, then suspend the `AudioContext`.
- Tab hidden: fade out and suspend. Tab visible again: resume only if the visitor had it on.
- **Reduced motion:** sound still allowed if the visitor turns it on, but one-shot sounds are limited to presses (no ambient swell tied to movement they can't see).

## Build notes
- `lib/sound/engine.ts` — creates the `AudioContext` **only inside the toggle's click handler** (browsers block audio before a user gesture). One master `GainNode`, one drone (2 detuned oscillators → low-pass filter → gain) or a looping buffer.
- Reads the clan beat (XYB-020) through `subscribe()` to modulate gain. No React state per frame.
- `useSound()` hook exposes `play('pop')`, `setResolve(v)` (0–1, for XYB-032), `enabled`, `toggle()`.
- Load one-shot buffers lazily, after the first enable.
- Store the choice in `localStorage` (`xyb-sound`), wrapped in try/catch. On a return visit, show the toggle as "on" but **still wait for the first click anywhere** to start the context (autoplay rules). If the first click is the toggle itself, it turns sound off.
- Announce changes with the button's `aria-pressed`; no extra live region needed.
- Respect `navigator.audioSession` (Safari) set to `ambient` where supported, so it mixes with other audio and respects the silent switch.

## Acceptance criteria
- [ ] No sound plays on any page until the visitor presses the sound toggle. Verified on a fresh profile in Chrome, Safari and Firefox.
- [ ] The toggle is a `<button>` with `aria-pressed`, reachable by keyboard, with a visible focus ring.
- [ ] Turning sound on fades in over ~1.2s; off fades out and the `AudioContext` state becomes `suspended`.
- [ ] Switching tabs silences the site; coming back resumes only if it was on.
- [ ] In the signature scene, the tones resolve into one chord at the moment the blobs reach `sync = 1`.
- [ ] Total sound assets ≤ 300KB, all credited in `public/sounds/CREDITS.md`.
- [ ] With sound off, the audio code costs nothing measurable (no `AudioContext` created; check `chrome://media-internals`).
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Music tracks, voice-over, UI click sounds on every button.
- Sound in the Blob Maker beyond the pop (may come later as its own ticket).

## References
- Sites that use sound as an opt-in layer and make it worth turning on.
- Web Audio API autoplay policy (Chrome, Safari).
