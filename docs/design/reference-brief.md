# jami.studio — Design Reference Brief

**Audience:** the five independent Opus 4.8 design agents rebuilding the `jami.studio` marketing-site
UI from scratch, one per assigned Framer reference template, on separate branches.
**Status:** model-agnostic, implementation-ready. Read this in full before writing any UI.
**Scope:** art direction, reference DNA, and non-negotiable system rules. It deliberately does
**not** prescribe one single look — each agent must differentiate within these rules.

> One-line mandate: build the public hub for an open-core, agent-native product family so it reads
> like an **elevated design studio showcasing its own work** — not a SaaS template, not a dev log,
> not a status page.

---

## 1. Mandate & quality bar

This is the central entry point for every Studio product. The only acceptable outcome is
production, world-class polish. Treat every rule below as a gate, not a suggestion.

- **Uniform, global, reusable, composable.** Every UI element is a token-driven component used
  consistently everywhere. Zero one-off styling. If a value (color, radius, space, type size,
  shadow, duration) is used twice, it is a token or a component prop — never a hardcoded literal
  repeated by hand.
- **One spacing system, one radius scale, one type scale, one shadow set, one motion vocabulary.**
  No mismatched radii between cards and buttons. No ad-hoc margins.
- **No placeholder energy.** No "coming soon", no "work in progress", no status apologies, no launch
  excuses, no lorem ipsum. Copy comes from `src/content/*`; if a section needs words, use the real
  product copy already in the contracts. Implementation status stays out of marketing copy.
- **No default-framework smell.** It must not look like stock shadcn, stock Tailwind UI, a Vercel
  template, or a Framer template lifted verbatim. The references are a *quality bar and a vibe*, not
  a thing to clone. Adapt and elevate for our open-core dev-tools context.
- **Real responsive, all breakpoints.** Dark + light both fully designed. Mobile, tablet, desktop —
  no shortcuts, no "desktop-only and squish it later."
- **Accessible by construction.** WCAG AA contrast minimum for text; visible focus rings (use the
  `--ring` token); semantic landmarks; respects `prefers-reduced-motion`.
- **Differentiation is required.** Five agents, five distinct results that all clear the bar. Pick a
  lane (or blend), commit to it, and make it cohesive end-to-end.

A design that is "fine" fails. The target is the kind of site a senior design studio would put at
the top of its own portfolio.

---

## 2. Two aesthetic lanes

Each agent picks **one** lane, or a deliberate blend, and commits fully. Both lanes must ship dark
**and** light themes — the lane describes the *primary character*, not the only theme.

### Lane A — Dark, grainy, textured (the owner's favorite)

The "hip gallery" lane. Deep near-black canvas, rich film-grain/noise texture, restrained accents,
big confident type, lots of negative space. Think a creative studio's flagship site at night.

- **Canvas:** deep near-black, *not* pure `#000`. Aim for a warm or cool charcoal (e.g. `#0b0b0d`–
  `#121316` range) so the grain has something to sit on. Pure black banding is a tell of cheap work.
- **Texture:** a tasteful, fine film-grain/noise overlay across the canvas and large surfaces (see
  §4). Subtle layered radial gradients for depth/glow behind the hero and section dividers.
- **Accent:** used sparingly — a single accent family from the schema lighting up CTAs, links, focus
  rings, and one or two hero highlights. The accent should feel like neon through fog, not a
  primary fill everywhere.
- **Surfaces:** panels are barely-lifted from the canvas (a few percent lighter) with hairline
  borders, not heavy cards. Glow and grain do the separation work, not drop shadows.
- **Type:** large display headings, generous tracking control, high contrast text on dark.
- **Mood words:** cinematic, nocturnal, precise, expensive, quiet confidence.

### Lane B — Clean, fresh, light editorial

The "gallery minimalism" lane. Crisp whitespace, sharp type, near-white canvas, editorial grid,
hairline rules, work-forward. Think a print-quality design annual.

- **Canvas:** warm or cool off-white (`#f6f6f3`–`#f7f4ed` neutrals already exist in the preset
  generator). Avoid stark `#fff` everywhere; use layered neutrals for rhythm.
- **Texture:** optional, *very* faint paper-grain at low opacity — or none. Editorial restraint over
  effect. Structure and type carry the design.
- **Accent:** disciplined. Mostly ink-on-paper with the accent reserved for interactive states and
  one editorial highlight per section.
- **Surfaces:** strong baseline grid, generous gutters, hairline dividers, oversized section numbers
  (01 / 02 / 03) as structure. Cards are quiet — border + space, minimal shadow.
- **Type:** confident editorial scale; consider a refined display face (grotesk or didone-adjacent)
  paired with a clean body.
- **Mood words:** editorial, gallery, calm, sharp, premium minimalism.

Both lanes share the same information architecture, the same component inventory, the same data
contracts, and the same token plumbing. Only the *visual system* differs.

---

## 3. Reference DNA digest

These are the owner's reference templates (Framer), ranked most-liked first. The five chosen templates
(Message AI, Nouva, Kirimo, Noir, Synk) are now live in dedicated Framer projects, connected headless
via the Framer Server API (see §13 and `tools/framer-bridge/`), so each lane builds from the **real
exported structure** of its assigned template — not synthesized DNA. **Borrow the DNA, never the layout
verbatim:** translate the template's structure, rhythm, and craft into our content and token system;
do not ship a reskinned clone.

**What to borrow across the set:**
- A confident, oversized **hero statement** with one clear primary CTA and a quiet secondary.
- **Numbered section markers** (01 / 02 / 03 …) as editorial structure — used by Noir, Kairy, Kirimo.
- A **work/showcase grid** that gives each item room to breathe (client/name, year, disciplines).
- **Modular, scannable sections** with generous whitespace and a steady vertical rhythm.
- **Trust/proof bands** (logos, metrics, short testimonials) that feel earned, not stuffed.
- **Progressive disclosure** on services/capabilities (numbered cards that expand or reveal detail).
- A strong **final CTA band** before a content-rich, well-organized footer.
- Premium **micro-motion**: scroll-reveal, subtle parallax/glow, restrained hover states.

**What to avoid:** generic SaaS pricing-card energy, three-column "feature soup," stocky 3D blobs,
loud multi-color gradients, hero mockups of fake dashboards, and any "trusted by 10,000 teams" claim
we can't back. We are open-core dev tooling, not a B2B SaaS funnel.

**Per-reference one-liners (top references):**

1. **Message AI** *(prime / most-liked)* — dark, modern AI-product canvas with subtle grain; bold
   display hero ("thoughts become actions"), scroll-to-explore cue, progressive value sections,
   teal/blue/violet accent glow. The cleanest expression of Lane A's cinematic dark.
2. **Nouva** *(prime)* — bold studio/agency portfolio energy: strong visual identity, work shown with
   clarity and impact, editorial confidence. Lean on it for the *work-forward* showcase posture.
3. **Recon** *(prime)* — dark-mode SaaS/AI/dev-platform template: modular sections, conversion-aware
   layout, social-proof row, 3-step "how it works", restrained accent on a near-black base. Closest
   analog to *our* dev-tools content shape in a dark lane.
4. **B2bizz** *(prime)* — dark with subtle gradients + clean type; enterprise-credible. Strong
   positioning hero → industry/coverage → service highlights → proof blocks → results. PageSpeed-100
   discipline. Borrow its *credible, scannable proof architecture*.
5. **Kirimo** *(prime)* — creative-portfolio template: immersive, dynamic showcase, intuitive nav,
   aesthetic-forward. Borrow its *gallery immersion* for the product-family showcase.
6. **Kairy** *(Marketing Agency / Studio)* — **light** editorial lane reference: light canvas, bold
   headline type, numbered services (01–04) with progressive disclosure, card-grid selected work,
   "play showreel", generous whitespace. The canonical Lane B blueprint.
7. **Delivr** — modern product/service marketing template; clean modular sections, clear CTA rhythm.
8. **Synk** — premium AI-SaaS template built on *global styling variables* and modular components —
   exactly our token-driven philosophy. Borrow its systematized, swap-anything discipline.
9. **Verona** — creative agency/freelancer portfolio: stylish, professional, conversion-minded.
10. **Vertica** — bold, minimalist studio template (architecture/design firms): striking visuals,
    refined typography, project-forward. Strong Lane B minimalism reference.
11. **Sham** — agency/portfolio example; clean structure, work showcase.
12. **Noir Agency Portfolio** — deep high-contrast dark, numbered sections, 5-project work grid →
    services list → testimonials → blog → FAQ → CTA. The textbook *dark agency portfolio IA*.

**Translation to our context** (do this, don't transcribe):
- "Selected work" grid → **our product-family showcase** (the 5 Studio projects as the portfolio).
- A portfolio "project card" → **our `ProjectCard`** (one per Studio product, from `projects.ts`).
- "Services" / numbered offerings → **capabilities & proof points** per product.
- "Case study / project detail page" → **our `/projects/[slug]` detail pages**.
- "About the studio" → the Studio platform/ecosystem framing from `site.ts` home copy + pillars.

---

## 4. Grain / texture guidance (current best practice, June 2026)

For Lane A this is core craft; for Lane B it's optional and faint. Get it right — bad grain reads as
JPEG noise and instantly cheapens the site.

### Recommended default: static SVG `feTurbulence` overlay (data-URI), not a runtime filter

A single fixed, GPU-cheap overlay layer is the performant standard. Use `fractalNoise`, encode the
SVG as a CSS `background-image` data URI, and blend it at low opacity. Do **not** apply a live
`filter: url(#…)` + `feDisplacementMap` to large/fixed backgrounds — the displacement approach is
heavier and is meant for small decorative shapes, not a full-canvas film grain.

```css
/* Token-driven grain overlay. Tune --grain-opacity per theme. */
.grain-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;                 /* sits above canvas, below content */
  opacity: var(--grain-opacity, 0.05);
  mix-blend-mode: soft-light; /* or overlay; multiply on light themes */
  /* fractalNoise, fine grain. baseFrequency ~0.6–0.9 = film grain;
     lower = coarser. numOctaves 2–3 is plenty (never > 4). sRGB is required. */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n' color-interpolation-filters='sRGB'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
  background-size: 180px 180px; /* tile a small chunk so it stays crisp at any DPR */
}
```

### Rules

- **Opacity range:** dark lane `0.03`–`0.07`; light lane `0.015`–`0.03`. If you can *see* it as
  texture rather than *feel* it as tooth, it's too strong. Expose it as a token (`--grain-opacity`).
- **Blend mode:** `soft-light` or `overlay` on dark canvases; `multiply` at very low opacity on light
  canvases. Never `normal` (that just dumps gray noise on top).
- **Color space:** always set `color-interpolation-filters='sRGB'` (the default `linearRGB` gives the
  wrong cross-browser result).
- **numOctaves:** 2–3. Above 4 costs real CPU/GPU for no visible gain.
- **Tiling:** render a small tile (`background-size: ~160–220px`) and repeat. This keeps grain crisp
  on Retina/2× displays and avoids a giant rasterized filter pass.
- **Banding:** subtle grain is itself the fix for gradient banding. Layer the grain *over* your
  radial/linear gradients (hero glow, section fades) so 8-bit color steps dissolve into tooth.
- **Depth without banding:** build atmosphere from 1–2 large, low-contrast radial gradients
  (`radial-gradient(... transparent)`) behind the hero/section, then the grain on top. Keep gradient
  stops gentle; let grain hide the steps.
- **Performance budget:** one fixed full-screen grain layer + ≤2 gradient layers per viewport.
  `pointer-events: none`, `aria-hidden`, no animation by default. Never animate the grain (no
  per-frame `feTurbulence` reseed) — it tanks battery and triggers reduced-motion concerns.
- **`prefers-reduced-motion`:** a *static* grain layer is fine to keep (it's texture, not motion). If
  any agent adds animated grain or parallax glow, it **must** freeze under
  `@media (prefers-reduced-motion: reduce)`.
- **Theme switch:** swap `--grain-opacity` and blend mode per theme; don't ship two separate overlay
  components.

---

## 5. Layout & section system (canonical IA — same for all five agents)

All agents build the **same information architecture** with **different visual systems**. Express
each section as a reusable, composable component fed by `src/content/*`. Order is a strong default;
agents may merge/re-rhythm adjacent sections but must not drop required content.

### Homepage (`/`)

1. **Header / nav** — wordmark + `site.nav` (Projects, AI index, GitHub) + theme toggle.
2. **Hero** — `site.home.eyebrow`, `title`, `lead`, primary + secondary CTA. The owner-grade moment:
   oversized type, atmosphere (grain/glow or editorial whitespace), one decisive CTA.
3. **Pillars band** — the four `site.home.pillars` (Governed runtime, Trusted interfaces, Durable
   coordination, Agent-readable knowledge). Treat as the "what this studio stands for" statement.
4. **Product-family showcase** — the five `projects` as the "selected work" grid. Each is a
   `ProjectCard` (name, summary, positioning hook, capability tease, CTA into detail). This is the
   centerpiece — give it portfolio-grade treatment.
5. **Proof / capability band** — distilled proof points / the `site.home.proof` line about
   everything being generated from shared source data. Earned credibility, not logo soup.
6. **FAQ** — `site.faqs` (3 entries). Accordion or editorial Q&A list.
7. **CTA band** — final conversion moment ("View projects" / "Read AI index").
8. **Footer** — `site.footerLinks` (project shortlinks + Robots + Sitemap), handles, AI index link.

### Project detail (`/projects/[slug]`)

Mirror a "case study" with our data:

1. **Header / nav** (shared).
2. **Project hero** — `name`, `summary`, `positioning`, primary CTA(s) from `project.ctas`
   (route/subdomain/repo/docs/api, resolved by the content layer — never hand-build hrefs).
3. **Audience / positioning** — `audience` + `positioning` as a focused statement.
4. **Capabilities** — `capabilities[]` as a numbered/structured list (progressive-disclosure style).
5. **Proof points** — `proofPoints[]` as a proof band.
6. **Family / cross-links** — "part of the Studio family" with links to sibling projects.
7. **CTA band** — repo / docs / live-surface links per the project's CTAs.
8. **Footer** (shared).

### `/projects` index

A clean gallery of all five `ProjectCard`s — the full portfolio view — with the same header/footer.

**Shell rules:** one max-width container token (`--container`), one section vertical-rhythm token
(`--section`). Every page is header → main → footer with consistent gutters at every breakpoint.

---

## 6. Typography system guidance

Map everything to the existing schema roles: `typography.display`, `typography.sans`,
`typography.mono`, `typography.scale.{xs,sm,base,lg,xl,hero}`, `typography.lineHeight.{tight,body}`.
Set values in your **own** preset; consume via the CSS vars (`--font-display`, `--font-sans`,
`--font-mono`, `--text-*`, `--line-tight`, `--line-body`).

- **Display** (`--font-display`): the personality. Big hero + section headings. Pick a refined,
  well-supported face with character at large sizes. Strong, well-supported choices for 2026:
  **Geist** (sharp geometric, tech-credible, free, variable), **Aeonik** (neo-grotesque, premium —
  licensed), **Cabinet Grotesk** (bold display personality), or an editorial **didone-adjacent**
  face (e.g. Editorial New) for a Lane B fashion-annual feel. Inter Tight (current default) is the
  safe baseline.
- **Sans / body** (`--font-sans`): maximal legibility, neutral. **Inter** (current default) or
  **Geist Sans** are both excellent and self-hostable.
- **Mono** (`--font-mono`): dev credibility — code-ish accents, eyebrows, labels, version tags, the
  `01/02/03` section numbers. **JetBrains Mono** (current default) or **Geist Mono**.
- **Scale & hierarchy:** `hero` is `clamp(3rem, 9vw, 8rem)` by default — own it; make the hero a
  *moment*. Keep a clear, limited hierarchy: hero → xl section heads → lg subheads → base body →
  sm/xs labels. Don't invent in-between sizes; use the scale.
- **Tracking:** tighten display/hero slightly (negative tracking reads premium at large sizes); keep
  body at default; letterspace small-caps labels/eyebrows positively. Line-height: `tight` (~1.0) for
  display, `body` (~1.5–1.6) for prose.
- **Webfont strategy:** prefer **self-hosted** variable fonts via `next/font/local` (or
  `next/font/google` for Geist/Inter) — `display: swap`, preload the display + body faces, subset to
  Latin. Licensed faces (Aeonik, Cabinet Grotesk, Editorial New) require a purchased license and a
  self-host plan; if an agent picks one, document the license need and provide a free fallback in the
  font stack so the build never depends on an unlicensed asset.

---

## 7. Color & theming

Everything runs through the existing token preset schema (`src/tokens/schema.ts`), the preset
generator (`src/tokens/presets.ts`), and the CSS-var plumbing (`src/tokens/css-vars.ts`). Agents
author their **own preset VALUES**; they do not rewrite the schema or the var-export contract.

- **Both themes required.** Ship a full **dark** and full **light** theme. The generator already
  produces light neutrals from `warmth`; agents add the dark theme surfaces/foreground and wire a
  `[data-theme]` (or `.dark`) switch over the same CSS vars from `tokenCssVariables()`.
- **Accent is constrained by schema** to `cyan | green | amber | rose | violet`. Pick one as the
  brand accent (do not introduce a new accent family). Use it for interactive/emphasis roles
  (`--primary`, `--accent`, `--ring`, links, focus) — sparingly in Lane A, disciplined in Lane B.
- **Consume the vars, never hardcode.** Backgrounds/text/panels/borders/shadows all come from the
  exported vars: `--background`, `--foreground`, `--muted`, `--muted-foreground`, `--card`,
  `--panel`, `--border`, `--ring`, `--primary`, `--accent`, `--surface-*`, `--shadow-*`. No raw hex
  in components.
- **Contrast:** respect the `contrast` dial intent and hit WCAG AA on text. Dark lane: foreground
  near-white but not pure `#fff` (slightly warm/cool to match canvas); muted text stays readable.
- **Surfaces:** use `--surface-canvas` / `--surface-panel` / `--surface-panel-raised` for depth
  rather than inventing new grays. Glow/grain provide most dark-lane separation.

---

## 8. Motion

Tasteful, restrained, scroll-aware. Map durations/easing to the motion tokens
(`--motion-duration`, `--motion-duration-fast`, `--motion-easing`); the preset also carries a
`motion.intensity`. Motion supports the content; it never performs.

- **Scroll-reveal:** gentle fade/translate-in (8–16px, ~`--motion-duration`) as sections enter. Once
  only — no re-triggering loops.
- **Hover:** subtle on cards/buttons (border/accent shift, ≤2px lift, faint glow in Lane A). Use
  `--motion-duration-fast` and `--motion-easing`. Keep it consistent across every interactive
  element.
- **Hero atmosphere:** optional slow parallax/glow drift in Lane A — very slow, very subtle.
- **No:** auto-playing carousels, bouncy spring overshoot, marquees, parallax that hijacks scroll,
  or anything that delays content paint.
- **`prefers-reduced-motion: reduce`:** disable transforms/parallax/animated reveals; show final
  state immediately. Static grain may stay. This is a hard gate, not optional.
- **Performance:** animate only `transform` and `opacity`. No layout thrash. Respect a small motion
  budget so it never blocks LCP/INP.

---

## 9. Responsive expectations

Design and verify at all four. No breakpoint is an afterthought; both themes work at all four.

- **~1440 (desktop):** full editorial layout. Container ≈ `min(1120px, 100vw − 2rem)` (the
  `--container` token). Multi-column work grid (2–3 across), oversized hero, generous `--section`
  rhythm. This is the showcase view.
- **~1024 (laptop/landscape tablet):** container shrinks gracefully; work grid 2-across; nav intact;
  type scale steps down via `clamp`. No cramped gutters.
- **~768 (tablet/portrait):** single or 2-column work grid; nav may collapse to a menu; hero type
  scales down but stays a moment; sections stack with preserved rhythm.
- **~390 (mobile):** single column; tap targets ≥44px; nav is a clean menu/sheet; hero is legible and
  punchy at small width; grain opacity may drop slightly; no horizontal scroll, ever. Footer reflows
  to a readable stack.

Use fluid `clamp()` type (already in the scale) and the spacing tokens so transitions between
breakpoints are smooth, not snappy jumps.

---

## 10. Component inventory (shared, reusable, token-driven)

Every agent produces this set as global, composable components. Same inventory across all five; only
the visual system differs. No one-off variants — variants are props.

- **SiteHeader / Nav** — wordmark/mark, nav links (`site.nav`), GitHub, **theme toggle**, mobile
  menu/sheet. Sticky/transparent-on-hero is allowed if consistent.
- **Footer** — `site.footerLinks`, handles, AI-index link, fine print. Organized, not a dumping
  ground.
- **Hero** — eyebrow + display title + lead + primary/secondary CTA + atmosphere slot.
- **Button** — primary / secondary / ghost / link variants; one shape, one radius scale, one motion.
- **Badge / Tag / Eyebrow** — small-caps or mono labels (e.g. capability tags, "OSS", version pills).
- **ProjectCard** — one Studio product: name, summary, positioning hook, capability tease, CTA into
  detail. The portfolio unit. Must look intentional in a grid and standalone.
- **ProductFamilyMap / Showcase grid** — the five projects as a cohesive family view (the "selected
  work" centerpiece on home and the `/projects` index).
- **PillarsBand** — the four home pillars as a statement band.
- **Capability / Proof band** — numbered capability list + proof points (progressive-disclosure ok).
- **FAQ** — accordion or editorial Q&A from `site.faqs`.
- **CTABand** — reusable final-CTA section.
- **ProjectDetail layout** — the case-study composition from §5.
- **SectionHeading / SectionNumber** — consistent `01/02/03` + heading + optional kicker.
- **Container / Section** — layout primitives bound to `--container` / `--section`.
- **GrainOverlay / Atmosphere** — the texture + gradient-glow layer (Lane A; optional faint Lane B).
- **ThemeToggle** — dark/light switch over the CSS-var contract.

All of these are candidates for the registry (`SiteHeader`, `ProjectCard`, `ProjectDetail`,
`ConfigPanel`, `ProofBand` are already named in `src/registry/manifest.ts`). Build them to that bar.

---

## 11. Reuse boundary

**Reuse as-is (shared contracts — do not reimplement, do not fork):**
- `src/content/*` — `projects.ts`, `site.ts`, `links.ts` (all copy, projects, nav, FAQ, CTAs).
- `src/lib/*` — `routes.ts`, `metadata.ts`, `sitemap.ts`, `ai-public-files.ts` (URL/route/metadata/
  sitemap/`llms.txt` helpers and the generated `robots`/`sitemap`/`llms` routes they feed).
- `src/tokens/schema.ts` + `presets.ts` + `css-vars.ts` — the token **contract** and var export.
- `src/registry/manifest.ts` — registry-ready metadata.

**Build entirely fresh:**
- All UI components (`src/components/*`), all app-route presentation (`src/app/**` pages/layouts),
  `globals.css`, and **your own token preset VALUES** (your colors/type/spacing/radii/surfaces/motion
  authored through the schema, plus your dark theme).

**Hard line:** do **not** reimplement any product runtime (Harness, UI Registry, Orchestra, Intercal,
Collectiva). This repo owns the marketing site only. Do not invent new content fields, fake metrics,
fake logos, or claims not present in the contracts. Hrefs come from the content layer (CTA resolver),
never hand-assembled.

---

## 12. AI-friendliness (keep intact)

The site is AI-readable by design; the rebuild must not regress this.

- Keep canonical metadata (`src/lib/metadata.ts`), `sitemap.xml`, `robots.txt`, and `llms.txt` /
  `llms-full.txt` generation wired and correct.
- Stable, clean URLs: `/`, `/projects`, `/projects/[slug]`. Don't rename or break canonical paths.
- Semantic, clean heading hierarchy (one `h1` per page, ordered headings) so the structure parses.
- Per-project social images and concise descriptions stay from the content layer.
- Don't bury content behind client-only rendering that strips it from initial HTML — static-first.

---

## 13. Framer connection (live — Server API)

Unlike the prior run, the real templates are fully reachable — the **complete design system of your
assigned template is already extracted into your worktree**, headless, no setup required of you:

- **`tools/framer-bridge/out/<lane>.json` — read this top to bottom.** A compact design brief pulled
  live from the real Framer project: the template's named **color token system** (`getColorStyles` →
  e.g. `/Main/Primary`, `/Background/Surface`, light/dark values), its **type system** (`getTextStyles`
  → named styles mapped to `h1/h2/p` tags, font family/weight, alignment, per-breakpoint sizes), its
  **used fonts**, its **component inventory** (names like `NavBar`, `Hero`, `FeatureCard`,
  `PricingPlans`, `Footer` reveal the section vocabulary), page list, and CMS/custom-code.
- **`tools/framer-bridge/out/<lane>.full.json` — drill here for exact layout.** Every page/frame/text/
  component node with full geometry (position/size/pins), background/border/radius, layout, and
  per-breakpoint text styling. This is the real spacing, rhythm, and structure.
- **`tools/framer-bridge/out/<lane>.home.png` — a full-page render** of the template's home page (a
  visual anchor; the JSON above is the source of truth for values).

This is produced headless by `node tools/framer-bridge/inspect.mjs <lane>` via the Framer **Server API**
(`getNodesWithType` + `getColorStyles` + `getTextStyles`); you don't need to run it — the orchestrator
deposits the files. **Map the template's color/type tokens onto our token contract and translate its
section structure into our content — borrow the DNA, never clone the layout.** §3's digest is the
art-direction guide; these files tighten fonts, colors, section rhythm, and spacing to the real thing.
Connection status is tracked in `tools/framer-bridge/CONNECTIONS.md`.

---

## 14. Anti-slop checklist (reject the design if any are true)

- Generic multi-color gradient blobs; stock "AI" mesh gradients; gradient text everywhere.
- Pure `#000` or pure `#fff` flat canvas with no atmosphere, depth, or texture.
- Visible/heavy grain that reads as JPEG artifacting instead of fine film tooth.
- Lorem ipsum, placeholder copy, "coming soon", status apologies, or implementation caveats in
  marketing copy.
- Default shadcn/Tailwind-UI/Framer-template look shipped unchanged; obvious cloned hero.
- Mismatched radii (card ≠ button ≠ input); inconsistent spacing; ad-hoc margins; off-scale type.
- Hardcoded hex/px in components instead of tokens/CSS vars.
- Low-contrast body text (fails AA); invisible or missing focus rings.
- Fake metrics, fake "trusted by" logo walls, invented testimonials, or claims not in the contracts.
- Three-column "feature soup" or SaaS pricing-card energy that ignores our open-core dev context.
- Broken/cramped layout at 768 or 390; horizontal scroll on mobile; desktop-only thinking.
- Light theme that's just the dark theme inverted (or missing entirely); grain that doesn't adapt.
- Heavy `feDisplacementMap` filter on a full-screen background (perf); animated grain with no
  reduced-motion guard.
- Carousels/marquees/scroll-hijacking; motion that delays content paint.
- One-off page styling that can't be reused; components that only work in one spot.

---

*Build it like a studio showing its own best work. Pick a lane, commit, and make every pixel earn its
place.*
