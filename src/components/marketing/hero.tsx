import Image from "next/image";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { Container } from "@/components/layout/container";
import { GuideLines } from "@/components/system/guide-lines";
import { Button } from "@/components/ui/button";

/**
 * Hero — Noir's asymmetric horizontal split. Left: a Geist-Mono facts line built from
 * honest counts (no fake ratings), the 56px −0.04em H1, the lead, two STACKED outlined
 * pill CTAs, and a "Follow us" row of real social links. Right: the media panel
 * (/assets/hero-torus.png) with the honest marquee ticker of the five product names
 * beneath it. Faint vertical guide-lines frame the columns.
 */
export function Hero() {
  const { title, lead, primaryCta, secondaryCta, eyebrow } = site.home;
  const productCount = projects.length;
  const pillarCount = site.home.pillars.length;

  return (
    <section className="hero" aria-label="Introduction">
      <Container className="hero-inner">
        <GuideLines count={3} />

        <div className="hero-copy">
          <div className="hero-facts">
            <p className="hero-facts-line">
              <strong>Open-core</strong>
              <span className="dot-string" aria-hidden="true">
                ·····
              </span>
              <span>
                {productCount} products / {pillarCount} foundations
              </span>
            </p>
            <p className="hero-facts-line">
              <span>Built for</span> <strong>developers &amp; agents</strong>
            </p>
          </div>

          <h1 className="hero-title">
            {title} — {eyebrow}.
          </h1>

          <p className="hero-lead">{lead}</p>

          <div className="hero-actions">
            <Button href={primaryCta.href} variant="primary">
              {primaryCta.label}
            </Button>
            <Button href={secondaryCta.href} variant="secondary">
              {secondaryCta.label}
            </Button>
          </div>

          <div className="hero-follow">
            <span className="hero-follow-label">Follow us</span>
            <span className="dot-string" aria-hidden="true">
              ····
            </span>
            <nav className="hero-follow-links" aria-label="Social">
              {site.social.map((item) => (
                <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>

        <div className="hero-media">
          <figure className="hero-media-panel">
            <Image
              src="/assets/hero-torus.png"
              alt="Glossy black torus on a near-black ground — the studio's signature visual"
              width={1024}
              height={1024}
              priority
            />
          </figure>

          <div className="ticker" aria-label="Studio project family">
            <div className="ticker-track">
              {[0, 1].map((copy) => (
                <span key={copy} aria-hidden={copy === 1 ? "true" : undefined}>
                  {projects.map((project) => (
                    <span className="ticker-item" key={`${copy}-${project.slug}`}>
                      {project.shortName}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
