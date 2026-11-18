---
id: XYB-002
title: Scaffold the app
phase: 0-foundations
type: dev
size: M
depends_on: []
skills: [nextjs, typescript, tailwind, tooling]
good_first_issue: false
---

# XYB-002 — Scaffold the app

## Why this exists (the strategy)
**Claim:** many people can build one site without stepping on each other.
**Proof:** a clean, strict, boring foundation: one framework, one styling method, one folder layout,
one way to format code. Everyone builds sections on the same floor.

The more contributors a project has, the more the foundation matters. This ticket decides the stack once
(see `tickets/README.md`) so nobody re-decides it in a section ticket.

## What the visitor should feel and do
Visitors see nothing yet. Contributors should feel: "I cloned it, ran two commands, and it works."

## Scope
- Next.js 16 (App Router) + React 19 + TypeScript (strict).
- Tailwind CSS v4, wired to CSS custom-property tokens in `styles/tokens.css`.
- pnpm as the only package manager (`packageManager` field set, `only-allow pnpm` in `preinstall`).
- Biome for lint + format (one tool, fast). If the team prefers ESLint + Prettier, decide in the PR and document it; do not install both.
- The folder structure below, with a `README.md` inside each top folder explaining what goes there.
- A `/lab` route: the component playground, where every component and every motion utility gets a live demo.
- Install (not configure) the motion libraries so later tickets do not fight over versions: `gsap`, `@gsap/react`, `lenis`. There is no 3D or WebGL library: the blobs are inline SVG animated by GSAP. GSAP's MorphSVG plugin ships free with `gsap` if a ticket needs shape morphing.

## Content
Root `README.md` gets: one-line description, `pnpm i` / `pnpm dev` / `pnpm build`, links to
`docs/creative-direction.md`, `tickets/README.md`, `PRODUCT.md` and `CONTRIBUTING.md`.

## Design spec
The default home page shows only the wordmark text "Xyberclan" in ink on the ground colour
(`#F7F7F2` / `#232823`) so the token wiring is visible. No other design.

## Motion spec
None. Motion setup is XYB-020 / XYB-021.

## Build notes

```
.
├── app/
│   ├── (site)/              # public pages: home, clan, inside, mindset, events, built, journal, join
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── lab/                 # component playground (noindex, hidden from nav)
│   │   └── page.tsx
│   ├── api/                 # route handlers (discord, join, og)
│   ├── layout.tsx           # <html>, fonts, tokens, providers
│   └── not-found.tsx
├── components/
│   ├── ui/                  # Button, TextLink, Field... (XYB-014)
│   ├── sections/            # one folder per home/page section
│   └── blob/                # <Blob> component (XYB-025); art/ holds the species SVG sources from XYB-016
├── content/                 # MDX + JSON content (XYB-005)
├── lib/
│   ├── motion/              # GSAP setup, clan beat, reveal utilities (XYB-020–023)
│   ├── blob/                # blob renderer helpers, sprite builder, behaviours (XYB-025, XYB-026)
│   └── utils/
├── styles/
│   ├── tokens.css           # colour, type, space, motion tokens (CSS custom properties)
│   └── globals.css          # @import "tailwindcss"; @theme mapping to tokens; base reset
├── public/
│   └── fonts/               # self-hosted fonts (XYB-012)
├── docs/
├── tickets/
└── scripts/
```

- Create with `pnpm create next-app@latest` (TypeScript, App Router, no `src/`, Tailwind). Then restructure to the tree above.
- `tsconfig.json`: `"strict": true`, `"noUncheckedIndexedAccess": true`, path alias `@/*` → `./*`.
- Tailwind v4: no `tailwind.config.js`. Map tokens in `globals.css` with `@theme { --color-ground: var(--ground); ... }` so classes like `bg-ground text-ink` work.
- `/lab` sets `export const metadata = { robots: { index: false } }`.
- Scripts in `package.json`: `dev`, `build`, `start`, `lint`, `format`, `typecheck` (`tsc --noEmit`).
- Pin Node in `.nvmrc` (Node 22 LTS) and `engines`.
- Add `.editorconfig` and a `.gitignore` that ignores `.env*` except `.env.example`.

## Acceptance criteria
- [ ] Fresh clone → `pnpm i && pnpm dev` runs with no errors and no warnings in the terminal.
- [ ] `pnpm build`, `pnpm lint` and `pnpm typecheck` all pass.
- [ ] Running `npm install` fails with a message telling you to use pnpm.
- [ ] The folder structure matches the tree above; each top folder has a short `README.md`.
- [ ] `bg-ground text-ink` utility classes work and read from `styles/tokens.css`.
- [ ] `/lab` renders and is `noindex`.
- [ ] `gsap`, `@gsap/react`, `lenis` are installed at exact versions (no `^`); no three.js or other WebGL library is installed.
- [ ] Root `README.md` explains how to run the project in under 10 lines.
- [ ] Only one lint/format toolchain is installed.

## Out of scope
- Real tokens and fonts (XYB-011, XYB-012). Use the two hero colours only.
- CI and deploys (XYB-003). Contribution docs (XYB-004). Content layer (XYB-005).

## References
- Next.js App Router project structure docs; Tailwind v4 `@theme` docs.
- Trait to learn from well-run open-source sites (Astro docs, Supabase): a predictable folder layout that a newcomer understands in one look.
