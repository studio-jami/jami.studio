export function TokenSwatch({
  label,
  value,
  kind = "color"
}: {
  label: string;
  value: string;
  kind?: "color" | "value";
}) {
  return (
    <div className="token-swatch">
      {kind === "color" ? (
        <span className="token-chip" style={{ backgroundColor: value }} aria-hidden="true" />
      ) : (
        <span className="token-chip token-chip--value" aria-hidden="true" />
      )}
      <span className="token-label">{label}</span>
      <code className="token-value">{value}</code>
    </div>
  );
}
