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
 * The registry vocabulary, live: the foundation token contract rendered as an
 * interactive specimen. Dials drive the shared preset generator; the output
 * vars are scoped to the specimen surface only.
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
    <section className="config-panel" aria-labelledby="config-panel-title">
      <div className="config-side">
        <p className="eyebrow">Foundation contract</p>
        <h3 id="config-panel-title" className="config-title">
          Theme dials and registry seed
        </h3>
        <p className="config-lead">
          Inspect the shared token contract without freezing a final marketing look. Design branches
          can change values while keeping the schema, metadata, and CSS variable pipeline.
        </p>
        <div className="panel-tabs" role="group" aria-label="Configuration panel views">
          {panelTabs.map((tab) => (
            <button
              type="button"
              key={tab}
              aria-pressed={activeTab === tab}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div className="config-body">
        {activeTab === "Dials" && (
          <div className="dial-grid">
            {dialDefinitions.map((dial) => {
              const value = dials[dial.id];

              return (
                <label className="dial" key={dial.id}>
                  <span className="dial-head">
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
                      <input
                        type="range"
                        min={dial.min}
                        max={dial.max}
                        step={dial.step}
                        value={value as number}
                        onChange={(event) => updateDial(dial.id, Number(event.target.value))}
                      />
                      <output>{formatDialValue(value)}</output>
                    </span>
                  )}
                </label>
              );
            })}
          </div>
        )}

        {activeTab === "Tokens" && (
          <div className="token-grid" style={cssVars as CSSProperties}>
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
              <span className="registry-key">Registry item</span>
              <strong>{registryManifest.items[0]?.name}</strong>
            </div>
            <div className="registry-note">
              <span className="registry-key">Vocabulary</span>
              <strong>{registryManifest.vocabularyVersion}</strong>
            </div>
            <div className="ownership-grid">
              <div className="ownership-col">
                <h4>Foundation-owned</h4>
                <ul>
                  {registryManifest.ownership.foundationOwned.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="ownership-col">
                <h4>Branch-owned</h4>
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
