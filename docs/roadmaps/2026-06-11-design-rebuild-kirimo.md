# jami.studio Design Rebuild — Kirimo Lane (`design/kirimo-2`)

Date: 2026-06-11
Status: [ ] Active — execute pass not started
Lane: `kirimo` · Branch: `design/kirimo-2` · Worktree: `../jami.studio-kirimo-2`
Template: **Kirimo** (Framer) · Aesthetic: **Lane A — immersive dark creative**
Accent: `#854c63` wine-rose (dial `rose`)
Art direction: `docs/design/reference-brief.md` · Framer extraction: `tools/framer-bridge/out/kirimo.{json,full.json,home.png}`
Owner: Jamie

> **ONE lane, ONE branch, ONE worktree.** Reuse the shared CONTRACTS verbatim; build a design whose
> STRUCTURE is **Kirimo's**, not any other lane's. The Home IA below is extracted from this template's real
> exported `pageTrees` — build to it. Do **NOT** collapse to a generic
> `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton; that uniform skeleton was the exact failure this rebuild
> replaces. The contracts are shared and frozen; the visible design is this template's and yours.

## Active lane (locked)

- **Template:** Kirimo — creative-portfolio template: immersive, dynamic showcase, intuitive nav,
  aesthetic-forward. Borrow its *gallery immersion* for the product-family showcase.
- **Aesthetic lane:** A — immersive dark creative (both dark **and** light themes still ship).
- **Accent:** `#854c63` wine-rose — authored as `color.accent` (+ `ring`/`accentForeground`), surfaced only
  via `--accent`/`--primary`. Never a literal.
- **Framer key:** `kirimo`.

## Home IA — build THIS (from `kirimo` `pageTrees`)

The real Kirimo home renders **9 sections in this order**:
`Hero → Project Slider → Our Client → About Us → Our Service → Our Project → Testimonials → CTA → Our News`.
Build our home to the same structure + rhythm, mapping each template section to our real content. This
template is the richest *gallery* — lean into the showcase.

1. **Hero** → `site.home.{eyebrow,title,lead,primaryCta,secondaryCta}`. Immersive dark, aesthetic-forward,
   wine-rose glow + fine grain, dynamic.
2. **Project Slider** → the **five projects as an immersive slider/showcase** (centerpiece #1) — each slide a
   `ProjectCard` → `/projects/[slug]`. No autoplay; manual/scroll-driven; **freezes under
   `prefers-reduced-motion`**.
3. **Our Client** → **NO fake client logos.** Map to `site.home.proof` (the honest credibility line), not a
   logo wall.
4. **About Us** → the studio/platform story + the four `site.home.pillars` as the studio's stance.
5. **Our Service** → the pillars / `capabilities[]` themes as "what the studio does."
6. **Our Project** → the five projects reprised as an **immersive grid** (a deeper gallery complementing the
   slider) → links into `/projects`.
7. **Testimonials** → **NO fake testimonials.** Map to a distilled `proofPoints[]` band.
8. **CTA** → final CTA band.
9. **Our News** → **NO blog/news.** Map to the AI-readable index callout (`site.nav` "AI index" +
   `llms.txt`) or fold into the footer. Never invent articles.

**Signature treatment:** immersive gallery; a real **project slider**; dynamic rhythm; aesthetic-forward
dark with wine-rose accent; grain over gentle glow. Two distinct showcase treatments (slider + grid) is the
Kirimo move.

## `/projects` index

An immersive gallery of all five projects in Kirimo's idiom (slider and/or expressive grid). Shared
header/footer.

## `/projects/[slug]` detail

Kirimo ships the richest detail page — from `/portfolio/project01` `pageTrees`:
`Project Title → Portfolio Image → Content Section → Listing → Listing → Content Section → Listing → Content Section → Image Section → Next`.
Map: **Project Title** → `name`/`summary`/`positioning` hero; **Portfolio/Image Section** → `socialImage` +
atmosphere; **Content Sections** → positioning/audience narrative; **Listings** → `capabilities[]` +
`proofPoints[]` as structured lists; **Next** → next-project cross-link (the Studio family). Use it fully.
`generateStaticParams` for all five slugs + per-project `generateMetadata`.

## Component decomposition (name them this template's way)

`Hero`, `ProjectSlider` + `ProjectCard`, `ProofLine` (Our Client slot), `StudioAbout`, `ServicePillars`,
`ProjectGrid` (Our Project), `ProofPointBand` (Testimonials slot), `CTABand`, `AIIndexCallout` (Our News
slot), and for detail `DetailHero`/`ContentSection`/`Listing`/`NextProject`. Plus `SiteHeader`/`SiteFooter`,
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
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` only — never add or rename a route (Kirimo's own
  `/about`, `/portfolio`, `/insights`, `/contact` pages do not become new routes; their content lives in our
  home/detail/footer). Hrefs come only from the content/route layer (`resolveProjectLink`, `site.*`,
  `src/lib/routes.ts`); never hand-built.
- **Accent is a token, not a literal:** author `color.accent` (+ `ring`/`accentForeground`) → surfaced only
  via `--accent`/`--primary`. Both dark + light themes ship, switched over `tokenCssVariables()` via
  `[data-theme]`.
- **Surface shared identity:** `site.social` + `site.email` in the footer/contact area; keep
  `createMetadata` + JSON-LD + `sitemap`/`robots`/`llms.txt` wired.

## Workstreams (sequential; each consumes the one before)

1. **WS1 — tokens/theme.** `src/tokens/theme.ts`: dark + light presets on `#854c63` wine-rose; faces +
   `--grain-opacity` per `reference-brief.md` §6/§7 (dark 0.03–0.07). `pnpm typecheck` green; both presets
   validate; var names match `tokenCssVariables()` exactly.
2. **WS2 — globals + shell + theme switch + atmosphere.** `globals.css`, `layout.tsx`, `GrainOverlay`,
   `ThemeToggle`; emit `:root` + `[data-theme="dark"]` from `tokenCssVariables()`; no-flash init; static
   `feTurbulence` data-URI grain (never animated); keep metadata + JSON-LD + AI wiring. Reduced-motion is a
   hard gate (the slider especially).
3. **WS3 — primitives + header + footer + base UI.** `SiteHeader` (`site.nav` + GitHub + `ThemeToggle` +
   mobile menu), `SiteFooter` (`site.footerLinks` + `site.social` + `site.email` + AI index), `Button` /
   `Badge` / `Eyebrow` / `Container` / `Section` / `SectionHeading`. One radius scale, one motion.
4. **WS4 — Home (`/`).** Build the **Home IA** above — this template's section set + order.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the index + the rich detail above.
6. **WS6 — responsive + themes + motion + a11y hardening.** 1440/1024/768/390 × both themes; AA contrast;
   visible `--ring` focus; ≥44px tap targets; no horizontal scroll at 390; slider + all motion freeze under
   `prefers-reduced-motion`.
7. **WS7 — AI surfaces + verify + closeout.** Confirm metadata/sitemap/robots/llms generate correctly and
   headings parse; `pnpm verify` green; stop helper processes; stage only intentional changes;
   conventional-style commit + HEREDOC body; `git push origin design/kirimo-2`.

## Acceptance criteria (Definition of Done — all true, not 90%)

- Every page fully designed: `/`, `/projects`, `/projects/[slug]` × all five products. No stubs, no
  half-styled sections.
- The home + detail compositions match **Kirimo's** information architecture above — not another lane's, not
  a generic `Hero→Pillars→Showcase→Proof→FAQ→CTA` skeleton.
- Every required content job has a home; every CTA resolves through the content/route layer.
- Both themes fully designed; all four breakpoints clean; token-driven only (no hardcoded hex/px where a
  token role exists); frozen contracts untouched.
- Grain/atmosphere + restrained motion per the brief; `prefers-reduced-motion` honored. WCAG AA text
  contrast; visible focus rings; semantic landmarks.
- **No fabricated content** (no fake testimonials/reviews/logos/metrics/pricing/posts); no
  placeholder/"coming soon"/status copy. AI surfaces intact; canonical routes unchanged; static-first.
- `pnpm verify` green; `reference-brief.md` §14 anti-slop passes with zero true items.
- Committed and pushed to `design/kirimo-2` (**never main**); reads world-class, not "fine".
