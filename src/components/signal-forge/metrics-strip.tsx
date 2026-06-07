type MetricsStripProps = {
  items: { label: string; value: string }[];
  className?: string;
};

export function MetricsStrip({ items, className }: MetricsStripProps) {
  return (
    <div className={className ?? "metrics-strip"} role="list" aria-label="Surface metrics">
      {items.map((item) => (
        <div key={item.label} className="metric-cell" role="listitem">
          <span className="metric-label">{item.label}</span>
          <strong className="metric-value">{item.value}</strong>
        </div>
      ))}
    </div>
  );
}