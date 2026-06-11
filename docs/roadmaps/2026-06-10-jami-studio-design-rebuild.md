# jami.studio Marketing-Site Design Rebuild — Implementation Plan

Date: 2026-06-10
Status: [ ] Active — execute pass not started
Source reports: `docs/design/reference-brief.md`, `AGENTS.md`, `tools/framer-bridge/CONNECTIONS.md`
Owner: Jamie
Surface: `www.jami.studio` marketing site — one design lane per branch/worktree

## Purpose

Rebuild the `jami.studio` marketing-site **UI** to world-class, production-grade, design-studio polish
on a single lane, reusing the shared foundation **verbatim** and driving every pixel through the token
and content contracts. Scope is presentation only: components, app-route presentation, `globals.css`,
and this lane's own token preset values (dark + light). Out of scope: the foundation contracts
(`schema`/`css-vars`/content/lib), any product runtime, and deployment.

This plan is the official end-to-end work order. It is executed by one Opus 4.8 goal session per lane,
then re-run by audit/fix goal sessions until a pass lands clean (see `docs/engineering/agents/design-goal.md`). The live
worktree is the source of truth; this plan is the contract for what "done" means, not proof that it is.

## Status Legend

- `[ ]` not started
- `[~]` in progress
- `[x]` done and verified
- `[!]` blocked / needs decision

---

## Per-Lane Target

> **The only part of this plan that differs between branches.** On each branch this block names the
> lane's locked direction. Differentiation is assigned here on purpose — five branches must read as
> five distinct studios, not one theme five times.

**Active lane:** `design/kirimo`
**Template / reference:** Kirimo
**Primary aesthetic lane:** A — immersive dark creative
**Primary accent (brand hex):** `#854c63` wine-rose — authored as `color.accent` → `--accent`/`--primary`; dial family `rose`
**Framer bridge key:** `kirimo` → `tools/framer-bridge/out/kirimo.json`

| Branch | Template | Primary lane | Primary accent | Character to hit |
|---|---|---|---|---|
| `design/message-ai` | Message AI | A — cinematic dark (the prime) | `#175d5e` deep teal (dial `cyan`) | nocturnal AI-product canvas, fine grain, oversized display hero, teal glow |
| `design/nouva` | Nouva | B — bold light editorial | `#854780` magenta (dial `violet`) | studio/agency confidence, work-forward, strong editorial identity |
| `design/kirimo` | Kirimo | A — immersive dark creative | `#854c63` wine-rose (dial `rose`) | immersive gallery showcase, dynamic rhythm, aesthetic-forward |
| `design/noir` | Noir | A — high-contrast dark agency | `#a1704f` copper (dial `amber`) | textbook dark agency-portfolio IA, numbered sections, warm accent on near-black |
| `design/synk` | Synk | B — systematized light | `#2b4173` indigo (dial `green` slot) | global-variable / swap-anything discipline made visible, calm systematized grid |

The assigned **primary accent** (brand hex) + primary lane are **locked** for this branch as the
default identity — craft within them; do not invent a different brand hue. But the accent is a
**token, not a hardcode**: author it as `color.accent` (with a matching `ring` / `accentForeground`)
in the branch `src/tokens/theme.ts`, surfaced only through `--accent` / `--primary` — never a literal
in a component. The five brand hexes below are the shared studio palette, so any lane stays swappable
to any of them, or retunable, on the token system; that adjustability is a requirement, not a side
effect. Both dark **and** light themes ship on every lane — "primary lane" is the dominant character,
not the only theme. All art direction comes from `reference-brief.md` (§2 lanes, §3 DNA, §4 grain,
§6 type, §7 color, §8 motion); this plan governs the build, not the look.

**Brand accent palette (locked — five colors, token-driven):**

| Hex | Name | Primary for | Dial family |
|---|---|---|---|
| `#175d5e` | deep teal | `design/message-ai` | `cyan` |
| `#854780` | magenta | `design/nouva` | `violet` |
| `#854c63` | wine-rose | `design/kirimo` | `rose` |
| `#a1704f` | copper | `design/noir` | `amber` |
| `#2b4173` | indigo | `design/synk` | `green` slot (no blue/indigo name in the enum) |

The `dials.accent` enum (`cyan|green|amber|rose|violet`) is the frozen foundation label for the config
`<select>`; the **rendered** accent always comes from the `color.accent` hex, never the slot name. A
lane may retune its `accentPalettes` entry to its brand hex on-branch so the select reads true.

---

## 1. Source Findings

Facts verified in the repo at the `main` base commit. Cite these; do not rediscover.

**Token contract (frozen — reuse verbatim):**

- `src/tokens/schema.ts` — `TokenPreset` shape, `accentSchema` = `cyan|green|amber|rose|violet`,
  `themeDialSchema` (7 dials: accent, contrast, warmth, density, radius, surfaceDepth, motion),
  `validateTokenPreset`.
- `src/tokens/css-vars.ts` — `tokenCssVariables(preset)` and `inlineCssVariables(preset)` export the
  fixed CSS-var names every component must consume (complete list, 46 vars): `--background --foreground
  --card --card-foreground --popover --popover-foreground --primary --primary-foreground --secondary
  --secondary-foreground --muted --muted-foreground --accent --accent-foreground --border --input
  --ring --panel --panel-foreground --surface-canvas --surface-panel --surface-panel-raised
  --surface-overlay --surface-inverse --shadow-sm --shadow-md --font-sans --font-mono --font-display
  --text-{xs,sm,base,lg,xl,hero} --line-tight --line-body --container --section --spacing-unit
  --control-height --radius-{sm,md,lg,pill} --motion-duration --motion-duration-fast --motion-easing`.

**Token values (branch-owned — author your own):**

- `src/tokens/presets.ts` — `createTokenPresetFromDials(dials)`, `dialDefinitions`,
  `neutralFoundationDials`, `neutralFoundationPreset`, `tokenPresets`. **The foundation preset is
  light-only and restrained** (`neutralByWarmth` returns only light neutrals; `accentPalettes` are
  muted). There is **no dark preset and no `[data-theme]` switch yet** — this lane must author both
  themes and the switch. Keep ALL of these exports intact: `registry/manifest.ts` imports
  `dialDefinitions` + `tokenPresets`; `config-panel.tsx` imports `createTokenPresetFromDials` +
  `dialDefinitions` + `neutralFoundationDials`. Schema note: every `color.*`/`surface.*` value must be
  a **6-digit hex** (`#rrggbb`) — convert any `rgb()` values from the Framer extraction before
  authoring presets.

**Content contracts (frozen — reuse verbatim, all copy comes from here):**

- `src/content/site.ts` — `site.nav` (Projects, AI index, GitHub), `site.home.{eyebrow,title,lead,
  primaryCta,secondaryCta,pillars[4],proof}`, `site.faqs[3]`, `site.footerLinks`, `site.handles`
  (`x` = `@studio_jami`), `site.email` (`hello@jami.studio`), `site.social[]` (GitHub, LinkedIn, X,
  TikTok). **Surface `site.social` + `site.email` in the footer/contact area on every lane** — they are
  shared studio identity, not optional.
- `src/content/projects.ts` — exactly 5 projects (`harness, registry, orchestra, intercal,
  collectiva`). `StudioProject` fields: `name, shortName, route, summary, positioning, audience,
  capabilities[], proofPoints[], ctas[]` (each `ProjectLink` href is **resolved by
  `resolveProjectLink`** — never hand-build an href), `socialImage`, `internalStatus`. `getProject(slug)`.
- `src/content/links.ts` — `studioLinks`: `githubOrg`, `linkedin`, `x` (`x.com/studio_jami`), `tiktok`,
  `email` (`hello@jami.studio`), `emailHref` (`mailto:`). Single source of truth for external studio
  links + contact; `lib/metadata.ts` `organizationJsonLd().sameAs` already publishes the four socials.

**Lib + AI surfaces (frozen — keep wired):**

- `src/lib/routes.ts` (`absoluteUrl`, `projectPath`, `projectLinkTargets`, `publicRoutes`),
  `src/lib/metadata.ts` (`createMetadata`, `organizationJsonLd`, `websiteJsonLd`),
  `src/lib/ai-public-files.ts`, `src/lib/sitemap.ts`.
- Generated routes consuming them: `src/app/{robots.ts, sitemap.ts, llms.txt/route.ts,
  llms-full.txt/route.ts}`. Canonical pages: `/`, `/projects`, `/projects/[slug]`.

**Presentation to rebuild fresh:**

- `src/app/layout.tsx` (currently inlines `neutralFoundationPreset` on `:root`, renders
  `SiteHeader`/`<main>`/`SiteFooter` + JSON-LD), `src/app/page.tsx`, `src/app/projects/page.tsx`,
  `src/app/projects/[slug]/page.tsx`, `src/styles/globals.css`.
- `src/components/layout/{site-header,site-footer}.tsx`, `src/components/marketing/project-card.tsx`,
  `src/components/config-panel/config-panel.tsx`, `src/components/system/token-swatch.tsx`.
- `src/registry/manifest.ts` names the registry candidates: `SiteHeader, ProjectCard, ProjectDetail,
  ConfigPanel, ProofBand`. Build to that bar.

**Tooling:**

- Stack: Next 16 (App Router), React 19, Zod 4, pnpm 10. Windows dev host (PowerShell / git-bash; `rg`).
- Gate: `pnpm verify` = `lint && typecheck && test && build` (`package.json`). Verified green on the
  `main` base (17 tests, full static build) 2026-06-11.
- Tests pin the contracts (`tests/*.test.ts(x)`): content/route/metadata/AI-file shape, the token
  contract, **and `config-panel.test.tsx`** — the rebuilt `ConfigPanel` must still render every dial's
  label + description and keep the "Tokens" / "Registry" tab views (incl. the registry item name and
  Foundation/Branch ownership lists). Restyle it freely; keep that tested behavior. Tests are frozen —
  a lane never edits them to pass.
- Framer: all five templates' **full design systems are extracted headless** via the Server API
  (`getColorStyles` + `getTextStyles` + `getNodesWithType` + `framer.agent.getNode`/`getContext`);
  `tools/framer-bridge/CONNECTIONS.md` has the verified per-template counts. The orchestrator deposits
  in each worktree: `out/<lane>.json` (compact brief — real color tokens, type system, fonts, component
  vocabulary, pages, agent context), `out/<lane>.full.json` (`pageTrees` — each page as a nested
  hierarchy with section order, layout, gap/padding, breakpoints — plus flat node arrays with exact
  geometry/styling), and `out/<lane>.home.png` (full-page render). Primary art direction is
  `reference-brief.md` §3 + §13; these files pin the real fonts/colors/section-rhythm/spacing. No
  publish, MCP plugin, or `.env` needed in the worktree.

## 2. Locked Decisions

- **Frozen, do not edit:** `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts`,
  `src/registry/manifest.ts`. These are the contract every lane shares.
- **Token values are branch-owned:** author this lane's **dark and light** `TokenPreset` values
  (validated by `validateTokenPreset`) in a new branch file `src/tokens/theme.ts`; keep
  `presets.ts` foundation exports compiling.
- **Build fresh:** all of `src/components/*`, all `src/app/**` presentation, `src/styles/globals.css`.
- **Both themes**, switched via `[data-theme="dark"|"light"]` (or `.dark`) over the same
  `tokenCssVariables()` vars; a working `ThemeToggle`; `prefers-reduced-motion` honored as a hard gate.
- **Four breakpoints** designed and verified: 1440 / 1024 / 768 / 390 (`reference-brief.md` §9).
- **One accent family**, the assigned one, used sparingly for interactive/emphasis roles only.
- **Canonical routes unchanged:** `/`, `/projects`, `/projects/[slug]`. AI surfaces stay wired.
- **Hrefs only via resolvers** (`project.ctas[].href`, `site.*`, `src/lib/routes.ts`). No hand-built URLs.
- **Push to `design/<lane>` only — never `main`.**

## 3. Scope Boundaries

- Marketing site only. Do **not** implement any product runtime (Harness, UI Registry, Orchestra,
  Intercal, Collectiva). This site links to them through centralized metadata.
- No new content fields, fake metrics, fake "trusted by" logos, invented testimonials, or claims not in
  the contracts. No placeholder / "coming soon" / status-apology copy.
- Secrets: none in tracked files. Framer/operator keys live only in the repo-root `.env` (gitignored);
  `.env.example` documents names only.
- Static-first; do not bury content behind client-only rendering.
- No deployment here. Selection, merge to `main`, hardening, and Vercel deploy are a later, separate
  decision (see Expansion Track).

## 4. Repo Guidance

- App Router, React Server Components by default; mark only interactive leaves (`ThemeToggle`, FAQ
  accordion, mobile menu, scroll-reveal) as client components so initial HTML stays content-rich.
- Token contract ownership: `schema.ts` + `css-vars.ts` are the seam — never add a var name in a
  component that `tokenCssVariables()` doesn't export; express it through an existing role instead.
- Content/route/metadata ownership stays in `src/content` + `src/lib`; do not relocate or duplicate.
- Fonts: self-host variable fonts via `next/font/local` or `next/font/google` (`display: swap`, preload
  display + body, Latin subset). Licensed faces need a documented free fallback in the stack
  (`reference-brief.md` §6).
- Grain/atmosphere: static SVG `feTurbulence` data-URI overlay, token-driven `--grain-opacity`, never a
  live `filter` on a full-screen background, never animated (`reference-brief.md` §4).
- Verification gate before any commit: `pnpm verify` green + visual smoke of `/`, `/projects`, one
  `/projects/[slug]` at desktop **and** mobile in **both** themes.
- Changelog: no changelog convention exists yet — skip changelog fragments until one does.
- Framer structure is operated by the orchestrator from `main` (where `.env` lives); read the provided
  `tools/framer-bridge/out/<lane>.json` (design brief), `out/<lane>.full.json` (hierarchical
  `pageTrees` + flat node arrays), and `out/<lane>.home.png` (render) — do not require `.env` or run
  the bridge in the worktree.

## 5. Target Repository Shape

Concrete deliverables for this lane (fresh unless marked frozen):

- `src/tokens/theme.ts` — `export const darkPreset` + `export const lightPreset` (`TokenPreset`,
  validated); optional lane dials. Authored values per `reference-brief.md` §6/§7 and the assigned accent.
- `src/styles/globals.css` — reset/base, font wiring, `:root`/`[data-theme="dark"]` var blocks emitted
  from `tokenCssVariables()`, grain + atmosphere utilities, base element/`a`/`:focus-visible` styles
  using `--ring`.
- `src/app/layout.tsx` — emit both theme var blocks, set default theme + no-flash theme init, keep
  `createMetadata` + JSON-LD + `SiteHeader`/`<main>`/`SiteFooter` + AI wiring.
- `src/app/page.tsx` — home, full homepage IA (`reference-brief.md` §5).
- `src/app/projects/page.tsx` — index gallery of all five `ProjectCard`s.
- `src/app/projects/[slug]/page.tsx` — case-study detail (`reference-brief.md` §5), `generateStaticParams`
  + per-project `generateMetadata`.
- `src/components/` fresh inventory (`reference-brief.md` §10): `layout/SiteHeader`, `layout/SiteFooter`,
  `ui/{Button,Badge,Eyebrow,Container,Section,SectionHeading}`, `marketing/{Hero,PillarsBand,ProjectCard,
  ShowcaseGrid,CapabilityBand,ProofBand,FAQ,CTABand,ProjectDetail}`, `system/{GrainOverlay,ThemeToggle}`.
  Rebuild `config-panel` presentation but keep it driven by `dialDefinitions` and keep
  `tests/config-panel.test.tsx` passing (every dial label + description rendered; "Tokens"/"Registry"
  tab views with the registry strings). It need not appear on public pages; it must keep compiling
  and keep its tested behavior.
- `public/` — self-hosted fonts; only real assets (no fabricated logos/metrics). **Keep
  `public/social/*.svg`** — `tests/content-contract.test.ts` and the metadata layer depend on all six
  (`jami-studio` + one per project); `src/app/icon.svg` stays the favicon route.

## 6. Cross-Stream Dependency Map

Sequential build for a single goal session — each stream consumes the one before:

```
WS1 tokens/theme (dark+light values)
  └─> WS2 globals.css + layout + theme switch + atmosphere
        └─> WS3 layout primitives + SiteHeader + SiteFooter + Button/Badge/Eyebrow
              └─> WS4 Home page (hero, pillars, showcase, proof, faq, cta)
                    └─> WS5 /projects index + /projects/[slug] detail
                          └─> WS6 responsive (4 bp) + both themes + motion + a11y
                                └─> WS7 AI-surface + pnpm verify + closeout
```

A later stream cannot be "done" before its upstream stream is. WS6 is a cross-cutting hardening pass
over everything WS3–WS5 produced.

---

## Workstream 1: Lane token system (dark + light values)

Goal: this lane's full dark and light themes exist as validated `TokenPreset` values wired to the var contract.

Depends on:

- [ ] Frozen `src/tokens/schema.ts` + `css-vars.ts` (exist on `main`).

Enables:

- [ ] Every component below — they consume only `tokenCssVariables()` vars.

Repo guidance:

- Do not edit `schema.ts`/`css-vars.ts`. Keep `presets.ts` foundation exports intact.

Primary areas:

- `src/tokens/theme.ts`

Implementation tasks:

- [ ] Author `darkPreset` and `lightPreset` as `TokenPreset` objects validated with
  `validateTokenPreset`, using the assigned accent and the type/color/space/radius/motion guidance in
  `reference-brief.md` §6/§7. Dark canvas is near-black-not-`#000`; light is layered off-white.
- [ ] Pick display/sans/mono faces (`reference-brief.md` §6); set `--font-*` values accordingly.
- [ ] Set a `--grain-opacity` strategy per theme (dark 0.03–0.07, light ≤0.03).

Exit criteria:

- [ ] `pnpm typecheck` passes; both presets validate; var names match `tokenCssVariables()` exactly.

Suggested verification:

- `pnpm typecheck`

## Workstream 2: Global styles, layout shell, theme switch, atmosphere

Goal: a themed, no-flash app shell with grain/atmosphere and a working theme switch.

Depends on:

- [ ] WS1 presets.

Enables:

- [ ] All pages render inside a correct shell in both themes.

Primary areas:

- `src/styles/globals.css`, `src/app/layout.tsx`, `src/components/system/{GrainOverlay,ThemeToggle}.tsx`

Implementation tasks:

- [ ] Emit `:root` (light) and `[data-theme="dark"]` var blocks from `tokenCssVariables()`; add a
  no-flash inline theme-init so first paint matches the chosen theme.
- [ ] Build `GrainOverlay` (static `feTurbulence` data-URI, `aria-hidden`, `pointer-events:none`,
  token opacity) and the atmosphere/gradient layer per `reference-brief.md` §4.
- [ ] Build `ThemeToggle` (client) flipping `[data-theme]`; persist choice; respect system default.
- [ ] Keep `createMetadata`, JSON-LD, and the AI wiring in `layout.tsx`.

Exit criteria:

- [ ] Both themes render with correct surfaces; toggle works; no FOUC; reduced-motion freezes any motion.

Suggested verification:

- `pnpm build`; visual smoke `/` in both themes at 1440 + 390.

## Workstream 3: Layout primitives + header + footer + base UI

Goal: the shared shell components and base controls exist as reusable, token-driven primitives.

Depends on:

- [ ] WS2 shell.

Enables:

- [ ] Every page composes from these; no page hand-rolls a nav, footer, button, or container.

Primary areas:

- `src/components/layout/{SiteHeader,SiteFooter}.tsx`,
  `src/components/ui/{Button,Badge,Eyebrow,Container,Section,SectionHeading}.tsx`

Implementation tasks:

- [ ] `SiteHeader` from `site.nav` + GitHub + `ThemeToggle` + mobile menu/sheet; sticky/transparent-on-hero allowed if consistent.
- [ ] `SiteFooter` from `site.footerLinks` + handles + AI-index link, organized.
- [ ] `Button` (primary/secondary/ghost/link), `Badge`/`Eyebrow`, `Container`/`Section` bound to
  `--container`/`--section`, `SectionHeading`/`SectionNumber` (`01/02/03`). One radius scale, one motion.

Exit criteria:

- [ ] Header + footer correct at all four breakpoints in both themes; all hrefs from the content layer.

Suggested verification:

- `pnpm typecheck`; smoke nav + footer at 1440/1024/768/390.

## Workstream 4: Homepage

Goal: the full homepage IA, portfolio-grade.

Depends on:

- [ ] WS3 primitives.

Primary areas:

- `src/app/page.tsx`, `src/components/marketing/{Hero,PillarsBand,ProjectCard,ShowcaseGrid,ProofBand,FAQ,CTABand}.tsx`

Implementation tasks:

- [ ] Hero from `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}` — the owner-grade moment.
- [ ] `PillarsBand` from the four `site.home.pillars`.
- [ ] `ShowcaseGrid` of the five `projects` as the "selected work" centerpiece, each a `ProjectCard`
  (name, summary, positioning hook, capability tease, CTA into detail).
- [ ] `ProofBand` from `site.home.proof`; `FAQ` from `site.faqs`; final `CTABand`.

Exit criteria:

- [ ] Every homepage section present and designed; no stub/half-styled section; all CTAs resolve.

Suggested verification:

- `pnpm build`; smoke `/` both themes, 4 breakpoints.

## Workstream 5: Projects index + project detail

Goal: the `/projects` gallery and the `/projects/[slug]` case-study, fully designed for all five projects.

Depends on:

- [ ] WS4 `ProjectCard` + bands.

Primary areas:

- `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`,
  `src/components/marketing/{CapabilityBand,ProjectDetail}.tsx`

Implementation tasks:

- [ ] `/projects` index: clean gallery of all five `ProjectCard`s, shared header/footer.
- [ ] `/projects/[slug]`: hero (`name/summary/positioning` + `project.ctas`), audience/positioning,
  `CapabilityBand` from `capabilities[]`, `ProofBand` from `proofPoints[]`, family cross-links, CTA band.
- [ ] `generateStaticParams` for all five slugs; per-project `generateMetadata` + social image.

Exit criteria:

- [ ] All five detail pages fully designed (no stub); index complete; one `h1` per page; CTAs resolve.

Suggested verification:

- `pnpm build`; smoke `/projects` and at least two `/projects/[slug]` both themes.

## Workstream 6: Responsive, themes, motion, accessibility (hardening pass)

Goal: every page is clean at all four breakpoints in both themes, accessible, with restrained motion.

Depends on:

- [ ] WS4 + WS5 pages.

Primary areas:

- all `src/app/**`, all `src/components/**`, `src/styles/globals.css`

Implementation tasks:

- [ ] Verify + fix 1440/1024/768/390 for every page; no horizontal scroll at 390; tap targets ≥44px.
- [ ] Verify both themes on every page (light is not an inverted dark); grain adapts per theme.
- [ ] Scroll-reveal / hover per `reference-brief.md` §8; everything freezes under
  `prefers-reduced-motion: reduce`.
- [ ] WCAG AA text contrast; visible `--ring` focus on every interactive element; semantic landmarks.

Exit criteria:

- [ ] `reference-brief.md` §14 anti-slop checklist passes with zero true items.

Suggested verification:

- visual matrix (4 bp × 2 themes × `/`, `/projects`, `/projects/[slug]`); keyboard-focus walk.

## Workstream 7: AI surfaces, full verify, closeout

Goal: AI-readability intact, the whole lane green, committed, and pushed.

Depends on:

- [ ] WS6 hardening.

Primary areas:

- `src/app/{robots.ts,sitemap.ts,llms.txt/route.ts,llms-full.txt/route.ts}` (frozen — confirm wired),
  `src/lib/metadata.ts` consumers.

Implementation tasks:

- [ ] Confirm metadata, `sitemap.xml`, `robots.txt`, `llms.txt`/`llms-full.txt` generate correctly and
  headings parse (one `h1`/page, ordered).
- [ ] `pnpm verify` green.
- [ ] Stop helper processes; stage only intentional changes; conventional commit with a HEREDOC body;
  `git push origin design/<lane>`.

Exit criteria:

- [ ] Acceptance Criteria below all satisfied; branch pushed; report delivered.

Suggested verification:

- `pnpm verify`; fetch `/llms.txt`, `/sitemap.xml`, `/robots.txt` in dev and eyeball.

---

## Final Verification And Closeout

- [ ] `pnpm verify` (lint + typecheck + test + build) green.
- [ ] Visual smoke: `/`, `/projects`, one `/projects/[slug]` at desktop **and** mobile, in **both** themes.
- [ ] `reference-brief.md` §14 anti-slop checklist passes with zero true items.
- [ ] AI surfaces (`metadata`, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`) correct.
- [ ] No secrets in tracked files; no stray helper processes left running.
- [ ] Conventional-style commit subject + HEREDOC body; `git push origin design/<lane>` (never `main`).
- [ ] Report: changed files, verification result, remaining gaps (ideally none), commit SHA + push result.

## Acceptance Criteria (Definition of Done)

A lane closes only when **all** are true — not 90%, not "fine":

- [ ] **Every page** fully designed: `/`, `/projects`, and `/projects/[slug]` for all five products. No
  stubs, no half-styled sections.
- [ ] **Every component** in `reference-brief.md` §10 exists, global and token-driven, zero one-off styling.
- [ ] **Every link/CTA** resolves through the content/route layer; nothing dead, nothing hand-built.
- [ ] **Both themes** (dark + light) fully designed; **all four breakpoints** (1440/1024/768/390) clean.
- [ ] Token-driven only — no hardcoded hex/px where a token role exists; frozen contracts untouched.
- [ ] Grain/atmosphere + restrained motion per the brief; `prefers-reduced-motion` honored.
- [ ] WCAG AA text contrast; visible focus rings; semantic landmarks.
- [ ] AI surfaces intact; canonical routes unchanged; static-first.
- [ ] `pnpm verify` green; §14 anti-slop passes.
- [ ] Branch committed and pushed; reads world-class, not "fine".

## Implementation Order

1. WS1 — lane token system (dark + light).
2. WS2 — globals, layout shell, theme switch, atmosphere.
3. WS3 — primitives, header, footer, base UI.
4. WS4 — homepage.
5. WS5 — projects index + detail.
6. WS6 — responsive + themes + motion + a11y hardening.
7. WS7 — AI surfaces, verify, closeout.

## Expansion Track (post-selection — not this session)

- Select one lane; merge to `main`; retire this plan to `docs/_legacy/roadmaps/`.
- Vercel deploy + preview checks; per-project OG/social image generation; analytics; deeper motion polish;
  promote chosen components/preset into the registry.
