# WS2 Owner Comparison — Five Design Directions

Date: 2026-06-10
Status: awaiting owner selection (the single human gate in the active roadmap)
Roadmap: `docs/roadmaps/2026-06-09-jami-studio-marketing-rebuild.md`

All five branches are complete, verified, and pushed. Each passed the full ladder
(`pnpm lint|typecheck|test|build|verify`), dark+light visual smoke with real-geometry probes at
1440/1024/768/390, an accessibility sweep (heading outline, 44px tap targets, token focus rings,
AA contrast), and the WS5 adversarial audit (shared contracts byte-identical to foundation
`57402c9` on every tip; no secrets; no test/config tampering; no placeholder/status copy; official
brand mark + PNG favicons wired everywhere). Every branch carries the same committed evidence set:
56 captures (7 routes × 4 breakpoints × dark+light) under `docs/design/evidence/<branch>/`.

To review a branch locally:

```
git checkout design/<name>
pnpm install && pnpm build && pnpm exec next start
```

Or browse the committed captures without building.

## The Field

| Branch | Tip | Codename | Lane | Accent | Typography |
| --- | --- | --- | --- | --- | --- |
| `design/grok` | `d59887c` | Nocturne | A — dark grainy cinematic | Violet `#8b7ee6` | All-Geist (sans/display/mono) |
| `design/gemini` | `6035c5d` | Cinematic Noir | A — dark grainy | **Teal** `#14b8a6` (only non-violet) | Inter / Inter Tight / JetBrains Mono |
| `design/fable` | `cf804f1` | Ash & Iris | A with editorial blend | Heliotrope `#ab91f2` | **Fraunces serif display** + Hanken Grotesk |
| `design/opus-a` | `38e5b89` | Obsidian Atlas | A — dark grainy | Violet `#a99bf2` | Inter / Inter Tight / JetBrains Mono |
| `design/opus-b` | `a05074b` | Atelier | **B — clean light editorial (only Lane B)** | Violet ink `#5b46c9` | Geist display + Inter |

Differentiation is carried by typography, texture, and lane more than hue: 4 of 5 chose violet;
gemini (teal) is the hue outlier and opus-b (light-primary) is the lane outlier.

## Per-Branch Character

- **Nocturne (`design/grok`)** — violet on near-black `#0c0c0f` with a genuinely distinct
  warm-paper light theme; the only single-type-family branch (all Geist). The leanest, tightest
  build of the dark branches. Survived the heaviest adversarial pass of the run (it fixed a font
  cycle, a 404 theme break, and a mobile footer collapse along the way) and ends fully probed.
- **Cinematic Noir (`design/gemini`)** — teal-on-charcoal, neon-through-fog accents, fractal-noise
  grain. Best evidence discipline throughout the run. Structurally the thinnest component system
  (homepage sections are inline in `page.tsx`); if selected, WS3 componentizes before registry
  seeding (noted in roadmap).
- **Ash & Iris (`design/fable`)** — the most typographically distinctive: Fraunces serif display,
  numbered editorial sections, ash-violet canvas, "print proof" warm light theme. Largest visual
  system; the only branch that also restyled the config-panel/token-swatch foundation components.
- **Obsidian Atlas (`design/opus-a`)** — violet on deep black with a hand-tuned paper light theme;
  the largest, most registry-shaped component architecture (full primitives suite — the strongest
  seed for the future Studio UI Registry). Theme-aware brand avatars.
- **Atelier (`design/opus-b`)** — the only light-first entry: gallery-white canvas, violet ink,
  sharp small radii, restrained motion, with a considered (non-inverted) dark counterpart. If
  selected, WS3 promotes its `project-role.ts` descriptor copy into `src/content` (noted in
  roadmap).

## What Happens After You Pick

Record the selection (or just say it), then WS3 begins: merge the selected branch to `main`,
remove comparison-only leftovers, resolve that branch's noted WS3 items, final polish; then WS4
deployment/subdomain docs and the post-selection WS5 adversarial audit close the run.
