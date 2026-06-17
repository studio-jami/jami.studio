import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { dialDefinitions } from "@/tokens/presets";

describe("ConfigPanel", () => {
  it("renders every dial from the shared token contract", () => {
    render(<ConfigPanel />);

    for (const dial of dialDefinitions) {
      expect(screen.getByText(dial.label)).toBeTruthy();
      expect(screen.getByText(dial.description)).toBeTruthy();
    }
  });

  it("switches between token output and registry ownership views", () => {
    render(<ConfigPanel />);

    fireEvent.click(screen.getByRole("button", { name: "Tokens" }));
    expect(screen.getByText("radius md")).toBeTruthy();
    expect(screen.getByText("motion")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Registry" }));
    expect(screen.getByText("@jami-studio/theme/neutral-foundation")).toBeTruthy();
    expect(screen.getByText("Foundation-owned")).toBeTruthy();
    expect(screen.getByText("Branch-owned")).toBeTruthy();
  });
});
