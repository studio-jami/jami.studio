/** The Studio mark: a precise concentric frame (the "atlas" ring) over canvas. */
export function BrandMark({ size = 26 }: { size?: number }) {
  return (
    <svg
      className="brand-mark"
      width={size}
      height={size}
      viewBox="0 0 32 32"
      role="img"
      aria-label="jami.studio mark"
    >
      <rect x="1" y="1" width="30" height="30" rx="9" className="brand-mark-frame" />
      <circle cx="16" cy="16" r="9.5" className="brand-mark-ring" />
      <circle cx="16" cy="16" r="3.4" className="brand-mark-core" />
    </svg>
  );
}
