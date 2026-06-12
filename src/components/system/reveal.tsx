"use client";

import { useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Stagger delay in ms; applied as a CSS custom property. */
  delay?: number;
};

/**
 * Gentle scroll-reveal: fade + small translate-in once as the element enters the
 * viewport. Animates only `opacity`/`transform`. Under `prefers-reduced-motion` the
 * element renders in its final state immediately (handled in CSS via the media query),
 * so this never hides content from reduced-motion users or from the initial HTML.
 */
export function Reveal({ children, as: Tag = "div", className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Under reduced motion the CSS media query already forces the final state, so no
    // observer or state update is needed (and content is never hidden).
    if (
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true);
            observer.disconnect();
            break;
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
      ref={ref}
      className={["reveal", shown ? "is-visible" : null, className].filter(Boolean).join(" ")}
      style={delay ? ({ "--reveal-delay": `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </Tag>
  );
}
