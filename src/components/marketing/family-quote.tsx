"use client";

import { useState } from "react";
import { PixelHeart, PixelStair } from "@/components/system/pixel-icons";
import { projects } from "@/content/projects";

/**
 * Synk's testimonial block, honestly substituted: the big centered statement
 * is each product's REAL positioning line (its own words — no invented quotes
 * or people), and the five selector cards with pixel-heart icons are the five
 * products of the family. The active card's heart goes white; its name gains
 * the short underline, exactly like the template's selector row.
 */

const ROLE_BY_SLUG: Record<string, string> = {
  harness: "Runtime",
  registry: "Interface",
  orchestra: "Coordination",
  intercal: "Knowledge",
  collectiva: "Society"
};

export function FamilyQuote() {
  const [active, setActive] = useState(0);
  const current = projects[active];

  return (
    <div className="family-quote">
      <div className="quote-panel">
        <span className="px-stair tl" aria-hidden="true">
          <PixelStair />
        </span>
        <p className="quote-text" aria-live="polite">
          {current.positioning}
        </p>
        <span className="px-stair br" aria-hidden="true">
          <PixelStair />
        </span>
      </div>

      <div className="quote-strip">
        <span className="dot-gutter" aria-hidden="true" />
        {projects.map((project, index) => (
          <button
            key={project.slug}
            type="button"
            className="quote-card"
            aria-pressed={index === active}
            aria-label={`Show ${project.shortName} positioning (${ROLE_BY_SLUG[project.slug] ?? "Product"})`}
            onClick={() => setActive(index)}
          >
            <PixelHeart />
          </button>
        ))}
        <span className="dot-gutter" aria-hidden="true" />
      </div>

      <div className="quote-names" aria-hidden="true">
        {projects.map((project, index) => (
          <span
            key={project.slug}
            className="quote-name"
            data-active={index === active}
            style={{ "--col": index + 2 } as React.CSSProperties}
          >
            <strong>{project.shortName}</strong>
            <span>{ROLE_BY_SLUG[project.slug] ?? "Product"}</span>
            <span className="quote-underline" />
          </span>
        ))}
      </div>
    </div>
  );
}
