import { validateThemeDials, validateTokenPreset } from "./schema";
import type { ThemeDials, TokenPreset } from "./schema";

/**
 * Message AI lane — faithful template reproduction (run 4).
 *
 * Template-true palette: warm near-black `#0a0908` canvas, matte `#121212`
 * surfaces, white foreground, `#858585` muted, hairline borders (the template's
 * rgba(255,255,255,0.16) flattened onto the canvas as 6-digit hex), and the
 * lime `#e8ff9c` accent used sparingly — "neon through fog", never a fill.
 * Authored once as `color.accent` (dial slot `green`) and surfaced only through
 * `--accent`/`--primary` by `tokenCssVariables()`. Never a literal in a component.
 *
 * Type system from the real Message AI Framer template:
 *   display/headings → Host Grotesk · body → DM Sans · mono micro-labels →
 *   JetBrains Mono. Hero tops out at 56px desktop, −0.03em, sentence case.
 * Font CSS variables are injected by `next/font` in layout.tsx; the stacks
 * below reference those variables with robust system fallbacks.
 */

const fontDisplay =
  "var(--font-host-grotesk), 'Host Grotesk', ui-sans-serif, system-ui, sans-serif";
const fontSans = "var(--font-dm-sans), 'DM Sans', ui-sans-serif, system-ui, sans-serif";
const fontMono =
  "var(--font-jetbrains-mono), 'JetBrains Mono', ui-monospace, SFMono-Regular, Consolas, monospace";

const dialsBase: ThemeDials = validateThemeDials({
  accent: "green",
  contrast: 88,
  warmth: 64,
  density: 55,
  radius: 24,
  surfaceDepth: 40,
  motion: 35
});

// The single brand accent: template lime. On dark it reads as a glow; on light
// it shifts to a deep olive-lime so text/focus roles hold AA on paper.
const accentDark = "#e8ff9c"; // template lime — neon through fog
const accentForegroundDark = "#151800"; // near-black olive ink on the lime fill
const accentLight = "#4c5814"; // deep olive-lime, AA on the paper canvas
const accentForegroundLight = "#f4ffd0";

const typographyScale: TokenPreset["typography"]["scale"] = {
  xs: "0.8125rem",
  sm: "0.9375rem",
  base: "1rem",
  lg: "1.1875rem",
  xl: "clamp(1.875rem, 1.1rem + 2.2vw, 2.5rem)",
  hero: "clamp(2.625rem, 1.6rem + 3.6vw, 3.5rem)"
};

const spacing: TokenPreset["spacing"] = {
  density: "comfortable",
  unit: "1rem",
  control: "3rem",
  section: "clamp(4.5rem, 3.25rem + 4vw, 6rem)",
  container: "min(1200px, calc(100vw - 2.5rem))"
};

// Oversized 48px card radius is the template's signature surface treatment.
const radii: TokenPreset["radii"] = {
  sm: "12px",
  md: "20px",
  lg: "48px",
  pill: "999px"
};

const motion: TokenPreset["motion"] = {
  duration: "560ms",
  durationFast: "200ms",
  easing: "cubic-bezier(0.22, 0.61, 0.36, 1)",
  intensity: 35
};

const logos: TokenPreset["logos"] = {
  markShape: "dot",
  wordmark: "jami.studio",
  favicon: "/icon.svg"
};

const handles: TokenPreset["handles"] = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@studio_jami"
};

const ownership: TokenPreset["ownership"] = {
  foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
  branchOwned: ["dials", "colorValues", "typographyValues", "surfaceTreatment", "componentExpression"]
};

const registry: TokenPreset["registry"] = {
  item: "@jami-studio/theme/message-ai",
  version: "0.2.0",
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

function buildPreset(input: {
  id: string;
  name: string;
  description: string;
  dials: ThemeDials;
  color: TokenPreset["color"];
  surface: TokenPreset["surface"];
  elevation: TokenPreset["elevation"];
}): TokenPreset {
  return validateTokenPreset({
    id: input.id,
    name: input.name,
    description: input.description,
    ownership,
    dials: input.dials,
    color: input.color,
    typography: {
      sans: fontSans,
      mono: fontMono,
      display: fontDisplay,
      scale: typographyScale,
      lineHeight: {
        tight: 1.05,
        body: 1.6
      }
    },
    spacing,
    radii,
    surface: input.surface,
    elevation: input.elevation,
    motion,
    logos,
    handles,
    registry
  });
}

/**
 * Dark — the prime. Warm near-black canvas (#0a0908, never pure #000), matte
 * #121212 panels, white type, #858585 muted, hairline borders. Lime appears
 * only in micro-emphasis roles (dot, focus ring, one badge, real counts).
 */
export const messageAiDarkPreset: TokenPreset = buildPreset({
  id: "message-ai-dark",
  name: "Message AI — Nocturne",
  description:
    "Template-true cinematic dark preset for the Message AI lane: warm near-black canvas, matte #121212 cards, hairline borders, lime #e8ff9c as neon through fog.",
  dials: dialsBase,
  color: {
    background: "#0a0908",
    foreground: "#ffffff",
    muted: "#181715",
    mutedForeground: "#8a8a86",
    panel: "#121212",
    panelForeground: "#ffffff",
    border: "#313030",
    ring: accentDark,
    accent: accentDark,
    accentForeground: accentForegroundDark
  },
  surface: {
    canvas: "#0a0908",
    panel: "#121212",
    panelRaised: "#191917",
    overlay: "#201f1d",
    inverse: "#ffffff"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(0 0 0 / 0.5)",
    md: "0 32px 80px rgb(0 0 0 / 0.55)"
  }
});

/**
 * Light — a genuine warm-paper design, not an inversion: fog-white canvas,
 * white panels, warm ink, and the accent deepened to an olive-lime that holds
 * AA contrast. Photographic surfaces stay dark and melt into the paper canvas.
 */
export const messageAiLightPreset: TokenPreset = buildPreset({
  id: "message-ai-light",
  name: "Message AI — Daybreak",
  description:
    "Matched light preset for the Message AI lane: warm fog-white canvas, paper panels, deep olive-lime accent held to AA, photography melting into paper.",
  dials: validateThemeDials({ ...dialsBase, contrast: 80, surfaceDepth: 26 }),
  color: {
    background: "#f6f5f1",
    foreground: "#161512",
    muted: "#eceae3",
    mutedForeground: "#5d5b53",
    panel: "#ffffff",
    panelForeground: "#161512",
    border: "#dcdad1",
    ring: accentLight,
    accent: accentLight,
    accentForeground: accentForegroundLight
  },
  surface: {
    canvas: "#f6f5f1",
    panel: "#ffffff",
    panelRaised: "#fbfaf7",
    overlay: "#ffffff",
    inverse: "#161512"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(22 21 18 / 0.06)",
    md: "0 24px 60px rgb(22 21 18 / 0.12)"
  }
});

export const messageAiThemes = {
  dark: messageAiDarkPreset,
  light: messageAiLightPreset
} as const;

export type ThemeName = keyof typeof messageAiThemes;

/** Default theme rendered server-side before the client no-flash script runs. */
export const defaultThemeName: ThemeName = "dark";

/** Per-theme grain overlay tuning, consumed by globals.css via --grain-* vars. */
export const grainSettings: Record<ThemeName, { opacity: string; blendMode: string }> = {
  dark: { opacity: "0.06", blendMode: "soft-light" },
  light: { opacity: "0.028", blendMode: "multiply" }
};
