import { site } from "@/content/site";
import { Button } from "@/components/ui/button";
import { SmartLink } from "@/components/ui/smart-link";
import { TextTicker } from "@/components/ui/text-ticker";

const aiIndex = site.nav.find((item) => item.label === "AI index") ?? site.nav[0];

/**
 * Kirimo footer band:
 *   intro strip (small body + circle-arrow text button) →
 *   colossal "JAMI STUDIO" Text-Ticker between hairlines →
 *   columns (contact / projects / site / social-with-circle-arrows) →
 *   centered legal line.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const projectLinks = site.footerLinks.filter((link) => link.href.startsWith("/projects/"));
  const metaLinks = site.footerLinks.filter((link) => !link.href.startsWith("/projects/"));

  return (
    <footer className="site-footer">
      <div className="container site-footer__intro">
        <p className="site-footer__intro-copy">{site.description}</p>
        <Button href={aiIndex.href} variant="text">
          Read the AI index
        </Button>
      </div>

      <div className="site-footer__ticker" aria-label={`${site.legalName} wordmark`}>
        <TextTicker label={site.legalName} size="wordmark" repeat={3}>
          Jami Studio
        </TextTicker>
      </div>

      <div className="container site-footer__grid">
        <div className="site-footer__contact">
          <a className="site-footer__email" href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <p className="site-footer__tagline">{site.home.eyebrow}</p>
        </div>

        <nav className="site-footer__col" aria-label="Projects">
          <p className="site-footer__col-title">Projects</p>
          <ul>
            {projectLinks.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__col" aria-label="Site">
          <p className="site-footer__col-title">Site</p>
          <ul>
            {site.nav.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
            {metaLinks.map((link) => (
              <li key={link.href}>
                <SmartLink href={link.href}>{link.label}</SmartLink>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="site-footer__social" aria-label="Studio profiles">
          <ul>
            {site.social.map((profile) => (
              <li key={profile.href}>
                <SmartLink href={profile.href} className="site-footer__social-link">
                  <span className="btn__arrow" aria-hidden="true">
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
                  <span className="site-footer__social-label">{profile.label}</span>
                </SmartLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="site-footer__legal">
        <div className="container">
          <p>
            {site.legalName} ©{year}
          </p>
        </div>
      </div>
    </footer>
  );
}
