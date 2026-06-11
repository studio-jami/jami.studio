# jami.studio Design Rebuild — Noir Lane (`design/noir-2`)

Date: 2026-06-11
Status: [ ] Active — execute pass not started
Lane: `noir` · Branch: `design/noir-2` · Worktree: `../jami.studio-noir-2`
Template: **Noir** (Framer) · Aesthetic: **Lane A — high-contrast dark agency**
Accent: `#a1704f` copper (dial `amber`)
Art direction: `docs/design/reference-brief.md` · Framer extraction: `tools/framer-bridge/out/noir.{json,full.json,home.png}`
Owner: Jamie

> **ONE lane, ONE branch, ONE worktree.** Reuse the shared CONTRACTS verbatim; build a design whose
> STRUCTURE is **Noir's**, not any other lane's. The Home IA below is extracted from this template's real
> exported `pageTrees` — build to it. Do **NOT** collapse to a generic
> `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton; that uniform skeleton was the exact failure this rebuild
> replaces. The contracts are shared and frozen; the visible design is this template's and yours.

## Active lane (locked)

- **Template:** Noir — deep high-contrast dark agency portfolio: numbered sections, work grid → services
  list → proof → FAQ → CTA. The textbook *dark agency-portfolio IA*.
- **Aesthetic lane:** A — high-contrast dark agency (both dark **and** light themes still ship).
- **Accent:** `#a1704f` copper — authored as `color.accent` (+ `ring`/`accentForeground`), surfaced only
  via `--accent`/`--primary`. Never a literal. Warm copper on near-black.
- **Framer key:** `noir`.

## Home IA — build THIS (from `noir` `pageTrees`)

The real Noir home renders a `NavBar` instance, then **these sections in this order**, then a `Footer`
instance:
`Hero → Project Section → Service Section → Stats Section → Feedback Section → Pricing Section → Blog Section`.
Build our home to the same structure + rhythm with **numbered sections (01/02/03 …)** as the editorial
spine. Map each template section to our real content.

- `NavBar` → `SiteHeader`.
1. **Hero** → `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}`. Deep high-contrast near-black,
   copper accent, oversized type. The numbered system starts here.
2. **Project Section** → the **five projects as a numbered work grid (01–05)** — the centerpiece (the
   "selected work" of a dark agency portfolio), each a `ProjectCard` → `/projects/[slug]`.
3. **Service Section** → the four `site.home.pillars` / `capabilities[]` as numbered "services" with
   progressive disclosure.
4. **Stats Section** → **NO fabricated metrics.** Use ONLY honest, real facts (e.g. "5 products · one
   shared source · open-core") drawn from the actual content. If no honest number fits a slot, express the
   `site.home.proof` line instead — never invent a statistic.
5. **Feedback Section** → **NO fake testimonials/feedback.** Map to a distilled `proofPoints[]` /
   positioning band.
6. **Pricing Section** → **NO pricing (open-core).** Map to an open-core / OSS stance (GitHub) or merge into
   the CTA. Never invent tiers.
7. **Blog Section** → **NO blog.** Map to the AI-readable index callout (`site.nav` "AI index" +
   `llms.txt`), or drop. Never invent posts.
- `Footer` → `SiteFooter` (organized, numbered).
- Add a final **CTA band** before the footer, consistent with the numbered system.

**Signature treatment:** numbered sections (`01` / `02` / `03` …) as the editorial spine; warm copper on
deep near-black; high text contrast; textbook dark agency-portfolio rhythm. Grain over gentle glow.

## `/projects` index

A numbered work grid of all five projects (01–05) in Noir's idiom. Shared header/footer.

## `/projects/[slug]` detail

Numbered agency case study (Noir's project pages are CMS-driven, so compose to the numbered system):
**01** overview (`name`/`summary`/`positioning` + `project.ctas`), **02** `capabilities[]`, **03**
`proofPoints[]`, **04** family cross-links, then a final CTA. `generateStaticParams` for all five slugs +
per-project `generateMetadata`.

## Component decomposition (name them this template's way)

`SiteHeader` (NavBar), `Hero`, `NumberedWorkGrid` + `ProjectCard`, `NumberedServiceList`, `HonestFactsRow`
(Stats slot — real facts only), `ProofPointBand` (Feedback slot), `OpenCoreCallout` (Pricing slot),
`AIIndexCallout` (Blog slot), `CTABand`, `SectionNumber`/`SectionHeading`, `SiteFooter`,
`GrainOverlay`/`Atmosphere`, `ThemeToggle`, layout `Container`/`Section`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; identical on every lane; never edit)

- **Frozen, do not edit:** `src/content/*` (all copy — `site.ts`, `projects.ts` [5 projects: `harness`,
  `registry`, `orchestra`, `intercal`, `collectiva`], `links.ts`), `src/lib/*`
  (routes/metadata/sitemap/ai-public-files), `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (the fixed
  46-var contract), `src/registry/manifest.ts`. Tests are frozen too — incl. `tests/config-panel.test.tsx`
  (every dial label + description and the "Tokens"/"Registry" tab views must still render) and the
  `public/social/*.svg` existence checks. A lane never edits a test to pass.
- **Build entirely fresh:** `src/tokens/theme.ts` (this lane's **dark + light** `TokenPreset` VALUES,
  validated by `validateTokenPreset`, **6-digit hex only** — convert any `rgb()` from the extraction), all
  `src/components/*`, all `src/app/**` presentation, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` only — never add or rename a route (Noir's own
  `/services`, `/blogs`, `/about`, `/projects`, `/contact` pages do not become new routes; their content
  lives in our home/detail/footer). Hrefs come only from the content/route layer (`resolveProjectLink`,
  `site.*`, `src/lib/routes.ts`); never hand-built.
- **Accent is a token, not a literal:** author `color.accent` (+ `ring`/`accentForeground`) → surfaced only
  via `--accent`/`--primary`. Both dark + light themes ship, switched over `tokenCssVariables()` via
  `[data-theme]`.
- **Surface shared identity:** `site.social` + `site.email` in the footer/contact area; keep
  `createMetadata` + JSON-LD + `sitemap`/`robots`/`llms.txt` wired.

## Workstreams (sequential; each consumes the one before)

1. **WS1 — tokens/theme.** `src/tokens/theme.ts`: dark + light presets on `#a1704f` copper; faces +
   `--grain-opacity` per `reference-brief.md` §6/§7 (dark 0.03–0.07). Watch dark primary-button AA on
   copper. `pnpm typecheck` green; both presets validate; var names match `tokenCssVariables()` exactly.
2. **WS2 — globals + shell + theme switch + atmosphere.** `globals.css`, `layout.tsx`, `GrainOverlay`,
   `ThemeToggle`; emit `:root` + `[data-theme="dark"]` from `tokenCssVariables()`; no-flash init; static
   `feTurbulence` data-URI grain (never animated); keep metadata + JSON-LD + AI wiring. Reduced-motion is a
   hard gate.
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + `ThemeToggle` +
   mobile menu), `SiteFooter` (`site.footerLinks` + `site.social` + `site.email` + AI index), `Button` /
   `Badge` / `Eyebrow` / `Container` / `Section` / `SectionNumber`/`SectionHeading`. One radius scale, one
   motion.
4. **WS4 — Home (`/`).** Build the **Home IA** above — this template's numbered section set + order.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the numbered index + detail above.
6. **WS6 — responsive + themes + motion + a11y hardening.** 1440/1024/768/390 × both themes; AA contrast
   (copper especially); visible `--ring` focus; ≥44px tap targets; no horizontal scroll at 390; motion
   freezes under `prefers-reduced-motion`.
7. **WS7 — AI surfaces + verify + closeout.** Confirm metadata/sitemap/robots/llms generate correctly and
   headings parse (one `h1`/page, ordered); `pnpm verify` green; stop helper processes; stage only
   intentional changes; conventional-style commit + HEREDOC body; `git push origin design/noir-2`.

## Acceptance criteria (Definition of Done — all true, not 90%)

- Every page fully designed: `/`, `/projects`, `/projects/[slug]` × all five products. No stubs, no
  half-styled sections.
- The home + detail compositions match **Noir's** numbered information architecture above — not another
  lane's, not a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton.
- Every required content job has a home; every CTA resolves through the content/route layer.
- Both themes fully designed; all four breakpoints clean; token-driven only (no hardcoded hex/px where a
  token role exists); frozen contracts untouched.
- Grain/atmosphere + restrained motion per the brief; `prefers-reduced-motion` honored. WCAG AA text
  contrast; visible focus rings; semantic landmarks.
- **No fabricated content** (no fake testimonials/reviews/logos/metrics/pricing/posts); no
  placeholder/"coming soon"/status copy. AI surfaces intact; canonical routes unchanged; static-first.
- `pnpm verify` green; `reference-brief.md` §14 anti-slop passes with zero true items.
- Committed and pushed to `design/noir-2` (**never main**); reads world-class, not "fine".
