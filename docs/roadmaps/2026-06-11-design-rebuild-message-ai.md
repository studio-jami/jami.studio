# jami.studio Design Rebuild — Message AI Lane (`design/message-ai-2`)

Date: 2026-06-11
Status: [ ] Active — execute pass not started
Lane: `message-ai` · Branch: `design/message-ai-2` · Worktree: `../jami.studio-message-ai-2`
Template: **Message AI** (Framer) · Aesthetic: **Lane A — cinematic dark (the prime)**
Accent: `#175d5e` deep teal (dial `cyan`)
Art direction: `docs/design/reference-brief.md` · Framer extraction: `tools/framer-bridge/out/message-ai.{json,full.json,home.png}`
Owner: Jamie

> **ONE lane, ONE branch, ONE worktree.** Reuse the shared CONTRACTS verbatim; build a design whose
> STRUCTURE is **Message AI's**, not any other lane's. The Home IA below is extracted from this template's
> real exported `pageTrees` — build to it. Do **NOT** collapse to a generic
> `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton; that uniform skeleton was the exact failure this rebuild
> replaces. The contracts are shared and frozen; the visible design is this template's and yours.

## Active lane (locked)

- **Template:** Message AI — dark, modern AI-product canvas with subtle grain; oversized display hero,
  scroll-to-explore cue, progressive value sections, teal glow. The cleanest expression of Lane A.
- **Aesthetic lane:** A — cinematic/nocturnal dark (both dark **and** light themes still ship).
- **Accent:** `#175d5e` deep teal — authored as `color.accent` (+ matching `ring`/`accentForeground`),
  surfaced only via `--accent`/`--primary`. Never a literal in a component.
- **Framer key:** `message-ai`.

## Home IA — build THIS (from `message-ai` `pageTrees`)

The real Message AI home renders **9 sections in this order**:
`Hero → Features → Features → Features → WhyItWorks → Testimonials → Pricing → FAQ → FinalCTA`.
Build our home to the same structure + rhythm, mapping each template section to our real content. The three
sequential `Features` sections are a **progressive scroll-driven value cadence** — that cadence is the
signature; do not flatten it into one pillars grid.

1. **Hero** (`Content` / `Scroll` / `BG`) → `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}`.
   Oversized display on a near-black warm/cool charcoal canvas (not `#000`); layered radial **teal** glow
   behind; fine film grain over gentle gradients; a **scroll-to-explore cue** (the template's `Scroll`
   element). The owner-grade nocturnal moment.
2. **Features — beat 1** → pillars *Governed runtime* + *Trusted interfaces* as a focused, scroll-revealed
   value beat (text-led, single teal highlight). Not a 4-up grid.
3. **Features — beat 2** → pillars *Durable coordination* + *Agent-readable knowledge* as the second beat.
4. **Features — beat 3** → product-family lead-in that flows into the **five-project showcase**
   (`projects.ts`, each a `ProjectCard` → `/projects/[slug]`). This is the centerpiece — give it
   portfolio-grade treatment inside the cinematic cadence.
5. **WhyItWorks** (`Title`) → `site.home.proof` — the conviction section ("everything generated from one
   shared source").
6. **Testimonials** → **NO fabricated testimonials.** Replace this slot with a distilled proof band built
   from the projects' real `proofPoints[]`. Earned credibility only — we have no quotes and never invent
   them.
7. **Pricing** → **NO pricing (open-core).** Replace with an honest open-core / OSS callout (GitHub via
   `site.nav` + `studioLinks.githubOrg`). Never invent tiers.
8. **FAQ** (`Text`) → `site.faqs` (3) as an accordion / editorial Q&A.
9. **FinalCTA** (`Content`) → final CTA band ("View projects" / "Read AI index").

**Signature treatment:** progressive scroll-driven value cadence; scroll-to-explore cue; "neon through
fog" teal glow; fine grain over 1–2 low-contrast radial gradients. Keep the template's 9-beat rhythm — only
the content mapping is ours.

## `/projects` index

A cinematic gallery of all five `ProjectCard`s on the same dark canvas — generous spacing, one or two
columns, grain + glow doing the separation. Shared header/footer.

## `/projects/[slug]` detail

Case study in the cinematic idiom, a focused vertical descent (not a fixed band stack): hero
(`name`/`summary`/`positioning` + `project.ctas`), audience/positioning statement, `capabilities[]` as a
progressive list, `proofPoints[]` band, "part of the Studio family" cross-links, final CTA.
`generateStaticParams` for all five slugs + per-project `generateMetadata`.

## Component decomposition (name them this template's way)

`Hero`, `FeatureBeat` (one component, reused ×3 via props), `ProofConviction` (WhyItWorks), `ShowcaseGrid`
+ `ProjectCard`, `ProofPointBand` (Testimonials slot), `OpenCoreCallout` (Pricing slot), `FAQ`, `FinalCTA`,
`SiteHeader`/`SiteFooter`, `GrainOverlay`/`Atmosphere`, `ThemeToggle`, layout `Container`/`Section`.
Variants are props, never forks.

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
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` only — never add or rename a route. Hrefs come
  only from the content/route layer (`resolveProjectLink`, `site.*`, `src/lib/routes.ts`); never
  hand-built.
- **Accent is a token, not a literal:** author `color.accent` (+ `ring`/`accentForeground`) → surfaced only
  via `--accent`/`--primary`. Both dark + light themes ship, switched over `tokenCssVariables()` via
  `[data-theme]`.
- **Surface shared identity:** `site.social` + `site.email` in the footer/contact area; keep
  `createMetadata` + JSON-LD + `sitemap`/`robots`/`llms.txt` wired.

## Workstreams (sequential; each consumes the one before)

1. **WS1 — tokens/theme.** `src/tokens/theme.ts`: dark + light presets on `#175d5e` teal; display/sans/mono
   faces + `--grain-opacity` per `reference-brief.md` §6/§7 (dark 0.03–0.07). `pnpm typecheck` green; both
   presets validate; var names match `tokenCssVariables()` exactly.
2. **WS2 — globals + shell + theme switch + atmosphere.** `globals.css`, `layout.tsx`, `GrainOverlay`,
   `ThemeToggle`; emit `:root` + `[data-theme="dark"]` from `tokenCssVariables()`; no-flash init; static
   `feTurbulence` data-URI grain (never animated); keep metadata + JSON-LD + AI wiring. Reduced-motion is a
   hard gate.
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + `ThemeToggle` +
   mobile menu), `SiteFooter` (`site.footerLinks` + `site.social` + `site.email` + AI index), `Button` /
   `Badge` / `Eyebrow` / `Container` / `Section` / `SectionHeading`. One radius scale, one motion.
4. **WS4 — Home (`/`).** Build the **Home IA** above — this template's section set + order.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the index + detail above.
6. **WS6 — responsive + themes + motion + a11y hardening.** 1440/1024/768/390 × both themes; AA contrast;
   visible `--ring` focus; ≥44px tap targets; no horizontal scroll at 390; motion freezes under
   `prefers-reduced-motion`.
7. **WS7 — AI surfaces + verify + closeout.** Confirm metadata/sitemap/robots/llms generate correctly and
   headings parse; `pnpm verify` green; stop helper processes; stage only intentional changes;
   conventional-style commit + HEREDOC body; `git push origin design/message-ai-2`.

## Acceptance criteria (Definition of Done — all true, not 90%)

- Every page fully designed: `/`, `/projects`, `/projects/[slug]` × all five products. No stubs, no
  half-styled sections.
- The home + detail compositions match **Message AI's** information architecture above — not another lane's,
  not a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton.
- Every required content job has a home; every CTA resolves through the content/route layer.
- Both themes fully designed; all four breakpoints clean; token-driven only (no hardcoded hex/px where a
  token role exists); frozen contracts untouched.
- Grain/atmosphere + restrained motion per the brief; `prefers-reduced-motion` honored. WCAG AA text
  contrast; visible focus rings; semantic landmarks.
- **No fabricated content** (no fake testimonials/reviews/logos/metrics/pricing/posts); no
  placeholder/"coming soon"/status copy. AI surfaces intact; canonical routes unchanged; static-first.
- `pnpm verify` green; `reference-brief.md` §14 anti-slop passes with zero true items.
- Committed and pushed to `design/message-ai-2` (**never main**); reads world-class, not "fine".
