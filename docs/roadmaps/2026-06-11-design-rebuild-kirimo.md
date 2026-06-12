# jami.studio Design Rebuild — Kirimo Lane (`design/kirimo-2`)

Date: 2026-06-11 · Status: [x] Complete — run 4 (faithful template reproduction)
Lane: `kirimo` · Branch: `design/kirimo-2` · Worktree: `../jami.studio-kirimo-2`
Template: **Kirimo** (Framer) · Character: **sand-on-near-black editorial zine, auto-play slideshow, giant ticker**
Accent: **terra-cotta `#eb5939`** (dial slot `amber`) — template-true, authored as `color.accent`
Art direction: `docs/design/reference-brief.md` · Extraction: `tools/framer-bridge/out/kirimo.{json,full.json,home.png}`
Owner: Jamie

> **THE ONE RULE: reproduce the Kirimo template.** Build our site USING Kirimo's real design: its near-black
> canvas with **warm sand foreground**, its single terra-cotta accent, its **auto-play project slideshow**,
> its **colossal 136px "JAMI STUDIO" ticker marquee**, its **numbered service accordion**, its hairline rules
> and vertical dividers, its uppercase numbered eyebrows. The finished `/` must LOOK LIKE `out/kirimo.home.png`.
> Do **NOT** build a generic skeleton. Reuse the shared CONTRACTS verbatim.

## Active lane (locked)

- **Template:** Kirimo — a dark editorial creative-agency **zine**. Near-black canvas, **warm taupe/sand
  type** (not white), a single hot **terra-cotta** accent, numbered list-rows, **hairline rules separating
  every section**, uppercase tracked labels, oversized headlines. Reads like a printed art-direction spread.
  Primary theme **dark**; a light theme also ships.
- **Canvas:** background `#0d0d0d` · foreground warm sand `#b7ab98` · body muted `rgba(184,172,153,0.8)` ·
  hairline/divider `rgba(184,172,153,0.5)` · panel tints `rgba(184,172,153,0.1)`/`(…,0.2)` · accent terra-cotta
  `#eb5939` · rare white `#ffffff`.
- **Accent:** terra-cotta `#eb5939` — used **only** on uppercase eyebrow/subtitle labels + hovers, against
  sand-on-black. Authored as `color.accent` (+ `ring`/`accentForeground`) → `--accent`/`--primary` only.
- **No grain/glow/gradients** — flat near-black; contrast comes from imagery, hairline rules, and the accent.
- **Imagery is OUR generated editorial photography (run-4 owner directive):** Kirimo is image-forward — the
  slideshow and project grid are full-bleed photographic. Original editorial photos (sand/terracotta
  chiaroscuro series) were generated (Grok/Gemini) and live at `public/assets/` — use them; never download
  the template's images, never leave the slider/grid as empty panels or logo-SVG fills.
- **Framer key:** `kirimo`.

## Visual assets (generated — already in `public/assets/`; reference as `/assets/<file>`)

| File | Surface |
|---|---|
| `slide-1.png` … `slide-5.png` | the five Project Slider slides — full-bleed photo per slide, project name/summary/CTA overlaid in the editorial grid |
| `showcase-1.png` `showcase-2.png` `showcase-3.png` | "Our Project" immersive grid tiles (mix with slide crops for 5 tiles) |
| `about.png` | About Us — right-side or background editorial image if the split calls for one |

If an asset file is missing at build time, build the slot with a flat sand-tinted panel AND flag it in your
report — do not drop the slot.

## Home IA — BUILD THIS (Kirimo's real 9-section order)

Real `pageTrees` order: `Hero → Project Slider → Our Client → About Us → Our Service(accordion) → Our Project
(grid) → Testimonials → CTA → Our News`, closed by a giant Text-Ticker footer. Single dark canvas; sections
are transparent and separated by **1px top hairline rules**; title/body splits use **vertical dividers**.
Left-aligned editorial grid throughout. Build to this spine:

1. **Hero** — **left-aligned** stacked. A top **numbered eyebrow block** of three rows (`01 / 02 / 03` with
   honest studio facts, e.g. "01 / open-core agent-native product studio"), then an **uppercase H1** (Plus
   Jakarta Sans 700, 72px, the `site.home.title`), then `lead`, then **ONE primary button**. Opens with a top
   hairline rule. Auto (content-height), not 100vh.
2. **Project Slider** — the **five `projects` as a horizontal auto-play Slideshow** (centerpiece #1): one item
   visible, ~4s interval, spring transition, arrow controls, full-bleed imagery. Each slide = a `ProjectCard`
   → `/projects/[slug]`. **Freezes / pauses under `prefers-reduced-motion`.**
3. **Our Client → honest proof line** — centered lead line (the `site.home.proof` "generated from one shared
   source" credibility), NOT a fake logo wall. (Optional honest count, no invented "250+ companies.")
4. **About Us** — **split: left title ("About the studio"), vertical divider, right multi-paragraph body** —
   the studio/platform framing from home copy + pillars. Top hairline rule.
5. **Our Service** — **numbered accordion** (01–04) of the four `site.home.pillars` (expand/collapse, one open
   by default). Kirimo's signature interaction.
6. **Our Project** — the five `projects` reprised as an **immersive grid** (centerpiece #2, a different
   treatment from the slider) + a "view all" → `/projects`.
7. **Testimonials → honest proof band** — distilled real `proofPoints[]` (NO invented quotes), with the
   section title + vertical divider grammar.
8. **CTA** — a full-bleed **atmospheric panel** (CSS, edge-to-edge), centered closing line + a button.
9. **Our News → AI-index callout** — the AI-readable index (`site.nav` "AI index" + `llms.txt`), NOT fake
   articles.
- **Footer** — a **colossal Text-Ticker marquee "JAMI STUDIO"** (136px desktop / 87px mobile, uppercase) over
  the footer nav / `site.social` / `site.email` / legal. The closing signature.

## Signature elements — MUST reproduce (drop any and the lane fails)

- **Auto-play full-width project Slideshow** under the hero (arrows, ~4s, spring) — the dynamic-gallery promise.
- **Colossal 136px "JAMI STUDIO" Text-Ticker marquee** in the footer band.
- **Numbered list rows** — the `01/02/03` hero eyebrow and the `01–04` numbered Service accordion.
- **Service accordion** with one panel expanded by default.
- **Hairline 1px rules** opening each section + **vertical dividers** splitting title/body — the editorial grid.
- **Warm sand-on-near-black palette** with a single **terra-cotta** accent on uppercase eyebrows only.
- **Uppercase tracked eyebrows/subtitles**; oversized uppercase H1.

## Color / Type / Texture (exact)

- **Color:** bg `#0d0d0d` · fg sand `#b7ab98` · body `rgba(184,172,153,0.8)` · hairline `rgba(184,172,153,0.5)`
  · tints `rgba(184,172,153,0.1/0.2)` · accent terra-cotta `#eb5939`. Dark-primary; light theme is a real
  light design (warm paper-toned, not inverted).
- **Type:** single family **Plus Jakarta Sans** (self-host via `next/font/google`), 400/500/700/800. H1 700
  **UPPERCASE** 72/58/46px LH 1.3; H2 700 sentence-case 56/45/36; Ticker 700 UPPERCASE 136/109/87px; eyebrows
  UPPERCASE terra-cotta +0.12em/+0.04em; body 400 16/14 LH 1.5; buttons 500 UPPERCASE +0.04em.
- **Texture/motion:** no grain/glow. Motion concentrated in the **slider** + **two tickers** (footer wordmark;
  honest content marquee) + **accordion**; link hover sand→accent underline. All motion freezes/pauses under
  reduced-motion.

## `/projects` index

An immersive gallery of all five projects in Kirimo's idiom (expressive grid and/or slider), hairline rules +
vertical dividers, uppercase numbered eyebrows. Shared header/footer + the ticker footer.

## `/projects/[slug]` detail

Kirimo ships the **richest** detail page — `/portfolio/project01` order:
`Project Title → Portfolio Image → Content Section → Listing → Listing → Content Section → Listing → Content
Section → Image Section → Next`. Map: **Project Title** → `name`/`summary`/`positioning` hero; **Image
Sections** → `socialImage` + CSS atmosphere; **Content Sections** → positioning/audience narrative;
**Listings** → `capabilities[]` + `proofPoints[]` as numbered structured lists; **Next** → next-project
cross-link (the family). Heavy hairline/divider segmentation. `generateStaticParams` + per-project
`generateMetadata`.

## Component decomposition (Kirimo's vocabulary)

`Hero` (numbered eyebrow rows), `ProjectSlideshow`/`ProjectCard`, `ProofLine` (Our Client slot), `StudioAbout`
(split + divider), `ServiceAccordion` (numbered 01–04), `ProjectGrid` (Our Project), `ProofPointBand`
(Testimonials slot), `CtaPanel`, `AIIndexCallout` (Our News slot), `TextTicker` (footer wordmark + honest
marquee), `Divider`/`HairlineRule`, detail `DetailHero`/`ContentSection`/`Listing`/`NextProject`,
`SiteHeader`/`SiteFooter`, `ThemeToggle`, `Container`/`Section`. Variants are props, never forks.

## Shared contracts (frozen — reuse verbatim; never edit)

- **Frozen:** `src/content/*`, `src/lib/*`, `src/tokens/schema.ts`, `src/tokens/css-vars.ts` (46-var
  contract), `src/registry/manifest.ts`. Tests frozen — incl. `tests/config-panel.test.tsx` and
  `public/social/*.svg` checks. Never edit a test to pass.
- **Build fresh:** `src/tokens/theme.ts` (dark+light VALUES, validated, 6-digit hex only — convert `rgb()`),
  all `src/components/*`, all `src/app/**`, `src/styles/globals.css`.
- **Frozen routes:** `/`, `/projects`, `/projects/[slug]` (Kirimo's `/about`/`/portfolio`/`/insights`/`/contact`
  fold into our home/detail/footer). Hrefs only via `resolveProjectLink`/`site.*`/`routes.ts`.
- **Surface** `site.social` + `site.email` in footer; keep `createMetadata` + JSON-LD + sitemap/robots/llms wired.

## Workstreams (sequential)

1. **WS1 — tokens/theme.** Dark+light presets on terra-cotta `#eb5939`; Plus Jakarta Sans. Typecheck; validate.
2. **WS2 — globals + shell + theme switch.** Var blocks; no-flash init; hairline-rule + vertical-divider
   utilities (no grain). Metadata/AI wiring kept.
3. **WS3 — primitives + header + footer + base UI.** Header (`site.nav` + GitHub + toggle + mobile menu),
   Footer with the **TextTicker wordmark** + `footerLinks` + `social` + `email` + AI index; `Button` (uppercase),
   uppercase `Eyebrow`, `Divider`.
4. **WS4 — Home (`/`).** Build the 9-section Home IA + ticker footer. **SCREENSHOT CHECKPOINT:** capture `/`
   @1440 and compare to `out/kirimo.home.png`; fix until faithful before polishing.
5. **WS5 — `/projects` + `/projects/[slug]`.** Build index + the rich detail above.
6. **WS6 — responsive + themes + motion + a11y.** 4 bp × 2 themes; AA on sand text; `--ring` focus; ≥44px; no
   h-scroll@390; slider/tickers freeze under reduced-motion.
7. **WS7 — AI surfaces + verify + screenshots + closeout.** Surfaces correct; `pnpm verify` green; capture
   `screenshots/kirimo-{home-1440,home-390,projects-1440}.png`; stop processes; conventional commit + HEREDOC;
   **do not push**.

## Acceptance criteria (all true, not 90%)

- `/` reproduces **Kirimo's** 9-section structure and **looks like `out/kirimo.home.png`**: sand-on-black,
  terra-cotta eyebrows, auto-play slideshow, numbered service accordion, hairline rules + vertical dividers,
  and the colossal "JAMI STUDIO" footer ticker — all present. Not a generic skeleton, not another lane's.
- Every page fully designed (`/`, `/projects`, `/projects/[slug]` ×5, the rich detail); every content job
  housed; every CTA via the content/route layer.
- Both themes designed; all four breakpoints clean; token-driven only (template-true palette); contracts untouched.
- Restrained motion; reduced-motion honored (slider/tickers pause); AA contrast on sand text; visible focus;
  semantic landmarks.
- **No fabricated content** (no fake logos/quotes/clients/articles); honest proof line; no placeholder/status
  copy. AI surfaces intact; routes unchanged; static-first.
- `pnpm verify` green; §14 anti-slop zero true items. Committed to `design/kirimo-2` (never main); world-class.

## Run 4 closeout checkpoint

- Final screenshots captured:
  - `screenshots/kirimo-home-1440.png`
  - `screenshots/kirimo-home-390.png`
  - `screenshots/kirimo-projects-1440.png`
  - `screenshots/checkpoint-home-1440.png`
- Visual smoke covered `/`, `/projects`, and all five `/projects/[slug]` pages at 1440, 1024, 768, and 390 in
  dark and light themes.
- `pnpm verify` passed after final fixes.
