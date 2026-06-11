# Plan Audit & Corrections — 5-Lane Design Rebuild (Fable pass, 2026-06-11)

Date: 2026-06-11
Status: [x] Complete — every item verified or fixed; baseline proven green
Auditor: Fable 5 goal session (audit/execute)
Scope: every plan, doc, contract, and tool feeding the 5-lane Opus design session
Owner: Jamie

A prior session produced the plans and tooling with several unverified assumptions. This pass
re-verified **every** claim against the live repo, live APIs, and official sources, and fixed what
was wrong. Verdict legend: **OK** (correct as written) / **FIXED** (was wrong or incomplete →
corrected in this pass).

---

## 1. Framer Server API depth — FIXED (extraction deepened, docs corrected)

**Checked:** `framer-api@0.1.14` (npm latest; registry last modified 2026-06-05), its full installed
type surface (`tools/framer-bridge/node_modules/framer-api/dist/index.d.ts`), live probes against
all five real projects, and the official docs.

**Sources:** npm registry (`npm view framer-api`), https://www.framer.com/developers/server-api-introduction
(open beta, per-project API keys), https://www.framer.com/developers/server-api-reference,
https://www.framer.com/developers/nodes, live execution against all 5 projects on 2026-06-11.

**What the prior agent got right:** `getNodesWithType` + `getColorStyles` + `getTextStyles` are real,
current, and return the full typed data (verified live). The "shallow read" correction was sound.

**What was wrong → fixed:**

- **`CONNECTIONS.md` claimed the `*ForAgent` serializers were "not exposed in this client build" —
  false.** The SDK ships a `framer.agent` namespace (`FramerAgentAPI`) that works headless over the
  Server API (proven by execution): `agent.getNode({id},{pagePath})` returns a **whole page as one
  nested hierarchy** (named sections in order, `htmlTag`, stack/grid layout, gap, padding,
  per-breakpoint frames) — 135 KB for the Message AI home page in one call; `agent.getContext()`
  returns the project's own summary (fonts, components+ids, tokens, style presets, site map).
- **The flat `getNodesWithType` arrays carry no parent/child links**, so the old `full.json` was a
  flat node dump, not the "full node tree" the docs claimed. Structure/rhythm was not actually
  readable from it.
- **`ComponentInstanceNode` was never extracted** — the SDK supports it (230–654 instances per
  template, incl. `componentName` + per-instance `controls`).
- **`screenshot` "width is not adjustable" was incomplete:** `ScreenshotOptions` supports `format`
  (`png`|`jpeg`), `quality`, `scale` (0.5–4 pixel-density multiplier), and `clip`. No
  viewport/breakpoint width control — that part was right.
- **`getVariables`** is a per-`ComponentNode`/`VectorSetItem` method (component variables), not a
  project-level design-token reader; the project tokens **are** the color/text styles. Clarified.

**Changes made:** `inspect.mjs` now also extracts `ComponentInstanceNode`, per-page hierarchical
trees (`framer.agent.getNode`), and `agent.getContext()`; `out/<lane>.json` gains `agentContext` +
instance/tree counts, `out/<lane>.full.json` gains `pageTrees` (start-here structure) + `instances`.
Re-extracted **all five** templates 2026-06-11 and re-deposited all artifacts into all five
worktrees. Per-template results (pages / page-trees / frames / texts / instances / components /
colors / text-styles): message-ai 2/2/756/451/338/19/19/7 · nouva 4/3/700/338/280/19/17/12 ·
kirimo 10/9/1241/733/230/22/8/15 · noir 10/7/1956/507/609/39/19/17 · synk 8/8/3281/848/654/38/16/8.
Page trees < pages only where a path is a CMS detail template (`/blogs/:slug` etc.) — documented in
`CONNECTIONS.md`. Docs updated: `CONNECTIONS.md` (live SDK surface rewritten), bridge `README.md`,
`reference-brief.md` §13, roadmap §1/§4, `design-goal.md`.

## 2. Next.js 16 / React 19 claims — OK (verified, no changes needed)

**Checked:** every framework claim in the roadmap against Next.js official docs (Context7
`/vercel/next.js`) and by execution (`pnpm build` on Next 16.2.7).

- App Router + RSC-by-default, client components only at interactive leaves — current guidance. OK.
- `generateStaticParams` / `generateMetadata` with **async `params` (Promise)** — current API; the
  repo already awaits `params` correctly. OK.
- `next/font/local` / `next/font/google` automatic self-hosting, `display: swap`, preload, subsets —
  current. OK.
- `robots.ts` / `sitemap.ts` `MetadataRoute` file conventions and `llms.txt` route handlers with
  `export const dynamic = "force-static"` — current (route handlers are uncached by default since
  Next 15; `force-static` is the documented opt-in). Proven by the build output: all of
  `/robots.txt`, `/sitemap.xml`, `/llms.txt`, `/llms-full.txt` prerender static. OK.
- `[data-theme]` no-flash inline theme-init — framework-agnostic standard technique, correctly
  described. OK.

**Source:** Next.js docs via Context7 (`generate-static-params.mdx`, `version-15.mdx` upgrade notes,
`font.mdx`, `dynamic-routes.mdx`) + live build (Next 16.2.7, Turbopack).

## 3. Token system boundary — FIXED (two doc gaps)

**Checked:** `schema.ts`, `css-vars.ts`, `presets.ts` read in full; cross-checked every roadmap claim.

- Frozen-vs-branch-owned split, accent enum (`cyan|green|amber|rose|violet`), 7 dials, light-only
  foundation preset, no `[data-theme]` switch yet — all accurate. OK.
- **FIXED:** the roadmap's "fixed CSS-var names" list omitted four exported vars
  (`--popover-foreground`, `--primary-foreground`, `--secondary-foreground`, `--panel-foreground`).
  Now the complete 46-var list.
- **FIXED:** the roadmap said manifest **and** config panel import `dialDefinitions` + `tokenPresets`;
  in fact `config-panel.tsx` imports `createTokenPresetFromDials` + `dialDefinitions` +
  `neutralFoundationDials`. All five exports are now named as must-keep.
- **Added:** schema requires 6-digit hex for all `color.*`/`surface.*` — Framer extraction emits
  `rgb()`; agents must convert. Now stated in the roadmap.
- Dark+light shipping path is unambiguous: author both presets in `src/tokens/theme.ts`, validate
  with `validateTokenPreset`, emit `:root` + `[data-theme="dark"]` blocks from `tokenCssVariables()`.
  No contract fork needed; `registry/manifest.ts` and the config panel keep compiling. OK.

## 4. Content/lib contracts — OK (verified field-by-field)

**Checked:** `site.ts`, `projects.ts`, `links.ts`, `routes.ts`, `metadata.ts`, `ai-public-files.ts`,
`sitemap.ts` read in full. Every field the roadmap/brief reference exists exactly as stated:
`site.nav` (Projects / AI index / GitHub), `site.home.{eyebrow,title,lead,primaryCta,secondaryCta,
pillars[4],proof}`, `site.faqs[3]`, `site.footerLinks` (5 project shortlinks + Robots + Sitemap),
`site.handles`; 5 projects with slugs `harness|registry|orchestra|intercal|collectiva`, all
`StudioProject` fields, CTAs resolved by `resolveProjectLink`, `getProject(slug)`;
`studioLinks.githubOrg = https://github.com/studio-jami`; `absoluteUrl`, `projectPath`,
`projectLinkTargets`, `publicRoutes`, `createMetadata`, `createProjectMetadata`,
`organizationJsonLd`, `websiteJsonLd`, `projectJsonLd`. No drift found; no changes needed.

## 5. Baseline build — OK (proven, was previously unproven)

`pnpm install` + `pnpm verify` run on `main` 2026-06-11: lint clean, typecheck clean, **17/17 tests
pass (5 files)**, `next build` (16.2.7) generates all 14 static routes. The "foundation is good and
reused verbatim" claim is now proven, not assumed. Re-run after this pass's edits: still green.

**FIXED (hidden test constraint):** `tests/config-panel.test.tsx` pins more than "keeps compiling" —
it requires every dial label+description rendered and the "Tokens"/"Registry" tab views with specific
registry strings. A lane "rebuilding config-panel presentation" per the old roadmap wording could
break `pnpm verify`. The roadmap now states the tested behavior explicitly and that tests are frozen.
Same for `public/social/*.svg` (existence-checked by tests + used by metadata) — now called out.

## 6. Worktree readiness — OK (proven)

All five worktrees exist at `../jami.studio-<lane>`, each on its lane branch, each differing from
`main` only in the roadmap's Per-Lane Target block (verified per-branch diff). Each has the three
refreshed artifacts (`<lane>.json`, `<lane>.full.json`, `<lane>.home.png` — `out/` is gitignored, so
deposits are file copies). Proven by execution in `jami.studio-message-ai`: `pnpm install` (22 s),
`pnpm dev -p 3001` ready in 3.1 s, `/` and `/llms.txt` return 200, **no `.env` present or needed**
(zero `process.env` references in `src/`). Five parallel `next dev` servers on 3001–3005 are
feasible (independent worktrees, independent `.next/`, distinct ports).

## 7. `export.mjs` / unframer — FIXED (bug + misleading docs)

**Checked:** unframer 4.1.9 docs (https://github.com/remorses/unframer) + live execution.

- **Verified precondition:** unframer reads the **published JS modules generated by Framer's "React
  Export" marketplace plugin**. The operator must install that plugin in the project, select
  components for export, and publish. Live run against the Message AI project reproduces the exact
  failure: `Project with id message-ai--gz0N not found. Please ensure you've exported components
  from Framer first.` (HTTP 404). The old docs blamed "Google login / React Export subscription" —
  wrong cause.
- **FIXED (real bug):** `export.mjs` derived the project id as the URL's last path segment without
  stripping the query — all five stored URLs carry `?node=…`, so every export call would have used a
  broken id. Now stripped.
- **FIXED (docs):** `export.mjs` header, bridge `README.md`, and `CONNECTIONS.md` now state it is
  optional, NOT part of the lane workflow, list the exact precondition, and note that no template
  project currently has it set up. Lanes do not depend on it.

## 8. Doc coherence — OK after fixes

- `design-goal.md` (orchestrator) ↔ roadmap (work order) ↔ `reference-brief.md` (art direction) ↔
  `AGENTS.md` — no contradictions found after the fixes above. The execute→audit/fix goal-session
  model is consistent with `orchestration-reliability.md` (short-interval polling, roadmap
  checkpoints, never context-only state).
- Roadmap conforms to `docs/engineering/standards/planning-style.md`: all eleven required sections
  present in order (the extra "Per-Lane Target" block is an addition, not a violation).
- All five branch roadmaps carry the correct "Active lane" block (lane, template, aesthetic lane,
  accent, bridge key) — verified per branch.
- **FIXED:** the pass-1 goal prompt referenced only `out/<LANE-KEY>.json`; it now names all three
  artifacts and what each is for.
- `docs/README.md` Active Plan pointers are correct.

## 9. Other findings

- **Push auth (stale assumption):** `gh` is logged in as `jamesnavinhill`, which now has
  **admin+push** on `studio-jami/jami.studio` (verified via `gh api` and a real `git push --dry-run`
  that authenticated and would have created a branch). Plain `git push origin <branch>` works from
  the repo and every worktree via the gh credential helper — the lane prompts' push step is valid
  as written. The classic PAT in the root `.env` remains a fallback; no token was written to any git
  config (verified: `.git/config` holds only the plain remote URL).
- **Font licensing (wrong claim):** `reference-brief.md` §6 listed Cabinet Grotesk as a licensed
  face. It is **free for commercial use** under the ITF Free Font License via Fontshare
  (https://www.fontshare.com/fonts/cabinet-grotesk). Fixed; also noted the extracted templates use
  Google-Fonts faces (Host Grotesk, DM Sans, …) self-hostable via `next/font/google`.
- **Secrets sweep:** no secret values in any tracked file (pattern scan over all 124 tracked files,
  including `terminals/` logs). Root `.env` and `out/` remain gitignored; `.env.example` documents
  names only.
- `mcps/` and `terminals/` are tracked, prettierignored utility/log dirs unrelated to the design
  session; left untouched (non-destructive), noted here for the owner.
- `vitest`/`tsconfig`/`eslint` configs verified compatible with the lane workflow (eslint covers
  `tools/`, so bridge scripts stay lint-clean; verify gate proves it).

## Final state

- `pnpm verify` green on `main` after all corrections.
- Corrected docs + tooling committed to `main` and merged into all five lane branches; all six
  branches pushed; refreshed Framer artifacts deposited in all five worktrees.
- No blockers, no known ambiguities: five lanes ready for their execute pass.
