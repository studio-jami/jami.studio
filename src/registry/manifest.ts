import { tokenPresets } from "@/tokens/presets";

export const registryManifest = {
  name: "jami.studio marketing foundation",
  description: "Registry-ready theme and marketing-section candidates seeded by the public site.",
  vocabularyVersion: "0.1.0",
  items: tokenPresets.map((preset) => ({
    name: preset.registry.item,
    version: preset.registry.version,
    type: "theme-preset",
    candidate: preset.registry.candidate
  })),
  candidateComponents: ["SiteHeader", "ProjectCard", "ProjectDetail", "ConfigPanel", "ProofBand"]
} as const;
