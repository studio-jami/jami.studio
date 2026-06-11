import { validateTokenPreset, type ThemeDials, type TokenPreset } from "./schema";

/**
 * Lane: design/message-ai — primary aesthetic lane A, cinematic dark (the prime).
 *
 * Authored from the real Message AI Framer template DNA
 * (`tools/framer-bridge/out/message-ai.{json,full.json,home.png}`): warm near-black
 * canvas (`Background` = rgb(10,9,8)), Host Grotesk display + DM Sans body, a 1128px
 * content column on a 96px section rhythm, hairline `rgba(255,255,255,0.16)` borders,
 * and barely-lifted surfaces separated by glow + grain rather than heavy shadows.
 *
 * The template's own accent is a lime `Secondary`; this lane overrides it with the
 * studio's locked brand accent — deep teal `#175d5e` (dial family `cyan`). The accent
 * is authored only as `color.accent` here and surfaced through `--accent` / `--primary`
 * / `--ring`; it is never a literal in a component. Because the deep brand teal is too
 * dark to clear AA as interactive text on a near-black canvas, the dark preset tunes the
 * same teal family up to a luminous sibling (`#2f9d9b`, "neon through fog") for the dark
 * surface while the light preset uses the canonical `#175d5e`. Both stay swappable to any
 * of the five studio brand hexes on this token system — that adjustability is the point.
 *
 * Font CSS values reference the variables wired by `next/font/google` in `layout.tsx`
 * (Host Grotesk, DM Sans, JetBrains Mono — the template's real Google faces), each backed
 * by a full system fallback stack so a static build never depends on a remote asset.
 */

const fontDisplay =
  "var(--font-host-grotesk), 'Host Grotesk', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const fontSans =
  "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";
const fontMono =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const typeScale = {
  xs: "0.75rem",
  sm: "0.875rem",
  base: "1.0625rem",
  lg: "1.25rem",
  xl: "clamp(1.9rem, 1.2rem + 2.4vw, 2.75rem)",
  hero: "clamp(2.85rem, 1.4rem + 6.4vw, 6.5rem)"
} as const;

const spacing = {
  unit: "1rem",
  control: "2.875rem",
  section: "clamp(4.5rem, 3rem + 6vw, 7.5rem)",
  container: "min(1128px, calc(100vw - 3rem))"
} as const;

const radii = {
  sm: "8px",
  md: "12px",
  lg: "18px",
  pill: "999px"
} as const;

const motion = {
  duration: "520ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 1, 0.36, 1)"
} as const;

const logos = {
  markShape: "dot",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
} as const satisfies TokenPreset["logos"];

const handles = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
} as const satisfies TokenPreset["handles"];

const ownership = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: [
    "dials",
    "colorValues",
    "typographyValues",
    "surfaceTreatment",
    "componentExpression"
  ]
} as const satisfies TokenPreset["ownership"];

const registry = {
  item: "@jami-studio/theme/message-ai",
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
} as const satisfies TokenPreset["registry"];

export const darkDials: ThemeDials = {
  accent: "cyan",
  contrast: 88,
  warmth: 22,
  density: 52,
  radius: 12,
  surfaceDepth: 64,
  motion: 44
};

export const lightDials: ThemeDials = {
  accent: "cyan",
  contrast: 80,
  warmth: 28,
  density: 50,
  radius: 12,
  surfaceDepth: 30,
  motion: 40
};

export const darkPreset: TokenPreset = validateTokenPreset({
  id: "message-ai-dark",
  name: "Message AI — Cinematic Dark",
  description:
    "Cinematic near-black canvas with fine film grain, luminous deep-teal accent, and oversized Host Grotesk display — the prime theme for the message-ai lane.",
  ownership,
  dials: darkDials,
  color: {
    background: "#0a0908",
    foreground: "#ececea",
    muted: "#16161a",
    mutedForeground: "#9a9a96",
    panel: "#101012",
    panelForeground: "#f3f3f1",
    border: "#26262b",
    ring: "#3bb3b0",
    accent: "#2f9d9b",
    accentForeground: "#05201f"
  },
  typography: {
    sans: fontSans,
    mono: fontMono,
    display: fontDisplay,
    scale: { ...typeScale },
    lineHeight: { tight: 1.02, body: 1.6 }
  },
  spacing: {
    density: "comfortable",
    unit: spacing.unit,
    control: spacing.control,
    section: spacing.section,
    container: spacing.container
  },
  radii: { ...radii },
  surface: {
    canvas: "#0a0908",
    panel: "#101012",
    panelRaised: "#16171b",
    overlay: "#16171b",
    inverse: "#ececea"
  },
  elevation: {
    none: "none",
    sm: "0 1px 0 rgb(255 255 255 / 0.04), 0 1px 2px rgb(0 0 0 / 0.4)",
    md: "0 28px 70px -30px rgb(0 0 0 / 0.85), 0 2px 10px -4px rgb(0 0 0 / 0.6)"
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

export const lightPreset: TokenPreset = validateTokenPreset({
  id: "message-ai-light",
  name: "Message AI — Daylight",
  description:
    "Layered off-white companion to the cinematic dark prime: ink-on-paper hierarchy, deep-teal brand accent, faint paper grain, and the same Host Grotesk display rhythm.",
  ownership,
  dials: lightDials,
  color: {
    background: "#f4f6f5",
    foreground: "#14201f",
    muted: "#e6eae8",
    mutedForeground: "#4a5957",
    panel: "#ffffff",
    panelForeground: "#14201f",
    border: "#d7ddda",
    ring: "#175d5e",
    accent: "#175d5e",
    accentForeground: "#f4fbfa"
  },
  typography: {
    sans: fontSans,
    mono: fontMono,
    display: fontDisplay,
    scale: { ...typeScale },
    lineHeight: { tight: 1.02, body: 1.6 }
  },
  spacing: {
    density: "comfortable",
    unit: spacing.unit,
    control: spacing.control,
    section: spacing.section,
    container: spacing.container
  },
  radii: { ...radii },
  surface: {
    canvas: "#f4f6f5",
    panel: "#ffffff",
    panelRaised: "#fbfcfb",
    overlay: "#ffffff",
    inverse: "#14201f"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(20 32 31 / 0.05)",
    md: "0 24px 60px -32px rgb(20 32 31 / 0.22), 0 2px 8px -4px rgb(20 32 31 / 0.12)"
  },
  motion: {
    duration: motion.duration,
    durationFast: motion.durationFast,
    easing: motion.easing,
    intensity: 40
  },
  logos,
  handles,
  registry
});

/** Grain opacity per theme (brief §4: dark 0.03–0.07, light ≤0.03). */
export const grainOpacity = {
  dark: 0.05,
  light: 0.022
} as const;

export const themePresets = { dark: darkPreset, light: lightPreset } as const;
export type ThemeName = keyof typeof themePresets;
