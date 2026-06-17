import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets } from "@/lib/routes";
import { ProjectViewBeacon } from "@/components/analytics/project-view-beacon";
import { Section } from "@/components/layout/section";
import { ContentSection } from "@/components/detail/content-section";
import { DetailHero } from "@/components/detail/detail-hero";
import { Listing } from "@/components/detail/listing";
import { NextProject } from "@/components/detail/next-project";
import { projectGridImage, projectSlideImage } from "@/components/marketing/project-media";
import { SmartLink } from "@/components/ui/smart-link";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return createMetadata({
      title: "Project not found",
      description: "No Studio project exists for this route.",
      path: `/projects/${slug}`
    });
  }

  return createProjectMetadata(project);
}

/**
 * `/projects/[slug]` — Kirimo's rich detail order, mapped to our records:
 * Project Title → Portfolio Image → Content (positioning) → Listing
 * (capabilities) → Listing (public surface) → Content (audience) → Listing
 * (proof points, quote rows) → Content (agent-readable shape) → Image Section
 * → Next. Heavy hairline/divider segmentation throughout.
 */
export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const index = projects.findIndex((entry) => entry.slug === project.slug);
  const next = projects[(index + 1) % projects.length];
  const family = projects.filter((entry) => entry.slug !== project.slug);
  const jsonLd = projectJsonLd(project);
  // Narrow optional hrefs (the API row is conditional in the frozen contract).
  const linkTargets = projectLinkTargets(project).flatMap((target) =>
    target.href ? [{ ...target, href: target.href }] : []
  );

  return (
    <article className="detail">
      <ProjectViewBeacon view={project.slug} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Project Title */}
      <Section size="hero" rule={false} aria-labelledby={`${project.slug}-detail-title`}>
        <DetailHero project={project} index={index} />
      </Section>

      {/* Portfolio Image — full-bleed editorial photography */}
      <Section bleed rule={false} aria-hidden="true" className="section--figure">
        <div className="detail-figure">
          <Image
            src={projectSlideImage[project.slug]}
            alt=""
            fill
            sizes="100vw"
            priority
            className="detail-figure__photo"
          />
        </div>
      </Section>

      {/* Content Section — positioning */}
      <Section aria-labelledby="positioning-title">
        <ContentSection
          num="01"
          eyebrow="Positioning"
          title="What it is, in one move"
          titleId="positioning-title"
        >
          <p className="detail-prose">{project.positioning}</p>
        </ContentSection>
      </Section>

      {/* Listing — capabilities */}
      <Section aria-labelledby="capabilities-title">
        <ContentSection
          num="02"
          eyebrow="Capabilities"
          title="What it provides"
          titleId="capabilities-title"
        >
          <Listing items={project.capabilities} />
        </ContentSection>
      </Section>

      {/* Listing — public surface (label | value rows) */}
      <Section aria-labelledby="surface-title">
        <ContentSection
          num="03"
          eyebrow="Public surface"
          title="Where it lives"
          titleId="surface-title"
        >
          <ul className="news-list news-list--compact">
            {linkTargets.map((target) => (
              <li key={target.label} className="news-list__row">
                <SmartLink href={target.href} className="news-list__link">
                  <span className="news-list__label">{target.label}</span>
                  <span className="news-list__title news-list__title--mono">{target.value}</span>
                  <span className="news-list__arrow btn__arrow" aria-hidden="true">
                    <svg viewBox="0 0 16 16" fill="none" focusable="false" aria-hidden="true">
                      <path
                        d="M4.5 11.5 11.5 4.5M11.5 4.5H5.8M11.5 4.5v5.7"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </ContentSection>
      </Section>

      {/* Content Section — audience */}
      <Section aria-labelledby="audience-title">
        <ContentSection
          num="04"
          eyebrow="Who it serves"
          title="The reader it is built for"
          titleId="audience-title"
        >
          <p className="detail-prose">{project.audience}</p>
        </ContentSection>
      </Section>

      {/* Listing — proof points, quote treatment */}
      <Section aria-labelledby="proof-title">
        <ContentSection
          num="05"
          eyebrow="Why the boundary holds"
          title="Design commitments"
          titleId="proof-title"
        >
          <Listing items={project.proofPoints} numbered={false} />
        </ContentSection>
      </Section>

      {/* Content Section — agent-readable shape */}
      <Section aria-labelledby="agent-title">
        <ContentSection
          num="06"
          eyebrow="Agent-readable shape"
          title="How an agent sees it"
          titleId="agent-title"
        >
          <p className="detail-prose">{project.aiSummary}</p>
        </ContentSection>
      </Section>

      {/* Image Section — second editorial frame */}
      <Section bleed rule={false} aria-hidden="true" className="section--figure">
        <div className="detail-figure detail-figure--short">
          <Image
            src={projectGridImage[project.slug]}
            alt=""
            fill
            sizes="100vw"
            className="detail-figure__photo"
          />
        </div>
      </Section>

      {/* Next */}
      <Section aria-label="Next project">
        <NextProject next={next} family={family} />
      </Section>
    </article>
  );
}
