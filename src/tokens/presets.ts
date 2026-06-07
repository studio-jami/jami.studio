import {
  validateDialDefinitions,
  validateThemeDials,
  validateTokenPreset,
  type Accent,
  type DialDefinition,
  type ThemeDials,
  type TokenPreset
} from "./schema";

const accentPalettes: Record<
  Accent,
  { accent: string; accentForeground: string; ring: string; mutedForeground: string }
> = {
  cyan: {
    accent: "#0f766e",
    accentForeground: "#f7fffb",
    ring: "#14b8a6",
    mutedForeground: "#4f635f"
  },
  green: {
    accent: "#34784f",
    accentForeground: "#f7fff8",
    ring: "#47a96b",
    mutedForeground: "#526153"
  },
  amber: {
    accent: "#9a6a16",
    accentForeground: "#fff9e8",
    ring: "#d69a22",
    mutedForeground: "#675c49"
  },
  rose: {
    accent: "#a33f5f",
    accentForeground: "#fff7fa",
    ring: "#d75f82",
    mutedForeground: "#67545a"
  },
  violet: {
    accent: "#6156a6",
    accentForeground: "#fbf9ff",
    ring: "#8b7ee6",
    mutedForeground: "#5d596b"
  }
};

export const dialDefinitions = validateDialDefinitions([
  {
    id: "accent",
    label: "Accent",
    description: "Branch-selected accent family used for interactive and emphasis roles.",
    owner: "branch",
    control: "select",
    options: ["cyan", "green", "amber", "rose", "violet"]
  },
  {
    id: "contrast",
    label: "Contrast",
    description: "Foreground, border, and muted-role separation.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 100,
    step: 1
  },
  {
    id: "warmth",
    label: "Warmth",
    description: "Neutral surface temperature without deciding a final brand palette.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 100,
    step: 1
  },
  {
    id: "density",
    label: "Density",
    description: "Spacing and control rhythm for compact or open branch directions.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 100,
    step: 1
  },
  {
    id: "radius",
    label: "Radius",
    description: "Shared corner scale that keeps cards and controls within registry bounds.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 24,
    step: 1
  },
  {
    id: "surfaceDepth",
    label: "Surface depth",
    description: "Panel, overlay, and elevation intensity.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 100,
    step: 1
  },
  {
    id: "motion",
    label: "Motion",
    description: "Duration and feedback intensity for component states.",
    owner: "branch",
    control: "slider",
    min: 0,
    max: 100,
    step: 1
  }
] satisfies DialDefinition[]);

export const neutralFoundationDials = validateThemeDials({
  accent: "cyan",
  contrast: 82,
  warmth: 34,
  density: 48,
  radius: 8,
  surfaceDepth: 42,
  motion: 36
});

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rounded(value: number) {
  return `${Math.round(value)}px`;
}

function densityName(density: number): TokenPreset["spacing"]["density"] {
  if (density < 34) return "compact";
  if (density > 66) return "open";
  return "comfortable";
}

function neutralByWarmth(warmth: number) {
  if (warmth < 34) {
    return {
      background: "#f5f7f8",
      foreground: "#101417",
      muted: "#e4eaec",
      panel: "#ffffff",
      panelRaised: "#fbfdff",
      border: "#d2dce0"
    };
  }

  if (warmth > 66) {
    return {
      background: "#f7f4ed",
      foreground: "#14120f",
      muted: "#ebe4d8",
      panel: "#fffdf8",
      panelRaised: "#ffffff",
      border: "#d8d0c1"
    };
  }

  return {
    background: "#f6f6f3",
    foreground: "#121411",
    muted: "#e8e8e1",
    panel: "#ffffff",
    panelRaised: "#fbfbf7",
    border: "#d8d9d1"
  };
}

export function createTokenPresetFromDials(dials: ThemeDials): TokenPreset {
  const validDials = validateThemeDials(dials);
  const palette = accentPalettes[validDials.accent];
  const neutral = neutralByWarmth(validDials.warmth);
  const contrastOffset = clamp((validDials.contrast - 50) / 100, -0.5, 0.5);
  const radius = clamp(validDials.radius, 0, 24);
  const density = densityName(validDials.density);
  const controlHeight = 2.25 + validDials.density / 100;
  const depthAlpha = validDials.surfaceDepth / 100;
  const motionDuration = Math.round(120 + validDials.motion * 2.2);

  return validateTokenPreset({
    id: "neutral-foundation",
    name: "Neutral Foundation",
    description: "A restrained foundation preset used before final design-direction selection.",
    ownership: {
      foundationOwned: ["schema", "validation", "cssVariables", "registryMetadata", "configPanel"],
      branchOwned: [
        "dials",
        "colorValues",
        "typographyValues",
        "surfaceTreatment",
        "componentExpression"
      ]
    },
    dials: validDials,
    color: {
      background: neutral.background,
      foreground: neutral.foreground,
      muted: neutral.muted,
      mutedForeground: palette.mutedForeground,
      panel: neutral.panel,
      panelForeground: neutral.foreground,
      border: neutral.border,
      ring: palette.ring,
      accent: palette.accent,
      accentForeground: palette.accentForeground
    },
    typography: {
      sans: "Inter, ui-sans-serif, system-ui, sans-serif",
      mono: "JetBrains Mono, ui-monospace, SFMono-Regular, Consolas, monospace",
      display: "Inter Tight, Inter, ui-sans-serif, system-ui, sans-serif",
      scale: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.5rem",
        hero: "clamp(3rem, 9vw, 8rem)"
      },
      lineHeight: {
        tight: 1,
        body: 1.58 + contrastOffset / 10
      }
    },
    spacing: {
      density,
      unit: density === "compact" ? "0.75rem" : density === "open" ? "1.25rem" : "1rem",
      control: `${controlHeight.toFixed(2)}rem`,
      section: `clamp(${density === "compact" ? 3 : 4}rem, 8vw, ${density === "open" ? 8 : 7}rem)`,
      container: "min(1120px, calc(100vw - 2rem))"
    },
    radii: {
      sm: rounded(radius / 2),
      md: rounded(radius),
      lg: rounded(Math.min(radius + 2, 8)),
      pill: "999px"
    },
    surface: {
      canvas: neutral.background,
      panel: neutral.panel,
      panelRaised: neutral.panelRaised,
      overlay: neutral.panel,
      inverse: neutral.foreground
    },
    elevation: {
      none: "none",
      sm: `0 1px 2px rgb(17 20 17 / ${(0.04 + depthAlpha * 0.04).toFixed(2)})`,
      md: `0 16px 40px rgb(17 20 17 / ${(0.06 + depthAlpha * 0.08).toFixed(2)})`
    },
    motion: {
      duration: `${motionDuration}ms`,
      durationFast: `${Math.max(90, motionDuration - 80)}ms`,
      easing: "cubic-bezier(.2,.8,.2,1)",
      intensity: validDials.motion
    },
    logos: {
      markShape: "dot",
      wordmark: "jami.studio",
      favicon: "/icon.svg"
    },
    handles: {
      github: "studio-jami",
      npm: "@jami-studio",
      x: "@jami_studio"
    },
    registry: {
      item: "@jami-studio/theme/neutral-foundation",
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
    }
  });
}

export const neutralFoundationPreset = createTokenPresetFromDials(neutralFoundationDials);

export const luminousGridDials = validateThemeDials({
  accent: "violet",
  contrast: 88,
  warmth: 22,
  density: 52,
  radius: 11,
  surfaceDepth: 58,
  motion: 42
});

const luminousGridBasePreset = createTokenPresetFromDials(luminousGridDials);

export const luminousGridPreset = validateTokenPreset({
  ...luminousGridBasePreset,
  id: "luminous-grid",
  name: "Luminous Grid",
  description:
    "A premium light-mode preset with crisp surfaces, deep slate type, and electric cobalt accents.",
  color: {
    background: "#f8fafc",
    foreground: "#0f172a",
    muted: "#e2e8f0",
    mutedForeground: "#64748b",
    panel: "#ffffff",
    panelForeground: "#0f172a",
    border: "#e2e8f0",
    ring: "#3b82f6",
    accent: "#2563eb",
    accentForeground: "#ffffff"
  },
  typography: {
    ...luminousGridBasePreset.typography,
    sans: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    display: "var(--font-plus-jakarta), ui-sans-serif, system-ui, sans-serif",
    mono: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Consolas, monospace",
    scale: {
      ...luminousGridBasePreset.typography.scale,
      hero: "clamp(3.25rem, 8.5vw, 5.75rem)"
    },
    lineHeight: {
      tight: 1.02,
      body: 1.62
    }
  },
  spacing: {
    ...luminousGridBasePreset.spacing,
    density: "comfortable",
    unit: "1rem",
    control: "2.75rem",
    section: "clamp(4.5rem, 9vw, 7.5rem)",
    container: "min(1200px, calc(100vw - 2.5rem))"
  },
  radii: {
    sm: "6px",
    md: "10px",
    lg: "12px",
    pill: "999px"
  },
  surface: {
    canvas: "#f8fafc",
    panel: "#ffffff",
    panelRaised: "#ffffff",
    overlay: "#ffffff",
    inverse: "#0f172a"
  },
  elevation: {
    none: "none",
    sm: "0 1px 2px rgb(15 23 42 / 0.04), 0 1px 3px rgb(15 23 42 / 0.06)",
    md: "0 4px 6px rgb(15 23 42 / 0.04), 0 12px 32px rgb(15 23 42 / 0.08)"
  },
  motion: {
    duration: "200ms",
    durationFast: "120ms",
    easing: "cubic-bezier(0.16, 1, 0.3, 1)",
    intensity: 42
  },
  logos: {
    ...luminousGridBasePreset.logos,
    markShape: "frame"
  },
  registry: {
    ...luminousGridBasePreset.registry,
    item: "@jami-studio/theme/luminous-grid",
    branchMutable: [
      "dials",
      "color",
      "typography",
      "spacing",
      "radii",
      "surface",
      "elevation",
      "motion",
      "componentExpression",
      "pageComposition"
    ]
  }
});

export const tokenPresets = [neutralFoundationPreset, luminousGridPreset] as const;
