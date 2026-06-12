"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties, ElementType, ReactNode } from "react";

/**
 * Gentle scroll-reveal. Fades/translates a block in once on enter. Honors
 * prefers-reduced-motion by skipping the animation entirely (CSS also forces the
 * final state). Animates transform/opacity only — no layout thrash.
 */
export function Reveal({
  children,
  as,
  className,
  delay = 0,
  style
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={{ ...style, transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
