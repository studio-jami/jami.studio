import {
  validateThemeDials,
  validateTokenPreset,
  type ThemeDials,
  type TokenPreset
} from "./schema";
import { createTokenPresetFromDials } from "./presets";

/**
 * Nocturne — Grok design branch token values.
 * Dark, grainy, cinematic primary lane (owner favorite) with a considered light editorial counterpart.
 * Reuses the shared schema + generator machinery verbatim. Authors fresh values only.
 */

// Deep warm-leaning near-black canvas for Lane A. Not pure #000.
const NOCTURNE_DARK: ThemeDials = validateThemeDials({
  accent: "violet",
  contrast: 88,
  warmth: 22,
  density: 46,
  radius: 10,
  surfaceDepth: 38,
  motion: 32
});

// Slightly warmer, open editorial light for the paired theme.
const NOCTURNE_LIGHT: ThemeDials = validateThemeDials({
  accent: "violet",
  contrast: 78,
  warmth: 58,
  density: 52,
  radius: 10,
  surfaceDepth: 28,
  motion: 28
});

function createDarkNocturnePreset(): TokenPreset {
  const base = createTokenPresetFromDials(NOCTURNE_DARK);

  // Override surfaces for a rich, deep, warm charcoal canvas with barely-lifted panels.
  // Grain + subtle radial glow provide the separation instead of heavy shadows.
  return validateTokenPreset({
    ...base,
    id: "nocturne",
    name: "Nocturne",
    description: "Dark grainy cinematic lane with violet accent. Primary aesthetic for the Grok design branch.",
    color: {
      ...base.color,
      background: "#0c0c0f",
      foreground: "#f2f1ed",
      muted: "#1a1a20",
      mutedForeground: "#8c8a85",
      panel: "#141418",
      panelForeground: "#f2f1ed",
      border: "#2a2a32",
      ring: "#8b7ee6",
      accent: "#8b7ee6",
      accentForeground: "#f8f7ff"
    },
    surface: {
      canvas: "#0c0c0f",
      panel: "#141418",
      panelRaised: "#1a1a22",
      overlay: "#111114",
      inverse: "#f2f1ed"
    },
    elevation: {
      none: "none",
      sm: "0 1px 2px rgb(0 0 0 / 0.35)",
      md: "0 16px 48px rgb(0 0 0 / 0.45)"
    },
    typography: {
      ...base.typography,
      // Sharp geometric display for cinematic confidence. Geist is tech-credible and free.
      // Falls back gracefully if the Google import is unavailable.
      display: "var(--font-display)",
      sans: "var(--font-sans)",
      mono: "var(--font-mono)"
    },
    logos: {
      markShape: "frame",
      wordmark: "jami.studio",
      favicon: "/brand/logo-white.jpg"
    },
    registry: {
      ...base.registry,
      item: "@jami-studio/theme/nocturne",
      version: "0.2.0"
    }
  });
}

function createLightNocturnePreset(): TokenPreset {
  // Start from the generator for a clean warm editorial light, then tighten surfaces.
  const base = createTokenPresetFromDials(NOCTURNE_LIGHT);

  return validateTokenPreset({
    ...base,
    id: "nocturne-light",
    name: "Nocturne Light",
    description: "Clean warm editorial light counterpart to the Nocturne dark grainy lane.",
    color: {
      ...base.color,
      background: "#f7f5f0",
      foreground: "#14120f",
      muted: "#e9e4d9",
      mutedForeground: "#5f5a52",
      panel: "#fffcf6",
      panelForeground: "#14120f",
      border: "#d6cfc2",
      ring: "#6b61b0",
      accent: "#6156a6",
      accentForeground: "#fbf9ff"
    },
    surface: {
      canvas: "#f7f5f0",
      panel: "#fffcf6",
      panelRaised: "#ffffff",
      overlay: "#f4f0e7",
      inverse: "#14120f"
    },
    elevation: {
      none: "none",
      sm: "0 1px 1px rgb(20 18 15 / 0.06)",
      md: "0 12px 36px rgb(20 18 15 / 0.09)"
    },
    logos: {
      markShape: "frame",
      wordmark: "jami.studio",
      favicon: "/brand/logo-cream.jpg"
    },
    registry: {
      ...base.registry,
      item: "@jami-studio/theme/nocturne-light",
      version: "0.2.0"
    }
  });
}

export const nocturneDarkPreset = createDarkNocturnePreset();
export const nocturneLightPreset = createLightNocturnePreset();

export const nocturnePresets = {
  dark: nocturneDarkPreset,
  light: nocturneLightPreset
} as const;

export type ThemeName = keyof typeof nocturnePresets;

// Default to dark (our chosen primary lane).
export const defaultTheme: ThemeName = "dark";

export function getPreset(theme: ThemeName): TokenPreset {
  return nocturnePresets[theme];
}
