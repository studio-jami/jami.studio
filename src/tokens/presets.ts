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

export const rerunAObsidianAtlasDials = validateThemeDials({
  accent: "amber",
  contrast: 88,
  warmth: 72,
  density: 52,
  radius: 10,
  surfaceDepth: 68,
  motion: 42
});

function obsidianPalette(warmth: number) {
  if (warmth > 66) {
    return {
      background: "#090b12",
      foreground: "#f4efe6",
      muted: "#1b2232",
      mutedForeground: "#a69b8c",
      panel: "#111a2c",
      panelRaised: "#162038",
      border: "#2e3a4e"
    };
  }

  return {
    background: "#080c14",
    foreground: "#f2ebe0",
    muted: "#1a2234",
    mutedForeground: "#9a9286",
    panel: "#10182a",
    panelRaised: "#141f34",
    border: "#2a3548"
  };
}

function champagneAccent(contrast: number) {
  const lift = clamp((contrast - 50) / 100, -0.2, 0.2);

  return {
    accent: lift > 0.05 ? "#d4b87a" : "#c9a962",
    accentForeground: "#14110a",
    ring: lift > 0.05 ? "#e0c992" : "#d4b87a"
  };
}

export function createObsidianAtlasPreset(dials: ThemeDials): TokenPreset {
  const validDials = validateThemeDials(dials);
  const neutral = obsidianPalette(validDials.warmth);
  const accent = champagneAccent(validDials.contrast);
  const contrastOffset = clamp((validDials.contrast - 50) / 100, -0.5, 0.5);
  const radius = clamp(validDials.radius, 0, 24);
  const density = densityName(validDials.density);
  const controlHeight = 2.5 + validDials.density / 100;
  const depthAlpha = validDials.surfaceDepth / 100;
  const motionDuration = Math.round(140 + validDials.motion * 2.4);

  return validateTokenPreset({
    id: "rerun-a-obsidian-atlas",
    name: "Obsidian Atlas",
    description:
      "Rerun A design direction: deep obsidian base, warm ivory type, and champagne-gold accent for editorial developer credibility.",
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
      mutedForeground: neutral.mutedForeground,
      panel: neutral.panel,
      panelForeground: neutral.foreground,
      border: neutral.border,
      ring: accent.ring,
      accent: accent.accent,
      accentForeground: accent.accentForeground
    },
    typography: {
      sans: "var(--font-sans-stack)",
      mono: "var(--font-mono-stack)",
      display: "var(--font-display-stack)",
      scale: {
        xs: "0.75rem",
        sm: "0.875rem",
        base: "1rem",
        lg: "1.125rem",
        xl: "1.375rem",
        hero: "clamp(3.25rem, 8vw, 6.5rem)"
      },
      lineHeight: {
        tight: 1.05,
        body: 1.62 + contrastOffset / 12
      }
    },
    spacing: {
      density,
      unit: density === "compact" ? "0.8rem" : density === "open" ? "1.3rem" : "1.1rem",
      control: `${controlHeight.toFixed(2)}rem`,
      section: `clamp(${density === "compact" ? 3.5 : 4.5}rem, 9vw, ${density === "open" ? 9 : 8}rem)`,
      container: "min(1200px, calc(100vw - 2.5rem))"
    },
    radii: {
      sm: rounded(radius / 2),
      md: rounded(radius),
      lg: rounded(Math.min(radius + 4, 16)),
      pill: "999px"
    },
    surface: {
      canvas: neutral.background,
      panel: neutral.panel,
      panelRaised: neutral.panelRaised,
      overlay: "#0d1424",
      inverse: neutral.foreground
    },
    elevation: {
      none: "none",
      sm: `0 1px 0 rgb(242 235 224 / ${(0.04 + depthAlpha * 0.03).toFixed(2)}), 0 8px 24px rgb(4 8 16 / ${(0.28 + depthAlpha * 0.12).toFixed(2)})`,
      md: `0 1px 0 rgb(242 235 224 / ${(0.06 + depthAlpha * 0.04).toFixed(2)}), 0 24px 64px rgb(4 8 16 / ${(0.42 + depthAlpha * 0.14).toFixed(2)})`
    },
    motion: {
      duration: `${motionDuration}ms`,
      durationFast: `${Math.max(100, motionDuration - 70)}ms`,
      easing: "cubic-bezier(.22,.68,.16,1)",
      intensity: validDials.motion
    },
    logos: {
      markShape: "frame",
      wordmark: "jami.studio",
      favicon: "/icon.svg"
    },
    handles: {
      github: "studio-jami",
      npm: "@jami-studio",
      x: "@jami_studio"
    },
    registry: {
      item: "@jami-studio/theme/rerun-a-obsidian-atlas",
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

export const rerunAObsidianAtlasPreset = createObsidianAtlasPreset(rerunAObsidianAtlasDials);
export const tokenPresets = [neutralFoundationPreset, rerunAObsidianAtlasPreset] as const;
