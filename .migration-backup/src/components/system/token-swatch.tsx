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
        <span className="token-swatch-chip" style={{ backgroundColor: value }} aria-hidden="true" />
      ) : (
        <span className="token-swatch-chip value-chip" aria-hidden="true" />
      )}
      <span>{label}</span>
      <code>{value}</code>
    </div>
  );
}
