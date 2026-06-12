"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** The real target value to count to. */
  value: number;
  /** Optional fixed decimal places (e.g. for "1.0"). */
  decimals?: number;
  durationMs?: number;
};

/**
 * Animated count-up that ticks a REAL number from 0 to `value` once it scrolls into
 * view. Under `prefers-reduced-motion` (or before JS runs) it renders the final value
 * immediately, so the honest count is always present in the static HTML — the animation
 * only ever enhances an already-correct number.
 */
export function CountUp({ value, decimals = 0, durationMs = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return; // keep the final value
    }

    let raf = 0;
    let start = 0;
    let done = false;

    const run = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(decimals)));
      if (progress < 1) {
        raf = requestAnimationFrame(run);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !done) {
            done = true;
            setDisplay(0);
            raf = requestAnimationFrame(run);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [value, decimals, durationMs]);

  return <span ref={ref}>{display.toFixed(decimals)}</span>;
}
