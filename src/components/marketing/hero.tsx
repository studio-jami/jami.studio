import type { Route } from "next";
import { ButtonAnchor, ButtonLink } from "@/components/primitives/button";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

function isInternalPage(href: string) {
  return href.startsWith("/") && !href.includes(".");
}

function HeroCta({
  href,
  label,
  variant
}: {
  href: string;
  label: string;
  variant: "primary" | "secondary";
}) {
  if (isInternalPage(href)) {
    return (
      <ButtonLink to={href as Route} variant={variant} size="lg" trailingIcon>
        {label}
      </ButtonLink>
    );
  }
  return (
    <ButtonAnchor href={href} variant={variant} size="lg" trailingIcon>
      {label}
    </ButtonAnchor>
  );
}

export function Hero() {
  const { home } = site;
  const liveCount = projects.length;

  return (
    <header className="hero">
      <div className="container container--wide">
        <p className="hero__eyebrow">
          <span className="hero__eyebrow-mark" aria-hidden="true" />
          {home.eyebrow}
        </p>

        <h1 className="hero__title">
          The studio behind
          <br />
          <span className="hero__title-accent">agent-native</span> software.
        </h1>

        <div className="hero__lower">
          <p className="hero__lead">{home.lead}</p>
          <div className="hero__aside">
            <div className="hero__ctas">
              <HeroCta
                href={home.primaryCta.href}
                label={home.primaryCta.label}
                variant="primary"
              />
              <HeroCta
                href={home.secondaryCta.href}
                label={home.secondaryCta.label}
                variant="secondary"
              />
            </div>
            <dl className="hero__stats">
              <div className="hero__stat">
                <dt>Products</dt>
                <dd>{String(liveCount).padStart(2, "0")}</dd>
              </div>
              <div className="hero__stat">
                <dt>Model</dt>
                <dd>Open core</dd>
              </div>
              <div className="hero__stat">
                <dt>Surface</dt>
                <dd>BYOK</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      <div className="hero__rule container container--wide" aria-hidden="true">
        <span>jami.studio</span>
        <span className="hero__rule-line" />
        <span>{site.home.title}</span>
      </div>
    </header>
  );
}
