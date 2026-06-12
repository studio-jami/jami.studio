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

/**
 * Footer — Noir's closing sequence: a nav row (links left, contact email right), a
 * subscribe row (email input + copper Subscribe that opens a prefilled mail to the studio
 * inbox — no fake backend) beside the social pills, then the COLOSSAL full-bleed "JAMI"
 * wordmark with a static-noise texture fill (CSS only), and the legal row.
 */
export function SiteFooter() {
  const year = new Date().getFullYear();
  const subscribeHref = `${studioLinks.emailHref}?subject=${encodeURIComponent(
    "Subscribe to jami.studio updates"
  )}`;

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    ...site.footerLinks.filter((item) => item.href.startsWith("/projects/")),
    { label: "AI index", href: "/llms.txt" }
  ];

  return (
    <footer className="site-footer">
      <Container>
        <div className="footer-nav-row">
          <nav className="footer-nav" aria-label="Footer">
            {navLinks.map((item) => (
              <FooterLink key={item.href} href={item.href} label={item.label} />
            ))}
          </nav>
          <a className="footer-email" href={studioLinks.emailHref}>
            {site.email}
          </a>
        </div>

        <div className="footer-sub-row">
          <form className="newsletter" action={subscribeHref}>
            <label className="visually-hidden" htmlFor="footer-subscribe">
              Email address
            </label>
            <input
              id="footer-subscribe"
              className="newsletter-input"
              type="email"
              name="email"
              placeholder="Enter email address"
              autoComplete="email"
            />
            <button className="btn btn--accent" type="submit">
              Subscribe
            </button>
          </form>

          <nav className="footer-social" aria-label="Social">
            {site.social.map((item) => (
              <a key={item.href} href={item.href} target="_blank" rel="noreferrer">
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </Container>

      <p className="footer-wordmark" aria-hidden="true">
        JAMI
      </p>

      <Container>
        <div className="footer-base">
          <p>
            © {year} {site.legalName}. All public surfaces generated from one source.
          </p>
          <div className="footer-base-links">
            <FooterLink href="/robots.txt" label="Robots" />
            <FooterLink href="/sitemap.xml" label="Sitemap" />
            <FooterLink href="/llms-full.txt" label="AI source" />
          </div>
        </div>
      </Container>
    </footer>
  );
}
