import Link from "next/link";
import { ProjectCard } from "@/components/marketing/project-card";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <section className="section hero">
        <div className="container">
          <div className="hero-content">
            <span className="eyebrow">{site.home.eyebrow}</span>
            <h1 className="hero-heading">{site.home.title}</h1>
            <p className="lead">{site.home.lead}</p>
            <div className="button-group">
              <Link href={site.home.primaryCta.href} className="button primary">
                {site.home.primaryCta.label}
              </Link>
              <Link href={site.home.secondaryCta.href} className="button secondary">
                {site.home.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section pillars-band">
        <div className="container">
          <div className="grid-2">
            {site.home.pillars.map((pillar, index) => (
              <article key={pillar.title} className="pillar-panel">
                <span className="section-number">{(index + 1).toString().padStart(2, "0")}</span>
                <h2>{pillar.title}</h2>
                <p>{pillar.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section project-showcase">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Selected Work</h2>
            <p className="section-lead">The core products of the Studio ecosystem.</p>
          </div>
          <div className="grid-3">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </div>
      </section>

      <section className="section proof-band">
        <div className="container">
          <div className="proof-panel">
            <h2 className="section-title">Data-Driven Presentation</h2>
            <p className="section-lead">{site.home.proof}</p>
          </div>
        </div>
      </section>

      <section className="section faq-band">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Common Questions</h2>
          </div>
          <div className="faq-list">
            {site.faqs.map((faq, index) => (
              <details key={index} className="faq-item">
                <summary className="faq-question">
                  <span>{faq.question}</span>
                  <svg className="faq-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </summary>
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="section cta-band">
        <div className="container cta-panel">
          <h2 className="section-title">Explore the Studio</h2>
          <p className="section-lead">Discover the tools powering the next generation of agent-native products.</p>
          <div className="button-group">
            <Link href={site.home.primaryCta.href} className="button primary">
              {site.home.primaryCta.label}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
