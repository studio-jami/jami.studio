import Link from "next/link";
import type { Route } from "next";
import { BrandMark, Wordmark } from "@/components/layout/brand-mark";
import { site } from "@/content/site";
import { studioLinks } from "@/content/links";

function isProjectLink(href: string): boolean {
  return href.startsWith("/projects");
}

export function SiteFooter() {
  const projectLinks = site.footerLinks.filter((item) => isProjectLink(item.href));
  const machineLinks = [
    ...site.nav.filter((item) => item.href.endsWith(".txt")),
    ...site.footerLinks.filter((item) => !isProjectLink(item.href))
  ];

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-top">
          <div className="footer-brand">
            <Link href="/" className="wordmark" aria-label={`${site.name} home`}>
              <BrandMark />
              <Wordmark text={site.name} />
            </Link>
            <p className="footer-description">{site.description}</p>
            <ul className="footer-handles" aria-label="Studio handles">
              <li>
                <a href={studioLinks.githubOrg} target="_blank" rel="noreferrer">
                  {site.handles.github}
                  <span aria-hidden="true"> ↗</span>
                </a>
              </li>
              <li>{site.handles.npm}</li>
              <li>{site.handles.x}</li>
            </ul>
          </div>
          <nav className="footer-cols" aria-label="Footer navigation">
            <div className="footer-col">
              <p className="footer-col-title">Index</p>
              <ul>
                {projectLinks.map((item, index) => (
                  <li key={item.href}>
                    <span className="footer-no">{String(index + 1).padStart(2, "0")}</span>
                    <Link href={item.href as Route}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Machine readable</p>
              <ul>
                {machineLinks.map((item) => (
                  <li key={item.href}>
                    <a href={item.href}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>
            © {new Date().getFullYear()} {site.legalName}
          </p>
          <p>Canonical public surface for developers, agents, and the Studio project family.</p>
        </div>
      </div>
    </footer>
  );
}
