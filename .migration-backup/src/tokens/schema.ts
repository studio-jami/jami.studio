import { z } from "zod";

const cssValueSchema = z.string().min(1);
const hexColorSchema = z.string().regex(/^#[0-9a-fA-F]{6}$/, "Expected a 6-digit hex color.");

export const tokenOwnerSchema = z.enum(["foundation", "branch"]);
export const accentSchema = z.enum(["cyan", "green", "amber", "rose", "violet"]);
const themeDialKeySchema = z.enum([
  "accent",
  "contrast",
  "warmth",
  "density",
  "radius",
  "surfaceDepth",
  "motion"
]);

export const themeDialSchema = z.object({
  accent: accentSchema,
  contrast: z.number().min(0).max(100),
  warmth: z.number().min(0).max(100),
  density: z.number().min(0).max(100),
  radius: z.number().min(0).max(24),
  surfaceDepth: z.number().min(0).max(100),
  motion: z.number().min(0).max(100)
});

export const dialDefinitionSchema = z.object({
  id: themeDialKeySchema,
  label: z.string().min(1),
  description: z.string().min(1),
  owner: tokenOwnerSchema,
  control: z.enum(["select", "slider"]),
  min: z.number().optional(),
  max: z.number().optional(),
  step: z.number().optional(),
  options: z.array(accentSchema).optional()
});

export const tokenPresetSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  ownership: z.object({
    foundationOwned: z.array(z.string().min(1)),
    branchOwned: z.array(z.string().min(1))
  }),
  dials: themeDialSchema,
  color: z.object({
    background: hexColorSchema,
    foreground: hexColorSchema,
    muted: hexColorSchema,
    mutedForeground: hexColorSchema,
    panel: hexColorSchema,
    panelForeground: hexColorSchema,
    border: hexColorSchema,
    ring: hexColorSchema,
    accent: hexColorSchema,
    accentForeground: hexColorSchema
  }),
  typography: z.object({
    sans: cssValueSchema,
    mono: cssValueSchema,
    display: cssValueSchema,
    scale: z.object({
      xs: cssValueSchema,
      sm: cssValueSchema,
      base: cssValueSchema,
      lg: cssValueSchema,
      xl: cssValueSchema,
      hero: cssValueSchema
    }),
    lineHeight: z.object({
      tight: z.number().min(0.8).max(2),
      body: z.number().min(1).max(2.2)
    })
  }),
  spacing: z.object({
    density: z.enum(["compact", "comfortable", "open"]),
    unit: cssValueSchema,
    control: cssValueSchema,
    section: cssValueSchema,
    container: cssValueSchema
  }),
  radii: z.object({
    sm: cssValueSchema,
    md: cssValueSchema,
    lg: cssValueSchema,
    pill: cssValueSchema
  }),
  surface: z.object({
    canvas: hexColorSchema,
    panel: hexColorSchema,
    panelRaised: hexColorSchema,
    overlay: hexColorSchema,
    inverse: hexColorSchema
  }),
  elevation: z.object({
    none: cssValueSchema,
    sm: cssValueSchema,
    md: cssValueSchema
  }),
  motion: z.object({
    duration: cssValueSchema,
    durationFast: cssValueSchema,
    easing: cssValueSchema,
    intensity: z.number().min(0).max(100)
  }),
  logos: z.object({
    markShape: z.enum(["dot", "monogram", "frame"]),
    wordmark: z.string().min(1),
    favicon: z.string().min(1)
  }),
  handles: z.object({
    github: z.string().min(1),
    npm: z.string().min(1),
    x: z.string().min(1)
  }),
  registry: z.object({
    item: z.string().min(1),
    version: z.string().min(1),
    candidate: z.boolean(),
    exports: z.array(z.string().min(1)),
    branchMutable: z.array(z.string().min(1))
  })
});

export type Accent = z.infer<typeof accentSchema>;
export type ThemeDials = z.infer<typeof themeDialSchema>;
export type DialDefinition = z.infer<typeof dialDefinitionSchema>;
export type TokenPreset = z.infer<typeof tokenPresetSchema>;

export function validateThemeDials(dials: ThemeDials): ThemeDials {
  return themeDialSchema.parse(dials);
}

export function validateDialDefinitions(definitions: DialDefinition[]): DialDefinition[] {
  return z.array(dialDefinitionSchema).parse(definitions);
}

export function validateTokenPreset(preset: TokenPreset): TokenPreset {
  return tokenPresetSchema.parse(preset);
}
