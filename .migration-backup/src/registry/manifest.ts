import { dialDefinitions, tokenPresets } from "@/tokens/presets";

export const registryManifest = {
  name: "jami.studio marketing foundation",
  description: "Registry-ready theme and marketing-section candidates seeded by the public site.",
  vocabularyVersion: "0.1.0",
  ownership: {
    foundationOwned: [
      "token schema",
      "dial schema",
      "validation",
      "CSS variable export",
      "config panel",
      "registry metadata"
    ],
    branchOwned: [
      "token values",
      "visual treatment",
      "component styling",
      "homepage composition",
      "project-page composition"
    ]
  },
  dials: dialDefinitions.map((dial) => ({
    id: dial.id,
    label: dial.label,
    owner: dial.owner,
    control: dial.control
  })),
  items: tokenPresets.map((preset) => ({
    name: preset.registry.item,
    version: preset.registry.version,
    type: "theme-preset",
    candidate: preset.registry.candidate,
    exports: preset.registry.exports,
    branchMutable: preset.registry.branchMutable
  })),
  candidateComponents: ["SiteHeader", "ProjectCard", "ProjectDetail", "ConfigPanel", "ProofBand"]
} as const;
