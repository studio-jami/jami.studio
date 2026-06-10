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

// Both Nocturne themes set type in Geist via the next/font loader variables
// (--font-geist-*), with resilient generic fallbacks if the loader is absent.
const NOCTURNE_SANS_STACK = "var(--font-geist-sans, ui-sans-serif), system-ui, sans-serif";
const NOCTURNE_MONO_STACK =
  "var(--font-geist-mono, ui-monospace), SFMono-Regular, Consolas, monospace";
const NOCTURNE_DISPLAY_STACK = "var(--font-geist-display, ui-sans-serif), system-ui, sans-serif";

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
      // Dark ink on the lavender accent: 6.7:1 on #8b7ee6. The previous
      // near-white (#f8f7ff) measured 3.17:1 — an AA failure for the bold
      // 14px primary-button label, which is the only consumer of this role.
      accentForeground: "#0c0c0f"
    },
    spacing: {
      ...base.spacing,
      // 44px controls (tap-target floor); the density dial yielded 43.4px.
      control: "2.75rem"
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
      // References the next/font loader variables (set on <html> by layout.tsx) —
      // NOT the token role vars themselves, which would self-reference and
      // invalidate the whole font stack (UA Times fallback).
      display: NOCTURNE_DISPLAY_STACK,
      sans: NOCTURNE_SANS_STACK,
      mono: NOCTURNE_MONO_STACK
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
    typography: {
      ...base.typography,
      // Same Geist stacks as the dark lane — the base preset's Inter literal
      // never loads (no Inter webfont is shipped) and would silently fall back.
      display: NOCTURNE_DISPLAY_STACK,
      sans: NOCTURNE_SANS_STACK,
      mono: NOCTURNE_MONO_STACK
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
