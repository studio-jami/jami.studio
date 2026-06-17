import type { ReactNode } from "react";

/**
 * Kirimo's marquee. Two identical halves animate `translateX(0 → -50%)` for a
 * seamless loop; the moving copy is `aria-hidden` and a static `.sr-only` label
 * carries the accessible text. CSS pauses the animation entirely under
 * `prefers-reduced-motion` (the first copy remains readable, simply static).
 *
 * - `wordmark` — the colossal 136px footer band ("JAMI STUDIO").
 * - `line`     — the honest content marquee (project names).
 */
export function TextTicker({
  children,
  label,
  size = "line",
  repeat = 4
}: {
  children: ReactNode;
  label: string;
  size?: "wordmark" | "line";
  repeat?: number;
}) {
  const half = Array.from({ length: repeat }, (_, index) => (
    <span className="ticker__item" key={index}>
      {children}
    </span>
  ));

  return (
    <div className={`ticker ticker--${size}`}>
      <span className="sr-only">{label}</span>
      <div className="ticker__track" aria-hidden="true">
        <div className="ticker__half">{half}</div>
        <div className="ticker__half">{half}</div>
      </div>
    </div>
  );
}
