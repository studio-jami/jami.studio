import Link from "next/link";
import { Eyebrow } from "@/components/ui/eyebrow";
import type { StudioProject } from "@/content/projects";

type NextProjectProps = {
  next: StudioProject;
  /** The other family members for the cross-link rail. */
  family: StudioProject[];
};

/**
 * "Next" — the Kirimo detail closer. A large link to the next project in the
 * Studio family, plus a compact rail of the remaining siblings so the family stays
 * navigable. Reinforces "part of the Studio family".
 */
export function NextProject({ next, family }: NextProjectProps) {
  return (
    <section className="next-project" aria-labelledby="next-title">
      <div className="next-project-head">
        <Eyebrow>Part of the Studio family</Eyebrow>
        <h2 id="next-title" className="next-project-eyebrow">
          Next project
        </h2>
      </div>

      <Link href={next.route} className="next-project-link" aria-label={`Next: ${next.name}`}>
        <span className="next-project-name">{next.name}</span>
        <span className="next-project-summary">{next.summary}</span>
        <span className="next-project-arrow" aria-hidden="true">
          →
        </span>
      </Link>

      <ul className="next-project-rail">
        {family.map((project) => (
          <li key={project.slug}>
            <Link href={project.route}>{project.shortName}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
