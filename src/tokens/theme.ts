import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Synk lane — "systematized light" (Lane B), with a full dark counterpart.
 *
 * The Synk template is a global-styling-variable, swap-anything design system: every
 * surface is a boxed, hairline-framed cell on a 1280px content lattice, and an explicit
 * Divider separates every section. We translate that DNA into our token contract and run
 * a calm indigo accent (`#2b4173`) through `--accent` / `--primary` only — never a literal.
 *
 * Both presets are authored VALUES (not generated from dials); the dial block is metadata
 * that keeps the config panel honest. 6-digit hex only.
 */

const FONT_DISPLAY = "var(--font-display, 'Inter Tight'), 'Inter Tight', Inter, ui-sans-serif, system-ui, sans-serif";
const FONT_SANS = "var(--font-sans, Inter), Inter, ui-sans-serif, system-ui, -apple-system, sans-serif";
const FONT_MONO = "var(--font-mono, 'JetBrains Mono'), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

// Inter-derived editorial scale (Synk uses Inter h1 48 / h2 36 / h3 28 / body 16-18).
// We lift the hero into a fluid display moment while keeping the section heads on Synk's rhythm.
const TYPE_SCALE = {
  xs: "0.75rem",
  sm: "0.8125rem",
  base: "1rem",
  lg: "1.125rem",
  xl: "clamp(1.75rem, 2.6vw, 2.25rem)",
  hero: "clamp(2.75rem, 7vw, 5.25rem)"
} as const;

const TYPE_LINE = { tight: 1.02, body: 1.62 } as const;

const RADII = { sm: "8px", md: "12px", lg: "16px", pill: "999px" } as const;

const SPACING = {
  density: "comfortable" as const,
  unit: "1rem",
  control: "2.875rem",
  section: "clamp(4.5rem, 9vw, 6.5rem)",
  container: "min(1280px, calc(100vw - 2rem))"
};

const MOTION = {
  duration: "420ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  intensity: 38
};

const LOGOS = { markShape: "frame" as const, wordmark: "jami.studio", favicon: "/icon.svg" };
const HANDLES = { github: "studio-jami", npm: "@jami-studio", x: "@studio_jami" };

const REGISTRY = {
  item: "@jami-studio/theme/synk-systematized",
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
 * LIGHT — primary lane character.
 * Warm off-white lattice, near-ink text, hairline borders, calm indigo accent.
 */
export const synkLightPreset: TokenPreset = validateTokenPreset({
  id: "synk-light",
  name: "Synk Systematized — Light",
  description:
    "Systematized light editorial: warm off-white canvas, hairline-framed cells on a 1280px lattice, calm indigo accent.",
  ownership: OWNERSHIP,
  dials: {
    // Indigo has no accent-enum name. We author the value directly; the lane claims the
    // `green` dial slot, retuned to true indigo in presets `accentPalettes` so the config
    // <select> reads honest. The dial is metadata — render uses the authored values below.
    accent: "green",
    contrast: 84,
    warmth: 40,
    density: 50,
    radius: 12,
    surfaceDepth: 28,
    motion: 38
  },
  color: {
    background: "#f6f6f3",
    foreground: "#16181d",
    muted: "#ecebe4",
    mutedForeground: "#5b5f68",
    panel: "#ffffff",
    panelForeground: "#16181d",
    border: "#dedbd1",
    ring: "#2b4173",
    accent: "#2b4173",
    accentForeground: "#f7f8fc"
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
    canvas: "#f6f6f3",
    panel: "#ffffff",
    panelRaised: "#fbfaf6",
    overlay: "#ffffff",
    inverse: "#16181d"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(22 24 29 / 0.05), 0 0 0 1px rgb(22 24 29 / 0.02)",
    md: "0 18px 48px rgb(22 24 29 / 0.10)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: REGISTRY
});

/**
 * DARK — Synk-native counterpart.
 * Near-black `#030303` canvas (not pure #000), boxed cells, indigo lifted to read on dark.
 */
export const synkDarkPreset: TokenPreset = validateTokenPreset({
  id: "synk-dark",
  name: "Synk Systematized — Dark",
  description:
    "Synk-native dark: near-black canvas, boxed hairline cells, indigo accent lifted for AA on dark surfaces.",
  ownership: OWNERSHIP,
  dials: {
    accent: "green",
    contrast: 92,
    warmth: 22,
    density: 50,
    radius: 12,
    surfaceDepth: 64,
    motion: 38
  },
  color: {
    background: "#030303",
    foreground: "#f4f5f7",
    muted: "#0f0f0f",
    mutedForeground: "#9c9c9c",
    panel: "#0a0a0a",
    panelForeground: "#f4f5f7",
    border: "#1c1c1c",
    ring: "#8198cf",
    accent: "#7c8fc4",
    accentForeground: "#06080f"
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
    panel: "#0a0a0a",
    panelRaised: "#101010",
    overlay: "#0b0b0b",
    inverse: "#f4f5f7"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.6), 0 0 0 1px rgb(255 255 255 / 0.02)",
    md: "0 24px 60px rgb(0 0 0 / 0.55)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: { ...REGISTRY, item: "@jami-studio/theme/synk-systematized-dark" }
});

export const themePresets = {
  light: synkLightPreset,
  dark: synkDarkPreset
} as const;

export type ThemeName = keyof typeof themePresets;

export const defaultThemeName: ThemeName = "light";
