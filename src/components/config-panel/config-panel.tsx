import { registryManifest } from "@/registry/manifest";
import { neutralFoundationPreset } from "@/tokens/presets";

export function ConfigPanel() {
  const preset = neutralFoundationPreset;

  return (
    <section className="config-panel" aria-labelledby="config-panel-title">
      <div>
        <p className="meta">Internal token foundation</p>
        <h2 id="config-panel-title">Theme dials and registry seed</h2>
        <p>
          The current site uses a neutral foundation preset. Design directions can replace values
          without changing the token schema, generated public files, or content model.
        </p>
      </div>
      <div className="dial-grid">
        {Object.entries(preset.dials).map(([name, value]) => (
          <div className="dial" key={name}>
            <span>{name}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="registry-note">
        <span>Registry item</span>
        <strong>{registryManifest.items[0]?.name}</strong>
      </div>
    </section>
  );
}
