import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Synk lane — faithful dark reproduction (primary) plus a real light counterpart.
 *
 * Palette is template-true, lifted from the Synk extraction:
 *   Background #030303 · Card-dark #0f0f0f · Card-darkest #080808 · Elevation-dark #0b0b0b
 *   Border #171717 · Border-dark #121212 · Border-light (dashed seams) #2e2e2e
 *   White #ffffff · White-muted #9c9c9c · Red (the lone accent) #ff5e5d
 *
 * The coral accent is authored as `color.accent` (+ `ring`) and surfaced only through
 * `--accent` / `--primary` / `--ring`. The dial block claims the `rose` slot — the closest
 * named family — while the rendered hex stays the template's coral.
 *
 * Both presets are authored VALUES (not generated from dials). 6-digit hex only.
 */

const FONT_SANS = "var(--font-inter, Inter), Inter, ui-sans-serif, system-ui, sans-serif";
const FONT_DISPLAY = FONT_SANS; // Synk is Inter-only; display = sans.
const FONT_MONO = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Synk type system: H1 600 48/55 −0.02em · H2 600 36/43 · H3 500 28/35 · body 16/26 · sm 14 · xs 12.
const TYPE_SCALE = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "clamp(1.75rem, 3.2vw, 2.25rem)",
  hero: "clamp(2.375rem, 5.4vw, 3rem)"
} as const;

const TYPE_LINE = { tight: 1.15, body: 1.62 } as const;

// Cards/panels sit on small radii; CTAs are full pills.
const RADII = { sm: "6px", md: "10px", lg: "14px", pill: "999px" } as const;

const SPACING = {
  density: "comfortable" as const,
  unit: "1rem",
  control: "2.75rem",
  section: "clamp(4.5rem, 9vw, 6.5rem)",
  container: "min(1200px, calc(100vw - 2rem))"
};

const MOTION = {
  duration: "420ms",
  durationFast: "180ms",
  easing: "cubic-bezier(0.25, 0.6, 0.25, 1)",
  intensity: 30
};

const LOGOS = { markShape: "frame" as const, wordmark: "jami.studio", favicon: "/icon.svg" };
const HANDLES = { github: "studio-jami", npm: "@jami-studio", x: "@studio_jami" };

const REGISTRY = {
  item: "@jami-studio/theme/synk-lattice",
  version: "0.1.0",
  candidate: true,
  exports: ["themePreset", "cssVariables", "registryManifest"],
  branchMutable: ["color", "typography", "spacing", "radii", "surface", "elevation", "motion"]
};

const OWNERSHIP = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

/**
 * DARK — the primary theme; Synk's exact canvas.
 * Near-black #030303, dashed lattice seams, coral #ff5e5d kept scarce.
 */
export const synkDarkPreset: TokenPreset = validateTokenPreset({
  id: "synk-dark",
  name: "Synk Lattice — Dark",
  description:
    "Template-true Synk dark: #030303 canvas, dot-matrix textures, dashed-border card lattice, coral accent used sparingly.",
  ownership: OWNERSHIP,
  dials: {
    accent: "rose",
    contrast: 92,
    warmth: 8,
    density: 50,
    radius: 10,
    surfaceDepth: 62,
    motion: 30
  },
  color: {
    background: "#030303",
    foreground: "#ffffff",
    muted: "#121212",
    mutedForeground: "#9c9c9c",
    panel: "#0f0f0f",
    panelForeground: "#ffffff",
    border: "#171717",
    ring: "#ff5e5d",
    accent: "#ff5e5d",
    accentForeground: "#140404"
  },
  typography: {
    sans: FONT_SANS,
    mono: FONT_MONO,
    display: FONT_DISPLAY,
    scale: TYPE_SCALE,
    lineHeight: TYPE_LINE
  },
  spacing: SPACING,
  radii: RADII,
  surface: {
    canvas: "#030303",
    panel: "#080808",
    panelRaised: "#0f0f0f",
    overlay: "#0b0b0b",
    inverse: "#ffffff"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.55), 0 0 0 1px rgb(255 255 255 / 0.02)",
    md: "0 24px 60px rgb(0 0 0 / 0.5)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: REGISTRY
});

/**
 * LIGHT — a real light design of the same systematized lattice
 * (paper-white canvas, ink dots and dashed seams, coral deepened only for the focus ring).
 */
export const synkLightPreset: TokenPreset = validateTokenPreset({
  id: "synk-light",
  name: "Synk Lattice — Light",
  description:
    "The Synk lattice re-set on paper: warm white canvas, ink dot-matrix, dashed hairline seams, coral accent kept scarce.",
  ownership: OWNERSHIP,
  dials: {
    accent: "rose",
    contrast: 86,
    warmth: 30,
    density: 50,
    radius: 10,
    surfaceDepth: 26,
    motion: 30
  },
  color: {
    background: "#f7f7f5",
    foreground: "#0d0d0d",
    muted: "#ececea",
    mutedForeground: "#585856",
    panel: "#ffffff",
    panelForeground: "#0d0d0d",
    border: "#e2e2de",
    ring: "#c43534",
    accent: "#ff5e5d",
    accentForeground: "#140404"
  },
  typography: {
    sans: FONT_SANS,
    mono: FONT_MONO,
    display: FONT_DISPLAY,
    scale: TYPE_SCALE,
    lineHeight: TYPE_LINE
  },
  spacing: SPACING,
  radii: RADII,
  surface: {
    canvas: "#f7f7f5",
    panel: "#fcfcfb",
    panelRaised: "#ffffff",
    overlay: "#ffffff",
    inverse: "#0d0d0d"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(13 13 13 / 0.05), 0 0 0 1px rgb(13 13 13 / 0.02)",
    md: "0 18px 44px rgb(13 13 13 / 0.09)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: { ...REGISTRY, item: "@jami-studio/theme/synk-lattice-light" }
});

export const themePresets = {
  dark: synkDarkPreset,
  light: synkLightPreset
} as const;

export type ThemeName = keyof typeof themePresets;

export const defaultThemeName: ThemeName = "dark";
