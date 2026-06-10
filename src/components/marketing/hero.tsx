import Link from "next/link";
import { Atmosphere } from "@/components/layout/atmosphere";
import { ButtonLink } from "@/components/ui/button";
import { formatIndex } from "@/components/ui/section-heading";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/** Renders the wordmark-style title with the italic-serif suffix signature. */
function DisplayTitle({ text }: { text: string }) {
  const dotIndex = text.indexOf(".");
  if (dotIndex === -1) {
    return <>{text}</>;
  }

  return (
    <>
      {text.slice(0, dotIndex)}
      <em className="hero-title-tail">{text.slice(dotIndex)}</em>
    </>
  );
}

/**
 * The owner-grade opening moment: atmosphere + grain, oversized display serif,
 * one decisive CTA, and the studio index pinned to the hero's baseline.
 */
export function Hero() {
  return (
    <section className="hero" aria-label="Introduction">
      <Atmosphere variant="hero" />
      <div className="shell hero-inner">
        <p className="eyebrow hero-eyebrow">{site.home.eyebrow}</p>
        <h1 className="hero-title">
          <DisplayTitle text={site.home.title} />
        </h1>
        <p className="hero-lead">{site.home.lead}</p>
        <div className="hero-actions">
          <ButtonLink href={site.home.primaryCta.href} variant="primary">
            {site.home.primaryCta.label}
          </ButtonLink>
          <ButtonLink href={site.home.secondaryCta.href} variant="secondary">
            {site.home.secondaryCta.label}
          </ButtonLink>
        </div>
      </div>
      <nav className="hero-index" aria-label="Studio project index">
        <div className="shell hero-index-row">
          {projects.map((project, index) => (
            <Link key={project.slug} href={project.route} className="hero-index-item">
              <span className="hero-index-no">{formatIndex(index + 1)}</span>
              <span className="hero-index-name">{project.shortName}</span>
            </Link>
          ))}
        </div>
      </nav>
    </section>
  );
}
