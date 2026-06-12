import Link from "next/link";
import type { Route } from "next";
import { studioLinks } from "@/content/links";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

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

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="site-footer-inner container">
        <div className="footer-lede">
          <Link href="/" className="brand brand--footer" aria-label={`${site.name} home`}>
            <span className="brand-mark" aria-hidden="true">
              <span className="brand-mark-dot" />
            </span>
            <span className="brand-word">{site.name}</span>
          </Link>
          <p>{site.description}</p>
          <a className="footer-email" href={studioLinks.emailHref}>
            {site.email}
          </a>
        </div>

        <div className="footer-columns">
          <div className="footer-column">
            <h2 className="footer-column-title">Projects</h2>
            <ul>
              {projects.map((project) => (
                <li key={project.slug}>
                  <Link href={project.route as Route} className="footer-link">
                    {project.shortName}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">Index</h2>
            <ul>
              {site.footerLinks
                .filter((item) => !item.href.startsWith("/projects/"))
                .map((item) => (
                  <li key={item.href}>
                    <FooterLink href={item.href} label={item.label} />
                  </li>
                ))}
              <li>
                <FooterLink href="/llms.txt" label="AI index" />
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h2 className="footer-column-title">Connect</h2>
            <ul>
              {site.social.map((channel) => (
                <li key={channel.href}>
                  <FooterLink href={channel.href} label={channel.label} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="site-footer-baseline container">
        <p>
          © {year} {site.legalName}
        </p>
        <p>Canonical public surface for developers, agents, and the Studio project family.</p>
      </div>
    </footer>
  );
}
