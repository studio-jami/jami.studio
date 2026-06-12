"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import type { StudioProject } from "@/content/projects";
import { projectSlideImage } from "@/components/marketing/project-media";
import { Button } from "@/components/ui/button";

const INTERVAL_MS = 4200;

/**
 * Kirimo centerpiece #1 — the auto-play project slideshow under the hero.
 * One full-bleed photographic slide visible at a time (~4.2s interval, spring
 * transition), arrow controls plus a slide counter, project name/summary/CTA
 * overlaid bottom-left. Autoplay pauses on hover, focus, hidden tab, and
 * `prefers-reduced-motion` (where the CSS transition also collapses to a cut).
 * Inactive slides are `inert` so only the visible slide is focusable.
 */
export function ProjectSlideshow({ projects }: { projects: StudioProject[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const count = projects.length;

  const goTo = useCallback(
    (index: number) => {
      setActive(((index % count) + count) % count);
    },
    [count]
  );

  // Respect prefers-reduced-motion: never auto-advance.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  // Auto-play loop — also stops while the document is hidden.
  useEffect(() => {
    if (paused || reduced) return;

    const tick = () => {
      if (!document.hidden) {
        setActive((current) => (current + 1) % count);
      }
    };
    const id = window.setInterval(tick, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [paused, reduced, count]);

  return (
    <div
      ref={rootRef}
      className="slideshow"
      role="group"
      aria-roledescription="carousel"
      aria-label="Project slideshow"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(event) => {
        if (!rootRef.current?.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <ul className="slideshow__viewport">
        {projects.map((project, index) => {
          const isActive = index === active;

          return (
            <li
              key={project.slug}
              className={isActive ? "slide is-active" : "slide"}
              aria-roledescription="slide"
              aria-label={`${index + 1} of ${count}: ${project.name}`}
              aria-hidden={!isActive}
              inert={!isActive}
            >
              <Image
                src={projectSlideImage[project.slug]}
                alt=""
                fill
                sizes="100vw"
                priority={index === 0}
                className="slide__photo"
              />
              <span className="slide__scrim" aria-hidden="true" />
              <div className="container slide__frame">
                <div className="slide__content">
                  <p className="slide__index">
                    {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
                  </p>
                  <h3 className="slide__title">{project.name}</h3>
                  <p className="slide__summary">{project.summary}</p>
                  <Button href={project.route} variant="text" className="slide__cta">
                    View project
                  </Button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="container slideshow__controls-frame">
        <div className="slideshow__controls">
          <button
            type="button"
            className="slideshow__arrow"
            onClick={() => goTo(active - 1)}
            aria-label="Previous slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M14.5 5.5 8 12l6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <p className="slideshow__count" aria-live="polite">
            {String(active + 1).padStart(2, "0")}
            <span aria-hidden="true"> / </span>
            {String(count).padStart(2, "0")}
          </p>
          <button
            type="button"
            className="slideshow__arrow"
            onClick={() => goTo(active + 1)}
            aria-label="Next slide"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
              <path
                d="M9.5 5.5 16 12l-6.5 6.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
