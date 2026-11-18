---
id: XYB-026
title: Blob behaviour kit
phase: 2-motion-engine
type: motion
size: L
depends_on: [XYB-020, XYB-025]
skills: [gsap, svg, animation, react]
good_first_issue: false
---

# XYB-026 — Blob behaviour kit

## Why this exists (the strategy)
A blob that only sits there is a picture. A blob that breathes with the clan beat, glances at your cursor,
waves when you arrive and squashes when you poke it is a **character**, and characters are what people
remember and share. This ticket gives every blob on the site the same set of behaviours through one
client component, `<LiveBlob>`, so the hero, the crowd, profiles and the Blob Maker all feel like the same species.

This is also where *out of phase → in phase* becomes real: each blob has its own `phase`, and a `sync` value
pulls them together onto the beat.

## What the visitor should feel and do
Feel: "they're alive, and they noticed me."
Do: move the cursor, tap, hover. Small rewards, never a game you have to play.

## Scope
- `<LiveBlob>`: wraps `<Blob>` (XYB-025, inline SVG) and adds behaviours: idle (breathe, bob, blink),
  look-at, wave, squash on press, jump/land, expression swap.
- Props: `config` (species, colour, face, accessory), `phase`, `sync`, `interactive`, `label`.
- **Crowd driver** for sprite blobs (`<BlobUse>`): one loop that writes CSS variables for many blobs at once.
- A small imperative API for scenes (`blobRef.current.wave()`, `.jump()`, `.setSync(v)`, `.setFace(f)`).

## Content
- Species, faces and arm poses from the art kit (XYB-016) and the character bible (XYB-015).
- Faces used by behaviours: `face-happy` (default), `face-blink`, `face-wow` (on press), `face-shy` (small hero blob), `face-sleepy`.

## Design spec

### Behaviours (all SVG transforms, all on the parts XYB-025 exposes)
| Behaviour | What happens | Numbers |
| --- | --- | --- |
| **Breathe / bob** | Whole blob moves up and down on the clan beat and squashes a little at the bottom | 0.75 Hz; translateY 0 → -5px (scaled to size); body scaleY 0.98 ↔ 1.02 with scaleX inverse (volume stays the same); origin = floor line |
| **Blink** | Eyes scale to 10% height and back, on a beat | 120ms close, 80ms hold, 140ms open; every 4–7 beats (seeded per blob) |
| **Look-at** | Face group slides toward the pointer, eyes slide a little more | Face max 8px, eyes max 4px extra (at size `l`, scaled for others); `gsap.quickTo` with 0.5s duration, `power3.out` |
| **Wave** | Front arm rotates around its pivot, 2–3 times | 900ms total, -20° ↔ +40°, `squash` ease on the last return |
| **Press squash** | On pointer down: scaleY 0.86 / scaleX 1.1 from the floor. On release: back with one overshoot | Down 90ms; release 420ms with `squash` ease (XYB-020); face swaps to `face-wow` for 400ms |
| **Jump / land** | Anticipation squash → stretch up → land squash | 120ms + 320ms + 260ms; height ~0.4 body heights |
| **Expression swap** | Face group cross-fades to another face | 120ms opacity out/in, no morphing needed (MorphSVG optional later) |

### Phase and sync
- `phase` (0–1): this blob's personal offset on the beat. Default = seeded random from its member handle.
- `sync` (0–1): `effectivePhase = beat.phase + phase * (1 - sync)`. `sync = 1` puts every blob on the same beat.
- Changing `sync` is always tweened (never jumps), default 800ms `--ease-in-out`.

### Pointer rules
- Look-at only on `(pointer: fine)`. On touch, blobs look toward the last tap for 2s, then look forward again.
- When the pointer leaves the window or the window blurs, blobs ease back to looking forward (600ms).
- Interactive blobs are reachable by keyboard: a real `<button>` around the SVG with an accessible name
  ("Say hi to Nova"); Enter/Space plays press squash + wave.

## Motion spec
- Idle runs only while the blob is visible (`data-active` from XYB-025) and the tab is visible.
- Never more than **one** big action (wave/jump) per blob at a time; queue the next or drop it.
- Crowds (more than 12 blobs): look-at only for the 6 nearest the pointer; the rest keep idle only.
- **Reduced motion** (OS setting or the footer Pause motion switch, via `useReducedMotion` from XYB-020):
  no bob, no breathe, no look-at, no jump. The blob is the still SVG. Blinks stay (tiny, no travel).
  A press swaps the face to `face-happy` instead of squashing.

## Build notes
- Files: `components/blob/LiveBlob.tsx` (client), `lib/blob/behaviours.ts` (one function per behaviour,
  each returns a GSAP timeline or a cleanup), `lib/blob/crowd.ts` (crowd driver), `lib/blob/types.ts`.
- **Inline blobs (`<LiveBlob>`):** GSAP tweens the SVG parts directly through the refs from XYB-025.
  Use `gsap.quickTo` / `gsap.quickSetter` for anything updated every frame (look-at, bob). Build all
  timelines inside `useGSAP()` with the shared `gsap.matchMedia()` from XYB-020, so cleanup and reduced
  motion are automatic.
- **Crowd blobs (`<BlobUse>`):** never one tween per blob. One `gsap.ticker` callback reads the beat
  (`useClanBeat` getter, XYB-020) and writes `--bob`, `--breathe`, `--blink` and `--look-x/y` on each
  **active** blob's `<svg>` (max 60 desktop / 30 phone). The CSS in XYB-025 turns those variables into transforms.
- No React state per frame. Read the beat with the getter, not a hook that re-renders.
- Transforms and opacity only. `will-change: transform` only while an action plays.
- Seeded randomness: `lib/random.ts` with a tiny `mulberry32(seed)` so the same member's blob behaves the
  same way on every visit.
- Imperative handle: `useImperativeHandle(ref, () => ({ wave, jump, setSync, setFace }))`.
- `/lab/blobs`: one of each species, buttons for every action, a `sync` slider, a crowd of 24 inline blobs
  and a crowd of 200 sprite blobs.

## Acceptance criteria
- [ ] `<LiveBlob config={...} />` idles on the clan beat with no extra code.
- [ ] Two blobs with `sync={1}` on different pages bob in the same phase (two windows side by side).
- [ ] On `/lab/blobs`, the `sync` slider from 0 to 1 brings 24 blobs from scattered into one beat in 800ms, no jumps.
- [ ] Look-at follows the cursor smoothly within the limits and returns forward when the pointer leaves the window.
- [ ] Click or Enter on an interactive blob plays squash then wave; pressing again during the wave does not stack.
- [ ] On a phone, tapping a blob works and there is no look-at jitter.
- [ ] The 200-blob sprite crowd holds 55+ fps on a mid-range Android phone (or 4× CPU throttle); only active blobs are written each frame.
- [ ] Arms rotate around their real pivots (no detached arms at -20° or +40°).
- [ ] With reduced motion on (OS or footer switch), nothing bobs, breathes or turns; blinks and faces still work.
- [ ] With JavaScript off, every blob shows as the still SVG from XYB-025.
- [ ] Every interactive blob has an accessible name (from `messages/*.json`) and a visible focus ring.
- [ ] Follows the house rules in `docs/creative-direction.md` §4.

## Out of scope
- Drawing the blobs (XYB-016) and rendering them (XYB-025).
- Scene choreography (XYB-031, XYB-032, XYB-035, XYB-058 use this kit).
- Physics engines. Squash and spring are faked with easing.
- Any 3D or WebGL.

## References
- Duolingo's characters: tiny reactions make them feel alive.
- Pixar's "Luxo Jr." principle: a small head turn says more than a big move.
- Animation's squash and stretch: volume stays the same while shape changes.
