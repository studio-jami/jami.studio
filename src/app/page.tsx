import Link from "next/link";
import Image from "next/image";
import { ConfigPanel } from "@/components/config-panel/config-panel";
import { ProjectCard } from "@/components/marketing/project-card";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { projectPath } from "@/lib/routes";

export default function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <p className="meta">{site.home.eyebrow}</p>
          <h1>{site.home.title}</h1>
          <p className="lead">{site.home.lead}</p>
          <div className="button-row">
            <Link className="button primary" href={site.home.primaryCta.href}>
              {site.home.primaryCta.label}
            </Link>
            <Link className="button secondary" href={site.home.secondaryCta.href}>
              {site.home.secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="hero-visual" aria-label="Studio project family map">
          <Image
            src="/visuals/direction-b/system-map.svg"
            alt="jami.studio project family social card"
            width={1200}
            height={630}
            priority
          />
          <div className="system-map">
            {projects.map((project, index) => (
              <Link key={project.slug} href={projectPath(project)}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{project.shortName}</strong>
                <small>{project.summary}</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section editorial-band" aria-labelledby="editorial-band-title">
        <div>
          <p className="meta">Research-led public hub</p>
          <h2 id="editorial-band-title">
            Publication-grade project narratives over source-owned data
          </h2>
        </div>
        <p>
          The site presents the Studio family as a public research hub: spacious sections, visible
          route provenance, and precise project briefs that keep implementation ownership outside
          the marketing repo.
        </p>
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="meta">Project family</p>
          <h2>One public hub, separate implementation surfaces</h2>
          <p>{site.home.proof}</p>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="section pillar-grid" aria-label="Studio foundation pillars">
        {site.home.pillars.map((pillar) => (
          <article key={pillar.title}>
            <h2>{pillar.title}</h2>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="section">
        <div className="section-heading">
          <p className="meta">Source boundaries</p>
          <h2>Designed for human and agent readers</h2>
        </div>
        <div className="detail-grid">
          {site.faqs.map((faq) => (
            <section key={faq.question}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </section>
          ))}
        </div>
      </section>

      <ConfigPanel />
    </>
  );
}
