import Image from "next/image";
import type { StudioProject } from "@/content/projects";
import { projectGridImage } from "@/components/marketing/project-media";
import { SmartLink } from "@/components/ui/smart-link";

/**
 * Kirimo centerpiece #2 — the "Our Project" immersive grid. The five projects
 * reprised as an editorial photo mosaic (showcase frames + slide crops), a
 * deliberately different treatment from the slideshow: static tiles, mixed
 * spans, name/number plates pinned to each photo's lower edge.
 */
export function ProjectGrid({ projects }: { projects: StudioProject[] }) {
  return (
    <ul className="project-grid">
      {projects.map((project, index) => (
        <li key={project.slug} className={`project-grid__tile project-grid__tile--${index + 1}`}>
          <SmartLink href={project.route} className="project-grid__link">
            <span className="project-grid__media" aria-hidden="true">
              <Image
                src={projectGridImage[project.slug]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="project-grid__photo"
              />
            </span>
            <span className="project-grid__plate">
              <span className="project-grid__num" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="project-grid__name">{project.name}</span>
              <span className="project-grid__summary">{project.summary}</span>
            </span>
          </SmartLink>
        </li>
      ))}
    </ul>
  );
}
