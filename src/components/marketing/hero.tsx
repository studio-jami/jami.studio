"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ButtonLink } from "@/components/primitives/button";
import { site } from "@/content/site";

/**
 * Hero — Nouva's signature full-bleed cinematic moment: our generated dusk photograph
 * (`/assets/hero.png`) fills the viewport behind a centered white headline, under a dark
 * gradient scrim that fades into the void below. The headline reveals word-by-word with
 * a BLUR-UP transition. One primary CTA and a scroll indicator sit below.
 *
 * The headline text is plain in the static HTML (crawlers/agents/no-JS see it intact);
 * the per-word blur-up only applies after JS flags `.js-reveal-ready` and never under
 * reduced motion.
 */
function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    Boolean(window.matchMedia?.("(prefers-reduced-motion: reduce)").matches)
  );
}

export function Hero() {
  const ref = useRef<HTMLHeadingElement | null>(null);
  // Starts hidden to match the server render (no hydration mismatch). The effect flips it
  // on via a rAF callback — never a synchronous setState in the effect body — so the
  // blur-up plays after mount and reduced-motion just resolves to visible immediately.
  const [visible, setVisible] = useState(false);

  // The two-line headline; the second line is dimmed (Nouva's title-soft treatment).
  const line1 = site.home.eyebrow; // used as eyebrow tag below
  const titleLead = "One source.";
  const titleSoft = "Every surface, in sync.";

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Reduced motion: reveal immediately (deferred to a frame, not synchronously).
    if (prefersReducedMotion()) {
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const words = `${titleLead} ${titleSoft}`.split(" ");
  const softStartIndex = titleLead.split(" ").length;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-photo" aria-hidden="true">
        <Image src="/assets/hero.png" alt="" fill priority sizes="100vw" />
      </div>
      <div className="hero-scrim" aria-hidden="true" />

      <div className="hero-inner">
        <p className="eyebrow hero-eyebrow">{line1}</p>

        <h1
          id="hero-title"
          ref={ref}
          className={["hero-title", "blur-up", visible ? "is-visible" : null]
            .filter(Boolean)
            .join(" ")}
        >
          {words.map((word, index) => (
            <span
              key={`${word}-${index}`}
              className={["blur-word", index >= softStartIndex ? "title-soft" : null]
                .filter(Boolean)
                .join(" ")}
              style={{ "--word-delay": `${index * 90}ms` } as React.CSSProperties}
            >
              {word}
              {index < words.length - 1 ? " " : ""}
            </span>
          ))}
        </h1>

        <p className="hero-lead">{site.home.lead}</p>

        <div className="hero-actions">
          <ButtonLink href={site.home.primaryCta.href} variant="primary" size="lg">
            {site.home.primaryCta.label}
          </ButtonLink>
        </div>
      </div>

      <a className="scroll-indicator" href="#why-it-matters" aria-label="Scroll to content">
        <span className="scroll-indicator-mouse" aria-hidden="true" />
        <span>Scroll</span>
      </a>
    </section>
  );
}
