import { validateTokenPreset, type ThemeDials, type TokenPreset } from "./schema";

/**
 * Nouva lane — Lane B (bold light editorial), magenta brand accent.
 *
 * The Framer "Nouva" reference ships a dark canvas with a lime primary; this lane borrows its DNA
 * (Onest type, tight -0.04em display tracking, the eyebrow/tag vocabulary, the
 * Hero → why → features → benefits → comparison → proof → faq → cta rhythm) and translates it into a
 * fresh light-editorial system whose only brand hue is the locked magenta `#854780`.
 *
 * Both themes are authored here as full `TokenPreset` values and surfaced to components only through
 * the frozen `tokenCssVariables()` contract. The accent is a token (`color.accent` → `--accent` /
 * `--primary`), never a component literal, so the lane stays swappable to any studio brand hex.
 */

// Locked brand accent (dial family `violet`).
const ACCENT = "#854780"; // magenta
const ACCENT_HOVER_DARK = "#c074ba"; // lifted magenta for "neon through fog" on the dark canvas

// Shared type system (borrowed from Nouva: Onest display+body, mono for labels/section numbers).
const FONT_SANS = "var(--font-onest), Onest, ui-sans-serif, system-ui, -apple-system, sans-serif";
const FONT_DISPLAY =
  "var(--font-onest), Onest, ui-sans-serif, system-ui, -apple-system, sans-serif";
const FONT_MONO =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, monospace";

// One type scale for both themes. `hero` owns the moment; tight tracking lives in globals.css.
const TYPE_SCALE = {
  xs: "0.75rem",
  sm: "0.8125rem",
  base: "1.0625rem",
  lg: "1.25rem",
  xl: "clamp(1.75rem, 1.1rem + 2.6vw, 3rem)",
  hero: "clamp(2.85rem, 1.2rem + 7.4vw, 6.5rem)"
} as const;

// One spacing + radius rhythm (section ≈ Nouva's 96px band; container holds editorial measure).
const SPACING = {
  density: "comfortable" as const,
  unit: "1rem",
  control: "2.875rem",
  section: "clamp(4.5rem, 3rem + 7vw, 7.5rem)",
  container: "min(1180px, calc(100vw - 2.5rem))"
};

const RADII = {
  sm: "8px",
  md: "14px",
  lg: "22px",
  pill: "999px"
} as const;

const MOTION = {
  duration: "460ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  intensity: 40
} as const;

const LOGOS = {
  markShape: "frame" as const,
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const HANDLES = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
};

const OWNERSHIP = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["dials", "colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

function registry(id: string) {
  return {
    item: `@jami-studio/theme/${id}`,
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
}

/**
 * Light theme — the lane's primary character.
 * Warm, layered off-white canvas; near-black magenta-tinted ink; hairline borders; magenta accent
 * reserved for interactive + one editorial highlight per section.
 */
export const lightDials: ThemeDials = {
  accent: "violet",
  contrast: 86,
  warmth: 58,
  density: 50,
  radius: 14,
  surfaceDepth: 34,
  motion: 40
};

export const lightPreset: TokenPreset = validateTokenPreset({
  id: "nouva-light",
  name: "Nouva Light Editorial",
  description:
    "Bold light-editorial preset for the Nouva lane: warm layered off-white, near-black ink, magenta accent reserved for interactive and editorial emphasis.",
  ownership: OWNERSHIP,
  dials: lightDials,
  color: {
    background: "#f6f4f1",
    foreground: "#17131b",
    muted: "#ece8e3",
    mutedForeground: "#6d6470",
    panel: "#fdfcfb",
    panelForeground: "#17131b",
    border: "#e1dcd6",
    ring: "#854780",
    accent: ACCENT,
    accentForeground: "#fdf7fc"
  },
  typography: {
    sans: FONT_SANS,
    mono: FONT_MONO,
    display: FONT_DISPLAY,
    scale: TYPE_SCALE,
    lineHeight: {
      tight: 1.02,
      body: 1.55
    }
  },
  spacing: SPACING,
  radii: RADII,
  surface: {
    canvas: "#f6f4f1",
    panel: "#fdfcfb",
    panelRaised: "#ffffff",
    overlay: "#ffffff",
    inverse: "#17131b"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(35 23 38 / 0.06), 0 1px 1px rgb(35 23 38 / 0.04)",
    md: "0 24px 60px -28px rgb(35 23 38 / 0.22), 0 6px 18px -10px rgb(35 23 38 / 0.12)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: registry("nouva-light")
});

/**
 * Dark theme — same IA, full second theme (not an inverted light).
 * Near-black warm charcoal with a faint magenta cast; off-white ink; lifted magenta accent so it
 * reads like neon through fog. Surfaces separate by a few percent + hairline border, not heavy cards.
 */
export const darkDials: ThemeDials = {
  accent: "violet",
  contrast: 88,
  warmth: 52,
  density: 50,
  radius: 14,
  surfaceDepth: 60,
  motion: 40
};

export const darkPreset: TokenPreset = validateTokenPreset({
  id: "nouva-dark",
  name: "Nouva Dark Editorial",
  description:
    "Dark companion preset for the Nouva lane: warm near-black charcoal with a magenta cast, off-white ink, lifted magenta accent for interactive and editorial emphasis.",
  ownership: OWNERSHIP,
  dials: darkDials,
  color: {
    background: "#100b14",
    foreground: "#f4eef3",
    muted: "#1c1521",
    mutedForeground: "#9c8fa3",
    panel: "#181020",
    panelForeground: "#f4eef3",
    border: "#2c2333",
    ring: ACCENT_HOVER_DARK,
    accent: ACCENT_HOVER_DARK,
    accentForeground: "#160a14"
  },
  typography: {
    sans: FONT_SANS,
    mono: FONT_MONO,
    display: FONT_DISPLAY,
    scale: TYPE_SCALE,
    lineHeight: {
      tight: 1.02,
      body: 1.55
    }
  },
  spacing: SPACING,
  radii: RADII,
  surface: {
    canvas: "#100b14",
    panel: "#181020",
    panelRaised: "#20162a",
    overlay: "#241a2e",
    inverse: "#f4eef3"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.5)",
    md: "0 28px 70px -30px rgb(0 0 0 / 0.7), 0 8px 24px -12px rgb(0 0 0 / 0.55)"
  },
  motion: MOTION,
  logos: LOGOS,
  handles: HANDLES,
  registry: registry("nouva-dark")
});

export const themePresets = {
  light: lightPreset,
  dark: darkPreset
} as const;

export type ThemeName = keyof typeof themePresets;
