import Link from "next/link";
import type { Route } from "next";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";
import { Container } from "@/components/layout/container";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function FooterLink({ href, label }: { href: string; label: string }) {
  if (isInternal(href)) {
    return (
      <Link href={href as Route} className="footer-link">
        {label}
      </Link>
    );
  }
  return (
    <a href={href} className="footer-link" target="_blank" rel="noreferrer">
      {label}
    </a>
  );
}

/** Footer → organized, numbered columns, social + email, oversized closing wordmark. */
export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-grid">
          <div className="footer-intro">
            <p className="eyebrow">
              <span className="section-number" aria-hidden="true">
                /
              </span>
              <span>{site.legalName}</span>
            </p>
            <p className="footer-lede">{site.description}</p>
            <a className="footer-email" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <nav className="footer-col" aria-label="Projects">
            <p className="footer-col-title">Projects</p>
            {site.footerLinks
              .filter((item) => item.href.startsWith("/projects/"))
              .map((item) => (
                <FooterLink key={item.href} href={item.href} label={item.label} />
              ))}
          </nav>

          <nav className="footer-col" aria-label="Index">
            <p className="footer-col-title">Index</p>
            <FooterLink href="/projects" label="All projects" />
            {site.nav
              .filter((item) => item.href !== "/projects")
              .map((item) => (
                <FooterLink key={item.href} href={item.href} label={item.label} />
              ))}
            {site.footerLinks
              .filter((item) => !item.href.startsWith("/projects/"))
              .map((item) => (
                <FooterLink key={item.href} href={item.href} label={item.label} />
              ))}
          </nav>

          <nav className="footer-col" aria-label="Social">
            <p className="footer-col-title">Social</p>
            {site.social.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
        </div>

        <div className="footer-wordmark" aria-hidden="true">
          {site.name}
        </div>

        <div className="footer-base">
          <p>
            © {year} {site.legalName}. Open-core, agent-native.
          </p>
          <p className="footer-base-note">
            Canonical public surface for developers, agents, and the Studio project family.
          </p>
        </div>
      </Container>
    </footer>
  );
}
