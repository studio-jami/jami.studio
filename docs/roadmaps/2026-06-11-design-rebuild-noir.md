# jami.studio Design Rebuild — Noir Lane (`design/noir-2`)

Date: 2026-06-11 · Status: [x] Completed — run 4 (faithful template reproduction)
Lane: `noir` · Branch: `design/noir-2` · Worktree: `../jami.studio-noir-2`
Template: **Noir** (Framer) · Character: **high-contrast near-black agency portfolio, colossal wordmark**
Accent: **copper `#ed4515`** (dial slot `amber`) — template-true, authored as `color.accent`
Art direction: `docs/design/reference-brief.md` · Extraction: `tools/framer-bridge/out/noir.{json,full.json,home.png}`
Owner: Jamie

> **THE ONE RULE: reproduce the Noir template.** Build our site USING Noir's real design: its high-contrast
> near-black canvas, its copper accent, its **asymmetric over-spaced work grid**, its **divider-ruled services
> list**, its **single inverted white Stats section** with grain + animated counters, its **faint vertical
> column guide-lines**, and its **colossal full-bleed "JAMI" wordmark** closing the page. The finished `/`
> must LOOK LIKE `out/noir.home.png`. Do **NOT** build a generic skeleton. Reuse the shared CONTRACTS verbatim.

## Active lane (locked)

- **Template:** Noir — a deep, high-contrast **dark agency portfolio** on near-black `#1a1a1a` with bone-white
  type and a single warm **copper** accent. Generous vertical breathing room (80–192px), faint full-height
  vertical guide-lines down every section, confident left-aligned headline grid, Geist-Mono micro-labels. One
  bright inverted Stats section breaks the dark run. Closes on a monumental wordmark. Primary theme **dark**;
  a light theme also ships.
- **Canvas:** background `#1a1a1a` (Dark Gray) · deeper `#161616`/`#000000` · inverted surface `#ffffff` (Stats
  only) · foreground `#ffffff` · muted `rgba(255,255,255,0.6)` (+0.3/0.25/0.1) · borders/dividers
  `rgba(255,255,255,0.1)` · accent copper `#ed4515` · gradient-bloom secondary purple `rgba(161,31,180,0.4)`.
- **Accent:** copper `#ed4515` — interactive/emphasis only; watch AA on near-black. Authored as `color.accent`
  (+ `ring`/`accentForeground`) → `--accent`/`--primary` only.
- **Imagery is OUR generated editorial photography (run-4 owner directive — supersedes any "CSS-only" rule):**
  Noir is a photographic portfolio — the work grid, stats tiles, insights cards and FAQ side all carry bold
  color-cast editorial images. Originals were generated (Grok/Gemini, sculptural objects — NO fake humans)
  and live at `public/assets/`. Use them; never download the template's video/images; never leave a tile as
  an empty box. Grain only on the Stats panel.
- **Framer key:** `noir`.

## Visual assets (generated — already in `public/assets/`; reference as `/assets/<file>`)

| File | Surface |
|---|---|
| `hero-torus.png` | hero right media panel — the glossy black torus visual |
| `work-1.png` … `work-5.png` | the five Works grid tiles, in order (purple / blue-smoke / blue-satin / amber-trails / blue-plant-on-white) — each carries its project name caption like the template |
| `inverted-1.png` `inverted-2.png` | the inverted white Stats section's image tiles beside the statement + counters |
| `blog-1.png` `blog-2.png` `blog-3.png` | the three AI-index/insights cards (template's blog cards) |
| `faq.png` | FAQ section side visual (orange velvet) |
| `cta-burst.png` | CTA background (crimson particle burst; layer the copper/purple bloom over it) |

If an asset file is missing at build time, build the slot with the CSS gradient-bloom placeholder AND flag
it in your report — do not drop the slot.

## Home IA — BUILD THIS (Noir's real order)

Real `pageTrees` order: `Hero(split, video+logo ticker) → Project(asymmetric work grid) → Service(divider list)
→ Stats(INVERTED white, counters, grain) → Feedback(testimonials) → Pricing → Blog → FAQ(dark accordion) →
CTA → colossal NOIR footer wordmark`. Rhythm: a long dark run is broken by the one **inverted white** Stats
section, then returns to dark. Section labels render as large left-aligned headings (WORKS / SERVICES / …).
Build to this spine:

1. **Hero** — **asymmetric horizontal split**: left text column (H1 `site.home.title`, capitalize, Instrument
   Sans 56px −0.04em; `lead`; **two stacked OUTLINED pill CTAs**; Geist-Mono micro-labels — a rating/"trusted"
   line built from honest facts only, e.g. "open-core · 5 products"), right **media panel** (`/assets/hero-torus.png`)
   with an honest **marquee ticker** beneath it (the five product names, not fake client logos). Faint vertical
   guide-lines frame the columns.
2. **Works** — the **five `projects` as an asymmetric, over-spaced work grid**: one Primary full-width card,
   then staggered 2-up rows, with large (~120–200px) inter-project gaps and per-position size variants. Each →
   `/projects/[slug]`. The centerpiece (Noir IS a 5-project agency portfolio).
3. **Services** — the four `site.home.pillars` as a **divider-ruled vertical list**: full-width rows separated
   by hairline dividers (NOT a card grid). Progressive-disclosure styling welcome.
4. **Stats** — the **ONE inverted WHITE section** with a **film-grain overlay** and a row of **animated
   count-up widgets** — **real numbers only** (5 products · 4 foundations · 1 shared source), separated by
   dividers, beside the `site.home.proof` statement. The single tonal break. **Never fabricate metrics.**
5. **Feedback → honest proof band** — the testimonials slot, filled with distilled real `proofPoints[]` (NO
   invented quotes), with overlay + vertical guide-lines.
6. **Pricing → open-core panel** — keep the pricing-section frame (a copper/purple gradient bloom is on-brand)
   but resolve to an **honest open-core / OSS callout** (GitHub), no tiers, no toggle prices.
7. **Blog → AI-index callout** — the AI-readable index (`site.nav` "AI index" + `llms.txt`), NOT fake posts.
8. **FAQ** — `site.faqs` (3) as a **dark accordion**.
9. **CTA** — full-bleed centered CTA with a **copper/purple gradient bloom** behind it.
10. **Footer** — the **colossal full-bleed "JAMI" (or "JAMI STUDIO") wordmark** stretched edge-to-edge as the
    closing monogram, over the footer nav / `site.social` / `site.email`. The defining signature.

## Signature elements — MUST reproduce (drop any and the lane fails)

- **Colossal full-bleed "JAMI" footer wordmark** — letters stretched the full viewport width.
- **Asymmetric, hugely-spaced project grid** — Primary hero-card + staggered 2-up rows with ~150–200px gaps and
  per-slot size variants (NOT a uniform N-col grid).
- **Divider-ruled services list** — pillars as horizontal rows separated by hairline dividers.
- **One inverted (white) Stats section** with **grain** + **animated count-up** real numbers — the sole tonal break.
- **Hero media panel + honest marquee ticker** + **two stacked OUTLINED pill CTAs**.
- **Faint vertical column guide-lines** threaded through hero/works/feedback sections.
- **Geist-Mono micro-labels** ("trusted", "follow us", stat captions) as the recurring small-text voice.
- **Copper accent + copper/purple gradient blooms** behind CTA.

## Color / Type / Texture (exact)

- **Color:** bg `#1a1a1a` · deeper `#161616`/`#000000` · inverted `#ffffff` (Stats) · fg `#ffffff` · muted
  `rgba(255,255,255,0.6)` · dividers `rgba(255,255,255,0.1)` · accent copper `#ed4515` · purple bloom
  `rgba(161,31,180,0.4)`. Dark-primary; light theme is a real light design.
- **Type:** display = **Instrument Sans** 700 UPPERCASE 120px −0.02em (the wordmark scale) / headings 500
  56/40/24 −0.04em capitalize; body Instrument Sans 400/500 20/16 −0.04em; **mono = Geist Mono** 400/700
  10/12/14 for labels/eyebrows/stat captions. Self-host both via `next/font/google`.
- **Texture/motion:** grain only on the Stats panel; copper/purple gradient blooms; hero marquee ticker;
  ~11 once-only scroll-reveals; per-letter color reveal in Stats; smooth-scroll feel; spring hover. All motion
  freezes under reduced-motion.

## `/projects` index

The asymmetric over-spaced work grid of all five projects (Primary card + staggered rows), vertical
guide-lines, mono micro-labels. Shared header/footer + wordmark.

## `/projects/[slug]` detail

A numbered agency case study (Noir's project pages are CMS-driven; compose to its language): banner/overview
(`name`/`summary`/`positioning` + `project.ctas`), `capabilities[]` (divider list), `proofPoints[]` (stat
row), family cross-links, CTA bloom. `generateStaticParams` for all five + per-project `generateMetadata`.

## Component decomposition (Noir's vocabulary)

`SiteHeader` (NavBar), `Hero` (split + media + ticker + outlined CTAs), `WorkGrid` (asymmetric)/`ProjectCard`,
`ServiceList` (divider rows), `StatsSection` (inverted + grain + counters), `ProofBand` (Feedback slot),
`OpenCoreCallout` (Pricing slot), `AIIndexCallout` (Blog slot), `Faq` (dark accordion), `CtaBloom`,
`WordmarkFooter`, `GuideLines`, `GrainOverlay`, `ThemeToggle`, `Container`/`Section`/`SectionHeading`. Variants
are props, never forks.

## Shared contracts (frozen — reuse verbatim; never edit)

- **Frozen:** `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (46-var
  contract), `src/registry/manifest.ts`. Tests frozen — incl. `tests/config-panel.test.tsx` and
  `public/social/*.svg` checks. Never edit a test to pass.
- **Build fresh:** `src/tokens/theme.ts` (dark+light VALUES, validated, 6-digit hex only — convert `rgb()`),
  all `src/components/*`, all `src/app/**`, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` (Noir's `/services`/`/about`/`/blogs`/`/contact` fold
  into our home/detail/footer). Hrefs only via `resolveProjectLink`/`site.*`/`routes.ts`.
- **Surface** `site.social` + `site.email` in footer; keep `createMetadata` + JSON-LD + sitemap/robots/llms wired.

## Workstreams (sequential)

1. **WS1 — tokens/theme.** Dark+light presets on copper `#ed4515`; Instrument Sans + Geist Mono; grain opacity
   for the Stats panel. Typecheck; validate; watch copper-button AA.
2. **WS2 — globals + shell + theme switch + atmosphere.** Var blocks; no-flash init; vertical guide-line
   utility; grain (Stats); gradient-bloom utility. Metadata/AI wiring kept.
3. **WS3 — primitives + header + footer + base UI.** Header (`site.nav` + GitHub + toggle + mobile menu),
   **WordmarkFooter** (`footerLinks` + `social` + `email` + AI index), outlined pill `Button`, mono `Eyebrow`,
   `Divider`, `SectionHeading`.
4. **WS4 — Home (`/`).** Build the Home IA above. **SCREENSHOT CHECKPOINT:** capture `/` @1440 and compare to
   `out/noir.home.png`; fix until faithful before polishing.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build the asymmetric index + detail.
6. **WS6 — responsive + themes + motion + a11y.** 4 bp × 2 themes; AA (copper especially); `--ring` focus;
   ≥44px; no h-scroll@390 (wordmark + work grid reflow cleanly); reduced-motion freezes ticker/reveals/counters.
7. **WS7 — AI surfaces + verify + screenshots + closeout.** Surfaces correct; one `h1`/page; `pnpm verify`
   green; capture `screenshots/noir-{home-1440,home-390,projects-1440}.png`; stop processes; conventional
   commit + HEREDOC; **do not push**.

## Run 4 closeout checkpoint

- Local `pnpm verify` is green for lint, typecheck, tests, and build.
- Browser smoke covered `/`, `/projects`, and `/projects/harness` at 1440/1024/768/390 in both dark and light
  themes: status 200, one `h1` per page, no horizontal overflow, and no missing generated imagery after
  scroll-load.
- Final artifacts are `screenshots/noir-home-1440.png`, `screenshots/noir-home-390.png`, and
  `screenshots/noir-projects-1440.png`; `screenshots/checkpoint-home-1440.png` and
  `screenshots/checkpoint-notes.md` were also refreshed.
- A pre-existing Next dev server on port 3004 for this worktree was reused; no new helper server was started.

## Acceptance criteria (all true, not 90%)

- `/` reproduces **Noir's** structure and **looks like `out/noir.home.png`**: split hero + ticker + outlined
  CTAs, asymmetric over-spaced work grid, divider services list, the one inverted white grain+counters Stats
  section, vertical guide-lines, copper accent, and the colossal "JAMI" footer wordmark — all present. Not a
  generic skeleton, not another lane's.
- Every page fully designed (`/`, `/projects`, `/projects/[slug]` ×5); every content job housed; every CTA via
  the content/route layer.
- Both themes designed; all four breakpoints clean; token-driven only (template-true palette); contracts untouched.
- Restrained motion; reduced-motion honored; AA contrast (incl. white Stats panel); visible focus; semantic landmarks.
- **No fabricated content** (no fake metrics/quotes/logos/tiers/posts); honest Stats numbers + honest ticker;
  no placeholder/status copy. AI surfaces intact; routes unchanged; static-first.
- `pnpm verify` green; §14 anti-slop zero true items. Committed to `design/noir-2` (never main); world-class.
