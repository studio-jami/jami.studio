"use client";

import { useCallback, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import type { Route } from "next";
import { LinkButton } from "@/components/ui/primitives";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ImageIcon,
  MicIcon,
  PaperclipIcon,
  SparkIcon
} from "@/components/ui/icons";
import type { StudioProject } from "@/content/projects";

/**
 * UseCases (template Features 2 — the tabbed use-case slideshow) — Message AI's
 * signature sideways moment: a tab bar of paths, a big photographic panel with
 * a floating chat-style mockup, and a right rail with label, paragraph, and CTA.
 * Ours houses the five-project showcase: each tab is a Studio product, the
 * mockup quotes that product's real `aiSummary`, and the CTA resolves through
 * the content/route layer to `/projects/[slug]`.
 *
 * Static-first: every panel renders in the HTML (agents and no-JS readers see
 * all five); CSS hides inactive panels only once the client marks `html.js`.
 */
export function UseCases({ projects }: { projects: readonly StudioProject[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  const trackRef = useRef<HTMLDivElement | null>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const scrollToSlide = useCallback((index: number) => {
    const track = trackRef.current;
    const slide = track?.querySelector<HTMLElement>(`[data-slide-index="${index}"]`);
    setActive(index);
    slide?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, []);

  const onKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const last = projects.length - 1;
      let next: number | null = null;
      if (event.key === "ArrowRight") next = active === last ? 0 : active + 1;
      if (event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = last;
      if (next === null) return;
      event.preventDefault();
      scrollToSlide(next);
      tabRefs.current[next]?.focus();
    },
    [active, projects.length, scrollToSlide]
  );

  const nudge = useCallback(
    (direction: 1 | -1) => {
      const next =
        direction === 1
          ? active === projects.length - 1
            ? 0
            : active + 1
          : active === 0
            ? projects.length - 1
            : active - 1;
      scrollToSlide(next);
    },
    [active, projects.length, scrollToSlide]
  );

  return (
    <div className="usecase">
      <div
        className="usecase-tabs"
        role="tablist"
        aria-label="Studio products"
        onKeyDown={onKeyDown}
      >
        {projects.map((project, i) => (
          <button
            key={project.slug}
            ref={(node) => {
              tabRefs.current[i] = node;
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${project.slug}`}
            aria-selected={i === active}
            aria-controls={`${baseId}-panel-${project.slug}`}
            tabIndex={i === active ? 0 : -1}
            className="usecase-tab"
            onClick={() => scrollToSlide(i)}
          >
            {project.shortName}
          </button>
        ))}
      </div>

      <div className="usecase-carousel">
        <div className="slideshow-edge slideshow-edge-left" aria-hidden="true" />
        <div className="slideshow-edge slideshow-edge-right" aria-hidden="true" />
        <div
          className="usecase-track"
          ref={trackRef}
          aria-label="Studio project slideshow"
          onScroll={(event) => {
            const track = event.currentTarget;
            const width = track.querySelector<HTMLElement>(".usecase-panel")?.offsetWidth ?? 1;
            setActive(Math.round(track.scrollLeft / width));
          }}
        >
          {projects.map((project, i) => (
            <article
              key={project.slug}
              role="tabpanel"
              id={`${baseId}-panel-${project.slug}`}
              aria-labelledby={`${baseId}-tab-${project.slug}`}
              data-active={i === active}
              data-slide-index={i}
              className="usecase-panel"
            >
              <div className="usecase-media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/usecase.png" alt="" className="usecase-photo" />
                <div className="usecase-shade" aria-hidden="true" />
                <figure className="usecase-mock" aria-hidden="true">
                  <figcaption className="usecase-mock-head">
                    <span className="usecase-mock-avatar">
                      <SparkIcon size={13} />
                    </span>
                    <strong>jami.studio</strong>
                    <span className="usecase-mock-tag">{project.shortName}</span>
                  </figcaption>
                  <p className="usecase-mock-body">{project.aiSummary}</p>
                  <div className="usecase-mock-foot">
                    <PaperclipIcon size={14} />
                    <ImageIcon size={14} />
                    <MicIcon size={14} />
                  </div>
                </figure>
              </div>

              <div className="usecase-rail">
                <p className="usecase-rail-label">{project.shortName}</p>
                <h3 className="usecase-rail-title">{project.summary}</h3>
                <p className="usecase-rail-body">{project.positioning}</p>
                <LinkButton href={project.route as Route} variant="primary">
                  {project.ctas[0].label}
                </LinkButton>
              </div>
            </article>
          ))}
        </div>

        <div className="slideshow-controls usecase-controls">
          <button type="button" className="slideshow-btn" aria-label="Previous project" onClick={() => nudge(-1)}>
            <ChevronLeftIcon size={18} />
          </button>
          <button type="button" className="slideshow-btn" aria-label="Next project" onClick={() => nudge(1)}>
            <ChevronRightIcon size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
