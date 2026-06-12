import Link from "next/link";
import type { Route } from "next";
import { Container } from "@/components/layout/container";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function isStaticFile(href: string) {
  return /\.(txt|xml)$/.test(href);
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (isExternal(href) || isStaticFile(href)) {
    return (
      <a
        href={href}
        {...(isExternal(href) ? { target: "_blank", rel: "noreferrer noopener" } : {})}
      >
        {children}
      </a>
    );
  }
  return <Link href={href as Route}>{children}</Link>;
}

/**
 * Content-rich Kirimo footer: an organized link grid (projects · resources ·
 * social), the studio contact email, the AI-index pointer, and the oversized
 * ticker-style wordmark the template closes on. All data from the content layer.
 */
export function SiteFooter() {
  const projectLinks = site.footerLinks.filter((item) => item.href.startsWith("/projects/"));
  const resourceLinks = site.footerLinks.filter((item) => !item.href.startsWith("/projects/"));

  return (
    <footer className="site-footer">
      <Container width="wide">
        <div className="footer-top">
          <div className="footer-lead">
            <span className="footer-mark" aria-hidden="true" />
            <p className="footer-brand">{site.name}</p>
            <p className="footer-blurb">{site.description}</p>
            <a className="footer-email" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <p className="footer-col-title">Projects</p>
              <ul>
                {projectLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Resources</p>
              <ul>
                <li>
                  <FooterLink href="/projects">All projects</FooterLink>
                </li>
                <li>
                  <FooterLink href="/llms.txt">AI index</FooterLink>
                </li>
                <li>
                  <FooterLink href="/llms-full.txt">AI source bundle</FooterLink>
                </li>
                {resourceLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
              <p className="footer-col-title">Social</p>
              <ul>
                {site.social.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <p className="footer-wordmark" aria-hidden="true">
          {site.name}
        </p>

        <div className="footer-base">
          <p>Canonical public surface for developers, agents, and the Studio project family.</p>
          <p className="footer-handles">
            {site.handles.github} · {site.handles.npm}
          </p>
        </div>
      </Container>
    </footer>
  );
}
