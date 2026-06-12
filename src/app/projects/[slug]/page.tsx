import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/content/projects";
import { createMetadata, createProjectMetadata, projectJsonLd } from "@/lib/metadata";
import { projectLinkTargets } from "@/lib/routes";
import { Container } from "@/components/layout/container";
import { Section } from "@/components/layout/section";
import { DetailHero } from "@/components/detail/detail-hero";
import { ContentSection } from "@/components/detail/content-section";
import { Listing } from "@/components/detail/listing";
import { NextProject } from "@/components/detail/next-project";
import { CtaBand } from "@/components/marketing/cta-band";

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
 * `/projects/[slug]` — built to Kirimo's exported detail IA:
 *   Project Title → Portfolio Image → Content Section → Listing → Listing →
 *   Content Section → Listing (image) → Content Section → Image Section → Next.
 * Mapped to our project record. Static-params for all five slugs; per-project
 * metadata + conservative JSON-LD.
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
  const linkTargets = projectLinkTargets(project);

  return (
    <article className="project-detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Project Title */}
      <DetailHero project={project} index={index} />

      {/* Portfolio Image — atmospheric anchor using the project social image */}
      <section className="detail-figure" aria-hidden="true">
        <Container width="wide">
          <div className="detail-figure-frame">
            {/* eslint-disable-next-line @next/next/no-img-element -- decorative local SVG, no optimization needed */}
            <img
              src={project.socialImage}
              alt=""
              width={1200}
              height={630}
              className="detail-figure-image"
            />
            <span className="detail-figure-grain" />
          </div>
        </Container>
      </section>

      {/* Content Section — positioning */}
      <Section tone="canvas" size="tight" aria-labelledby="positioning-title">
        <ContentSection
          index="01"
          eyebrow="Positioning"
          title="What it is, in one move."
          titleId="positioning-title"
        >
          <p className="detail-prose">{project.positioning}</p>
        </ContentSection>
      </Section>

      {/* Listing — capabilities (numbered) + Listing — audience/links band */}
      <Section tone="panel" aria-labelledby="capabilities-title">
        <div className="detail-listing-pair">
          <Listing
            index="02"
            eyebrow="Capabilities"
            title="What it provides"
            items={project.capabilities}
            titleId="capabilities-title"
            numbered
          />
          <aside className="detail-links" aria-label={`${project.name} public links`}>
            <p className="detail-links-title">Public surface</p>
            <ul>
              {linkTargets.map((target) => (
                <li key={target.label}>
                  <a
                    href={target.href}
                    {...(/^https?:\/\//.test(target.href ?? "")
                      ? { target: "_blank", rel: "noreferrer noopener" }
                      : {})}
                  >
                    <span className="detail-links-label">{target.label}</span>
                    <span className="detail-links-value">{target.value}</span>
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </Section>

      {/* Content Section — audience */}
      <Section tone="canvas" size="tight" aria-labelledby="audience-title">
        <ContentSection
          index="03"
          eyebrow="Who it serves"
          title="The reader it is built for."
          titleId="audience-title"
        >
          <p className="detail-prose">{project.audience}</p>
        </ContentSection>
      </Section>

      {/* Listing — proof points (image/quote treatment, unnumbered) */}
      <Section tone="panel" aria-labelledby="proof-title">
        <Listing
          index="04"
          eyebrow="Why the boundary holds"
          title="Proof posture"
          items={project.proofPoints}
          titleId="proof-title"
          numbered={false}
        />
      </Section>

      {/* Content Section — agent-readable shape */}
      <Section tone="canvas" size="tight" aria-labelledby="agent-title">
        <ContentSection
          index="05"
          eyebrow="Agent-readable shape"
          title="How an agent sees it."
          titleId="agent-title"
        >
          <p className="detail-prose">{project.aiSummary}</p>
        </ContentSection>
      </Section>

      {/* Image Section / CTA band — repo / docs / live-surface */}
      <section className="section section-canvas section-tight" aria-labelledby="detail-cta-title">
        <Container width="wide">
          <CtaBand
            eyebrow={`Explore ${project.shortName}`}
            title={<span id="detail-cta-title">Go to the source.</span>}
            body={project.summary}
            actions={project.ctas.map((cta, ctaIndex) => ({
              label: cta.label,
              href: cta.href,
              variant: ctaIndex === 0 ? "primary" : "ghost"
            }))}
          />
        </Container>
      </section>

      {/* Next */}
      <Section tone="canvas" aria-labelledby="next-title" width="wide">
        <NextProject next={next} family={family} />
      </Section>
    </article>
  );
}
