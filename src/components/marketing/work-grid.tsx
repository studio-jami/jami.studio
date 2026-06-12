import Image from "next/image";
import Link from "next/link";
import { projects } from "@/content/projects";
import { Container } from "@/components/layout/container";
import { GuideLines } from "@/components/system/guide-lines";
import { projectArt } from "@/components/marketing/project-art";

/**
 * The centerpiece: Noir's asymmetric, hugely over-spaced work grid. Five photo tiles at
 * the template's positions — landscape top-left, tall portrait left, small square right
 * (offset down), big square center, wide landscape left — with 120–200px air between
 * rows, in-image project-name captions, and faint vertical guide-lines behind. Every
 * tile routes to /projects/[slug] through the content layer.
 */
export function WorkGrid() {
  return (
    <Container as="div" className="work-canvas-wrap">
      <GuideLines count={4} />
      <ol className="work-canvas">
        {projects.map((project, i) => {
          const art = projectArt[project.slug];
          return (
            <li key={project.slug} className={`work-tile-slot work-tile--${i + 1}`}>
              <Link
                href={project.route}
                className="work-tile"
                aria-label={`${project.name} — ${project.summary}`}
              >
                <Image
                  src={art.src}
                  alt=""
                  width={art.width}
                  height={art.height}
                  sizes="(max-width: 768px) 90vw, 60vw"
                  priority={i === 0}
                />
                <span className="work-tile-index" aria-hidden="true">
                  /{String(i + 1).padStart(2, "0")}
                </span>
                <span className="work-tile-caption">{project.shortName}</span>
              </Link>
            </li>
          );
        })}
      </ol>
    </Container>
  );
}
