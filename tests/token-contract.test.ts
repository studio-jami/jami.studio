import { describe, expect, it } from "vitest";
import { registryManifest } from "@/registry/manifest";
import { inlineCssVariables, tokenCssVariables } from "@/tokens/css-vars";
import { neutralFoundationPreset } from "@/tokens/presets";
import { validateTokenPreset } from "@/tokens/schema";

describe("token foundation", () => {
  it("validates the shared token preset", () => {
    expect(validateTokenPreset(neutralFoundationPreset).id).toBe("neutral-foundation");
  });

  it("emits shadcn-compatible CSS variable roles", () => {
    const vars = tokenCssVariables(neutralFoundationPreset);

    expect(vars["--background"]).toBeTruthy();
    expect(vars["--foreground"]).toBeTruthy();
    expect(vars["--accent"]).toBeTruthy();
    expect(inlineCssVariables(neutralFoundationPreset)).toContain("--radius-md");
  });

  it("marks the theme preset as a registry candidate", () => {
    expect(registryManifest.items[0]).toMatchObject({
      name: "@jami-studio/theme/neutral-foundation",
      candidate: true
    });
  });
});
