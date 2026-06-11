import { validateThemeDials, validateTokenPreset, type ThemeDials, type TokenPreset } from "./schema";

/**
 * design/synk — Lane B, systematized light.
 *
 * The Synk reference template is a near-black AI-SaaS system built entirely on
 * named global style variables (Background / Card / Border / White-muted …) with
 * Inter throughout and divider-separated modular sections. We borrow that DNA —
 * the "every value is a swappable global variable" discipline and the modular,
 * hairline-divided rhythm — and translate it into a calm, layered off-white
 * editorial system. The single brand accent is indigo `#2b4173`, authored here as
 * `color.accent` (surfaced only through `--accent` / `--primary` / `--ring`),
 * never as a literal in a component. Both presets are validated against the
 * frozen `tokenPresetSchema`; both emit the exact `tokenCssVariables()` var set.
 *
 * The dials' `accent` slot is the frozen foundation enum label (`green`); the
 * rendered accent always comes from the hex below, not the slot name.
 */

/** Brand accent — locked indigo. Single source for the accent across both themes. */
const ACCENT = "#2b4173";
const ACCENT_FOREGROUND = "#f6f8fd";
const RING = "#3a5495";

/** Shared, theme-independent system values (the "systematized" contract made visible). */
const typography: TokenPreset["typography"] = {
  sans: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace",
  display: "var(--font-inter), Inter, ui-sans-serif, system-ui, sans-serif",
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "clamp(1.75rem, 3vw, 2.5rem)",
    hero: "clamp(2.75rem, 7.5vw, 6rem)"
  },
  lineHeight: {
    tight: 1.04,
    body: 1.6
  }
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  // Synk container is 1200px; we keep that exact max with a fluid gutter.
  container: "min(1200px, calc(100vw - 3rem))",
  // Synk sections breathe at ~100px vertical; fluid-clamp it for our four breakpoints.
  section: "clamp(4.5rem, 9vw, 7.5rem)",
  control: "2.875rem"
};

const radii: TokenPreset["radii"] = {
  sm: "8px",
  md: "12px",
  lg: "18px",
  pill: "999px"
};

const dials: ThemeDials = validateThemeDials({
  // `green` is the frozen enum slot for this lane; the rendered accent is the indigo hex above.
  accent: "green",
  contrast: 78,
  warmth: 30,
  density: 50,
  radius: 12,
  surfaceDepth: 38,
  motion: 34
});

const ownership: TokenPreset["ownership"] = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["dials", "colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

const logos: TokenPreset["logos"] = {
  markShape: "frame",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const handles: TokenPreset["handles"] = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
};

const registry: TokenPreset["registry"] = {
  item: "@jami-studio/theme/synk",
  version: "0.1.0",
  candidate: true,
  exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
  branchMutable: ["dials", "color", "typography", "spacing", "radii", "surface", "elevation", "motion"]
};

/**
 * LIGHT — the primary lane. A layered off-white editorial system: a cool paper
 * canvas, pure-white panels lifting off it, hairline cool-gray borders, ink text
 * that is not pure black, and the indigo accent reserved for interactive roles.
 */
export const lightPreset: TokenPreset = validateTokenPreset({
  id: "synk-light",
  name: "Synk Systematized Light",
  description:
    "Primary lane preset: a calm, layered off-white editorial system with an indigo accent and visible global-variable discipline.",
  ownership,
  dials,
  color: {
    background: "#f4f5f8",
    foreground: "#15181f",
    muted: "#e7e9ef",
    mutedForeground: "#576073",
    panel: "#ffffff",
    panelForeground: "#15181f",
    border: "#dde0e9",
    ring: RING,
    accent: ACCENT,
    accentForeground: ACCENT_FOREGROUND
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#f4f5f8",
    panel: "#ffffff",
    panelRaised: "#fbfcfe",
    overlay: "#ffffff",
    inverse: "#15181f"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(21 24 31 / 0.05), 0 0 0 1px rgb(21 24 31 / 0.02)",
    md: "0 22px 50px -28px rgb(21 24 31 / 0.22)"
  },
  motion: {
    duration: "320ms",
    durationFast: "180ms",
    easing: "cubic-bezier(.2,.7,.2,1)",
    intensity: 34
  },
  logos,
  handles,
  registry
});

/**
 * DARK — the companion theme. Synk's own near-black canvas (#030303 → a warmer,
 * banding-free near-black), card grays lifted a few percent, hairline borders, and
 * a brightened indigo so the accent still reads as "neon through fog" on dark.
 */
export const darkPreset: TokenPreset = validateTokenPreset({
  id: "synk-dark",
  name: "Synk Systematized Dark",
  description:
    "Companion dark theme: a near-black systematized canvas with lifted card grays, hairline borders, and a brightened indigo accent.",
  ownership,
  dials: validateThemeDials({ ...dials, contrast: 82, warmth: 24, surfaceDepth: 46 }),
  color: {
    background: "#0c0d11",
    foreground: "#f3f4f8",
    muted: "#191b22",
    mutedForeground: "#9aa0b2",
    panel: "#131419",
    panelForeground: "#f3f4f8",
    border: "#262833",
    ring: "#8ea2dc",
    accent: "#6f8bd6",
    accentForeground: "#0b0d14"
  },
  typography,
  spacing,
  radii,
  surface: {
    canvas: "#0c0d11",
    panel: "#131419",
    panelRaised: "#191b22",
    overlay: "#181a21",
    inverse: "#f3f4f8"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.5), 0 0 0 1px rgb(255 255 255 / 0.02)",
    md: "0 26px 60px -30px rgb(0 0 0 / 0.7)"
  },
  motion: {
    duration: "320ms",
    durationFast: "180ms",
    easing: "cubic-bezier(.2,.7,.2,1)",
    intensity: 34
  },
  logos,
  handles,
  registry
});

export const synkThemes = { light: lightPreset, dark: darkPreset } as const;
export type ThemeName = keyof typeof synkThemes;
