"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger index — multiplies the base delay for ordered reveals. */
  index?: number;
  style?: CSSProperties;
};

type Phase = "idle" | "armed" | "shown";

/**
 * Once-only scroll reveal (gentle fade + 10px translate). Content is fully
 * present and visible in SSR / no-JS / reduced-motion (the element only hides
 * once JS has armed AND confirmed it can observe), so content is never buried.
 * Animates only opacity/transform; prefers-reduced-motion skips the hide entirely.
 */
export function Reveal({ children, as: Tag = "div", className, index = 0, style }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reduced-motion / no-observer / already-in-view: stay in the visible "idle"
    // state — no hide, no transition. Nothing to schedule.
    const rect = node.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (reduce || typeof IntersectionObserver === "undefined" || inView) {
      return;
    }

    let observer: IntersectionObserver | undefined;
    let fallback: number | undefined;

    // Defer arming to the next frame so first paint shows content (never buried),
    // then hide below-fold items and reveal them on scroll.
    const raf = window.requestAnimationFrame(() => {
      setPhase("armed");
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              setPhase("shown");
              observer?.disconnect();
            }
          }
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      observer.observe(node);
      // Safety net: never leave content stranded if the observer never fires.
      fallback = window.setTimeout(() => setPhase("shown"), 2000);
    });

    return () => {
      window.cancelAnimationFrame(raf);
      observer?.disconnect();
      if (fallback) window.clearTimeout(fallback);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      data-reveal={phase}
      className={["reveal", className].filter(Boolean).join(" ")}
      style={{ "--reveal-index": index, ...style } as CSSProperties}
    >
      {children}
    </Tag>
  );
}
