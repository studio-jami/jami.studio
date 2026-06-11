# jami.studio Design Rebuild — Nouva Lane (`design/nouva-2`)

Date: 2026-06-11
Status: [ ] Active — execute pass not started
Lane: `nouva` · Branch: `design/nouva-2` · Worktree: `../jami.studio-nouva-2`
Template: **Nouva** (Framer) · Aesthetic: **Lane B — bold light editorial**
Accent: `#854780` magenta (dial `violet`)
Art direction: `docs/design/reference-brief.md` · Framer extraction: `tools/framer-bridge/out/nouva.{json,full.json,home.png}`
Owner: Jamie

> **ONE lane, ONE branch, ONE worktree.** Reuse the shared CONTRACTS verbatim; build a design whose
> STRUCTURE is **Nouva's**, not any other lane's. The Home IA below is extracted from this template's real
> exported `pageTrees` — build to it. Do **NOT** collapse to a generic
> `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton; that uniform skeleton was the exact failure this rebuild
> replaces. The contracts are shared and frozen; the visible design is this template's and yours.

## Active lane (locked)

- **Template:** Nouva — bold studio/agency portfolio energy: strong visual identity, work shown with
  clarity and impact, editorial confidence. The *work-forward* showcase posture.
- **Aesthetic lane:** B — bold light editorial (both dark **and** light themes still ship).
- **Accent:** `#854780` magenta — authored as `color.accent` (+ `ring`/`accentForeground`), surfaced only
  via `--accent`/`--primary`. Never a literal. Reserved for one editorial highlight per section +
  interactive states.
- **Framer key:** `nouva`.

## Home IA — build THIS (from `nouva` `pageTrees`)

The real Nouva home is one `Main` wrapper rendering **10 sections in this order**:
`Hero → Why It Matters → Intro → Features → Benefits → Comparison → Testimonials → Pricing → FAQ → CTA`.
Build our home to the same structure + rhythm, mapping each template section to our real content.

1. **Hero** → `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}`. Bold light editorial — strong
   display face (grotesk or didone-adjacent), near-white layered canvas (not stark `#fff`), magenta as the
   single highlight. Work-forward confidence.
2. **Why It Matters** → the studio thesis: expand `site.home.lead` / positioning into an editorial "why an
   agent-native, open-core product family matters."
3. **Intro** → studio intro; introduce the four `site.home.pillars` as an editorial statement (oversized
   section number, hairline rule).
4. **Features** → the four `site.home.pillars` as editorial feature blocks.
5. **Benefits** → distilled `capabilities[]` themes across the family, framed as benefits.
6. **Comparison** → **NO competitor comparison / fabrication.** Reframe as the honest single-source contrast
   from `site.home.proof` ("scattered surfaces vs. one shared source") — a structural before/after. Never a
   competitor table or an invented rival.
7. **Testimonials** → **NO fake testimonials.** This is Nouva's work-forward slot → make it the
   **five-project product-family showcase** (the studio's "selected work"), each a `ProjectCard` →
   `/projects/[slug]`. Centerpiece.
8. **Pricing** → **NO pricing (open-core).** Replace with an open-core / OSS stance callout (GitHub) or
   merge into the showcase CTA. Never invent tiers.
9. **FAQ** → `site.faqs` (3).
10. **CTA** → final editorial CTA band before the footer.

**Signature treatment:** print-quality editorial — oversized section numbers (01–06), hairline dividers,
strong display face, generous gutters, work-forward. Magenta as the single editorial highlight per section.
Texture is optional/faint (Lane B); structure and type carry it.

## `/projects` index

An editorial card-grid gallery of all five projects — oversized numbering, hairline rules, generous gutters.
Shared header/footer.

## `/projects/[slug]` detail

Editorial case study: title/summary/positioning hero, audience/positioning as a pull-quote, `capabilities[]`
as a numbered editorial list, `proofPoints[]`, family cross-links, CTA band. `generateStaticParams` for all
five slugs + per-project `generateMetadata`.

## Component decomposition (name them this template's way)

`Hero`, `ThesisStatement` (Why It Matters), `StudioIntro`, `PillarFeatureBlock`, `BenefitsList`,
`SingleSourceContrast` (Comparison slot), `ShowcaseGrid` + `ProjectCard` (Testimonials slot),
`OpenCoreCallout` (Pricing slot), `FAQ`, `CTABand`, `SectionNumber`/`SectionHeading`,
`SiteHeader`/`SiteFooter`, `ThemeToggle`, layout `Container`/`Section`. Variants are props, never forks.

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
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` only — never add or rename a route (Nouva's own
  `/contact` page folds into the footer's `site.email` + `site.social`). Hrefs come only from the
  content/route layer (`resolveProjectLink`, `site.*`, `src/lib/routes.ts`); never hand-built.
- **Accent is a token, not a literal:** author `color.accent` (+ `ring`/`accentForeground`) → surfaced only
  via `--accent`/`--primary`. Both dark + light themes ship, switched over `tokenCssVariables()` via
  `[data-theme]`.
- **Surface shared identity:** `site.social` + `site.email` in the footer/contact area; keep
  `createMetadata` + JSON-LD + `sitemap`/`robots`/`llms.txt` wired.

## Workstreams (sequential; each consumes the one before)

1. **WS1 — tokens/theme.** `src/tokens/theme.ts`: dark + light presets on `#854780` magenta; faces +
   `--grain-opacity` per `reference-brief.md` §6/§7 (light ≤0.03 or none). `pnpm typecheck` green; both
   presets validate; var names match `tokenCssVariables()` exactly.
2. **WS2 — globals + shell + theme switch + atmosphere.** `globals.css`, `layout.tsx`, optional faint paper
   grain, `ThemeToggle`; emit `:root` + `[data-theme="dark"]` from `tokenCssVariables()`; no-flash init;
   keep metadata + JSON-LD + AI wiring. Reduced-motion is a hard gate.
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + `ThemeToggle` +
   mobile menu), `SiteFooter` (`site.footerLinks` + `site.social` + `site.email` + AI index), `Button` /
   `Badge` / `Eyebrow` / `Container` / `Section` / `SectionNumber`. One radius scale, one motion.
4. **WS4 — Home (`/`).** Build the **Home IA** above — this template's section set + order.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the index + detail above.
6. **WS6 — responsive + themes + motion + a11y hardening.** 1440/1024/768/390 × both themes; AA contrast;
   visible `--ring` focus; ≥44px tap targets; no horizontal scroll at 390; motion freezes under
   `prefers-reduced-motion`. Light is not an inverted dark.
7. **WS7 — AI surfaces + verify + closeout.** Confirm metadata/sitemap/robots/llms generate correctly and
   headings parse; `pnpm verify` green; stop helper processes; stage only intentional changes;
   conventional-style commit + HEREDOC body; `git push origin design/nouva-2`.

## Acceptance criteria (Definition of Done — all true, not 90%)

- Every page fully designed: `/`, `/projects`, `/projects/[slug]` × all five products. No stubs, no
  half-styled sections.
- The home + detail compositions match **Nouva's** information architecture above — not another lane's, not
  a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton.
- Every required content job has a home; every CTA resolves through the content/route layer.
- Both themes fully designed; all four breakpoints clean; token-driven only (no hardcoded hex/px where a
  token role exists); frozen contracts untouched.
- Texture/motion per the brief; `prefers-reduced-motion` honored. WCAG AA text contrast; visible focus
  rings; semantic landmarks.
- **No fabricated content** (no fake testimonials/reviews/logos/metrics/pricing/posts); no
  placeholder/"coming soon"/status copy. AI surfaces intact; canonical routes unchanged; static-first.
- `pnpm verify` green; `reference-brief.md` §14 anti-slop passes with zero true items.
- Committed and pushed to `design/nouva-2` (**never main**); reads world-class, not "fine".
