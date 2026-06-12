/**
 * Faint full-height vertical column guide-lines — a recurring Noir signature threaded
 * through the hero, work grid, and proof band. Pure decoration: `aria-hidden`,
 * `pointer-events: none`, rendered as hairline rules at fixed column fractions. The number
 * of lines is a prop so different sections can frame their own column rhythm.
 */
export function GuideLines({ count = 4 }: { count?: number }) {
  const lines = Array.from({ length: count }, (_, i) => (i + 1) / (count + 1));

  return (
    <div className="guide-lines" aria-hidden="true">
      {lines.map((fraction) => (
        <span
          key={fraction}
          className="guide-line"
          style={{ left: `${(fraction * 100).toFixed(3)}%` }}
        />
      ))}
    </div>
  );
}
