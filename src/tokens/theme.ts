import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Nouva lane — Lane B (bold light editorial) on a `#854780` magenta accent.
 *
 * These VALUES are owned by this design lane; the schema, the CSS-var contract
 * (`tokenCssVariables`), and the validation pipeline are shared/foundation-owned and
 * untouched. Both a full light preset (the lane's primary character) and a full dark
 * preset ship; the dark theme is designed, not an inverted light theme.
 *
 * Type DNA is translated from the real Nouva template extraction
 * (`tools/framer-bridge/out/nouva.json`): Onest as the personality face with tight
 * negative tracking on oversized headings, a mono face carrying the editorial
 * `01/02/03` section numbers, eyebrows, and tags.
 */

// Font stacks. The leading family name is injected at runtime from `next/font`
// className-bound CSS variables (`--font-onest`, `--font-jetbrains-mono`) declared in
// the layout; the literal family names here are the self-hosted fallbacks so the
// preset is valid and renders correctly even before hydration.
const ONEST_STACK = "var(--font-onest), Onest, ui-sans-serif, system-ui, -apple-system, sans-serif";
const MONO_STACK =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Editorial type scale. `hero` owns the oversized print-annual moment; `xl`/`lg`
// carry section heads and subheads. Tracking is handled per-role in `globals.css`.
const TYPE_SCALE = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1.0625rem",
  lg: "1.375rem",
  xl: "clamp(2.1rem, 3.6vw, 3.1rem)",
  hero: "clamp(3.1rem, 9.2vw, 8.25rem)"
} as const;

const TYPOGRAPHY = {
  sans: ONEST_STACK,
  mono: MONO_STACK,
  display: ONEST_STACK,
  scale: TYPE_SCALE
} as const;

// One spacing system shared across both themes (Lane B leans open + editorial).
const SPACING = {
  density: "comfortable",
  unit: "1rem",
  control: "2.875rem",
  section: "clamp(4.5rem, 9vw, 8.5rem)",
  container: "min(1180px, calc(100vw - 2.5rem))"
} as const;

// One radius scale. Editorial lane stays crisp — small, restrained corners.
const RADII = {
  sm: "4px",
  md: "8px",
  lg: "14px",
  pill: "999px"
} as const;

// One motion vocabulary, shared by both themes.
const MOTION = {
  duration: "460ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)",
  intensity: 40
} as const;

const LOGOS = {
  markShape: "frame",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
} as const;

const HANDLES = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
} as const;

function ownership() {
  return {
    foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
    branchOwned: [
      "dials",
      "colorValues",
      "typographyValues",
      "surfaceTreatment",
      "componentExpression"
    ]
  };
}

const REGISTRY_EXPORTS = ["themePreset", "themeDials", "cssVariables", "registryManifest"] as const;
const REGISTRY_BRANCH_MUTABLE = [
  "dials",
  "color",
  "typography",
  "spacing",
  "radii",
  "surface",
  "elevation",
  "motion"
] as const;

/**
 * Light preset — the lane's primary character.
 *
 * Layered warm off-whites (not stark `#fff`) give the canvas rhythm; near-black warm
 * ink carries the type; magenta `#854780` is the single editorial highlight per section
 * and the interactive accent. Borders are hairline; elevation is whisper-soft (editorial
 * cards are border + space, not heavy shadow).
 */
export const nouvaLightPreset: TokenPreset = validateTokenPreset({
  id: "nouva-light",
  name: "Nouva Light Editorial",
  description:
    "Bold light editorial preset for the Nouva lane: layered warm off-white canvas, near-black ink, magenta accent.",
  ownership: ownership(),
  dials: {
    accent: "violet",
    contrast: 86,
    warmth: 58,
    density: 52,
    radius: 8,
    surfaceDepth: 22,
    motion: 40
  },
  color: {
    background: "#f7f5f2",
    foreground: "#16131a",
    muted: "#ece8e4",
    mutedForeground: "#5a5560",
    panel: "#fffdfb",
    panelForeground: "#16131a",
    border: "#e2dbe0",
    ring: "#854780",
    accent: "#854780",
    accentForeground: "#fdf7fc"
  },
  typography: {
    ...TYPOGRAPHY,
    lineHeight: {
      tight: 0.96,
      body: 1.6
    }
  },
  spacing: { ...SPACING },
  radii: { ...RADII },
  surface: {
    canvas: "#f7f5f2",
    panel: "#fffdfb",
    panelRaised: "#ffffff",
    overlay: "#fffdfb",
    inverse: "#16131a"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(26 19 32 / 0.05)",
    md: "0 24px 60px -28px rgb(26 19 32 / 0.22)"
  },
  motion: { ...MOTION },
  logos: { ...LOGOS },
  handles: { ...HANDLES },
  registry: {
    item: "@jami-studio/theme/nouva-light",
    version: "0.1.0",
    candidate: true,
    exports: [...REGISTRY_EXPORTS],
    branchMutable: [...REGISTRY_BRANCH_MUTABLE]
  }
});

/**
 * Dark preset — a designed nocturne, not an inverted light theme.
 *
 * Warm plum-charcoal canvas (not pure black) with layered panels; bright magenta
 * `#c98fc4` reads as the editorial highlight and links, paired with dark ink on accent
 * fills. Foreground is warm near-white. Hairline light borders separate surfaces.
 */
export const nouvaDarkPreset: TokenPreset = validateTokenPreset({
  id: "nouva-dark",
  name: "Nouva Dark Editorial",
  description:
    "Dark companion for the Nouva lane: warm plum-charcoal canvas, layered panels, bright magenta editorial accent.",
  ownership: ownership(),
  dials: {
    accent: "violet",
    contrast: 88,
    warmth: 58,
    density: 52,
    radius: 8,
    surfaceDepth: 64,
    motion: 40
  },
  color: {
    background: "#14111a",
    foreground: "#f3eef4",
    muted: "#221d2b",
    mutedForeground: "#a79fb0",
    panel: "#1b1724",
    panelForeground: "#f3eef4",
    border: "#2e2838",
    ring: "#c98fc4",
    accent: "#c98fc4",
    accentForeground: "#1a1320"
  },
  typography: {
    ...TYPOGRAPHY,
    lineHeight: {
      tight: 0.96,
      body: 1.6
    }
  },
  spacing: { ...SPACING },
  radii: { ...RADII },
  surface: {
    canvas: "#14111a",
    panel: "#1b1724",
    panelRaised: "#221d2c",
    overlay: "#1b1724",
    inverse: "#f3eef4"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.4)",
    md: "0 28px 64px -30px rgb(0 0 0 / 0.7)"
  },
  motion: { ...MOTION },
  logos: { ...LOGOS },
  handles: { ...HANDLES },
  registry: {
    item: "@jami-studio/theme/nouva-dark",
    version: "0.1.0",
    candidate: true,
    exports: [...REGISTRY_EXPORTS],
    branchMutable: [...REGISTRY_BRANCH_MUTABLE]
  }
});

export const nouvaThemePresets = {
  light: nouvaLightPreset,
  dark: nouvaDarkPreset
} as const;

export type NouvaThemeName = keyof typeof nouvaThemePresets;
