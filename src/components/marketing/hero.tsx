import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/**
 * Home hero — the owner-grade moment. Oversized display title, eyebrow kicker,
 * lead, primary + secondary CTA (hrefs from the content layer). The atmosphere
 * slot is a systematized "global variable" board: the five projects rendered as
 * swappable rows over a hairline grid — Synk's swap-anything discipline made
 * visible, in our light editorial system.
 */
export function Hero() {
  const { home } = site;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-grid-bg" aria-hidden="true" />
      <Container className="hero-inner">
        <div className="hero-copy">
          <Eyebrow>{home.eyebrow}</Eyebrow>
          <h1 id="hero-title" className="hero-title">
            One public hub for an{" "}
            <span className="hero-accent">agent-native</span> product family.
          </h1>
          <p className="hero-lead">{home.lead}</p>
          <div className="button-row">
            <Button href={home.primaryCta.href} variant="primary" size="lg">
              {home.primaryCta.label}
            </Button>
            <Button href={home.secondaryCta.href} variant="secondary" size="lg">
              {home.secondaryCta.label}
            </Button>
          </div>
          <dl className="hero-meta">
            <div>
              <dt>Open core</dt>
              <dd>Five products, one foundation</dd>
            </div>
            <div>
              <dt>Token-driven</dt>
              <dd>Every surface from shared variables</dd>
            </div>
            <div>
              <dt>Agent-readable</dt>
              <dd>Generated metadata &amp; AI source</dd>
            </div>
          </dl>
        </div>

        <aside className="hero-board" aria-label="Studio project family">
          <div className="hero-board-head">
            <span className="hero-board-dot" aria-hidden="true" />
            <span>project.family</span>
            <span className="hero-board-count">{projects.length}</span>
          </div>
          <ul className="hero-board-list">
            {projects.map((project) => (
              <li key={project.slug}>
                <span className="hero-board-key">{project.shortName}</span>
                <span className="hero-board-val">{project.summary}</span>
              </li>
            ))}
          </ul>
          <p className="hero-board-foot">{site.home.proof}</p>
        </aside>
      </Container>
    </section>
  );
}
