import Link from "next/link";
import type { Route } from "next";
import { Eyebrow } from "@/components/primitives/section-heading";
import { projects, type StudioProject } from "@/content/projects";

/**
 * Family cross-links — "part of the Studio family" affordance on a project detail page.
 * Lists the other four products as charcoal Surface cards on the void, each linking to
 * its own case study. Honest cross-navigation, no fabricated relationships.
 */
export function FamilyCrossLinks({ current }: { current: StudioProject }) {
  const others = projects.filter((project) => project.slug !== current.slug);

  return (
    <>
      <Eyebrow>Part of the Studio family</Eyebrow>
      <div className="family-links-grid">
        {others.map((project) => (
          <Link key={project.slug} href={project.route as Route} className="family-link">
            <span className="family-link-arrow" aria-hidden="true">
              ↗
            </span>
            <span className="family-link-name">{project.name}</span>
            <span className="family-link-summary">{project.summary}</span>
          </Link>
        ))}
      </div>
    </>
  );
}
