"use client";

import { useEffect, useRef, useState } from "react";

type CountUpProps = {
  /** The real target value to count to. */
  value: number;
  /** Optional prefix/suffix (e.g. "+", padded to two digits). */
  suffix?: string;
  /** Zero-pad to this many digits (e.g. 2 → "05"). */
  pad?: number;
  durationMs?: number;
};

/**
 * Animated count-up for the inverted Stats section. Counts from 0 to a REAL value once the
 * widget scrolls into view, then stops. Honors `prefers-reduced-motion` by rendering the
 * final value immediately (no animation). SSR-safe: renders the final value as text so the
 * number is correct without JS, then the effect re-animates on the client.
 */
export function CountUp({ value, suffix = "", pad = 0, durationMs = 1100 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced motion: leave the final value (already the initial state) untouched.
    if (prefersReduced) {
      return;
    }

    let frame = 0;
    let started = false;
    let startTime = 0;

    const animate = (now: number) => {
      if (!startTime) startTime = now;
      const t = Math.min(1, (now - startTime) / durationMs);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * value));
      if (t < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !started) {
            started = true;
            setDisplay(0);
            frame = requestAnimationFrame(animate);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [value, durationMs]);

  const text = pad > 0 ? String(display).padStart(pad, "0") : String(display);

  return (
    <span ref={ref} className="count-up">
      {text}
      {suffix}
    </span>
  );
}
