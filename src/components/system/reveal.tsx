"use client";

import { useEffect } from "react";

/**
 * Scroll-reveal driver. Adds `.is-visible` to any `[data-reveal]` element once it
 * enters the viewport (one-shot, no re-trigger). Under reduced motion the CSS already
 * shows the final state, and we reveal everything immediately as a safety net.
 *
 * Rendered once near the root. Content is server-rendered and visible without JS
 * (the `.no-js` rule keeps it shown until hydration), so this only adds polish.
 */
export function Reveal() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduce || !("IntersectionObserver" in window)) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  return null;
}
