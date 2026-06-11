import styles from "./token-swatch.module.css";

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
    <div className={styles.swatch}>
      {kind === "color" ? (
        <span className={styles.chip} style={{ backgroundColor: value }} aria-hidden="true" />
      ) : (
        <span className={[styles.chip, styles.valueChip].join(" ")} aria-hidden="true" />
      )}
      <span className={styles.label}>{label}</span>
      <code className={styles.value}>{value}</code>
    </div>
  );
}
