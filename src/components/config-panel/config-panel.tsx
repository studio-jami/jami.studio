"use client";

import { useMemo, useState } from "react";
import type { CSSProperties } from "react";
import { TokenSwatch } from "@/components/system/token-swatch";
import { registryManifest } from "@/registry/manifest";
import { tokenCssVariables } from "@/tokens/css-vars";
import {
  createTokenPresetFromDials,
  dialDefinitions,
  neutralFoundationDials
} from "@/tokens/presets";
import type { Accent, ThemeDials } from "@/tokens/schema";

const panelTabs = ["Dials", "Tokens", "Registry"] as const;
type PanelTab = (typeof panelTabs)[number];

function formatDialValue(value: ThemeDials[keyof ThemeDials]) {
  return typeof value === "number" ? String(value) : value;
}

/**
 * Internal token-foundation inspector. Restyled into the lane's system, but the
 * tested behavior is preserved: every dial label + description renders, the
 * Tokens and Registry tab views exist, and the registry strings + ownership
 * lists stay intact (tests/config-panel.test.tsx). Driven by dialDefinitions.
 */
export function ConfigPanel() {
  const [activeTab, setActiveTab] = useState<PanelTab>("Dials");
  const [dials, setDials] = useState<ThemeDials>(neutralFoundationDials);
  const preset = useMemo(() => createTokenPresetFromDials(dials), [dials]);
  const cssVars = useMemo(() => tokenCssVariables(preset), [preset]);

  function updateDial<TKey extends keyof ThemeDials>(key: TKey, value: ThemeDials[TKey]) {
    setDials((current) => ({ ...current, [key]: value }));
  }

  return (
    <section
      className="config-panel"
      aria-labelledby="config-panel-title"
      style={cssVars as CSSProperties}
    >
      <div className="config-panel-sidebar">
        <p className="eyebrow">Internal token foundation</p>
        <h2 id="config-panel-title">Theme dials and registry seed</h2>
        <p className="config-panel-intro">
          Inspect the shared token contract without freezing a final marketing look. Design branches
          can change values while keeping the schema, metadata, and CSS variable pipeline.
        </p>
        <div className="panel-tabs" role="tablist" aria-label="Configuration panel views">
          {panelTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              aria-pressed={activeTab === tab}
              className={activeTab === tab ? "is-active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="config-panel-body">
        {activeTab === "Dials" && (
          <div className="dial-grid">
            {dialDefinitions.map((dial) => {
              const value = dials[dial.id];

              return (
                <label className="dial" key={dial.id}>
                  <span className="dial-label">
                    <strong>{dial.label}</strong>
                    <small>{dial.description}</small>
                  </span>
                  {dial.control === "select" ? (
                    <select
                      value={value as Accent}
                      onChange={(event) => updateDial(dial.id, event.target.value as Accent)}
                    >
                      {dial.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="dial-control">
                      <output>{formatDialValue(value)}</output>
                      <input
                        type="range"
                        min={dial.min}
                        max={dial.max}
                        step={dial.step}
                        value={value as number}
                        onChange={(event) => updateDial(dial.id, Number(event.target.value))}
                      />
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}

        {activeTab === "Tokens" && (
          <div className="token-grid">
            <TokenSwatch label="background" value={preset.color.background} />
            <TokenSwatch label="foreground" value={preset.color.foreground} />
            <TokenSwatch label="accent" value={preset.color.accent} />
            <TokenSwatch label="panel" value={preset.surface.panel} />
            <TokenSwatch label="border" value={preset.color.border} />
            <TokenSwatch label="radius md" value={preset.radii.md} kind="value" />
            <TokenSwatch label="control" value={preset.spacing.control} kind="value" />
            <TokenSwatch label="motion" value={preset.motion.duration} kind="value" />
          </div>
        )}

        {activeTab === "Registry" && (
          <div className="registry-stack">
            <div className="registry-note">
              <span>Registry item</span>
              <strong>{registryManifest.items[0]?.name}</strong>
            </div>
            <div className="registry-note">
              <span>Vocabulary</span>
              <strong>{registryManifest.vocabularyVersion}</strong>
            </div>
            <div className="ownership-grid">
              <div>
                <h3>Foundation-owned</h3>
                <ul>
                  {registryManifest.ownership.foundationOwned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3>Branch-owned</h3>
                <ul>
                  {registryManifest.ownership.branchOwned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
