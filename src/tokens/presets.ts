import { validateTokenPreset, type TokenPreset } from "./schema";

export const neutralFoundationPreset = validateTokenPreset({
  id: "neutral-foundation",
  name: "Neutral Foundation",
  description: "A restrained foundation preset used before final design-direction selection.",
  dials: {
    accent: "cyan",
    contrast: 82,
    warmth: 34,
    density: 48,
    radius: 8,
    surfaceDepth: 42,
    motion: 36
  },
  color: {
    background: "#f7f5ef",
    foreground: "#111411",
    muted: "#5e655f",
    panel: "#ffffff",
    border: "#d7d2c6",
    accent: "#0f766e",
    accentForeground: "#f7fffb"
  },
  typography: {
    sans: "Inter, ui-sans-serif, system-ui, sans-serif",
    mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Consolas, monospace",
    display: "Inter Tight, Inter, ui-sans-serif, system-ui, sans-serif"
  },
  spacing: {
    density: "comfortable",
    section: "clamp(4rem, 8vw, 7rem)",
    container: "min(1120px, calc(100vw - 2rem))"
  },
  radii: {
    sm: "4px",
    md: "8px",
    lg: "8px"
  },
  motion: {
    duration: "180ms",
    easing: "cubic-bezier(.2,.8,.2,1)"
  },
  handles: {
    github: "studio-jami",
    npm: "@jami-studio"
  },
  registry: {
    item: "@jami-studio/theme/neutral-foundation",
    version: "0.1.0",
    candidate: true
  }
} satisfies TokenPreset);

export const tokenPresets = [neutralFoundationPreset] as const;
