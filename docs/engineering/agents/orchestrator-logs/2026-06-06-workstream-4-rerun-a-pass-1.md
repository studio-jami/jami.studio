# Workstream 4 Rerun A Pass 1 — Obsidian Atlas

Date: 2026-06-06
Branch: `design/rerun-a`
Worktree: `C:\Users\james\dev\orgs\oss\jami.studio-rerun-a`
Agent: fresh-context implementation pass

## Scope

Delivered the complete Rerun A "Obsidian Atlas" marketing-site design direction over the shared Workstreams 1–3 foundation. Preserved centralized content registry, route helpers, metadata, sitemap, robots, and AI-file generation without forking shared machinery.

## Delivered

- `rerunAObsidianAtlasPreset` and `createObsidianAtlasPreset()` in `src/tokens/presets.ts` using the shared dial contract with deep obsidian base, warm ivory foreground, and champagne-gold accent values.
- Branch-owned visual system in `src/styles/direction-rerun-a.css`, scoped with `data-direction="rerun-a"`.
- Complete homepage, `/projects`, and all five project detail pages via `src/components/rerun-a/*`.
- Custom inline SVG artwork: hero atlas topology visualization plus per-project header illustrations for Harness, Registry, Orchestra, Intercal, and Collectiva.
- Typography via `next/font`: Fraunces display, DM Sans body, IBM Plex Mono UI labels.
- Glass-morphism surfaces, hairline borders, hover micro-animations, responsive layouts at 1440/1024/768/390.
- Removed neutral-shell homepage composition and config-panel centerpiece; internal config panel component remains in repo but is not rendered on public routes.

## Verification

| Gate | Result |
| --- | --- |
| `pnpm lint` / `npm run lint` | pass |
| `pnpm typecheck` / `npm run typecheck` | pass |
| `pnpm test` / `npm test` (17 tests) | pass |
| `pnpm build` / `next build` | pass |
| `pnpm verify` | pass (via lint + typecheck + test + build) |
| `git diff --check` | pass |

HTTP smoke against `http://127.0.0.1:3111` — all 200:

- `/`
- `/projects`
- `/projects/harness`
- `/projects/registry`
- `/projects/orchestra`
- `/projects/intercal`
- `/projects/collectiva`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`

Visual smoke (Playwright Chromium, local production server):

- Viewports: 1440, 1024, 768, 390
- Routes: `/`, `/projects`, all five project pages
- Result: all 28 captures returned HTTP 200 with no console/page errors
- Screenshots (local only, not committed): `docs/engineering/agents/visual-smoke/rerun-a-pass-1/`

## Changed files (intentional)

- `src/tokens/presets.ts`
- `src/styles/globals.css`
- `src/styles/direction-rerun-a.css`
- `src/app/layout.tsx`
- `src/app/page.tsx`
- `src/app/projects/page.tsx`
- `src/app/projects/[slug]/page.tsx`
- `src/components/rerun-a/atlas-footer.tsx`
- `src/components/rerun-a/atlas-header.tsx`
- `src/components/rerun-a/homepage.tsx`
- `src/components/rerun-a/project-card.tsx`
- `src/components/rerun-a/project-detail.tsx`
- `src/components/rerun-a/projects-index.tsx`
- `src/components/rerun-a/svg/atlas-hero-visual.tsx`
- `src/components/rerun-a/svg/project-illustrations.tsx`
- `docs/engineering/agents/orchestrator-logs/2026-06-06-workstream-4-rerun-a-pass-1.md`

## Dev command

```bash
cd C:\Users\james\dev\orgs\oss\jami.studio-rerun-a
pnpm install
pnpm dev
```

## Commit / push

- Commit: `2a3972ae43d9e23b644ea18c877bb50d9b1afe45`
- Subject: `feat(design): deliver Obsidian Atlas rerun-a marketing site`
- Push: `origin/design/rerun-a` updated (`171b6a6..2a3972a`)