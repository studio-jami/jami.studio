"use client";

import { useEffect } from "react";

/**
 * Progressive onInView reveal (fade + 20px rise), Synk's appear treatment.
 * Mounted once in the layout; observes every [data-reveal] element. The
 * hidden state only applies after JS marks the document ready
 * (html[data-reveal-ready]), so content is never hidden without JS, and
 * prefers-reduced-motion disables the transition entirely in CSS.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (reduced || targets.length === 0) {
      targets.forEach((el) => (el.dataset.reveal = "in"));
      return;
    }

    root.setAttribute("data-reveal-ready", "");
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.reveal = "in";
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    targets.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
      root.removeAttribute("data-reveal-ready");
    };
  }, []);

  return null;
}
