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
  cyan: { accent: "#0f766e", accentForeground: "#f7fffb", ring: "#14b8a6", mutedForeground: "#4f635f" },
  green: { accent: "#34784f", accentForeground: "#f7fff8", ring: "#47a96b", mutedForeground: "#526153" },
  amber: { accent: "#9a6a16", accentForeground: "#fff9e8", ring: "#d69a22", mutedForeground: "#675c49" },
  rose: { accent: "#a33f5f", accentForeground: "#fff7fa", ring: "#d75f82", mutedForeground: "#67545a" },
  violet: { accent: "#6156a6", accentForeground: "#fbf9ff", ring: "#8b7ee6", mutedForeground: "#5d596b" }
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
  { id: "contrast", label: "Contrast", description: "Foreground, border, and muted-role separation.", owner: "branch", control: "slider", min: 0, max: 100, step: 1 },
  { id: "warmth", label: "Warmth", description: "Neutral surface temperature without deciding a final brand palette.", owner: "branch", control: "slider", min: 0, max: 100, step: 1 },
  { id: "density", label: "Density", description: "Spacing and control rhythm for compact or open branch directions.", owner: "branch", control: "slider", min: 0, max: 100, step: 1 },
  { id: "radius", label: "Radius", description: "Shared corner scale that keeps cards and controls within registry bounds.", owner: "branch", control: "slider", min: 0, max: 24, step: 1 },
  { id: "surfaceDepth", label: "Surface depth", description: "Panel, overlay, and elevation intensity.", owner: "branch", control: "slider", min: 0, max: 100, step: 1 },
  { id: "motion", label: "Motion", description: "Duration and feedback intensity for component states.", owner: "branch", control: "slider", min: 0, max: 100, step: 1 }
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
      favicon: "/icon.png"
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

const commonTypography = {
  sans: "var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  mono: "var(--font-jetbrains-mono), ui-monospace, SFMono-Regular, Consolas, monospace",
  display: "var(--font-inter-tight), var(--font-inter), ui-sans-serif, system-ui, sans-serif",
  scale: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.125rem",
    xl: "1.5rem",
    hero: "clamp(3.5rem, 9vw, 8rem)"
  },
  lineHeight: {
    tight: 0.95,
    body: 1.6
  }
};

const commonSpacing = {
  density: "comfortable" as const,
  unit: "1rem",
  control: "2.5rem",
  section: "clamp(4rem, 8vw, 8rem)",
  container: "min(1120px, calc(100vw - 2rem))"
};

const commonRadii = {
  sm: "4px",
  md: "8px",
  lg: "12px",
  pill: "999px"
};

const commonMotion = {
  duration: "300ms",
  durationFast: "150ms",
  easing: "cubic-bezier(0.2, 0.8, 0.2, 1)",
  intensity: 50
};

const commonLogos = {
  markShape: "dot" as const,
  wordmark: "jami.studio",
  favicon: "/icon.png"
};

const commonHandles = {
  github: "studio-jami",
  npm: "@jami-studio",
  x: "@jami_studio"
};

export const geminiDarkPreset: TokenPreset = validateTokenPreset({
  id: "gemini-dark",
  name: "Gemini Dark (Lane A)",
  description: "Cinematic, nocturnal, precise, and expensive.",
  ownership: { foundationOwned: [], branchOwned: ["all"] },
  dials: { accent: "cyan", contrast: 80, warmth: 20, density: 50, radius: 8, surfaceDepth: 50, motion: 50 },
  color: {
    background: "#0c0d10",
    foreground: "#f2f4f6",
    muted: "#171a21",
    mutedForeground: "#8690a0",
    panel: "#101217",
    panelForeground: "#f2f4f6",
    border: "#20242d",
    ring: "#14b8a6",
    accent: "#14b8a6",
    accentForeground: "#ffffff"
  },
  typography: commonTypography,
  spacing: commonSpacing,
  radii: commonRadii,
  surface: {
    canvas: "#0c0d10",
    panel: "#101217",
    panelRaised: "#15181e",
    overlay: "#1a1d24",
    inverse: "#f2f4f6"
  },
  elevation: {
    none: "none",
    sm: "0 2px 8px rgba(0,0,0,0.4)",
    md: "0 16px 40px rgba(0,0,0,0.6)"
  },
  motion: commonMotion,
  logos: commonLogos,
  handles: commonHandles,
  registry: {
    item: "@jami-studio/theme/gemini-dark",
    version: "0.1.0",
    candidate: true,
    exports: ["themePreset", "cssVariables"],
    branchMutable: ["all"]
  }
});

export const geminiLightPreset: TokenPreset = validateTokenPreset({
  id: "gemini-light",
  name: "Gemini Light (Lane B)",
  description: "Editorial, gallery, calm, sharp minimalism.",
  ownership: { foundationOwned: [], branchOwned: ["all"] },
  dials: { accent: "cyan", contrast: 80, warmth: 50, density: 50, radius: 8, surfaceDepth: 50, motion: 50 },
  color: {
    background: "#f7f7f5",
    foreground: "#111211",
    muted: "#e8e8e6",
    mutedForeground: "#6b6c6b",
    panel: "#ffffff",
    panelForeground: "#111211",
    border: "#dcdcd9",
    ring: "#0f766e",
    accent: "#0f766e",
    accentForeground: "#ffffff"
  },
  typography: commonTypography,
  spacing: commonSpacing,
  radii: commonRadii,
  surface: {
    canvas: "#f7f7f5",
    panel: "#ffffff",
    panelRaised: "#ffffff",
    overlay: "#ffffff",
    inverse: "#111211"
  },
  elevation: {
    none: "none",
    sm: "0 2px 8px rgba(0,0,0,0.04)",
    md: "0 16px 40px rgba(0,0,0,0.08)"
  },
  motion: commonMotion,
  logos: commonLogos,
  handles: commonHandles,
  registry: {
    item: "@jami-studio/theme/gemini-light",
    version: "0.1.0",
    candidate: true,
    exports: ["themePreset", "cssVariables"],
    branchMutable: ["all"]
  }
});

export const tokenPresets = [neutralFoundationPreset, geminiDarkPreset, geminiLightPreset] as const;
