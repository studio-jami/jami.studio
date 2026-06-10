/**
 * The ASH & IRIS mark: a hairline frame holding a single point of light —
 * the registry's "frame" mark shape rendered in currentColor + accent.
 */
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      className={className ? `brand-mark ${className}` : "brand-mark"}
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      aria-hidden="true"
    >
      <rect
        x="3.25"
        y="3.25"
        width="17.5"
        height="17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.7"
      />
      <circle cx="12" cy="12" r="3" fill="var(--accent)" />
    </svg>
  );
}

/** Wordmark with the branch signature: roman root, italic-serif suffix. */
export function Wordmark({ text }: { text: string }) {
  const dotIndex = text.indexOf(".");
  if (dotIndex === -1) {
    return <span className="wordmark-text">{text}</span>;
  }

  return (
    <span className="wordmark-text">
      {text.slice(0, dotIndex)}
      <em className="wordmark-tail">{text.slice(dotIndex)}</em>
    </span>
  );
}
