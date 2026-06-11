import { validateTokenPreset, type TokenPreset } from "./schema";

/**
 * Noir lane token presets — dark (primary character) and light.
 *
 * Lane: `design/noir` · aesthetic lane A (high-contrast dark agency).
 * Brand accent: copper `#a1704f`, authored as `color.accent` → `--accent`/`--primary`,
 * dial family `amber`. The rendered accent always comes from the hex, never the slot name.
 *
 * DNA translated from the Noir Framer template (`tools/framer-bridge/out/noir.json`):
 * near-black canvas (`rgb(22,22,22)` Jet Black → `#121214`), white-on-black type,
 * Instrument Sans display with tight tracking, Geist Mono for `01/02/03` labels,
 * a single warm accent used sparingly. The template's orange-red is translated to our
 * locked copper. Both themes ship; the switch is `[data-theme]` over the same CSS vars.
 *
 * Frozen contracts (`schema.ts`, `css-vars.ts`) are untouched; only the VALUES below are
 * lane-owned. Every `color.*` / `surface.*` is a 6-digit hex per the schema.
 */

// Shared, lane-owned scales (identical structural language across both themes).
const fontDisplay =
  'var(--font-instrument-sans), "Instrument Sans", ui-sans-serif, system-ui, sans-serif';
const fontSans =
  'var(--font-instrument-sans), "Instrument Sans", ui-sans-serif, system-ui, sans-serif';
const fontMono = 'var(--font-geist-mono), "Geist Mono", ui-monospace, SFMono-Regular, monospace';

const typeScale = {
  xs: "0.75rem",
  sm: "0.8125rem",
  base: "1rem",
  lg: "1.25rem",
  xl: "clamp(1.75rem, 3.4vw, 2.5rem)",
  hero: "clamp(3.25rem, 11vw, 8.5rem)"
} as const;

const radii = {
  sm: "6px",
  md: "10px",
  lg: "16px",
  pill: "999px"
} as const;

const spacing = {
  unit: "1rem",
  control: "3rem",
  // Generous vertical rhythm — the Noir signature large section gaps.
  section: "clamp(5rem, 12vw, 9rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
} as const;

const motion = {
  duration: "560ms",
  durationFast: "220ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
} as const;

const handles = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
} as const;

const logos = {
  markShape: "frame" as const,
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const registry = {
  item: "@jami-studio/theme/noir",
  version: "0.1.0",
  candidate: true,
  exports: ["themePreset", "themeDials", "cssVariables", "registryManifest"],
  branchMutable: [
    "dials",
    "color",
    "typography",
    "spacing",
    "radii",
    "surface",
    "elevation",
    "motion"
  ]
};

const ownership = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["dials", "colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

// ---------------------------------------------------------------------------
// DARK — primary character. Warm near-black charcoal so grain has tooth to sit on.
// ---------------------------------------------------------------------------
export const darkPreset: TokenPreset = validateTokenPreset({
  id: "noir-dark",
  name: "Noir — Dark",
  description:
    "High-contrast dark agency theme: warm near-black canvas, white-on-black type, copper accent.",
  ownership,
  dials: {
    accent: "amber",
    contrast: 88,
    warmth: 58,
    density: 52,
    radius: 10,
    surfaceDepth: 66,
    motion: 44
  },
  color: {
    background: "#121214",
    foreground: "#f4f1ec",
    muted: "#1d1d20",
    mutedForeground: "#a6a09a",
    panel: "#16161a",
    panelForeground: "#f4f1ec",
    border: "#2b2b30",
    ring: "#c68a5e",
    accent: "#a1704f",
    // Warm near-black so primary-button labels clear WCAG AA (4.5:1) on copper
    // even at the 13px-bold `md` size — #15100c was 4.45, this is 4.62.
    accentForeground: "#0f0b07"
  },
  typography: {
    sans: fontSans,
    mono: fontMono,
    display: fontDisplay,
    scale: typeScale,
    lineHeight: {
      tight: 1.02,
      body: 1.6
    }
  },
  spacing: {
    density: "comfortable",
    unit: spacing.unit,
    control: spacing.control,
    section: spacing.section,
    container: spacing.container
  },
  radii,
  surface: {
    canvas: "#0f0f11",
    panel: "#16161a",
    panelRaised: "#1c1c21",
    overlay: "#1a1a1f",
    inverse: "#f4f1ec"
  },
  elevation: {
    none: "none",
    sm: "0 1px 0 rgb(255 255 255 / 0.04), 0 8px 24px rgb(0 0 0 / 0.45)",
    md: "0 1px 0 rgb(255 255 255 / 0.05), 0 28px 64px rgb(0 0 0 / 0.6)"
  },
  motion: {
    duration: motion.duration,
    durationFast: motion.durationFast,
    easing: motion.easing,
    intensity: 44
  },
  logos,
  handles,
  registry
});

// ---------------------------------------------------------------------------
// LIGHT — fully designed, not an inverted dark. Layered warm off-white, ink type.
// ---------------------------------------------------------------------------
export const lightPreset: TokenPreset = validateTokenPreset({
  id: "noir-light",
  name: "Noir — Light",
  description:
    "Warm light counterpart of the Noir lane: layered off-white surfaces, ink type, copper accent.",
  ownership,
  dials: {
    accent: "amber",
    contrast: 84,
    warmth: 64,
    density: 52,
    radius: 10,
    surfaceDepth: 30,
    motion: 44
  },
  color: {
    background: "#f3efe8",
    foreground: "#181613",
    muted: "#e7e0d4",
    mutedForeground: "#6c6359",
    panel: "#fbf8f2",
    panelForeground: "#181613",
    border: "#ddd4c5",
    ring: "#8a5733",
    accent: "#8a5733",
    accentForeground: "#fdf9f3"
  },
  typography: {
    sans: fontSans,
    mono: fontMono,
    display: fontDisplay,
    scale: typeScale,
    lineHeight: {
      tight: 1.02,
      body: 1.6
    }
  },
  spacing: {
    density: "comfortable",
    unit: spacing.unit,
    control: spacing.control,
    section: spacing.section,
    container: spacing.container
  },
  radii,
  surface: {
    canvas: "#efe9df",
    panel: "#fbf8f2",
    panelRaised: "#ffffff",
    overlay: "#fbf8f2",
    inverse: "#181613"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(60 48 32 / 0.06), 0 8px 22px rgb(60 48 32 / 0.05)",
    md: "0 1px 2px rgb(60 48 32 / 0.06), 0 26px 56px rgb(60 48 32 / 0.1)"
  },
  motion: {
    duration: motion.duration,
    durationFast: motion.durationFast,
    easing: motion.easing,
    intensity: 44
  },
  logos,
  handles,
  registry
});

export const noirPresets = [darkPreset, lightPreset] as const;
export type NoirThemeName = "dark" | "light";
