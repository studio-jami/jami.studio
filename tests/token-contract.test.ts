import { describe, expect, it } from "vitest";
import { registryManifest } from "@/registry/manifest";
import { inlineCssVariables, tokenCssVariables } from "@/tokens/css-vars";
import {
  createTokenPresetFromDials,
  directionCCommandPreset,
  dialDefinitions,
  neutralFoundationDials,
  neutralFoundationPreset
} from "@/tokens/presets";
import { validateThemeDials, validateTokenPreset } from "@/tokens/schema";

describe("token foundation", () => {
  it("validates the shared token preset", () => {
    expect(validateTokenPreset(neutralFoundationPreset).id).toBe("neutral-foundation");
  });

  it("defines every supported dial with registry ownership metadata", () => {
    const dialIds = dialDefinitions.map((dial) => dial.id);

    expect(dialIds).toEqual([
      "accent",
      "contrast",
      "warmth",
      "density",
      "radius",
      "surfaceDepth",
      "motion"
    ]);
    expect(dialDefinitions.every((dial) => dial.owner === "branch")).toBe(true);
    expect(validateThemeDials(neutralFoundationDials).accent).toBe("cyan");
  });

  it("can generate a branch preset from dial values without changing the schema", () => {
    const branchPreset = createTokenPresetFromDials({
      ...neutralFoundationDials,
      accent: "violet",
      density: 82,
      radius: 6
    });

    expect(branchPreset.color.accent).not.toBe(neutralFoundationPreset.color.accent);
    expect(branchPreset.spacing.density).toBe("open");
    expect(validateTokenPreset(branchPreset).radii.md).toBe("6px");
  });

  it("emits shadcn-compatible CSS variable roles", () => {
    const vars = tokenCssVariables(neutralFoundationPreset);

    expect(vars["--background"]).toBeTruthy();
    expect(vars["--foreground"]).toBeTruthy();
    expect(vars["--card"]).toBeTruthy();
    expect(vars["--primary"]).toBe(vars["--accent"]);
    expect(vars["--accent"]).toBeTruthy();
    expect(vars["--radius-lg"]).toBe("8px");
    expect(inlineCssVariables(neutralFoundationPreset)).toContain("--radius-md");
  });

  it("marks the theme preset as a registry candidate", () => {
    expect(registryManifest.items[0]).toMatchObject({
      name: "@jami-studio/theme/neutral-foundation",
      candidate: true
    });
    expect(registryManifest.ownership.foundationOwned).toContain("token schema");
    expect(registryManifest.items[0]?.branchMutable).toContain("color");
  });

  it("registers the Direction C command-center preset as branch-owned theme output", () => {
    expect(validateTokenPreset(directionCCommandPreset).id).toBe("direction-c-command-center");
    expect(directionCCommandPreset.color.background).toBe("#0d1110");
    expect(directionCCommandPreset.registry.item).toBe(
      "@jami-studio/theme/direction-c-command-center"
    );
    expect(registryManifest.items.map((item) => item.name)).toContain(
      "@jami-studio/theme/direction-c-command-center"
    );
  });
});
