import type { Route } from "next";
import { LinkButton } from "@/components/ui/primitives";
import { ChevronDownIcon } from "@/components/ui/icons";
import { site } from "@/content/site";

/**
 * Hero — the template's opening bookend. A viewport-filling, full-bleed
 * photographic moment (our generated god-ray ridge at /assets/hero.png) that
 * fades into the warm-black canvas at its bottom edge, with the film grain and
 * a volumetric glow layered on top in CSS. Centered hushed type: eyebrow,
 * 56px display title, lead, ONE white pill CTA, and the explicit
 * "Scroll to explore" cue pinned to the bottom.
 */
export function Hero() {
  const { eyebrow, title, lead, primaryCta } = site.home;

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-media" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/assets/hero.png" alt="" className="hero-photo" />
        <div className="hero-glow" />
        <div className="hero-veil" />
      </div>

      <div className="hero-inner">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 id="hero-title" className="hero-title">
          {title}
        </h1>
        <p className="hero-lead">{lead}</p>
        <div className="hero-ctas">
          <LinkButton href={primaryCta.href as Route} variant="primary" size="lg">
            {primaryCta.label}
          </LinkButton>
        </div>
      </div>

      <a className="scroll-cue" href="#introducing" aria-label="Scroll to explore">
        <ChevronDownIcon size={16} />
        <span>Scroll to explore</span>
      </a>
    </section>
  );
}
