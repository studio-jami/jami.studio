"use client";

import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type ReactNode
} from "react";

/**
 * Gentle once-only scroll-reveal (fade + 14px translate). Fully gated by reduced-motion: the CSS in
 * globals.css forces the final state when `prefers-reduced-motion: reduce`, and this observer simply
 * adds `.is-visible` once. Content is present in the initial HTML regardless (static-first).
 */
export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className,
  style
}: {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Under reduced-motion the CSS forces the final state, so the observer is purely additive.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", visible ? "is-visible" : "", className].filter(Boolean).join(" ")}
      style={delay ? { ...style, transitionDelay: `${delay}ms` } : style}
    >
      {children}
    </Tag>
  );
}
