import Link from "next/link";
import type { Route } from "next";
import { Reveal } from "@/components/system/reveal";
import { projects, type StudioProject } from "@/content/projects";

/**
 * "Part of the Studio family" — sibling cross-links shown on a project detail page.
 * Links resolve through each project's route from the content layer.
 */
export function FamilyCrossLinks({ current }: { current: StudioProject }) {
  const siblings = projects.filter((project) => project.slug !== current.slug);

  return (
    <div className="family-links">
      <p className="family-links-label eyebrow">Part of the Studio family</p>
      <ul className="family-links-grid">
        {siblings.map((project, index) => (
          <Reveal as="li" key={project.slug} delay={index * 50}>
            <Link href={project.route as Route} className="family-link">
              <span className="family-link-name">{project.name}</span>
              <span className="family-link-summary">{project.summary}</span>
              <span className="family-link-arrow" aria-hidden="true">
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
