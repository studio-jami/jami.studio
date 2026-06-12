"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { StudioProject } from "@/content/projects";
import { ProjectCard } from "@/components/marketing/project-card";

type ProjectSliderProps = {
  projects: StudioProject[];
};

/**
 * Immersive project showcase — the Kirimo centerpiece. A manual, scroll-snap
 * slider (no autoplay): drag/scroll, prev/next controls, dot navigation, and
 * keyboard arrows. Smooth scrolling is gated behind `prefers-reduced-motion`
 * (handled in CSS via the snap container), so under reduced motion it jumps
 * instantly instead of animating. Content is fully present in the DOM for SSR.
 */
export function ProjectSlider({ projects }: ProjectSliderProps) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(index, projects.length - 1));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (slide) {
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
  }, [projects.length]);

  // Track which slide is centered as the user scrolls/drags the rail.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let nearest = 0;
        let nearestDistance = Infinity;
        Array.from(track.children).forEach((child, index) => {
          const slide = child as HTMLElement;
          const slideCenter = slide.offsetLeft - track.offsetLeft + slide.clientWidth / 2;
          const distance = Math.abs(slideCenter - center);
          if (distance < nearestDistance) {
            nearestDistance = distance;
            nearest = index;
          }
        });
        setActive(nearest);
      });
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      className="project-slider"
      role="group"
      aria-roledescription="carousel"
      aria-label="Studio projects showcase"
      onKeyDown={(event) => {
        if (event.key === "ArrowRight") {
          event.preventDefault();
          scrollToIndex(active + 1);
        } else if (event.key === "ArrowLeft") {
          event.preventDefault();
          scrollToIndex(active - 1);
        }
      }}
    >
      <ul className="project-slider-track" ref={trackRef}>
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="project-slide"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
          >
            <ProjectCard project={project} index={index} variant="slide" />
          </li>
        ))}
      </ul>

      <div className="project-slider-controls">
        <div className="project-slider-buttons">
          <button
            type="button"
            className="slider-btn"
            onClick={() => scrollToIndex(active - 1)}
            disabled={active === 0}
            aria-label="Previous project"
          >
            ←
          </button>
          <button
            type="button"
            className="slider-btn"
            onClick={() => scrollToIndex(active + 1)}
            disabled={active === projects.length - 1}
            aria-label="Next project"
          >
            →
          </button>
        </div>

        <ol className="project-slider-dots" aria-label="Choose a project">
          {projects.map((project, index) => (
            <li key={project.slug}>
              <button
                type="button"
                className={`slider-dot ${index === active ? "is-active" : ""}`}
                aria-label={`Go to ${project.name}`}
                aria-current={index === active ? "true" : undefined}
                onClick={() => scrollToIndex(index)}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
