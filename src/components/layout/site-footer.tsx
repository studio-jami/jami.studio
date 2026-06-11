import Link from "next/link";
import type { Route } from "next";
import { Eyebrow } from "@/components/ui/eyebrow";
import { studioLinks } from "@/content/links";
import { site } from "@/content/site";
import { projects } from "@/content/projects";

function isInternal(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//");
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  if (isInternal(href)) {
    return (
      <Link href={href as Route} className="footer-link">
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className="footer-link" target="_blank" rel="noreferrer noopener">
      {children}
    </a>
  );
}

const utilityLinks = [
  { label: "AI index", href: "/llms.txt" },
  { label: "Full source", href: "/llms-full.txt" },
  { label: "Sitemap", href: "/sitemap.xml" },
  { label: "Robots", href: "/robots.txt" }
];

/**
 * Content-rich footer: project shortlinks (from `projects`), utility/AI routes, shared
 * studio socials + contact email (`site.social` / `site.email` — required studio identity),
 * and an oversized wordmark echoing the Kirimo footer signature. Organized, not a dump.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-intro">
            <Eyebrow>jami.studio</Eyebrow>
            <p className="footer-tagline">{site.description}</p>
            <a className="footer-email" href={studioLinks.emailHref}>
              {site.email}
            </a>
          </div>

          <div className="footer-columns">
            <div className="footer-column">
              <Eyebrow as="span">Projects</Eyebrow>
              <ul>
                {projects.map((project) => (
                  <li key={project.slug}>
                    <FooterLink href={project.route}>{project.shortName}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <Eyebrow as="span">Index</Eyebrow>
              <ul>
                {utilityLinks.map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href}>{item.label}</FooterLink>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-column">
              <Eyebrow as="span">Social</Eyebrow>
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

        <div className="footer-wordmark" aria-hidden="true">
          {site.name}
        </div>

        <div className="footer-base">
          <p>Open-core foundations for agent-native products.</p>
          <p>Canonical public surface for developers, agents, and the Studio project family.</p>
        </div>
      </div>
    </footer>
  );
}
