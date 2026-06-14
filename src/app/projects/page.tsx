import type { Metadata } from "next";
import Image from "next/image";
import { projects } from "@/content/projects";
import { createMetadata } from "@/lib/metadata";
import { ProjectViewBeacon } from "@/components/analytics/project-view-beacon";
import { Section } from "@/components/layout/section";
import { projectSlideImage } from "@/components/marketing/project-media";
import { Button } from "@/components/ui/button";
import { Divider } from "@/components/ui/divider";
import { Eyebrow } from "@/components/ui/eyebrow";
import { SectionHead } from "@/components/ui/section-head";
import { SmartLink } from "@/components/ui/smart-link";

export const metadata: Metadata = createMetadata({
  title: "Projects",
  description: "Project index for the Studio OSS family.",
  path: "/projects"
});

/**
 * `/projects` — an immersive gallery in Kirimo's idiom: numbered editorial
 * rows over hairlines, each split photo | vertical divider | text, with the
 * full-bleed photography pulled from our generated series.
 */
export default function ProjectsPage() {
  return (
    <>
      <ProjectViewBeacon view="index" />
      <Section size="hero" rule={false} aria-labelledby="projects-index-title">
        <SectionHead
          eyebrow="Project index"
          title="Five projects, one source."
          titleId="projects-index-title"
          level={1}
          lead="The Studio OSS family in build order — runtime, interface, coordination, knowledge, and society. Every page below is generated from the same shared records."
        />
      </Section>

      {projects.map((project, index) => (
        <Section key={project.slug} aria-labelledby={`${project.slug}-title`}>
          <article className={index % 2 === 1 ? "index-row index-row--flip" : "index-row"}>
            <SmartLink
              href={project.route}
              className="index-row__media"
              aria-label={`${project.name} — view project`}
            >
              <Image
                src={projectSlideImage[project.slug]}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="index-row__photo"
              />
            </SmartLink>

            <Divider vertical />

            <div className="index-row__body">
              <Eyebrow>{`${String(index + 1).padStart(2, "0")} / ${project.shortName}`}</Eyebrow>
              <h2 id={`${project.slug}-title`} className="index-row__title">
                <SmartLink href={project.route}>{project.name}</SmartLink>
              </h2>
              <p className="index-row__summary">{project.summary}</p>
              <p className="index-row__positioning">{project.positioning}</p>
              <Button href={project.route} variant="text">
                View project
              </Button>
            </div>
          </article>
        </Section>
      ))}
    </>
  );
}
