"use client";

import { useCallback, useEffect, useRef } from "react";
import type { StudioProject } from "@/content/projects";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";

/**
 * ProofSlideshow (template Testimonials) — the horizontal quote-card slideshow,
 * kept HONEST: each card carries one real proof point per product (verbatim
 * from `proofPoints[]`) instead of fabricated quotes. Cards mirror the
 * template's anatomy: quote on top, name + role row below, "n/total" counter.
 *
 * Native scroll-snap keeps it accessible (keyboard, touch, trackpad); the
 * prev/next buttons nudge one slide; a gentle auto-advance steps every few
 * seconds, pauses on hover/focus/interaction, and never runs under
 * prefers-reduced-motion.
 */
export function ProofSlideshow({ projects }: { projects: readonly StudioProject[] }) {
  const items = projects.map((project) => ({
    quote: project.proofPoints[0],
    name: project.name,
    role: "Design posture"
  }));
  const trackRef = useRef<HTMLUListElement | null>(null);
  const pausedRef = useRef(false);

  const nudge = useCallback((direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const first = track.querySelector<HTMLElement>(".slide");
    const step = first ? first.offsetWidth + 16 : track.clientWidth * 0.8;
    const max = track.scrollWidth - track.clientWidth;
    let left = track.scrollLeft + step * direction;
    if (direction === 1 && track.scrollLeft >= max - 8) left = 0;
    track.scrollTo({ left, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (!pausedRef.current) nudge(1);
    }, 6000);
    return () => window.clearInterval(id);
  }, [nudge]);

  const pause = () => {
    pausedRef.current = true;
  };
  const resume = () => {
    pausedRef.current = false;
  };

  return (
    <div
      className="slideshow proof-slideshow"
      onMouseEnter={pause}
      onMouseLeave={resume}
      onFocus={pause}
      onBlur={resume}
      onTouchStart={pause}
    >
      <div className="slideshow-edge slideshow-edge-left" aria-hidden="true" />
      <div className="slideshow-edge slideshow-edge-right" aria-hidden="true" />

      <ul className="slideshow-track" ref={trackRef}>
        {items.map((item, i) => (
          <li className="slide" key={item.name}>
            <figure className="proof-card">
              <blockquote className="proof-card-quote">{item.quote}</blockquote>
              <figcaption className="proof-card-meta">
                <span className="proof-card-source">
                  <strong>{item.name}</strong>
                  <span>{item.role}</span>
                </span>
                <span className="proof-card-count">
                  {i + 1}/{items.length}
                </span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <div className="slideshow-controls">
        <button
          type="button"
          className="slideshow-btn"
          aria-label="Previous proof point"
          onClick={() => nudge(-1)}
        >
          <ChevronLeftIcon size={18} />
        </button>
        <button
          type="button"
          className="slideshow-btn"
          aria-label="Next proof point"
          onClick={() => nudge(1)}
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
